import path from "node:path";
import fs from "node:fs/promises";
import { parseJSONBody } from "./parseJSONBody.js";
import { sendResponse } from "./sendResponse.js";
import { getRecords } from "./getRecords.js"

export async function handlePurchaseRequest(req, res){
    try {
        const newRecord = await parseJSONBody(req);
        const parsedData = await getRecords();
        const pathJSON = path.join("data", "record.json")
        parsedData.push(newRecord);
        await fs.writeFile(pathJSON, JSON.stringify(parsedData, null, 2), 'utf-8');
        sendResponse(res, 201, 'application/json', JSON.stringify(newRecord));
    }
    catch (error){
        console.error("Failed to handle purchase:", error);
        sendResponse(res, 500, "application/json", JSON.stringify({ error: "Internal server error" }));
    }
}
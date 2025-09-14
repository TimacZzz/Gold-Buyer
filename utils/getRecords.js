import fs from "node:fs/promises"
import path from "node:path"

export async function getRecords(){
    try {
        const pathJSON = path.join("data", "record.json");
        const data = await fs.readFile(pathJSON, "utf-8");
        const parsedData = JSON.parse(data);
        return parsedData;
    }
    catch (error){
        console.error(error);
        return [];
    }
}
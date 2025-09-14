import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";
import { handlePriceRequest } from "./utils/handlePriceRequest.js";
import { handlePurchaseRequest } from "./utils/handlePurchaseRequest.js";
import { handleDownloadPdfRequest } from "./utils/handleDownloadPdfRequest.js";

const PORT = 8000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    if (req.url === "/gold-price"){
        return await handlePriceRequest(req, res);
    }
    else if (req.url === "/purchase-record"){
        return handlePurchaseRequest(req, res, __dirname);
    }
    else if (req.url === "/download-pdf"){
        return handleDownloadPdfRequest(res);
    }
    else{
        return serveStatic(req, res, __dirname);
    }
})

server.listen(PORT, () => console.log(`Connected on PORT: ${PORT}`));

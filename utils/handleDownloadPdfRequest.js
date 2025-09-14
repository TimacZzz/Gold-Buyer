import PDFDocument from "pdfkit"
import { getRecords } from "./getRecords.js";

export async function handleDownloadPdfRequest(res){
    const doc = new PDFDocument({ size: "A4", margin: 36 });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="purchases.pdf"');
    res.setHeader("Cache-Control", "no-store");

    doc.pipe(res);
    // Write the heading
    doc.fontSize(24).text("Purchase Records", { align: "center" });
    doc.moveDown();

    const parsedData = await getRecords();
    for (let element of parsedData){
        doc.fontSize(12).text(`
            Purchased Time: ${element["time"]}
            Investment Amount: $${element["amount"]}
            Gold Price: ${element['goldPrice']} / Oz
            Amount of Gold Purchased: ${element['goldPurchased']} ounces`);
    }

    // 5) End the PDF/response
    doc.end();
}
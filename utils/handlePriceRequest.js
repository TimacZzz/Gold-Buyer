export async function handlePriceRequest(req, res){
    // Setup the response object
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write(
            `data: ${JSON.stringify({event: 'gold-price-updated', goldPrice: getRandomGoldPrice()})}\n\n`
    )

    const interval = setInterval(async () => {
        const goldPrice = getRandomGoldPrice();
        res.write(
            `data: ${JSON.stringify({event: 'gold-price-updated', goldPrice: goldPrice})}\n\n`
        )
    }, 2000);
}

function getRandomGoldPrice() {
    const basePrice = 3600;              // base gold price
    const fluctuation = 5;              // max change up or down
    const randomChange = (Math.random() * 2 - 1) * fluctuation;
    return (basePrice + randomChange).toFixed(2); // 2 decimal places
}
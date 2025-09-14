const priceDisplay = document.getElementById("price-display");
const connectionStatus = document.getElementById("connection-status");
const form = document.getElementById("form");
const successDialog = document.getElementById("success-dialog");
const closeSuccessDialogBtn = document.getElementById("close-success-dialog-btn");
const investmentAmount = document.getElementById("investment-amount");
const investmentSummary = document.getElementById("investment-summary");
const errorDialog = document.getElementById("error-dialog");
const closeErrorDialogBtn = document.getElementById("close-error-dialog-btn");
const downloadPDFBtn = document.getElementById("download-pdf-btn");
let goldPriceSource = null;

downloadPDFBtn.addEventListener("click", () => {
    window.location.href = "/download-pdf"
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if there is a gold price
    if (connectionStatus.classList.contains("on")){
        const amount = investmentAmount.value;
        if (amount === 0){
            errorDialog.showModal();
        }
        else{
            const goldPrice = Number(priceDisplay.textContent);
            const goldPurchased = (amount / goldPrice).toFixed(4);
            const date = new Date();
            const time = date.toLocaleString("sv-SE", { timeZoneName: "short" });
            investmentSummary.textContent = `You just bought ${goldPurchased} ounces (ozt) for $${amount}. \n You can print out your transaction detail.`
            successDialog.showModal();
            investmentAmount.value = 0;
            fetch("/purchase-record", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( { time: time, amount: amount, goldPrice: goldPrice, goldPurchased: goldPurchased })
            })
        }
    }
    else{
        errorDialog.showModal();
    }
});

closeSuccessDialogBtn.addEventListener("click", () => successDialog.close());
closeErrorDialogBtn.addEventListener("click", () => errorDialog.close());

connectionStatus.addEventListener("click", () => {
    if (connectionStatus.classList.contains("on")){
        connectionStatus.classList.remove("on");
        connectionStatus.classList.add("off");
        connectionStatus.textContent = "Disconnected 🔴";
        priceDisplay.textContent = " ----.--";
        goldPriceSource.close();
        goldPriceSource = null;
    }
    else{
        connectionStatus.classList.remove("off");
        connectionStatus.classList.add("on");
        connectionStatus.textContent = "Live Price 🟢";

        // Set up Server Sent Events
        goldPriceSource = new EventSource("/gold-price");
        goldPriceSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const goldPrice = data.goldPrice;
            console.log(data);
            priceDisplay.textContent = " " + goldPrice;
        }

        goldPriceSource.onerror = () => {
            console.log("Connection Failed...")
        }
    }
})





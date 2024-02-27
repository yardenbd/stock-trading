const url = "http://localhost:3000";
const socket = io(url);

const messageText = document.getElementById("message");
const buyInput = document.getElementById("buy");
const sellInput = document.getElementById("sell");
const stockPrice = document.getElementById("stock-price");

const handleBuyStock = async () => {
    socket.emit("buy", { price: buyInput.value, stockName: "AAPL" });
};
const handleSellStock = async () => {
    socket.emit("sell", { price: sellInput.value, stockName: "AAPL" });
};

socket.on("message", (data) => {
    console.log("data", data);
    messageText.innerHTML = data;
});

const handleNewBuyStock = (message) => {
    stockPrice.innerHTML = message;
    buildNewBuyer(message);
};

const buildNewBuyer = (message) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    return li;
};

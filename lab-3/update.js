const axios = require("axios");

const idToUpdate = "677d3e80440cecf6ae1328a2";
const updatedData = {
    price: 1400,
    in_stock: false,
    specifications: {
        CPU: "CPU",
        RAM: "8GB",
        Storage: "512GB SSD"
    }
};

(async () => {
    try {
        const response = await axios.put(`http://127.0.0.1:3000/laptops/${idToUpdate}`, updatedData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log("Update response:", response.data);
    }
    catch (error) {
        console.error("Error updating laptop:", error.response?.data || error.message);
    }
})();

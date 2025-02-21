const axios = require("axios");

async function testPost() {
    const laptop = {
        name: "Lenovo ThiPad",
        brand: "Lenovo",
        price: 1200,
        specifications: {
            CPU: "Intel i7",
            RAM: "16GB",
            Storage: "512GB SSD"
        },
        category: "Business",
        in_stock: true
    };

    try {
        const response = await axios.post("http://127.0.0.1:3000/laptops", laptop);
        console.log("Added laptop:", response.data);
    }
    catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

testPost();

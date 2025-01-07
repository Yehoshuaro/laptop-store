const axios = require("axios");

const idToDelete = "677d6bfe55756b1b8eb1dd22";
(async () => {
    try {
        const response = await axios.delete(`http://127.0.0.1:3000/laptops/${idToDelete}`);
        console.log("Delete response:", response.data);
    }
    catch (error) {
        console.error("Error deleting laptop:", error.response?.data || error.message);
    }
})();
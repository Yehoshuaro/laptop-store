const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    specifications: {
        CPU: String,
        RAM: String,
        Storage: String
    },
    category: String,
    in_stock: { type: Boolean, default: true }
});

module.exports = mongoose.model('Laptop', laptopSchema);

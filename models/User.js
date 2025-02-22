const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "seller", "customer"], default: "customer" } // Default to "customer"
});

module.exports = mongoose.model('User', userSchema);

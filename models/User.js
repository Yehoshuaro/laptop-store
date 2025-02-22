const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String},
    email: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "seller", "customer"], default: "customer" }
});

module.exports = mongoose.model('User', userSchema);

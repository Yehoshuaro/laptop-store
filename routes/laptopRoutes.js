const express = require('express');
const Laptop = require('../models/Laptop');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => {
    const laptops = await Laptop.find();
    res.json(laptops);
});

router.post('/', authMiddleware(['seller']), async (req, res) => {
    const { name, brand, price, stock } = req.body;
    const laptop = await Laptop.create({ name, brand, price, stock });
    res.json(laptop);
});

router.delete('/:id', authMiddleware(['seller']), async (req, res) => {
    await Laptop.findByIdAndDelete(req.params.id);
    res.json({ message: "Laptop deleted" });
});

module.exports = router;

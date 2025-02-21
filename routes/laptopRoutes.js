const express = require('express');
const Laptop = require('../models/Laptop');
const router = express.Router();

// Получить все ноутбуки
router.get('/', async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить ноутбук (только salesman)
router.post('/', async (req, res) => {
    try {
        const newLaptop = new Laptop(req.body);
        await newLaptop.save();
        res.status(201).json(newLaptop);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Удалить ноутбук (только salesman)
router.delete('/:id', async (req, res) => {
    try {
        await Laptop.findByIdAndDelete(req.params.id);
        res.json({ message: 'Ноутбук удален' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;

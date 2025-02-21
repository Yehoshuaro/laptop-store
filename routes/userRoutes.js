const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware(['admin']), async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.patch('/make-seller/:id', authMiddleware(['admin']), async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { role: 'seller' });
    res.json({ message: "User is now a seller" });
});

router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
});

module.exports = router;

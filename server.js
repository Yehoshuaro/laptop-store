const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend"))); // Раздаём статические файлы (HTML, CSS, JS)

// Подключение к MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/laptopStore")
    .then(() => console.log("MongoDB подключена"))
    .catch(err => console.log(err));

// Модель пользователя
const User = mongoose.model("User", new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}));

// Модель ноутбуков
const Laptop = mongoose.model("Laptop", new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    category: String,
    in_stock: Boolean
}));

// **Маршруты**
// Регистрация пользователя
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.json({ success: true, message: "Пользователь зарегистрирован" });
    } catch (error) {
        res.status(400).json({ success: false, message: "Ошибка регистрации" });
    }
});

// Получение списка ноутбуков
app.get("/laptops", async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ message: "Ошибка загрузки ноутбуков" });
    }
});

// Запуск сервера
app.listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));

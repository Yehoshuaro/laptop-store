const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend"))); // Раздаём HTML, CSS, JS

mongoose.connect("mongodb://localhost:27017/laptopStore")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// const User = mongoose.model("User", new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String
// }));
const User = require("./models/User"); // Import correct model


const Laptop = mongoose.model("Laptop", new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    category: String,
    in_stock: Boolean
}));

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Проверка, существует ли уже пользователь с таким email
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        // Хешируем пароль перед сохранением
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём нового пользователя
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "customer" // Назначаем роль автоматически
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error); // Логируем ошибку
        res.status(500).json({ success: false, message: error.message }); // Показываем реальную ошибку
    }
});


// Логин
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });

        res.json({ success: true, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Login error" });
    }
});

// Список ноутбуков
app.get("/laptops", async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ message: "Error loading laptops" });
    }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));

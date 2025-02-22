const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend")));

mongoose.connect("mongodb://localhost:27017/laptopStore")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));


const User = require("./models/User");


const Laptop = mongoose.model("Laptop", new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    category: String,
    in_stock: Boolean
}));

app.post("/register", async (req, res) => {
    try {
        const { name, email, password, role = "customer" } = req.body; // Default to "customer" role

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});



app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt:", email, password); // Debugging

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        console.log(`Login successful for ${user.role}`);

        res.status(200).json({
            success: true,
            message: "Login successful",
            role: user.role
        });
    } catch (error) {
        console.error("🔥 Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.get("/laptops", async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.json(laptops);
    } catch (error) {
        res.status(500).json({ message: "Error loading laptops" });
    }
});


//new
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error loading users" });
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

app.delete("/laptops/:id", async (req, res) => {
    try {
        const result = await Laptop.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Laptop not found" });
        }
        res.json({ message: "Laptop deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting laptop" });
    }
});

app.post("/laptops", async (req, res) => {
    try {
        const { name, brand, price, category, in_stock } = req.body;

        if (!name || !brand || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newLaptop = new Laptop({ name, brand, price, category, in_stock });
        await newLaptop.save();

        res.status(201).json({ message: "Laptop added successfully", laptop: newLaptop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding laptop" });
    }
});


app.put("/laptops/:id", async (req, res) => {
    try {
        const { name, brand, price, category, in_stock } = req.body;

        const updatedLaptop = await Laptop.findByIdAndUpdate(
            req.params.id,
            { name, brand, price, category, in_stock },
            { new: true }
        );

        if (!updatedLaptop) {
            return res.status(404).json({ message: "Laptop not found" });
        }

        res.json({ message: "Laptop updated successfully", laptop: updatedLaptop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating laptop" });
    }
});

app.put("/users/:id", async (req, res) => {
    try {
        const { role } = req.body;
        await User.findByIdAndUpdate(req.params.id, { role });

        res.json({ success: true, message: "User role updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating role" });
    }
});


app.listen(3000, () => console.log("Server running at http://localhost:3000"));

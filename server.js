// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// const bcrypt = require("bcryptjs");
//
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "frontend"))); // Раздаём HTML, CSS, JS
//
// mongoose.connect("mongodb://localhost:27017/laptopStore")
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log(err));
//
// // const User = mongoose.model("User", new mongoose.Schema({
// //     name: String,
// //     email: { type: String, unique: true },
// //     password: String
// // }));
// const User = require("./models/User");
//
//
// const Laptop = mongoose.model("Laptop", new mongoose.Schema({
//     name: String,
//     brand: String,
//     price: Number,
//     category: String,
//     in_stock: Boolean
// }));
//
// app.post("/register", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//
//         // Проверка, существует ли уже пользователь с таким email
//         let existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "Email already in use" });
//         }
//
//         const hashedPassword = await bcrypt.hash(password, 10);
//
//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role: "admin"
//         });
//
//         await newUser.save();
//
//         res.status(201).json({ success: true, message: "User registered successfully" });
//     } catch (error) {
//         console.error("Registration error:", error);
//         res.status(500).json({ success: false, message: error.message }); // Показываем реальную ошибку
//     }
// });
//
// // app.post("/login", async (req, res) => {
// //     try {
// //         const { email, password } = req.body;
// //         const user = await User.findOne({ email, password });
// //         if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
// //
// //         res.json({ success: true, message: "Login successful" });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: "Login error" });
// //     }
// // });
//
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//
//         if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
//
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });
//
//         res.json({ success: true, message: "Login successful" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Login error" });
//     }
// });
//
// app.get("/laptops", async (req, res) => {
//     try {
//         const laptops = await Laptop.find();
//         res.json(laptops);
//     } catch (error) {
//         res.status(500).json({ message: "Error loading laptops" });
//     }
// });
//
//
// app.listen(3000, () => console.log("Server running at http://localhost:3000"));
//

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
        const { name, email, password } = req.body;

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "customer"
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: error.message }); // Показываем реальную ошибку
    }
});

//working
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//
//         if (!user) {
//             return res.status(401).json({ success: false, message: "Invalid email or password" });
//         }
//
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, message: "Invalid email or password" });
//         }
//
//         res.status(200).json({ success: true, message: "Login successful" });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// });

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

//new
app.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});


//new
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

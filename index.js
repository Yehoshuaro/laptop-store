const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const url = "mongodb://127.0.0.1:27017";
const dbName = "laptopStore";

let db;
MongoClient.connect(url)
    .then((client) => {
        console.log("Succesfully connected to MongoDB");
        db = client.db(dbName);
    })
    .catch((err) => console.error(err));


app.get("/laptops", async (req, res) => {
    try {
        const laptops = await db.collection("laptops").find().toArray();
        res.status(200).json(laptops);
    }
    catch (err) {
        res.status(500).send("Error in the Server");
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to the Laptop Store API");
});

app.post("/laptops", async (req, res) => {
    const laptop = req.body;
    try {
        const result = await db.collection("laptops").insertOne(laptop);
        res.status(201).json(result.ops[0]);
    }
    catch (err) {
        res.status(500).send("Server error");
    }
});

app.put("/laptops/:id", async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const result = await db
            .collection("laptops")
            .updateOne({ _id: new ObjectId(id) }, { $set: updates });

        if (result.modifiedCount === 0) {
            res.status(404).send("Laptop was not found");
        }
        else {
            res.status(200).send("Laptop was updated");
        }
    }
    catch (err) {
        res.status(500).send("Server error");
    }
});

app.delete("/laptops/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await db.collection("laptops").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            res.status(404).send("Laptop was not found");
        }
        else {
            res.status(200).send("Laptop was updated");
        }
    }
    catch (err) {
        res.status(500).send("Server error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is on the http://localhost:${PORT}/laptops`);
});

const { MongoClient } = require("mongodb");
const fs = require("fs");

const url = "mongodb://127.0.0.1:27017";
const dbName = "laptopStore";

async function seedDatabase() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);

        const laptops = JSON.parse(fs.readFileSync("data.json", "utf-8"));
        await db.collection("laptops").insertMany(laptops);
        console.log("Data is already in the collection");
    }
    catch (err) {
        console.error("Error ", err);
    }
    finally {
        await client.close();
    }
}

seedDatabase();
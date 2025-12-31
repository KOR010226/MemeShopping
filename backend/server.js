require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

let db;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ 錯誤：找不到 MONGO_URI 環境變數！");
    process.exit(1);
}
const client = new MongoClient(MONGO_URI);

async function connectToDB() {
    try {
        await client.connect();
        console.log("MongoDB 連線成功");
        db = client.db('meme_mart');
    } catch (error) {
        console.error("連線失敗:", error);
    }
}

app.get('/products', async (req, res) => {
    try {
        if (!db) {
            return res.status(500).send("資料庫尚未連線");
        }
        const products = await db.collection('products').find({}).project({ _id: 0 }).toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/quotes', async (req, res) => {
    try {
        if (!db) {
            return res.status(500).send("資料庫尚未連線");
        }
        const quotes = await db.collection('quotes').find({}).project({ _id: 0 }).toArray();
        const simpleQuotes = quotes.map(q => q.text);
        res.json(simpleQuotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;

connectToDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`後端伺服器跑在 Port ${PORT}`);
    });
});

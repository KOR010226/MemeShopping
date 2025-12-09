const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./SqlData.db'); // 連接資料庫
const SECRET = "your_jwt_secret"; // JWT 密鑰

// -------------------
// Helper: 驗證 JWT
// -------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// -------------------
// 註冊
// -------------------
app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, hash, email],
    function(err){
      if(err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, username, email });
    }
  );
});

// -------------------
// 登入
// -------------------
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (!user) return res.status(401).json({ error: "User not found" });
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

// -------------------
// 取得商品列表
// -------------------
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if(err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

// -------------------
// 取得單一商品
// -------------------
app.get('/api/products/:id', (req,res) => {
  const id = req.params.id;
  db.get("SELECT * FROM products WHERE id = ?", [id], (err,row) => {
    if(err) return res.status(500).json({error: err.message});
    if(!row) return res.status(404).json({error: "Product not found"});
    res.json(row);
  });
});

// -------------------
// 建立訂單
// -------------------
app.post('/api/orders', authenticateToken, (req,res) => {
  const userId = req.user.id;
  const items = req.body.items; // [{id, quantity, price}, ...]

  if(!items || items.length === 0) return res.status(400).json({error: "No items"});

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  db.run("INSERT INTO orders (user_id, status, total) VALUES (?, ?, ?)", [userId, "pending", total], function(err){
    if(err) return res.status(500).json({error: err.message});
    const orderId = this.lastID;

    const stmt = db.prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
    items.forEach(item => stmt.run(orderId, item.id, item.quantity, item.price));
    stmt.finalize();

    res.json({ orderId, total });
  });
});

// -------------------
// 取得用戶訂單
// -------------------
app.get('/api/orders', authenticateToken, (req,res) => {
  const userId = req.user.id;
  db.all("SELECT * FROM orders WHERE user_id = ?", [userId], (err, orders) => {
    if(err) return res.status(500).json({error: err.message});
    res.json(orders);
  });
});

// -------------------
// 啟動伺服器
// -------------------
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

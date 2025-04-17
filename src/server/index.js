const express = require('express');
const cors = require('cors');
app.use(cors());
const router = express.Router();
const mysql = require('mysql2/promise');

// إعداد الاتصال
const db = mysql.createPool({
  host: '193.203.184.99',
  user: 'u804311892_voucher',
  password: 'Ah#630540',
  database: 'u804311892_voucher',
});

router.get('/search', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);
  try {
    const [rows] = await db.query(
      'SELECT id, name FROM customers WHERE name LIKE ? LIMIT 10',
      [`%${q}%`]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('خطأ في السيرفر');
  }
});

module.exports = router;
/*
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('./db.sqlite');

app.use(cors());
app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS vouchers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  method TEXT,
  amount REAL,
  currency TEXT,
  accountName TEXT,
  accountNumber TEXT,
  referenceNumber TEXT,
  fund TEXT,
  note TEXT
)`);

app.post('/vouchers', (req, res) => {
  const data = req.body;
  db.run(
    `INSERT INTO vouchers (date, method, amount, currency, accountName, accountNumber, referenceNumber, fund, note)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.date,
      data.method,
      data.amount,
      data.currency,
      data.accountName,
      data.accountNumber,
      data.referenceNumber,
      data.fund,
      data.note
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, ...data });
    }
  );
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));
*/
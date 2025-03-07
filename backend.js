const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Create table (run once)
pool.query(
  `CREATE TABLE IF NOT EXISTS agreements (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    loan_amount TEXT,
    signature TEXT,
    signature_type TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  (err, res) => {
    if (err) console.error(err);
    else console.log("Table ready");
  }
);

// Save client agreement
app.post("/sign", async (req, res) => {
  const { full_name, email, phone, address, loan_amount, signature, signature_type } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO agreements (full_name, email, phone, address, loan_amount, signature, signature_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [full_name, email, phone, address, loan_amount, signature, signature_type]
    );

    res.status(201).json({ message: "Agreement signed successfully!", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get all signed agreements (Admin Panel)
app.get("/agreements", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM agreements ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

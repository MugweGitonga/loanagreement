const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 5000;

const pool = new Pool({
  user: "your_db_user",
  host: "localhost",
  database: "loan_agreement_db",
  password: "your_db_password",
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post("/submit", async (req, res) => {
  const { full_name, phone, loan_amount, signature } = req.body;
  try {
    await pool.query(
      "INSERT INTO agreements (full_name, phone, loan_amount, signature) VALUES ($1, $2, $3, $4)",
      [full_name, phone, loan_amount, signature]
    );
    res.json({ success: true, message: "Agreement submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

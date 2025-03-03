import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("✅ Banco de Dados conectado com sucesso!");
});

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err) => {
    if (err) {
      console.error("❌ Erro ao inserir mensagem:", err);
      return res.status(500).send("Erro ao salvar mensagem");
    }
    res.send("✅ Mensagem salva no Banco de Dados!");
  });
});

app.listen(port, () => {
  console.log(`🚀 Server online na porta ${port}`);
});

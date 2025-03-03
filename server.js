import dotenv from "dotenv";
dotenv.config(); // Carregar as variáveis de ambiente

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mysql from "mysql2";

const app = express();
const port = process.env.PORT || 3001; // Usar a variável de ambiente PORT ou 3001 como padrão

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados usando variáveis de ambiente
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL conectado...");
});

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err) => {
    if (err) throw err;
    res.send("Mensagem adicionada ao Banco de dados!");
  });
});

app.listen(port, () => {
  console.log(`Server online na porta ${port}`);
});

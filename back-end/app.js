const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  res.send("Bem Vindo");
});

app.listen(8080, () => {
  console.log("Servidor Iniciado na Porta 8080: http://localhost:8080");
});

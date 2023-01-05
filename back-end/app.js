const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use((req, res, next));

app.get("/", async (req, res) => {
  return res.json({
    erro: false,
    dataHOne: "Teste",
  });
});

app.listen(8080, () => {
  console.log("Servidor Iniciado na Porta 8080: http://localhost:8080");
});

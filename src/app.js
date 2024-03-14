import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import mongoose from "mongoose";
import tratamentoDeErros from "./middlewares/tratamentoDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();
app.use(express.json())
routes(app);

app.use(manipulador404)

app.use(tratamentoDeErros)

export default app
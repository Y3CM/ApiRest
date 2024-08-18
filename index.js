console.log("Api Rest SENA ....");

import { PORT } from "./config.js";
import express from "express";
import cors from "cors";
import ProductosRutas from "./routes/ProductosRuta.js";

const app = express();

app.use(cors());
app.use(express.json()); 


app.use("/api", ProductosRutas);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

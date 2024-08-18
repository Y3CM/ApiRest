console.log("Api Rest SENA ....");

import { PORT } from "./config.js";
import express from "express";
import cors from "cors";
import ProductosRutas from "./routes/ProductosRuta.js";
import UsersRutas from "./routes/UserRutas.js";
import CategoriasRutas from "./routes/CategoriasRutas.js";
import ComentariosRutas from "./routes/ComentariosRutas.js";
import ReviewRutas from "./routes/ReviewRutas.js";
import PostRutas from "./routes/PostsRutas.js";
import DetallesRutas from "./routes/DetallesRutas.js";

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api",UsersRutas);
app.use("/api", ProductosRutas);
app.use("/api",CategoriasRutas);
app.use("/api",ComentariosRutas);
app.use("/api",ReviewRutas);
app.use("/api",PostRutas);
app.use("/api",DetallesRutas);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

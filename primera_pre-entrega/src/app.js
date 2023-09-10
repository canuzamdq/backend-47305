import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const app = express();
const port = 8080;
app.use(express.urlencoded({extended:true}));
app.listen(port, ()=> console.log(`Servidor ejecutándose en el puerto ${port}`));

//Middelware para parseo de json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Routes
app.use ("/api/products", productsRouter);
app.use ("/api/carts", cartsRouter);




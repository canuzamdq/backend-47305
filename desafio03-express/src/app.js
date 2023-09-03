import express from "express";
import { ProductManager } from "./productmanager/productmanager.js";

const app = express();
const port = 8080;
app.use(express.urlencoded({extended:true}));
app.listen(port, ()=> console.log(`Escuchando puerto ${port}..`));

const manager = new ProductManager("./src/productmanager/products.json");

// req.query: permite establecer un limite de productos a mostrar. Ej:   http://localhost:8080/products/?limit=4
app.get("/products", async (req, res) =>{
    try {
        const products = await manager.getProducts();
        const limit  = parseInt(req.query.limit);
        if (limit) {
            const productsLimit = products.slice(0, limit);
            res.send(productsLimit);
        } else{
            res.send(products);
        }
        
    } catch (error) {
        res.send(error.menssage);
    }
    
})

// req.params: permite buscar un producto por su ID. Ej: http://localhost:8080/products/2
app.get("/products/:pid", async (req, res)=>{
    try {
        const productById = parseInt(req.params.pid);
        const product = await manager.getPtoductById(productById);
        res.send(product);
    } catch (error) {
        res.send(error.menssage);S
    }
    
})
import { Router } from "express";
import { productService } from "../dao/index.js";

const router = Router();

router.get("/", async (req, res)=> {
    try {
        const data = await productService.getProducts();
        // console.log("Productos desde home: ", data)
        res.render("home", { products: data });
    } catch (error) {
        res.status(500).send(error.messaje);
    }
 
})

router.get("/realtimeproducts", async (req, res)=> {
    try {
        res.render("realtimeproducts")
    } catch (error) {
        res.status(500).send(error.messaje);
    }
   
})

router.get("/chat", async(req, res)=>{
    try {
        res.render("chat")
    } catch (error) {
        res.status(500).send(error.messaje);
    }
})
export { router as viewsRouter }
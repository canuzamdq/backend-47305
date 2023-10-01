import { Router } from "express";
import { cartsService } from "../dao/index.js";

const router = Router();

router.get("/", async(req, res)=> {
    try {
        const result = await cartsService.getCarts();
        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
});

router.get("/:cartId", async(req, res)=>{
    try {
        const cId = req.params.cartId;
        const result = await cartsService.getCartById(cId);
        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
});

router.post("/", async(req, res)=> {
    try {
        const cartInfo = req.body
        const result = await cartsService.addCart(cartInfo);
        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
});

router.post("/:cartId/:productId", async (req, res)=> {
    try {
        const {cartId, productId} = req.params;
        const result = await cartsService.addProductToCart(cartId, productId);
        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
});

router.delete("/:cartId/:productId", async (req, res)=>{
        try {
            const {cartId, productId} = req.params;
            const result = await cartsService.deleteProductFromCart(cartId, productId);
            res.json({ status: "success", data: result });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message});
        }
        
});

export { router as cartsRouter };
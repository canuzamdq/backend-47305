import { Router } from "express";
import { productService } from "../dao/index.js";

const router = Router();

router.get("/", async(req, res)=> {
    try {
        const result = await productService.getProducts();
        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
});

router.get("/:productId", async(req, res)=> {
    try {
        const pId = req.params.productId;
        const result = await productService.getPtoductById(pId);
        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
});

router.post("/", async(req, res)=> {
    try {
        const product = req.body;
        const result = await productService.addProduct(product);
        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
});

router.put("/:productId", async(req, res)=> {
    try {
        const pId = req.params.productId;
        const updateProduct = req.body;
        const result = await productService.updateProduct(pId, updateProduct);
        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
});

router.delete("/:productId", async(req, res)=> {
    try {
        const pId = req.params.productId;
        const result = await productService.deleteProduct(pId);
        res.json({ status: "success", data: result });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message});
    }
});


export { router as productsRouter };
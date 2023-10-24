import { Router } from "express";
import { productService } from "../dao/index.js";
import { cartsService } from "../dao/index.js";

const router = Router();

// router.get("/", async (req, res)=> {
//     try {
//         const data = await productService.getProducts();
//         // console.log("Productos desde home: ", data)
//         res.render("home", { products: data });
//     } catch (error) {
//         res.status(500).send(error.messaje);
//     }

// })

router.get("/", async (req, res) => {
    const {
        limit = 3,
        page = 1
    } = req.query;
    const query = {
        // category:"Deportes",
        // stock:5
    };
    const options = {
        limit,
        page,
        sort: {
            price: 1
        },
        lean: true
    };
    const result = await productService.getProductsPaginate(query, options);
    //                  http://localhost:8080/
    // console.log(result)
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProducts = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink,
        prevLink: result.hasPrevPage ? `${
            baseUrl.replace(`page=${
                result.page
            }`, `page=${
                result.prevPage
            }`)
        }` : null,
        nextLink: result.hasNextPage ? baseUrl.includes("page") ? baseUrl.replace(`page=${
            result.page
        }`, `page=${
            result.nextPage
        }`) : baseUrl.concat(`?page=${
            result.nextPage
        }`) : null
    }
    console.log(dataProducts); // {status:"sucess", payload:[]}
    res.render("home", dataProducts);
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        res.render("realtimeproducts")
    } catch (error) {
        res.status(500).send(error.messaje);
    }

})

router.get("/cart", async (req, res) => {
    try {
        const result = await cartsService.getCartById("6519cd9f19995d4ef36cb468");
        res.render("cart", result);
    } catch (error) {
        res.status(500).send(error.messaje);
    }
})

router.get("/chat", async (req, res) => {
    try {
        res.render("chat");
    } catch (error) {
        res.status(500).send(error.messaje);
    }
})
export {
    router as viewsRouter
}

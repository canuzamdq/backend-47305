import express from "express";
import { engine } from 'express-handlebars';
import { Server } from "socket.io";
import { productManager } from "./managers/index.js";
import { __dirname } from "./utils.js";
import path from "path";

import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";


//Servidor express
const app = express();
const port = 8080;
app.use(express.urlencoded({extended:true}));
const httpServer = app.listen(port, ()=> console.log(`Servidor ejecutándose en el puerto ${port}`));

//Servidor websocket
const io = new Server(httpServer);

//Middelware para parseo de json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Middelware carpeta public
app.use(express.static(path.join(__dirname,"/public")));

//Vonfiguracion del motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views")); //=> /src/views


//Routes
app.use(viewsRouter) // Permite utilizar todas las rutas de viewsRouter
app.use ("/api/products", productsRouter);
app.use ("/api/carts", cartsRouter);

//Socket Server
//Recibe la conexión del cliente
io.on("connection", async (socket)=> {
    try {
        console.log("Cliente conectado");
        const products = await productManager.getProducts();
        socket.emit("productsEvent", products);

        //Recibir el producto del socket cliente
        socket.on("addProductEvent", async (productData)=>{
            try {
                await productManager.addProduct(productData);
                const products = await productManager.getProducts();  //Una vez que se agrega el nuevo producto volvemos a obtener todos los productos y los enviamos al socket cliente
                io.emit("productsEvent", products); //Se utiliza "io" para enviar la informació a todos los clientes conectados
            } catch (error) {
                socket.emit("codeExistEvent", "El código ingresado ya existe"); // Manejo de error de codigo de producto repetido
            }
            
        });

        //Recibir del socket cliente Id de producto para eliminarlo
        socket.on("deleteProductEvent", async (productId)=> {
            const pid = parseInt(productId);
            console.log("pid:", pid)
            await productManager.deleteProduct(pid);

            const products = await productManager.getProducts();
            io.emit("productsEvent", products);
        })
    } catch (error) {
        res.status(501).send(menssaje.error);
    }
    
    
});




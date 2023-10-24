import express from "express";
import { engine } from 'express-handlebars';
import { Server } from "socket.io";
import { productService, chatService } from "./dao/index.js";
import { __dirname } from "./utils.js";
import path from "path";
import { connectDB } from "./config/dbConnection.js";

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

//Conexión a base de datos
connectDB();

//Middelware para parseo de json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Middelware carpeta public
app.use(express.static(path.join(__dirname,"/public")));


//Configuracion del motor de plantillas
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
        const products = await productService.getProducts();
        socket.emit("productsEvent", products);

        //Recibir el producto del socket cliente
        socket.on("addProductEvent", async (productData)=>{
            try {
                await productService.addProduct(productData);
                const products = await productService.getProducts();  //Una vez que se agrega el nuevo producto volvemos a obtener todos los productos y los enviamos al socket cliente
                io.emit("productsEvent", products); //Se utiliza "io" para enviar la informació a todos los clientes conectados
            } catch (error) {
                socket.emit("codeExistEvent", "El código ingresado ya existe"); // Manejo de error de codigo de producto repetido
            }
            
        });

        //Recibir del socket cliente Id de producto para eliminarlo
        socket.on("deleteProductEvent", async (productId)=> {
            const pId = productId;
            console.log("pid:", pId)
            await productService.deleteProduct(pId);

            const products = await productService.getProducts();
            io.emit("productsEvent", products);
        })
    } catch (error) {
        res.status(501).send(menssaje.error);
    }
    
    
});


// Applicación de CHAT

const messages = [];

io.on('connection', (socket) => {
	// Envio los mensajes al cliente que se conectó
	socket.emit('messages', messages);

	// Escucho los mensajes enviado por el cliente y se los propago a todos
	socket.on('messageClient', (message) => {
		console.log(message);
		// Agrego el mensaje al array de mensajes
		messages.push(message);
		// Propago el evento a todos los clientes conectados
		io.emit('messages', messages);
	});

	socket.on('login', (data) => {
		socket.broadcast.emit('connected', data);
	});
});





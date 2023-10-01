import { ProductManager } from "./fileSystem/productmanager.js";
import { CartManager } from "./fileSystem/cartmanager.js";

import { ProductManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo } from "./mongo/cartsManagerMongo.js";
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";

import { __dirname } from "../utils.js";
import path from "path";

export const productManager = new ProductManager(path.join(__dirname, "/dao/fileSystem/data/products.json"));
export const cartManager = new CartManager(path.join(__dirname, "/dao/fileSystem/data/carts.json"));

export const productService = new ProductManagerMongo();
export const cartsService = new CartsManagerMongo();
export const chatService = new ChatManagerMongo();

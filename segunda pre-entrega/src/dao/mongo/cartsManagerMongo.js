import { cartsModel } from "./models/carts.model.js";
import { productService } from "../index.js";

export class CartsManagerMongo {
    constructor() {
        this.model = cartsModel;
    }

    async getCarts() {
        try {
            const result = await this.model.find().lean().populate("products.productId");
            return result;
        } catch (error) {
            console.log("getCarts", error.message);
            throw new Error("No se pudo obtener el listado de carritos")
        }
    };

    async addCart(cartInfo) {
        try {
            const result = await this.model.create(cartInfo);
            return result;
        } catch (error) {
            console.log("addCart", error.message);
            throw new Error("No se pudo crear el carrito");
        }
    };

    async getCartById(cartId) {
        try {
            const result = await this.model.findById(cartId).lean().populate("products.productId");
            if (! result) {
                throw new Error("No se pudo encontrar el carrito con el ID indicado");
            }
            return result;
        } catch (error) {
            console.log("getCartById", error.message);
            throw new Error("No se se encuenta el carrito");
        }
    };

    async addProductToCart(cartId, productId) {
        try {
            let cartFind = await this.getCartById(cartId);
            let productFind = await productService.getPtoductById(productId);
       
            // Verificar si el producto ya existe en el carrito
            let existingProductIndex = cartFind.products.findIndex((elem) => elem.productId._id.toString() === productFind._id.toString());
        
           
            // Si el producto ya existe, incrementa la cantidad en 1
            if (existingProductIndex !== -1) {
                cartFind.products[parseInt(existingProductIndex)].quantity += 1;

                // Si el producto no existe en el carrito lo agrega
            } else {
                console.log("ELSE")
                cartFind.products.push({productId: productFind._id, quantity: 1});
            };

            // Guarda los cambios en el carrito
            let result = await this.model.findByIdAndUpdate(cartId, cartFind);
            return result;
            
        } catch (error) {
            console.log("addProductToCart", error.message);
            throw new Error("No se se puede agregar el producto al carrito");
        }
    };

    async deleteProductFromCart(cartId, productId) {
        try {
            const cartFind = await this.getCartById(cartId);
            const productIndex = cartFind.products.findIndex((elem) => elem.productId._id.toString() === productId.toString());
           
            if (productIndex !== -1) {
                cartFind.products.splice(productIndex, 1);
            } else {
                throw new Error("El producto no se encuentra en el carrito");
            }
            const result = await this.model.findByIdAndUpdate(cartId, cartFind);
            return result;
        } catch (error) {
            console.log("deleteProductFromCart", error.message);
            throw new Error("No se se puede borrar el producto del carrito");
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {
            const newCart = [];
            const result = await this.model.findByIdAndUpdate(cartId, newCart);
            return result;
        } catch (error) {
            console.log("deleteAllProductsFromCart", error.message);
            throw new Error("No se puede vaciar el carrito");
        }
    }

};

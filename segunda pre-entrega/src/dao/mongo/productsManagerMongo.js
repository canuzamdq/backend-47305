import { productsModel } from "./models/products.model.js";

export class ProductManagerMongo {
    constructor(){
        this.model = productsModel;
    }

    async getProducts() {
        try {
            const result = await this.model.find().lean(); //.lean() para corregir el error de handlebars
            return result;
        } catch (error) {
            console.log("getProducts", error.message);
            throw new Error ("No se pudo obtener el listado de productos")
        }
    };

    async addProduct(productInfo) {
        try {
            const result = await this.model.create(productInfo);
            return result;
        } catch (error) {
            console.log("addProduct", error.message);
            throw new Error("No se pudo crear el producto");
        }
    };

    async getPtoductById(productId) {
        try {
            const result = await this.model.findById(productId);
            if (!result) {
                throw new Error("No se pudo encontrar el producto con el ID indicado");
            }
            return result;
        } catch (error) {
            console.log("getPtoductById", error.message);
            throw new Error("No se pudo obtener el producto");
        }
    };

    async updateProduct(productId, updateProductInfo) {
        try {
            // const restult = await this.model.updateOne({_id: productId}, updateProductInfo);
            const result = await this.model.findByIdAndUpdate(productId, updateProductInfo , {new: true /* retorna el producto actualizado */});
            if (!result) {
                throw new Error("No se pudo encontrar el producto con el ID indicado");
            }
            return result;
        } catch (error) {
            console.log("updateProduct", error.message);
            throw new Error("No se pudo actualizar el producto");
        }
    };

    async deleteProduct(productId) {
        try {
            const result = await this.model.findByIdAndDelete(productId);
            if (!result) {
                throw new Error("No se pudo encontrar el producto con el ID indicado");
            }
            return result;
        } catch (error) {
            console.log("deleteProduct", error.message);
            throw new Error("No se pudo eliminar el producto");
        }
    };


}
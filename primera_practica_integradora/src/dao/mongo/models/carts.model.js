import mongoose from "mongoose";


const cartsCollection = "carts" // Nombre de la colección

const cartsSchema = new mongoose.Schema({
    products: {
        default: [],
        type: [
            {
                productId: String,
                quantity: Number

            }
        ]
    }
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);

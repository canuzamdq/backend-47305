import mongoose, { Mongoose } from "mongoose";


const cartsCollection = "carts" // Nombre de la colección

const cartsSchema = new mongoose.Schema({
    products: {
        default: [],
        type: [
            {
                quantity: {
                    type: Number,
                    default: 1,
                },
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ]
    }

});



export const cartsModel = mongoose.model(cartsCollection, cartsSchema);

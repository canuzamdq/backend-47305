import mongoose from "mongoose";

const productsCollection = "products" //Nombre de la colección

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true,
        enum: ["Informatica", "Celulares", "Accesorios"]
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    thumbnail: {
        type: String,
        default: "sin imagen"
    },
    status: {
        type: Boolean,
        default: true
    }
    
})

export const productsModel = mongoose.model(productsCollection, productsSchema);
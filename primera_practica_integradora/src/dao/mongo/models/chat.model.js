import mongoose from "mongoose";


const chatCollection = "chats" // Nombre de la colección

const chatSchema = new mongoose.Schema({
    messages: {
        default: [],
        type: [
            {
                user: String,
                message: String

            }
        ]
    }
});

export const chatModel = mongoose.model(chatCollection, chatSchema);
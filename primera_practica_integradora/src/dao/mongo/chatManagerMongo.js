import { chatModel } from "./models/chat.model.js";

export class ChatManagerMongo{
    constructor() {
        this.model = chatModel;
    }

    async getChats(){
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            console.log("getChats", error.message);
            throw new Error("No se pudo obtener el listado de chats")
        }
    }

    async saveChats(user, message) {
        try {
            
        } catch (error) {
            console.log("saveChats", error.message);
            throw new Error("No se pudo guardar el mensaje de chat")
        }
    }
}


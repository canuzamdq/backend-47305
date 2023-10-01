import mongoose from "mongoose";

export const connectDB =  async ()=> {
    try {
        await mongoose.connect("mongodb+srv://canuzamdq:boca2011@cluster0.ynmu0on.mongodb.net/ecommerceDB?retryWrites=true&w=majority");
        console.log ("Base de datos conectada")
    } catch (error) {
        console.log (`Error al conectar la base de datos: ${error.messaje}`);
    }
}
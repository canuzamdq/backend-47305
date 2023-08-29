const fs = require("fs");


class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    #newID; // Variable privada para gestionar los ID´s de productos

    // Metodo sincrono para verificar si el archivo existe
    fileExist() {
        return fs.existsSync(this.filePath)
    }

    // Metodo para obtener todos los productos del archivo. Tambien valida que el archivo exista utilizando el método anterior.
    async getProducts() {
        try {
            if (this.fileExist) {
                const products = await fs.promises.readFile(this.filePath, "utf-8");
                return JSON.parse(products);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // Metodo para agregar productos
    async addProduct(title, description, price, thumbnail, code, stock) {
        try { 
            const product = {title, description, price, thumbnail, code, stock};

            // Se verifica que todos los campos para el nuevo producto sean ingresados
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                console.log("Todos los campos son obligatorios");
            } else {
                const fileProducts = await this.getProducts(); // Obtiene los productos del archivo
                const codeExist = fileProducts.find((elem) => elem.code === product.code); // Busca si el codigo de producto ingresado ya existe

                // Si el codigo existe, se termina la ejecución del programa.
                if (codeExist) {
                    return console.log("El codigo de producto ya existe. No se agrega el producto");
                };

                // Asignación de ID al producto
                if (fileProducts.length == 0) {
                    this.#newID = 1;
                } else {
                    this.#newID = fileProducts[fileProducts.length - 1].id + 1;
                }

                // Se crea el nuevo producto
                const newProduct = {
                    id: this.#newID,
                    title,
                    description: product.description,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    code: product.code,
                    stock: product.stock
                }

                // Se graba en el archivo el nuevo producto
                fileProducts.push(newProduct);
                await fs.promises.writeFile(this.filePath,JSON.stringify(fileProducts,null,"\t"));
                console.log("Producto agregado.");
            }

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    // Metodo para buscar productos por us ID
    async getPtoductById(productId) {
        try {
            const fileProducts = await this.getProducts(); //Obtiene los productos del archivo
            const productFind = fileProducts.find((elem)=> elem.id === productId); //Busca el ID ingresado entre los productos existentes
        
        // Verifica si el ID ingresado existe
        if (!productFind) {
            return console.log("No se encontró producto con el id indicado")
        }

        return console.log(productFind); //Retorna el producto encontrado

        } catch (error) {
            console.log(error.menssage);
            throw error;
        }

    }

    //Metodo para modificar un producto. Recibe ID de producto y modificaciones (en foma de objeto) 
    async updateProduct(productId, update ) {
        try {
            const fileProducts = await this.getProducts(); //Obtiene los productos del archivo
            const productFind = fileProducts.find((elem)=> elem.id === productId); //Busca el ID ingresado entre los productos existentes
        
        // Verifica si el ID ingresado existe
        if (!productFind) {
            return console.log("No se encontró producto para modificar con el id indicado")
        }

        const productIndx = fileProducts.findIndex((elem) => elem.id === productId); // Busca el indice del producto a modificar
        fileProducts[productIndx] = { ...fileProducts[productIndx], ...update } // Se guardan las modificaciones 
        await fs.promises.writeFile(this.filePath,JSON.stringify(fileProducts,null,"\t")); // Se graba el archivo
        console.log("Producto modificado.")
        
        } catch (error) {
            console.log(error.menssage);
            throw error;
        }

    }

    //Metodo para eliminar un producto por su ID
    async deleteProduct(productId) {
        try {
            const fileProducts = await this.getProducts();
            const deletedProduct = fileProducts.find((elem) => elem.id === productId);
           
            if (!deletedProduct){ // Veridica si el ID ingresado existe
                return console.log("No se encuentra producto para borrar con el ID indicado")
            }

            const products = fileProducts.filter((elem) => elem.id !== productId); // Filtra los productos que no coincidadn con el id ingresado
            await fs.promises.writeFile(this.filePath,JSON.stringify(products,null,"\t")); // Graba en el archivo
        
        } catch (error) {
            console.log(error.menssage);
            throw error;
        }
    }
}

async function test() {
    try {
        const manager = new ProductManager("products.json");

        const products = await manager.getProducts(); // Obtiene los produtctos del archivo
        console.log(products); // Se muestan los productos (en este caso arreglo vacio [])

        // await manager.addProduct("producto1","descripcion1", 25, "sin imagen","CODE1", 10); // Agreaga producto
        // await manager.addProduct("producto1","descripcion1", 25, "sin imagen","CODE1", 10); // Se ingresa mismo codigo que el producto anterior. No se agrega.
        // await manager.addProduct("producto2","descripcion2", 55, "sin imagen","CODE2", 5); // Agreaga producto
        // //await manager.addProduct("producto3","descripcion3", 55, "sin imagen","CODE3", 5); // Agreaga producto
        // console.log(products); // Muestra los productos agregados recientemente.

        // await manager.getPtoductById(2); //Obtiene el producto con ID 2
        // await manager.getPtoductById(99); //No encuentra producto 
        // await manager.updateProduct(1, { title:"modificado", stock: 1 }); //Modifica el title y stock del producto con ID 1
        // console.log("Productos despues de la modificación: ", products) 

        // await manager.deleteProduct(3); // Borra el producto con el ID 3
        // console.log("Productos despues de borrar: ", products);

    } catch (error) {
        console.log(error.message);
    }
}

test();

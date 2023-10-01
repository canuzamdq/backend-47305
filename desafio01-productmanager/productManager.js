class ProductManager {

    #newID // Variable privada para gestionar los ID de productos

    constructor() {
        this.products = []
    };

    addProduct (title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log("Todos los campos son obligatorios");
        };

        const codeExist = this.products.find((elem) => elem.code === code);
        if (codeExist) {
            return console.log("El código ingresado ya existe. No se agrega el producto");
        }

        if (this.products.length == 0) {
            this.#newID = 1;
        } else {
            this.#newID = this.products[this.products.length-1].id+1;
        }

        const newProduct = {
            id : this.#newID,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        console.log("Producto agregado.");
    }

    getProducts() {
        return console.log("Listado de productos: \n", this.products);
    }

    getProductByID(id) {
        const findID = this.products.find((elem)=> elem.id === id);
        if (findID) {
            return console.log ("Producto encontrado:", findID)
        } else{
            console.log("No se encuentra producto con el ID indicado.")
        }
    }
        
    
}

const manager = new ProductManager();

/* manager.getProducts(); // Obtiene todos los productos del arreglo. En este caso está vacío.
manager.addProduct("Producto de prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25); // Agrega el producto al arreglo
manager.addProduct("Producto de prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25); // Mismo "code" que el producto anterior. No se agrega el producto.
manager.addProduct("Producto de prueba2", "Este es un producto de prueba2", 200, "Sin imagen", "abc124", 20); // Agrega el producto al arreglo
manager.addProduct("Este es un producto de prueba2", 200, "Sin imagen", "abc126", 20); // No agrega el producto por que no se ingresaron todas las propiedades
manager.getProductByID(2); //Obtiene el producto con el ID 2 del arreglo.
manager.getProductByID(99); // No encuentra producto por que el ID 99 no existe en el arreglo de productos.
 */
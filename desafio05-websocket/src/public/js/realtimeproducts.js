const socketClient = io();

//Elementos capturados
const productsList = document.getElementById("productsList");
const createProductForm = document.getElementById("createProductForm");

//Envio de información del formulario al socket del servidor
createProductForm.addEventListener("submit", (event)=> {
    event.preventDefault();
    const formData = new FormData(createProductForm); //captura los valores de los campos del formulario
    //console.log(formData.get("title"))
    const jsonData = {};
    for(const [key, value] of formData.entries()) { // for of crea un objeto con cada uno de los elementeos de un array (en este caso formData)
        jsonData[key] = value;
    }
    jsonData.price = parseInt(jsonData.price); 
    
    socketClient.emit("addProductEvent", jsonData); //Enviamos el objeto con informacion del producto al socket del servidor
    createProductForm.reset(); //Resetea el formulario de productos
});


//Recibimos los productos desde el servidor (app.js)
socketClient.on("productsEvent", (dataProducts)=> {
    // console.log("Productos:", dataProducts);
    let productsElement = "";
    dataProducts.forEach(element => {
        productsElement +=
        `<li>
            <p>Nombre: ${element.title} / Precio: $${element.price}</p> <button onclick=deleteProduct(${element.id})>Eliminar</button>
        </li>`
        productsList.innerHTML = productsElement; 
    });
})

const deleteProduct = (productId)=> {
    socketClient.emit("deleteProductEvent", productId);
}
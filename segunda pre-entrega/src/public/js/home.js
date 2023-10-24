

const addToCart = async (productId)=>{
    try {
        console.log("PROD-ID", productId)
        const response = await fetch(`/api/carts/6519cd9f19995d4ef36cb468/${productId}`, {
            method: "POST",
        });
        if (response.ok) {
            const data = await response.json();
            alert('Producto agregado al carrito:', data);
        } else {
            console.error('No se puede agragar el producto al carrito');
        }

    } catch (error) {
        console.error('Error al agregar el producto al carrito');
    }
}

const delProduct = async (productId) => {
  
    try {
        const response = await fetch(`/api/carts/6519cd9f19995d4ef36cb468/${productId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            const data = await response.json();
            alert('Producto eliminado del carrito:', data);
        } else {
            console.error('No se puede eliminar el producto al carrito');
        }

    } catch (error) {
        console.error('Error al eliminar el producto al carrito');
    }
}
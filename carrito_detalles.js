const urlParams = new URLSearchParams(window.location.search);
const carritoId = urlParams.get('carritoId');

// Función para cargar los productos del carrito
function cargarDetallesCarrito() {
    console.log(`Cargando detalles del carrito con ID: ${carritoId}`);

    fetch(`https://fakestoreapi.com/carts/${carritoId}`)
        .then(res => res.json())
        .then(data => {
            const detalleCarritoList = document.getElementById('detalle-carrito-list');
            detalleCarritoList.innerHTML = '';
            const productos = data.products;
            let total = 0;

            if (productos.length === 0) {
                detalleCarritoList.innerHTML = `<tr><td colspan="4" class="text-center">No hay productos en este carrito.</td></tr>`;
                return;
            }

            productos.forEach(producto => {
                fetch(`https://fakestoreapi.com/products/${producto.productId}`)
                    .then(res => res.json())
                    .then(infoProducto => {
                        const subtotal = infoProducto.price * producto.quantity;
                        total += subtotal;

                        // Agregar la fila del producto en la tabla
                        detalleCarritoList.innerHTML += `
                            <tr>
                                <td>${infoProducto.title}</td>
                                <td>${producto.quantity}</td>
                                <td>$${infoProducto.price.toFixed(2)}</td>
                                <td>$${subtotal.toFixed(2)}</td>
                            </tr>
                        `;

                        // Actualizar el total
                        document.getElementById('total-pedido').textContent = `$${total.toFixed(2)}`;
                    })
                    .catch(error => console.error('Error al cargar el producto:', error));
            });
        })
        .catch(error => {
            console.error('Error al cargar el carrito:', error);
            document.getElementById('detalle-carrito-list').innerHTML = `<tr><td colspan="4" class="text-center text-danger">Error al cargar los detalles del carrito.</td></tr>`;
        });
}

// Llamar a la función para cargar los detalles del carrito
if (carritoId) {
    cargarDetallesCarrito();
} else {
    console.error('No se ha proporcionado un ID de carrito válido.');
}

function logout() {
    alert("Sesión cerrada. Volviendo al login...");
    window.location.href = 'index.html'; 
}

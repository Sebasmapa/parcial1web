// Crear un arreglo para almacenar los productos en el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); 
    updateCartButton(); 
});

// Función para cargar productos de la API 
async function loadProducts(category = "") {
    let url = 'https://fakestoreapi.com/products';
    
    if (category) {
        url += `/category/${category}`;
    }

    try {
        const response = await fetch(url);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="col-sm-6 col-md-3">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <div class="mt-auto">
                            <h5 class="text-success">$ ${product.price}</h5>
                            <button class="btn btn-warning btn-block" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Función para agregar un producto al carrito
function addToCart(id, title, price, image) {
    const existingProduct = cart.find(product => product.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartButton();
    alert("Producto agregado al carrito.");
}

// Función para actualizar el botón del carrito con la cantidad de productos
function updateCartButton() {
    const cartButton = document.querySelector('.btn-primary');
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartButton.textContent = `Carrito (${totalItems})`;
}

function showCart() {
    window.location.href = 'carrito.html';
}

function logout() {
    alert("Sesión cerrada. Volviendo al login...");
    window.location.href = 'index.html'; 
}

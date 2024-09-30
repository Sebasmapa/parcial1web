// Cargar productos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // Llama a la función sin pasar ninguna categoría
});

// Función para cargar productos de la API
async function loadProducts(category = "") {
    let url = 'https://fakestoreapi.com/products';
    
    // Si hay una categoría específica, ajusta la URL
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

// Función para mostrar los productos en la página
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
                        <p class="card-text text-truncate">${product.description}</p>
                        <div class="mt-auto">
                            <h5 class="text-success">$ ${product.price}</h5>
                            <button class="btn btn-warning btn-block">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Función para filtrar productos por texto
function filterProducts() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const cards = document.querySelectorAll('#product-list .card');

    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        if (title.includes(searchText) || description.includes(searchText)) {
            card.parentElement.style.display = "block";
        } else {
            card.parentElement.style.display = "none";
        }
    });
}

// Función para simular el cierre de sesión
function logout() {
    alert("Sesión cerrada. Volviendo al login...");
    window.location.href = "index.html"; 
}

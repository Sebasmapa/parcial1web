document.addEventListener('DOMContentLoaded', () => {
    // Cargar los carritos del usuario al cargar la página
    fetch('https://fakestoreapi.com/carts/user/2')
        .then(res => res.json())
        .then(data => {
            const carritoList = document.getElementById('carrito-list');
            carritoList.innerHTML = ''; // Limpiar la tabla antes de rellenarla

            data.forEach(cart => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cart.id}</td>
                    <td>${new Date(cart.date).toLocaleDateString()}</td>
                    <td><a href="carrito_detalles.html?carritoId=${cart.id}">ver</a></td>
                `;
                carritoList.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar los carritos:', error));
});

function logout() {
    alert("Sesión cerrada. Volviendo al login...");
    window.location.href = 'index.html'; 
}
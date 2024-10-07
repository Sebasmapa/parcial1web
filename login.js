function handleLogin(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(json => {
        if (json.token) {
            alert("Inicio de sesión exitoso");
            sessionStorage.setItem('authToken', json.token); // Guarda el token en el sessionStorage
            window.location.href = 'productos.html';
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    })
    .catch(error => {
        console.error("Error durante el inicio de sesión:", error);
        alert("Ocurrió un error, por favor intenta nuevamente.");
    });
}

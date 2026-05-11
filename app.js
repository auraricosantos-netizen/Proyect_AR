// app.js

let selectedAvatar = null;
let userName = "";

function irAPersonajes() {
    userName = document.getElementById("username").value;
    if (userName.trim() === "") return alert("Por favor, ingresa tu nombre.");
    
    document.getElementById("step-1").style.display = "none";
    document.getElementById("step-2").style.display = "block";
}

function seleccionarAvatar(id, nombre) {
    selectedAvatar = id;
    
    // Quitar la clase 'selected' de todos y agregarla al elegido
    document.querySelectorAll('.avatar-card').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.avatar-card')[id-1].classList.add('selected');
    
    document.getElementById("start-btn").style.display = "inline-block";
}

function iniciarAventura() {
    if (!selectedAvatar) return alert("Por favor, selecciona un avatar.");

    // Crear un ID único basado en la fecha y hora
    const nuevoUserId = Date.now().toString();
    
    // Guardar en Firebase (usamos la variable 'database' que viene de firebase-config.js)
    database.ref('usuarios/' + nuevoUserId).set({
        nombre: userName,
        avatar: selectedAvatar,
        nivel: 1,
        monedas: 0,
        estado_mision: "espera",
        fecha_ingreso: new Date().toISOString()
    }).then(() => {
        // Redirigir al laberinto pasando el ID en la URL
        window.location.href = `laberinto.html?id=${nuevoUserId}`;
    }).catch(error => {
        console.error("Error al iniciar aventura:", error);
        alert("Hubo un error al conectar con la base de datos.");
    });
}
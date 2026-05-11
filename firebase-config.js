// firebase-config.js

// 1. Configuración de tu proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA2HtJXcsN-lmvU5FFgHCIRuppZ3K7OvWQ",
    authDomain: "restauradores-del-aprendizaje.firebaseapp.com",
    databaseURL: "https://restauradores-del-aprendizaje-default-rtdb.firebaseio.com",
    projectId: "restauradores-del-aprendizaje",
    storageBucket: "restauradores-del-aprendizaje.firebasestorage.app",
    messagingSenderId: "394844137430",
    appId: "1:394844137430:web:fe28fb64f127a3977be677"
};

// 2. Inicializar Firebase (solo si no se ha inicializado antes)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// 3. Variables globales para acceder a la base de datos
const db = firebase.database();
const database = firebase.database(); // Mantenemos ambas por si la usaste con distintos nombres

// 4. Capturar el ID del usuario de la URL (si existe en la página actual)
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
/* === DECORACIÓN DE ALERTS MÁGICOS === */

// 1. Inyectamos los estilos del pergamino en el documento
const estilosAlert = document.createElement('style');
estilosAlert.innerHTML = `
    .magic-alert-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px);
        display: flex; justify-content: center; align-items: center;
        z-index: 99999; opacity: 0; transition: opacity 0.3s;
    }
    .magic-alert-box {
        background: #fdf5e6; border: 8px double #8b4513; padding: 30px;
        width: 80%; max-width: 400px; text-align: center;
        border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        transform: scale(0.7); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        background-image: url('https://www.transparenttextures.com/patterns/paper-fibers.png');
    }
    .magic-alert-box h2 { font-family: 'Cinzel', serif; color: #5d4037; margin-top: 0; }
    .magic-alert-box p { font-family: 'Quicksand', sans-serif; font-size: 1.1rem; color: #2e4c2e; font-weight: bold; }
    .magic-alert-btn {
        background: #8b4513; color: white; border: none; padding: 10px 25px;
        font-family: 'Cinzel', serif; border-radius: 5px; cursor: pointer;
        margin-top: 15px; transition: 0.2s;
    }
    .magic-alert-btn:hover { background: #5d4037; transform: scale(1.1); }
`;
document.head.appendChild(estilosAlert);

// 2. Sobreescribimos la función alert nativa
window.alert = function(mensaje) {
    // Crear elementos
    const overlay = document.createElement('div');
    overlay.className = 'magic-alert-overlay';
    
    overlay.innerHTML = `
        <div class="magic-alert-box">
            <h2>📜 Aviso del Bosque</h2>
            <p>${mensaje}</p>
            <button class="magic-alert-btn">ENTENDIDO</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Animación de entrada
    setTimeout(() => {
        overlay.style.opacity = "1";
        overlay.querySelector('.magic-alert-box').style.transform = "scale(1)";
    }, 10);

    // Función para cerrar
    const cerrar = () => {
        overlay.style.opacity = "0";
        overlay.querySelector('.magic-alert-box').style.transform = "scale(0.7)";
        setTimeout(() => { overlay.remove(); }, 300);
    };

    overlay.querySelector('.magic-alert-btn').onclick = cerrar;
    overlay.onclick = (e) => { if(e.target === overlay) cerrar(); };
};

/* === GUARDIÁN DE ROTACIÓN MÁGICO === */

// 1. Creamos los estilos para el bloqueo de pantalla
const estilosRotacion = document.createElement('style');
estilosRotacion.innerHTML = `
    #bloqueo-rotacion {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #1a2a1a; color: white;
        display: none; flex-direction: column; justify-content: center; align-items: center;
        z-index: 100000; text-align: center; font-family: 'Cinzel', serif;
    }
    .phone-icon {
        width: 80px; height: 130px; border: 4px solid white; border-radius: 10px;
        margin-bottom: 20px; animation: rotatePhone 2s infinite ease-in-out;
        position: relative;
    }
    .phone-icon::after {
        content: ''; position: absolute; bottom: 5px; left: 50%;
        transform: translateX(-50%); width: 10px; height: 10px;
        border: 2px solid white; border-radius: 50%;
    }
    @keyframes rotatePhone {
        0% { transform: rotate(0deg); }
        50% { transform: rotate(-90deg); }
        100% { transform: rotate(0deg); }
    }
    #bloqueo-rotacion h2 { margin: 10px 20px; font-size: 1.5rem; color: #8fce8f; }
    #bloqueo-rotacion p { font-family: 'Quicksand', sans-serif; padding: 0 30px; }

    /* Mostrar solo cuando la pantalla es más alta que ancha (Vertical) */
    @media (orientation: portrait) {
        #bloqueo-rotacion { display: flex; }
    }
`;
document.head.appendChild(estilosRotacion);

// 2. Inyectamos el HTML del bloqueo al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const divBloqueo = document.createElement('div');
    divBloqueo.id = 'bloqueo-rotacion';
    divBloqueo.innerHTML = `
        <div class="phone-icon"></div>
        <h2>GIRA TU DISPOSITIVO</h2>
        <p>Para una mejor experiencia en el Bosque Mágico, por favor usa el modo horizontal.</p>
    `;
    document.body.appendChild(divBloqueo);
});
// juego.js - Versión Robusta con 10 Sesiones y Arte de Fantasía
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Función para ajustar el tamaño del lienzo
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let nivelActual = 1;
let misionActiva = false;
let frameCount = 0;

// Recuperar el ID del usuario de la URL o de la configuración global
const urlParams = new URLSearchParams(window.location.search);
const idUsuario = urlParams.get("id") || (typeof userId !== 'undefined' ? userId : null);

// 1. LAS 10 SESIONES (Datos de Misiones y Frases Sagradas)
const sesiones = {
    1: { titulo: "Villa Raíz", icono: "🌳", intro: "Busca el Código QR inicial para activar tu conexión.", frase: "EL APRENDIZAJE ES LA LLAVE", link: null },
    2: { titulo: "Aldea Cubo", icono: "🌊", intro: "Usa el Merge Cube para ver lo invisible en esta dimensión.", frase: "POR MEDIO DEL ARTE SE LOGRA UN APRENDIZAJE MAS SIGNIFICATIVO", link: "merge.html" },
    3: { titulo: "Valle Quiver", icono: "🧚", intro: "La disciplina y el arte cobran vida propia aquí.", frase: "LA MAGIA DE LA RESPONSABILIDAD Y LA DISCIPLINA CONSTRUYE UN APRENDIZAJE SEGURO", link: "quiver.html" },
    4: { titulo: "Metrópolis Meta", icono: "🏰", intro: "Construye tu propia realidad tecnológica en la ciudad del futuro.", frase: "TODOS TENEMOS UNA MISION FRENTE AL PROCESO DE LA ENSEÑANZA", link: "meta.html" },
    5: { titulo: "Nexo Sincronía", icono: "🏝️", intro: "El conocimiento debe compartirse para que brille.", frase: "EL CONOCIMIENTO NO DEBE OCULTARSE DEBE HACERSE VISIBLE", link: "online.html" },
    6: { titulo: "Fuerte Investigación", icono: "🏛️", intro: "Investiga los secretos ocultos desde múltiples ángulos.", frase: "EL CONOCIMIENTO SE CONSTRUYE CUANDO PUEDE SER INVESTIGADO DESDE MULTIPLES DIMENSIONES", link: "merge.html" },
    7: { titulo: "Santuario Vida", icono: "❤️", intro: "Entiende el latido vital del proceso de aprendizaje.", frase: "CUANDO EL APRENDIZAJE SE CONSTRUYE SE VELVE MAS SIGNIFICATIVO", link: "anatomy.html" },
    8: { titulo: "Pico Arloopa", icono: "🏔️", intro: "Descubre lo que otros no ven a simple vista en las alturas.", frase: "APRENDER ES DESCUBRIR LO QUE NO SE VEA A SIMPLE VISTA", link: "arloopa.html" },
    9: { titulo: "Portal 360", icono: "🌀", intro: "Explora horizontes infinitos para comprender la realidad.", frase: "EXPLORAR EL MUNDO DESDE TODAS SUS DIMENSIONES NOS PERMITE COMPRENDER LA REALIDAD", link: "https://ar-code.com/ZkaY9AKUE" },
    10: { titulo: "Ciudadela Final", icono: "🗼", intro: "Supera el reto de maestría final en la torre del saber.", frase: "GAMIFICACION INMERSIVA", link: "prueba.html" }
};

// 2. COORDENADAS RELATIVAS (0.0 a 1.0 para que se adapte a cualquier pantalla)
const estaciones = [
    { x: 0.12, y: 0.70, nombre: "Villa Raíz" },
    { x: 0.28, y: 0.60, nombre: "Aldea Cubo" },
    { x: 0.22, y: 0.40, nombre: "Valle Quiver" },
    { x: 0.38, y: 0.25, nombre: "Ciudad Meta" },
    { x: 0.50, y: 0.50, nombre: "Pueblo Sincronía" },
    { x: 0.65, y: 0.65, nombre: "Fuerte Investigación" },
    { x: 0.78, y: 0.45, nombre: "Santuario Vida" },
    { x: 0.70, y: 0.20, nombre: "Pico Arloopa" },
    { x: 0.85, y: 0.25, nombre: "Portal 360" },
    { x: 0.92, y: 0.50, nombre: "Ciudadela Final" }
];

// 3. ELEMENTOS DEL MAPA (Decoración, Bestias y Vegetación)
const decoraciones = [
    { x: 0.15, y: 0.25, tipo: 'montaña', label: 'Montes del Olvido' },
    { x: 0.82, y: 0.82, tipo: 'bestia', label: 'Kraken de la Ignorancia' },
    { x: 0.45, y: 0.12, tipo: 'nube' },
    { x: 0.05, y: 0.08, tipo: 'brujula' }
];

const vegetacion = [];
for(let i=0; i<85; i++) {
    vegetacion.push({ x: Math.random(), y: Math.random(), offset: Math.random() * 10 });
}

let player = { emoji: '👣', x: estaciones[0].x, y: estaciones[0].y, speed: 0.04 };

// 4. MOTOR DE DIBUJO
function draw() {
    frameCount++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo: Degradado de Bosque Mágico
    const grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, canvas.width);
    grd.addColorStop(0, "#1a3c1a");
    grd.addColorStop(1, "#051405");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar Vegetación Animada
    ctx.fillStyle = "#0d2a0d";
    vegetacion.forEach(v => {
        let sway = Math.sin(frameCount * 0.03 + v.offset) * 2;
        let vx = v.x * canvas.width;
        let vy = v.y * canvas.height;
        ctx.beginPath();
        ctx.moveTo(vx + sway, vy);
        ctx.lineTo(vx - 6 + sway, vy + 14);
        ctx.lineTo(vx + 6 + sway, vy + 14);
        ctx.fill();
    });

    // Decoraciones Especiales
    decoraciones.forEach(d => {
        let dx = d.x * canvas.width;
        let dy = d.y * canvas.height;
        ctx.textAlign = "center";
        
        if(d.tipo === 'montaña') {
            ctx.font = "45px Arial";
            ctx.fillText("🏔️", dx, dy);
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.font = "italic 11px Cinzel";
            ctx.fillText(d.label, dx, dy + 20);
        } else if (d.tipo === 'bestia') {
            let move = Math.sin(frameCount * 0.02) * 8;
            ctx.font = "60px Arial";
            ctx.fillText("🐉", dx, dy + move);
            ctx.fillStyle = "rgba(255,215,0,0.4)";
            ctx.font = "italic 11px Cinzel";
            ctx.fillText(d.label, dx, dy + move + 25);
        } else if (d.tipo === 'brujula') {
            ctx.save();
            ctx.translate(dx + 50, dy + 50);
            ctx.rotate(frameCount * 0.006);
            ctx.font = "70px Arial";
            ctx.fillText("🧭", 0, 18);
            ctx.restore();
        }
    });

    // Dibujar Camino Futuro (Puntos tenues)
    ctx.beginPath();
    ctx.setLineDash([5, 12]);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.moveTo(estaciones[0].x * canvas.width, estaciones[0].y * canvas.height);
    for(let i=1; i<estaciones.length; i++) {
        ctx.lineTo(estaciones[i].x * canvas.width, estaciones[i].y * canvas.height);
    }
    ctx.stroke();

    // Dibujar Camino Realizado (Neón brillante)
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = "#00f2ff";
    ctx.lineWidth = 5;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00f2ff";
    ctx.moveTo(estaciones[0].x * canvas.width, estaciones[0].y * canvas.height);
    for(let i=1; i < nivelActual; i++) {
        ctx.lineTo(estaciones[i].x * canvas.width, estaciones[i].y * canvas.height);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Dibujar Estaciones
    estaciones.forEach((est, i) => {
        const n = i + 1;
        const actual = n === nivelActual;
        const completada = n < nivelActual;
        let ex = est.x * canvas.width;
        let ey = est.y * canvas.height;

        // Efecto de aura para la estación actual
        if(actual) {
            ctx.fillStyle = "rgba(255, 204, 0, 0.25)";
            ctx.beginPath();
            ctx.arc(ex, ey, 40 + Math.sin(frameCount * 0.1) * 6, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = actual ? "#f1c40f" : (completada ? "#2ecc71" : "#333");
        ctx.beginPath();
        ctx.arc(ex, ey, 16, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(sesiones[n].icono, ex, ey - 25);

        ctx.fillStyle = actual ? "white" : "rgba(255,255,255,0.4)";
        ctx.font = "bold 11px Orbitron, sans-serif";
        ctx.fillText(est.nombre.toUpperCase(), ex, ey + 42);
    });

    // Mover y Dibujar Jugador
    let tEst = estaciones[nivelActual - 1] || estaciones[0];
    let tx = tEst.x * canvas.width;
    let ty = tEst.y * canvas.height;
    player.x += (tx - player.x) * player.speed;
    player.y += (ty - player.y) * player.speed;
    
    let bounce = Math.abs(Math.sin(frameCount * 0.15)) * 12;
    ctx.font = "48px Arial";
    ctx.fillText(player.emoji, player.x, player.y - bounce);

    requestAnimationFrame(draw);
}

// 5. INTERACCIÓN Y EVENTOS
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    estaciones.forEach((est, i) => {
        let ex = est.x * canvas.width;
        let ey = est.y * canvas.height;
        const dist = Math.hypot(mx - ex, my - ey);
        if (dist < 50) {
            const n = i + 1;
            if (n === nivelActual) {
                abrirMision();
            } else if (n < nivelActual) {
                // Permitir volver a ver el baúl de un nivel superado
                document.getElementById("modal-baul").style.display = 'flex';
            }
        }
    });
});

function abrirMision() {
    const s = sesiones[nivelActual];
    if (!s) return;
    misionActiva = true;
    document.getElementById("titulo-mision").innerText = s.titulo;
    document.getElementById("texto-intro").innerHTML = `<p>${s.intro}</p><p style="color:#8b4513; font-style:italic; font-weight:bold;">"${s.frase}"</p>`;
    document.getElementById("modal-intro").style.display = 'flex';
}

function abrirActividad() {
    const s = sesiones[nivelActual];
    if (s.link) {
        // Concatenar el ID para no perder la sesión
        const separador = s.link.includes('?') ? '&' : '?';
        window.location.href = s.link + separador + "id=" + idUsuario;
    } else {
        // Si es Villa Raíz (sin link externo), abrimos el baúl directamente
        document.getElementById("modal-intro").style.display = 'none';
        document.getElementById("modal-baul").style.display = 'flex';
    }
}

function validarMision() {
    const val = document.getElementById("phrase-input").value.toUpperCase().trim();
    const correcta = sesiones[nivelActual].frase.toUpperCase();
    if (val === correcta) {
        // Incrementar nivel en Firebase
        db.ref('usuarios/' + idUsuario).update({ 
            nivel: nivelActual + 1,
            monedas: nivelActual * 100,
            timestamp: Date.now()
        }).then(() => {
            document.getElementById("modal-baul").style.display = 'none';
            document.getElementById("phrase-input").value = "";
            misionActiva = false;
        });
    } else {
        alert("¡Esa no es la frase sagrada! Revisa la dimensión de nuevo.");
    }
}

// 6. SINCRONIZACIÓN FIREBASE
if (idUsuario) {
    db.ref('usuarios/' + idUsuario).on('value', snap => {
        const d = snap.val();
        if (d) {
            nivelActual = d.nivel || 1;
            player.emoji = d.emoji || '👤';
            if(document.getElementById("ui-nivel")) document.getElementById("ui-nivel").innerText = nivelActual;
            
            // Si el nivel supera el 10, redirigir a la victoria
            if (nivelActual > 10) {
                window.location.href = "victoria.html?id=" + idUsuario;
            }
        }
    });
}

// Iniciar el ciclo de dibujo al cargar
window.onload = () => {
    resize();
    draw();
};
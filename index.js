const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas al tamaño del contenedor
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// Inicializar las estrellas con posiciones y velocidades aleatorias
const stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 2 + 1 // Velocidad aleatoria entre 1 y 3
    });
}

// Cargar la imagen de la nave espacial
const naveImage = new Image();
naveImage.src = 'nave.png';

// Función para dibujar estrellas
function drawStar(x, y, radius) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

// Función para dibujar el fondo del canvas
function drawBackground() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Función para dibujar planetas con gradiente radial
function drawPlanet(x, y, radius, innerColor, outerColor) {
    const gradient = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
    gradient.addColorStop(0, innerColor);
    gradient.addColorStop(1, outerColor);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

// Función para dibujar cometa
function drawComet(x, y, radius) {
    // Dibujar la cabeza del cometa
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Dibujar la cola del cometa
    const gradient = ctx.createLinearGradient(x, y, x - 100, y - 100);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 100, y - 50);
    ctx.lineTo(x - 80, y - 80);
    ctx.lineTo(x, y);
    ctx.fill();
}

// Dibujar estrellas con animación de movimiento
function drawMovingStars() {
    // Dibujar el fondo del canvas
    drawBackground();

    // Dibujar múltiples estrellas en posiciones aleatorias
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.y += star.speed; // Mover la estrella hacia abajo

        // Si la estrella sale de la pantalla, restablecerla en la parte superior
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }

        drawStar(star.x, star.y, star.radius);
    }

    // Dibujar planetas
    drawPlanet(200, 200, 50, 'lightblue', 'blue');
    drawPlanet(600, 150, 70, 'lightgreen', 'green');
    drawPlanet(400, 400, 40, 'lightcoral', 'red');

    // Dibujar el cometa
    drawComet(700, 500, 10);

    // Dibujar la nave espacial
    ctx.drawImage(naveImage, 400, 550);
}

// Función para animar las estrellas
function animate() {
    requestAnimationFrame(animate);
    drawMovingStars();
}

// Iniciar la animación
animate();

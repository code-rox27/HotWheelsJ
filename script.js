document.addEventListener('DOMContentLoaded', () => {
  // Splash Screen
  const splash = document.getElementById('splash');
  const btnEntrar = document.getElementById('btnEntrar');
  
  if (btnEntrar && splash) {
    btnEntrar.addEventListener('click', () => {
      splash.classList.add('oculto');
    });
  }

  // Fondo Spotlight
  const hero = document.getElementById('hero');
  const spotlight = document.getElementById('spotlight');

  if (hero && spotlight) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.setProperty('--mx', `${x}px`);
      spotlight.style.setProperty('--my', `${y}px`);
    });
  }

  // Pruebas e Interactividad del Tablero (CON CARRITOS HOT WHEELS)
  const pruebasContainer = document.getElementById('pruebas');
  const progresoText = document.getElementById('progreso');
  const miniTracker = document.getElementById('miniTracker');
  const candado = document.getElementById('candado');
  let revisadasCount = 0;

  // Icono vectorial SVG de carrito
  const svgCarrito = `
    <svg viewBox="0 0 24 24" fill="none" stroke="#d9ad4f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.3 1L2 12v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <circle cx="17" cy="17" r="2"/>
      <path d="M9 17h6"/>
    </svg>
  `;

  const listaPruebas = [
    { id: 1, titulo: "PRUEBA #01", nota: "Tus mensajes secos por chat... pero tus mimados en persona." },
    { id: 2, titulo: "PRUEBA #02", nota: "Tus insultos de 'cariño' que ya son nuestro lenguaje de amor." },
    { id: 3, titulo: "PRUEBA #03", nota: "Tu sentido del humor y aguantarme el bullying mutuo." },
    { id: 4, titulo: "PRUEBA #04", nota: "Lo bien que te ves con ese uniforme (imposible ignorarlo)." },
    { id: 5, titulo: "PRUEBA #05", nota: "Hacer que nuestra relación 'rara' sea mi favorita." }
  ];
  
  if (pruebasContainer) {
    listaPruebas.forEach((p, index) => {
      const wrap = document.createElement('div');
      wrap.className = 'prueba-wrap';
      setTimeout(() => wrap.classList.add('entra'), index * 120);

      const div = document.createElement('div');
      div.className = 'prueba';
      div.innerHTML = `
        ${svgCarrito}
        <div class="tagp">${p.titulo}</div>
        <div class="nota">${p.nota}</div>
      `;

      div.addEventListener('click', () => {
        if (!div.classList.contains('abierta')) {
          div.classList.add('abierta', 'vroom');
          revisadasCount++;
          actualizarProgreso();
        }
      });

      wrap.appendChild(div);
      pruebasContainer.appendChild(wrap);
    });
  }

  function actualizarProgreso() {
    if (progresoText) progresoText.textContent = `Expediente revisado: ${revisadasCount}/5`;
    if (miniTracker) miniTracker.textContent = `🔍 Expediente: ${revisadasCount}/5`;

    if (revisadasCount === 5) {
      if (candado) {
        candado.classList.add('listo');
        candado.textContent = "🔓 ¡Todas las pruebas revisadas! Toca aquí para ver el archivo secreto";
        candado.addEventListener('click', desbloquearArchivoSecreto);
      }
      if (miniTracker) {
        miniTracker.classList.add('listo');
        miniTracker.textContent = "🔓 Ver secreto";
        miniTracker.addEventListener('click', () => {
          desbloquearArchivoSecreto();
          window.location.hash = '#seccionSecreta';
        });
      }
    }
  }

  // Carta Secreta
  function desbloquearArchivoSecreto() {
    const seccionSecreta = document.getElementById('seccionSecreta');
    const secreto = document.getElementById('secreto');
    const cartaSecreta = document.getElementById('cartaSecreta');

    if (seccionSecreta && secreto) {
      seccionSecreta.style.display = 'block';
      setTimeout(() => secreto.classList.add('abierto'), 50);

      if (cartaSecreta) {
        cartaSecreta.textContent = "Podrás ser algo seco por chat y mandarme a volar en broma, pero la verdad es que la pasamos muy bien juntos: entre comer rico, chismosear, criticar a medio mundo, jugarnos pesado e insultarnos de cariño.\n\nPD: Y tranquilo, que esta página virtual es solo el detalle... ¡tu regalo en físico te espera en persona! 🏎️💨\n\nFeliz día, mi policía favorito.";
      }

      const sello = document.getElementById('sello');
      if (sello) sello.classList.add('golpe');
      lanzarConfeti();
    }
  }

  // Generador de Confeti
  function lanzarConfeti() {
    const confetiContainer = document.getElementById('confeti');
    if (!confetiContainer) return;

    for (let i = 0; i < 40; i++) {
      const span = document.createElement('span');
      span.style.left = `${Math.random() * 100}vw`;
      span.style.animationDuration = `${2 + Math.random() * 3}s`;
      span.style.backgroundColor = ['#d9ad4f', '#e4392b', '#2e6fe0'][Math.floor(Math.random() * 3)];
      span.style.width = '7px';
      span.style.height = '7px';
      span.style.borderRadius = '50%';
      confetiContainer.appendChild(span);
    }
  }
});
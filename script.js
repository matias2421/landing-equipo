
    /* ── Año dinámico en el copyright ── */
    document.getElementById('yr').textContent = new Date().getFullYear();
 
    /* ── Cursor personalizado ──────────────────────────────
       El punto sigue la posición exacta del mouse.
       El anillo sigue con inercia usando interpolación lineal (lerp),
       lo que crea el efecto de "lag suave" característico de
       los cursores premium.
    ──────────────────────────────────────────────────────── */
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0;  // posición actual del mouse
    let rx = 0, ry = 0;  // posición actual del anillo (con lag)
 
    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    });
 
    (function animCursor() {
      // Punto: actualización directa
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      // Anillo: lerp (0.14 = velocidad de seguimiento)
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animCursor);
    })();
 
    /* ── Animaciones de entrada on-scroll ─────────────────
       IntersectionObserver detecta cuándo cada .reveal
       entra al viewport (12 %) y añade .is-visible,
       disparando la transición CSS (fade + slide-up).
       Se desconecta después de la primera aparición.
    ──────────────────────────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');
 
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target); // una sola vez por elemento
        }
      });
    }, { threshold: 0.12 });
 
    revealEls.forEach(el => io.observe(el));
 
    /* ── Feedback del formulario ───────────────────────────
       Al enviar, el botón muestra un estado de éxito con
       color verde y texto de confirmación.
       Después de 3 s vuelve a su estado original y
       el formulario se limpia.
    ──────────────────────────────────────────────────────── */
    document.getElementById('cta-form').addEventListener('submit', function (e) {
      e.preventDefault();
 
      const btn  = this.querySelector('.btn-submit');
      const orig = btn.textContent;
 
      btn.textContent       = '✓ ¡Bienvenida/o!';
      btn.style.background  = 'linear-gradient(135deg,#34d399,#059669)';
      btn.style.pointerEvents = 'none';
 
      setTimeout(() => {
        btn.textContent         = orig;
        btn.style.background    = '';
        btn.style.pointerEvents = '';
        this.reset();
      }, 3000);
    });
// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Copy email
const copyBtn = document.getElementById("copyEmail");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = document.getElementById("email")?.textContent.trim();
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy email"), 1200);
    } catch {
      alert("Sorry we got an error, please copy manually " + email);
    }
  });
}

// ---------- Carousel logic (Top Projects) ----------
const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");
const counter = document.getElementById("counter");
const viewport = document.getElementById("carouselViewport");

if (track && prevBtn && nextBtn && dotsWrap && counter && viewport) {
  const slides = Array.from(track.children);
  let index = 0;

  // Create dots
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dotBtn";
    b.type = "button";
    b.setAttribute("aria-label", `Ir al proyecto ${i + 1}`);
    b.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(b);
  });

  const dots = Array.from(dotsWrap.children);

  function updateUI() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    counter.textContent = `${index + 1} / ${slides.length}`;
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    updateUI();
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  });

  // Touch swipe support
  let startX = 0;
  let isDown = false;

  viewport.addEventListener("pointerdown", (e) => {
    isDown = true;
    startX = e.clientX;
  });

  viewport.addEventListener("pointerup", (e) => {
    if (!isDown) return;
    isDown = false;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) dx < 0 ? goTo(index + 1) : goTo(index - 1);
  });

  viewport.addEventListener("pointerleave", () => (isDown = false));

  updateUI();
}

// ---------- Optional: Only 1 course accordion open ----------
const courseDetails = document.querySelectorAll("#courses details.acc");
courseDetails.forEach((d) => {
  d.addEventListener("toggle", () => {
    if (d.open) {
      courseDetails.forEach((other) => {
        if (other !== d) other.open = false;
      });
    }
  });
});

// Flip cards: tap to toggle on touch devices
document.querySelectorAll(".flip").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
});

// ---------- Case Study Modal Logic ----------
const caseModal = document.getElementById('caseStudyModal');
const openCaseModalBtn = document.getElementById('openCaseStudyBtn');
const closeCaseModalBtn = document.getElementById('closeCaseStudyBtn');
const modalIframeWrap = document.getElementById('modalIframeWrap');

if (caseModal && openCaseModalBtn && closeCaseModalBtn && modalIframeWrap) {
  
  // Función para abrir
  openCaseModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    caseModal.classList.add('is-active');
    caseModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
    
    // Lazy Load: Inyectamos el Iframe de Drive solo si no existe
    if(!modalIframeWrap.querySelector('iframe')){
      modalIframeWrap.innerHTML += `<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRK9D43K2twIZA7TpOHtzaDsxU7x3d7zeL4IOu--WGhJvAeXadQpUSWprrR7zEHYNBQW7N6wQ-dWEG6/pubembed?start=true&loop=true&delayms=3000" frameborder="0" width="100%" height="100%" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`;
    }
  });

  // Función para cerrar
  const closeCaseModal = () => {
    caseModal.classList.remove('is-active');
    caseModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restaurar scroll
  };

  closeCaseModalBtn.addEventListener('click', closeCaseModal);
  
  // Cerrar al hacer click fuera del contenido (en el overlay oscuro)
  caseModal.addEventListener('click', (e) => {
    if (e.target === caseModal) closeCaseModal();
  });
  
  // Accesibilidad: Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseModal.classList.contains('is-active')) {
      closeCaseModal();
    }
  });
}

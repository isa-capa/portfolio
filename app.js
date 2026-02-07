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

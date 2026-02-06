// ✅ Change this name
const PERSON_NAME = "Sister"; // eg. "Aye Aye", "My Love", "Ko Ko"

// ✅ 10 Photos + Wishes (edit text here)
const cards = [
  {
    img: "./images/01.jpeg",
    title: " Memo 1",
    wish: "Wishing you continued success and good health."
  },
  {
    img: "./images/02.jpeg",
    title: "Memo 2",
    wish: "Your leadership inspires us every day."
  },
  {
    img: "./images/03.jpeg",
    title: "Memo 3",
    wish: "May this year bring new achievements and happiness."
  },
  {
    img: "./images/04.jpeg",
    title: "Memo 4",
    wish: "Thank you for guiding us with wisdom and patience."
  },
  {
    img: "./images/05.jpeg",
    title: "Memo 5",
    wish: "Wishing you peace, health, and success always."
  },
  {
    img: "./images/06.jpeg",
    title: "Memo 6",
    wish: "Your dedication motivates the entire team."
  },
  {
    img: "./images/07.jpeg",
    title: "Memo 7",
    wish: "May all your plans succeed this year."
  },
  {
    img: "./images/08.jpeg",
    title: "Memo 8",
    wish: "We truly appreciate your leadership."
  },
  {
    img: "./images/09.jpeg",
    title: "Memo 9",
    wish: "Happy Birthday and best wishes for the year ahead."
  },
  {
    img: "./images/10.jpeg",
    title: "Memo 10",
    wish: "Wishing you a lifetime of love and happiness with your husband."
  }
];

const nameEl = document.getElementById("personName");
const grid = document.getElementById("cardsGrid");
const scrollBtn = document.getElementById("scrollBtn");
const surpriseBtn = document.getElementById("surpriseBtn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalText = document.getElementById("modalText");
const confettiBtn = document.getElementById("confettiBtn");
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

nameEl.textContent = PERSON_NAME;

// Build cards
grid.innerHTML = cards.map((c, i) => `
  <div class="card">
    <div class="polaroid">
      <div class="photo">
        <img src="${c.img}" alt="${c.title}">
      </div>
      <div class="caption">
        <p class="title">${c.title}</p>
        <p class="wish">${c.wish}</p>
      </div>
    </div>
  </div>
`).join("");

// Smooth scroll
scrollBtn.addEventListener("click", () => {
  document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
});

// Open modal surprise
surpriseBtn.addEventListener("click", () => {
  modalText.textContent = "May your birthday be filled with love, peace, and endless smiles 🎉🎂";
  openModal();
});

closeModal.addEventListener("click", closeModalFn);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModalFn();
});

// Click card => modal with that wish
grid.addEventListener("click", (e) => {
  const polaroid = e.target.closest(".polaroid");
  if (!polaroid) return;
  const idx = Number(polaroid.dataset.index);
  modalText.textContent = cards[idx].wish;
  openModal();
});

// Keyboard accessibility
grid.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const polaroid = e.target.closest(".polaroid");
  if (!polaroid) return;
  const idx = Number(polaroid.dataset.index);
  modalText.textContent = cards[idx].wish;
  openModal();
});

function openModal(){
  modal.classList.add("show");
  resizeCanvas();
}
function closeModalFn(){
  modal.classList.remove("show");
  stopConfetti();
}

// Confetti (simple)
let confetti = [];
let raf = null;

confettiBtn.addEventListener("click", () => {
  startConfetti();
  setTimeout(stopConfetti, 2200);
});

function resizeCanvas(){
  const rect = modal.querySelector(".modal-card").getBoundingClientRect();
  canvas.width = Math.floor(rect.width);
  canvas.height = Math.floor(rect.height);
}
window.addEventListener("resize", () => {
  if (modal.classList.contains("show")) resizeCanvas();
});

function startConfetti(){
  resizeCanvas();
  confetti = Array.from({length: 130}, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.3,
    r: 3 + Math.random() * 5,
    vx: -1 + Math.random() * 2,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * Math.PI,
    vr: (-0.1 + Math.random() * 0.2)
  }));
  if (!raf) loop();
}

function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    // no fixed colors requested; use random each draw
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = `hsl(${Math.floor(Math.random()*360)} 90% 60%)`;
    ctx.fillRect(-p.r, -p.r, p.r*2.2, p.r*1.4);
    ctx.restore();
  });

  confetti = confetti.filter(p => p.y < canvas.height + 30);
  raf = requestAnimationFrame(loop);

  if (confetti.length === 0) stopConfetti();
}

function stopConfetti() {
  if (raf) {
    cancelAnimationFrame(raf);
    raf=null;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti = [];
}
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "⏸ Pause Music";
    musicBtn.classList.add("playing");
  } else {
    music.pause();
    musicBtn.textContent = "▶ Play Music";
    musicBtn.classList.remove("playing");
  }
});
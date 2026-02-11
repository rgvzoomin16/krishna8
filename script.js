const revealElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

const canvas = document.getElementById('spark-canvas');
const ctx = canvas.getContext('2d');
let sparks = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createSparks() {
  sparks = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.8 + 0.4,
    speedY: Math.random() * 0.35 + 0.08,
    drift: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.65 + 0.2,
  }));
}

function drawSparks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sparks.forEach((spark) => {
    spark.y -= spark.speedY;
    spark.x += spark.drift;

    if (spark.y < -10 || spark.x < -10 || spark.x > canvas.width + 10) {
      spark.y = canvas.height + 10;
      spark.x = Math.random() * canvas.width;
    }

    const glow = ctx.createRadialGradient(
      spark.x,
      spark.y,
      0,
      spark.x,
      spark.y,
      spark.radius * 8
    );
    glow.addColorStop(0, `rgba(255, 220, 120, ${spark.alpha})`);
    glow.addColorStop(1, 'rgba(124, 74, 30, 0)');

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.radius * 8, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawSparks);
}

resizeCanvas();
createSparks();
drawSparks();

window.addEventListener('resize', () => {
  resizeCanvas();
  createSparks();
});

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = '💛 answer saved in the stars';
    button.disabled = true;
    button.style.opacity = '0.8';
  });
});

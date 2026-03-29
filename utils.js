// ===== GAME HUB - SHARED UTILITIES (utils.js) =====

// ===== STARFIELD =====
(function () {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];
  const N = 200;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < N; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        alpha: Math.random(),
        da: (Math.random() - 0.5) * 0.02
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.alpha += s.da;
      if (s.alpha <= 0 || s.alpha >= 1) s.da *= -1;
      s.y += s.speed;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,200,255,${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();
  window.addEventListener('resize', () => { resize(); createStars(); });
})();

// ===== WIN OVERLAY =====
function showWin(emoji, title, msg, playAgainFn) {
  document.getElementById('win-emoji').textContent = emoji;
  document.getElementById('win-title').textContent = title;
  document.getElementById('win-msg').textContent = msg;
  document.getElementById('win-play-again').onclick = () => { closeWin(); playAgainFn(); };
  document.getElementById('win-overlay').classList.add('active');
  launchConfetti();
}

function closeWin() {
  document.getElementById('win-overlay').classList.remove('active');
}

function launchConfetti() {
  const colors = ['#00f5ff', '#ff00aa', '#7c3aed', '#f59e0b', '#fff'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width  = (6 + Math.random() * 8) + 'px';
    el.style.height = (6 + Math.random() * 8) + 'px';
    el.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
    el.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    el.style.animationDelay   = Math.random() * 0.5 + 's';
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}
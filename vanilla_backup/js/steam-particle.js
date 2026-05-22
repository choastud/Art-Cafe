(function() {
  const canvas = document.getElementById('steam-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let mouse = { x: null, y: null, active: false };
  const particles = [];
  const maxParticles = 65;

  // Particle definition
  class SteamParticle {
    constructor() {
      this.reset();
      // Give initial random heights so they don't all spawn at the bottom on start
      this.y = Math.random() * (canvas.height - 20) + 10;
    }

    reset() {
      this.x = canvas.width / 2 + (Math.random() - 0.5) * 45;
      this.y = canvas.height - 10;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -Math.random() * 0.5 - 0.3; // rise up
      this.radius = Math.random() * 14 + 8;
      this.maxLife = Math.random() * 120 + 100;
      this.life = this.maxLife;
      this.alpha = 0;
      this.decay = Math.random() * 0.005 + 0.005;
      this.wiggleSpeed = Math.random() * 0.03 + 0.01;
      this.wiggleOffset = Math.random() * Math.PI * 2;
    }

    update() {
      // Wiggle movement
      this.x += Math.sin(this.life * this.wiggleSpeed + this.wiggleOffset) * 0.25;

      // Mouse interactive push/swirl force
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 65;

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius;
          // Calculate push vector
          const pushX = (dx / dist) * force * 1.5;
          const pushY = (dy / dist) * force * 0.8;
          
          this.vx += pushX;
          this.vy += pushY;
        }
      }

      // Apply velocities
      this.x += this.vx;
      this.y += this.vy;

      // Dampen velocity to prevent flying off forever
      this.vx *= 0.95;
      if (this.vy < -1.5) this.vy *= 0.95;

      // Fade in at the start, fade out near the end of life
      this.life--;
      const ageRatio = this.life / this.maxLife;
      
      if (ageRatio > 0.8) {
        this.alpha = (1 - ageRatio) / 0.2 * 0.08; // fade in slowly
      } else {
        this.alpha = (ageRatio / 0.8) * 0.08; // fade out
      }

      // Check boundary or end of life
      if (this.life <= 0 || this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
        this.reset();
      }
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.beginPath();
      // Draw as a soft gradient blob
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );
      gradient.addColorStop(0, `rgba(245, 235, 224, ${this.alpha * 1.5})`);
      gradient.addColorStop(0.5, `rgba(230, 204, 178, ${this.alpha})`);
      gradient.addColorStop(1, 'rgba(230, 204, 178, 0)');
      
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new SteamParticle());
  }

  // Mouse event handlers
  canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    // Scale coordinates since clientWidth/height might differ slightly from canvas properties
    mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
    mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', function() {
    mouse.active = false;
  });

  // Touch support
  canvas.addEventListener('touchmove', function(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouse.x = (touch.clientX - rect.left) * (canvas.width / rect.width);
      mouse.y = (touch.clientY - rect.top) * (canvas.height / rect.height);
      mouse.active = true;
    }
  });

  canvas.addEventListener('touchend', function() {
    mouse.active = false;
  });

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw coffee surface reflection/rim highlights underneath steam in canvas
    // (adds subtle light glow in canvas to match the cup rim)
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height - 10, 110, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(221, 158, 107, 0.02)';
    ctx.fill();

    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
})();

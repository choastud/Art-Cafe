'use client';

import React, { useRef, useEffect } from 'react';

export default function SteamMug() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let mouse = { x: null, y: null, active: false };
    const particles = [];
    const maxParticles = 65;

    class SteamParticle {
      constructor() {
        this.reset();
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
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mouse.x = (touch.clientX - rect.left) * (canvas.width / rect.width);
        mouse.y = (touch.clientY - rect.top) * (canvas.height / rect.height);
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw coffee surface reflection/rim highlights underneath steam in canvas
      ctx.beginPath();
      ctx.ellipse(canvas.width / 2, canvas.height - 10, 110, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(221, 158, 107, 0.02)';
      ctx.fill();

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="mug-container" id="steam-mug-container">
      <canvas
        ref={canvasRef}
        id="steam-canvas"
        width="280"
        height="220"
        title="Move your mouse around to swirl the warm coffee steam!"
      />
      <div className="mug-handle"></div>
      <div className="mug-outer">
        <div className="mug-inner">
          <div className="coffee-liquid" id="hero-coffee-surface"></div>
        </div>
      </div>
    </div>
  );
}

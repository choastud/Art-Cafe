'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Eraser, Coffee, Heart, Download } from 'lucide-react';

const brushConfig = {
  cream: { color: 'rgba(255, 248, 240, 0.45)', blur: 15, composite: 'source-over' },
  caramel: { color: 'rgba(201, 123, 99, 0.85)', blur: 5, composite: 'source-over' }, // Terracotta
  cocoa: { color: 'rgba(62, 39, 35, 0.25)', blur: 8, composite: 'source-over' },    // Espresso
  cinnamon: { color: 'rgba(111, 78, 55, 0.75)', blur: 2, composite: 'source-over' }  // Coffee Brown
};

export default function LatteStudio() {
  const canvasRef = useRef(null);
  const cupRimRef = useRef(null);
  const [currentBrush, setCurrentBrush] = useState('cream');
  const [brushSize, setBrushSize] = useState(12);
  const [isSipping, setIsSipping] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userNote, setUserNote] = useState('');

  // Refs for paint variables to prevent event listener re-binding lag
  const stateRef = useRef({
    currentBrush: 'cream',
    brushSize: 12,
    isDrawing: false,
    lastX: 0,
    lastY: 0
  });

  useEffect(() => {
    stateRef.current.currentBrush = currentBrush;
  }, [currentBrush]);

  useEffect(() => {
    stateRef.current.brushSize = brushSize;
  }, [brushSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Clip to circular mug inside rim
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w / 2 - 3, 0, Math.PI * 2);
    ctx.clip();

    // Drawing helpers
    const getCoords = (e, rect) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (w / rect.width),
        y: (clientY - rect.top) * (h / rect.height)
      };
    };

    const handleStart = (e) => {
      if (isSipping) return;
      const rect = canvas.getBoundingClientRect();
      const coords = getCoords(e, rect);
      stateRef.current.isDrawing = true;
      stateRef.current.lastX = coords.x;
      stateRef.current.lastY = coords.y;
    };

    const handleMove = (e) => {
      const state = stateRef.current;
      if (!state.isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const coords = getCoords(e, rect);
      const x = coords.x;
      const y = coords.y;

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      
      const config = brushConfig[state.currentBrush];
      ctx.globalCompositeOperation = config.composite;

      if (state.currentBrush === 'cocoa') {
        const density = Math.max(10, state.brushSize * 1.5);
        ctx.fillStyle = config.color;
        for (let i = 0; i < density; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * state.brushSize;
          const sprayX = x + Math.cos(angle) * radius;
          const sprayY = y + Math.sin(angle) * radius;
          
          ctx.beginPath();
          ctx.arc(sprayX, sprayY, Math.random() * 2 + 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(state.lastX, state.lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = config.color;
        ctx.lineWidth = state.brushSize;
        ctx.shadowColor = config.color;
        ctx.shadowBlur = config.blur;
        ctx.stroke();
      }

      state.lastX = x;
      state.lastY = y;

      if (e.cancelable) e.preventDefault();
    };

    const handleStop = () => {
      stateRef.current.isDrawing = false;
    };

    // Desktop
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleStop);
    canvas.addEventListener('mouseleave', handleStop);

    // Mobile touch
    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    canvas.addEventListener('touchend', handleStop);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleStop);
      canvas.removeEventListener('mouseleave', handleStop);

      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleStop);
    };
  }, [isSipping]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.shadowBlur = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSip = () => {
    if (isSipping) return;
    setIsSipping(true);
    const canvas = canvasRef.current;
    const rim = cupRimRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    let sipCount = 0;
    const maxSips = 10;
    const interval = setInterval(() => {
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(62, 39, 35, 0.18)';
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
      ctx.fill();

      if (rim) {
        rim.style.transform = `scale(${1 - (sipCount + 1) * 0.015})`;
      }

      sipCount++;
      if (sipCount >= maxSips) {
        clearInterval(interval);
        ctx.clearRect(0, 0, w, h);
        if (rim) rim.style.transform = 'scale(1)';
        setIsSipping(false);
      }
    }, 120);
  };

  const getDoodleDataURL = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const w = canvas.width;
    const h = canvas.height;

    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const oCtx = offscreen.getContext('2d');

    // Draw radial coffee foam gradient background
    const gradient = oCtx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2);
    gradient.addColorStop(0, '#6F4E37'); // Coffee Brown
    gradient.addColorStop(1, '#3E2723'); // Espresso Brown
    
    oCtx.fillStyle = gradient;
    oCtx.beginPath();
    oCtx.arc(w/2, h/2, w/2 - 2, 0, Math.PI * 2);
    oCtx.fill();

    // Draw user drawings
    oCtx.drawImage(canvas, 0, 0);

    return offscreen.toDataURL('image/png');
  };

  const handleDownload = () => {
    const dataURL = getDoodleDataURL();
    if (!dataURL) return;
    const link = document.createElement('a');
    link.download = 'my-latte-art.png';
    link.href = dataURL;
    link.click();
  };

  const handlePostToWall = (e) => {
    e.preventDefault();
    if (!userName.trim() || !userNote.trim()) return;

    const doodle = getDoodleDataURL();

    const logEntry = {
      name: userName.trim(),
      message: userNote.trim(),
      time: 'Just now',
      doodle: doodle
    };

    // Save to localStorage
    let logs = localStorage.getItem('brew_brush_guestbook');
    logs = logs ? JSON.parse(logs) : [];
    logs.push(logEntry);
    localStorage.setItem('brew_brush_guestbook', JSON.stringify(logs));

    // Dispatch update event so Guestbook component reloads
    window.dispatchEvent(new Event('guestbook-updated'));

    // Reset and close modal
    setUserName('');
    setUserNote('');
    setShowPostModal(false);
    alert('🎨 Latte doodle posted on the Sketchbook Wall! Scroll down to check it out.');
  };

  return (
    <div className="latte-art-grid">
      {/* Interactive Mug Canvas */}
      <div className="canvas-frame-outer">
        <div ref={cupRimRef} className="latte-cup-rim" id="latte-cup-rim">
          <div className="latte-cup-handle"></div>
          <canvas ref={canvasRef} id="latte-canvas" width="310" height="310"></canvas>
        </div>
      </div>

      {/* Controls & Tools */}
      <div className="canvas-tools">
        <div className="tool-group">
          <h3>Brush Options</h3>
          <div className="brush-selector">
            <button
              className={`brush-btn ${currentBrush === 'cream' ? 'active' : ''}`}
              onClick={() => setCurrentBrush('cream')}
            >
              <div className="color-dot dot-cream"></div> Cream Foam
            </button>
            <button
              className={`brush-btn ${currentBrush === 'caramel' ? 'active' : ''}`}
              onClick={() => setCurrentBrush('caramel')}
            >
              <div className="color-dot dot-caramel"></div> Caramel Drizzle
            </button>
            <button
              className={`brush-btn ${currentBrush === 'cocoa' ? 'active' : ''}`}
              onClick={() => setCurrentBrush('cocoa')}
            >
              <div className="color-dot dot-cocoa"></div> Cocoa Powder
            </button>
            <button
              className={`brush-btn ${currentBrush === 'cinnamon' ? 'active' : ''}`}
              onClick={() => setCurrentBrush('cinnamon')}
            >
              <div className="color-dot dot-cinnamon"></div> Espresso Swirl
            </button>
          </div>
        </div>

        <div className="tool-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Brush Weight</h3>
            <span style={{ color: 'var(--accent-terracotta)', fontWeight: 700 }}>{brushSize}px</span>
          </div>
          <input
            type="range"
            min="4"
            max="40"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            style={{ accentColor: 'var(--accent-terracotta)', width: '100%', cursor: 'pointer' }}
          />
        </div>

        <div className="action-buttons">
          <button className="btn-action" onClick={handleClear}>
            <Eraser style={{ width: '15px', height: '15px', marginRight: '6px' }} /> Clear Cup
          </button>
          <button className="btn-action" onClick={handleSip} disabled={isSipping}>
            <Coffee style={{ width: '15px', height: '15px', marginRight: '6px' }} /> Take a Sip
          </button>
        </div>

        <div className="action-buttons">
          <button className="btn-action btn-action-primary" onClick={() => setShowPostModal(true)}>
            <Heart style={{ width: '15px', height: '15px', marginRight: '6px' }} /> Post to Wall
          </button>
          <button className="btn-action btn-action-primary" onClick={handleDownload}>
            <Download style={{ width: '15px', height: '15px', marginRight: '6px' }} /> Save PNG
          </button>
        </div>
      </div>

      {/* Modal for Posting Doodle */}
      {showPostModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(42, 26, 20, 0.4)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '450px',
            border: '2px solid rgba(42, 26, 20, 0.1)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <h3 style={{ marginBottom: '1.2rem', fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)' }}>
              Sign & Post Latte Art
            </h3>
            <form onSubmit={handlePostToWall}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Artist name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    border: '1px solid rgba(42, 26, 20, 0.12)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--card-white)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Sweet Note</label>
                <textarea
                  required
                  placeholder="How is your coffee today?"
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100px',
                    padding: '0.8rem 1rem',
                    border: '1px solid rgba(42, 26, 20, 0.12)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--card-white)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(42, 26, 20, 0.1)',
                    color: 'var(--text-secondary)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent-terracotta)',
                    border: 'none',
                    color: '#fff',
                    padding: '0.6rem 1.2rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Post Doodle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

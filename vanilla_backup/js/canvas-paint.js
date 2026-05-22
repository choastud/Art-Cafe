(function() {
  const canvas = document.getElementById('latte-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const brushButtons = document.querySelectorAll('.brush-btn[data-brush]');
  const sizeSlider = document.getElementById('slider-brush-size');
  const sizeValText = document.getElementById('brush-size-val');
  const btnClear = document.getElementById('btn-clear-canvas');
  const btnSip = document.getElementById('btn-sip-latte');
  
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  
  // Brush Configurations
  let currentBrush = 'cream'; // 'cream', 'caramel', 'cocoa', 'cinnamon'
  let brushSize = 12;

  const brushConfig = {
    cream: { color: 'rgba(255, 248, 240, 0.45)', blur: 15, composite: 'source-over' },
    caramel: { color: 'rgba(201, 123, 99, 0.85)', blur: 5, composite: 'source-over' }, // Terracotta
    cocoa: { color: 'rgba(62, 39, 35, 0.25)', blur: 8, composite: 'source-over' },    // Espresso
    cinnamon: { color: 'rgba(111, 78, 55, 0.75)', blur: 2, composite: 'source-over' }  // Coffee Brown
  };

  // Set up circular clipping path
  const w = canvas.width;
  const h = canvas.height;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, w / 2 - 3, 0, Math.PI * 2);
  ctx.clip();

  // Draw smooth lines
  function draw(e) {
    if (!isDrawing) return;

    // Get correct coordinates
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (w / rect.width);
    const y = (e.clientY - rect.top) * (h / rect.height);

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    const config = brushConfig[currentBrush];
    ctx.globalCompositeOperation = config.composite;

    if (currentBrush === 'cocoa') {
      // Dusting/spray effect
      const density = Math.max(10, brushSize * 1.5);
      ctx.fillStyle = config.color;
      for (let i = 0; i < density; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * brushSize;
        const sprayX = x + Math.cos(angle) * radius;
        const sprayY = y + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(sprayX, sprayY, Math.random() * 2 + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Normal stroke
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = config.color;
      ctx.lineWidth = brushSize;
      
      // Apply shadow blur for latte foam/drizzle realism
      ctx.shadowColor = config.color;
      ctx.shadowBlur = config.blur;
      
      ctx.stroke();
    }

    lastX = x;
    lastY = y;
  }

  // Event Listeners for Painting
  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = (e.clientX - rect.left) * (w / rect.width);
    lastY = (e.clientY - rect.top) * (h / rect.height);
  });

  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseleave', () => isDrawing = false);

  // Mobile Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      lastX = (e.touches[0].clientX - rect.left) * (w / rect.width);
      lastY = (e.touches[0].clientY - rect.top) * (h / rect.height);
      e.preventDefault();
    }
  });

  canvas.addEventListener('touchmove', (e) => {
    if (isDrawing && e.touches.length === 1) {
      draw(e.touches[0]);
      e.preventDefault();
    }
  });

  canvas.addEventListener('touchend', () => isDrawing = false);

  // Brush Selection
  brushButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      brushButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBrush = btn.getAttribute('data-brush');
    });
  });

  // Brush Size Slider
  sizeSlider.addEventListener('input', (e) => {
    brushSize = parseInt(e.target.value);
    sizeValText.textContent = `${brushSize}px`;
  });

  // Clear Canvas
  btnClear.addEventListener('click', () => {
    // Clear shadow properties so they don't leak
    ctx.shadowBlur = 0;
    ctx.clearRect(0, 0, w, h);
  });

  // Take a Sip (Gradual fade-out drinking simulation)
  let sipping = false;
  btnSip.addEventListener('click', () => {
    if (sipping) return;
    sipping = true;
    btnSip.disabled = true;
    
    let sipCount = 0;
    const maxSips = 10;
    const interval = setInterval(() => {
      ctx.shadowBlur = 0;
      
      // To simulate taking a sip, we blend a semi-transparent coffee color over the canvas
      // #3E2723 is the base dark espresso color
      ctx.fillStyle = 'rgba(62, 39, 35, 0.18)';
      ctx.globalCompositeOperation = 'source-over';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
      ctx.fill();

      // Add a scale shrink effect to the latte mug rim to simulate a physical sip/empty
      const rim = document.getElementById('latte-cup-rim');
      if (rim) {
        rim.style.transform = `scale(${1 - (sipCount + 1) * 0.015})`;
      }

      sipCount++;
      if (sipCount >= maxSips) {
        clearInterval(interval);
        ctx.clearRect(0, 0, w, h);
        if (rim) rim.style.transform = 'scale(1)';
        sipping = false;
        btnSip.disabled = false;
      }
    }, 120);
  });

  // Export Doodle with Coffee Background
  window.getLatteArtDataURL = function() {
    // Create offscreen canvas to combine radial gradient coffee base and user doodle
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const oCtx = offscreen.getContext('2d');

    // 1. Draw Coffee Radial Gradient
    const gradient = oCtx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2);
    gradient.addColorStop(0, '#6F4E37'); // Coffee Brown
    gradient.addColorStop(1, '#3E2723'); // Espresso Brown
    
    oCtx.fillStyle = gradient;
    oCtx.beginPath();
    oCtx.arc(w/2, h/2, w/2 - 2, 0, Math.PI * 2);
    oCtx.fill();

    // 2. Draw user drawings
    oCtx.drawImage(canvas, 0, 0);

    return offscreen.toDataURL('image/png');
  };

  // Download Action
  const btnDownload = document.getElementById('btn-download-doodle');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const dataURL = window.getLatteArtDataURL();
      const link = document.createElement('a');
      link.download = 'my-latte-art.png';
      link.href = dataURL;
      link.click();
    });
  }

})();

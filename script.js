/* ===== DEVIL MAY CRY STYLE CURSOR ===== */
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor with momentum
function updateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  // Add trail effect
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = cursorX + 'px';
  trail.style.top = cursorY + 'px';
  document.body.appendChild(trail);
  
  setTimeout(() => trail.remove(), 500);
  
  requestAnimationFrame(updateCursor);
}

updateCursor();

// Cursor interaction
document.querySelectorAll('.interactive').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
    cursor.style.borderColor = 'var(--neon-cyan)';
    cursor.style.boxShadow = '0 0 20px var(--neon-cyan), 0 0 40px var(--ps2-blue)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    cursor.style.borderColor = 'var(--ps2-red)';
    cursor.style.boxShadow = '0 0 15px var(--ps2-red), 0 0 30px var(--ps2-blue)';
  });
});

/* ===== PS2 RUNE DECODE EFFECT (ENHANCED) ===== */
const demonicGlyphs = "⚡✦◈◆◇∆∇◊⌘⌂⎔⏣⏢⍟⍣⍤⍥⍨⍩⎊";
const matrixGlyphs = "01";

document.querySelectorAll('.decode').forEach(el => {
  const original = el.innerText;
  let isAnimating = false;
  
  el.addEventListener('mouseenter', () => {
    if (isAnimating) return;
    isAnimating = true;
    
    let iteration = 0;
    const totalIterations = 20;
    
    const animate = () => {
      if (iteration >= totalIterations) {
        el.innerText = original;
        isAnimating = false;
        return;
      }
      
      const glyphSet = iteration < 10 ? demonicGlyphs : matrixGlyphs;
      
      el.innerText = original
        .split('')
        .map((char, index) => {
          if (char === ' ' || index < iteration) return char;
          return glyphSet[Math.floor(Math.random() * glyphSet.length)];
        })
        .join('');
      
      iteration++;
      setTimeout(animate, 30);
    };
    
    animate();
  });
});

/* ===== PS2 SELECTION LOCK WITH SOUND EFFECT ===== */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Visual feedback
    card.classList.add('locked');
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ps2-ripple';
    card.appendChild(ripple);
    
    // PS2 style sound effect simulation
    playPS2Sound();
    
    // Redirect after animation
    setTimeout(() => {
      const href = card.getAttribute('href');
      if (href && href !== '#') {
        window.open(href, '_blank');
      }
      card.classList.remove('locked');
      ripple.remove();
    }, 400);
  });
});

function playPS2Sound() {
  // Simulate PS2 sound with Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (e) {
    console.log('Audio context not supported');
  }
}

/* ===== CRT FLICKER EFFECT ===== */
function crtFlicker() {
  const overlay = document.querySelector('.crt-overlay');
  setInterval(() => {
    const flicker = Math.random() * 0.1 + 0.95;
    overlay.style.opacity = flicker;
    
    // Occasional glitch
    if (Math.random() < 0.05) {
      overlay.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
      setTimeout(() => {
        overlay.style.transform = 'translateX(0)';
      }, 50);
    }
  }, 100);
}

crtFlicker();

/* ===== CONSOLE INIT MESSAGE ===== */
console.log('%c✦ PS2 PORTAL v3.14 ✦', 'color: #ff003c; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #ff003c;');
console.log('%cDEMON SLAYER INTERFACE INITIALIZED', 'color: #00ffff; font-size: 16px;');
console.log('%c>> SYSTEM READY FOR COMBAT RESEARCH <<', 'color: #00ff41; font-size: 14px;');

// Add CSS for cursor trail
const style = document.createElement('style');
style.textContent = `
  .cursor-trail {
    position: fixed;
    width: 6px;
    height: 6px;
    background: var(--ps2-red);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.7;
    transition: opacity 0.5s;
  }
  
  .ps2-ripple {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, var(--ps2-red), transparent);
    animation: rippleExpand 0.4s ease-out;
    pointer-events: none;
  }
  
  @keyframes rippleExpand {
    0% { width: 0; height: 0; opacity: 0.8; }
    100% { width: 300px; height: 300px; opacity: 0; }
  }
`;
document.head.appendChild(style);
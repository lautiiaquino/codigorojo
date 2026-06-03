/* ============================================ */
/* CODIGO ROJO - Script Principal */
/* Sistema de popups y lógica del juego */
/* ============================================ */

// ============================================
// CONFIGURACIÓN
// ============================================

const CONFIG = {
    maxPopups: 15,
    popupAutoCloseDuration: 8000, // ms
    minPopupDisplayTime: 2000, // ms
    popupMessages: [
        { title: "⚠️ ERROR CRÍTICO", content: "Sistema corrupto detectado. ¿Ejecutar reparación?" },
        { title: "💾 MANTENIMIENTO", content: "Servidor en mantenimiento. ¿Reintentar?" },
        { title: "🎁 OFERTA ESPECIAL", content: "¡Consigue 50% OFF! Haz click ahora." },
        { title: "📱 CLIENTE MÓVIL", content: "Descarga nuestra app para mejor experiencia." },
        { title: "🔒 VERIFICACIÓN", content: "Verifica tu identidad para continuar." },
        { title: "⏰ TIEMPO LÍMITE", content: "Tu sesión expira en 10 segundos. ¿Continuar?" },
        { title: "🌐 PROXY REQUERIDO", content: "Se necesita proxy para tu región." },
        { title: "💳 PAGO PENDIENTE", content: "Tu cuenta tiene un pago pendiente." },
        { title: "🎵 PLUGIN FALTANTE", content: "Se requiere Adobe Media Player." },
        { title: "📊 ESTADÍSTICAS", content: "¿Permiso para usar tus datos anónimos?" },
        { title: "🔔 NOTIFICACIÓN", content: "¡Has ganado un premio! Reclama ahora." },
        { title: "⚙️ CONFIGURACIÓN", content: "Se detectó cambio en tu configuración." },
        { title: "🖥️ PANTALLA AZUL", content: "Se encontró un problema crítico." },
        { title: "📡 CONECTANDO", content: "Conectando a servidor de seguridad..." },
        { title: "🔊 VOLUMEN", content: "Ajusta el volumen de tu sistema." }
    ]
};

// ============================================
// VARIABLES GLOBALES
// ============================================

let gameState = {
    popupCount: 0,
    isGameRunning: false,
    activePopups: [],
    isVictory: false
};

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    createMatrixEffect();
});

function initializeGame() {
    const enterBtn = document.getElementById('enterBtn');
    if (enterBtn) {
        enterBtn.addEventListener('click', startGame);
    }
}

// ============================================
// INICIO DEL JUEGO
// ============================================

function startGame() {
    const entrance = document.getElementById('entrance');
    const enterBtn = document.getElementById('enterBtn');
    
    // Deshabilitar botón
    enterBtn.disabled = true;
    enterBtn.textContent = 'INICIANDO...';
    
    // Ocultar entrance
    setTimeout(() => {
        entrance.style.display = 'none';
        gameState.isGameRunning = true;
        spawnPopup();
    }, 300);
}

// ============================================
// GENERACIÓN DE POPUPS
// ============================================

function spawnPopup() {
    if (gameState.popupCount < CONFIG.maxPopups && gameState.isGameRunning) {
        createNewPopup();
    } else if (gameState.popupCount >= CONFIG.maxPopups && !gameState.isVictory) {
        gameState.isVictory = true;
        showVictory();
    }
}

function createNewPopup() {
    gameState.popupCount++;
    
    // Crear elemento del popup
    const popup = document.createElement('div');
    popup.className = 'popup show';
    
    // Obtener mensaje aleatorio
    const randomMessage = CONFIG.popupMessages[
        Math.floor(Math.random() * CONFIG.popupMessages.length)
    ];
    
    // Posición aleatoria
    const randomX = Math.random() * (window.innerWidth - 420);
    const randomY = Math.random() * (window.innerHeight - 300);
    
    popup.style.left = randomX + 'px';
    popup.style.top = randomY + 'px';
    
    // Contenido del popup
    popup.innerHTML = `
        <button class="close-btn" onclick="closePopup(event)">✕</button>
        <div class="popup-title">${escapeHtml(randomMessage.title)}</div>
        <div class="popup-content">${escapeHtml(randomMessage.content)}</div>
        <div class="popup-buttons">
            <button class="popup-btn" onclick="createNewPopup(); closePopup(event)">Aceptar</button>
            <button class="popup-btn" onclick="closePopup(event)">Cancelar</button>
        </div>
    `;
    
    // Agregar al contenedor
    const container = document.getElementById('popupContainer');
    container.appendChild(popup);
    
    // Agregar a lista activa
    gameState.activePopups.push({
        element: popup,
        id: gameState.popupCount,
        startTime: Date.now()
    });
    
    // Auto-cerrar después de cierto tiempo
    const autoCloseTimer = setTimeout(() => {
        if (popup.parentElement) {
            closePopupByElement(popup);
        }
    }, CONFIG.popupAutoCloseDuration);
    
    // Guardar timeout para limpieza
    popup.dataset.autoCloseTimer = autoCloseTimer;
}

// ============================================
// CERRAR POPUPS
// ============================================

function closePopup(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const popup = event.target.closest('.popup');
    if (popup) {
        closePopupByElement(popup);
    }
}

function closePopupByElement(popup) {
    if (!popup || !popup.parentElement) return;
    
    // Limpiar timer de auto-close
    if (popup.dataset.autoCloseTimer) {
        clearTimeout(parseInt(popup.dataset.autoCloseTimer));
    }
    
    // Agregar clase de salida
    popup.classList.add('hiding');
    popup.classList.remove('show');
    
    // Remover después de animación
    setTimeout(() => {
        if (popup.parentElement) {
            popup.remove();
        }
        
        // Remover de lista activa
        gameState.activePopups = gameState.activePopups.filter(
            p => p.element !== popup
        );
        
        // Mostrar siguiente popup
        setTimeout(() => {
            if (gameState.isGameRunning) {
                spawnPopup();
            }
        }, 200);
    }, 300);
}

// ============================================
// PANTALLA DE VICTORIA
// ============================================

function showVictory() {
    // Cerrar todos los popups activos
    gameState.activePopups.forEach(popup => {
        if (popup.element.parentElement) {
            popup.element.remove();
        }
    });
    gameState.activePopups = [];
    
    // Mostrar pantalla de victoria
    const victory = document.getElementById('victory');
    victory.style.display = 'block';
    
    // Efectos visuales
    playVictoryEffects();
}

function playVictoryEffects() {
    // Crear confeti
    createConfetti();
    
    // Parpadear scanlines
    const scanlines = document.querySelector('.scanlines');
    if (scanlines) {
        scanlines.style.opacity = '0.3';
    }
}

// ============================================
// CONFETI
// ============================================

function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '150';
        confetti.style.borderRadius = '50%';
        confetti.style.boxShadow = `0 0 5px ${confetti.style.backgroundColor}`;
        
        document.body.appendChild(confetti);
        
        const duration = 2 + Math.random() * 2;
        const xMove = (Math.random() - 0.5) * 300;
        
        animateConfetti(confetti, duration, xMove);
    }
}

function animateConfetti(element, duration, xMove) {
    const startTime = Date.now();
    const startX = parseInt(element.style.left);
    const startY = 0;
    const endX = startX + xMove;
    const endY = window.innerHeight + 10;
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / (duration * 1000);
        
        if (progress < 1) {
            const easeProgress = progress < 0.5 
                ? 2 * progress * progress 
                : -1 + (4 - 2 * progress) * progress;
            
            element.style.left = (startX + (endX - startX) * easeProgress) + 'px';
            element.style.top = (startY + (endY - startY) * progress) + 'px';
            element.style.opacity = 1 - progress;
            
            requestAnimationFrame(animate);
        } else {
            element.remove();
        }
    }
    
    animate();
}

// ============================================
// MATRIX EFFECT
// ============================================

function createMatrixEffect() {
    const container = document.getElementById('matrixBg');
    if (!container) return;
    
    const chars = '01ｦｧｨｩｪｫｬｭｮｯﾊﾐﾎﾀﾞﾆﾇﾎﾎﾏﾓﾔﾗﾜﾒ';
    let matrix = '';
    
    for (let i = 0; i < 500; i++) {
        matrix += chars[Math.floor(Math.random() * chars.length)];
        if (i % 40 === 0) {
            matrix += '\n';
        }
    }
    
    container.textContent = matrix;
}

// ============================================
// UTILIDADES
// ============================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Prevenir cierre accidental de ventana
window.addEventListener('beforeunload', (e) => {
    if (gameState.isGameRunning && !gameState.isVictory) {
        e.preventDefault();
        e.returnValue = '¿Quieres abandonar el sistema?';
    }
});

// Manejo de responsive
window.addEventListener('resize', () => {
    // Reposicionar popups si la ventana se redimensiona
    gameState.activePopups.forEach(popup => {
        if (popup.element.parentElement) {
            const x = Math.max(0, Math.random() * (window.innerWidth - 420));
            const y = Math.max(0, Math.random() * (window.innerHeight - 300));
            popup.element.style.left = x + 'px';
            popup.element.style.top = y + 'px';
        }
    });
});

// ============================================
// LOG DE DESARROLLO
// ============================================

console.log('%c CODIGO ROJO - Sistema iniciado', 'color: #ff0000; font-size: 16px; font-weight: bold;');
console.log('%c Sistema de acceso restringido listo', 'color: #ff6666; font-size: 12px;');
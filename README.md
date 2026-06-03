# 🔴 CODIGO ROJO - Experimento Retro

**Una página web nostálgica inspirada en el caos de internet a finales de los 2000 y principios de los 2010.**

## 📋 Descripción

Codigorojo es una experiencia interactiva oscura y turbulenta que captura la esencia de los tiempos oscuros de la web. Presenta una interfaz tétrica en rojo y negro con:

- 🎬 Pantalla de entrada con efecto CRT
- 📢 **15 popups falsos** totalmente aleatorizados
- 🎨 Efectos de scanlines y glitch
- 🎯 Un link final como recompensa por superar los popups
- ✨ Confeti de victoria
- 📱 Diseño completamente responsive

## 🚀 Características

### Visual
- Gradientes rojos y negros con efecto de profundidad
- Animaciones de parpadeo y pulsación
- Efectos de glow/brillo característicos de los 2010
- Scanlines animadas que se mueven constantemente
- Fondo Matrix con caracteres aleatorios
- Confeti al ganar

### Funcionalidad
- Popups generados aleatoriamente desde una base de 15 mensajes diferentes
- Auto-cierre de popups después de 8 segundos
- Reposicionamiento dinámico al redimensionar
- Prevención de cierre accidental de la ventana durante el juego
- Sistema de conteo de popups completados
- Transiciones suaves entre estados

### Responsividad
- Optimizado para desktop, tablet y mobile
- Interfaz adaptativa que mantiene el estilo visual
- Touch-friendly en dispositivos móviles

## 📁 Estructura del Proyecto

```
codigorojo/
├── index.html          # Estructura HTML principal
├── css/
│   └── styles.css      # Estilos y animaciones
├── js/
│   └── script.js       # Lógica y comportamiento
├── assets/             # Carpeta para recursos futuros
├── README.md           # Este archivo
├── .gitignore          # Archivos a ignorar en Git
└── package.json        # Metadata del proyecto
```

## 🛠️ Instalación

### Opción 1: Clonar el repositorio
```bash
git clone https://github.com/lautiiaquino/codigorojo.git
cd codigorojo
```

### Opción 2: Abrir localmente
Simplemente descarga los archivos y abre `index.html` en tu navegador.

## 🎮 Cómo Jugar

1. **Abre `index.html`** en tu navegador
2. **Haz click en "ENTRAR"** para iniciar el sistema
3. **Cierra los 15 popups** haciendo click en sus botones o cerrándolos
4. **¡Consigue el link final!** después de superar todos los popups

## ⚙️ Configuración

Puedes personalizar el comportamiento editando `js/script.js`:

```javascript
const CONFIG = {
    maxPopups: 15,                    // Número de popups
    popupAutoCloseDuration: 8000,     // Tiempo auto-cierre (ms)
    minPopupDisplayTime: 2000,        // Tiempo mínimo visible (ms)
    popupMessages: [ ... ]            // Array de mensajes
};
```

## 🎨 Personalización

### Cambiar URL del link final
En `index.html`, modifica la URL:
```html
<a href="https://tu-url.com" class="final-link" target="_blank">
```

### Cambiar colores
En `css/styles.css`, edita las variables CSS:
```css
:root {
    --primary-color: #ff0000;
    --success-color: #00ff00;
    /* ... más variables */
}
```

### Agregar más popups
En `js/script.js`, añade mensajes al array `popupMessages`:
```javascript
{ title: "Tu título", content: "Tu contenido" },
```

## 🌐 Demo en Vivo

Puedes ver una demo en vivo en:
- GitHub Pages (si está habilitado)
- O simplemente abre el archivo localmente

## 🔐 Accesibilidad

- ✅ Soporte para preferencias de movimiento reducido
- ✅ Contraste de colores optimizado
- ✅ Navegación por teclado soportada
- ✅ Texto alt en imágenes
- ✅ Estructura HTML semántica

## 📱 Navegadores Soportados

- ✅ Chrome/Edge (última versión)
- ✅ Firefox (última versión)
- ✅ Safari (última versión)
- ✅ Mobile Safari/Chrome

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo licencia MIT.

## 👨‍💻 Autor

Creado por [lautiiaquino](https://github.com/lautiiaquino)

## 💬 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de:
- Reportar bugs
- Sugerir nuevas características
- Hacer pull requests
- Mejorar la documentación

## ⭐ ¿Te gustó?

Si disfrutaste esta experiencia, considera darle una ⭐ al repositorio.

---

**Hecho con ❤️ en rojo y nostalgia digital**
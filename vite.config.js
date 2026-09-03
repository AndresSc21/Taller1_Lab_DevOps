import { defineConfig, createLogger } from 'vite';

// Los scripts de public/js/ son scripts clásicos cargados en orden (no ES modules);
// Vite avisa de que "no puede empaquetarlos". Es intencional (comparten scope global),
// así que se silencia ese aviso concreto y se dejan pasar los demás.
const logger = createLogger();
const baseWarn = logger.warn;
logger.warn = (msg, options) => {
  if (typeof msg === 'string' && msg.includes("can't be bundled without type=\"module\"")) return;
  baseWarn(msg, options);
};

// Rutas relativas: el sitio funciona igual servido desde la raíz de un dominio
// o desde un subdirectorio (p. ej. GitHub Pages: andressc21.github.io/Taller1_Lab_DevOps/).
export default defineConfig({
  base: './',
  customLogger: logger,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

import { defineConfig } from 'vite';

// Rutas relativas: el sitio funciona igual servido desde la raíz de un dominio
// o desde un subdirectorio (p. ej. GitHub Pages: andressc21.github.io/Taller1_Lab_DevOps/).
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

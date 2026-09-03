# Artefacto MML · Formulación de Proyectos

Artefacto educativo para la formulación de proyectos con la **Metodología de Marco
Lógico (MML) de CEPAL/ILPES**. Es una aplicación web de una sola página (SPA) con 11
pantallas: Ficha del caso + Pasos 1 a 10.

Casos de estudio: CEPAL.

## Requisitos

- Node.js 18+ (probado con Node 20).

## Puesta en marcha

```bash
npm install        # instala Vite (única dependencia, solo de desarrollo)
npm run dev        # servidor de desarrollo con recarga en caliente  -> http://localhost:5173
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve dist/ para verificar el build            -> http://localhost:4173
```

El resultado de `npm run build` (`dist/`) es **100 % estático**: se puede publicar en
cualquier servidor de archivos o CDN (GitHub Pages, Netlify, Nginx, etc.).

## Estructura del proyecto

```
index.html                 Estructura HTML de las 11 pantallas (punto de entrada de Vite)
src/styles/                 Hoja de estilos dividida por responsabilidad
  01-base.css                 Tokens de color, reset, layout, barra lateral, topbar,
                              tarjetas, botones, formulario de involucrados
  02-paso1.css                Paso 1 · Capas metodológicas
  03-paso2.css                Paso 2 · Análisis del problema (navegación interna)
  04-paso3.css                Paso 3 · Análisis de objetivos
  05-paso2-detalle.css        Paso 2 en detalle: problema central, efectos y causas,
                              fichas de nodos, árbol jerárquico, validación, bitácora
  06-transiciones.css         Transición entre módulos y Paso 3.1 en adelante
public/
  app.js                     Lógica de la aplicación (JavaScript vanilla, sin dependencias)
  caso_uso_jovenes_rurales_manizales.json   Caso de ejemplo para "Importar JSON"
vite.config.js               Configuración de build (rutas relativas, salida en dist/)
docs/                        Estrategia de despliegue (documento del Módulo 3)
legacy/                      Versiones anteriores conservadas para trazabilidad
  artefacto_MML_esqueleto_11_pantallas.html   Monolito original (HTML+CSS+JS en 1 archivo)
  style.css, script.js                        Archivos de una versión previa (v7), sin uso
```

## Sobre la modularización

Se separó el archivo monolítico `artefacto_MML_esqueleto_11_pantallas.html` (~12.000
líneas) en HTML, 6 hojas de estilo y la lógica JavaScript, **sin modificar el
comportamiento ni los estilos**: el CSS son las mismas reglas en el mismo orden y
`public/app.js` es idéntico byte a byte al `<script>` original. Se añadió Vite como
herramienta de desarrollo y empaquetado.

### Problema conocido (preexistente)

En el monolito original, cinco manejadores llamados desde atributos `onclick` quedaron
definidos dentro de un IIFE y por tanto **no son accesibles** desde el ámbito global:
`editActor`, `deleteActor`, `copyAIPrompt`, `generateObjectiveProposals`,
`updateObjectiveValue`. La modularización **conserva ese comportamiento tal cual** (no lo
corrige ni lo agrava). Exponerlos con `window.<fn> = <fn>` (el patrón que ya usa el autor
para `showScreen`, `state`, etc.) sería un arreglo de una línea si se decide abordarlo.

## Despliegue

Ver `docs/estrategia_despliegue_MML.docx`. En resumen: `push` a `main` →
GitHub Actions ejecuta `npm ci` y `npm run build` → publica `dist/` en GitHub Pages.
El despliegue en VPS con servidor propio queda como trabajo futuro.

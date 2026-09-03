# Estrategia de Despliegue — Artefacto MML

**Materia:** Laboratorio de DevOps — Semestre VIII
**Módulo 3:** Modularización y estrategia de despliegue
**Autor:** Yahir Rangel
**Fecha:** 2 de septiembre de 2026
**Repositorio:** https://github.com/AndresSc21/Taller1_Lab_DevOps

---

## 1. Contexto y alcance

El artefacto es una aplicación web educativa para formular proyectos siguiendo la
**Metodología de Marco Lógico (MML) de CEPAL/ILPES**. Funciona como una *Single Page
Application* (SPA) de **11 pantallas**: Ficha del caso (Paso 0) y Pasos 1 a 10
(análisis de involucrados, del problema, de objetivos, selección de alternativa y
construcción de la Matriz de Marco Lógico).

Características técnicas relevantes para el despliegue:

| Aspecto | Situación |
|---|---|
| Backend | No tiene. Toda la lógica corre en el navegador. |
| Base de datos | No usa. El estado vive en memoria. |
| Persistencia | Exportar / Importar un archivo JSON (API `File` del navegador). |
| Autenticación | No aplica. Herramienta de un solo usuario (el estudiante). |
| Servicios externos / API | Ninguno. Sin llamadas de red. |
| Dependencias de terceros en el navegador | Ninguna (JavaScript *vanilla*). |

**Consecuencia:** una vez compilado, el artefacto es un conjunto de **archivos
estáticos** (HTML, CSS, JS y un JSON de ejemplo). No necesita un proceso de servidor
para funcionar; basta con servir los archivos.

### Objetivo del módulo

1. **Modularizar** el proyecto sin cambiar su funcionalidad ni sus estilos.
2. **Definir y justificar** el framework, las librerías y el servidor.
3. **Plantear el flujo de despliegue.**

---

## 2. Punto de partida: el monolito

Todo el proyecto vivía en **un solo archivo**,
`artefacto_MML_esqueleto_11_pantallas.html` (~12.350 líneas, 312 KB):

- `<style>` incrustado: ~3.000 líneas de CSS.
- Marcado HTML de las 11 pantallas.
- `<script>` incrustado: ~7.000 líneas de JavaScript.

Existían además `style.css` y `script.js` de una versión anterior (v7), **sin uso** en el
archivo actual.

Problemas de este esquema para un flujo DevOps:

- Imposible revisar cambios con claridad (todo toca el mismo archivo).
- No se puede minificar, versionar ni cachear cada recurso por separado.
- Mezcla responsabilidades (estructura, presentación y comportamiento).
- No hay proceso reproducible de construcción ni de publicación.

---

## 3. Arquitectura después de modularizar

Se separaron las tres responsabilidades y se conservó el comportamiento **exacto**:

```
index.html                 Estructura de las 11 pantallas (entrada de la build)
src/styles/                 CSS dividido en 6 módulos por responsabilidad
  01-base.css                 Tokens, reset, layout, barra lateral, topbar, botones…
  02-paso1.css                Paso 1 · Capas metodológicas
  03-paso2.css                Paso 2 · Análisis del problema
  04-paso3.css                Paso 3 · Análisis de objetivos
  05-paso2-detalle.css        Problema central, causas/efectos, árbol, validación, bitácora
  06-transiciones.css         Transición entre módulos y Paso 3.1+
public/
  js/                        Lógica de la aplicación, 7 scripts clásicos por responsabilidad
    01-flujo-validacion.js     Asistente + validación/contexto/bitácora del Paso 2
    02-core.js                 Navegación, estado, Paso 1 (involucrados), Paso 3 (objetivos)
    03-problema-central.js     Subpantallas del Paso 2 y problema central
    04-nodos.js                Alta/baja de nodos de causas y efectos
    05-arbol.js                Render del árbol de problemas (SVG)
    06-evidencia-prompts.js    Evidencia de nodos, módulo del problema y prompts de IA
    07-objetivos-json.js       Subpantallas del Paso 3 y exportar/importar JSON
  caso_uso_jovenes_rurales_manizales.json   Caso de ejemplo
vite.config.js               Configuración de construcción
legacy/                      Monolito original y archivos v7 (trazabilidad)
```

Criterio de preservación aplicado:

- El CSS son **las mismas reglas en el mismo orden** (la cascada no cambia); los
  `@media` viajan dentro de su sección.
- El JavaScript se cortó en **7 scripts clásicos** por responsabilidad, cargados en
  orden al final del `<body>`. Comparten el mismo ámbito global y se ejecutan en
  secuencia, así que **la concatenación de los 7 archivos es idéntica byte a byte** al
  `<script>` original (mismo modelo de ejecución que antes). El núcleo (`02-core.js`)
  se deja como un bloque porque el original ya lo tenía dentro de un IIFE;
  descomponerlo más queda como paso futuro.
- El marcado de las 11 `<section class="screen">` no se tocó.

Verificación realizada (entorno DOM simulado, monolito vs. versión modular):
11 pantallas, 11 ítems de navegación, pantalla inicial `screen0`, recorrido por las 11
pantallas sin errores, y **el mismo comportamiento** en ambos — incluido un defecto
preexistente (cinco manejadores `onclick` definidos dentro de un IIFE que ya no eran
accesibles): la modularización lo conserva, no lo introduce ni lo corrige.

### Flujo de trabajo

| Comando | Qué hace | Cuándo |
|---|---|---|
| `npm run dev` | Servidor local con recarga en caliente (HMR) | Desarrollo |
| `npm run build` | Genera `dist/` (HTML + CSS agrupado y minificado) | Antes de publicar |
| `npm run preview` | Sirve `dist/` para comprobar la build | Verificación previa |

---

## 4. Framework y enfoque — decisión y justificación

### Decisión

**JavaScript vanilla + CSS modular, empaquetado con Vite.** Sin framework de interfaz.

### Justificación

1. **El requisito es modularizar sin cambiar comportamiento.** La aplicación ya está
   escrita y es funcional en JavaScript vanilla (~7.000 líneas, render manual de SVG para
   el árbol de problemas, estado global mutable). Mantener el lenguaje permite *mover* el
   código, no reescribirlo.
2. **Vite aporta lo mismo que daría el tooling de un framework**, sin su peso:
   sistema de módulos, servidor de desarrollo con recarga en caliente, y build de
   producción que agrupa y minifica el CSS y versiona los recursos (*cache busting*).
3. **Peso de ejecución = 0.** No se envía ninguna librería al navegador. Menor superficie
   de mantenimiento y de seguridad, y carga inmediata.
4. **Encaja con el pipeline:** `npm run build` es un paso reproducible que GitHub Actions
   puede ejecutar sin configuración especial.

### Por qué NO React (recomendado en clase)

React es una opción válida y ligera *para proyectos nuevos*. Para **este** proyecto no se
justifica:

| Criterio | Efecto de migrar a React |
|---|---|
| Esfuerzo | Reescribir 11 pantallas como componentes, el estado global a *hooks*/Context y el árbol SVG a JSX. |
| Riesgo | Alto: es fácil que se filtren diferencias de comportamiento o de estilo — justo lo que el taller prohíbe. |
| Peso | Añade `react` + `react-dom` (~130–140 KB sin comprimir) al navegador. |
| Beneficio real | Bajo: es una herramienta estática, de un solo usuario, sin datos remotos ni estado compartido. |

React (o la migración a *ES Modules* con `import`/`export`) queda documentado como
**evolución futura**: si el artefacto creciera hacia colaboración multiusuario, guardado
en la nube o un catálogo de casos, ahí sí tendría sentido.

---

## 5. Librerías

### En ejecución (navegador): **ninguna**

0 dependencias de *runtime*. Argumentos: menor peso, sin vulnerabilidades heredadas de
terceros, sin obsolescencia de paquetes, comportamiento 100 % bajo control.

### En desarrollo

| Librería | Rol | Por qué |
|---|---|---|
| **Vite** (`^6`) | Servidor de desarrollo + empaquetado | Estándar actual, cero configuración, corre sobre Node, build muy rápida (esbuild/Rollup). |

Opcionales, recomendadas como siguiente paso (calidad de código, no funcionalidad):
**Prettier** (formato consistente) y **ESLint** (detección de errores). Se integrarían
como un paso `lint` en el pipeline.

---

## 6. Servidor y hosting — decisión y justificación

### Análisis

El `dist/` es estático → **no se requiere un proceso de servidor** (ni Node/Express, ni
PHP, ni base de datos). Solo hace falta entregar archivos por HTTP.

| Opción | Ventajas | Desventajas | Veredicto |
|---|---|---|---|
| **GitHub Pages** | Gratis, HTTPS y CDN incluidos, integración directa con el repo y con GitHub Actions, cero infraestructura que administrar. | Solo estáticos (no es limitación aquí). | **Elegida** |
| Netlify / Vercel | Igual de simple, previews por PR. | Cuenta y proveedor externos adicionales. | Alternativa válida |
| VPS + Nginx (contenedor) | Control total, base para crecer a backend. | Hay que aprovisionar, asegurar y mantener un servidor; el curso aún no llega a esto. | **Trabajo futuro** |
| VPS + Node/Express | Un proceso Node real que servir. | Innecesario para archivos estáticos; más piezas que fallan. | Descartada por ahora |

### Decisión

**Hosting: GitHub Pages.** Publica el contenido de `dist/` en cada cambio de `main`.

### Trabajo futuro (VPS)

Cuando el curso aborde servidores propios, el mismo `dist/` se serviría desde un
contenedor **Nginx** (`nginx:alpine`) con una regla de *fallback* a `index.html`.
La modularización y la build ya dejan todo listo para ese salto; solo cambia el destino,
no el proceso de construcción.

---

## 7. Flujo de despliegue (CI/CD con GitHub Actions)

> Descrito aquí como diseño; la implementación del workflow corresponde a la fase
> siguiente del curso.

**Disparador:** `push` a la rama `main`.

**Etapas del pipeline:**

1. **Checkout** — descarga del código.
2. **Preparar Node** — Node 20, caché de `npm`.
3. **Instalar** — `npm ci` (instalación limpia y reproducible desde `package-lock.json`).
4. *(Recomendado)* **Lint** — `npm run lint` (Prettier/ESLint) para no publicar código con errores.
5. **Construir** — `npm run build` → genera `dist/`.
6. **Publicar** — subir `dist/` como artefacto de Pages y desplegar
   (`actions/upload-pages-artifact` + `actions/deploy-pages`).

**Resultado:** el artefacto queda disponible en
`https://andressc21.github.io/Taller1_Lab_DevOps/` a los pocos minutos de cada `push`.

### Diagrama del flujo

```
  Desarrollador                GitHub                       GitHub Actions                     Usuario final
 ──────────────      ────────────────────────      ─────────────────────────────      ─────────────────────────
  git push main  ─▶   Repositorio (rama main)  ─▶   checkout                             navegador
                                                    setup-node + npm ci
                                                    (lint)
                                                    npm run build  ──▶  dist/
                                                    deploy-pages   ──────────────▶  GitHub Pages (CDN + HTTPS)
                                                                                    │
                                                                                    └──▶  https://andressc21.github.io/Taller1_Lab_DevOps/
```

### Diagrama de despliegue (vista de componentes)

```
┌─────────────────────────────┐        ┌───────────────────────────────┐
│  Repositorio GitHub         │        │  GitHub Actions (runner)       │
│  - index.html               │  push  │  Node 20                       │
│  - src/styles/*.css         │───────▶│  npm ci → npm run build        │
│  - public/js/*.js           │        │  salida: dist/                 │
│  - vite.config.js           │        └───────────────┬───────────────┘
└─────────────────────────────┘                        │ deploy
                                                       ▼
                                       ┌───────────────────────────────┐
                                       │  GitHub Pages                 │
                                       │  CDN + HTTPS                   │
                                       │  sirve archivos estáticos     │
                                       └───────────────┬───────────────┘
                                                       │ HTTPS
                                                       ▼
                                       ┌───────────────────────────────┐
                                       │  Navegador del usuario        │
                                       │  ejecuta los 7 scripts (vanilla)│
                                       │  estado en memoria + JSON      │
                                       └───────────────────────────────┘
```

---

## 8. Conclusión

La modularización no es un fin estético: es lo que **habilita el pipeline**. Al separar
HTML, CSS (6 módulos) y JavaScript, y al introducir Vite:

- cada cambio es revisable y cada recurso se puede optimizar y cachear por separado;
- `npm run build` da un paso de construcción **reproducible** que la CI ejecuta igual que
  la máquina local;
- el resultado estático se publica en **GitHub Pages** sin administrar servidores.

Las decisiones — *vanilla* en vez de React, 0 librerías de ejecución, hosting estático —
responden a lo que el artefacto **es hoy**: una herramienta educativa estática y de un
solo usuario. Las alternativas más pesadas (React, VPS, servidor Node) quedan
identificadas y justificadas como evolución futura si el alcance cambia.

---

## Anexo · Resumen de decisiones

| Pregunta | Decisión | Razón principal |
|---|---|---|
| ¿Framework? | Ninguno (JS vanilla) | Modularizar sin reescribir; 0 peso de ejecución |
| ¿Empaquetador? | Vite | Estándar, corre en Node, build reproducible, HMR |
| ¿Librerías en el navegador? | Ninguna | Menos peso, mantenimiento y riesgo |
| ¿Librerías de desarrollo? | Vite (+ Prettier/ESLint sugeridos) | Tooling mínimo y calidad de código |
| ¿Servidor? | No hace falta (sitio estático) | Sin backend, sin BD, sin sesiones |
| ¿Hosting? | GitHub Pages | Gratis, HTTPS+CDN, integra con Actions |
| ¿CI/CD? | GitHub Actions: `npm ci` → `build` → deploy Pages | Reproducible y automático en cada `push` |
| ¿VPS / Nginx / Node? | Trabajo futuro | El curso aún no llega; hoy no aporta |

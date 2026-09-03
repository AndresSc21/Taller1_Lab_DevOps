    function renderNodeEvidence() {

      const box =
        document.getElementById("nodeEvidenceWorkspace");

      if (!box) {
        return;
      }

      const nodes =
        Array.isArray(state.nodos)
          ? state.nodos
          : [];

      if (!nodes.length) {

        box.innerHTML = `
      <div class="notice">
        Aún no hay nodos registrados.
      </div>
    `;

        return;
      }

      /*
       * Para el Avance 2:
       * P y nodos de primer nivel requieren sustentación.
       * Los demás se muestran para trazabilidad.
       */

      const ordered =
        [...nodes].sort(function (a, b) {

          if (a.codigo === "P") return -1;
          if (b.codigo === "P") return 1;

          if (a.tipo !== b.tipo) {
            return a.tipo === "efecto" ? -1 : 1;
          }

          return Number(a.nivel || 0) -
            Number(b.nivel || 0);

        });


      function requirement(node) {

        if (node.codigo === "P") {
          return "Obligatoria";
        }

        if (Number(node.nivel) === 1) {
          return "Obligatoria";
        }

        return "Opcional en Avance 2";
      }


      function confidenceClass(value) {

        if (value === "Alta") {
          return "success";
        }

        if (value === "Baja") {
          return "danger";
        }

        return "warning";
      }


      box.innerHTML = `

    <div class="node-evidence-summary">

      <div>
        <strong>
          ${ordered.length}
          elementos con trazabilidad
        </strong>

        <span>
          La ficha se alimenta directamente de los nodos
          registrados en el árbol.
        </span>
      </div>

      <div class="node-evidence-legend">

        <span class="badge success">
          Sustentación completa
        </span>

        <span class="badge warning">
          Pendiente de fortalecer
        </span>

        <span class="badge danger">
          Sin evidencia
        </span>

      </div>

    </div>


    <div class="node-evidence-table-wrap">

      <table class="node-evidence-table">

        <thead>

          <tr>

            <th>Código</th>

            <th>Enunciado</th>

            <th>Tipo / nivel</th>

            <th>Evidencia</th>

            <th>Línea base</th>

            <th>Confianza</th>

            <th>Estado</th>

          </tr>

        </thead>

        <tbody>

          ${ordered.map(function (node) {

        const hasEvidence =
          Boolean(
            String(node.evidencia || "").trim()
          );

        const hasBaseline =
          Boolean(
            String(node.lineaBase || "").trim()
          );

        const complete =
          hasEvidence &&
          hasBaseline;

        const confidence =
          node.confianza || "Baja";

        const statusClass =
          complete
            ? "success"
            : hasEvidence
              ? "warning"
              : "danger";

        const statusText =
          complete
            ? "Sustentada"
            : hasEvidence
              ? "Completar línea base"
              : "Falta evidencia";

        return `

              <tr>

                <td>

                  <strong>
                    ${escapeHTML(node.codigo)}
                  </strong>

                  ${node.codigo === "P"
            ? `<span class="badge">Problema</span>`
            : ""}

                </td>


                <td>

                  <div class="node-evidence-statement">

                    ${escapeHTML(
              node.enunciado || ""
            )}

                  </div>

                  <div class="small-note">

                    Padre:
                    ${escapeHTML(
              node.padre || "—"
            )}

                  </div>

                </td>


                <td>

                  <span class="badge">

                    ${node.tipo === "causa"
            ? "Causa"
            : node.tipo === "efecto"
              ? "Efecto"
              : "Problema"}

                  </span>

                  <div class="small-note"
                    style="margin-top:5px">

                    Nivel
                    ${escapeHTML(
                node.nivel ?? "—"
              )}

                  </div>

                </td>


                <td>

                  <div class="
                    ${hasEvidence
            ? "node-evidence-value"
            : "node-evidence-missing"}
                  ">

                    ${escapeHTML(
              node.evidencia ||
              "Pendiente de fuente"
            )}

                  </div>

                </td>


                <td>

                  <div class="
                    ${hasBaseline
            ? "node-evidence-value"
            : "node-evidence-missing"}
                  ">

                    ${escapeHTML(
              node.lineaBase ||
              "Pendiente de dato"
            )}

                  </div>

                </td>


                <td>

                  <span class="
                    badge
                    ${confidenceClass(confidence)}
                  ">

                    ${escapeHTML(confidence)}

                  </span>

                </td>


                <td>

                  <span class="
                    badge
                    ${statusClass}
                  ">

                    ${statusText}

                  </span>

                  <div class="small-note"
                    style="margin-top:5px">

                    ${requirement(node)}

                  </div>

                </td>

              </tr>

            `;

      }).join("")}

        </tbody>

      </table>

    </div>


    <div class="notice"
      style="margin-top:12px">

      <strong>Regla de sustentación:</strong>
      un nodo no se considera suficientemente sustentado solo
      porque sea plausible. Debe poder señalarse una fuente,
      un dato de línea base o una verificación pendiente.
      Las propuestas de IA deben contrastarse antes de aceptarse.

    </div>

  `;
    }

    function renderProblemModule() {

      renderProblemNodes();

      renderProblemTree();

    }

    /* =========================================================
   PASO 2.6 · ASISTENTE IA
   Generación contextualizada de prompts
   ========================================================= */

    function generateProblemPrompt(tipo) {

      const caso = state.caso || {};
      const problema = state.problema || {};

      const nodos =
        Array.isArray(state.nodos)
          ? state.nodos
          : [];


      /* ---------------------------------------------------------
         DATOS DEL CASO
         --------------------------------------------------------- */

      const casoNombre =
        caso.nombre ||
        caso.titulo ||
        "No registrado";

      const territorio =
        caso.territorio ||
        "No registrado";

      const poblacion =
        caso.poblacion ||
        problema.poblacion ||
        "No registrada";

      const periodo =
        caso.periodo ||
        "No registrado";

      const situacion =
        caso.situacion ||
        "No registrada";


      /* ---------------------------------------------------------
         PROBLEMA CENTRAL
         --------------------------------------------------------- */

      const root =
        nodos.find(function (node) {
          return node &&
            node.codigo === "P";
        });

      const problemaCentral =
        root?.enunciado ||
        problema.enunciado ||
        "";


      /* ---------------------------------------------------------
         COMPONENTES DEL PROBLEMA
         --------------------------------------------------------- */

      const condicion =
        problema.condicion ||
        problema.cond ||
        "";

      const atributo =
        problema.atributo ||
        "";

      const poblacionProblema =
        problema.poblacion ||
        poblacion;

      const delimitacion =
        problema.delimitacion ||
        problema.delim ||
        territorio;


      /* ---------------------------------------------------------
         REPRESENTACIÓN DEL ÁRBOL
         --------------------------------------------------------- */

      function formatNodes(type) {

        const filtered =
          nodos.filter(function (node) {

            return node &&
              node.codigo !== "P" &&
              node.tipo === type;

          });


        if (!filtered.length) {
          return "No hay nodos registrados.";
        }


        return filtered
          .sort(function (a, b) {

            return String(a.codigo)
              .localeCompare(
                String(b.codigo),
                undefined,
                {
                  numeric: true
                }
              );

          })
          .map(function (node) {

            return [
              node.codigo,
              "Nivel " + (node.nivel ?? "—"),
              "Padre " + (node.padre || "P"),
              node.enunciado || "Sin enunciado",
              "Evidencia: " +
              (node.evidencia || "Pendiente"),
              "Línea base: " +
              (node.lineaBase || "Pendiente"),
              "Confianza: " +
              (node.confianza || "Baja"),
              "Origen: " +
              (node.origen || "Formulador")
            ].join(" | ");

          })
          .join("\n");

      }


      const causas =
        formatNodes("causa");

      const efectos =
        formatNodes("efecto");


      /* ---------------------------------------------------------
         CONTEXTO COMÚN
         --------------------------------------------------------- */

      const contexto = `

CONTEXTO DEL CASO
Nombre del caso: ${casoNombre}
Territorio: ${territorio}
Población afectada: ${poblacion}
Periodo: ${periodo}

Situación problemática:
${situacion}

PROBLEMA CENTRAL ACTUAL
${problemaCentral || "Pendiente"}

COMPONENTES DE FORMULACIÓN
Condición negativa:
${condicion || "Pendiente"}

Atributo o manifestación:
${atributo || "Pendiente"}

Población:
${poblacionProblema || "Pendiente"}

Delimitación:
${delimitacion || "Pendiente"}

RESTRICCIONES
- No inventes datos.
- No inventes fuentes.
- No conviertas hipótesis en hechos.
- No introduzcas datos personales.
- Diferencia evidencia disponible de inferencias.
- Toda propuesta debe quedar marcada como propuesta.
- El formulador conserva la decisión final.
`;


      /* ---------------------------------------------------------
         PROMPT 1 · PROBLEMA CENTRAL
         --------------------------------------------------------- */

      if (tipo === "problema") {

        const prompt = `

ACTÚA COMO ASESOR METODOLÓGICO EN LA FORMULACIÓN
DE PROYECTOS CON METODOLOGÍA DE MARCO LÓGICO
CEPAL/ILPES.

Tu función es DEPURAR críticamente la formulación
del problema central. No debes decidir ni reemplazar
automáticamente el problema del formulador.

${contexto}

PROBLEMA A REVISAR
${problemaCentral || "No formulado"}

EVALÚA:

1. Si expresa un estado negativo observable.
2. Si identifica una población afectada.
3. Si está delimitado territorial y temporalmente.
4. Si el atributo problemático es concreto.
5. Si puede ser respaldado mediante evidencia.
6. Si realmente corresponde al problema central.
7. Si está formulado como causa.
8. Si está formulado como efecto.
9. Si contiene una solución implícita.
10. Si une problemas diferentes mediante una conjunción.

ENTREGA:

A. Hallazgos críticos.
B. Elementos que deberían conservarse.
C. Riesgos o ambigüedades.
D. Una o máximo tres ALTERNATIVAS DE REDACCIÓN
   del problema central.

No selecciones una alternativa por el formulador.

Para cada alternativa indica qué cambiaste
y por qué.

IMPORTANTE:
Las alternativas son PROPUESTAS DE IA.
No son hechos ni decisiones finales.
`;

        writeProblemPrompt(
          "problemPromptProblema",
          prompt,
          "Depuración del problema central"
        );

        return;
      }


      /* ---------------------------------------------------------
         PROMPT 2 · CAUSAS Y EFECTOS
         --------------------------------------------------------- */

      if (tipo === "arbol") {

        const prompt = `

ACTÚA COMO ASESOR METODOLÓGICO EN LA CONSTRUCCIÓN
DE ÁRBOLES DE PROBLEMAS CON METODOLOGÍA DE MARCO
LÓGICO CEPAL/ILPES.

Tu función es PROPONER hipótesis causales y de efectos
para ampliar el análisis. No debes modificar
automáticamente el árbol ni presentar hipótesis como hechos.

${contexto}

ÁRBOL ACTUAL · CAUSAS
${causas}

ÁRBOL ACTUAL · EFECTOS
${efectos}

TAREA

Identifica posibles:

1. Causas adicionales.
2. Eslabones causales intermedios que podrían faltar.
3. Causas raíz que podrían explicar causas superiores.
4. Efectos directos adicionales.
5. Efectos indirectos adicionales.
6. Relaciones padre-hijo que deberían revisarse.

CRITERIOS

- Cada causa debe expresar un estado negativo.
- Cada efecto debe expresar una consecuencia.
- No redactes causas como actividades o soluciones.
- No repitas el problema central con otras palabras.
- No inventes evidencia.
- No inventes cifras.
- No asumas que una hipótesis es verdadera.
- Distingue claramente entre evidencia y propuesta.
- Respeta la estructura causal existente.

FORMATO DE RESPUESTA

PROPUESTA 1
Tipo:
Nivel sugerido:
Padre sugerido:
Enunciado:
Justificación causal:
Evidencia requerida:

PROPUESTA 2
...

Al final incluye:

NODOS QUE NO DEBERÍAN AGREGARSE
Indica cuáles propuestas podrían ser redundantes,
demasiado generales, soluciones disfrazadas o efectos
que realmente corresponden a causas.

Todas las propuestas tienen confianza BAJA hasta
ser contrastadas por el formulador.
`;

        writeProblemPrompt(
          "problemPromptArbol",
          prompt,
          "Propuesta de causas y efectos"
        );

        return;
      }


      /* ---------------------------------------------------------
         PROMPT 3 · CONTRADICCIÓN
         --------------------------------------------------------- */

      if (tipo === "validacion") {

        const prompt = `

ACTÚA COMO REVISOR CRÍTICO DE UN ÁRBOL DE PROBLEMAS
CONSTRUIDO BAJO LA METODOLOGÍA DE MARCO LÓGICO
CEPAL/ILPES.

No reconstruyas el árbol automáticamente.
Tu función es intentar ENCONTRAR RUPTURAS,
contradicciones y relaciones débiles.

${contexto}

CAUSAS ACTUALES
${causas}

EFECTOS ACTUALES
${efectos}

REVISA CRÍTICAMENTE:

1. DIRECCIÓN CAUSAL
¿La relación padre-hijo puede leerse realmente
como causa → consecuencia?

2. NIVELES
¿Existe continuidad lógica entre los niveles?
¿Hay saltos o nodos colocados en niveles incorrectos?

3. SUFICIENCIA
¿Las causas terminales explican razonablemente
los nodos superiores?

4. NO CIRCULARIDAD
¿Existe alguna relación circular o dependencia
que termine explicando un nodo mediante sí mismo?

5. REDUNDANCIA
¿Hay nodos que expresan prácticamente lo mismo?

6. REPETICIÓN DEL PROBLEMA
¿Alguna causa simplemente repite el problema central?

7. CAUSAS COMO SOLUCIONES
Busca expresiones como:
"falta", "se necesita", "capacitar",
"implementar", "crear", "construir",
"fortalecer", "promover".

8. EFECTOS MAL CLASIFICADOS
Determina si algún supuesto efecto parece realmente
una causa o una condición previa.

9. EVIDENCIA
Identifica nodos cuya afirmación necesita evidencia
adicional.

10. PADRES INCORRECTOS
Revisa si cada relación padre-hijo es causalmente
defendible.

FORMATO

HALLAZGO 1
Nodo:
Tipo de problema:
Qué resulta débil:
Por qué:
Evidencia que debería revisarse:

HALLAZGO 2
...

CIERRE

Clasifica cada hallazgo como:

- Crítico
- Requiere revisión
- Observación

NO MODIFIQUES LOS NODOS.

Tu resultado es una PROPUESTA DE REVISIÓN.
La decisión corresponde al formulador.
`;

        writeProblemPrompt(
          "problemPromptValidacion",
          prompt,
          "Contradicción del árbol"
        );

        return;
      }


      alert(
        "No se reconoce el tipo de consulta solicitado."
      );

    }

    function copyProblemPrompt(elementId) {

      const textarea =
        document.getElementById(elementId);

      if (!textarea || !textarea.value.trim()) {

        alert(
          "Primero prepara la consulta."
        );

        return;
      }


      /*
       * Clipboard API cuando está disponible.
       */

      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {

        navigator.clipboard
          .writeText(textarea.value)
          .then(function () {

            alert(
              "Consulta copiada al portapapeles."
            );

          })
          .catch(function () {

            fallbackCopyProblemPrompt(
              textarea
            );

          });

        return;
      }


      fallbackCopyProblemPrompt(
        textarea
      );

    }


    function fallbackCopyProblemPrompt(textarea) {

      textarea.focus();
      textarea.select();

      try {

        document.execCommand("copy");

        alert(
          "Consulta copiada al portapapeles."
        );

      } catch (error) {

        alert(
          "No fue posible copiar automáticamente. " +
          "Selecciona el texto y cópialo manualmente."
        );

      }

    }

    function writeProblemPrompt(
      elementId,
      prompt,
      taskName
    ) {

      const textarea =
        document.getElementById(elementId);

      if (!textarea) {
        return;
      }

      textarea.value =
        prompt.trim();


      /*
       * El prompt generado se registra en la bitácora.
       * Todavía NO registramos una "salida del modelo"
       * porque el artefacto offline no está ejecutando IA.
       */

      if (!Array.isArray(state.bitacora)) {
        state.bitacora = [];
      }


      state.bitacora.push({

        fecha:
          new Date().toISOString(),

        patron:
          "Paso 2.6 · " + taskName,

        prompt:
          prompt,

        salida:
          "Prompt preparado. Pendiente de ejecutar y contrastar con el modelo.",

        error:
          "Pendiente de ejecutar la consulta y verificar la salida.",

        comoSeDetecto:
          "",

        correccion:
          "Pendiente de registrar la revisión humana."

      });


      /*
       * Si posteriormente existe la función de renderizado
       * de bitácora, actualizarla.
       */

      if (
        typeof renderProblemBitacora ===
        "function"
      ) {

        renderProblemBitacora();

      }

    }


    function renderTreeNode(node) {

      return `
    <div class="tree-node"
      style="
        min-width:220px;
        max-width:360px;
      ">

      <strong>
        ${escapeHTML(node.codigo || "Sin código")}
      </strong>

      <div style="margin-top:6px;">
        ${escapeHTML(
        node.enunciado || "Sin enunciado"
      )}
      </div>

      <small style="
        display:block;
        margin-top:7px;
      ">

        Nivel ${escapeHTML(node.nivel ?? "—")}
        · Padre ${escapeHTML(node.padre || "P")}

      </small>

    </div>
  `;
    }


    function renderProblemNodeList(nodes, type) {

      if (!nodes.length) {

        return `
      <div class="notice">
        No hay ${type === "efecto"
            ? "efectos"
            : "causas"} registrados.
      </div>
    `;
      }

      return nodes.map(function (node) {

        const origin =
          node.origen === "Propuesta IA"
            ? "Propuesta IA"
            : "Formulador";

        const confidence =
          node.confianza || "Baja";

        return `
      <div class="card" style="margin-top:10px">

        <div class="section-head">

          <div>

            <div>
              <strong>${escapeHTML(node.codigo || "Sin código")}</strong>
              <span class="pill">
                ${node.tipo === "efecto"
            ? "Efecto"
            : "Causa"}
              </span>
            </div>

            <h4 style="margin-top:7px">
              ${escapeHTML(
              node.enunciado || "Sin enunciado"
            )}
            </h4>

          </div>

        </div>

        <div class="small-note">

          Nivel:
          <strong>
            ${escapeHTML(node.nivel ?? "—")}
          </strong>

          · Padre:
          <strong>
            ${escapeHTML(node.padre || "P")}
          </strong>

          · Confianza:
          <strong>
            ${escapeHTML(confidence)}
          </strong>

          · Origen:
          <strong>
            ${escapeHTML(origin)}
          </strong>

        </div>

        <div class="small-note">

          <strong>Evidencia:</strong>
          ${escapeHTML(
              node.evidencia || "Pendiente"
            )}

        </div>

        <div class="small-note">

          <strong>Línea base:</strong>
          ${escapeHTML(
              node.lineaBase || "Pendiente"
            )}

        </div>

      </div>
    `;

      }).join("");
    }
    /* =========================================================
   PASO 3 · ANÁLISIS DE OBJETIVOS
   Navegación interna de las 7 etapas
   ========================================================= */


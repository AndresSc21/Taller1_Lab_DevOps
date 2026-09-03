    (function () {
      "use strict";

      const NAV = [
        { id: 0, label: "Ficha del caso", group: "Punto de partida" },
        { id: 1, label: "Análisis de involucrados", group: "Análisis situacional", step: "Paso 1" },
        { id: 2, label: "Análisis del problema", group: "Análisis situacional", step: "Paso 2" },
        { id: 3, label: "Análisis de objetivos", group: "Análisis situacional", step: "Paso 3" },
        { id: 4, label: "Selección de la estrategia óptima", group: "Análisis situacional", step: "Paso 4" },
        { id: 5, label: "Estructura Analítica", group: "Matriz de Marco Lógico", step: "Paso 5" },
        { id: 6, label: "Resumen narrativo", group: "Matriz de Marco Lógico", step: "Paso 6" },
        { id: 7, label: "Indicadores", group: "Matriz de Marco Lógico", step: "Paso 7" },
        { id: 8, label: "Medios de verificación", group: "Matriz de Marco Lógico", step: "Paso 8" },
        { id: 9, label: "Supuestos", group: "Matriz de Marco Lógico", step: "Paso 9" },
        { id: 10, label: "Previsión de la evaluación intermedia", group: "Matriz de Marco Lógico", step: "Paso 10" }
      ];

      window.state = {

        /* =====================================================
          CONTROL DE NAVEGACIÓN
          ===================================================== */
        current: 0,


        /* =====================================================
          CASO
          ===================================================== */
        caso: {
          titulo: "",
          sector: "",
          territorio: "",
          poblacion: "",
          periodo: "",
          situacion: "",
          pregunta: "",
          delimitacion: ""
        },


        /* =====================================================
          PASO 1 · ANÁLISIS DE INVOLUCRADOS
          ===================================================== */
        involucrados: [],
        editingActorIndex: null,


        /* =====================================================
          PASO 2 · ANÁLISIS DEL PROBLEMA
          ===================================================== */
        problema: {
          condicion: "",
          atributo: "",
          poblacion: "",
          delimitacion: "",
          enunciado: ""
        },

        nodos: [],


        /* =====================================================
          PASO 3 · ANÁLISIS DE OBJETIVOS
          ===================================================== */
        objetivos: [],

        acciones: [],

        alternativas: [],

        evaluacion: {
          criterios: [],
          pesos: {},
          valoraciones: {},
          sensibilidad: {}
        },

        seleccion: {
          alternativa: "",
          justificacion: ""
        },


        /* =====================================================
          TRAZABILIDAD
          ===================================================== */
        bitacora: []

      };

      function buildNav() {
        const nav = document.getElementById("navigation");
        let lastGroup = "";

        NAV.forEach(item => {
          if (item.group !== lastGroup) {
            const section = document.createElement("div");
            section.className = "nav-section";

            const title = document.createElement("div");
            title.className = "nav-section-title";
            title.textContent = item.group;

            section.appendChild(title);
            nav.appendChild(section);
            lastGroup = item.group;
          }

          const button = document.createElement("button");
          button.className = "nav-item";
          button.type = "button";
          button.dataset.id = item.id;
          button.innerHTML =
            '<span class="nav-num">' + item.id + '</span>' +
            '<span class="nav-label">' + item.label + '</span>';

          button.addEventListener("click", function () {
            showScreen(item.id);
          });

          nav.lastElementChild.appendChild(button);
        });
      }

      function showScreen(id) {
        state.current = Number(id);

        document.querySelectorAll(".screen").forEach(screen => {
          screen.classList.toggle(
            "active",
            screen.id === "screen" + state.current
          );
        });

        document.querySelectorAll(".nav-item").forEach(button => {
          button.classList.toggle(
            "active",
            Number(button.dataset.id) === state.current
          );
        });

        updateHeader();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        if (id === 3) {
          renderObjectiveTransformation();
          renderObjectiveAssumptions();
        }

      }

      /* Permite que funciones externas al IIFE puedan cambiar de pantalla */
      window.showScreen = showScreen;

      function updateHeader() {
        const item = NAV.find(x => x.id === state.current);
        const title = state.caso.titulo.trim() || "Proyecto sin título";

        document.getElementById("headerProjectTitle").textContent = title;
        document.getElementById("headerStep").textContent = item.step || "Punto de partida";
        document.getElementById("headerStepName").textContent = item.label;
      }

      function syncObjectivesFromProblemNodes() {

        if (!Array.isArray(state.nodos)) {
          state.nodos = [];
        }

        if (!Array.isArray(state.objetivos)) {
          state.objetivos = [];
        }

        state.nodos.forEach(function (nodo) {

          if (!nodo || !nodo.codigo) {
            return;
          }

          const existente = state.objetivos.find(function (objetivo) {
            return objetivo.codigo === nodo.codigo;
          });

          if (!existente) {

            state.objetivos.push({
              codigo: nodo.codigo,
              tipoOrigen: nodo.tipo || "",
              nivel: nodo.nivel ?? null,
              padre: nodo.padre || "",
              enunciadoOrigen: nodo.enunciado || "",

              /* El objetivo todavía NO se genera automáticamente */
              objetivo: "",

              /* Toda propuesta automática deberá quedar trazada */
              propuesta: true,
              confianza: "Baja",
              origen: "Propuesta IA",

              /* Decisión exclusiva del formulador */
              posibleSupuesto: false
            });

          } else {

            /*
             * Mantener actualizada la trazabilidad con el nodo
             * original sin sobrescribir las decisiones del formulador.
             */
            existente.tipoOrigen = nodo.tipo || existente.tipoOrigen;
            existente.nivel = nodo.nivel ?? existente.nivel;
            existente.padre = nodo.padre || existente.padre;
            existente.enunciadoOrigen = nodo.enunciado || existente.enunciado;

          }

        });
      }

      /* =========================================================
   PASO 3.1 · TRANSFORMACIÓN DE PROBLEMAS EN OBJETIVOS
   ========================================================= */

      function renderObjectiveTransformation() {

        const box =
          document.getElementById(
            "objectiveTransformationWorkspace"
          );

        if (!box) {
          return;
        }

        const nodes =
          Array.isArray(state.nodos)
            ? state.nodos
            : [];

        const objectives =
          Array.isArray(state.objetivos)
            ? state.objetivos
            : [];


        if (!nodes.length) {

          box.innerHTML = `
      <div class="notice">
        No hay nodos provenientes del árbol de problemas.
        Regresa al Paso 2 y construye primero el árbol.
      </div>
    `;

          return;
        }


        /*
         * Garantizar correspondencia nodo ↔ objetivo.
         */

        syncObjectivesFromProblemNodes();


        const refreshedObjectives =
          state.objetivos;


        box.innerHTML = `

    <div class="objective-transformation-toolbar">

      <div>

        <strong>
          Revelado del árbol de objetivos
        </strong>

        <span>
          ${nodes.length} nodos provenientes del árbol de problemas.
          Cada conversión permanece editable y marcada como propuesta.
        </span>

      </div>


      <button
        type="button"
        class="btn"
        onclick="generateObjectiveProposals()">

        Generar propuestas

      </button>

    </div>


    <div class="objective-transformation-list">

      ${nodes.map(function (node) {

          const objective =
            refreshedObjectives.find(function (item) {

              return item.codigo === node.codigo;

            });


          if (!objective) {
            return "";
          }


          const role =
            node.codigo === "P"
              ? "Propósito"
              : node.tipo === "causa"
                ? (
                  node.raiz
                    ? "Medio operacionalizable"
                    : "Medio"
                )
                : "Fin";


          const roleClass =
            node.codigo === "P"
              ? "purpose"
              : node.tipo === "causa"
                ? "means"
                : "ends";


          return `

            <article
              class="objective-transformation-card">

              <div class="objective-source">

                <div>

                  <span class="objective-code">
                    ${escapeHTML(node.codigo)}
                  </span>

                  <span class="
                    objective-role
                    ${roleClass}
                  ">

                    ${role}

                  </span>

                  <span class="objective-proposal-badge">
                    Propuesta · Confianza baja
                  </span>

                </div>


                <div class="objective-source-meta">

                  Nivel ${escapeHTML(node.nivel ?? "—")}
                  · Padre ${escapeHTML(node.padre || "P")}

                </div>

              </div>


              <div class="objective-conversion">

                <div class="objective-problem-side">

                  <label>
                    Estado negativo de origen
                  </label>

                  <div class="objective-source-text">

                    ${escapeHTML(
            node.enunciado ||
            "Sin enunciado"
          )}

                  </div>

                </div>


                <div class="objective-arrow">
                  →
                </div>


                <div class="objective-target-side">

                  <label for="objective-${escapeHTML(node.codigo)}">

                    Objetivo propuesto *

                  </label>

                  <textarea
                    id="objective-${escapeHTML(node.codigo)}"
                    rows="3"
                    placeholder="Escribe un estado positivo deseado y viable..."
                    onchange="updateObjectiveValue('${escapeHTML(node.codigo)}', this.value)"
                  >${escapeHTML(
            objective.objetivo || ""
          )}</textarea>


                  <div class="objective-edit-note">

                    Editable por el formulador.
                    No debe nombrar directamente una acción o solución.

                  </div>

                </div>

              </div>


              <div class="objective-card-footer">

                <label class="objective-assumption">

                  <input
                    type="checkbox"
                    ${objective.posibleSupuesto
              ? "checked"
              : ""
            }
                    onchange="
                      toggleObjectiveAssumption(
                        '${escapeHTML(node.codigo)}',
                        this.checked
                      )
                    "
                  >

                  <span>
                    Marcar como posible supuesto
                  </span>

                </label>


                <span class="objective-origin">

                  ${objective.origen === "Propuesta IA"
              ? "Origen: Propuesta"
              : "Origen: Formulador"}

                </span>

              </div>

            </article>

          `;

        }).join("")

          }

    </div>


    <div class="notice objective-method-note">

      <strong>Regla metodológica:</strong>
      convertir un problema en objetivo no significa agregar
      "no" ni nombrar la solución. El resultado debe describir
      una condición positiva, deseable y viable. Las acciones
      se definirán posteriormente sobre los medios operacionalizables.

    </div>

  `;

      }

      function generateObjectiveProposals() {

        if (!Array.isArray(state.nodos)) {
          return;
        }

        syncObjectivesFromProblemNodes();


        state.nodos.forEach(function (node) {

          const objective =
            state.objetivos.find(function (item) {

              return item.codigo === node.codigo;

            });


          if (!objective) {
            return;
          }


          /*
           * Si el formulador ya escribió un objetivo,
           * NO lo sobrescribimos.
           */

          if (
            String(
              objective.objetivo || ""
            ).trim()
          ) {
            return;
          }


          objective.objetivo =
            proposePositiveState(
              node.enunciado
            );

          objective.propuesta = true;
          objective.confianza = "Baja";
          objective.origen = "Propuesta IA";

        });


        renderObjectiveTransformation();

      }

      function proposePositiveState(text) {

        let value =
          String(text || "")
            .trim();


        if (!value) {
          return "";
        }


        /*
         * Transformaciones de estado frecuentes.
         * No son decisiones metodológicas definitivas.
         */

        const replacements = [

          {
            pattern:
              /^limitadas oportunidades/i,

            replacement:
              "Mayores oportunidades"
          },

          {
            pattern:
              /^baja disponibilidad/i,

            replacement:
              "Mayor disponibilidad"
          },

          {
            pattern:
              /^limitada disponibilidad/i,

            replacement:
              "Mayor disponibilidad"
          },

          {
            pattern:
              /^limitada oferta/i,

            replacement:
              "Mayor oferta"
          },

          {
            pattern:
              /^baja oferta/i,

            replacement:
              "Mayor oferta"
          },

          {
            pattern:
              /^débil articulación/i,

            replacement:
              "Articulación fortalecida"
          },

          {
            pattern:
              /^baja articulación/i,

            replacement:
              "Articulación mejorada"
          },

          {
            pattern:
              /^menor disponibilidad/i,

            replacement:
              "Mayor disponibilidad"
          },

          {
            pattern:
              /^alto nivel de/i,

            replacement:
              "Nivel reducido de"
          },

          {
            pattern:
              /^alta proporción de/i,

            replacement:
              "Menor proporción de"
          },

          {
            pattern:
              /^baja proporción de/i,

            replacement:
              "Mayor proporción de"
          },

          {
            pattern:
              /^escasa/i,

            replacement:
              "Mayor disponibilidad de"
          },

          {
            pattern:
              /^insuficiente/i,

            replacement:
              "Nivel suficiente de"
          }

        ];


        for (
          let i = 0;
          i < replacements.length;
          i++
        ) {

          const item =
            replacements[i];


          if (
            item.pattern.test(value)
          ) {

            return value.replace(
              item.pattern,
              item.replacement
            );

          }

        }


        /*
         * Fallback deliberadamente conservador.
         * Se marca como propuesta y requiere edición.
         */

        return "Condición mejorada: " +
          value.charAt(0).toLowerCase() +
          value.slice(1);

      }

      function updateObjectiveValue(
        codigo,
        value
      ) {

        if (!Array.isArray(state.objetivos)) {
          return;
        }


        const objective =
          state.objetivos.find(function (item) {

            return item.codigo === codigo;

          });


        if (!objective) {
          return;
        }


        objective.objetivo =
          String(value || "").trim();


        /*
         * Sigue siendo propuesta hasta que el formulador
         * la revise y valide posteriormente.
         */

        objective.propuesta = true;
        objective.confianza = "Baja";

      }

      function toggleObjectiveAssumption(
        codigo,
        checked
      ) {

        if (!Array.isArray(state.objetivos)) {
          return;
        }

        const objective =
          state.objetivos.find(function (item) {

            return item.codigo === codigo;

          });


        if (!objective) {
          return;
        }


        objective.posibleSupuesto =
          Boolean(checked);


        renderObjectiveTransformation();

        renderObjectiveAssumptions();

      }

      function renderObjectiveAssumptions() {

        const workspace =
          document.getElementById(
            "potentialAssumptionsWorkspace"
          );

        if (!workspace) {
          return;
        }

        const objectives =
          Array.isArray(state.objetivos)
            ? state.objetivos
            : [];

        const candidates =
          objectives.filter(function (objective) {

            return objective.posibleSupuesto === true;

          });


        if (!candidates.length) {

          workspace.innerHTML = `
      <div class="notice">
        Aún no se han identificado objetivos candidatos
        a supuesto.
      </div>
    `;

          return;
        }


        workspace.innerHTML = `

    <div class="potential-assumptions-list">

      ${candidates.map(function (objective) {

          return `

            <div class="potential-assumption-card">

              <div class="potential-assumption-header">

                <div>

                  <strong>
                    ${escapeHTML(
            objective.codigo
          )}
                  </strong>

                  <span class="potential-assumption-badge">
                    POSIBLE SUPUESTO
                  </span>

                </div>

                <button
                  type="button"
                  class="btn-mini"
                  onclick="
                    toggleObjectiveAssumption(
                      '${escapeHTML(objective.codigo)}',
                      false
                    )
                  ">

                  Quitar

                </button>

              </div>


              <div class="potential-assumption-objective">

                ${escapeHTML(
            objective.objetivo ||
            "Objetivo pendiente de formulación"
          )}

              </div>


              <div class="potential-assumption-note">

                Candidato identificado por el formulador.
                La decisión definitiva se realizará posteriormente
                en el Paso 9 · Supuestos.

              </div>

            </div>

          `;

        }).join("")
          }

    </div>

  `;

      }

      function actorValue(id) {
        return document.getElementById(id).value.trim();
      }

      function normalizeLines(text) {
        return text
          .split(/\r?\n/)
          .map(line => line.trim())
          .filter(Boolean);
      }

      function escapeHTML(value) {
        return String(value ?? "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
      }

      window.escapeHTML = escapeHTML;

      function actorPositionLabel(position) {
        if (position === "1") {
          return '<span class="position-positive">+1 · A favor</span>';
        }

        if (position === "-1") {
          return '<span class="position-negative">−1 · En contra</span>';
        }

        return '<span class="position-neutral">0 · Neutral</span>';
      }

      function actorPositionClass(position) {
        if (position === "1") return "position-positive";
        if (position === "-1") return "position-negative";
        return "position-neutral";
      }

      function actorQuadrant(actor) {
        const force = Number(actor.fuerza);
        const intensity = Number(actor.intensidad);

        const highPower = force >= 4;
        const highInterest = intensity >= 4;

        if (highPower && highInterest) {
          return "Alto poder · Alto interés";
        }

        if (highPower && !highInterest) {
          return "Alto poder · Bajo interés";
        }

        if (!highPower && highInterest) {
          return "Bajo poder · Alto interés";
        }

        return "Bajo poder · Bajo interés";
      }

      /*
       * La resultante NO se almacena.
       * Se calcula cada vez que se requiere.
       */
      function calculateActorResult(actor) {
        return Number(actor.fuerza || 0)
          * Number(actor.intensidad || 0)
          * Number(actor.posicion || 0);
      }

      function actorIsComplete(actor) {
        return Boolean(
          actor.grupo &&
          actor.naturaleza &&
          actor.relacion &&
          actor.rol &&
          actor.intereses &&
          actor.problemas_percibidos &&
          actor.problemas_percibidos.length &&
          actor.recursos_mandatos &&
          actor.posicion !== "" &&
          actor.fuerza &&
          actor.intensidad &&
          actor.razon &&
          actor.estrategia
        );
      }

      function clearActorForm() {
        [
          "actorGrupo",
          "actorRelacion",
          "actorRol",
          "actorIntereses",
          "actorProblemas",
          "actorRecursos",
          "actorRazon",
          "actorEstrategia"
        ].forEach(id => {
          document.getElementById(id).value = "";
        });

        document.getElementById("actorNaturaleza").value = "";
        document.getElementById("actorPosicion").value = "";
        document.getElementById("actorFuerza").value = "";
        document.getElementById("actorIntensidad").value = "";

        state.editingActorIndex = null;

        document.getElementById("actorFormTitle").textContent =
          "Registrar involucrado";

        document.getElementById("actorSaveBtn").textContent =
          "Agregar involucrado";

        document.getElementById("actorCancelBtn").style.display =
          "none";
      }

      function readActorForm() {
        return {
          grupo: actorValue("actorGrupo"),
          naturaleza: actorValue("actorNaturaleza"),
          relacion: actorValue("actorRelacion"),
          rol: actorValue("actorRol"),
          intereses: actorValue("actorIntereses"),
          problemas_percibidos: normalizeLines(
            document.getElementById("actorProblemas").value
          ),
          recursos_mandatos: actorValue("actorRecursos"),
          posicion: actorValue("actorPosicion"),
          fuerza: actorValue("actorFuerza"),
          intensidad: actorValue("actorIntensidad"),
          razon: actorValue("actorRazon"),
          estrategia: actorValue("actorEstrategia")
        };
      }

      function validateActor(actor) {
        const missing = [];

        if (!actor.grupo) missing.push("cargo u organización");
        if (!actor.naturaleza) missing.push("naturaleza");
        if (!actor.relacion) missing.push("relación con el problema");
        if (!actor.rol) missing.push("rol frente al problema");
        if (!actor.intereses) missing.push("intereses");
        if (!actor.problemas_percibidos.length) {
          missing.push("problemas percibidos");
        }
        if (!actor.recursos_mandatos) {
          missing.push("recursos y mandatos");
        }
        if (actor.posicion === "") {
          missing.push("posición");
        }
        if (!actor.fuerza) {
          missing.push("fuerza / poder");
        }
        if (!actor.intensidad) {
          missing.push("intensidad / interés");
        }
        if (!actor.razon) {
          missing.push("razón de la valoración");
        }
        if (!actor.estrategia) {
          missing.push("estrategia de relacionamiento");
        }

        if (missing.length) {
          alert(
            "Complete los siguientes campos antes de continuar:\n\n• " +
            missing.join("\n• ")
          );
          return false;
        }

        return true;
      }

      function fillActorForm(actor) {
        document.getElementById("actorGrupo").value =
          actor.grupo || "";

        document.getElementById("actorNaturaleza").value =
          actor.naturaleza || "";

        document.getElementById("actorRelacion").value =
          actor.relacion || "";

        document.getElementById("actorRol").value =
          actor.rol || "";

        document.getElementById("actorIntereses").value =
          actor.intereses || "";

        document.getElementById("actorProblemas").value =
          (actor.problemas_percibidos || []).join("\n");

        document.getElementById("actorRecursos").value =
          actor.recursos_mandatos || "";

        document.getElementById("actorPosicion").value =
          actor.posicion || "";

        document.getElementById("actorFuerza").value =
          actor.fuerza || "";

        document.getElementById("actorIntensidad").value =
          actor.intensidad || "";

        document.getElementById("actorRazon").value =
          actor.razon || "";

        document.getElementById("actorEstrategia").value =
          actor.estrategia || "";

        document.getElementById("actorFormTitle").textContent =
          "Editar involucrado";

        document.getElementById("actorSaveBtn").textContent =
          "Guardar cambios";

        document.getElementById("actorCancelBtn").style.display =
          "inline-block";

        window.scrollTo({
          top: document.getElementById("screen1").offsetTop,
          behavior: "smooth"
        });
      }

      function saveActor() {
        const actor = readActorForm();

        if (!validateActor(actor)) {
          return;
        }

        if (state.editingActorIndex === null) {
          state.involucrados.push(actor);
        } else {
          state.involucrados[state.editingActorIndex] = actor;
        }

        clearActorForm();
        renderActors();
      }

      function editActor(index) {
        const actor = state.involucrados[index];

        if (!actor) {
          return;
        }

        state.editingActorIndex = index;
        fillActorForm(actor);
      }

      function deleteActor(index) {
        const actor = state.involucrados[index];

        if (!actor) {
          return;
        }

        const confirmed = confirm(
          "¿Desea eliminar este involucrado?\n\n" +
          actor.grupo
        );

        if (!confirmed) {
          return;
        }

        state.involucrados.splice(index, 1);

        if (state.editingActorIndex === index) {
          clearActorForm();
        }

        renderActors();
      }

      function renderMainActorTable() {
        const body = document.getElementById("actorsMainTableBody");

        if (!body) {
          return;
        }

        if (!state.involucrados.length) {
          body.innerHTML = `
      <tr>
        <td colspan="4" class="actor-empty">
          Aún no hay involucrados registrados.
        </td>
      </tr>
    `;
          return;
        }

        body.innerHTML = state.involucrados.map((actor, index) => {

          const problems = actor.problemas_percibidos || [];

          const groupEmpty = !actor.grupo;
          const interestEmpty = !actor.intereses;
          const problemsEmpty = !problems.length;
          const resourcesEmpty = !actor.recursos_mandatos;

          return `
      <tr>

        <td class="${groupEmpty ? "empty-cell" : ""}">
          ${groupEmpty
              ? "Celda vacía"
              : escapeHTML(actor.grupo)}
        </td>

        <td class="${interestEmpty ? "empty-cell" : ""}">
          ${interestEmpty
              ? "Celda vacía"
              : escapeHTML(actor.intereses)}
        </td>

        <td class="${problemsEmpty ? "empty-cell" : ""}">
          ${problemsEmpty
              ? "Celda vacía"
              : `<ul class="actor-problem-list">
                  ${problems.map(problem =>
                `<li>${escapeHTML(problem)}</li>`
              ).join("")}
                </ul>`
            }
        </td>

        <td class="${resourcesEmpty ? "empty-cell" : ""}">
          ${resourcesEmpty
              ? "Celda vacía"
              : escapeHTML(actor.recursos_mandatos)}
        </td>

      </tr>
    `;
        }).join("");
      }

      function renderCharacterization() {
        const body = document.getElementById(
          "actorsCharacterizationBody"
        );

        if (!body) {
          return;
        }

        if (!state.involucrados.length) {
          body.innerHTML = `
      <tr>
        <td colspan="9" class="actor-empty">
          Aún no hay involucrados registrados.
        </td>
      </tr>
    `;
          return;
        }

        /*
         * La resultante se calcula solamente para ordenar y mostrar.
         * Nunca se agrega al objeto actor.
         */
        const ordered = state.involucrados
          .map((actor, index) => ({
            actor,
            index,
            result: calculateActorResult(actor)
          }))
          .sort((a, b) =>
            Math.abs(b.result) - Math.abs(a.result)
          );

        body.innerHTML = ordered.map(item => {
          const actor = item.actor;
          const result = item.result;

          const resultClass =
            result > 0
              ? "result-positive"
              : result < 0
                ? "result-negative"
                : "position-neutral";

          const positionClass =
            actorPositionClass(actor.posicion);

          return `
      <tr>

        <td>
          <strong>${escapeHTML(actor.grupo)}</strong>
        </td>

        <td>
          ${actorPositionLabel(actor.posicion)}
        </td>

        <td>
          ${escapeHTML(actor.fuerza)}/5
        </td>

        <td>
          ${escapeHTML(actor.intensidad)}/5
        </td>

        <td class="${resultClass}">
          ${result > 0 ? "+" : ""}${result}
        </td>

        <td>
          <span class="quadrant-badge">
            ${escapeHTML(actorQuadrant(actor))}
          </span>
        </td>

        <td>
          ${escapeHTML(actor.razon)}
        </td>

        <td>
          ${escapeHTML(actor.estrategia)}
        </td>

        <td>
          <div class="actor-table-actions">
            <button
              type="button"
              class="btn-mini"
              onclick="editActor(${item.index})">
              Editar
            </button>

            <button
              type="button"
              class="btn-mini"
              onclick="deleteActor(${item.index})">
              Eliminar
            </button>
          </div>
        </td>

      </tr>
    `;
        }).join("");
      }

      function svgEl(tag, attributes = {}) {
        const el = document.createElementNS(
          "http://www.w3.org/2000/svg",
          tag
        );

        Object.entries(attributes).forEach(([key, value]) => {
          el.setAttribute(key, value);
        });

        return el;
      }

      function addSvgText(svg, text, x, y, className = "") {
        const node = svgEl("text", {
          x,
          y,
          class: className
        });

        node.textContent = text;
        svg.appendChild(node);

        return node;
      }

      function actorPointColor(position) {
        if (position === "1") {
          return "#16a34a";
        }

        if (position === "-1") {
          return "#dc2626";
        }

        return "#c58a16";
      }

      function drawInterestPowerChart() {

        const svg = document.getElementById(
          "interestPowerChart"
        );

        if (!svg) {
          return;
        }

        svg.innerHTML = "";

        const width = 760;
        const height = 540;

        const plot = {
          left: 72,
          right: 705,
          top: 48,
          bottom: 450
        };

        const plotWidth =
          plot.right - plot.left;

        const plotHeight =
          plot.bottom - plot.top;

        function xScale(value) {
          return plot.left +
            ((Number(value) - 1) / 4) *
            plotWidth;
        }

        function yScale(value) {
          return plot.bottom -
            ((Number(value) - 1) / 4) *
            plotHeight;
        }

        /* Fondo */
        svg.appendChild(
          svgEl("rect", {
            x: plot.left,
            y: plot.top,
            width: plotWidth,
            height: plotHeight,
            fill: "#ffffff",
            stroke: "#d1d5db"
          })
        );

        /* Líneas de cuadrícula */
        for (let value = 1; value <= 5; value++) {

          const x = xScale(value);
          const y = yScale(value);

          svg.appendChild(
            svgEl("line", {
              x1: x,
              y1: plot.top,
              x2: x,
              y2: plot.bottom,
              class: "svg-grid"
            })
          );

          svg.appendChild(
            svgEl("line", {
              x1: plot.left,
              y1: y,
              x2: plot.right,
              y2: y,
              class: "svg-grid"
            })
          );

          addSvgText(
            svg,
            String(value),
            x,
            plot.bottom + 22,
            "svg-tick"
          );

          addSvgText(
            svg,
            String(value),
            plot.left - 22,
            y + 4,
            "svg-tick"
          );
        }

        /* Líneas divisorias de cuadrantes */
        const midX = xScale(3);
        const midY = yScale(3);

        svg.appendChild(
          svgEl("line", {
            x1: midX,
            y1: plot.top,
            x2: midX,
            y2: plot.bottom,
            class: "svg-quadrant-line"
          })
        );

        svg.appendChild(
          svgEl("line", {
            x1: plot.left,
            y1: midY,
            x2: plot.right,
            y2: midY,
            class: "svg-quadrant-line"
          })
        );

        /* Ejes */
        svg.appendChild(
          svgEl("line", {
            x1: plot.left,
            y1: plot.bottom,
            x2: plot.right + 12,
            y2: plot.bottom,
            class: "svg-axis"
          })
        );

        svg.appendChild(
          svgEl("line", {
            x1: plot.left,
            y1: plot.bottom,
            x2: plot.left,
            y2: plot.top - 12,
            class: "svg-axis"
          })
        );

        /* Flechas */
        svg.appendChild(
          svgEl("polygon", {
            points:
              `${plot.right + 12},${plot.bottom} ` +
              `${plot.right + 3},${plot.bottom - 5} ` +
              `${plot.right + 3},${plot.bottom + 5}`,
            fill: "#374151"
          })
        );

        svg.appendChild(
          svgEl("polygon", {
            points:
              `${plot.left},${plot.top - 12} ` +
              `${plot.left - 5},${plot.top - 3} ` +
              `${plot.left + 5},${plot.top - 3}`,
            fill: "#374151"
          })
        );

        /* Títulos de ejes */
        addSvgText(
          svg,
          "INTERÉS / AFECTACIÓN",
          (plot.left + plot.right) / 2,
          500,
          "svg-axis-label"
        );

        const yLabel = addSvgText(
          svg,
          "PODER / INFLUENCIA",
          20,
          (plot.top + plot.bottom) / 2,
          "svg-axis-label"
        );

        yLabel.setAttribute(
          "transform",
          `rotate(-90 20 ${(plot.top + plot.bottom) / 2})`
        );

        /* Cuadrantes */
        addSvgText(
          svg,
          "ALTO PODER · BAJO INTERÉS",
          xScale(2),
          20,
          "svg-quadrant-title"
        );

        addSvgText(
          svg,
          "Mantener satisfecho",
          xScale(2),
          35,
          "svg-quadrant-strategy"
        );

        addSvgText(
          svg,
          "ALTO PODER · ALTO INTERÉS",
          xScale(4),
          20,
          "svg-quadrant-title"
        );

        addSvgText(
          svg,
          "Involucrar estrechamente",
          xScale(4),
          35,
          "svg-quadrant-strategy"
        );

        addSvgText(
          svg,
          "BAJO PODER · BAJO INTERÉS",
          xScale(2),
          425,
          "svg-quadrant-title"
        );

        addSvgText(
          svg,
          "Monitorear",
          xScale(2),
          440,
          "svg-quadrant-strategy"
        );

        addSvgText(
          svg,
          "BAJO PODER · ALTO INTERÉS",
          xScale(4),
          425,
          "svg-quadrant-title"
        );

        addSvgText(
          svg,
          "Involucrar y empoderar",
          xScale(4),
          440,
          "svg-quadrant-strategy"
        );

        if (!state.involucrados.length) {

          addSvgText(
            svg,
            "Registre involucrados para visualizar la matriz",
            width / 2,
            260,
            "svg-empty-text"
          );

          return;
        }

        /*
         * Agrupamos posiciones coincidentes.
         * Esto permite alternar las etiquetas arriba/abajo.
         */
        const occupied = {};

        state.involucrados.forEach((actor, index) => {

          const x = xScale(actor.intensidad);
          const y = yScale(actor.fuerza);

          const key =
            `${actor.intensidad}-${actor.fuerza}`;

          if (!occupied[key]) {
            occupied[key] = 0;
          }

          const duplicateIndex =
            occupied[key]++;

          const result =
            calculateActorResult(actor);

          /*
           * El tamaño depende de |resultante|.
           * Se mantiene dentro de un rango legible.
           */
          const radius =
            8 + Math.min(
              20,
              Math.sqrt(Math.abs(result)) * 1.8
            );

          const point = svgEl("circle", {
            cx: x,
            cy: y,
            r: radius,
            fill: actorPointColor(actor.posicion),
            "fill-opacity": "0.82",
            stroke: "#ffffff",
            "stroke-width": "2"
          });

          svg.appendChild(point);

          /*
           * Etiquetas alternadas arriba / abajo.
           * En caso de coincidencia, cada etiqueta recibe
           * una separación adicional.
           */
          const labelAbove =
            duplicateIndex % 2 === 0;

          const verticalOffset =
            labelAbove
              ? -(radius + 14 + Math.floor(duplicateIndex / 2) * 18)
              : (radius + 16 + Math.floor(duplicateIndex / 2) * 18);

          const lines =
            splitSvgLabel(actor.grupo, 18);

          lines.forEach((line, lineIndex) => {

            const labelY =
              y +
              verticalOffset +
              lineIndex * 12;

            addSvgText(
              svg,
              line,
              x,
              labelY,
              "svg-stakeholder-label"
            );
          });
        });

        /* Leyenda de posición */
        const legendY = 525;

        [
          { position: "1", label: "Apoya (+1)" },
          { position: "0", label: "Indiferente (0)" },
          { position: "-1", label: "Se opone (−1)" }
        ].forEach((item, index) => {

          const x = 95 + index * 170;

          svg.appendChild(
            svgEl("circle", {
              cx: x,
              cy: legendY - 4,
              r: 7,
              fill: actorPointColor(item.position)
            })
          );

          addSvgText(
            svg,
            item.label,
            x + 12,
            legendY,
            "svg-legend-text"
          );
        });
      }

      /* =========================================================
         DIAGRAMA DE INVOLUCRADOS · SVG
         ========================================================= */

      function natureColor(nature) {

        const colors = {
          "Comunitaria": "#22c55e",
          "Institucional": "#16a34a",
          "Productiva": "#84cc16",
          "Educativa": "#3b82f6",
          "Social": "#8b5cf6",
          "Privada": "#f59e0b",
          "Financiera": "#ef4444",
          "Gremial": "#14b8a6",
          "Otra": "#9ca3af"
        };

        return colors[nature] || colors["Otra"];
      }

      function drawStakeholderNetwork() {

        const svg = document.getElementById(
          "stakeholderNetworkChart"
        );

        if (!svg) {
          return;
        }

        svg.innerHTML = "";

        const width = 760;
        const height = 540;

        const center = {
          x: 290,
          y: 275
        };

        const radius = 175;

        /* Círculo guía */
        svg.appendChild(
          svgEl("circle", {
            cx: center.x,
            cy: center.y,
            r: radius,
            fill: "none",
            stroke: "#d1d5db",
            "stroke-width": "1",
            "stroke-dasharray": "4 5"
          })
        );

        /* Nodo central */
        svg.appendChild(
          svgEl("circle", {
            cx: center.x,
            cy: center.y,
            r: 58,
            class: "svg-project-node"
          })
        );

        addSvgText(
          svg,
          "PROYECTO",
          center.x,
          center.y,
          "svg-project-label"
        );

        if (!state.involucrados.length) {

          addSvgText(
            svg,
            "Registre involucrados para visualizar el diagrama",
            center.x,
            center.y + 100,
            "svg-empty-text"
          );

          return;
        }

        /*
         * Los involucrados se distribuyen alrededor del proyecto
         * en círculo.
         */
        const total =
          state.involucrados.length;

        state.involucrados.forEach((actor, index) => {

          const angle =
            (-Math.PI / 2) +
            (index / total) * Math.PI * 2;

          const x =
            center.x +
            Math.cos(angle) * radius;

          const y =
            center.y +
            Math.sin(angle) * radius;

          /*
           * Tamaño del nodo según relevancia.
           * La relevancia vuelve a calcularse desde
           * la resultante; no se almacena.
           */
          const result =
            calculateActorResult(actor);

          const nodeRadius =
            28 +
            Math.min(
              12,
              Math.sqrt(Math.abs(result)) * 1.1
            );

          /* Línea al proyecto */
          svg.appendChild(
            svgEl("line", {
              x1: center.x,
              y1: center.y,
              x2: x,
              y2: y,
              class: "svg-network-line"
            })
          );

          /* Nodo */
          svg.appendChild(
            svgEl("circle", {
              cx: x,
              cy: y,
              r: nodeRadius,
              fill: natureColor(actor.naturaleza),
              "fill-opacity": "0.78",
              stroke: natureColor(actor.naturaleza),
              "stroke-width": "1.5"
            })
          );

          /* Etiqueta */
          const lines =
            splitSvgLabel(actor.grupo, 16);

          const firstY =
            y -
            ((lines.length - 1) * 6);

          lines.forEach((line, lineIndex) => {

            addSvgText(
              svg,
              line,
              x,
              firstY + lineIndex * 12,
              "svg-stakeholder-label"
            );
          });
        });

        /* Leyenda por naturaleza */
        const legendX = 535;
        const legendY = 100;

        addSvgText(
          svg,
          "LEYENDA · NATURALEZA",
          legendX,
          legendY - 24,
          "svg-axis-label"
        );

        const natureList = [
          "Comunitaria",
          "Institucional",
          "Productiva",
          "Educativa",
          "Social",
          "Privada",
          "Financiera",
          "Gremial",
          "Otra"
        ];

        natureList.forEach((nature, index) => {

          const y =
            legendY +
            index * 34;

          svg.appendChild(
            svgEl("circle", {
              cx: legendX,
              cy: y,
              r: 8,
              fill: natureColor(nature)
            })
          );

          addSvgText(
            svg,
            nature,
            legendX + 17,
            y + 4,
            "svg-legend-text"
          );
        });
      }

      function splitSvgLabel(text, maxChars) {

        const words =
          String(text || "").split(/\s+/);

        const lines = [];
        let current = "";

        words.forEach(word => {

          if (
            current &&
            (current + " " + word).length > maxChars
          ) {
            lines.push(current);
            current = word;
          } else {
            current =
              current
                ? current + " " + word
                : word;
          }
        });

        if (current) {
          lines.push(current);
        }

        return lines.slice(0, 3);
      }

      function renderActors() {
        renderMainActorTable();

        renderCharacterization();

        drawInterestPowerChart();

        drawStakeholderNetwork();

        renderActorValidations();
      }

      window.renderActors = renderActors;

      /* =========================================================
        VALIDACIONES METODOLÓGICAS · PASO 1
        ========================================================= */

      function normalizeTextForValidation(text) {
        return String(text || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[.,;:!?¿¡()"']/g, "")
          .replace(/\s+/g, " ")
          .trim();
      }

      function containsAny(text, patterns) {
        const normalized =
          normalizeTextForValidation(text);

        return patterns.some(pattern =>
          normalized.includes(pattern)
        );
      }

      function actorValidationMessages() {

        const actors =
          state.involucrados || [];

        const messages = [];

        /* 1 · Menos de ocho involucrados */
        if (actors.length < 8) {
          messages.push(
            "Hay menos de ocho involucrados. Revise si faltan financiadores, reguladores, organizaciones relacionadas, afectados y grupos que podrían perder algo con la solución."
          );
        }

        /* 2 · Ninguna posición negativa */
        const hasNegative =
          actors.some(actor =>
            String(actor.posicion) === "-1"
          );

        if (actors.length > 0 && !hasNegative) {
          messages.push(
            "Ningún involucrado tiene posición negativa. Un análisis sin opositores suele requerir revisar si se omitieron grupos que podrían resistirse o perder algo con el proyecto."
          );
        }

        /* 3 · Valoración sin razón */
        actors.forEach(actor => {
          if (!String(actor.razon || "").trim()) {
            messages.push(
              `La valoración de «${actor.grupo || "grupo sin nombre"}» no tiene razón registrada. Un número sin justificación no es defendible.`
            );
          }
        });

        /* 4 · Sin problemas percibidos */
        actors.forEach(actor => {
          if (
            !Array.isArray(actor.problemas_percibidos) ||
            actor.problemas_percibidos.length === 0
          ) {
            messages.push(
              `«${actor.grupo || "Grupo sin nombre"}» no registra problemas percibidos.`
            );
          }
        });

        /* 5 · Sin recursos o mandatos */
        actors.forEach(actor => {
          if (!String(actor.recursos_mandatos || "").trim()) {
            messages.push(
              `«${actor.grupo || "Grupo sin nombre"}» no registra recursos y mandatos.`
            );
          }
        });

        /*
         * 6 · Problemas percibidos formulados en positivo
         *
         * Heurística deliberadamente conservadora:
         * busca expresiones que suelen indicar estados deseables,
         * no pretende decidir por el formulador.
         */
        const positivePatterns = [
          "mejora",
          "mejoras",
          "aumento",
          "aumentar",
          "incremento",
          "incrementar",
          "fortalecimiento",
          "fortalecer",
          "mayor acceso",
          "mayor cobertura",
          "alta calidad",
          "mejor calidad",
          "desarrollo",
          "crecimiento",
          "oportunidades",
          "bienestar",
          "satisfaccion",
          "satisfaccion"
        ];

        actors.forEach(actor => {

          (actor.problemas_percibidos || [])
            .forEach(problem => {

              if (
                containsAny(problem, positivePatterns)
              ) {
                messages.push(
                  `«${actor.grupo}» tiene un problema percibido que podría estar formulado en positivo: «${problem}». Revise que exprese claramente un estado negativo.`
                );
              }
            });
        });

        /*
         * 7 · Problemas como ausencia de solución.
         */
        const absencePatterns = [
          "no hay ",
          "falta ",
          "faltan ",
          "ausencia de ",
          "sin acceso",
          "sin apoyo",
          "sin capacitacion",
          "sin capacitación",
          "sin asistencia",
          "sin recursos",
          "sin infraestructura"
        ];

        actors.forEach(actor => {

          (actor.problemas_percibidos || [])
            .forEach(problem => {

              if (
                containsAny(problem, absencePatterns)
              ) {
                messages.push(
                  `«${actor.grupo}» registra un problema percibido como ausencia o falta: «${problem}». Revise si describe realmente el problema o si está nombrando implícitamente una solución ausente.`
                );
              }
            });
        });

        /*
         * 8 · Mismo problema percibido por todos.
         */
        if (actors.length >= 2) {

          const problemGroups =
            new Map();

          actors.forEach(actor => {

            const uniqueProblems =
              new Set(
                (actor.problemas_percibidos || [])
                  .map(normalizeTextForValidation)
                  .filter(Boolean)
              );

            uniqueProblems.forEach(problem => {

              if (!problemGroups.has(problem)) {
                problemGroups.set(problem, 0);
              }

              problemGroups.set(
                problem,
                problemGroups.get(problem) + 1
              );
            });
          });

          problemGroups.forEach((count, problem) => {

            if (count === actors.length) {

              messages.push(
                `Todos los grupos perciben el mismo problema: «${problem}». Revise si realmente existe una única percepción o si falta desagregar diferencias entre involucrados.`
              );
            }
          });
        }

        /*
         * 9 · Poder alto e interés bajo.
         */
        actors.forEach(actor => {

          const force =
            Number(actor.fuerza);

          const interest =
            Number(actor.intensidad);

          if (
            force >= 4 &&
            interest <= 2
          ) {
            messages.push(
              `«${actor.grupo}» presenta poder ≥ 4 e interés ≤ 2. Revise si esta condición debe reaparecer como posible supuesto en el Paso 9.`
            );
          }
        });

        /*
         * 10 · "La comunidad" / "la ciudadanía"
         */
        actors.forEach(actor => {

          const group =
            normalizeTextForValidation(actor.grupo);

          if (
            group === "la comunidad" ||
            group === "comunidad" ||
            group === "la ciudadania" ||
            group === "ciudadania"
          ) {
            messages.push(
              `«${actor.grupo}» es un grupo demasiado amplio. Desagregue sus intereses y posiciones cuando existan diferencias internas.`
            );
          }
        });

        return messages;
      }

      function renderActorValidations() {

        const container =
          document.getElementById("actorValidations");

        const count =
          document.getElementById("validationCount");

        if (!container || !count) {
          return;
        }

        const messages =
          actorValidationMessages();

        if (!messages.length) {

          count.textContent =
            "Sin hallazgos";

          container.innerHTML = `
      <div class="validation-item validation-success">
        <span class="validation-icon">✓</span>
        <div>
          <strong>No se identifican hallazgos automáticos.</strong>
          <br>
          El análisis supera las comprobaciones configuradas.
          Esto no sustituye la revisión metodológica ni la validación
          con los involucrados.
        </div>
      </div>
    `;

          return;
        }

        count.textContent =
          `${messages.length} hallazgo${messages.length === 1 ? "" : "s"}`;

        container.innerHTML =
          messages.map(message => `
      <div class="validation-item validation-warning">
        <span class="validation-icon">!</span>
        <div>${escapeHTML(message)}</div>
      </div>
    `).join("");
      }

      /* =========================================================
   ACTIVIDAD 4 · AYUDA CONTEXTUAL
   ========================================================= */

      const participationTechniques = {

        grupos_nominales: {
          nombre: "Grupos nominales",

          procedimiento:
            "Generación silenciosa inicial de ideas, puesta en común estructurada y priorización colectiva.",

          participantes:
            "6 a 12 participantes, presenciales.",

          duracion:
            "2 a 3 horas.",

          evitar:
            "Evitar cuando existen conflictos abiertos y una diferencia de poder muy marcada en la sala."
        },

        delphi: {
          nombre: "Delphi",

          procedimiento:
            "Consulta anónima e iterativa a un panel mediante varias rondas, buscando convergencia informada entre las respuestas.",

          participantes:
            "10 a 30 panelistas, normalmente remotos.",

          duracion:
            "3 a 8 semanas, con 2 a 4 rondas.",

          evitar:
            "Evitar cuando se requiere deliberación cara a cara o legitimidad pública directa."
        },

        easw: {
          nombre: "EASW",

          procedimiento:
            "Taller de escenarios que reúne sectores de actores para construir una visión compartida y formular propuestas.",

          participantes:
            "25 a 40 participantes, organizados en cuatro grupos sectoriales.",

          duracion:
            "1 a 2 jornadas completas.",

          evitar:
            "Evitar cuando no existen recursos ni compromiso institucional para dar seguimiento a los acuerdos."
        },

        nucleos_intervencion: {
          nombre: "Núcleos de intervención participativa",

          procedimiento:
            "Técnica participativa contemplada dentro de la Actividad 4. El diseño concreto del núcleo debe definirse según el propósito, los involucrados y el contexto de intervención.",

          participantes:
            "Debe definirse según el diseño de la intervención y los involucrados convocados.",

          duracion:
            "Debe definirse según el alcance y diseño de la actividad.",

          evitar:
            "No existe en los materiales del curso consultados un parámetro específico de participantes o duración que permita establecer una regla fija. Defina la limitación para el caso antes de seleccionarla."
        }
      };

      function renderTechniqueHelp() {

        const select =
          document.getElementById(
            "participationTechnique"
          );

        const container =
          document.getElementById(
            "techniqueHelp"
          );

        if (!select || !container) {
          return;
        }

        const key =
          select.value;

        if (!key) {

          container.innerHTML = `
      <h4>Ayuda contextual</h4>
      <p style="font-size:12px;color:var(--gris-500);">
        Seleccione una técnica para consultar su procedimiento,
        participantes, duración y cuándo evitarla.
      </p>
    `;

          return;
        }

        const technique =
          participationTechniques[key];

        container.innerHTML = `
    <h4>${escapeHTML(technique.nombre)}</h4>

    <div class="technique-meta">

      <div class="technique-meta-item">
        <strong>Participantes</strong>
        <span>${escapeHTML(technique.participantes)}</span>
      </div>

      <div class="technique-meta-item">
        <strong>Duración</strong>
        <span>${escapeHTML(technique.duracion)}</span>
      </div>

    </div>

    <div class="technique-section">
      <strong>Procedimiento</strong>
      <p>${escapeHTML(technique.procedimiento)}</p>
    </div>

    <div class="technique-section">
      <strong>Cuándo evitarla</strong>
      <p>${escapeHTML(technique.evitar)}</p>
    </div>

    <div class="participation-note">
      La información contextual orienta la decisión; no la toma por usted.
    </div>
  `;
      }


      function renderTechniqueHelp() {

        const select =
          document.getElementById(
            "participationTechnique"
          );

        const container =
          document.getElementById(
            "techniqueHelp"
          );

        if (!select || !container) {
          return;
        }

        const key =
          select.value;

        if (!key) {

          container.innerHTML = `
      <h4>Ayuda contextual</h4>
      <p style="font-size:12px;color:var(--gris-500);">
        Seleccione una técnica para consultar su procedimiento,
        participantes, duración y cuándo evitarla.
      </p>
    `;

          return;
        }

        const technique =
          participationTechniques[key];

        container.innerHTML = `
    <h4>${escapeHTML(technique.nombre)}</h4>

    <div class="technique-meta">

      <div class="technique-meta-item">
        <strong>Participantes</strong>
        <span>${escapeHTML(technique.participantes)}</span>
      </div>

      <div class="technique-meta-item">
        <strong>Duración</strong>
        <span>${escapeHTML(technique.duracion)}</span>
      </div>

    </div>

    <div class="technique-section">
      <strong>Procedimiento</strong>
      <p>${escapeHTML(technique.procedimiento)}</p>
    </div>

    <div class="technique-section">
      <strong>Cuándo evitarla</strong>
      <p>${escapeHTML(technique.evitar)}</p>
    </div>

    <div class="participation-note">
      La información contextual orienta la decisión; no la toma por usted.
    </div>
  `;
      }

      /* =========================================================
         INSTRUCCIONES IA · COPIAR
         ========================================================= */

      async function copyAIPrompt(elementId, button) {

        const element =
          document.getElementById(elementId);

        if (!element) {
          return;
        }

        const text =
          element.textContent;

        try {

          await navigator.clipboard.writeText(text);

          const original =
            button.textContent;

          button.textContent =
            "Copiado";

          setTimeout(() => {
            button.textContent =
              original;
          }, 1500);

        } catch (error) {

          /*
           * Fallback para navegadores que bloqueen
           * navigator.clipboard al abrir el HTML localmente.
           */
          const helper =
            document.createElement("textarea");

          helper.value = text;
          helper.style.position = "fixed";
          helper.style.opacity = "0";

          document.body.appendChild(helper);

          helper.focus();
          helper.select();

          try {
            document.execCommand("copy");

            button.textContent =
              "Copiado";

            setTimeout(() => {
              button.textContent =
                "Copiar";
            }, 1500);

          } finally {
            document.body.removeChild(helper);
          }
        }
      }

      function initActorModule() {

        const saveButton =
          document.getElementById("actorSaveBtn");

        const cancelButton =
          document.getElementById("actorCancelBtn");

        if (!saveButton || !cancelButton) {
          return;
        }

        saveButton.addEventListener("click", saveActor);

        cancelButton.addEventListener(
          "click",
          clearActorForm
        );

        const techniqueSelect =
          document.getElementById(
            "participationTechnique"
          );

        if (techniqueSelect) {

          techniqueSelect.addEventListener(
            "change",
            renderTechniqueHelp
          );
        }

        renderTechniqueHelp();

        renderActors();
      }

      function bindCaseField(id, key) {
        const input = document.getElementById(id);
        input.addEventListener("input", function () {
          state.caso[key] = input.value;
          if (key === "titulo") updateHeader();
        });
      }

      buildNav();

      bindCaseField("casoTitulo", "titulo");
      bindCaseField("casoSector", "sector");
      bindCaseField("casoTerritorio", "territorio");
      bindCaseField("casoPoblacion", "poblacion");
      bindCaseField("casoPeriodo", "periodo");
      bindCaseField("casoSituacion", "situacion");
      bindCaseField("casoPregunta", "pregunta");
      bindCaseField("casoDelimitacion", "delimitacion");

      initActorModule();

      showScreen(0);
    })();

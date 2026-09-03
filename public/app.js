    function iniciarWizard() {
      showScreen(1);
    }
    function continuarAlPaso2() {
      prepararPaso2();
      renderProblemContext();
      renderProblemModule();
      renderNodeEvidence();
      showScreen(2);
    }


    function prepararPaso2() {

      const caso = state.caso || {};

      const involucrados =
        Array.isArray(state.involucrados)
          ? state.involucrados
          : [];

      /*
       * Asegurar estructura del problema
       */
      if (!state.problema ||
        typeof state.problema !== "object") {

        state.problema = {
          cond: "",
          atributo: "",
          poblacion: "",
          delim: ""
        };
      }

      /*
       * Asegurar estructura de nodos
       */
      if (!Array.isArray(state.nodos)) {
        state.nodos = [];
      }

      /*
       * =====================================================
       * INSUMOS DEL PASO 0
       * =====================================================
       */

      const insumoCaso = {
        nombre: caso.nombre || "",
        territorio: caso.territorio || "",
        poblacion: caso.poblacion || "",
        periodo: caso.periodo || "",
        situacion: caso.situacion || ""
      };

      /*
       * =====================================================
       * INSUMOS DEL PASO 1
       * =====================================================
       */

      const insumoInvolucrados =
        involucrados.map(function (actor) {

          return {
            grupo: actor.grupo || "",
            naturaleza: actor.naturaleza || "",
            relacion: actor.relacion || "",
            rol: actor.rol || "",
            intereses: actor.intereses || "",

            problemasPercibidos:
              Array.isArray(actor.problemasPercibidos)
                ? actor.problemasPercibidos.slice()
                : [],

            recursosMandatos:
              Array.isArray(actor.recursos_mandatos)
                ? actor.recursos_mandatos.slice()
                : [],

            posicion:
              actor.posicion ?? "",

            fuerza:
              actor.fuerza ?? "",

            intensidad:
              actor.intensidad ?? ""
          };

        });

      /*
       * =====================================================
       * INSUMOS PARA EL ANÁLISIS DEL PROBLEMA
       * =====================================================
       */

      state.problema.insumos = {
        caso: insumoCaso,
        involucrados: insumoInvolucrados
      };

      /*
       * =====================================================
       * PROBLEMA CENTRAL
       * =====================================================
       */



      /*
       * =====================================================
       * PROPUESTAS DE NODOS A PARTIR DE INVOLUCRADOS
       * =====================================================
       *
       * Los problemas percibidos son INSUMOS.
       * No se convierten automáticamente en causas.
       *
       * Por ahora se conservan como propuestas para
       * posterior clasificación y validación.
       */

      const problemasPercibidos = [];

      insumoInvolucrados.forEach(function (actor) {

        actor.problemasPercibidos.forEach(function (problema) {

          const texto =
            String(problema || "").trim();

          if (!texto) {
            return;
          }

          const existe =
            problemasPercibidos.some(function (item) {

              return item.texto.toLowerCase() ===
                texto.toLowerCase();

            });

          if (!existe) {

            problemasPercibidos.push({

              texto: texto,

              grupos: [
                actor.grupo
              ].filter(Boolean)

            });

          } else {

            const existente =
              problemasPercibidos.find(function (item) {

                return item.texto.toLowerCase() ===
                  texto.toLowerCase();

              });

            if (
              actor.grupo &&
              !existente.grupos.includes(actor.grupo)
            ) {

              existente.grupos.push(actor.grupo);

            }

          }

        });

      });

      /*
       * Guardamos los problemas percibidos como
       * insumo explícito para la construcción de
       * causas y efectos.
       */

      state.problema.insumos.problemasPercibidos =
        problemasPercibidos;

    }

    function runProblemValidation() {

      const nodes =
        Array.isArray(state.nodos)
          ? state.nodos
          : [];

      const root =
        nodes.find(function (node) {
          return node && node.codigo === "P";
        });


      /* =========================================================
         1. DIRECCIÓN CAUSAL
         ========================================================= */

      const directionProblems = [];

      nodes
        .filter(function (node) {
          return node && node.codigo !== "P";
        })
        .forEach(function (node) {

          const parent =
            nodes.find(function (candidate) {
              return candidate &&
                candidate.codigo === node.padre;
            });

          if (!parent) {

            directionProblems.push(
              node.codigo +
              " no tiene un padre válido."
            );

            return;
          }

          if (node.tipo === "causa") {

            if (
              parent.codigo !== "P" &&
              parent.tipo !== "causa"
            ) {

              directionProblems.push(
                node.codigo +
                " está conectado a un nodo que no corresponde a una causa."
              );

            }

          }


          if (node.tipo === "efecto") {

            if (
              parent.codigo !== "P" &&
              parent.tipo !== "efecto"
            ) {

              directionProblems.push(
                node.codigo +
                " está conectado a un nodo que no corresponde a un efecto."
              );

            }

          }

        });


      /* =========================================================
         2. NIVEL
         ========================================================= */

      const levelProblems = [];

      nodes
        .filter(function (node) {
          return node && node.codigo !== "P";
        })
        .forEach(function (node) {

          const parent =
            nodes.find(function (candidate) {
              return candidate &&
                candidate.codigo === node.padre;
            });

          if (!parent) {
            return;
          }

          const expectedLevel =
            parent.codigo === "P"
              ? 1
              : Number(parent.nivel) + 1;

          if (Number(node.nivel) !== expectedLevel) {

            levelProblems.push(
              node.codigo +
              " está en nivel " +
              node.nivel +
              " pero su padre " +
              parent.codigo +
              " corresponde al nivel " +
              expectedLevel +
              "."
            );

          }

        });


      /* =========================================================
         3. SUFICIENCIA
         ========================================================= */

      /*
       * Esta prueba no puede resolverse completamente por código.
       * El sistema identifica ramas terminales y solicita juicio
       * del formulador.
       */

      const causeRoots =
        nodes.filter(function (node) {

          if (!node || node.tipo !== "causa") {
            return false;
          }

          return !nodes.some(function (child) {

            return child &&
              child.padre === node.codigo;

          });

        });


      const effectLeaves =
        nodes.filter(function (node) {

          if (!node || node.tipo !== "efecto") {
            return false;
          }

          return !nodes.some(function (child) {

            return child &&
              child.padre === node.codigo;

          });

        });


      const sufficiencyReady =
        causeRoots.length > 0 &&
        Boolean(root);


      /* =========================================================
         4. NO CIRCULARIDAD
         ========================================================= */

      const circularProblems = [];


      function createsCycle(node) {

        const visited =
          new Set();

        let current =
          node.padre;

        while (
          current &&
          current !== "P"
        ) {

          if (visited.has(current)) {
            return true;
          }

          if (current === node.codigo) {
            return true;
          }

          visited.add(current);

          const parent =
            nodes.find(function (candidate) {

              return candidate &&
                candidate.codigo === current;

            });

          if (!parent) {
            return false;
          }

          current =
            parent.padre;

        }

        return false;

      }


      nodes
        .filter(function (node) {
          return node && node.codigo !== "P";
        })
        .forEach(function (node) {

          if (createsCycle(node)) {

            circularProblems.push(
              node.codigo
            );

          }

        });


      /* =========================================================
         5. EVIDENCIA
         ========================================================= */

      const evidenceProblems = [];

      nodes
        .filter(function (node) {
          return node && node.codigo !== "P";
        })
        .forEach(function (node) {

          const hasEvidence =
            Boolean(
              String(
                node.evidencia || ""
              ).trim()
            );

          const hasBaseline =
            Boolean(
              String(
                node.lineaBase || ""
              ).trim()
            );

          if (!hasEvidence) {

            evidenceProblems.push(
              node.codigo +
              ": falta evidencia."
            );

          } else if (!hasBaseline) {

            evidenceProblems.push(
              node.codigo +
              ": tiene evidencia pero falta línea base."
            );

          }

        });


      /*
       * El problema central también debe quedar sustentado.
       */

      if (root) {

        if (
          !String(
            root.evidencia || ""
          ).trim()
        ) {

          evidenceProblems.push(
            "P: falta evidencia del problema central."
          );

        }

      } else {

        evidenceProblems.push(
          "No existe el problema central P."
        );

      }


      /* =========================================================
         RESULTADOS
         ========================================================= */

      const tests = [

        {
          key: "direccion",
          title: "1. Dirección causal",
          question:
            "Cada vínculo debe poder leerse como «X produce Y» y «Y ocurre porque X».",
          ok:
            directionProblems.length === 0,
          details:
            directionProblems
        },

        {
          key: "nivel",
          title: "2. Nivel",
          question:
            "Entre un nodo y su superior inmediato no debe faltar un eslabón causal evidente.",
          ok:
            levelProblems.length === 0,
          details:
            levelProblems
        },

        {
          key: "suficiencia",
          title: "3. Suficiencia",
          question:
            "Si las causas inferiores se resolvieran, ¿sería razonable esperar que desapareciera el nodo superior?",
          ok:
            false,
          pending:
            true,
          details:
            sufficiencyReady
              ? [
                "El sistema identificó " +
                causeRoots.length +
                " causa(s) terminal(es). " +
                "La suficiencia causal requiere juicio del formulador."
              ]
              : [
                "El árbol todavía no tiene una estructura suficiente para realizar esta lectura."
              ]
        },

        {
          key: "circularidad",
          title: "4. No circularidad",
          question:
            "Ningún nodo debe terminar dependiendo de sí mismo mediante su cadena de padres.",
          ok:
            circularProblems.length === 0,
          details:
            circularProblems
        },

        {
          key: "evidencia",
          title: "5. Evidencia",
          question:
            "Cada nodo debe contar con al menos una fuente o registro que permita contrastarlo.",
          ok:
            evidenceProblems.length === 0,
          details:
            evidenceProblems
        }

      ];


      renderProblemValidationResults(
        tests
      );

      return tests;

    }

    function renderProblemValidationResults(tests) {

      const box =
        document.getElementById(
          "problemValidationWorkspace"
        );

      const summary =
        document.getElementById(
          "problemValidationSummary"
        );

      if (!box) {
        return;
      }


      const failed =
        tests.filter(function (test) {

          return !test.ok &&
            !test.pending;

        });


      const pending =
        tests.filter(function (test) {

          return test.pending;

        });


      const passed =
        tests.filter(function (test) {

          return test.ok;

        });


      let summaryTitle;
      let summaryText;
      let summaryClass;


      if (failed.length > 0) {

        summaryTitle =
          "El árbol requiere correcciones";

        summaryText =
          failed.length +
          " prueba(s) presentan hallazgos.";

        summaryClass =
          "error";

      } else if (pending.length > 0) {

        summaryTitle =
          "Validación estructural favorable, juicio pendiente";

        summaryText =
          "Las pruebas automáticas no detectan fallas estructurales, " +
          "pero aún debe revisarse la suficiencia y la validación externa.";

        summaryClass =
          "warning";

      } else {

        summaryTitle =
          "Validación automática favorable";

        summaryText =
          "No se detectaron fallas automáticas en las cinco pruebas.";

        summaryClass =
          "success";

      }


      if (summary) {

        summary.className =
          "problem-validation-summary " +
          summaryClass;

        summary.innerHTML = `

      <div>

        <strong>
          ${escapeHTML(summaryTitle)}
        </strong>

        <span>
          ${escapeHTML(summaryText)}
        </span>

      </div>

      <div class="problem-validation-counter">

        <span>
          ✓ ${passed.length}
        </span>

        <span>
          ! ${pending.length}
        </span>

        <span>
          ✕ ${failed.length}
        </span>

      </div>

    `;

      }


      box.innerHTML =
        tests.map(function (test) {

          const status =
            test.pending
              ? "pending"
              : test.ok
                ? "ok"
                : "error";


          const statusLabel =
            test.pending
              ? "JUICIO REQUERIDO"
              : test.ok
                ? "CONFORME"
                : "REVISAR";


          return `

        <div
          class="problem-validation-item ${status}">

          <div class="problem-validation-item-head">

            <div>

              <span class="
                problem-validation-status
                ${status}
              ">

                ${statusLabel}

              </span>

              <h4>
                ${escapeHTML(test.title)}
              </h4>

            </div>

          </div>


          <p class="problem-validation-question">

            ${escapeHTML(test.question)}

          </p>


          ${test.ok

              ? `

                <div class="problem-validation-message">

                  ✓ No se encontraron hallazgos automáticos.

                </div>

              `

              : test.pending

                ? `

                  <div class="problem-validation-message pending">

                    ${test.details
                  .map(function (detail) {

                    return `
                            <div>
                              ${escapeHTML(detail)}
                            </div>
                          `;

                  })
                  .join("")
                }

                  </div>

                `

                : `

                  <div class="problem-validation-findings">

                    <strong>
                      Hallazgos
                    </strong>

                    <ul>

                      ${test.details
                  .map(function (detail) {

                    return `
                              <li>
                                ${escapeHTML(detail)}
                              </li>
                            `;

                  })
                  .join("")
                }

                    </ul>

                  </div>

                `
            }

        </div>

      `;

        }).join("");
    }

    function saveProblemExternalValidation() {

      const recognized =
        document
          .getElementById("validationRecognized")
          ?.value.trim() || "";

      const rejected =
        document
          .getElementById("validationRejected")
          ?.value.trim() || "";

      const missing =
        document
          .getElementById("validationMissing")
          ?.value.trim() || "";

      const source =
        document
          .getElementById("validationSource")
          ?.value || "";

      const observations =
        document
          .getElementById("validationObservations")
          ?.value.trim() || "";


      if (
        !recognized &&
        !rejected &&
        !missing &&
        !observations
      ) {

        alert(
          "Registra al menos un resultado de la validación."
        );

        return;

      }


      /*
       * La validación externa se conserva en la bitácora
       * del artefacto, sin guardar nombres ni datos personales.
       */

      if (!Array.isArray(state.bitacora)) {
        state.bitacora = [];
      }


      state.bitacora.push({

        fecha:
          new Date().toISOString(),

        patron:
          "Validación externa del árbol",

        salida:
          [
            source
              ? "Modalidad: " + source
              : "",

            recognized
              ? "Reconocidos: " + recognized
              : "",

            rejected
              ? "No reconocidos: " + rejected
              : "",

            missing
              ? "Faltantes: " + missing
              : ""
          ]
            .filter(Boolean)
            .join("\n"),

        correccion:
          observations ||
          "Sin corrección registrada."

      });


      const notice =
        document.getElementById(
          "externalValidationNotice"
        );


      if (notice) {

        notice.innerHTML = `

      <div class="notice success">

        <strong>
          ✓ Validación registrada
        </strong>

        <div style="margin-top:4px">

          El resultado quedó incorporado a la bitácora
          para conservar la trazabilidad de la revisión.

        </div>

      </div>

    `;

      }

    }

    function saveProblemValidationDecision() {

      const selected =
        document.querySelector(
          'input[name="problemValidationDecision"]:checked'
        );

      if (!selected) {

        alert(
          "Selecciona el estado de cierre de la validación."
        );

        return;

      }


      if (!Array.isArray(state.bitacora)) {
        state.bitacora = [];
      }


      const labels = {

        aprobado:
          "Árbol consistente",

        ajustes:
          "Requiere ajustes",

        pendiente:
          "Validación pendiente"

      };


      state.bitacora.push({

        fecha:
          new Date().toISOString(),

        patron:
          "Cierre de validación metodológica",

        salida:
          "Decisión: " +
          labels[selected.value],

        correccion:
          selected.value === "aprobado"
            ? "El formulador considera que el árbol puede continuar."
            : selected.value === "ajustes"
              ? "El árbol debe ser corregido antes de continuar."
              : "La validación aún no es suficiente."

      });


      const notice =
        document.getElementById(
          "problemValidationDecisionNotice"
        );


      if (notice) {

        notice.innerHTML = `

      <div class="notice success">

        <strong>
          ✓ Decisión registrada
        </strong>

        <div style="margin-top:4px">

          ${escapeHTML(
          labels[selected.value]
        )}

        </div>

      </div>

    `;

      }

    }


    function renderProblemContext() {

      const caso = state.caso || {};
      const problema = state.problema || {};

      const fields = {

        problemCaseName:
          caso.titulo ||
          caso.nombre ||
          "",

        problemTerritory:
          caso.territorio || "",

        problemPopulation:
          problema.poblacion ||
          caso.poblacion ||
          "",

        problemPeriod:
          caso.periodo || "",

        problemSituation:
          caso.situacion || "",

        problemCondition:
          problema.cond || "",

        problemAttribute:
          problema.atributo || "",

        problemDelimitation:
          problema.delim || ""

      };

      Object.keys(fields).forEach(function (fieldId) {

        const field =
          document.getElementById(fieldId);

        if (!field) {
          return;
        }

        field.value =
          fields[fieldId];

      });

    }

    function addProblemLog() {

      const pattern =
        document.getElementById("logPattern")
          ?.value.trim() || "";

      const prompt =
        document.getElementById("logPrompt")
          ?.value.trim() || "";

      const output =
        document.getElementById("logOutput")
          ?.value.trim() || "";

      const error =
        document.getElementById("logError")
          ?.value.trim() || "";

      const detection =
        document.getElementById("logDetection")
          ?.value.trim() || "";

      const correction =
        document.getElementById("logCorrection")
          ?.value.trim() || "";


      if (!pattern || !prompt || !output || !error || !correction) {

        alert(
          "Completa propósito, prompt, salida, error y corrección humana."
        );

        return;
      }


      if (!Array.isArray(state.bitacora)) {
        state.bitacora = [];
      }


      state.bitacora.push({

        fecha:
          new Date().toISOString(),

        patron:
          "Paso 2 · " + pattern,

        prompt:
          prompt,

        salida:
          output,

        error:
          error,

        comoSeDetecto:
          detection,

        correccion:
          correction

      });


      renderProblemBitacora();

      clearProblemLogForm();


      const notice =
        document.getElementById(
          "problemLogNotice"
        );


      if (notice) {

        notice.innerHTML = `

      <div class="notice success">

        <strong>
          ✓ Registro agregado
        </strong>

        <div style="margin-top:4px">
          La intervención quedó incorporada a la bitácora.
        </div>

      </div>

    `;

      }

    }

    function renderProblemBitacora() {

      const box =
        document.getElementById(
          "problemLogWorkspace"
        );

      if (!box) {
        return;
      }


      const logs =
        Array.isArray(state.bitacora)
          ? state.bitacora
          : [];


      const count =
        document.getElementById(
          "problemLogCount"
        );


      if (count) {

        count.textContent =
          logs.length +
          (logs.length === 1
            ? " registro"
            : " registros");

      }


      if (!logs.length) {

        box.innerHTML = `

      <div class="notice">
        Aún no hay registros de bitácora.
      </div>

    `;

        return;
      }


      box.innerHTML = `

    <div class="problem-log-list">

      ${logs
          .map(function (log, index) {

            const date =
              formatProblemLogDate(
                log.fecha
              );


            return `

              <article
                class="problem-log-entry">

                <div class="problem-log-entry-head">

                  <div>

                    <span class="badge">
                      #${index + 1}
                    </span>

                    <strong>
                      ${escapeHTML(
              log.patron ||
              "Intervención IA"
            )}
                    </strong>

                  </div>

                  <span class="problem-log-date">
                    ${escapeHTML(date)}
                  </span>

                </div>


                <div class="problem-log-grid">

                  <div>

                    <label>
                      Prompt empleado
                    </label>

                    <div class="problem-log-content">
                      ${escapeHTML(
              log.prompt ||
              "No registrado"
            )}
                    </div>

                  </div>


                  <div>

                    <label>
                      Salida del modelo
                    </label>

                    <div class="problem-log-content proposal">
                      <span class="badge warning">
                        Propuesta
                      </span>

                      <div style="margin-top:6px">
                        ${escapeHTML(
              log.salida ||
              "No registrada"
            )}
                      </div>

                    </div>

                  </div>


                  <div>

                    <label>
                      Qué produjo mal
                    </label>

                    <div class="problem-log-content error">
                      ${escapeHTML(
              log.error ||
              "No registrado"
            )}
                    </div>

                  </div>


                  <div>

                    <label>
                      Cómo se detectó
                    </label>

                    <div class="problem-log-content">
                      ${escapeHTML(
              log.comoSeDetecto ||
              "No registrado"
            )}
                    </div>

                  </div>


                  <div class="problem-log-correction">

                    <label>
                      Corrección humana
                    </label>

                    <div class="problem-log-content correction">
                      ${escapeHTML(
              log.correccion ||
              "No registrada"
            )}
                    </div>

                  </div>

                </div>


                <div class="problem-log-actions">

                  <button
                    type="button"
                    class="btn-mini"
                    onclick="deleteProblemLog(${index})">

                    Eliminar registro

                  </button>

                </div>

              </article>

            `;

          })
          .join("")
        }

    </div>

  `;

    }

    function deleteProblemLog(index) {

      if (
        !Array.isArray(state.bitacora) ||
        !state.bitacora[index]
      ) {
        return;
      }


      const confirmed =
        confirm(
          "¿Desea eliminar este registro de la bitácora?"
        );


      if (!confirmed) {
        return;
      }


      state.bitacora.splice(
        index,
        1
      );


      renderProblemBitacora();

    }

    function clearProblemLogForm() {

      [
        "logPattern",
        "logPrompt",
        "logOutput",
        "logError",
        "logDetection",
        "logCorrection"

      ].forEach(function (id) {

        const field =
          document.getElementById(id);

        if (field) {
          field.value = "";
        }

      });

    }

    function formatProblemLogDate(value) {

      if (!value) {
        return "Fecha no registrada";
      }


      const date =
        new Date(value);


      if (Number.isNaN(date.getTime())) {
        return String(value);
      }


      return date.toLocaleString(
        "es-CO",
        {
          dateStyle: "short",
          timeStyle: "short"
        }
      );

    }

    function continuarAlPaso3() {

      /*
      * Sincroniza los nodos del árbol de problemas
      * con la estructura de objetivos.
      *
      * Todavía NO genera ni decide los objetivos.
      */

      if (
        typeof syncObjectivesFromProblemNodes ===
        "function"
      ) {

        syncObjectivesFromProblemNodes();

      }


      /*
      * Llevar al usuario al Paso 3.
      */

      if (
        typeof window.showScreen ===
        "function"
      ) {

        window.showScreen(3);

      }

    }



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
    /* =========================================================
   PASO 2 · ANÁLISIS DEL PROBLEMA
   Navegación interna de las 7 etapas
   ========================================================= */

    function showProblemSubscreen(subscreen, button) {

      // Ocultar todas las subpantallas del Paso 2
      const subscreens = document.querySelectorAll('.problem-subscreen');

      subscreens.forEach(function (screen) {
        screen.classList.remove('active');
      });

      // Quitar estado activo de todos los botones
      const buttons = document.querySelectorAll('.step2-tab');

      buttons.forEach(function (tab) {
        tab.classList.remove('active');
      });

      // Mostrar la subpantalla seleccionada
      const selectedScreen = document.getElementById(
        'problemSubscreen-' + subscreen
      );

      if (selectedScreen) {
        selectedScreen.classList.add('active');
      }

      // Activar el botón seleccionado
      if (button) {
        button.classList.add('active');
      }
    }

    document.addEventListener("DOMContentLoaded", function () {

      bindProblemCentralFields();

      renderProblemContext();

      renderProblemModule();

      refreshNodeParentOptions();

      renderProblemBitacora();

    });

    const originalShowProblemSubscreen = showProblemSubscreen;

    showProblemSubscreen = function (subscreen, button) {

      originalShowProblemSubscreen(subscreen, button);

      bindProblemCentralFields();
      renderProblemContext();
      renderProblemModule();
      refreshNodeParentOptions();

    };

    /* =========================================================
   PASO 2 · PROBLEMA CENTRAL
   ========================================================= */

    function composeCentralProblem() {

      const condition =
        document.getElementById("problemCondition")?.value.trim() || "";

      const attribute =
        document.getElementById("problemAttribute")?.value.trim() || "";

      const population =
        document.getElementById("problemPopulation")?.value.trim() || "";

      const delimitation =
        document.getElementById("problemDelimitation")?.value.trim() || "";

      const parts = [
        condition,
        attribute,
        population,
        delimitation
      ].filter(Boolean);

      const statement = parts.join(" ");

      const output =
        document.getElementById("problemStatement");

      if (output) {
        output.value = statement;
      }

      return statement;
    }


    function bindProblemCentralFields() {

      [
        "problemCondition",
        "problemAttribute",
        "problemPopulation",
        "problemDelimitation"
      ].forEach(function (id) {

        const field = document.getElementById(id);

        if (!field || field.dataset.bound === "true") {
          return;
        }

        field.dataset.bound = "true";

        field.addEventListener("input", function () {

          const statement = composeCentralProblem();

          window.state.problema.condicion =
            document.getElementById("problemCondition").value.trim();

          window.state.problema.atributo =
            document.getElementById("problemAttribute").value.trim();

          window.state.problema.poblacion =
            document.getElementById("problemPopulation").value.trim();

          window.state.problema.delimitacion =
            document.getElementById("problemDelimitation").value.trim();

          window.state.problema.enunciado = statement;

          renderProblemTree();

        });

      });
    }


    function validateCentralProblem() {

      const statement = composeCentralProblem();

      const condition =
        document.getElementById("problemCondition")?.value.trim() || "";

      const attribute =
        document.getElementById("problemAttribute")?.value.trim() || "";

      const population =
        document.getElementById("problemPopulation")?.value.trim() || "";

      const delimitation =
        document.getElementById("problemDelimitation")?.value.trim() || "";

      const checks = [];

      checks.push({
        ok: Boolean(statement),
        title: "Existe un enunciado",
        message: statement
          ? "El problema tiene una formulación."
          : "Debe construirse el enunciado."
      });

      checks.push({
        ok: Boolean(condition),
        title: "Condición negativa",
        message: condition
          ? "Se identificó una condición observable."
          : "Falta la condición negativa observable."
      });

      checks.push({
        ok: Boolean(attribute),
        title: "Atributo o manifestación",
        message: attribute
          ? "Se identificó la manifestación del problema."
          : "Falta describir cómo se manifiesta."
      });

      checks.push({
        ok: Boolean(population),
        title: "Población afectada",
        message: population
          ? "La población está delimitada."
          : "Debe identificarse la población afectada."
      });

      checks.push({
        ok: Boolean(delimitation),
        title: "Territorio y delimitación",
        message: delimitation
          ? "El ámbito territorial está delimitado."
          : "Debe indicarse territorio y periodo."
      });

      const solutionPattern =
        /\b(falta|faltan|no hay|ausencia de|se necesita|se requiere|capacitar|construir|implementar|crear)\b/i;

      checks.push({
        ok: !solutionPattern.test(statement),
        title: "No está redactado como solución",
        message: solutionPattern.test(statement)
          ? "El enunciado incorpora una carencia o solución. Reescríbelo como estado negativo."
          : "No se detectó lenguaje típico de solución."
      });

      checks.push({
        ok: !/\by\b/i.test(statement),
        title: "Un solo núcleo problemático",
        message: /\by\b/i.test(statement)
          ? "Revisa si la conjunción 'y' está uniendo dos problemas."
          : "No se detectó una posible unión de problemas."
      });

      checks.push({
        ok: statement.length <= 300,
        title: "Extensión controlada",
        message: statement.length <= 300
          ? "La extensión es manejable."
          : "El enunciado es demasiado extenso."
      });

      const box =
        document.getElementById("centralProblemValidation");

      if (!box) {
        return false;
      }

      box.innerHTML = `
    <div style="
      display:grid;
      gap:8px;
    ">
      ${checks.map(function (check) {

        return `
          <div class="notice"
            style="
              border-left:4px solid ${check.ok ? "#2e7d32" : "#b42318"};
              background:${check.ok ? "#f3faf4" : "#fff5f4"};
            ">

            <strong>
              ${check.ok ? "✓" : "✕"}
              ${escapeHTML(check.title)}
            </strong>

            <div class="small-note" style="margin-top:4px;">
              ${escapeHTML(check.message)}
            </div>

          </div>
        `;

      }).join("")}
    </div>
  `;

      return checks.every(function (check) {
        return check.ok;
      });
    }


    function confirmCentralProblem() {

      const valid = validateCentralProblem();

      if (!valid) {
        alert(
          "Corrige los hallazgos de formulación antes de confirmar el problema central."
        );
        return;
      }

      const statement = composeCentralProblem();

      window.state.problema.condicion =
        document.getElementById("problemCondition").value.trim();

      window.state.problema.atributo =
        document.getElementById("problemAttribute").value.trim();

      window.state.problema.poblacion =
        document.getElementById("problemPopulation").value.trim();

      window.state.problema.delimitacion =
        document.getElementById("problemDelimitation").value.trim();

      window.state.problema.enunciado = statement;

      /*
       * El problema central es el nodo raíz especial P.
       * No se guarda como causa ni como efecto.
       */

      const existingRoot =
        window.state.nodos.find(function (node) {
          return node && node.codigo === "P";
        });

      if (existingRoot) {

        existingRoot.tipo = "problema";
        existingRoot.nivel = 0;
        existingRoot.padre = "";
        existingRoot.enunciado = statement;
        existingRoot.evidencia =
          existingRoot.evidencia || "";
        existingRoot.lineaBase =
          existingRoot.lineaBase || "";
        existingRoot.confianza =
          existingRoot.confianza || "Media";
        existingRoot.origen =
          existingRoot.origen || "Formulador";

      } else {

        window.state.nodos.unshift({
          codigo: "P",
          tipo: "problema",
          nivel: 0,
          padre: "",
          enunciado: statement,
          evidencia: "",
          lineaBase: "",
          confianza: "Media",
          origen: "Formulador"
        });

      }

      renderProblemModule();

      alert("Problema central confirmado.");

      showProblemSubscreen(
        "causas",
        document.querySelector(
          '.step2-tab[onclick*="causas"]'
        )
      );
    }


    /* =========================================================
       PASO 2 · NODOS DE CAUSAS Y EFECTOS
       ========================================================= */

    function nextNodeCode(type, level) {

      const prefix = type === "causa" ? "C" : "E";

      const existing =
        window.state.nodos.filter(function (node) {

          return node &&
            node.tipo === type &&
            Number(node.nivel) === Number(level);

        });

      return prefix +
        Number(level) +
        "." +
        (existing.length + 1);
    }


    function refreshNodeParentOptions() {

      const select =
        document.getElementById("nodeParent");

      if (!select) {
        return;
      }

      const currentValue = select.value || "P";

      const nodes =
        Array.isArray(window.state.nodos)
          ? window.state.nodos
          : [];

      const validParents =
        nodes.filter(function (node) {

          return node &&
            node.codigo &&
            node.codigo !== "P";

        });

      select.innerHTML =
        `<option value="P">P · Problema central</option>` +
        validParents.map(function (node) {

          return `
        <option value="${escapeHTML(node.codigo)}">
          ${escapeHTML(node.codigo)} ·
          ${escapeHTML(node.enunciado)}
        </option>
      `;

        }).join("");

      if (
        Array.from(select.options)
          .some(option => option.value === currentValue)
      ) {
        select.value = currentValue;
      } else {
        select.value = "P";
      }
    }


    function addProblemNode() {

      const type =
        document.getElementById("nodeType").value;

      const level =
        Number(document.getElementById("nodeLevel").value);

      const parent =
        document.getElementById("nodeParent").value || "P";

      const statement =
        document.getElementById("nodeStatement").value.trim();

      const evidence =
        document.getElementById("nodeEvidence").value.trim();

      const baseline =
        document.getElementById("nodeBaseline").value.trim();

      const confidence =
        document.getElementById("nodeConfidence").value;

      const origin =
        document.getElementById("nodeOrigin").value;

      if (!statement) {
        alert("Escribe el enunciado del nodo.");
        return;
      }

      /*
       * Los nodos del árbol representan estados negativos.
       * Se advierten acciones o soluciones.
       */

      const actionPattern =
        /^(capacitar|crear|construir|implementar|diseñar|desarrollar|fortalecer|promover|realizar|ejecutar)\b/i;

      if (actionPattern.test(statement)) {

        alert(
          "El nodo parece estar redactado como una acción o solución.\n\n" +
          "Reescríbelo como un estado negativo observable."
        );

        return;
      }

      /*
       * Evitar duplicados exactos.
       */

      const duplicate =
        window.state.nodos.some(function (node) {

          return node &&
            String(node.enunciado || "")
              .trim()
              .toLowerCase() === statement.toLowerCase();

        });

      if (duplicate) {

        alert(
          "Ya existe un nodo con el mismo enunciado."
        );

        return;
      }

      /*
       * No permitir saltos de nivel.
       * Un nivel > 1 debe depender de un nodo existente
       * de nivel inmediatamente anterior.
       */

      if (level > 1 && parent === "P") {

        const previousLevelExists =
          window.state.nodos.some(function (node) {

            return node &&
              node.tipo === type &&
              Number(node.nivel) === level - 1;

          });

        if (previousLevelExists) {

          alert(
            "Para un nodo de nivel " +
            level +
            ", selecciona un padre del nivel anterior."
          );

          return;
        }

      }

      const node = {

        codigo:
          nextNodeCode(type, level),

        tipo:
          type,

        nivel:
          level,

        padre:
          parent,

        enunciado:
          statement,

        evidencia:
          evidence,

        lineaBase:
          baseline,

        confianza:
          origin === "Propuesta IA"
            ? "Baja"
            : confidence,

        origen:
          origin

      };

      window.state.nodos.push(node);
      renderProblemModule();
      renderNodeEvidence();
      refreshNodeParentOptions();


      /*
       * Limpiar únicamente los campos de captura.
       */

      document.getElementById("nodeStatement").value = "";
      document.getElementById("nodeEvidence").value = "";
      document.getElementById("nodeBaseline").value = "";

      renderProblemModule();

      refreshNodeParentOptions();
    }


    function deleteProblemNode(codigo) {

      const index =
        window.state.nodos.findIndex(function (node) {
          return node && node.codigo === codigo;
        });

      if (index === -1) {
        return;
      }

      /*
       * El problema central P no puede eliminarse desde
       * el listado de causas y efectos.
       */

      if (codigo === "P") {
        alert("El problema central se modifica desde la sección 2.2.");
        return;
      }

      const confirmed =
        confirm(
          "¿Desea eliminar el nodo " +
          codigo +
          "?"
        );

      if (!confirmed) {
        return;
      }

      window.state.nodos.splice(index, 1);

      renderProblemNodes();
      renderProblemTree();
      renderNodeEvidence();

      /*
       * Si otros nodos apuntaban al nodo eliminado,
       * se reconectan provisionalmente al problema central.
       * La validación posterior señalará la relación para revisión.
       */

      window.state.nodos.forEach(function (node) {

        if (node.padre === codigo) {
          node.padre = "P";
        }

      });

      renderProblemModule();

      refreshNodeParentOptions();
    }
    /* =========================================================
   PASO 2 · RENDERIZADO DE NODOS
   Fuente única: state.nodos
   ========================================================= */

    function renderProblemNodes() {

      const effectsBox =
        document.getElementById("effectsWorkspace");

      const causesBox =
        document.getElementById("causesWorkspace");

      if (!effectsBox || !causesBox) {
        return;
      }

      const nodes =
        Array.isArray(window.state.nodos)
          ? window.state.nodos
          : [];

      const effects =
        nodes.filter(function (node) {
          return node &&
            node.tipo === "efecto";
        });

      const causes =
        nodes.filter(function (node) {
          return node &&
            node.tipo === "causa";
        });

      function nodeCard(node) {

        const origin =
          node.origen === "Propuesta IA"
            ? "Propuesta IA"
            : "Formulador";

        return `
      <div class="card"
        style="
          margin-top:10px;
          border-left:4px solid
          ${node.tipo === "causa" ? "#8b5e34" : "#4b6b8a"};
        ">

        <div class="section-head">

          <div>

            <div>
              <strong>
                ${escapeHTML(node.codigo)}
              </strong>

              <span class="pill">
                ${node.tipo === "causa"
            ? "Causa"
            : "Efecto"}
              </span>
            </div>

            <h4 style="margin-top:7px;">
              ${escapeHTML(node.enunciado)}
            </h4>

          </div>

          <button
            type="button"
            class="btn-mini"
            onclick="deleteProblemNode('${escapeHTML(node.codigo)}')">
            Eliminar
          </button>

        </div>

        <div class="small-note">

          Nivel ${escapeHTML(node.nivel)}
          · Padre ${escapeHTML(node.padre || "P")}
          · ${escapeHTML(origin)}
          · Confianza ${escapeHTML(node.confianza || "Baja")}

        </div>

        <div
          style="
            margin-top:8px;
            display:grid;
            gap:5px;
          ">

          <div class="small-note">
            <strong>Evidencia:</strong>
            ${escapeHTML(node.evidencia || "Pendiente")}
          </div>

          <div class="small-note">
            <strong>Línea base:</strong>
            ${escapeHTML(node.lineaBase || "Pendiente")}
          </div>

        </div>

      </div>
    `;
      }

      effectsBox.innerHTML =
        effects.length
          ? effects.map(nodeCard).join("")
          : `
        <div class="notice">
          Aún no hay efectos registrados.
        </div>
      `;

      causesBox.innerHTML =
        causes.length
          ? causes.map(nodeCard).join("")
          : `
        <div class="notice">
          Aún no hay causas registradas.
        </div>
      `;

      refreshNodeParentOptions();
    }

    function renderProblemTree() {

      const container =
        document.getElementById("problemTreeWorkspace");

      if (!container) {
        return;
      }

      const nodes =
        Array.isArray(state.nodos)
          ? state.nodos
          : [];

      /* ---------------------------------------------------------
         PROBLEMA CENTRAL
         Se toma del nodo P, que es la fuente estructural
         del árbol.
         --------------------------------------------------------- */

      const root =
        nodes.find(function (node) {
          return node && node.codigo === "P";
        });

      const problemText =
        root?.enunciado ||
        state.problema?.enunciado ||
        "Problema central pendiente";


      /* ---------------------------------------------------------
         SEPARACIÓN DE NODOS
         --------------------------------------------------------- */

      const effects =
        nodes.filter(function (node) {
          return node &&
            node.tipo === "efecto";
        });

      const causes =
        nodes.filter(function (node) {
          return node &&
            node.tipo === "causa";
        });


      /* ---------------------------------------------------------
         ORGANIZAR POR NIVEL
         --------------------------------------------------------- */

      function groupByLevel(list) {

        const groups = {};

        list.forEach(function (node) {

          const level =
            Number(node.nivel || 1);

          if (!groups[level]) {
            groups[level] = [];
          }

          groups[level].push(node);

        });

        Object.keys(groups).forEach(function (level) {

          groups[level].sort(function (a, b) {

            return String(a.codigo)
              .localeCompare(
                String(b.codigo),
                undefined,
                { numeric: true }
              );

          });

        });

        return groups;
      }


      const effectLevels =
        groupByLevel(effects);

      const causeLevels =
        groupByLevel(causes);


      /* ---------------------------------------------------------
         NIVELES EXISTENTES
         --------------------------------------------------------- */

      const effectLevelNumbers =
        Object.keys(effectLevels)
          .map(Number)
          .sort(function (a, b) {
            return b - a;
          });

      const causeLevelNumbers =
        Object.keys(causeLevels)
          .map(Number)
          .sort(function (a, b) {
            return a - b;
          });


      /* ---------------------------------------------------------
         COLOR POR JERARQUÍA
         --------------------------------------------------------- */

      const effectColors = [
        "#315d82",
        "#557d9e",
        "#7698b2",
        "#98b1c3"
      ];

      const causeColors = [
        "#9a6735",
        "#b7834e",
        "#c89b70",
        "#d9b897"
      ];


      function hierarchyColor(type, level) {

        const palette =
          type === "causa"
            ? causeColors
            : effectColors;

        return palette[
          Math.min(
            Math.max(Number(level) - 1, 0),
            palette.length - 1
          )
        ];
      }


      /* ---------------------------------------------------------
         ESCAPE SVG
         --------------------------------------------------------- */

      function svgText(text) {

        return escapeHTML(
          String(text || "")
        );

      }


      /* ---------------------------------------------------------
         CONFIGURACIÓN DEL LIENZO
         --------------------------------------------------------- */

      const width = 1180;

      const nodeWidth = 210;
      const nodeHeight = 82;

      const horizontalGap = 28;
      const verticalGap = 72;

      const allLevels =
        Math.max(
          effectLevelNumbers.length,
          causeLevelNumbers.length,
          1
        );

      const height =
        Math.max(
          620,
          190 +
          allLevels * (nodeHeight + verticalGap)
        );


      /* ---------------------------------------------------------
         POSICIONES
         --------------------------------------------------------- */

      const positions = new Map();


      function distribute(nodesList, y) {

        if (!nodesList.length) {
          return;
        }

        const totalWidth =
          nodesList.length * nodeWidth +
          Math.max(0, nodesList.length - 1) *
          horizontalGap;

        let startX =
          (width - totalWidth) / 2;

        nodesList.forEach(function (node, index) {

          positions.set(
            node.codigo,
            {
              x: startX +
                index *
                (nodeWidth + horizontalGap),

              y: y
            }
          );

        });

      }


      /* ---------------------------------------------------------
         EFECTOS
         Los niveles superiores van arriba.
         --------------------------------------------------------- */

      let currentY = 35;

      effectLevelNumbers.forEach(function (level) {

        distribute(
          effectLevels[level],
          currentY
        );

        currentY +=
          nodeHeight +
          verticalGap;

      });


      /* ---------------------------------------------------------
         PROBLEMA CENTRAL
         --------------------------------------------------------- */

      const problemY =
        currentY + 5;

      positions.set(
        "P",
        {
          x: (width - 390) / 2,
          y: problemY
        }
      );


      /* ---------------------------------------------------------
         CAUSAS
         --------------------------------------------------------- */

      currentY =
        problemY +
        125;

      causeLevelNumbers.forEach(function (level) {

        distribute(
          causeLevels[level],
          currentY
        );

        currentY +=
          nodeHeight +
          verticalGap;

      });


      /* ---------------------------------------------------------
         SVG
         --------------------------------------------------------- */

      let svg = `
    <svg
      class="problem-tree-svg"
      viewBox="0 0 ${width} ${height}"
      role="img"
      aria-label="Árbol jerárquico de problemas">

      <defs>

        <filter
          id="problemTreeShadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%">

          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="2"
            flood-opacity=".10"/>

        </filter>

      </defs>

      <!-- TÍTULO EFECTOS -->

      <text
        x="${width / 2}"
        y="18"
        text-anchor="middle"
        class="problem-tree-label">

        EFECTOS

      </text>
  `;


      /* ---------------------------------------------------------
         CONECTORES
         --------------------------------------------------------- */

      function drawConnector(child, parent) {

        const childPos =
          positions.get(child.codigo);

        const parentPos =
          positions.get(parent.codigo);

        if (!childPos || !parentPos) {
          return;
        }

        const childCenter =
          childPos.x +
          nodeWidth / 2;

        const parentCenter =
          parentPos.x +
          nodeWidth / 2;

        /*
         * Para efectos:
         * hijo arriba → padre abajo.
         *
         * Para causas:
         * padre arriba → hijo abajo.
         */

        const isEffect =
          child.tipo === "efecto";

        const startY =
          isEffect
            ? childPos.y + nodeHeight
            : parentPos.y + nodeHeight;

        const endY =
          isEffect
            ? parentPos.y
            : childPos.y;

        const middleY =
          (startY + endY) / 2;

        return `
      <path
        d="
          M ${isEffect ? childCenter : parentCenter}
            ${startY}

          C ${isEffect ? childCenter : parentCenter}
            ${middleY},

            ${isEffect ? parentCenter : childCenter}
            ${middleY},

            ${isEffect ? parentCenter : childCenter}
            ${endY}
        "
        class="problem-tree-connector"
      />
    `;
      }


      /* Conectores de efectos */

      effects.forEach(function (node) {

        const parent =
          nodes.find(function (candidate) {

            return candidate &&
              candidate.codigo === node.padre;

          });

        if (parent) {
          svg += drawConnector(node, parent);
        }

      });


      /* Conectores de causas */

      causes.forEach(function (node) {

        const parent =
          nodes.find(function (candidate) {

            return candidate &&
              candidate.codigo === node.padre;

          });

        if (parent) {
          svg += drawConnector(node, parent);
        }

      });


      /* ---------------------------------------------------------
         NODO CENTRAL
         --------------------------------------------------------- */

      const rootPosition =
        positions.get("P");

      svg += `

    <g filter="url(#problemTreeShadow)">

      <rect
        x="${rootPosition.x}"
        y="${rootPosition.y}"
        width="390"
        height="82"
        rx="10"
        class="problem-tree-central"/>

      <text
        x="${width / 2}"
        y="${rootPosition.y + 23}"
        text-anchor="middle"
        class="problem-tree-central-title">

        PROBLEMA CENTRAL

      </text>

      <foreignObject
        x="${rootPosition.x + 12}"
        y="${rootPosition.y + 31}"
        width="366"
        height="45">

        <div class="problem-tree-central-text">

          ${svgText(problemText)}

        </div>

      </foreignObject>

    </g>

  `;


      /* ---------------------------------------------------------
         NODOS
         --------------------------------------------------------- */

      function drawNode(node) {

        const position =
          positions.get(node.codigo);

        if (!position) {
          return "";
        }

        const color =
          hierarchyColor(
            node.tipo,
            node.nivel
          );

        const label =
          node.tipo === "causa"
            ? "CAUSA"
            : "EFECTO";

        const parentText =
          node.padre
            ? "Padre " + node.padre
            : "";


        return `

      <g
        class="problem-tree-node"
        filter="url(#problemTreeShadow)">

        <rect
          x="${position.x}"
          y="${position.y}"
          width="${nodeWidth}"
          height="${nodeHeight}"
          rx="9"
          fill="#ffffff"
          stroke="${color}"
          stroke-width="2"/>

        <rect
          x="${position.x}"
          y="${position.y}"
          width="5"
          height="${nodeHeight}"
          rx="3"
          fill="${color}"/>

        <text
          x="${position.x + 15}"
          y="${position.y + 19}"
          class="problem-tree-code">

          ${svgText(node.codigo)}

        </text>

        <text
          x="${position.x + nodeWidth - 12}"
          y="${position.y + 19}"
          text-anchor="end"
          class="problem-tree-type"
          fill="${color}">

          ${label}

        </text>

        <foreignObject
          x="${position.x + 14}"
          y="${position.y + 27}"
          width="${nodeWidth - 28}"
          height="39">

          <div class="problem-tree-node-text">

            ${svgText(node.enunciado)}

          </div>

        </foreignObject>

        <text
          x="${position.x + 14}"
          y="${position.y + 76}"
          class="problem-tree-meta">

          Nivel ${svgText(node.nivel)}
          ${parentText ? " · " + svgText(parentText) : ""}

        </text>

      </g>

    `;

      }


      effects.forEach(function (node) {
        svg += drawNode(node);
      });

      causes.forEach(function (node) {
        svg += drawNode(node);
      });


      /* ---------------------------------------------------------
         ETIQUETA CAUSAS
         --------------------------------------------------------- */

      const causesLabelY =
        problemY + 112;

      svg += `

    <text
      x="${width / 2}"
      y="${causesLabelY}"
      text-anchor="middle"
      class="problem-tree-label">

      CAUSAS

    </text>

  `;


      svg += `</svg>`;


      container.innerHTML = `

    <div class="problem-tree-header">

      <div>

        <strong>Árbol jerárquico de problemas</strong>

        <span>
          ${nodes.filter(n => n.codigo !== "P").length}
          nodos · relaciones padre-hijo explícitas
        </span>

      </div>

      <div class="problem-tree-legend">

        <span>
          <i class="tree-level-dot effect-level-1"></i>
          Efectos
        </span>

        <span>
          <i class="tree-level-dot cause-level-1"></i>
          Causas
        </span>

        <span>
          <i class="tree-level-dot central-level"></i>
          Problema
        </span>

      </div>

    </div>

    <div class="problem-tree-canvas">

      ${svg}

    </div>

    <div class="problem-tree-reading">

      <strong>Lectura metodológica</strong>

      <span>
        Los efectos se leen hacia arriba como consecuencias;
        las causas se leen hacia abajo preguntando
        «¿por qué ocurre?». Cada relación se determina mediante
        el campo <b>padre</b>, no únicamente por el nivel.
      </span>

    </div>

  `;

    }

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

    function showObjectiveSubscreen(subscreen, button) {

      // Ocultar todas las subpantallas del Paso 3
      const subscreens = document.querySelectorAll('.objective-subscreen');

      subscreens.forEach(function (screen) {
        screen.classList.remove('active');
      });

      // Quitar estado activo de todos los botones
      const buttons = document.querySelectorAll('.step3-tab');

      buttons.forEach(function (tab) {
        tab.classList.remove('active');
      });

      // Mostrar la subpantalla seleccionada
      const selectedScreen = document.getElementById(
        'objectiveSubscreen-' + subscreen
      );

      if (selectedScreen) {
        selectedScreen.classList.add('active');
      }

      // Activar el botón seleccionado
      if (button) {
        button.classList.add('active');
      }

      if (subscreen === "transformacion") {

        renderObjectiveTransformation();
        renderObjectiveAssumptions();

      }

    }
    function exportStateJSON() {

      const json = JSON.stringify(state, null, 2);

      const blob = new Blob(
        [json],
        { type: "application/json;charset=utf-8" }
      );

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "estado_MML.json";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    }

    function importStateJSON() {

      const input = document.getElementById("inputImportJSON");

      if (!input) {
        console.error("No se encontró el selector de archivo para importar JSON.");
        return;
      }

      input.value = "";
      input.click();
    }

    document
      .getElementById("inputImportJSON")
      .addEventListener("change", function (event) {

        const file = event.target.files[0];

        if (!file) {
          return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {

          try {

            const importedState = JSON.parse(e.target.result);

            if (!importedState || typeof importedState !== "object") {
              throw new Error("El archivo no contiene un objeto JSON válido.");
            }

            if (!importedState.caso) {
              throw new Error("El JSON no contiene la sección 'caso'.");
            }

            if (!Array.isArray(importedState.involucrados)) {
              throw new Error("El JSON no contiene una lista válida de involucrados.");
            }

            if (!Array.isArray(importedState.nodos)) {
              throw new Error("El JSON no contiene una lista válida de nodos.");
            }

            /*
             * Solo después de validar la estructura mínima
             * reemplazamos el estado actual.
             */
            window.state = importedState;

            /*
             * Asegurar estructuras utilizadas por el artefacto.
             */
            if (!Array.isArray(window.state.objetivos)) {
              window.state.objetivos = [];
            }

            if (!Array.isArray(window.state.acciones)) {
              window.state.acciones = [];
            }

            if (!Array.isArray(window.state.alternativas)) {
              window.state.alternativas = [];
            }

            if (!window.state.evaluacion ||
              typeof window.state.evaluacion !== "object") {

              window.state.evaluacion = {
                criterios: [],
                pesos: {},
                valoraciones: {},
                sensibilidad: {}
              };
            }

            if (!window.state.seleccion ||
              typeof window.state.seleccion !== "object") {

              window.state.seleccion = {
                alternativa: "",
                justificacion: ""
              };
            }

            if (!Array.isArray(window.state.bitacora)) {
              window.state.bitacora = [];
            }

            /*
             * Mantener la navegación en una pantalla válida.
             */
            if (
              typeof window.state.current !== "number" ||
              window.state.current < 0 ||
              window.state.current > 10
            ) {
              window.state.current = 0;
            }

            /*
             * Redibujar la pantalla actual.
             */
            /* =====================================================
   RECONSTRUIR LA INTERFAZ DESDE EL ESTADO IMPORTADO
   ===================================================== */

            /* ---------- Ficha del caso ---------- */

            const caseFields = {
              casoTitulo: "titulo",
              casoSector: "sector",
              casoTerritorio: "territorio",
              casoPoblacion: "poblacion",
              casoPeriodo: "periodo",
              casoSituacion: "situacion",
              casoPregunta: "pregunta",
              casoDelimitacion: "delimitacion"
            };

            Object.keys(caseFields).forEach(function (fieldId) {

              const input = document.getElementById(fieldId);

              if (!input) {
                return;
              }

              const stateKey = caseFields[fieldId];

              input.value = window.state.caso[stateKey] || "";

            });


            /* ---------- Paso 1 · Involucrados ---------- */

            /*
             * renderActors pertenece al módulo de involucrados.
             * Se ejecuta únicamente si está disponible globalmente.
             */
            if (typeof window.renderActors === "function") {
              window.renderActors();
            }




            /* =====================================================
   PASO 2 · ANÁLISIS DEL PROBLEMA
   Reconstrucción de contexto y problema central
   ===================================================== */

            if (window.state.problema &&
              typeof window.state.problema === "object") {

              /* ---------- 2.1 Contexto ---------- */

              const problemContextFields = {

                problemCaseName: window.state.caso?.titulo || "",

                problemTerritory: window.state.caso?.territorio || "",

                problemPopulation: window.state.caso?.poblacion || "",

                problemPeriod: window.state.caso?.periodo || "",

                problemSituation:
                  window.state.caso?.situacion ||
                  window.state.problema?.enunciado ||
                  ""

              };

              Object.keys(problemContextFields).forEach(function (fieldId) {

                const field = document.getElementById(fieldId);

                if (!field) {
                  return;
                }

                field.value = problemContextFields[fieldId];

              });


              /* ---------- 2.2 Problema central ---------- */

              const problemFields = {

                problemStatement:
                  window.state.problema.enunciado || "",

                problemCondition:
                  window.state.problema.condicion || "",

                problemAttribute:
                  window.state.problema.atributo || "",

                problemDelimitation:
                  window.state.problema.delimitacion || ""

              };

              Object.keys(problemFields).forEach(function (fieldId) {

                const field = document.getElementById(fieldId);

                if (!field) {
                  return;
                }

                field.value = problemFields[fieldId];

              });

            }
            renderProblemModule();


            /* ---------- Mostrar pantalla importada ---------- */

            window.showScreen(window.state.current);

            alert("Estado del proyecto importado correctamente.");

          } catch (error) {

            console.error("Error al importar JSON:", error);

            alert(
              "No fue posible importar el archivo JSON.\n\n" +
              error.message
            );
          }

        };

        reader.onerror = function () {

          console.error("No fue posible leer el archivo JSON.");

          alert(
            "No fue posible leer el archivo seleccionado."
          );

        };

        reader.readAsText(file, "UTF-8");

      });


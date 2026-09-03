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




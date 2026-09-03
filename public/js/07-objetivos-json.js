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


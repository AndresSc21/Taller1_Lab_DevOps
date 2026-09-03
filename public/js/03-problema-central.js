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


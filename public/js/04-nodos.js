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


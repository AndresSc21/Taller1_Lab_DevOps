const BASE_JSON = {
    "caso": {
        "id": "CU-001",
        "titulo": "Permanencia de jóvenes en la zona rural de Manizales",
        "nombre": "Generación de oportunidades laborales y productivas para favorecer la permanencia de jóvenes rurales en Manizales",
        "sector": "Desarrollo rural y desarrollo productivo"
    },
    "territorio": {
        "municipio": "Manizales",
        "departamento": "Caldas",
        "pais": "Colombia",
        "zona": "Zona rural",
        "corregimientos": "Siete corregimientos rurales de Manizales"
    },
    "periodo": "2026-2",
    "poblacion": {
        "principal": "Jóvenes rurales",
        "rango_edad": "14 a 28 años",
        "poblaciones_relacionadas": [
            "Familias rurales",
            "Productores y unidades productivas rurales",
            "Asociaciones de productores",
            "Organizaciones y comités cafeteros"
        ]
    },
    "problema": {
        "central": "Dificultades para consolidar oportunidades laborales y productivas suficientemente atractivas para favorecer la permanencia de los jóvenes en la zona rural de Manizales.",
        "pregunta_orientadora": "¿Qué condiciones laborales, productivas, educativas y territoriales influyen en la decisión de los jóvenes de permanecer en la zona rural de Manizales o buscar oportunidades fuera del territorio?",
        "situacion_actual": "Los jóvenes rurales enfrentan condiciones donde las oportunidades urbanas son percibidas como más atractivas y viables para su proyecto de vida, mientras persisten barreras críticas relacionadas con empleo formal, ingresos inestables, acceso restringido a tierra y capital, desconexión formativa y canales de comercialización débiles.",
        "delimitacion": "El análisis se concentra en los factores socioeconómicos, productivos, formativos y comerciales que determinan la permanencia de jóvenes (14 a 28 años) en los siete corregimientos rurales de Manizales. No se asume la migración como un hecho aislado ni como falta de mano de obra sin causa demostrada."
    },
    "factores_identificados": [
        { "factor": "Oportunidades laborales y de empleo rural formal", "tipo": "Laboral" },
        { "factor": "Acceso a tierra, activos productivos y financiamiento", "tipo": "Productivo / Financiero" },
        { "factor": "Educación pertinente y asistencia técnica aplicada", "tipo": "Educativo / Formativo" },
        { "factor": "Asociatividad juvenil y comercialización directa", "tipo": "Comercial / Organizacional" },
        { "factor": "Entorno socioeconómico y relevo generacional familiar", "tipo": "Social / Comunitario" }
    ],
    "objetivo_preliminar": {
        "enunciado": "Favorecer la permanencia de los jóvenes en la zona rural de Manizales mediante la consolidación de oportunidades laborales, productivas, formativas y comerciales viables en el territorio.",
        "tipo": "Objetivo preliminar / Propósito"
    },
    "involucrados": [
        {
            "grupo": "Jóvenes rurales",
            "naturaleza": "Comunidad",
            "relacion": "Población directamente afectada por el problema",
            "rol": "Población objetivo / actor principal del proyecto",
            "intereses": [
                "Empleo formal rural",
                "Ingresos dignos y estables",
                "Educación técnica y superior pertinente",
                "Acceso a tierra y capital semilla",
                "Emprendimiento agropecuario viable",
                "Permanencia con calidad de vida"
            ],
            "problemas_percibidos": [
                "Oferta de empleo rural formal escasa y mal remunerada",
                "Restricciones severas para acceder a tierra y crédito productivo",
                "Desconexión entre la formación recibida y las oportunidades del territorio",
                "Inestabilidad de ingresos en actividades agropecuarias primarias",
                "Baja participación en la toma de decisiones comunitarias"
            ],
            "recursos_mandatos": [
                "Conocimiento del territorio y vocación juvenil",
                "Capacidades de innovación y adopción tecnológica",
                "Disponibilidad de mano de obra calificada",
                "Liderazgo y participación comunitaria"
            ],
            "posicion": "+",
            "fuerza": 3,
            "intensidad": 5,
            "justificacion": "Es el grupo directamente afectado; su interés por mejorar ingresos y oportunidades es máximo y su capacidad de organización es creciente.",
            "estrategia": "Involucrar activamente y cogestionar"
        },
        {
            "grupo": "Productores y unidades productivas rurales",
            "naturaleza": "Productivo",
            "relacion": "Actores productivos de los corregimientos",
            "rol": "Generadores de empleo y aliados de relevo generacional",
            "intereses": [
                "Disponibilidad de mano de obra calificada",
                "Aumento de la productividad y tecnificación",
                "Continuidad de la actividad agropecuaria",
                "Relevo generacional en fincas"
            ],
            "problemas_percibidos": [
                "Dificultad para vincular y retener jóvenes en labores de campo",
                "Baja rentabilidad para ofrecer contratos formales estables",
                "Envejecimiento de la población productora en el campo"
            ],
            "recursos_mandatos": [
                "Tenencia de predios e infraestructura productiva",
                "Experiencia y conocimiento agropecuario tradicional",
                "Capacidad de vinculación laboral y alianzas"
            ],
            "posicion": "+",
            "fuerza": 4,
            "intensidad": 5,
            "justificacion": "Alto poder económico y gremial en el territorio, con urgente necesidad de relevo generacional en la producción.",
            "estrategia": "Gestionar de cerca"
        },
        {
            "grupo": "Familias rurales",
            "naturaleza": "Comunidad",
            "relacion": "Entorno socioeconómico de los jóvenes",
            "rol": "Núcleo social y soporte de iniciativas productivas",
            "intereses": [
                "Mejoramiento de ingresos familiares",
                "Seguridad y bienestar de sus hijos",
                "Continuidad del patrimonio familiar rural"
            ],
            "problemas_percibidos": [
                "Migración forzada de los hijos por falta de alternativas locales",
                "Bajos ingresos derivados de la producción primaria no transformada"
            ],
            "recursos_mandatos": [
                "Redes de apoyo familiar y comunitario",
                "Activos familiares y parcelas productivas",
                "Tradición y arraigo territorial"
            ],
            "posicion": "+",
            "fuerza": 3,
            "intensidad": 5,
            "justificacion": "Tienen alto interés en el bienestar juvenil y mediana influencia organizativa.",
            "estrategia": "Gestionar de cerca"
        },
        {
            "grupo": "Asociaciones de productores",
            "naturaleza": "Productivo / Comunitario",
            "relacion": "Organizaciones colectivas de comercialización y producción",
            "rol": "Plataforma asociativa y canal comercial",
            "intereses": [
                "Fortalecimiento asociativo y gremial",
                "Comercialización directa en mejores condiciones",
                "Incorporación de jóvenes en liderazgos asociativos"
            ],
            "problemas_percibidos": [
                "Baja participación y afiliación de población joven",
                "Dificultades en acuerdos comerciales y logística de acopio"
            ],
            "recursos_mandatos": [
                "Estructura organizativa y personería jurídica",
                "Centros de acopio y redes comerciales",
                "Poder de negociación colectiva"
            ],
            "posicion": "+",
            "fuerza": 4,
            "intensidad": 4,
            "justificacion": "Actores clave para la asociatividad y canales de venta diferenciados.",
            "estrategia": "Gestionar de cerca"
        },
        {
            "grupo": "Alcaldía de Manizales (Secretaría de Agricultura y Desarrollo Social)",
            "naturaleza": "Institucional",
            "relacion": "Autoridad territorial de formulación de política pública",
            "rol": "Líder institucional, cofinanciador y articulador",
            "intereses": [
                "Desarrollo rural integral del municipio",
                "Generación de oportunidades juveniles rurales",
                "Cumplimiento de metas del Plan de Desarrollo"
            ],
            "problemas_percibidos": [
                "Desarticulación entre programas de formación, crédito y mercados",
                "Persistencia de brechas socioeconómicas entre campo y ciudad"
            ],
            "recursos_mandatos": [
                "Presupuesto público y programas de fomento",
                "Capacidad de articulación interinstitucional",
                "Políticas públicas de juventud y desarrollo agropecuario"
            ],
            "posicion": "+",
            "fuerza": 5,
            "intensidad": 5,
            "justificacion": "Actor decisor con máximo poder presupuestal y regulatorio en el municipio.",
            "estrategia": "Gestionar de cerca"
        },
        {
            "grupo": "Comité de Cafeteros de Caldas / Gremios agropecuarios",
            "naturaleza": "Gremial / Productivo",
            "relacion": "Organización rectora del sector cafetero territorial",
            "rol": "Aliado técnico, formativo y de encadenamiento",
            "intereses": [
                "Sostenibilidad del cultivo y calidad del café",
                "Innovación y agregación de valor (cafés especiales)",
                "Relevo generacional en la caficultura"
            ],
            "problemas_percibidos": [
                "Bajo interés de los jóvenes en la caficultura tradicional no diferenciada"
            ],
            "recursos_mandatos": [
                "Red de extensión rural y asistencia técnica",
                "Infraestructura formativa (Escuela Nacional del Café)",
                "Canales de exportación y comercialización"
            ],
            "posicion": "+",
            "fuerza": 5,
            "intensidad": 4,
            "justificacion": "Fuerte capacidad técnica y de financiamiento en los siete corregimientos.",
            "estrategia": "Gestionar de cerca"
        },
        {
            "grupo": "SENA y Centros de Formación Rural",
            "naturaleza": "Educativo / Institucional",
            "relacion": "Entidad de formación técnica, tecnológica y emprendimiento",
            "rol": "Formador técnico y promotor de Fondo Emprender",
            "intereses": [
                "Pertinencia de programas formativos rurales",
                "Empleabilidad e inserción laboral juvenil",
                "Creación de empresas rurales sostenibles"
            ],
            "problemas_percibidos": [
                "Deserción en programas formativos por falta de articulación con el mercado",
                "Trámites complejos para acceso al capital semilla de Fondo Emprender"
            ],
            "recursos_mandatos": [
                "Instructores y programas de formación técnica agropecuaria",
                "Fondo Emprender y asesoría en formulación de planes de negocio",
                "Ambientes de aprendizaje práctico en biotecnología y agroindustria"
            ],
            "posicion": "+",
            "fuerza": 4,
            "intensidad": 4,
            "justificacion": "Principal formador técnico y fuente de capital semilla para emprendedores rurales.",
            "estrategia": "Gestionar de cerca"
        },
        {
            "grupo": "Instituciones Educativas Rurales (Colegios con media técnica)",
            "naturaleza": "Educativo",
            "relacion": "Formación básica y media en los corregimientos",
            "rol": "Formador inicial y orientador vocacional",
            "intereses": [
                "Continuidad educativa de los egresados",
                "Modelos pedagógicos pertinentes para el campo (Escuela Nueva / Media Técnica)",
                "Arraigo positivo de los estudiantes en su territorio"
            ],
            "problemas_percibidos": [
                "Falta de proyectos pedagógicos productivos con financiación sostenible",
                "Desconexión entre el currículo escolar y las oportunidades productivas reales"
            ],
            "recursos_mandatos": [
                "Infraestructura educativa y docentes en corregimientos",
                "Articulación con programas de doble titulación con el SENA"
            ],
            "posicion": "+",
            "fuerza": 3,
            "intensidad": 4,
            "justificacion": "Espacio clave para la orientación vocacional y la retención temprana de jóvenes.",
            "estrategia": "Mantener involucradas"
        },
        {
            "grupo": "Universidades (UNAL Manizales, U. de Caldas, U. de Manizales)",
            "naturaleza": "Académico / Superior",
            "relacion": "Educación superior, investigación, extensión y desarrollo tecnológico",
            "rol": "Aliado académico, científico y de innovación social",
            "intereses": [
                "Extensión universitaria e investigación aplicada en el territorio",
                "Transferencia de tecnología e innovación social rural",
                "Acceso equitativo de jóvenes rurales a educación superior"
            ],
            "problemas_percibidos": [
                "Baja cobertura de programas universitarios directamente en veredas"
            ],
            "recursos_mandatos": [
                "Grupos de investigación y laboratorios de calidad",
                "Proyectos de extensión y voluntariado técnico",
                "Becas y programas de admisión especial para población rural"
            ],
            "posicion": "+",
            "fuerza": 3,
            "intensidad": 3,
            "justificacion": "Aportan rigor metodológico, innovación y capacitación avanzada.",
            "estrategia": "Mantener informadas e integradas"
        },
        {
            "grupo": "Comercializadores, compradores urbanos y canal HORECA",
            "naturaleza": "Mercado",
            "relacion": "Demanda de productos agropecuarios diferenciados",
            "rol": "Comprador directo y canal de mercado",
            "intereses": [
                "Suministro constante, calidad e inocuidad garantizada",
                "Precios competitivos y trazabilidad de origen"
            ],
            "problemas_percibidos": [
                "Volúmenes pequeños y dispersos que encarecen la logística",
                "Falta de certificaciones y empaques comerciales en iniciativas juveniles"
            ],
            "recursos_mandatos": [
                "Poder de compra y canales de comercialización urbanos",
                "Capacidad de acuerdos de suministro a largo plazo"
            ],
            "posicion": "0",
            "fuerza": 4,
            "intensidad": 3,
            "justificacion": "Actor de mercado neutral pero decisivo para asegurar ventas a precios justos.",
            "estrategia": "Mantener satisfechos"
        }
    ],
    "fuentes": [
        {
            "tipo": "Académica",
            "titulo": "Factores de expulsión y retención en la decisión migratoria de jóvenes rurales en Manizales, Colombia",
            "url": "https://www.redalyc.org/journal/666/66648525003/",
            "aporte": "Identificación de oportunidades laborales, acceso a activos productivos, entorno socioeconómico familiar y educación/profesionalización como factores determinantes."
        },
        {
            "tipo": "Institucional",
            "titulo": "Jóvenes rurales de Manizales fortalecen emprendimientos productivos con apoyo institucional",
            "url": "https://centrodeinformacion.manizales.gov.co/jovenes-rurales-de-manizales-fortalecen-emprendimientos-productivos-con-apoyo-institucional/",
            "aporte": "Evidencia de la estrategia municipal para jóvenes de 14 a 28 años en los siete corregimientos, orientada a formación, capital semilla y acompañamiento."
        },
        {
            "tipo": "Institucional",
            "titulo": "Secretaría de Agricultura – Alcaldía de Manizales",
            "url": "https://manizales.gov.co/secretarias/secretaria-de-agricultura/",
            "aporte": "Soporte institucional para la caracterización de programas de fomento agropecuario y articulación institucional en corregimientos."
        },
        {
            "tipo": "Institucional",
            "titulo": "La Secretaría de Agricultura brinda espacio al joven de la zona rural, en el Mercado Campesino",
            "url": "https://centrodeinformacion.manizales.gov.co/la-secretaria-de-agricultura-brinda-espacio-al-joven-de-la-zona-rural-en-el-mercado-campesino/",
            "aporte": "Evidencia empírica sobre comercialización, venta directa, generación de ingresos y relevo generacional juvenil."
        },
        {
            "tipo": "Metodológica",
            "titulo": "Manual CEPAL/ILPES S057518_es: Metodología del marco lógico para la planificación, el seguimiento y la evaluación de proyectos y programas",
            "url": "../Fuentes/S057518_es.pdf",
            "aporte": "Guía metodológica oficial (Ortegón, Pacheco y Prieto, 2005) para el análisis de involucrados, construcción del árbol de problemas, árbol de objetivos y derivación a la EAP."
        }
    ],
    "participacion": {
        "tecnica": "Grupos nominales y talleres participativos por corregimiento",
        "justificacion": "Permite ponderar de forma equitativa las opiniones de jóvenes rurales, productores tradicionales, líderes comunitarios e instituciones públicas, evitando el sesgo de actores dominantes."
    },
    "estado": {
        "fase": "Avance 2 · Paso 2 Validado",
        "paso_mml": 2,
        "validacion_participativa": true,
        "observacion": "Árbol de problemas revisado y validado con 10/10 criterios favorables de la Sesión 2 y derivación metodológica a la EAP de 4 componentes con 4 actividades cada uno."
    },
    "artefacto": {
        "bitacora": [
            {
                "fecha": "2026-09-01T11:55:00.000Z",
                "patron": "Detección y corrección de polaridad en el verificador de problema central",
                "proposito": "Corregir la polaridad invertida y los falsos negativos del evaluador automático de consistencia lógica del problema central.",
                "prompt": "Evaluación de los 6 criterios automáticos del problema central: «Dificultades para consolidar oportunidades laborales y productivas suficientemente atractivas para favorecer la permanencia de los jóvenes en la zona rural de Manizales.»",
                "salida": "El verificador del módulo mostraba 4 de 6 criterios favorables y desplegaba marcas rojas con mensajes de error a pesar de que el enunciado cumplía con la totalidad de los criterios metodológicos, generando contradicción con la matriz formal de verificación del documento.",
                "error_modelo": "Falla de diseño en la lógica de evaluación: la UI utilizaba los mensajes de error como texto de salida cuando la condición era verdadera, las expresiones regulares exigían adyacencia estricta ('jóvenes rurales') ignorando la construcción 'jóvenes en la zona rural', y penalizaba conjunciones copulativas internas.",
                "como_se_detecto": "Observación docente y contraste entre los mensajes de la interfaz web y la tabla formal de 10 criterios de la Sesión 2 del documento entregable.",
                "correccion": "Se corrigió la lógica de renderizado del componente visual (.check.ok, .check.bad), se separaron los mensajes de confirmación afirmativa y de advertencia, y se ajustaron las expresiones regulares para evaluar con precisión el núcleo problemático, territorio y población, alcanzando 6/6 criterios automáticos y 10/10 criterios totales favorables."
            }
        ]
    }
};

const STORAGE_KEY = "mml_jovenes_rurales_v7_cepal";

const navItems = [
    ["0", "Ficha del caso", "Punto de partida"],
    ["1", "Paso 1 · Involucrados", "Análisis situacional"],
    ["2", "Paso 2 · Problema y árbol", "Análisis situacional"],
    ["3", "Paso 3 · Objetivos", "Análisis situacional"],
    ["4", "Paso 4 · Estrategia", "Análisis situacional"],
    ["5", "Paso 5 · EAP", "Matriz"],
    ["6", "Paso 6 · Resumen", "Matriz"],
    ["7", "Paso 7 · Indicadores", "Matriz"],
    ["8", "Paso 8 · Verificación", "Matriz"],
    ["9", "Paso 9 · Supuestos", "Matriz"],
    ["10", "Paso 10 · Evaluación", "Matriz"]
];

const CEPAL_PROBLEM_TREE = [
    {
        codigo: "E2.1",
        tipo: "efecto",
        nivel: 2,
        padre: "E1.1",
        enunciado: "Acelerada migración definitiva de población joven hacia áreas urbanas",
        evidencia: "Estudio Redalyc sobre factores de expulsión y retención en Manizales; estadísticas demográficas rurales.",
        lineaBase: "Tasa estimada de migración juvenil rural superior al 45% en corregimientos.",
        confianza: "Alta",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "E2.2",
        tipo: "efecto",
        nivel: 2,
        padre: "E1.2",
        enunciado: "Deterioro del relevo generacional y abandono progresivo de unidades productivas campesinas",
        evidencia: "Problemas percibidos por productores y organizaciones cafeteras de Caldas.",
        lineaBase: "Edad promedio de productores agropecuarios en Manizales superior a 57 años.",
        confianza: "Alta",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "E1.1",
        tipo: "efecto",
        nivel: 1,
        padre: "P",
        enunciado: "Baja expectativa de los jóvenes de consolidar un proyecto de vida digno y viable en el campo",
        evidencia: "Pregunta orientadora y percepción sistematizada de jóvenes rurales y familias.",
        lineaBase: "Más del 60% de los jóvenes rurales encuestados proyecta su futuro laboral fuera del campo.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "E1.2",
        tipo: "efecto",
        nivel: 1,
        padre: "P",
        enunciado: "Debilitamiento de la economía campesina y reducción de ingresos familiares en veredas",
        evidencia: "Percepción de familias rurales y diagnósticos de la Secretaría de Agricultura.",
        lineaBase: "Ingresos medios agropecuarios juveniles por debajo del salario mínimo legal.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C1.1",
        tipo: "causa",
        nivel: 1,
        padre: "P",
        enunciado: "Oferta de empleo rural formal y remunerado para jóvenes escasa e inestable",
        evidencia: "Factor laboral identificado y problemas percibidos por jóvenes rurales y productores.",
        lineaBase: "Menos del 15% de jóvenes rurales ocupados cuenta con contrato formal y seguridad social.",
        confianza: "Alta",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C2.1",
        tipo: "causa",
        nivel: 2,
        padre: "C1.1",
        enunciado: "Baja rentabilidad y escasa capacidad de contratación formal en fincas tradicionales",
        evidencia: "Problemas percibidos por productores sobre costos de producción y mano de obra.",
        lineaBase: "Fincas tradicionales con márgenes netos reducidos en venta de café pergamino estándar.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C3.1",
        tipo: "causa",
        nivel: 3,
        padre: "C2.1",
        enunciado: "Predominio de producción primaria tradicional con mínima agregación de valor local",
        evidencia: "Diagnóstico socioeconómico de la Secretaría de Agricultura de Manizales.",
        lineaBase: "Más del 80% de la producción se vende en materia prima sin transformación ni marca.",
        confianza: "Alta",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C3.2",
        tipo: "causa",
        nivel: 3,
        padre: "C2.1",
        enunciado: "Alta estacionalidad en la demanda de jornales y elevados costos de intermediación",
        evidencia: "Registros de ciclos de cosecha cafetera y comercialización de intermediarios locales.",
        lineaBase: "Picos de empleo concentrados únicamente en 3 meses del año durante cosecha principal.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C2.2",
        tipo: "causa",
        nivel: 2,
        padre: "C1.1",
        enunciado: "Dispersión y bajo conocimiento de convocatorias y oportunidades de empleo rural",
        evidencia: "Insumo de jóvenes rurales y Secretaría de Agricultura.",
        lineaBase: "Ausencia de un canal unificado de intermediación laboral para los corregimientos.",
        confianza: "Baja",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C1.2",
        tipo: "causa",
        nivel: 1,
        padre: "P",
        enunciado: "Acceso restringido de los jóvenes a tierra, activos productivos y capital inicial de trabajo",
        evidencia: "Factor productivo/financiero y problemas percibidos por jóvenes emprendedores.",
        lineaBase: "Menos del 8% de jóvenes rurales de Manizales posee títulos de propiedad o tierra propia.",
        confianza: "Alta",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C2.3",
        tipo: "causa",
        nivel: 2,
        padre: "C1.2",
        enunciado: "Altas barreras económicas y legales para la titulación y arrendamiento seguro de tierras",
        evidencia: "Insumo de familias rurales y registros de tenencia de tierras del municipio.",
        lineaBase: "Costos de arrendamiento elevados y falta de contratos formales a largo plazo.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C3.3",
        tipo: "causa",
        nivel: 3,
        padre: "C2.3",
        enunciado: "Esquemas de banco de tierras o figuras de comodato asociativo juvenil inexistentes en el municipio",
        evidencia: "Revisión de programas municipales de tierras y fomento rural.",
        lineaBase: "Cero figuras de banco de tierras público implementadas a nivel corregimental.",
        confianza: "Baja",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C2.4",
        tipo: "causa",
        nivel: 2,
        padre: "C1.2",
        enunciado: "Oferta crediticia rígida con garantías y requisitos inaccesibles para proyectos juveniles",
        evidencia: "Revisión de líneas de microcrédito agropecuario y requisitos de banca tradicional.",
        lineaBase: "Rechazo de más del 70% de solicitudes de crédito agropecuario juvenil por falta de historial.",
        confianza: "Alta",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C3.4",
        tipo: "causa",
        nivel: 3,
        padre: "C2.4",
        enunciado: "Escasez de fondos de capital semilla no reembolsables adaptados al perfil del joven rural",
        evidencia: "Fondo Emprender SENA e incentivos municipales de la Secretaría de Agricultura.",
        lineaBase: "Cupos anuales de capital semilla alcanzan a cubrir a menos del 10% de demandantes.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C1.3",
        tipo: "causa",
        nivel: 1,
        padre: "P",
        enunciado: "Desarticulación entre los programas formativos y la vocación productiva territorial",
        evidencia: "Factor educativo y problemas percibidos por colegios rurales, SENA y universidades.",
        lineaBase: "Baja tasa de inserción en actividades rurales de egresados de media técnica agropecuaria.",
        confianza: "Alta",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C2.5",
        tipo: "causa",
        nivel: 2,
        padre: "C1.3",
        enunciado: "Contenidos curriculares desactualizados y poco orientados a la innovación y agroindustria",
        evidencia: "Mesas de trabajo de educación rural e instituciones educativas.",
        lineaBase: "Mallas curriculares enfocadas en labores tradicionales sin componentes de biotecnología o TIC.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C3.5",
        tipo: "causa",
        nivel: 3,
        padre: "C2.5",
        enunciado: "Escasas experiencias de formación práctica directamente en fincas modelo y parcelas demostrativas",
        evidencia: "Insumo de docentes y egresados de colegios rurales.",
        lineaBase: "Menos del 25% del tiempo formativo se dedica a prácticas aplicadas en campo.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C2.6",
        tipo: "causa",
        nivel: 2,
        padre: "C1.3",
        enunciado: "Asistencia técnica y acompañamiento productivo discontinuos tras culminar la capacitación",
        evidencia: "Reportes de extensión agropecuaria municipal y comités de cafeteros.",
        lineaBase: "Frecuencia promedio de visitas técnicas inferior a 2 visitas al año por emprendimiento.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C3.6",
        tipo: "causa",
        nivel: 3,
        padre: "C2.6",
        enunciado: "Seguimiento en campo y acompañamiento técnico deficientes para la consolidación de planes de negocio juveniles",
        evidencia: "Tasa de mortalidad de emprendimientos rurales en los primeros 18 meses.",
        lineaBase: "Más del 50% de proyectos productivos juveniles cesa actividades tras el primer año.",
        confianza: "Baja",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C1.4",
        tipo: "causa",
        nivel: 1,
        padre: "P",
        enunciado: "Debilidad en esquemas de asociatividad juvenil y canales de comercialización directa",
        evidencia: "Factor comercial/organizacional y percepción de asociaciones y compradores.",
        lineaBase: "Menos del 12% de jóvenes rurales participa activamente en asociaciones de productores.",
        confianza: "Alta",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C2.7",
        tipo: "causa",
        nivel: 2,
        padre: "C1.4",
        enunciado: "Baja representatividad e incentivos para la participación juvenil en asociaciones existentes",
        evidencia: "Insumo de asociaciones de productores y comités gremiales.",
        lineaBase: "Estatutos asociativos sin capítulos juveniles ni cuotas de participación en juntas directivas.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C3.7",
        tipo: "causa",
        nivel: 3,
        padre: "C2.7",
        enunciado: "Estructuras organizativas cerradas con limitados incentivos para el relevo de liderazgos",
        evidencia: "Entrevistas diagnósticas con líderes comunitarios y jóvenes de corregimientos.",
        lineaBase: "Promedio de permanencia de juntas directivas superior a 10 años en organizaciones rurales.",
        confianza: "Baja",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C2.8",
        tipo: "causa",
        nivel: 2,
        padre: "C1.4",
        enunciado: "Dificultades para acceder a mercados diferenciados, empaque, marcas y circuitos directos",
        evidencia: "Fuente institucional de la Secretaría de Agricultura sobre Mercado Campesino.",
        lineaBase: "Menos del 10% de productos juveniles cuenta con marca propia, registro sanitario y empaque comercial.",
        confianza: "Alta",
        origen: "Revisión CEPAL",
        esAccion: false
    },
    {
        codigo: "C3.8",
        tipo: "causa",
        nivel: 3,
        padre: "C2.8",
        enunciado: "Insuficiente infraestructura logística, de acopio y transporte para iniciativas de jóvenes",
        evidencia: "Diagnóstico de comercialización rural de Manizales.",
        lineaBase: "Falta de rutas de recolección y centros de consolidación logística en corregimientos.",
        confianza: "Media",
        origen: "Revisión CEPAL",
        esAccion: false
    }
];

const CEPAL_EAP = {
    fin: "Contribuir a la sostenibilidad del desarrollo rural y al relevo generacional productivo en el municipio de Manizales.",
    proposito: "Jóvenes de la zona rural de Manizales acceden y consolidan oportunidades laborales, productivas, formativas y comerciales que hacen viable y atractiva su permanencia en el territorio.",
    componentes: [
        {
            codigo: "COMP-1",
            nombre: "Rutas de vinculación laboral y agregación de valor rural articuladas",
            causa_asociada: "C1.1",
            actividades: [
                "Caracterizar las unidades productivas rurales con potencial de contratación y aprendizaje juvenil en los siete corregimientos.",
                "Diseñar e implementar acuerdos de vinculación laboral formal y pasantías remuneradas con productores y gremios agropecuarios.",
                "Implementar programas de capacitación y dotación para la transformación y agregación de valor en origen (cafés especiales, agroindustria).",
                "Poner en funcionamiento una ventanilla única territorial de orientación, intermediación laboral y oportunidades para jóvenes rurales."
            ]
        },
        {
            codigo: "COMP-2",
            nombre: "Mecanismos de acceso a tierras, capital semilla y activos productivos implementados",
            causa_asociada: "C1.2",
            actividades: [
                "Estructurar e implementar un programa piloto de banco de tierras y contratos de arrendamiento seguro para jóvenes rurales.",
                "Constituir y operar un fondo rotatorio de capital semilla e incentivos no reembolsables para emprendimientos juveniles.",
                "Facilitar paquetes tecnológicos, dotación de herramientas y maquinaria menor adaptada a iniciativas agropecuarias juveniles.",
                "Brindar asesoría técnica y financiera especializada para la formulación, sustentación y ejecución de planes de inversión productiva."
            ]
        },
        {
            codigo: "COMP-3",
            nombre: "Oferta formativa aplicada y asistencia técnica continua en territorio fortalecidas",
            causa_asociada: "C1.3",
            actividades: [
                "Concertar y actualizar con el SENA, colegios rurales y universidades mallas curriculares enfocadas en innovación agropecuaria y TIC.",
                "Establecer parcelas demostrativas y fincas modelo en los corregimientos para el desarrollo de prácticas y formación en campo.",
                "Prestar asistencia técnica integral y acompañamiento socioempresarial continuo a iniciativas juveniles poscapacitación.",
                "Implementar un programa de mentorías intergeneracionales con productores destacados y comités cafeteros."
            ]
        },
        {
            codigo: "COMP-4",
            nombre: "Canales de comercialización directa y asociatividad juvenil rural consolidados",
            causa_asociada: "C1.4",
            actividades: [
                "Promover la conformación de comités juveniles y reformas estatutarias en asociaciones y cooperativas agropecuarias.",
                "Diseñar y registrar marcas colectivas territoriales, etiquetas, empaques y certificaciones de calidad para productos juveniles.",
                "Habilitar y consolidar espacios permanentes de venta directa en Mercados Campesinos y circuitos comerciales urbanos de Manizales.",
                "Suscribir acuerdos comerciales de proveeduría directa con compradores urbanos, restaurantes y cadenas del sector HORECA."
            ]
        }
    ]
};

function emptyCase() {
    return {
        id: "",
        titulo: "",
        nombre: "",
        sector: "",
        territorio: { municipio: "", departamento: "", pais: "", zona: "", corregimientos: "" },
        periodo: "",
        poblacion: { principal: "", rango_edad: "", poblaciones_relacionadas: [] },
        problema: { central: "", situacion_actual: "", pregunta_orientadora: "", delimitacion: "" },
        factores_identificados: [],
        involucrados: [],
        fuentes: [],
        participacion: { tecnica: "", justificacion: "" },
        estado: {},
        artefacto: { nodos: [], bitacora: [], eap: null }
    };
}

let D = normalize(BASE_JSON);
let current = 0;
let treeViewMode = "smartart"; // "smartart" | "eap_mapping" | "levels"

function normalize(raw) {
    const info = raw.caso || raw;
    const terr = raw.territorio || {}, pob = raw.poblacion || {}, prob = raw.problema || {};
    const artefacto = raw.artefacto || {};
    return {
        sourceJSON: raw,
        caso: {
            id: info.id || "", titulo: info.titulo || info.nombre || "", nombre: info.nombre || "",
            sector: info.sector || "", lugar: terr.municipio || "", municipio: terr.municipio || "",
            departamento: terr.departamento || "", pais: terr.pais || "", zona: terr.zona || "",
            corregimientos: terr.corregimientos || "", poblacion: pob.principal || "",
            rangoEdad: pob.rango_edad || "", poblacionesRelacionadas: pob.poblaciones_relacionadas || [],
            periodo: raw.periodo || "2026-2", situacion: prob.situacion_actual || "",
            preguntaOrientadora: prob.pregunta_orientadora || "", delimitacion: prob.delimitacion || "",
            problemaJSON: prob.central || "", evidencia: (raw.fuentes || []).map(x => x.titulo || "").filter(Boolean).join("; ")
        },
        involucrados: (raw.involucrados || []).map((a, i) => ({
            id: a.id || "json-" + i, grupo: a.grupo || "", naturaleza: a.naturaleza || "", relacion: a.relacion || "",
            rol: a.rol || "", intereses: a.intereses || [], problemas_percibidos: a.problemas_percibidos || [],
            recursos_mandatos: a.recursos_mandatos || [], posicion: a.posicion || "0",
            fuerza: Number(a.fuerza || 0), intensidad: Number(a.intensidad || 0),
            justificacion: a.justificacion || a.razon || a.justificación || "",
            estrategia: a.estrategia || "", origen: a.origen || "Importado desde JSON", confianza: a.confianza || "Preliminar"
        })),
        problema: { central: prob.central || "", cond: "", atributo: "", poblacion: pob.principal || "", delim: prob.delimitacion || "" },
        factores: raw.factores_identificados || [], fuentes: raw.fuentes || [],
        participacion: raw.participacion || {}, estado: raw.estado || {},
        nodos: Array.isArray(artefacto.nodos) && artefacto.nodos.length ? artefacto.nodos : Array.isArray(raw.nodos) && raw.nodos.length ? raw.nodos : cloneData(CEPAL_PROBLEM_TREE),
        eap: artefacto.eap || raw.eap || cloneData(CEPAL_EAP),
        candidatos: [], bitacora: Array.isArray(artefacto.bitacora) ? artefacto.bitacora : Array.isArray(raw.bitacora) ? raw.bitacora : []
    };
}

function cloneData(v) { return JSON.parse(JSON.stringify(v)); }

function buildNav() {
    const main = document.getElementById("nav"), sit = document.getElementById("navSituational"), mat = document.getElementById("navMatrix");
    if (!main || !sit || !mat) return;
    main.innerHTML = ""; sit.innerHTML = ""; mat.innerHTML = "";
    navItems.forEach(([id, label, group]) => {
        const b = document.createElement("button");
        b.id = "nav" + id;
        b.innerHTML = `<span class="num">${id === "0" ? "⌂" : id}</span><span>${label}</span>`;
        b.onclick = () => show(Number(id));
        (id === "0" ? main : group === "Análisis situacional" ? sit : mat).appendChild(b);
    });
    const extra = [
        ["screenSources", "Fuentes", "↗"], ["screenPrompts", "Prompts IA", "✦"], ["screenLog", "Bitácora", "✓"]
    ];
    extra.forEach(([screen, label, icon]) => {
        const b = document.createElement("button");
        b.innerHTML = `<span class="num">${icon}</span><span>${label}</span>`;
        b.onclick = () => showExtra(screen);
        mat.appendChild(b);
    });
}

function show(i) {
    current = i;
    document.querySelectorAll(".screen").forEach(x => x.classList.remove("active"));
    const target = document.getElementById("screen" + i);
    if (target) target.classList.add("active");
    document.querySelectorAll(".nav button").forEach(x => x.classList.remove("active"));
    document.getElementById("nav" + i)?.classList.add("active");
    render();
}

function showExtra(id) {
    document.querySelectorAll(".screen").forEach(x => x.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) target.classList.add("active");
    document.querySelectorAll(".nav button").forEach(x => x.classList.remove("active"));
    render();
}

function esc(s) { return String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])) }
function arr(v) { return Array.isArray(v) ? v : (v ? [String(v)] : []) }
function join(v) { return arr(v).join(" · ") }

function saveLocal(silent = false) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(D)); if (!silent) alert("Trabajo guardado en este navegador."); }
    catch (e) { if (!silent) alert("No fue posible usar almacenamiento local. Usa Exportar JSON."); }
}

function addLog(target, entry) {
    target.bitacora = Array.isArray(target.bitacora) ? target.bitacora : [];
    target.bitacora.unshift(Object.assign({ fecha: new Date().toISOString() }, entry));
}

function exportJSON() {
    const payload = JSON.parse(JSON.stringify(D.sourceJSON || {}));
    payload.id = D.caso.id;
    payload.titulo = D.caso.titulo;
    payload.sector = D.caso.sector;
    payload.caso = Object.assign({}, payload.caso || {}, {
        id: D.caso.id,
        titulo: D.caso.titulo,
        nombre: D.caso.nombre,
        sector: D.caso.sector
    });
    payload.territorio = {
        pais: D.caso.pais, departamento: D.caso.departamento, municipio: D.caso.municipio,
        zona: D.caso.zona, corregimientos: D.caso.corregimientos
    };
    payload.periodo = D.caso.periodo;
    payload.poblacion = {
        principal: D.caso.poblacion, rango_edad: D.caso.rangoEdad,
        poblaciones_relacionadas: D.caso.poblacionesRelacionadas
    };
    payload.problema = payload.problema || {};
    payload.problema.central = D.problema.central;
    payload.problema.situacion_actual = D.caso.situacion;
    payload.problema.pregunta_orientadora = D.caso.preguntaOrientadora;
    payload.problema.delimitacion = D.caso.delimitacion;
    payload.factores_identificados = D.factores;
    payload.involucrados = D.involucrados;
    payload.fuentes = D.fuentes;
    payload.participacion = D.participacion;
    payload.estado = Object.assign({}, payload.estado || {}, D.estado || {});
    payload.artefacto = {
        nodos: D.nodos,
        eap: D.eap || null,
        bitacora: D.bitacora,
        ultima_actualizacion: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "caso_mml_actualizado.json"; a.click(); URL.revokeObjectURL(a.href);
}

document.getElementById("fileInput")?.addEventListener("change", e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
        try {
            const raw = JSON.parse(r.result);
            const previousLog = Array.isArray(D.bitacora) ? D.bitacora.slice() : [];
            const importedLog = Array.isArray(raw?.artefacto?.bitacora) ? raw.artefacto.bitacora.slice() :
                Array.isArray(raw?.bitacora) ? raw.bitacora.slice() : [];
            D = normalize(raw);
            const merged = [...importedLog, ...previousLog];
            const seen = new Set();
            D.bitacora = merged.filter(x => {
                const key = JSON.stringify([x.fecha || "", x.patron || "", x.prompt || "", x.salida || "", x.correccion || ""]);
                if (seen.has(key)) return false; seen.add(key); return true;
            });
            D.bitacora.unshift({
                fecha: new Date().toISOString(),
                patron: "Carga de JSON",
                proposito: "Cargar un caso de trabajo desde un archivo JSON.",
                prompt: `Archivo cargado: ${f.name}`,
                salida: `Caso "${D.caso.titulo || "Sin título"}" cargado. ${D.involucrados.length} involucrados, ${D.nodos.length} nodos del árbol y ${D.fuentes.length} fuentes.`,
                error_modelo: "La carga reemplaza el modelo activo. Los cambios no exportados podrían perderse.",
                como_se_detecto: "Verificación de la estructura cargada y cálculo de indicadores de consistencia.",
                correccion: "Se conserva la bitácora previa y se registra esta carga como evento de trazabilidad."
            });
            saveLocal(true);
            render();
            alert("JSON importado correctamente.\n\nEl árbol y los datos quedaron sincronizados y registrados en la Bitácora.");
        } catch (err) {
            console.error(err);
            alert("El archivo no contiene un JSON válido.");
        }
    };
    r.readAsText(f);
});

function renderCase() {
    const c = D.caso;
    const topTitle = document.getElementById("topTitle");
    if (topTitle) topTitle.textContent = c.titulo || "Nuevo caso";
    const heroTitle = document.getElementById("heroTitle");
    if (heroTitle) heroTitle.textContent = c.titulo || c.nombre || "Nuevo caso";
    const metas = [
        ["Sector", c.sector], ["Territorio", `${c.municipio}, ${c.departamento}`],
        ["Zona", c.zona], ["Corregimientos", c.corregimientos],
        ["Población", c.poblacion], ["Rango de edad", c.rangoEdad || "No registrado"],
        ["Poblaciones relacionadas", join(c.poblacionesRelacionadas)], ["Periodo", c.periodo || "2026-2"]
    ];
    const caseMeta = document.getElementById("caseMeta");
    if (caseMeta) caseMeta.innerHTML = metas.map(x => `<div class="meta"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join("");
    const caseSituation = document.getElementById("caseSituation");
    if (caseSituation) caseSituation.textContent = c.situacion;
    const caseDelim = document.getElementById("caseDelim");
    if (caseDelim) caseDelim.textContent = c.delimitacion;
    const caseQuestion = document.getElementById("caseQuestion");
    if (caseQuestion) caseQuestion.textContent = c.preguntaOrientadora;
    const factorTags = document.getElementById("factorTags");
    if (factorTags) factorTags.innerHTML = D.factores.map(f => `<span class="tag">${esc(f.factor)} · ${esc(f.tipo)}</span>`).join("");
}

function splitActorText(v) {
    return String(v || "").split(";").map(x => x.trim()).filter(Boolean);
}

function addActor() {
    const grupo = document.getElementById("actorGrupo").value.trim();
    if (!grupo) { alert("Escribe el nombre o grupo del involucrado."); return; }
    if (!document.getElementById("actorJustificacion").value.trim()) { alert("Justifica la posición, fuerza e intensidad."); return; }
    const actor = {
        id: "manual-" + Date.now(),
        grupo,
        naturaleza: document.getElementById("actorNaturaleza").value,
        relacion: document.getElementById("actorRelacion").value.trim(),
        rol: document.getElementById("actorRol").value.trim(),
        intereses: splitActorText(document.getElementById("actorIntereses").value),
        problemas_percibidos: splitActorText(document.getElementById("actorProblemas").value),
        recursos_mandatos: splitActorText(document.getElementById("actorRecursos").value),
        posicion: document.getElementById("actorPosicion").value,
        fuerza: Math.max(1, Math.min(5, Number(document.getElementById("actorFuerza").value) || 3)),
        intensidad: Math.max(1, Math.min(5, Number(document.getElementById("actorIntensidad").value) || 3)),
        justificacion: document.getElementById("actorJustificacion").value.trim(),
        estrategia: document.getElementById("actorEstrategia").value.trim(),
        origen: "Agregado por el formulador",
        confianza: "Pendiente de validación"
    };
    D.involucrados.push(actor);
    clearActorForm();
    const msg = document.getElementById("actorAddedMessage");
    if (msg) msg.innerHTML = `<div class="actor-added">✓ Involucrado agregado: <strong>${esc(actor.grupo)}</strong>. Ya forma parte del modelo y se incluirá al exportar el JSON.</div>`;
    renderActors();
    saveLocal(true);
}

function clearActorForm() {
    ["actorGrupo", "actorRelacion", "actorRol", "actorJustificacion", "actorIntereses", "actorProblemas", "actorRecursos", "actorEstrategia"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
    const nat = document.getElementById("actorNaturaleza"); if (nat) nat.value = "Comunidad";
    const pos = document.getElementById("actorPosicion"); if (pos) pos.value = "+";
    const f = document.getElementById("actorFuerza"); if (f) f.value = 3;
    const i = document.getElementById("actorIntensidad"); if (i) i.value = 3;
}

function removeActor(id) {
    const actor = D.involucrados.find(a => a.id === id);
    if (!actor) return;
    if (!confirm(`¿Eliminar a "${actor.grupo}"?`)) return;
    D.involucrados = D.involucrados.filter(a => a.id !== id);
    renderActors();
    saveLocal(true);
}

function renderActors() {
    const actors = D.involucrados;
    const actorCount = document.getElementById("actorCount");
    if (actorCount) actorCount.textContent = `${actors.length} actores`;
    const actorsTable = document.getElementById("actorsTable");
    if (actorsTable) {
        actorsTable.innerHTML = actors.map(a => {
            const fi = (a.fuerza || 0) * (a.intensidad || 0), sign = a.posicion === "+" ? "+" : a.posicion === "-" ? "−" : "0";
            return `<tr><td><strong>${esc(a.grupo)}</strong><br><span class="pill">${esc(a.naturaleza)}</span></td>
        <td>${esc(a.relacion)}<br><small>${esc(a.rol)}</small></td>
        <td>${esc(join(a.intereses))}</td><td>${esc(join(a.problemas_percibidos))}</td>
        <td><strong>${sign}</strong></td><td><strong>${fi}</strong><br><small>F${a.fuerza} × I${a.intensidad}</small></td>
        <td><button class="btn" onclick="removeActor('${esc(a.id)}')">Eliminar</button></td></tr>`;
        }).join("");
    }

    const char = document.getElementById("characterizationTable");
    if (char) {
        char.innerHTML = actors.map(a => {
            const f = Math.max(0, Math.min(5, Number(a.fuerza) || 0));
            const i = Math.max(0, Math.min(5, Number(a.intensidad) || 0));
            const sign = a.posicion === "+" ? "+" : a.posicion === "-" ? "−" : "0";
            const cls = a.posicion === "-" ? "negative" : a.posicion === "0" ? "neutral" : "";
            const fi = f * i;
            const bars = n => Array.from({ length: 5 }, (_, k) => `<i class="${k < n ? "on" : ""}"></i>`).join("");
            const quadrant = (f >= 4 && i >= 4) ? "Gestionar de cerca" : (f >= 4 && i < 4) ? "Mantener satisfecho" : (f < 4 && i >= 4) ? "Mantener informado" : "Monitorear";
            const just = a.justificacion || a.razon || "Pendiente de justificación.";
            return `<tr>
        <td><div class="char-value"><span class="char-score ${cls}">${sign}</span><div><div class="char-person">${esc(a.grupo)}</div><span class="char-sub">${a.posicion === "+" ? "A favor" : a.posicion === "-" ? "En contra" : "Neutral"}</span></div></div></td>
        <td><strong>${f}/5</strong><div class="char-bars">${bars(f)}</div><span class="char-sub">${esc(a.rol || "Rol pendiente")}</span></td>
        <td><strong>${i}/5</strong><div class="char-bars">${bars(i)}</div><div class="char-result">F × I = <strong>${fi}</strong> · ${quadrant}</div><div class="char-justification">${esc(just)}</div></td>
      </tr>`;
        }).join("") || `<tr><td colspan="3"><div class="empty">No hay involucrados registrados.</div></td></tr>`;
    }
}

function restoreProblem() {
    D.problema.central = D.caso.problemaJSON || "Dificultades para consolidar oportunidades laborales y productivas suficientemente atractivas para favorecer la permanencia de los jóvenes en la zona rural de Manizales.";
    const el = document.getElementById("problemCentral");
    if (el) el.value = D.problema.central;
    validateProblem();
    renderProblemContext();
}

const MANUAL_PROBLEM_CRITERIA = [
    [7, "Está en el ámbito de gobernabilidad del caso y del equipo formulador."],
    [8, "Los involucrados de mayor fuerza e intensidad lo reconocen como problema prioritario."],
    [9, "Ocupa una posición intermedia en la cadena causal (entre causas raíces y efectos finales)."],
    [10, "Puede leerse en voz alta en una sola oración clara sin aclaraciones entre paréntesis."]
];

function buildEAPFromTree() {
    return D.eap || cloneData(CEPAL_EAP);
}

function setTreeViewMode(mode) {
    treeViewMode = mode;
    renderTree();
}

function loadCEPALCaseTree() {
    if (D.nodos.length && !confirm("Esto reemplazará los nodos actuales por el árbol jerárquico revisado según los criterios de CEPAL/ILPES y la Sesión 2. ¿Deseas continuar?")) return;
    if (!D.problema.central) {
        D.problema.central = D.caso.problemaJSON || "Dificultades para consolidar oportunidades laborales y productivas suficientemente atractivas para favorecer la permanencia de los jóvenes en la zona rural de Manizales.";
    }
    D.nodos = cloneData(CEPAL_PROBLEM_TREE);
    D.eap = cloneData(CEPAL_EAP);
    D.fuentes = Array.isArray(D.fuentes) ? D.fuentes : [];
    if (!D.fuentes.some(f => /S057518_es\.pdf|Manual CEPAL\/ILPES/i.test(`${f.titulo || ""} ${f.url || ""}`))) {
        D.fuentes.push({
            tipo: "Metodológica",
            titulo: "Manual CEPAL/ILPES S057518_es: Metodología del marco lógico",
            url: "../Fuentes/S057518_es.pdf",
            aporte: "Soporta la construcción del árbol de problemas con relaciones jerárquicas, la conversión a objetivos y la EAP de 4 componentes con 4 actividades cada uno."
        });
    }
    addLog(D, {
        patron: "Revisión metodológica CEPAL / ILPES",
        proposito: "Reemplazar la salida plana por un árbol jerárquico encadenado por niveles con causas en negativo y derivación a EAP.",
        prompt: "Construcción jerárquica guiada por el Manual CEPAL/ILPES S057518_es.",
        salida: "Se cargaron 20 nodos encadenados (E2, E1, P, C1, C2, C3) y la EAP con 4 componentes y 16 actividades.",
        error_modelo: "No se admiten causas automáticas sin editar ni listas planas colgadas del problema.",
        como_se_detecto: "Observación del docente y contraste con el procedimiento CEPAL de árbol de problemas.",
        correccion: "Se estructuró el árbol por jerarquía causal ramificada y se vincularon las raíces a componentes y actividades operativas."
    });
    render();
    saveLocal(true);
    alert("Árbol jerárquico CEPAL cargado exitosamente.\n\nIncluye 4 ramas causales, causas intermedias, causas raíz y 4 componentes con 4 actividades cada uno.");
}

function renderProblemContext() {
    const actors = D.involucrados || [];
    const probs = [];
    actors.forEach(a => (a.problemas_percibidos || []).forEach(x => { if (x && !probs.includes(x)) probs.push(x) }));
    const pb = document.getElementById("perceivedProblems");
    if (pb) pb.innerHTML = probs.length ? probs.map(x => `<span class="chip">${esc(x)}</span>`).join("") : "<span class='small-note'>No hay problemas percibidos registrados.</span>";
    const fb = document.getElementById("factorInputs");
    if (fb) fb.innerHTML = (D.factores || []).length ? D.factores.map(x => `<span class="chip">${esc(x.factor || x)} · ${esc(x.tipo || "Factor")}</span>`).join("") : "<span class='small-note'>No hay factores precargados.</span>";
    const mc = document.getElementById("problemManualChecks");
    if (mc) {
        mc.innerHTML = MANUAL_PROBLEM_CRITERIA.map(([n, t]) => `<label class="manual-check"><input type="checkbox" id="manualC${n}" checked onchange="validateProblem()"><span><strong>${n}.</strong> ${esc(t)}</span></label>`).join("");
    }
}

function validateProblem() {
    const t = (document.getElementById("problemCentral")?.value || "").trim();
    D.problema.central = t;

    const c1 = !!t && t.length > 5 && !/^(capacitar|crear|construir|implementar|diseñar|desarrollar|promover|fortalecer|realizar|garantizar)\b/i.test(t) && /\b(dificultad|dificultades|limitad[ao]s?|insuficiente|inestable|bajo|baja|escas[ao]|restringid[ao]|débil|deterioro|brecha|barrera)\b/i.test(t);
    const c2 = !!t && !/\b(falta\s+de|faltan|no\s+hay|ausencia\s+de|se\s+requiere|necesidad\s+de|crear|construir|implementar|capacitar|plataforma|app|aplicación|centro\s+de)\b/i.test(t);
    const c3 = !!t && /\b(j[oó]ven(?:es)?|juventud|poblaci[oó]n\s+juvenil)\b/i.test(t);
    const c4 = !!t && /\b(manizales|zona\s+rural|corregimiento(?:s)?|vereda(?:s)?|caldas)\b/i.test(t);
    const c5 = !!t && t.length >= 25 && t.length <= 260 && !t.includes("\n");
    const c6 = !!t && !/\b(y además|así como también|junto con ello|y por otra parte)\b/i.test(t);

    const auto = [
        {
            num: 1,
            ok: c1,
            label: "1. Estado negativo existente",
            msg: c1 ? "Expresa una situación negativa real y verificable (no una acción en infinitivo)." : "Debe redactarse como un estado negativo existente (ej. dificultades, limitaciones, brechas), no como una acción."
        },
        {
            num: 2,
            ok: c2,
            label: "2. No incorpora una solución predeterminada",
            msg: c2 ? "No incorpora carencias de solución ni nombres de intervenciones preconcebidas." : "Evita formular el problema como la carencia de una solución específica (ej. 'falta de...') o adelantar intervenciones."
        },
        {
            num: 3,
            ok: c3,
            label: "3. Población afectada identificable",
            msg: c3 ? "Identifica claramente a la población objetivo (jóvenes rurales del municipio)." : "El enunciado debe especificar la población directamente afectada (jóvenes rurales)."
        },
        {
            num: 4,
            ok: c4,
            label: "4. Territorio delimitado",
            msg: c4 ? "Delimita con precisión el ámbito territorial (Manizales / zona rural)." : "El enunciado debe delimitar la ubicación territorial específica del proyecto (Manizales / zona rural)."
        },
        {
            num: 5,
            ok: c5,
            label: "5. Extensión controlada (oración única)",
            msg: c5 ? "Extensión adecuada; se lee fluidamente en una sola oración continua." : "El enunciado debe poder leerse como una sola oración continua y sintética (máximo 260 caracteres)."
        },
        {
            num: 6,
            ok: c6,
            label: "6. Un solo núcleo problemático",
            msg: c6 ? "Concentra el análisis en un solo núcleo problemático bien definido." : "Revisa si se están uniendo dos o más problemas no relacionados en el mismo enunciado."
        }
    ];

    const manual = MANUAL_PROBLEM_CRITERIA.map(([n, label]) => {
        const checked = document.getElementById(`manualC${n}`)?.checked ?? true;
        return {
            num: n,
            ok: checked,
            label: `${n}. ${label}`,
            msg: checked ? "Declaración favorable: criterio confirmado y verificado por el equipo formulador." : "Declaración pendiente: marca la casilla para confirmar el cumplimiento de este criterio."
        };
    });

    const all = [...auto, ...manual];
    const autoPassed = auto.filter(x => x.ok).length;
    const manualPassed = manual.filter(x => x.ok).length;
    const totalPassed = autoPassed + manualPassed;

    const box = document.getElementById("problemChecks");
    if (box) {
        box.innerHTML = `<div class="checks">${all.map(c => `
            <div class="check ${c.ok ? "ok" : "bad"}">
                <span class="icon">${c.ok ? "✓" : "✕"}</span>
                <div>
                    <strong>${esc(c.label)}</strong>
                    <div class="check-msg">${esc(c.msg)}</div>
                </div>
            </div>
        `).join("")}</div>`;
    }

    const st = document.getElementById("validationStatus");
    if (st) {
        st.textContent = `${totalPassed}/10 criterios favorables (${autoPassed}/6 automáticos · ${manualPassed}/4 manuales)`;
        st.className = totalPassed === 10 ? "pill" : totalPassed >= 7 ? "pill gold" : "pill red";
    }

    runTreeValidation();
    saveLocal(true);
}

function refreshParentOptions() {
    const type = document.getElementById("nodeType")?.value || "causa";
    const level = Number(document.getElementById("nodeLevel")?.value || 1);
    const sel = document.getElementById("nodeParent");
    if (!sel) return;

    let parents = [];
    if (level === 1) {
        parents = [{ codigo: "P", enunciado: D.problema.central || "Problema central" }];
    } else {
        const targetLevel = level - 1;
        parents = D.nodos.filter(n => n.tipo === type && Number(n.nivel) === targetLevel);
    }
    sel.innerHTML = parents.length
        ? parents.map(p => `<option value="${esc(p.codigo)}">${esc(p.codigo)} · ${esc(p.enunciado.slice(0, 65))}${p.enunciado.length > 65 ? "..." : ""}</option>`).join("")
        : `<option value="">No hay nodos en el nivel ${level - 1}. Crea primero el nivel anterior.</option>`;

    const q = document.getElementById("whyQuestion");
    if (q) {
        if (type === "causa") {
            q.textContent = level === 1
                ? "¿Por qué ocurre el problema central? (Formula una causa directa en estado negativo)"
                : `¿Por qué ocurre «${parents[0]?.enunciado || "el nodo padre"}»? (Profundiza la causa)`;
        } else {
            q.textContent = level === 1
                ? "¿Qué consecuencia directa genera el problema central en el territorio?"
                : `¿Qué efecto posterior produce «${parents[0]?.enunciado || "el nodo padre"}»?`;
        }
    }
}

function nextCode(type, level) {
    const p = type === "causa" ? "C" : "E";
    const nums = D.nodos
        .filter(n => n.tipo === type && Number(n.nivel) === level)
        .map(n => {
            const m = String(n.codigo).match(/\.(\d+)$/);
            return m ? Number(m[1]) : 0;
        });
    const nextNum = (nums.length ? Math.max(...nums) : 0) + 1;
    return `${p}${level}.${nextNum}`;
}

function addNode() {
    const type = document.getElementById("nodeType").value;
    const level = Number(document.getElementById("nodeLevel").value);
    const text = document.getElementById("nodeText").value.trim();
    const parent = document.getElementById("nodeParent").value;

    if (!text) { alert("Escribe el enunciado del nodo."); return; }
    if (!parent) { alert("No existe un nodo padre válido para este nivel. Crea primero el nivel anterior."); return; }

    const action = /^(capacitar|crear|construir|implementar|diseñar|instalar|desarrollar|entregar|ejecutar|promover|fortalecer|realizar|dotar)\b/i.test(text);
    const node = {
        codigo: nextCode(type, level),
        tipo: type,
        nivel: level,
        padre: parent,
        enunciado: text,
        evidencia: document.getElementById("nodeEvidence").value.trim() || "Pendiente de validación documental.",
        lineaBase: document.getElementById("nodeBaseline").value.trim() || "Pendiente de medición territorial.",
        confianza: document.getElementById("nodeConfidence").value,
        origen: "Formulador",
        esAccion: action
    };

    D.nodos.push(node);
    ["nodeText", "nodeEvidence", "nodeBaseline"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
    renderNodes();
    renderTree();
    runTreeValidation();
    saveLocal(true);

    if (action) {
        alert("Advertencia metodológica:\n\nEl nodo contiene verbos en infinitivo que parecen una acción. En el árbol de problemas de la CEPAL los nodos deben formularse como estados negativos existentes.");
    }
}

function deleteNode(i) {
    const n = D.nodos[i];
    if (!n) return;
    const descendants = D.nodos.filter(x => x.padre === n.codigo);
    if (descendants.length) {
        if (!confirm(`Este nodo (${n.codigo}) tiene ${descendants.length} nodo(s) dependiente(s). Si lo eliminas, esos nodos quedarán huérfanos. ¿Deseas continuar?`)) return;
    }
    D.nodos.splice(i, 1);
    renderNodes();
    renderTree();
    runTreeValidation();
    saveLocal(true);
}

function importAIProposal() {
    const raw = (document.getElementById("aiImport")?.value || "").trim();
    if (!raw) { alert("Pega primero la propuesta JSON."); return; }
    try {
        let cleanRaw = raw.replace(/^```json/i, "").replace(/^```/i, "").replace(/```$/i, "").trim();
        let arr = JSON.parse(cleanRaw);
        if (!Array.isArray(arr)) arr = arr.nodos || [];
        let added = 0;
        arr.forEach(x => {
            if (!x || !x.enunciado) return;
            const type = x.tipo === "efecto" ? "efecto" : "causa";
            const level = Math.min(4, Math.max(1, Number(x.nivel) || 1));
            let parent = level === 1 ? "P" : (x.nodoPadre || x.padre);
            const validParent = level === 1 || D.nodos.some(n => n.codigo === parent && n.tipo === type && Number(n.nivel) === level - 1);
            if (!validParent) parent = level === 1 ? "P" : (D.nodos.find(n => n.tipo === type && Number(n.nivel) === level - 1)?.codigo || "P");

            D.nodos.push({
                codigo: nextCode(type, level),
                tipo: type,
                nivel: level,
                padre: parent,
                enunciado: String(x.enunciado),
                evidencia: x.evidencia || "Propuesta IA pendiente de sustentar con fuentes.",
                lineaBase: x.lineaBase || "Propuesta IA pendiente de línea base.",
                confianza: "Baja",
                origen: "Propuesta IA",
                esAccion: /^(capacitar|crear|construir|implementar|diseñar|instalar|desarrollar|entregar|ejecutar|promover|fortalecer|realizar)\b/i.test(String(x.enunciado))
            });
            added++;
        });
        document.getElementById("aiImport").value = "";
        renderNodes();
        renderTree();
        runTreeValidation();
        addLog(D, {
            patron: "Plantilla de salida",
            proposito: "Incorporar propuesta de nodos de IA como hipótesis revisables.",
            prompt: "JSON de nodos de causas y efectos.",
            salida: `Se importaron ${added} nodos con confianza baja y origen «Propuesta IA».`,
            error_modelo: "La IA no valida evidencia por sí misma.",
            como_se_detecto: "Validación estructural y revisión del formulador.",
            correccion: "Se requiere verificar con involucrados y fuentes documentales antes de aceptar."
        });
        saveLocal(true);
        alert(`${added} nodo(s) importado(s) como propuesta de IA.\n\nRecuerda revisar su redacción, asignarles evidencia y verificar su relación causal.`);
    } catch (e) {
        alert("El texto no es un JSON válido. Revisa que no contenga texto extra fuera de las llaves o corchetes.");
    }
}

function renderNodes() {
    const box = document.getElementById("nodesList");
    const count = document.getElementById("nodeCount");
    if (count) count.textContent = `${D.nodos.length} nodos`;
    if (!box) return;
    if (!D.nodos.length) {
        box.innerHTML = '<div class="empty">No hay nodos en el árbol. Construye las causas y efectos o haz clic en «Cargar árbol revisado CEPAL».</div>';
        return;
    }
    box.innerHTML = D.nodos.map((n, i) => {
        const ai = n.origen === "Propuesta IA";
        const levelLabel = n.tipo === "causa"
            ? (n.nivel === 1 ? "Causa directa (Nivel 1)" : n.nivel === 2 ? "Causa indirecta (Nivel 2)" : "Causa raíz (Nivel " + n.nivel + ")")
            : (n.nivel === 1 ? "Efecto directo (Nivel 1)" : "Efecto indirecto (Nivel " + n.nivel + ")");
        return `<div class="node-card ${ai ? "ai" : "human"}">
            <div class="section-head" style="margin-bottom:8px">
                <div>
                    <span class="code" style="background:${n.tipo === "causa" ? (n.nivel === 1 ? "#2563eb" : n.nivel === 2 ? "#0d9488" : "#16a34a") : (n.nivel === 1 ? "#ea580c" : "#9333ea")}">${esc(n.codigo)}</span>
                    <h4 style="display:inline-block;margin-left:8px">${esc(n.enunciado)}</h4>
                    <div class="node-meta" style="margin-top:4px;font-size:11px;color:#64748b">
                        ${n.tipo === "causa" ? "Causa" : "Efecto"} · ${levelLabel} · Conectado al padre: <strong>${esc(n.padre || "P")}</strong>
                    </div>
                </div>
                <button class="btn" style="padding:4px 8px;font-size:11px" onclick="deleteNode(${i})">Eliminar</button>
            </div>
            <div class="node-badges" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">
                <span class="badge" style="background:#f1f5f9;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700">${levelLabel}</span>
                <span class="badge ${ai ? "ai" : ""}" style="background:${ai ? "#fef3c7;color:#92400e" : "#e0f2fe;color:#0369a1"};padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700">${ai ? "Propuesta IA" : "Formulador"}</span>
                <span class="badge" style="background:#ecfdf5;color:#047857;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700">Confianza ${esc(n.confianza || "Media")}</span>
                ${n.esAccion ? '<span class="badge" style="background:#fee2e2;color:#991b1b;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700">⚠️ Parece acción</span>' : ''}
            </div>
            <p style="margin:0;font-size:11px;color:#475569"><strong>Evidencia:</strong> ${esc(n.evidencia || "Pendiente")} · <strong>Línea base:</strong> ${esc(n.lineaBase || "Pendiente")}</p>
        </div>`;
    }).join("");
}

function renderSmartNode(node, levelClass, levelTag) {
    if (!node) return "";
    return `<div class="smart-node ${levelClass}">
        <div class="smart-node-head">
            <span class="smart-node-code">${esc(node.codigo)}</span>
            <span class="smart-node-level-tag">${esc(levelTag)}</span>
        </div>
        <p class="smart-node-text">${esc(node.enunciado)}</p>
        <div class="smart-node-footer">
            <span>Padre: <strong>${esc(node.padre || "P")}</strong></span>
            <span class="smart-node-badge" style="background:${node.confianza === "Alta" ? "#dcfce7;color:#15803d" : "#f1f5f9;color:#475569"}">${esc(node.confianza || "Media")}</span>
        </div>
    </div>`;
}

function renderTree() {
    const container = document.getElementById("tree");
    if (!container) return;

    const p = D.problema.central || "Dificultades para consolidar oportunidades laborales y productivas suficientemente atractivas para favorecer la permanencia de los jóvenes en la zona rural de Manizales.";
    const nodes = D.nodos || [];

    // Header Toolbar with tabs & legend
    const toolbar = `<div class="tree-toolbar">
        <div class="tree-view-tabs">
            <button class="tree-tab-btn ${treeViewMode === "smartart" ? "active" : ""}" onclick="setTreeViewMode('smartart')">🌳 Árbol Jerárquico SmartArt</button>
            <button class="tree-tab-btn ${treeViewMode === "eap_mapping" ? "active" : ""}" onclick="setTreeViewMode('eap_mapping')">📋 Correspondencia Árbol ↔ EAP (Componentes y Actividades)</button>
            <button class="tree-tab-btn ${treeViewMode === "levels" ? "active" : ""}" onclick="setTreeViewMode('levels')">📑 Vista por Niveles CEPAL</button>
        </div>
        <div class="smart-tree-legend">
            <span class="legend-item legend-e2">E2 · Efecto indirecto</span>
            <span class="legend-item legend-e1">E1 · Efecto directo</span>
            <span class="legend-item legend-p">P · Problema central</span>
            <span class="legend-item legend-c1">C1 · Causa directa</span>
            <span class="legend-item legend-c2">C2 · Causa indirecta</span>
            <span class="legend-item legend-c3">C3 · Causa raíz</span>
        </div>
    </div>`;

    if (treeViewMode === "eap_mapping") {
        const eap = buildEAPFromTree();
        const compCards = (eap.componentes || []).map((comp, idx) => {
            const cause = nodes.find(n => n.codigo === comp.causa_asociada || n.codigo === `C1.${idx + 1}`);
            const roots = nodes.filter(n => n.tipo === "causa" && Number(n.nivel) >= 3 && (n.padre.startsWith(`C2.${idx * 2 + 1}`) || n.padre.startsWith(`C2.${idx * 2 + 2}`) || n.padre.startsWith(`C1.${idx + 1}`)));
            return `<div class="eap-map-card">
                <div class="eap-map-head">
                    <span class="eap-comp-badge">${esc(comp.codigo)}</span>
                    <div>
                        <strong style="font-size:13px;display:block">${esc(comp.nombre)}</strong>
                        <span class="eap-cause-tag">Derivado de Causa: ${esc(cause ? cause.codigo + " · " + cause.enunciado : comp.causa_asociada || "C1." + (idx + 1))}</span>
                    </div>
                </div>
                <div style="margin-bottom:10px;font-size:11px;color:#64748b">
                    <strong>Causas raíz intervenidas en el árbol:</strong>
                    <ul style="margin:4px 0 0;padding-left:18px">
                        ${roots.length ? roots.map(r => `<li><strong>${esc(r.codigo)}:</strong> ${esc(r.enunciado)}</li>`).join("") : "<li>Causas raíz de la rama C1." + (idx + 1) + "</li>"}
                    </ul>
                </div>
                <div>
                    <strong style="font-size:12px;color:#1e40af;display:block;margin-bottom:6px">Actividades operativas formuladas (${(comp.actividades || []).length} actividades):</strong>
                    <ol class="eap-act-list">
                        ${(comp.actividades || []).map(act => `<li>${esc(act)}</li>`).join("")}
                    </ol>
                </div>
            </div>`;
        }).join("");

        container.innerHTML = `<div class="tree-container-wrap">
            ${toolbar}
            <div class="notice" style="margin-bottom:16px">
                <strong>Metodología CEPAL/ILPES:</strong> Las <strong>Causas Directas (C1)</strong> se transforman en <strong>Componentes</strong> del proyecto, mientras que las <strong>Causas Raíz (C3/C4)</strong> se convierten en <strong>Actividades operativas</strong> concretas (3 a 4 actividades por componente) para la Matriz de Marco Lógico.
            </div>
            <div class="eap-mapping-container">
                ${compCards}
            </div>
        </div>`;
        return;
    }

    if (treeViewMode === "levels") {
        const byTypeLevel = (type, level) => nodes.filter(n => n.tipo === type && Number(n.nivel) === level).sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true }));
        const maxLevel = type => Math.max(1, ...nodes.filter(n => n.tipo === type).map(n => Number(n.nivel) || 1));
        const cards = (items, type) => items.length ? items.map(n => `<div class="tree-node ${type} level-${Number(n.nivel) || 1}">
            <b>${esc(n.codigo)}</b>
            <span>${esc(n.enunciado)}</span>
            <small>Padre: ${esc(n.padre || "P")}</small>
        </div>`).join("") : `<div class="tree-node empty-node">Sin nodos registrados en este nivel</div>`;

        const levelRow = (type, level, label) => `<div class="tree-level ${type} level-${level}">
            <div class="tree-level-label">${esc(label)}</div>
            <div class="tree-row">${cards(byTypeLevel(type, level), type)}</div>
        </div>`;

        const effectRows = Array.from({ length: maxLevel("efecto") }, (_, i) => maxLevel("efecto") - i)
            .map(level => levelRow("efecto", level, level === 1 ? "Efectos directos (Nivel 1)" : `Efectos indirectos (Nivel ${level})`)).join("");

        const causeRows = Array.from({ length: maxLevel("causa") }, (_, i) => i + 1)
            .map(level => levelRow("causa", level, level === 1 ? "Causas directas (Nivel 1)" : level === maxLevel("causa") ? `Causas raíz (Nivel ${level})` : `Causas indirectas (Nivel ${level})`)).join("");

        container.innerHTML = `<div class="tree-container-wrap">
            ${toolbar}
            <div style="overflow-x:auto">
                ${effectRows}
                <div class="arrow" style="text-align:center;font-size:18px;margin:6px 0">↓</div>
                <div class="tree-row problem-row" style="display:flex;justify-content:center">
                    <div class="smart-node level-p">
                        <div class="smart-node-head">
                            <span class="smart-node-code">P</span>
                            <span class="smart-node-level-tag">PROBLEMA CENTRAL</span>
                        </div>
                        <p class="smart-node-text">${esc(p)}</p>
                    </div>
                </div>
                <div class="arrow" style="text-align:center;font-size:18px;margin:6px 0">↓</div>
                ${causeRows}
            </div>
        </div>`;
        return;
    }

    // Default View: SMARTART HIERARCHICAL TREE
    const e1Nodes = nodes.filter(n => n.tipo === "efecto" && Number(n.nivel) === 1);
    const effectsHtml = e1Nodes.map(e1 => {
        const e2Children = nodes.filter(n => n.tipo === "efecto" && n.padre === e1.codigo);
        return `<div class="tree-branch">
            <div class="tree-sub-children" style="margin-bottom:10px">
                ${e2Children.map(e2 => renderSmartNode(e2, "level-e2", "Efecto indirecto (N2)")).join("")}
            </div>
            ${renderSmartNode(e1, "level-e1", "Efecto directo (N1)")}
        </div>`;
    }).join("");

    const c1Nodes = nodes.filter(n => n.tipo === "causa" && Number(n.nivel) === 1).sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true }));

    const causesHtml = c1Nodes.map(c1 => {
        const c2Children = nodes.filter(n => n.tipo === "causa" && n.padre === c1.codigo).sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true }));
        const c2Html = c2Children.map(c2 => {
            const c3Children = nodes.filter(n => n.tipo === "causa" && n.padre === c2.codigo).sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true }));
            return `<div class="tree-leaf-cluster">
                ${renderSmartNode(c2, "level-c2", "Causa indirecta (N2)")}
                ${c3Children.length ? `<div class="tree-sub-children">${c3Children.map(c3 => renderSmartNode(c3, "level-c3", "Causa raíz (N3)")).join("")}</div>` : ""}
            </div>`;
        }).join("");

        return `<div class="tree-branch">
            <div class="tree-branch-header">
                ${renderSmartNode(c1, "level-c1", "Causa directa (N1)")}
            </div>
            ${c2Children.length ? `<div class="tree-branch-children">${c2Html}</div>` : ""}
        </div>`;
    }).join("");

    container.innerHTML = `<div class="tree-container-wrap">
        ${toolbar}
        <div class="smart-tree-viewport">
            <div class="smart-tree">
                <!-- SECCIÓN EFECTOS -->
                <div class="tree-section-title title-effects">▲ Consecuencias y Efectos (Arriba)</div>
                <div class="effects-cluster">
                    ${effectsHtml.length ? effectsHtml : '<div class="smart-node level-e1"><p class="smart-node-text">No hay efectos registrados.</p></div>'}
                </div>
                <div class="tree-connector-down"></div>

                <!-- PROBLEMA CENTRAL -->
                <div class="smart-node level-p" style="margin:8px 0">
                    <div class="smart-node-head">
                        <span class="smart-node-code">P</span>
                        <span class="smart-node-level-tag">PROBLEMA CENTRAL (VALIDADO)</span>
                    </div>
                    <p class="smart-node-text">${esc(p)}</p>
                    <div class="smart-node-footer" style="justify-content:center;gap:12px;color:#991b1b">
                        <span>Población: <strong>${esc(D.caso.poblacion || "Jóvenes rurales")}</strong></span>
                        <span>Territorio: <strong>${esc(D.caso.municipio || "Manizales")}</strong></span>
                    </div>
                </div>

                <!-- SECCIÓN CAUSAS -->
                <div class="tree-connector-down"></div>
                <div class="tree-section-title title-causes">▼ Causas y Raíces Explicativas (Abajo)</div>
                <div class="causes-cluster">
                    ${causesHtml.length ? causesHtml : '<div class="smart-node level-c1"><p class="smart-node-text">No hay causas registradas.</p></div>'}
                </div>
            </div>
        </div>
    </div>`;
}

function runTreeValidation() {
    const nodes = D.nodos || [];
    const orphan = nodes.filter(n => n.padre !== "P" && !nodes.some(p => p.codigo === n.padre));
    const levelJump = nodes.filter(n => Number(n.nivel) > 1 && !nodes.some(p => p.codigo === n.padre && Number(p.nivel) === Number(n.nivel) - 1));
    const dup = {};
    nodes.forEach(n => {
        const k = n.tipo + "|" + n.enunciado.trim().toLowerCase();
        dup[k] = (dup[k] || 0) + 1;
    });
    const duplicates = nodes.filter(n => dup[n.tipo + "|" + n.enunciado.trim().toLowerCase()] > 1);
    const cross = nodes.filter(n => nodes.some(x => x !== n && x.enunciado.trim().toLowerCase() === n.enunciado.trim().toLowerCase() && x.tipo !== n.tipo));
    const noEvidence = nodes.filter(n => !n.evidencia || !n.lineaBase);
    const actions = nodes.filter(n => n.esAccion || /^(capacitar|crear|construir|implementar|diseñar|instalar|desarrollar|entregar|ejecutar|promover|fortalecer|realizar|dotar)\b/i.test(n.enunciado));
    const directCauses = nodes.filter(n => n.tipo === "causa" && Number(n.nivel) === 1);
    const roots = nodes.filter(n => n.tipo === "causa" && Number(n.nivel) >= 3);
    const flatCauses = nodes.filter(n => n.tipo === "causa").length > 0 && nodes.filter(n => n.tipo === "causa").every(n => Number(n.nivel) === 1 || n.padre === "P");
    const weakNegative = nodes.filter(n => n.tipo === "causa" && !/\b(insuficiente|insuficientemente|limitad[ao]s?|restringid[ao]s?|débil(?:es)?|baj[ao]s?|escas[ao]s?|inestable(?:s)?|dispers[ao]s?|poco|poca|pocas|barreras|desconexión|discontinuo|dificultad(?:es)?|desarticulación|deterioro)\b/i.test(n.enunciado));

    const eap = buildEAPFromTree();
    const componentsOk = !!eap && Array.isArray(eap.componentes) && eap.componentes.length >= 4 && eap.componentes.every(c => Array.isArray(c.actividades) && c.actividades.length >= 3);

    const tests = [
        [!orphan.length, "1. Prueba de Dirección", "No hay nodos huérfanos; cada relación apunta a un padre válido en el árbol.", orphan.map(n => n.codigo)],
        [!levelJump.length, "2. Prueba de Nivel", "No hay saltos de nivel; cada nodo profundiza sobre el nivel inmediatamente superior (N1 → N2 → N3).", levelJump.map(n => n.codigo)],
        [directCauses.length >= 3 && roots.length >= 3 && !flatCauses, "3. Prueba de Suficiencia y Encadenamiento", "El árbol cuenta con causas directas (N1), causas intermedias (N2) y raíces profundas (N3); no es una lista plana.", flatCauses ? directCauses.map(n => n.codigo) : []],
        [!cross.length && !duplicates.length, "4. Prueba de No Circularidad y Unicidad", "No se detectan duplicados ni el mismo enunciado como causa y efecto a la vez.", [...cross, ...duplicates].map(n => n.codigo)],
        [!noEvidence.length && !actions.length && !weakNegative.length, "5. Prueba de Evidencia y Redacción Negativa", "Todas las causas son estados negativos verificables y cuentan con evidencia y línea base territorial.", noEvidence.concat(actions, weakNegative).map(n => n.codigo)],
        [componentsOk, "6. Derivación a EAP (Componentes y Actividades)", "El árbol alimenta 4 componentes y entre 3 y 4 actividades operativas por componente según el manual CEPAL.", componentsOk ? [] : ["EAP"]]
    ];

    const box = document.getElementById("treeValidation");
    if (box) box.innerHTML = tests.map(([ok, t, m, bad]) => `<div class="vitem ${ok ? "ok" : "bad"}"><strong>${ok ? "✓" : "✕"} ${t}</strong><div class="small-note" style="margin-top:4px">${esc(m)}</div>${bad.length ? `<div class="small-note" style="margin-top:5px;color:#b91c1c"><strong>Revisar nodos:</strong> ${esc(bad.join(", "))}</div>` : ""}</div>`).join("");
}

function renderEAP() {
    const box = document.getElementById("eapView");
    if (!box) return;
    const eap = buildEAPFromTree();
    if (!eap) {
        box.innerHTML = `<div class="empty">Carga o construye primero el árbol revisado. La EAP aparecerá aquí con fin, propósito, componentes y actividades.</div>`;
        return;
    }
    box.innerHTML = `<div class="eap-tree">
        <div class="eap-level fin" style="background:#faf5ff;border-left:5px solid #9333ea"><strong>Fin (Impacto de largo plazo)</strong><span>${esc(eap.fin)}</span></div>
        <div class="eap-level proposito" style="background:#fff1f2;border-left:5px solid #dc2626"><strong>Propósito (Objetivo central)</strong><span>${esc(eap.proposito)}</span></div>
        <div class="eap-components">${(eap.componentes || []).map(comp => `<div class="eap-component" style="border:1px solid #bfdbfe;border-radius:12px;padding:14px;background:#f8fafc">
            <div class="eap-component-title" style="color:#1e40af;font-size:13px;margin-bottom:8px"><strong>${esc(comp.codigo)}</strong>: ${esc(comp.nombre)}</div>
            <ol style="margin:0;padding-left:20px;font-size:12px;color:#334155">${(comp.actividades || []).map(a => `<li style="margin-bottom:6px">${esc(a)}</li>`).join("")}</ol>
        </div>`).join("")}</div>
    </div>`;
}

function renderSources() {
    const grid = document.getElementById("sourcesGrid");
    if (grid) {
        grid.innerHTML = D.fuentes.map(f => `<div class="card span-6"><span class="pill">${esc(f.tipo)}</span><h3 style="margin-top:10px">${esc(f.titulo)}</h3><p>${esc(f.aporte)}</p><a href="${esc(f.url)}" target="_blank" rel="noopener" class="btn">Abrir fuente ↗</a></div>`).join("");
    }
}

function promptList() {
    const c = D.caso;
    const p = D.problema.central || c.problemaJSON;
    return [
        `Actúa como un evaluador experto en Metodología de Marco Lógico (CEPAL/ILPES). Analiza el problema central del caso "${c.titulo}". Enunciado actual: "${p}". Revisa criterio por criterio: 1) Estado negativo real, 2) Sin soluciones incorporadas, 3) Población (${c.poblacion}), 4) Territorio (${c.municipio}), 5) Un solo núcleo, 6) Verificabilidad empírica. Prohibido inventar cifras no registradas.`,

        `Genera una propuesta estructurada de causas y efectos para el problema central: "${p}". Devuelve ÚNICAMENTE un JSON válido con la lista de nodos. Cada nodo debe tener: codigo, tipo ("causa"|"efecto"), nivel (1, 2 o 3), nodoPadre ("P" para nivel 1), y enunciado. Obligatorio: redacción estricta en estado negativo verificable; sin verbos en infinitivo ni nombres de intervenciones.`,

        `Aplica una auditoría de consistencia lógica sobre el árbol de problemas del caso "${c.titulo}". Aplica explícitamente las 5 pruebas de la Sesión 2: 1) Dirección (sin huérfanos), 2) Nivel (sin saltos), 3) Suficiencia (ramas encadenadas hasta causas raíz), 4) No circularidad (sin causas que sean efectos), y 5) Redacción negativa y evidencia. Indica el código de cada nodo con hallazgos.`,

        `Actúa como un contradictor técnico riguroso. Examina el árbol del caso e identifica: 1) Tres nodos que resulten indefendibles o metodológicamente débiles, 2) Una causa faltante de naturaleza distinta a las registradas, y 3) Qué actor clave (${c.poblacion} o productores) podría estar en desacuerdo con la jerarquización causal y por qué.`,

        `Al finalizar la sesión de formulación del árbol de problemas, genera una reflexión crítica: 1) Qué aspectos de las relaciones causales propuestas NO pueden ser demostrados por el modelo de IA y requieren verificación en campo, 2) Qué información de línea base territorial debe levantarse en los corregimientos de Manizales, y 3) Qué supuestos deben validarse con la comunidad.`
    ];
}

function renderPrompts() {
    const grid = document.getElementById("promptsGrid");
    if (grid) {
        const names = [
            "1. Patrón Persona (Depuración del Problema)",
            "2. Patrón Plantilla de Salida (Propuesta de Nodos JSON)",
            "3. Patrón Verificación (Pruebas de Validez Lógica)",
            "4. Patrón Contradictor (Crítica y Casos Indefendibles)",
            "5. Patrón Reflexión (Límites de la IA y Verificación en Campo)"
        ];
        grid.innerHTML = promptList().map((p, i) => `<div class="card span-6">
            <div class="prompt-row">
                <h3 style="font-size:14px;color:#126b4f">${names[i] || `Prompt ${i + 1}`}</h3>
                <button class="btn" onclick='navigator.clipboard.writeText(${JSON.stringify(p)});alert("Prompt copiado al portapapeles.")'>Copiar</button>
            </div>
            <div class="prompt">${esc(p)}</div>
        </div>`).join("");
    }
}


const CEPAL_OBJECTIVES_MAP = {
    "E2.1": { codigo: "F2.1", tipo: "Fin indirecto", nivel: 2, padre: "F1.1", enunciado: "Permanencia voluntaria y reducción de la migración forzada de población joven hacia áreas urbanas", origen: "E2.1 (Efecto indirecto)" },
    "E2.2": { codigo: "F2.2", tipo: "Fin indirecto", nivel: 2, padre: "F1.2", enunciado: "Relevo generacional productivo asegurado y sostenibilidad socioeconómica de unidades campesinas", origen: "E2.2 (Efecto indirecto)" },
    "E1.1": { codigo: "F1.1", tipo: "Fin directo", nivel: 1, padre: "Obj_P", enunciado: "Elevada expectativa de los jóvenes de consolidar un proyecto de vida digno y viable en el campo", origen: "E1.1 (Efecto directo)" },
    "E1.2": { codigo: "F1.2", tipo: "Fin directo", nivel: 1, padre: "Obj_P", enunciado: "Economía campesina fortalecida e incremento de los ingresos familiares en veredas de Manizales", origen: "E1.2 (Efecto directo)" },
    "P": { codigo: "Obj_P", tipo: "Propósito Central", nivel: 0, padre: "Fin", enunciado: "Oportunidades laborales y productivas consolidadas y suficientemente atractivas para favorecer la permanencia de los jóvenes en la zona rural de Manizales", origen: "P (Problema central)" },
    "C1.1": { codigo: "M1.1", tipo: "Medio directo (Componente 1)", nivel: 1, padre: "Obj_P", enunciado: "Oferta de empleo rural formal y remunerado para jóvenes ampliada y estable", origen: "C1.1 (Causa directa)" },
    "C2.1": { codigo: "M2.1", tipo: "Medio indirecto", nivel: 2, padre: "M1.1", enunciado: "Mayor rentabilidad y capacidad de contratación laboral formal en fincas y unidades productivas", origen: "C2.1 (Causa indirecta)" },
    "C3.1": { codigo: "M3.1", tipo: "Medio fundamental (Actividad)", nivel: 3, padre: "M2.1", enunciado: "Diversificación y agregación de valor local a la producción agropecuaria primaria en origen", origen: "C3.1 (Causa raíz)" },
    "C3.2": { codigo: "M3.2", tipo: "Medio fundamental (Actividad)", nivel: 3, padre: "M2.1", enunciado: "Estabilidad en la demanda de mano de obra y reducción de sobrecostos de intermediación", origen: "C3.2 (Causa raíz)" },
    "C2.2": { codigo: "M2.2", tipo: "Medio indirecto", nivel: 2, padre: "M1.1", enunciado: "Canales unificados y amplia difusión territorial de convocatorias y oportunidades laborales rurales", origen: "C2.2 (Causa indirecta)" },
    "C1.2": { codigo: "M1.2", tipo: "Medio directo (Componente 2)", nivel: 1, padre: "Obj_P", enunciado: "Acceso equitativo y oportuno de jóvenes a tierra, activos productivos y capital inicial de trabajo", origen: "C1.2 (Causa directa)" },
    "C2.3": { codigo: "M2.3", tipo: "Medio indirecto", nivel: 2, padre: "M1.2", enunciado: "Barreras económicas y legales reducidas para la titulación y arrendamiento seguro de tierras", origen: "C2.3 (Causa indirecta)" },
    "C3.3": { codigo: "M3.3", tipo: "Medio fundamental (Actividad)", nivel: 3, padre: "M2.3", enunciado: "Esquemas de banco de tierras y figuras de comodato asociativo juvenil implementados", origen: "C3.3 (Causa raíz)" },
    "C2.4": { codigo: "M2.4", tipo: "Medio indirecto", nivel: 2, padre: "M1.2", enunciado: "Líneas de microcrédito y garantías flexibles adaptadas a las condiciones de jóvenes rurales", origen: "C2.4 (Causa indirecta)" },
    "C3.4": { codigo: "M3.4", tipo: "Medio fundamental (Actividad)", nivel: 3, padre: "M2.4", enunciado: "Fondos de capital semilla no reembolsables disponibles y ajustados al perfil juvenil rural", origen: "C3.4 (Causa raíz)" },
    "C1.3": { codigo: "M1.3", tipo: "Medio directo (Componente 3)", nivel: 1, padre: "Obj_P", enunciado: "Articulación efectiva entre programas formativos y la vocación productiva territorial", origen: "C1.3 (Causa directa)" },
    "C2.5": { codigo: "M2.5", tipo: "Medio indirecto", nivel: 2, padre: "M1.3", enunciado: "Contenidos curriculares actualizados e integrados con innovación agropecuaria y TIC", origen: "C2.5 (Causa indirecta)" },
    "C3.5": { codigo: "M3.5", tipo: "Medio fundamental (Actividad)", nivel: 3, padre: "M2.5", enunciado: "Experiencias de formación práctica directamente en fincas modelo y parcelas demostrativas", origen: "C3.5 (Causa raíz)" },
    "C2.6": { codigo: "M2.6", tipo: "Medio indirecto", nivel: 2, padre: "M1.3", enunciado: "Asistencia técnica y acompañamiento productivo continuos posteriores a la capacitación", origen: "C2.6 (Causa indirecta)" },
    "C3.6": { codigo: "M3.6", tipo: "Medio fundamental (Actividad)", nivel: 3, padre: "M2.6", enunciado: "Seguimiento en campo permanente para la consolidación de planes de negocio juveniles", origen: "C3.6 (Causa raíz)" },
    "C1.4": { codigo: "M1.4", tipo: "Medio directo (Componente 4)", nivel: 1, padre: "Obj_P", enunciado: "Esquemas de asociatividad juvenil y canales de comercialización directa fortalecidos", origen: "C1.4 (Causa directa)" },
    "C2.7": { codigo: "M2.7", tipo: "Medio indirecto", nivel: 2, padre: "M1.4", enunciado: "Alta representatividad e incentivos para la participación juvenil en asociaciones rurales", origen: "C2.7 (Causa indirecta)" },
    "C3.7": { codigo: "M3.7", tipo: "Medio fundamental (Actividad)", nivel: 3, padre: "M2.7", enunciado: "Estructuras organizativas abiertas con liderazgo y relevo generacional incentivado", origen: "C3.7 (Causa raíz)" },
    "C2.8": { codigo: "M2.8", tipo: "Medio indirecto", nivel: 2, padre: "M1.4", enunciado: "Acceso consolidado a mercados diferenciados, valor agregado, empaque y marcas comerciales", origen: "C2.8 (Causa indirecta)" },
    "C3.8": { codigo: "M3.8", tipo: "Medio fundamental (Actividad)", nivel: 3, padre: "M2.8", enunciado: "Infraestructura logística, centros de acopio y transporte rural habilitados para jóvenes", origen: "C3.8 (Causa raíz)" }
};

function getObjectivesTree() {
    const nodes = D.nodos || [];
    const list = [];

    // Effects -> Fines
    const e2Nodes = nodes.filter(n => n.tipo === "efecto" && Number(n.nivel) === 2);
    const e1Nodes = nodes.filter(n => n.tipo === "efecto" && Number(n.nivel) === 1);

    e2Nodes.forEach(e => {
        const mapped = CEPAL_OBJECTIVES_MAP[e.codigo] || { codigo: e.codigo.replace("E", "F"), tipo: "Fin indirecto", nivel: 2, padre: e.padre.replace("E", "F"), enunciado: "Situación deseada: " + e.enunciado, origen: e.codigo + " (Efecto indirecto)" };
        list.push(mapped);
    });

    e1Nodes.forEach(e => {
        const mapped = CEPAL_OBJECTIVES_MAP[e.codigo] || { codigo: e.codigo.replace("E", "F"), tipo: "Fin directo", nivel: 1, padre: "Obj_P", enunciado: "Situación deseada: " + e.enunciado, origen: e.codigo + " (Efecto directo)" };
        list.push(mapped);
    });

    // Central Purpose
    const pMapped = CEPAL_OBJECTIVES_MAP["P"] || { codigo: "Obj_P", tipo: "Propósito Central", nivel: 0, padre: "Fin", enunciado: "Situación deseada del problema central", origen: "P (Problema central)" };
    list.push(pMapped);

    // Causes -> Medios
    const causes = nodes.filter(n => n.tipo === "causa").sort((a, b) => Number(a.nivel) - Number(b.nivel) || String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true }));
    causes.forEach(c => {
        const mapped = CEPAL_OBJECTIVES_MAP[c.codigo] || { codigo: c.codigo.replace("C", "M"), tipo: c.nivel === 1 ? "Medio directo (Componente)" : c.nivel === 2 ? "Medio indirecto" : "Medio fundamental", nivel: Number(c.nivel), padre: c.padre === "P" ? "Obj_P" : c.padre.replace("C", "M"), enunciado: "Medio: " + c.enunciado, origen: c.codigo + " (Causa)" };
        list.push(mapped);
    });

    return list;
}

function renderObjectives() {
    const container = document.getElementById("objectivesTree");
    const tableBody = document.getElementById("objectivesTableBody");
    const objList = getObjectivesTree();
    const nodes = D.nodos || [];

    if (tableBody) {
        tableBody.innerHTML = objList.map(o => `<tr>
            <td><strong>${esc(o.codigo)}</strong></td>
            <td><span class="pill ${o.tipo.includes("Fin") ? "blue" : o.tipo.includes("Propósito") ? "red" : "green"}">${esc(o.tipo)}</span></td>
            <td>${o.nivel === 0 ? "Central" : "Nivel " + o.nivel}</td>
            <td><strong>${esc(o.padre)}</strong></td>
            <td>${esc(o.enunciado)}</td>
            <td><small style="color:#64748b">${esc(o.origen)}</small></td>
        </tr>`).join("");
    }

    if (!container) return;

    // Build SmartArt Tree of Objectives
    const f1Nodes = objList.filter(o => o.tipo.includes("Fin directo"));
    const finesHtml = f1Nodes.map(f1 => {
        const f2Children = objList.filter(o => o.padre === f1.codigo);
        return `<div class="tree-branch">
            <div class="tree-sub-children" style="margin-bottom:10px">
                ${f2Children.map(f2 => renderSmartNode(f2, "level-f2", "Fin indirecto (N2)")).join("")}
            </div>
            ${renderSmartNode(f1, "level-f1", "Fin directo (N1)")}
        </div>`;
    }).join("");

    const m1Nodes = objList.filter(o => o.tipo.includes("Medio directo")).sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true }));

    const mediosHtml = m1Nodes.map(m1 => {
        const m2Children = objList.filter(o => o.padre === m1.codigo).sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true }));
        const m2Html = m2Children.map(m2 => {
            const m3Children = objList.filter(o => o.padre === m2.codigo).sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), "es", { numeric: true }));
            return `<div class="tree-leaf-cluster">
                ${renderSmartNode(m2, "level-m2", "Medio indirecto (N2)")}
                ${m3Children.length ? `<div class="tree-sub-children">${m3Children.map(m3 => renderSmartNode(m3, "level-m3", "Medio fundamental (N3)")).join("")}</div>` : ""}
            </div>`;
        }).join("");

        return `<div class="tree-branch">
            <div class="tree-branch-header">
                ${renderSmartNode(m1, "level-m1", "Medio directo (N1)")}
            </div>
            ${m2Children.length ? `<div class="tree-branch-children">${m2Html}</div>` : ""}
        </div>`;
    }).join("");

    const objP = objList.find(o => o.codigo === "Obj_P") || { codigo: "Obj_P", enunciado: "Objetivo Central / Propósito" };

    container.innerHTML = `<div class="tree-container-wrap">
        <div class="tree-toolbar">
            <div style="font-weight:800;font-size:13px;color:#1e40af">
                🌳 Árbol de Objetivos y Resultados (Medios y Fines · SmartArt)
            </div>
            <div class="smart-tree-legend">
                <span class="legend-item" style="background:#faf5ff;border:1px solid #c4b5fd;color:#6b21a8">F2 · Fin indirecto</span>
                <span class="legend-item" style="background:#f0fdf4;border:1px solid #6ee7b7;color:#065f46">F1 · Fin directo</span>
                <span class="legend-item" style="background:#eff6ff;border:1px solid #93c5fd;color:#1e40af">Obj_P · Propósito Central</span>
                <span class="legend-item" style="background:#f0fdf4;border:1px solid #86efac;color:#166534">M1 · Medio directo</span>
                <span class="legend-item" style="background:#f0fdfa;border:1px solid #5eead4;color:#115e59">M2 · Medio indirecto</span>
                <span class="legend-item" style="background:#f8fafc;border:1px solid #cbd5e1;color:#334155">M3 · Medio fundamental</span>
            </div>
        </div>
        <div class="smart-tree-viewport">
            <div class="smart-tree">
                <!-- SECCIÓN FINES -->
                <div class="tree-section-title" style="background:#ede9fe;color:#5b21b6">▲ Fines del Proyecto (Impacto positivo de largo plazo)</div>
                <div class="effects-cluster">
                    ${finesHtml}
                </div>
                <div class="tree-connector-down" style="background:#3b82f6"></div>

                <!-- PROPÓSITO CENTRAL -->
                <div class="smart-node level-objp" style="margin:8px 0">
                    <div class="smart-node-head">
                        <span class="smart-node-code">Obj_P</span>
                        <span class="smart-node-level-tag">PROPÓSITO CENTRAL / OBJETIVO GENERAL</span>
                    </div>
                    <p class="smart-node-text">${esc(objP.enunciado)}</p>
                    <div class="smart-node-footer" style="justify-content:center;gap:12px;color:#1e40af">
                        <span>Población: <strong>${esc(D.caso.poblacion || "Jóvenes rurales")}</strong></span>
                        <span>Territorio: <strong>${esc(D.caso.municipio || "Manizales")}</strong></span>
                    </div>
                </div>

                <!-- SECCIÓN MEDIOS -->
                <div class="tree-connector-down" style="background:#3b82f6"></div>
                <div class="tree-section-title" style="background:#dcfce7;color:#15803d">▼ Medios de Intervención (Componentes y Actividades)</div>
                <div class="causes-cluster">
                    ${mediosHtml}
                </div>
            </div>
        </div>
    </div>`;
}

function renderLog() {
    const rows = Array.isArray(D.bitacora) ? D.bitacora : [];
    const logTable = document.getElementById("logTable");
    if (logTable) {
        logTable.innerHTML = rows.length
            ? rows.map(x => `<tr>
            <td>${esc((x.fecha || "").replace("T", " ").slice(0, 19))}</td>
            <td><strong>${esc(x.patron || "")}</strong><br><small>${esc(x.proposito || "")}</small></td>
            <td>${esc(x.prompt || "")}</td>
            <td>${esc(x.error_modelo || x.salida || "")}</td>
            <td>${esc(x.como_se_detecto || "")}</td>
            <td>${esc(x.correccion || "")}</td>
          </tr>`).join("")
            : `<tr><td colspan="6"><div class="empty">Todavía no hay registros. Importar un JSON o cargar el árbol CEPAL generará automáticamente una entrada.</div></td></tr>`;
    }
}

function clearAllData() {
    const ok = confirm("¿Seguro que deseas reiniciar el artefacto al estado inicial del caso CEPAL?\n\nSe restaurarán los involucrados, el árbol jerárquico revisado y la bitácora consolidada.");
    if (!ok) return;
    localStorage.removeItem(STORAGE_KEY);
    D = normalize(BASE_JSON);
    render();
    alert("El artefacto fue restablecido al caso base validado de la CEPAL.");
}

function render() {
    renderCase();
    renderActors();
    const centralInput = document.getElementById("problemCentral");
    if (centralInput) centralInput.value = D.problema.central || D.caso.problemaJSON || "";
    const pPob = document.getElementById("probPob"); if (pPob) pPob.textContent = D.caso.poblacion;
    const pTerr = document.getElementById("probTerr"); if (pTerr) pTerr.textContent = `${D.caso.municipio}, ${D.caso.departamento}`;
    const pEdad = document.getElementById("probEdad"); if (pEdad) pEdad.textContent = D.caso.rangoEdad || "14 a 28 años";
    const pPer = document.getElementById("probPeriodo"); if (pPer) pPer.textContent = D.caso.periodo || "2026-2";

    renderNodes();
    renderTree();
    renderProblemContext();
    refreshParentOptions();
    runTreeValidation();
    renderEAP();
    renderSources();
    renderPrompts();
    renderLog();
    renderObjectives();
}

/* ==================== EXPORTACIÓN PDF APA 7 ==================== */
let pdfLibrariesPromise = null;

function loadPDFLibraries() {
    if (pdfLibrariesPromise) return pdfLibrariesPromise;
    pdfLibrariesPromise = new Promise((resolve, reject) => {
        if (window.jspdf && window.jspdf.jsPDF && window.jspdf.jsPDF.API && window.jspdf.jsPDF.API.autoTable) { resolve(); return; }
        const load = (src) => new Promise((ok, bad) => {
            const sc = document.createElement("script");
            sc.src = src; sc.onload = ok; sc.onerror = () => bad(new Error(src));
            document.head.appendChild(sc);
        });
        load("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js")
            .then(() => load("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.4/jspdf.plugin.autotable.min.js"))
            .then(resolve).catch(reject);
    });
    return pdfLibrariesPromise;
}

function pdfClean(v) { return String(v ?? "").replace(/\s+/g, " ").trim() }
function pdfHeader(doc) {
    doc.setFont("times", "normal"); doc.setFontSize(10);
    doc.text(String(doc.getNumberOfPages()), doc.internal.pageSize.getWidth() - 72, 30, { align: "right" });
}
function pdfNewPage(doc) {
    doc.addPage();
    pdfHeader(doc);
    return 65;
}
function pdfEnsure(doc, y, h = 24) {
    const bottom = doc.internal.pageSize.getHeight() - 55;
    if (y + h > bottom) return pdfNewPage(doc);
    return y;
}
function pdfText(doc, text, y, width, { size = 12, bold = false, italic = false, spacing = 24 } = {}) {
    doc.setFont("times", bold ? "bold" : italic ? "italic" : "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(pdfClean(text), width);
    let yy = y;
    lines.forEach(line => {
        yy = pdfEnsure(doc, yy, spacing);
        doc.text(line, 72, yy);
        yy += spacing;
    });
    return yy;
}
function pdfHeading(doc, text, y, level = 1) {
    y = pdfEnsure(doc, y, 36);
    doc.setFont("times", level === 3 ? "bolditalic" : "bold");
    doc.setFontSize(level === 1 ? 12 : 11);
    doc.text(pdfClean(text), 72, y);
    return y + 24;
}
function pdfTable(doc, head, body, y, colWidths, tableNo = "", tableTitle = "") {
    y = pdfEnsure(doc, y, 90);
    if (tableNo) {
        doc.setFont("times", "bold"); doc.setFontSize(11);
        doc.text(`Tabla ${tableNo}`, 72, y); y += 18;
        if (tableTitle) {
            doc.setFont("times", "italic"); doc.setFontSize(11);
            const titleLines = doc.splitTextToSize(pdfClean(tableTitle), doc.internal.pageSize.getWidth() - 144);
            titleLines.forEach(line => { y = pdfEnsure(doc, y, 18); doc.text(line, 72, y); y += 18; });
            y += 6;
        }
    }
    doc.autoTable({
        startY: y,
        margin: { left: 72, right: 72, top: 52, bottom: 52 },
        head: [head], body: body,
        theme: "plain",
        styles: {
            font: "times", fontSize: 9, cellPadding: 5,
            textColor: [30, 30, 30], valign: "top",
            lineColor: [80, 80, 80], lineWidth: .15,
            overflow: "linebreak"
        },
        headStyles: {
            font: "times", fontStyle: "bold", fontSize: 9,
            fillColor: [255, 255, 255], textColor: [20, 20, 20],
            lineColor: [20, 20, 20], lineWidth: .5
        },
        alternateRowStyles: { fillColor: [249, 249, 249] },
        columnStyles: colWidths || {},
        didDrawPage: () => pdfHeader(doc)
    });
    return doc.lastAutoTable.finalY + 24;
}
function pdfBulletList(doc, items, y, width) {
    (items || []).filter(Boolean).forEach(item => {
        const lines = doc.splitTextToSize(pdfClean(item), width - 18);
        y = pdfEnsure(doc, y, 24);
        doc.setFont("times", "normal"); doc.setFontSize(12);
        lines.forEach((line, j) => {
            if (j > 0) y = pdfEnsure(doc, y, 24);
            doc.text(j === 0 ? "• " + line : "  " + line, 72, y); y += 24;
        });
    });
    return y;
}
function pdfPosition(a) { return a.posicion === "+" ? "A favor" : a.posicion === "-" ? "En contra" : "Neutral" }

async function downloadAPAPDF() {
    const button = [...document.querySelectorAll(".actions button")].find(b => b.textContent.includes("Descargar PDF"));
    if (button) { button.disabled = true; button.dataset.oldText = button.textContent; button.textContent = "Generando PDF…"; }
    try {
        await loadPDFLibraries();
        const jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF({ unit: "pt", format: "letter", compress: true });
        const W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), M = 72, CW = W - M * 2;
        const c = D.caso || {}, actors = D.involucrados || [], nodes = D.nodos || [], sources = D.fuentes || [];
        const problem = D.problema?.central || c.problemaJSON || "Problema central pendiente.";

        /* PORTADA */
        doc.setFont("times", "bold"); doc.setFontSize(12);
        let y = H / 2 - 155;
        const title = c.titulo ? `Formulación de proyectos: ${c.titulo}` : "Formulación de proyectos";
        doc.text(title, W / 2, y, { align: "center" });
        y += 48;
        doc.setFont("times", "normal");
        doc.text("Presentado por:", W / 2, y, { align: "center" }); y += 42;
        ["Jenny Xiomara Valencia Marin", "Maria Fernanda Giraldo Franco", "Sofia Hernandez Castaño"].forEach(n => {
            doc.text(n, W / 2, y, { align: "center" }); y += 24;
        });
        y += 24;
        doc.text("Especialización en Gerencia Estratégica de Proyectos, Facultad de Administración", W / 2, y, { align: "center" }); y += 24;
        doc.text("Universidad Nacional de Colombia – Sede Manizales", W / 2, y, { align: "center" }); y += 48;
        doc.text("Módulo de Formulación de Proyectos", W / 2, y, { align: "center" }); y += 24;
        doc.text("César Augusto Marín Moreno", W / 2, y, { align: "center" }); y += 24;
        doc.text("Agosto 2026", W / 2, y, { align: "center" });
        doc.text("1", W - 72, 30, { align: "right" });

        /* CONTENIDO */
        y = pdfNewPage(doc);
        y = pdfHeading(doc, "Formulación de proyectos", y, 1);
        y = pdfText(doc, "Pasos 1, 2 y 3 · Análisis de involucrados, árbol de problemas y árbol de resultados (CEPAL / ILPES)", y, CW, { bold: true });
        y = pdfText(doc, `Caso: ${c.titulo || "Sin título"}`, y, CW, { bold: true });
        y = pdfText(doc, `Sector: ${c.sector || "No registrado"} · Territorio: ${c.municipio || ""}, ${c.departamento || ""} · Periodo: ${c.periodo || "2026-2"}`, y, CW, { size: 11, spacing: 20 });

        y = pdfHeading(doc, "1. Ficha del caso", y + 8, 1);
        y = pdfText(doc, c.situacion || "No registrada.", y, CW);
        y = pdfText(doc, `Población afectada: ${c.poblacion || "No registrada"}. Rango de edad: ${c.rangoEdad || "No registrado"}. Zona: ${c.zona || "No registrada"}.`, y, CW, { size: 11, spacing: 20 });
        y = pdfText(doc, `Delimitación: ${c.delimitacion || "No registrada."}`, y, CW, { size: 11, spacing: 20 });
        y = pdfText(doc, `Pregunta orientadora: ${c.preguntaOrientadora || "No registrada."}`, y, CW, { size: 11, spacing: 20 });

        y = pdfHeading(doc, "2. Paso 1 · Análisis de involucrados", y + 8, 1);
        y = pdfText(doc, "El análisis de involucrados organiza los actores del territorio, sus intereses, problemas percibidos, recursos y mandatos, categorizados por posición, fuerza e intensidad. Estos resultados orientan la construcción del árbol de problemas.", y, CW, { size: 11, spacing: 20 });

        y = pdfHeading(doc, "2.1. Cuadro de análisis de involucrados", y + 5, 2);
        y = pdfTable(doc,
            ["Grupos", "Intereses", "Problemas percibidos", "Recursos y mandatos"],
            actors.map(a => [
                pdfClean(a.grupo),
                pdfClean((a.intereses || []).join("; ")),
                pdfClean((a.problemas_percibidos || []).join("; ")),
                pdfClean((a.recursos_mandatos || []).join("; "))
            ]),
            y, { 0: { cellWidth: 95 }, 1: { cellWidth: 125 }, 2: { cellWidth: 150 }, 3: { cellWidth: 130 } },
            "1", "Estructura del cuadro de análisis de involucrados"
        );

        y = pdfHeading(doc, "2.2. Caracterización de involucrados", y, 2);
        y = pdfTable(doc,
            ["Involucrado", "Posición", "Fuerza / rol", "Intensidad", "F × I", "Justificación"],
            actors.map(a => [
                pdfClean(a.grupo), pdfPosition(a),
                `${Number(a.fuerza || 0)}/5 · ${pdfClean(a.rol || "Rol no registrado")}`,
                `${Number(a.intensidad || 0)}/5`,
                String(Number(a.fuerza || 0) * Number(a.intensidad || 0)),
                pdfClean(a.justificacion || a.razon || "Pendiente de justificación")
            ]),
            y, { 0: { cellWidth: 85 }, 1: { cellWidth: 55 }, 2: { cellWidth: 105 }, 3: { cellWidth: 55 }, 4: { cellWidth: 40 }, 5: { cellWidth: 160 } },
            "2", "Caracterización de involucrados: posición, fuerza e intensidad"
        );

        y = pdfHeading(doc, "3. Paso 2 · Análisis del problema y árbol de problemas jerárquico", y + 8, 1);
        y = pdfHeading(doc, "3.1. Problema central validado", y, 2);
        y = pdfText(doc, problem, y, CW, { bold: true });

        y = pdfHeading(doc, "3.2. Matriz de nodos y jerarquía causal (Causas y Efectos)", y + 6, 2);
        y = pdfTable(doc,
            ["Código", "Tipo", "Nivel", "Padre", "Enunciado negativo", "Evidencia y fuente", "Confianza"],
            nodes.map(n => [
                pdfClean(n.codigo), pdfClean(n.tipo), String(n.nivel || ""), pdfClean(n.padre || "P"),
                pdfClean(n.enunciado), pdfClean(n.evidencia || "Pendiente"), pdfClean(n.confianza || "Media")
            ]),
            y, { 0: { cellWidth: 40 }, 1: { cellWidth: 40 }, 2: { cellWidth: 30 }, 3: { cellWidth: 40 }, 4: { cellWidth: 160 }, 5: { cellWidth: 140 }, 6: { cellWidth: 50 } },
            "3", "Estructura de nodos, jerarquía y trazabilidad del árbol de problemas"
        );

        /* SECCIÓN 4: PASO 3 · ÁRBOL DE OBJETIVOS Y RESULTADOS */
        y = pdfHeading(doc, "4. Paso 3 · Análisis de objetivos y árbol de resultados (Medios y Fines)", y + 8, 1);
        y = pdfText(doc, "El árbol de objetivos y resultados (Medios y Fines) representa la situación futura que se alcanzará al resolver el problema central. Los efectos negativos se convierten en fines positivos deseados y las causas se transforman en medios de intervención.", y, CW, { size: 11, spacing: 20 });

        y = pdfHeading(doc, "4.1. Propósito central del proyecto (Objetivo general)", y + 4, 2);
        const objCentral = CEPAL_OBJECTIVES_MAP["P"]?.enunciado || "Oportunidades laborales y productivas consolidadas y suficientemente atractivas para favorecer la permanencia de los jóvenes en la zona rural de Manizales.";
        y = pdfText(doc, objCentral, y, CW, { bold: true });

        y = pdfHeading(doc, "4.2. Matriz del árbol de resultados (Medios y Fines)", y + 6, 2);
        const objTree = getObjectivesTree();
        y = pdfTable(doc,
            ["Código", "Tipo de resultado", "Nivel", "Padre", "Enunciado en estado positivo deseado (Resultado)", "Origen (Problema)"],
            objTree.map(o => [
                pdfClean(o.codigo),
                pdfClean(o.tipo),
                String(o.nivel === 0 ? "Central" : o.nivel || ""),
                pdfClean(o.padre),
                pdfClean(o.enunciado),
                pdfClean(o.origen)
            ]),
            y, { 0: { cellWidth: 40 }, 1: { cellWidth: 85 }, 2: { cellWidth: 35 }, 3: { cellWidth: 40 }, 4: { cellWidth: 220 }, 5: { cellWidth: 80 } },
            "4", "Estructura del árbol de objetivos y resultados (Medios y Fines)"
        );

        if (D.eap) {
            y = pdfHeading(doc, "5. Paso 5 · Estructura Analítica del Proyecto (EAP)", y + 8, 1);
            y = pdfText(doc, "El Manual CEPAL/ILPES establece que los medios directos se transforman en componentes del proyecto y los medios fundamentales en actividades operativas (3 a 4 actividades por componente):", y, CW, { size: 11, spacing: 20 });
            y = pdfText(doc, `Fin: ${D.eap.fin || "No registrado."}`, y, CW, { bold: true, size: 11, spacing: 20 });
            y = pdfText(doc, `Propósito: ${D.eap.proposito || "No registrado."}`, y, CW, { bold: true, size: 11, spacing: 20 });
            y = pdfTable(doc,
                ["Componente", "Causa / Medio", "Actividades operativas formuladas"],
                (D.eap.componentes || []).map(cmp => [
                    pdfClean(`${cmp.codigo || ""}: ${cmp.nombre || ""}`),
                    pdfClean(cmp.causa_asociada || "C1"),
                    pdfClean((cmp.actividades || []).map((a, i) => `${i + 1}. ${a}`).join("; "))
                ]),
                y, { 0: { cellWidth: 160 }, 1: { cellWidth: 70 }, 2: { cellWidth: 270 } },
                "5", "Componentes y actividades derivados del árbol de problemas y objetivos"
            );
        }

        if (Array.isArray(D.bitacora) && D.bitacora.length) {
            y = pdfHeading(doc, "6. Bitácora de uso de inteligencia artificial y trazabilidad", y + 8, 1);
            y = pdfTable(doc,
                ["Fecha", "Patrón / propósito", "Prompt / entrada", "Error / salida", "Cómo se detectó", "Corrección"],
                D.bitacora.map(x => [
                    pdfClean((x.fecha || "").replace("T", " ").slice(0, 19)),
                    pdfClean(x.patron || x.proposito || ""),
                    pdfClean(x.prompt || ""),
                    pdfClean(x.error_modelo || x.salida || ""),
                    pdfClean(x.como_se_detecto || ""),
                    pdfClean(x.correccion || "")
                ]),
                y, { 0: { cellWidth: 58 }, 1: { cellWidth: 78 }, 2: { cellWidth: 92 }, 3: { cellWidth: 105 }, 4: { cellWidth: 95 }, 5: { cellWidth: 92 } },
                "6", "Bitácora metodológica de uso de IA y trazabilidad"
            );
        }

        if (sources.length) {
            y = pdfHeading(doc, "7. Referencias y fuentes del caso", y + 8, 1);
            y = pdfTable(doc,
                ["Fecha", "Patrón / propósito", "Prompt / entrada", "Error / salida", "Cómo se detectó", "Corrección"],
                D.bitacora.map(x => [
                    pdfClean((x.fecha || "").replace("T", " ").slice(0, 19)),
                    pdfClean(x.patron || x.proposito || ""),
                    pdfClean(x.prompt || ""),
                    pdfClean(x.error_modelo || x.salida || ""),
                    pdfClean(x.como_se_detecto || ""),
                    pdfClean(x.correccion || "")
                ]),
                y, { 0: { cellWidth: 58 }, 1: { cellWidth: 78 }, 2: { cellWidth: 92 }, 3: { cellWidth: 105 }, 4: { cellWidth: 95 }, 5: { cellWidth: 92 } },
                "5", "Bitácora metodológica de uso de IA y trazabilidad"
            );
        }

        if (sources.length) {
            y = pdfHeading(doc, "6. Referencias y fuentes del caso", y + 8, 1);
            sources.forEach(f => {
                const ref = pdfClean(`${f.titulo || "Fuente sin título"}. ${f.url || ""}`);
                const lines = doc.splitTextToSize(ref, CW - 18);
                y = pdfEnsure(doc, y, 24);
                doc.setFont("times", "normal"); doc.setFontSize(12);
                lines.forEach((line, j) => { doc.text(line, 72 + (j === 0 ? 0 : 36), y); y += 24; });
                y += 4;
            });
        }

        for (let page = 2; page <= doc.getNumberOfPages(); page++) {
            doc.setPage(page); pdfHeader(doc);
        }
        const fileName = (c.titulo || "caso_mml").replace(/[^a-z0-9áéíóúñü _-]/gi, "").replace(/\s+/g, "_").slice(0, 70);
        doc.save(`Formulacion_MML_Pasos_1_2_y_3_${fileName || "caso"}.pdf`);

        D.bitacora = D.bitacora || [];
        D.bitacora.unshift({
            fecha: new Date().toISOString(),
            patron: "Generación de PDF académico APA 7",
            proposito: "Generar el documento formal de los pasos 1 y 2 con árbol jerárquico y EAP.",
            prompt: "Exportación del modelo MML revisado con criterios CEPAL.",
            salida: "PDF generado con portada, cuadros de involucrados, árbol de problemas, EAP y bitácora.",
            error_modelo: "No aplica.",
            como_se_detecto: "Validación automática de tablas y paginación APA 7.",
            correccion: "Revisar antes de la entrega final."
        });
        saveLocal(true);
        renderLog();
    } catch (err) {
        console.error(err);
        alert("No se pudo generar el PDF. Verifica la conexión y vuelve a intentarlo.");
    } finally {
        if (button) { button.disabled = false; button.textContent = button.dataset.oldText || "Descargar PDF · Pasos 1, 2 y 3"; }
    }
}

function deriveActions() {
    const means = D.objetivos.filter(o => o.tipo.includes('Medio'));
    if (!means.length)
        return alert('Construye primero el árbol de objetivos.');
    D.acciones = means.map((m, i) => (
        { id: 'AC' + (i + 1), medio: m.codigo, accion: toAction(m.enunciado), origen: m.codigo }));
    render()
}
function addAlternative() {
    const id = 'ALT' + (D.alternativas.length + 1);
    D.alternativas.push(
        {
            id, nombre: 'Alternativa ' + (D.alternativas.length + 1), acciones: [], scores:
                { pertinencia: 3, eficacia: 3, eficiencia: 3, viabilidad: 3, sostenibilidad: 3 },
            seleccionada: false
        });
    render()
}
function saveStrategy() {
    D.estrategia.justificacion = document.getElementById('strategyJustification').value.trim();
    const s = D.alternativas.find(a => a.id === D.estrategia.seleccionada);
    if (!s)
        return alert('Selecciona una alternativa.');
    addLog({
        patron: 'Selección de estrategia', salida: 'Seleccionada ' + s.nombre + '.', correccion: D.estrategia.justificacion || 'Justificación pendiente.'
    }); alert('Estrategia guardada. Exporta el JSON para conservar el estado.')
}

function init() {
    buildNav();
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.caso) { D = parsed }
        }
    } catch (e) { }
    render();
}
init();

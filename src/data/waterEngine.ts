import { FullAssessmentAnswers, SavedWaterPlan, Language, VideoReference } from "../types";

export const APPROVED_VIDEOS: VideoReference[] = [
  {
    id: "v1",
    titleEn: "How to Safely Treat and Store Drinking Water at Home",
    titleEs: "Cómo tratar y almacenar agua potable de forma segura en casa",
    sourceOrg: "CDC / WASH",
    duration: "3 mins",
    url: "https://www.cdc.gov/healthywater/global/household/treatment.html",
  },
  {
    id: "v2",
    titleEn: "SODIS Solar Water Disinfection Guide",
    titleEs: "Guía de Desinfección Solar de Agua (SODIS)",
    sourceOrg: "UNICEF / SODIS Foundation",
    duration: "4 mins",
    url: "https://www.sodis.ch/",
  },
  {
    id: "v3",
    titleEn: "How to Make and Clean a Simple Sand & Cloth Water Filter",
    titleEs: "Cómo hacer y limpiar un filtro sencillo de arena y tela",
    sourceOrg: "WHO / Emergency WASH",
    duration: "5 mins",
    url: "https://www.who.int/water_sanitation_health/emergencies/en/",
  },
];

export function generateWaterPlan(
  answers: FullAssessmentAnswers,
  lang: Language
): SavedWaterPlan {
  const isEs = lang === "es";

  // Check for critical contamination risks
  const hasChemicalOrExtremeRisk = answers.concerns.some((c) =>
    ["sewage", "pesticides", "industrial", "flooding", "sickness"].includes(c)
  );

  const isMuddyOrCloudy = answers.visualClarity.some((v) =>
    ["cloudy", "muddy", "unusual_color", "floating_material"].includes(v)
  );

  const hasFireOrStove = answers.availableMaterials.includes("stove");
  const hasBleach = answers.availableMaterials.includes("bleach");
  const hasSun = answers.availableMaterials.includes("sunlight");

  // Determine Safety Status
  let safetyStatus: "caution" | "testing_recommended" | "do_not_use_without_advice" = "caution";
  let safetyMessage = isEs
    ? "PRECAUCIÓN: HydroAccess brinda orientación práctica, pero no puede realizar análisis de laboratorio. Siga todos los pasos minuciosamente."
    : "CAUTION: HydroAccess provides practical guidance, but cannot perform laboratory water tests. Follow all instructions carefully.";

  if (hasChemicalOrExtremeRisk) {
    safetyStatus = "testing_recommended";
    safetyMessage = isEs
      ? "ADVERTENCIA: Reportaste posibles riesgos químicos, aguas negras o enfermedad. Se recomienda encarecidamente consultar a autoridades locales o realizar análisis profesionales."
      : "WARNING: You reported potential chemical, sewage, or illness risks. Professional testing or local health authority advice is strongly recommended.";
  }

  // 1. Situation Summary
  let situationSummary = isEs
    ? `Fuente: ${answers.waterSource}. Aspecto: ${answers.visualClarity.join(", ")}. Uso: ${answers.needHelpWith}. Personas: ${answers.householdSize}.`
    : `Source: ${answers.waterSource}. Appearance: ${answers.visualClarity.join(", ")}. Use: ${answers.needHelpWith}. Household: ${answers.householdSize} people.`;

  // 2. Select Disinfection Method
  let disinfectionMethod: "boiling" | "bleach" | "sodis" = "boiling";
  if (hasFireOrStove) {
    disinfectionMethod = "boiling";
  } else if (hasBleach) {
    disinfectionMethod = "bleach";
  } else if (hasSun && !isMuddyOrCloudy) {
    disinfectionMethod = "sodis";
  } else if (hasBleach) {
    disinfectionMethod = "bleach";
  }

  // 3. Select Filtration Method & Diagram Type
  let diagramType: "layered_filter" | "sodis_bottle" | "cloth_bucket" | "boiling_pot" = "cloth_bucket";
  let filterName = isEs ? "Filtro de Tela Fina" : "Fine Cotton Cloth Filter";

  const hasSandGravel =
    answers.availableMaterials.includes("sand") &&
    answers.availableMaterials.includes("gravel");

  if (isMuddyOrCloudy && hasSandGravel) {
    diagramType = "layered_filter";
    filterName = isEs ? "Filtro de Arena, Grava y Carbón" : "Layered Sand, Gravel & Charcoal Filter";
  } else if (disinfectionMethod === "sodis") {
    diagramType = "sodis_bottle";
  } else if (disinfectionMethod === "boiling" && !isMuddyOrCloudy) {
    diagramType = "boiling_pot";
  }

  // 4. Build Suggested System Steps
  const suggestedSteps = [
    {
      phase: isEs ? "1. Recolección y Reposo" : "1. Collection & Settling",
      action: isEs
        ? "Recolecte el agua en un recipiente limpio. Si tiene tierra o lodo, déjela reposar de 1 a 2 horas para que el lodo se asiente al fondo."
        : "Collect water in a clean bucket. If muddy, let it sit still for 1 to 2 hours so heavy dirt settles to the bottom.",
    },
    {
      phase: isEs ? `2. Filtración (${filterName})` : `2. Filtration (${filterName})`,
      action: isEs
        ? "Vierta cuidadosamente el agua clara de arriba a través del filtro sin revolver el barro asentado."
        : "Pour the clear water from the top through your filter into a second clean container without stirring up the bottom dirt.",
    },
  ];

  if (disinfectionMethod === "boiling") {
    suggestedSteps.push({
      phase: isEs ? "3. Desinfección (Ebullición)" : "3. Disinfection (Boiling)",
      action: isEs
        ? "Lleve el agua a un hervor constante y borboteante durante 1 minuto completo (3 minutos si está en zona de montaña)."
        : "Bring the filtered water to a full rolling boil for 1 full minute (3 minutes at high altitude).",
    });
  } else if (disinfectionMethod === "bleach") {
    suggestedSteps.push({
      phase: isEs ? "3. Desinfección (Cloro / Blanqueador)" : "3. Disinfection (Household Bleach)",
      action: isEs
        ? "Agregue 2 gotas de cloro común sin aroma por cada litro de agua clara (o 4 gotas si sigue algo nublada). Mezcle y espere 30 minutos."
        : "Add 2 drops of plain unscented bleach per 1 liter of clear water (or 4 drops if slightly cloudy). Stir and wait 30 minutes.",
    });
  } else {
    suggestedSteps.push({
      phase: isEs ? "3. Desinfección (Solar SODIS)" : "3. Disinfection (SODIS Solar)",
      action: isEs
        ? "Llene botellas de plástico PET transparentes y colóquelas al sol directo sobre un techo de lámina durante 6 horas continuas."
        : "Fill clear plastic PET bottles completely and leave horizontally in direct sunlight for 6 continuous hours.",
    });
  }

  suggestedSteps.push({
    phase: isEs ? "4. Almacenamiento Seguro" : "4. Safe Storage",
    action: isEs
      ? "Guarde el agua tratada en un recipiente limpio con tapa ajustada. Vierta el agua usando un grifo o jarra limpia; nunca meta las manos."
      : "Store treated water in a clean, covered container with a tight lid. Pour water out using a tap or clean ladle; never dip hands directly inside.",
  });

  // 5. Materials Needed List
  const materialsNeeded = [
    {
      name: isEs ? "2 Cubetas o recipientes limpios con tapa" : "2 Clean buckets or containers with lids",
      alreadyHave: answers.availableMaterials.includes("containers"),
      substitute: isEs ? "Garrafones o bidones de plástico bien lavados" : "Washed large water jugs or pots",
    },
    {
      name: isEs ? "Tela limpia de algodón (camiseta o paño)" : "Clean cotton cloth (T-shirt or towel)",
      alreadyHave: answers.availableMaterials.includes("cloth"),
      substitute: isEs ? "Sábana limpia doblada en 4 a 8 capas" : "Clean bedsheet folded in 4 to 8 layers",
    },
  ];

  if (diagramType === "layered_filter") {
    materialsNeeded.push(
      {
        name: isEs ? "Arena limpia y lavada" : "Clean, washed fine sand",
        alreadyHave: answers.availableMaterials.includes("sand"),
        substitute: isEs ? "Arena de construcción lavada varias veces con agua hirviendo" : "Construction sand washed thoroughly with clean water",
      },
      {
        name: isEs ? "Grava o piedras pequeñas lavadas" : "Washed small gravel or pebbles",
        alreadyHave: answers.availableMaterials.includes("gravel"),
        substitute: isEs ? "Piedras pequeñas de río bien lavadas" : "Small river pebbles washed clean",
      },
      {
        name: isEs ? "Carbón vegetal triturado (sin químicos de barbacoa)" : "Crushed charcoal (plain, non-chemical)",
        alreadyHave: answers.availableMaterials.includes("charcoal"),
        substitute: isEs ? "Carbón natural de madera cocida" : "Natural burnt wood charcoal",
      }
    );
  }

  if (disinfectionMethod === "bleach") {
    materialsNeeded.push({
      name: isEs ? "Cloro / blanqueador líquido común (5-6% sin aroma)" : "Plain unscented liquid bleach (5-6%)",
      alreadyHave: answers.availableMaterials.includes("bleach"),
      substitute: isEs ? "Pastillas purificadoras de cloro para agua" : "Water purification chlorine tablets",
    });
  }

  // 6. Build Instructions
  const buildInstructions =
    diagramType === "layered_filter"
      ? isEs
        ? [
            "Lave muy bien un recipiente grande de plástico y haga pequeños agujeros en el fondo.",
            "Coloque una capa de tela limpia o gasa en el fondo para evitar que los materiales se salgan.",
            "Agregue una capa de 5 a 10 cm de grava o piedras pequeñas lavadas en el fondo.",
            "Agregue una capa de 5 a 10 cm de carbón vegetal molido bien lavado sobre la grava.",
            "Agregue una capa gruesa de 15 a 20 cm de arena fina lavada sobre el carbón.",
            "Coloque otra tela limpia arriba para proteger la arena al verter el agua.",
          ]
        : [
            "Thoroughly wash a large plastic container and make tiny drainage holes in the bottom.",
            "Place a piece of clean cloth at the bottom so materials do not spill out.",
            "Add a 5 to 10 cm layer of washed small gravel at the bottom.",
            "Add a 5 to 10 cm layer of crushed natural charcoal over the gravel.",
            "Add a thick 15 to 20 cm layer of fine, washed sand over the charcoal.",
            "Place a clean cloth over the top layer of sand to prevent disturbing it when pouring water.",
          ]
      : isEs
      ? [
          "Tome una cubeta o recipiente limpio y desinfectado.",
          "Doble una tela de algodón limpia entre 4 y 8 capas.",
          "Sujete firmemente la tela sobre la boca de la cubeta usando una cuerda o liga.",
          "Asegúrese de que la tela cuelgue un poco hacia adentro para recibir el agua.",
        ]
      : [
          "Take a clean, sanitized bucket or container.",
          "Fold a clean cotton cloth 4 to 8 layers thick.",
          "Secure the folded cloth tightly over the top opening of the bucket using string or an elastic band.",
          "Ensure the cloth dips slightly downward into the opening to catch poured water.",
        ];

  // 7. Use Instructions
  const useInstructions = isEs
    ? [
        "Vierta el agua recolectada lentamente sobre la tela o filtro.",
        "Deje que el agua gotee suavemente hacia el recipiente receptor inferior.",
        "Asegúrese de realizar el paso de desinfección (hervir, cloro o sol) inmediatamente después de filtrar.",
      ]
    : [
        "Pour the collected water slowly through the cloth or filter.",
        "Allow the water to filter gently into the bottom receiving vessel.",
        "Always complete the disinfection step (boiling, bleach, or sunlight) immediately after filtering.",
      ];

  // 8. Maintenance Instructions
  const maintenanceInstructions = isEs
    ? [
        "Cada día: Lave la tela filtrante con agua limpia y déjela secar al sol directo.",
        "Cada semana: Lave los recipientes de almacenamiento con un poco de agua con cloro.",
        "Cuando el filtro filtre muy despacio: Lave cuidadosamente la capa superior de arena con agua limpia.",
      ]
    : [
        "Every day: Wash the filter cloth with clean water and dry thoroughly in direct sunlight.",
        "Once a week: Sanitize storage containers using a few drops of bleach and clean water.",
        "When water filters slowly: Carefully scoop off and wash the top layer of sand with clean water.",
      ];

  // 9. Limitations ("What this does NOT fix")
  const limitations = isEs
    ? [
        "Este sistema elimina tierra, suciedad y muchos parásitos grandes.",
        "NO elimina químicos industriales, sal marina, pesticidas ni metales pesados.",
        "El filtrado solo limpia la apariencia; SIEMPRE debe desinfectar con calor, cloro o sol para eliminar virus y bacterias.",
      ]
    : [
        "This system removes dirt, sediment, and large parasites.",
        "It does NOT remove industrial chemicals, sea salt, pesticides, or heavy metals.",
        "Filtration only clarifies the water; you MUST always complete the disinfection step (heat, bleach, or sun) to kill germs.",
      ];

  // 10. System-Specific Video Reference Links
  const videoLinks: VideoReference[] = [];

  // Filter build reference video
  if (diagramType === "layered_filter") {
    videoLinks.push({
      id: "vid_sand_filter",
      titleEn: "How to Build a DIY Sand & Charcoal Water Filter",
      titleEs: "Cómo construir un filtro casero de arena y carbón",
      sourceOrg: "CAWST / WASH Reference Video",
      duration: "6 mins",
      url: "https://www.youtube.com/results?search_query=how+to+build+diy+sand+gravel+charcoal+water+filter",
      referenceLabelEn: "Video for your reference (Building a Sand & Charcoal Filter)",
      referenceLabelEs: "Video para su referencia (Construcción de filtro de arena y carbón)",
    });
  } else if (diagramType === "sodis_bottle") {
    videoLinks.push({
      id: "vid_sodis",
      titleEn: "SODIS Solar Water Disinfection Step-by-Step Guide",
      titleEs: "Guía paso a paso de Desinfección Solar de Agua (SODIS)",
      sourceOrg: "SODIS Foundation / Eawag",
      duration: "4 mins",
      url: "https://www.youtube.com/results?search_query=SODIS+solar+water+disinfection+tutorial",
      referenceLabelEn: "Video for your reference (Solar Disinfection Method)",
      referenceLabelEs: "Video para su referencia (Método de desinfección solar)",
    });
  } else if (diagramType === "cloth_bucket") {
    videoLinks.push({
      id: "vid_cloth_filter",
      titleEn: "Emergency Water Filtration Using Clean Cloth & Buckets",
      titleEs: "Filtración de agua de emergencia con telas y cubetas",
      sourceOrg: "CDC Emergency WASH Video",
      duration: "3 mins",
      url: "https://www.youtube.com/results?search_query=how+to+filter+water+with+cloth+emergency+cdc",
      referenceLabelEn: "Video for your reference (Cloth Filtering Technique)",
      referenceLabelEs: "Video para su referencia (Técnica de filtrado con tela)",
    });
  }

  // Disinfection method reference video
  if (disinfectionMethod === "boiling") {
    videoLinks.push({
      id: "vid_boiling",
      titleEn: "How to Properly Boil Water for Safe Drinking",
      titleEs: "Cómo hervir agua correctamente para consumo seguro",
      sourceOrg: "WHO / CDC Health Guide",
      duration: "3 mins",
      url: "https://www.youtube.com/results?search_query=how+to+boil+water+safely+cdc",
      referenceLabelEn: "Video for your reference (Safe Boiling Procedure)",
      referenceLabelEs: "Video para su referencia (Procedimiento de ebullición segura)",
    });
  } else if (disinfectionMethod === "bleach") {
    videoLinks.push({
      id: "vid_bleach",
      titleEn: "How to Disinfect Drinking Water with Household Bleach",
      titleEs: "Cómo desinfectar agua para beber con cloro doméstico",
      sourceOrg: "CDC WASH / EPA Guidance Video",
      duration: "4 mins",
      url: "https://www.youtube.com/results?search_query=how+to+disinfect+water+with+household+bleach+cdc",
      referenceLabelEn: "Video for your reference (Bleach Dosing Guide)",
      referenceLabelEs: "Video para su referencia (Guía de dosificación de cloro)",
    });
  }

  // Safe Storage reference video
  videoLinks.push({
    id: "vid_storage",
    titleEn: "How to Safely Store Clean Drinking Water at Home",
    titleEs: "Cómo almacenar agua limpia de forma segura en casa",
    sourceOrg: "CDC / WASH Guidelines",
    duration: "3 mins",
    url: "https://www.cdc.gov/healthywater/global/household/treatment.html",
    referenceLabelEn: "Video for your reference (Safe Water Storage)",
    referenceLabelEs: "Video para su referencia (Almacenamiento seguro de agua)",
  });

  return {
    id: `plan_${Date.now()}`,
    savedAt: new Date().toLocaleDateString(),
    language: lang,
    situationSummary,
    safetyStatus,
    safetyMessage,
    suggestedSteps,
    materialsNeeded,
    buildInstructions,
    diagramType,
    useInstructions,
    maintenanceInstructions,
    limitations,
    videoLinks,
  };
}

import { HydroAssessment } from "../assessment/types";
import { SavedWaterPlan, Language, VideoReference } from "../../types";
import { evaluateSafetyGates } from "./safetyGates";
import { APPROVED_VIDEOS } from "../../data/waterEngine";

export function generateWaterPlanFromAssessment(
  assessment: HydroAssessment,
  lang: Language
): SavedWaterPlan {
  const isEs = lang === "es";
  const safetyEval = evaluateSafetyGates(assessment, lang);

  // 1. Situation Summary
  const country = assessment.geography.countryName || "Local area";
  const primarySource = assessment.waterAccess.primarySource || assessment.waterAccess.availableSources[0] || "unknown";
  const people = assessment.household.people || 1;
  const appearance = assessment.condition.appearance.join(", ");
  const uses = assessment.household.uses.join(", ");

  let situationSummary = isEs
    ? `Ubicación: ${country}. Fuente principal: ${primarySource}. Personas: ${people}. Aspecto: ${appearance}. Usos: ${uses}.`
    : `Location: ${country}. Primary source: ${primarySource}. Household: ${people} people. Appearance: ${appearance}. Uses: ${uses}.`;

  // Source Comparison Advice if user has multiple sources
  if (
    assessment.waterAccess.availableSources.length > 1 &&
    assessment.waterAccess.availableSources.includes("rainwater") &&
    (primarySource === "river" || primarySource === "stream" || primarySource === "lake_pond")
  ) {
    const extraAdvice = isEs
      ? " NOTA DE FUENTE: También reportó agua de lluvia. Recolectar agua de lluvia de un techo limpio suele requerir menos filtración que el agua de río o arroyo."
      : " SOURCE NOTE: You also reported rainwater access. Collecting roof rainwater is generally much cleaner and easier to filter than river or surface water.";
    situationSummary += extraAdvice;
  }

  // Safety Status mapping
  let safetyStatus: "caution" | "testing_recommended" | "do_not_use_without_advice" = "caution";
  if (safetyEval.isCriticalStop) {
    safetyStatus = "do_not_use_without_advice";
  } else if (safetyEval.outcome === "PROFESSIONAL_GUIDANCE_REQUIRED" || safetyEval.outcome === "TESTING_RECOMMENDED") {
    safetyStatus = "testing_recommended";
  }

  // If Critical Stop (Fuel, Do Not Use order)
  if (safetyEval.isCriticalStop) {
    return {
      id: `plan_stop_${Date.now()}`,
      savedAt: new Date().toLocaleDateString(),
      language: lang,
      situationSummary,
      safetyStatus,
      safetyMessage: `${safetyEval.titleEn}: ${safetyEval.messageEn}`,
      suggestedSteps: [
        {
          phase: isEs ? "1. Alto de Seguridad" : "1. Safety Stop",
          action: isEs
            ? "NO BEBA NI USE ESTA AGUA PARA PREPARAR ALIMENTOS. Esta fuente contiene contaminantes peligrosos."
            : "DO NOT DRINK OR USE THIS WATER FOR FOOD PREPARATION. This source contains severe hazards.",
        },
        {
          phase: isEs ? "2. Buscar Agua Alternativa" : "2. Seek Alternative Water",
          action: isEs
            ? "Utilice agua embotellada de fuente confiable, agua de camión cisterna certificado o ayuda de autoridades locales."
            : "Use verified bottled water, certified truck delivery, or seek emergency assistance from local authorities.",
        },
      ],
      materialsNeeded: [
        {
          name: isEs ? "Agua embotellada o de fuente limpia alternativa" : "Bottled water or alternative clean supply",
          alreadyHave: false,
          substitute: isEs ? "Suministro oficial de ayuda o camión cisterna" : "Official emergency supply or truck delivery",
        },
      ],
      buildInstructions: isEs
        ? [
            "No intente construir filtros caseros para esta agua.",
            "Contacte a autoridades de salud o del agua de su localidad.",
          ]
        : [
            "Do not attempt home filtration for this water.",
            "Contact local health or water authorities immediately.",
          ],
      diagramType: "boiling_pot",
      useInstructions: isEs
        ? ["Esta agua no debe ser consumida bajo ninguna circunstancia."]
        : ["This water must not be consumed under any circumstances."],
      maintenanceInstructions: isEs
        ? ["Manténgase atento a los comunicados oficiales de las autoridades."]
        : ["Monitor official health authority notices for updates."],
      limitations: isEs
        ? ["Los filtros de arena, tela y ebullición NO eliminan gasolina ni químicos industriales."]
        : ["Sand filters, cloth, and boiling DO NOT remove gasoline or industrial chemicals."],
      videoLinks: APPROVED_VIDEOS,
    };
  }

  // 2. Select Disinfection Method
  const hasStove = assessment.resources.utilities.some((u) => ["gas_stove", "wood_fire", "charcoal_fire", "cooking_fuel"].includes(u));
  const hasBleach = assessment.resources.materials.includes("bleach") || assessment.resources.materials.includes("purification_tablets");
  const hasSun = assessment.resources.utilities.includes("strong_sunlight") && assessment.resources.materials.includes("clear_pet_bottles");
  const isMuddyOrCloudy = assessment.condition.appearance.some((a) => ["cloudy", "muddy", "brown", "yellow", "green"].includes(a));
  const isHighAltitude = assessment.geography.elevationMeters && assessment.geography.elevationMeters >= 1500;

  let disinfectionMethod: "boiling" | "bleach" | "sodis" = "boiling";
  if (hasStove) {
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
  let filterName = isEs ? "Filtro de Tela Fina Doble" : "Fine Cotton Cloth Filter";

  const hasSand = assessment.resources.materials.includes("sand");
  const hasGravel = assessment.resources.materials.includes("gravel");

  if (isMuddyOrCloudy && hasSand && hasGravel) {
    diagramType = "layered_filter";
    filterName = isEs ? "Filtro de Arena, Grava y Carbón" : "Layered Sand, Gravel & Charcoal Filter";
  } else if (disinfectionMethod === "sodis") {
    diagramType = "sodis_bottle";
  } else if (disinfectionMethod === "boiling" && !isMuddyOrCloudy) {
    diagramType = "boiling_pot";
  }

  // 4. Build Suggested Steps
  const boilTimeText = isHighAltitude
    ? isEs
      ? "3 minutos completos (necesario por alta altitud/montaña)"
      : "3 full minutes (required due to high altitude)"
    : isEs
    ? "1 minuto completo a borbotones"
    : "1 full rolling minute";

  const suggestedSteps = [
    {
      phase: isEs ? "1. Reposo y Decantación" : "1. Settling & Decanting",
      action: isEs
        ? "Vierta el agua en una cubeta y déjela reposar de 1 a 2 horas en reposo absoluto para que la tierra pesada se asiente al fondo."
        : "Collect water in a clean bucket and let it sit undisturbed for 1 to 2 hours so heavy sediment settles to the bottom.",
    },
    {
      phase: isEs ? `2. Filtración (${filterName})` : `2. Filtration (${filterName})`,
      action: isEs
        ? "Vierta el agua clara de la superficie a través del filtro en un segundo recipiente limpio, sin agitar el sedimento del fondo."
        : "Pour the clear top water through your filter into a second clean container without stirring up bottom dirt.",
    },
  ];

  if (disinfectionMethod === "boiling") {
    suggestedSteps.push({
      phase: isEs ? "3. Desinfección por Ebullición" : "3. Disinfection (Boiling)",
      action: isEs
        ? `Lleve el agua a ebullición intensa y constante durante ${boilingTimeText(isHighAltitude, isEs)}.`
        : `Bring the filtered water to a full rolling boil for ${boilTimeText}.`,
    });
  } else if (disinfectionMethod === "bleach") {
    suggestedSteps.push({
      phase: isEs ? "3. Desinfección con Cloro" : "3. Disinfection (Household Bleach)",
      action: isEs
        ? "Agregue 2 gotas de cloro común sin aroma por cada litro de agua clara (4 gotas si está nublada). Mezcle y espere 30 minutos obligatorios."
        : "Add 2 drops of plain unscented liquid bleach per 1 liter of clear water (4 drops if slightly cloudy). Stir well and wait 30 full minutes.",
    });
  } else {
    suggestedSteps.push({
      phase: isEs ? "3. Desinfección Solar (SODIS)" : "3. Solar Disinfection (SODIS)",
      action: isEs
        ? "Llene botellas PET transparentes y colóquelas al sol directo sobre lámina o concreto durante 6 horas continuas."
        : "Fill clear plastic PET bottles completely and place horizontally in direct sunlight for 6 continuous hours.",
    });
  }

  // Safe storage instruction
  let storageAdvice = isEs
    ? "Guarde el agua tratada en un recipiente limpio con tapa. Sirva el agua inclinando el recipiente o usando un grifo en la base; nunca introduzca tazas ni manos al recipiente."
    : "Store treated water in a clean container with a tight lid. Pour water out or use a bottom faucet tap; never dip hands or cups directly inside.";

  if (assessment.storage.withdrawalMethod === "hands_touch" || assessment.storage.withdrawalMethod === "cup_scoop") {
    storageAdvice += isEs
      ? " ADVERTENCIA: Reportó que se usan tazas o manos para sacar el agua. Esto la vuelve a contaminar. Por favor instale una llave en la base o sirva inclinando."
      : " WARNING: Dipping cups or hands re-contaminates safe water. Please pour water or install a bottom tap.";
  }

  suggestedSteps.push({
    phase: isEs ? "4. Almacenamiento Seguro" : "4. Safe Storage",
    action: storageAdvice,
  });

  // 5. Materials List
  const materialsNeeded = [
    {
      name: isEs ? "2 Cubetas o recipientes limpios con tapa" : "2 Clean buckets or containers with lids",
      alreadyHave: assessment.resources.materials.some((m) => ["buckets", "lidded_containers", "large_tank"].includes(m)),
      substitute: isEs ? "Garrafones o bidones bien lavados" : "Washed large water jugs or pots",
    },
    {
      name: isEs ? "Tela limpia de algodón (camiseta o paño)" : "Clean cotton cloth (T-shirt or bedsheet)",
      alreadyHave: assessment.resources.materials.includes("clean_cloth"),
      substitute: isEs ? "Sábana limpia doblada en 4 u 8 capas" : "Clean folded bedsheet layer",
    },
  ];

  if (diagramType === "layered_filter") {
    materialsNeeded.push(
      {
        name: isEs ? "Arena fina lavada" : "Washed fine sand",
        alreadyHave: assessment.resources.materials.includes("sand"),
        substitute: isEs ? "Arena de construcción lavada varias veces" : "Clean river sand washed thoroughly",
      },
      {
        name: isEs ? "Grava o piedras pequeñas lavadas" : "Washed small gravel or pebbles",
        alreadyHave: assessment.resources.materials.includes("gravel"),
        substitute: isEs ? "Piedras pequeñas de río bien lavadas" : "Small pebbles washed clean",
      },
      {
        name: isEs ? "Carbón vegetal triturado (sin químicos)" : "Crushed charcoal (plain, non-chemical)",
        alreadyHave: assessment.resources.materials.includes("activated_charcoal"),
        substitute: isEs ? "Carbón natural de madera cocida" : "Natural burnt wood charcoal",
      }
    );
  }

  if (disinfectionMethod === "bleach") {
    materialsNeeded.push({
      name: isEs ? "Cloro / blanqueador líquido común (5-6% sin aroma)" : "Plain unscented liquid bleach (5-6%)",
      alreadyHave: assessment.resources.materials.includes("bleach"),
      substitute: isEs ? "Pastillas purificadoras de cloro" : "Chlorine purification tablets",
    });
  }

  // 6. Build Instructions
  const buildInstructions =
    diagramType === "layered_filter"
      ? isEs
        ? [
            "Lave muy bien un recipiente alto o garrafón y hágale pequeños orificios en la base.",
            "Coloque una tela limpia en el fondo para evitar que los materiales se salgan.",
            "Agregue una capa de 5 a 10 cm de grava o piedras pequeñas lavadas en la base.",
            "Agregue una capa de 5 a 10 cm de carbón vegetal molido sin químicos sobre la grava.",
            "Agregue una capa gruesa de 15 a 20 cm de arena fina lavada sobre el carbón.",
            "Coloque otra tela limpia sobre la arena para no removerla al verter agua.",
          ]
        : [
            "Thoroughly wash a tall container and make small drainage holes at the bottom.",
            "Place a piece of clean cloth at the bottom so materials do not spill.",
            "Add a 5 to 10 cm layer of washed small gravel at the base.",
            "Add a 5 to 10 cm layer of crushed natural charcoal over the gravel.",
            "Add a thick 15 to 20 cm layer of fine washed sand over the charcoal.",
            "Place a clean cloth over the top sand layer to protect it when pouring water.",
          ]
      : isEs
      ? [
          "Tome una cubeta o vasija limpia y desinfectada.",
          "Doble una tela de algodón limpia entre 4 y 8 capas.",
          "Sujete firmemente la tela sobre la boca de la cubeta usando una cuerda o liga.",
          "Deje que la tela cuelgue un poco hacia adentro para recibir el agua vertida.",
        ]
      : [
          "Take a clean, sanitized bucket or pot.",
          "Fold a clean cotton cloth 4 to 8 layers thick.",
          "Secure the cloth tightly over the top opening using string or an elastic band.",
          "Ensure the cloth dips slightly downward into the container to catch water.",
        ];

  // 7. Use Instructions
  const useInstructions = isEs
    ? [
        "Vierta el agua recolectada lentamente sobre la tela o filtro.",
        "Deje que el agua filtre suavemente al recipiente inferior.",
        "Realice SIEMPRE la desinfección (hervir, cloro o sol) inmediatamente después de filtrar.",
      ]
    : [
        "Pour collected water slowly through the cloth or filter.",
        "Allow water to filter gently into the bottom container.",
        "ALWAYS complete the disinfection step (boil, bleach, or sun) immediately after filtering.",
      ];

  // 8. Maintenance
  const maintenanceInstructions = isEs
    ? [
        "Diario: Lave la tela filtrante con agua limpia y séquela al sol directo.",
        "Semanal: Lave los recipientes de almacenamiento con un poco de agua con cloro.",
        "Cuando filtre muy lento: Lave suavemente la capa superior de arena con agua limpia.",
      ]
    : [
        "Daily: Wash the filter cloth with clean water and dry in direct sunlight.",
        "Weekly: Sanitize storage containers using a few drops of bleach and clean water.",
        "When filtering slows: Gently scoop and wash the top layer of sand with clean water.",
      ];

  // 9. Limitations
  const limitations = isEs
    ? [
        "Este sistema elimina tierra, suciedad y parásitos grandes.",
        "NO elimina químicos industriales, sal marina, pesticidas ni metales pesados.",
        "La filtración solo aclara el agua; SIEMPRE debe desinfectar con calor, cloro o sol para eliminar virus y bacterias.",
      ]
    : [
        "This system removes sediment, dirt, and large parasites.",
        "It does NOT remove industrial chemicals, sea salt, pesticides, or heavy metals.",
        "Filtration only clarifies water; you MUST always complete the disinfection step to kill viruses and bacteria.",
      ];

  return {
    id: `plan_${Date.now()}`,
    savedAt: new Date().toLocaleDateString(),
    language: lang,
    situationSummary,
    safetyStatus,
    safetyMessage: safetyEval.messageEs && isEs ? safetyEval.messageEs : safetyEval.messageEn,
    suggestedSteps,
    materialsNeeded,
    buildInstructions,
    diagramType,
    useInstructions,
    maintenanceInstructions,
    limitations,
    videoLinks: APPROVED_VIDEOS,
  };
}

function boilingTimeText(isHighAltitude?: boolean, isEs?: boolean): string {
  if (isHighAltitude) {
    return isEs ? "3 minutos completos (debido a la alta altitud)" : "3 full minutes (due to high altitude)";
  }
  return isEs ? "1 minuto completo" : "1 full minute";
}

import { HydroAssessment } from "../assessment/types";
import { Language } from "../../types";

export type SafetyOutcome =
  | "NORMAL_RECOMMENDATION"
  | "TESTING_RECOMMENDED"
  | "PROFESSIONAL_GUIDANCE_REQUIRED"
  | "DO_NOT_USE_WATER"
  | "OFFICIAL_ADVISORY_OVERRIDES";

export interface SafetyEvaluation {
  outcome: SafetyOutcome;
  titleEn: string;
  titleEs: string;
  messageEn: string;
  messageEs: string;
  isCriticalStop: boolean;
}

export function evaluateSafetyGates(
  assessment: HydroAssessment,
  lang: Language
): SafetyEvaluation {
  const isEs = lang === "es";

  // 1. Official Advisory Overrides
  if (assessment.safety.warningType === "do-not-use") {
    return {
      outcome: "OFFICIAL_ADVISORY_OVERRIDES",
      titleEn: "CRITICAL SAFETY ALERT: OFFICIAL DO NOT USE ADVISORY",
      titleEs: "ALERTA CRÍTICA DE SEGURIDAD: ORDEN OFICIAL DE NO USAR",
      messageEn:
        "Local authorities have issued an official 'DO NOT USE' order for this water. Household filtration or boiling cannot make this water safe. Please seek an alternative emergency water supply immediately.",
      messageEs:
        "Las autoridades locales han emitido una orden oficial de 'NO USAR' esta agua. Ningún filtro casero o hervido puede hacerla segura. Por favor busque una fuente de agua de emergencia alternativa de inmediato.",
      isCriticalStop: true,
    };
  }

  if (assessment.safety.warningType === "do-not-drink") {
    return {
      outcome: "OFFICIAL_ADVISORY_OVERRIDES",
      titleEn: "OFFICIAL WARNING: DO NOT DRINK THIS WATER",
      titleEs: "ADVERTENCIA OFICIAL: NO BEBER ESTA AGUA",
      messageEn:
        "Local health officials warn that this water is unsafe for drinking or cooking. Use this water only for non-ingestion purposes (like washing clothes or flushing toilets) if permitted by local advisories.",
      messageEs:
        "Las autoridades de salud advierten que esta agua no es segura para beber ni cocinar. Úsela únicamente para limpieza no comestible si las autoridades lo permiten.",
      isCriticalStop: true,
    };
  }

  // 2. Fuel / Gasoline Smell
  const hasFuelOdor = assessment.condition.odors.includes("fuel_gasoline");
  if (hasFuelOdor) {
    return {
      outcome: "DO_NOT_USE_WATER",
      titleEn: "HIGH HAZARD: FUEL / GASOLINE CONTAMINATION DETECTED",
      titleEs: "ALTO RIESGO: CONTAMINACIÓN CON COMBUSTIBLE / GASOLINA",
      messageEn:
        "Water with a fuel or gasoline smell contains toxic hydrocarbons. Boiling or homemade cloth/sand filters CANNOT remove fuel and boiling may create hazardous fumes. DO NOT drink or use this water.",
      messageEs:
        "El agua con olor a gasolina o combustible contiene hidrocarburos tóxicos. Hervirla o usar filtros de tela/arena NO elimina la gasolina y hervir produce vapores peligrosos. NO beba ni use esta agua.",
      isCriticalStop: true,
    };
  }

  // 3. Chemical / Factory Smell or Industrial / Mining / Pesticide risks
  const hasChemicalOdor = assessment.condition.odors.includes("chemical");
  const hasPesticidesOrMining = assessment.condition.nearbyRisks.some((r) =>
    ["pesticides_fertilizer", "factories", "workshops", "mining", "fuel_storage"].includes(r)
  );

  if (hasChemicalOdor || hasPesticidesOrMining) {
    return {
      outcome: "PROFESSIONAL_GUIDANCE_REQUIRED",
      titleEn: "CHEMICAL OR INDUSTRIAL CONTAMINATION RISK",
      titleEs: "RIESGO DE CONTAMINACIÓN QUÍMICA O INDUSTRIAL",
      messageEn:
        "You reported chemical smells, pesticides, or nearby factory/mining activity. Standard household water filters and boiling DO NOT remove chemical toxins or heavy metals. Laboratory water testing and professional treatment are required before drinking.",
      messageEs:
        "Reportó olores a químicos, plaguicidas o actividades industriales cerca. Los filtros caseros y hervir el agua NO eliminan toxinas químicas ni metales pesados. Se requiere análisis de laboratorio y orientación profesional.",
      isCriticalStop: false,
    };
  }

  // 4. Sewage or Flooding Severe Biological Risks
  const hasSewage = assessment.condition.odors.includes("sewage") || assessment.condition.nearbyRisks.includes("toilets_sewage");
  const hasFlooding = assessment.geography.environmentalEvents.includes("flooding") || assessment.condition.nearbyRisks.includes("floodwater");

  if (hasSewage || hasFlooding) {
    return {
      outcome: "TESTING_RECOMMENDED",
      titleEn: "HIGH SEWAGE / BIOLOGICAL CONTAMINATION RISK",
      titleEs: "ALTO RIESGO DE CONTAMINACIÓN BIOLÓGICA O AGUAS NEGRAS",
      messageEn:
        "There is significant sewage or floodwater contamination risk. Complete multi-stage treatment (thorough filtration PLUS full boiling or double chlorination) is mandatory. Laboratory testing is strongly recommended.",
      messageEs:
        "Existe un riesgo elevado de contaminación por drenaje o inundación. Es indispensable realizar filtrado completo MÁS ebullición intensa o cloración doble. Se recomienda fuertemente un análisis de laboratorio.",
      isCriticalStop: false,
    };
  }

  // 5. Normal Safety Status
  return {
    outcome: "NORMAL_RECOMMENDATION",
    titleEn: "PRACTICAL GUIDANCE & CAUTION",
    titleEs: "ORIENTACIÓN PRÁCTICA Y PRECAUCIÓN",
    messageEn:
      "HydroAccess provides practical household water treatment guidance. Follow all settling, filtration, disinfection, and safe storage steps carefully.",
    messageEs:
      "HydroAccess proporciona orientación práctica para el tratamiento de agua en el hogar. Siga atentamente los pasos de reposo, filtrado, desinfección y almacenamiento seguro.",
    isCriticalStop: false,
  };
}

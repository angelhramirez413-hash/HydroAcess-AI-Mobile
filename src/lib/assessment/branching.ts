import { HydroAssessment, AssessmentStageId, AssessmentQuestion } from "./types";
import { QUESTIONS } from "./questions";

export function getApplicableQuestions(assessment: HydroAssessment): AssessmentQuestion[] {
  return QUESTIONS.filter((q) => {
    try {
      return q.isVisible(assessment);
    } catch {
      return false;
    }
  });
}

export function getQuestionsForStage(
  assessment: HydroAssessment,
  stage: AssessmentStageId
): AssessmentQuestion[] {
  return getApplicableQuestions(assessment).filter((q) => q.stage === stage);
}

export function calculateProgress(
  assessment: HydroAssessment,
  currentQuestionId: string
): { currentStep: number; totalQuestions: number; percentage: number } {
  const applicable = getApplicableQuestions(assessment);
  const totalQuestions = Math.max(applicable.length, 1);
  const index = applicable.findIndex((q) => q.id === currentQuestionId);
  const currentStep = index >= 0 ? index + 1 : 1;
  const percentage = Math.min(100, Math.round((currentStep / totalQuestions) * 100));

  return { currentStep, totalQuestions, percentage };
}

export function getInitialAssessment(locale: "en" | "es" = "en"): HydroAssessment {
  return {
    version: 1,
    locale,
    geography: {
      countryCode: "MX",
      countryName: "Mexico",
      region: "",
      locality: "",
      setting: "rural",
      elevationMeters: 1600,
      elevationSource: "estimated",
      climateConfirmed: false,
      climate: {
        general: "Tropical / Subtropical seasonal climate",
        rainfallPattern: "Distinct wet and dry seasons",
        source: "derived",
      },
      environmentalEvents: ["none"],
    },
    environment: {
      weather: ["hot"],
      rainFrequency: "seasonal",
    },
    household: {
      people: 4,
      uses: ["drinking", "cooking"],
      needLevel: "drinking-cooking",
      urgency: "today",
    },
    waterAccess: {
      availableSources: ["rainwater", "well"],
      primarySource: "well",
      availability: "year-round",
      accessDifficulty: "under-10-min",
    },
    condition: {
      appearance: ["clear"],
      odors: ["none"],
      nearbyRisks: ["none"],
      recentChanges: "no",
    },
    safety: {
      warningSource: "no",
      warningType: "none",
      tested: "no",
      knownContaminants: [],
    },
    sourceDetails: {
      rainwater: {
        surface: "roof",
        roofMaterial: "metal",
        firstFlush: "yes",
        containerCovered: "yes",
        animalsOnSurface: "no",
      },
      well: {
        wellType: "hand_dug",
        isCovered: "yes",
        extractionMethod: "hand_pump",
        floodReached: "no",
        nearbyRisks: ["none"],
      },
    },
    resources: {
      materials: ["buckets", "clean_cloth", "bleach", "metal_pot"],
      utilities: ["electricity_full", "gas_stove", "strong_sunlight"],
      tools: ["knife_scissors", "hand_tools"],
      space: "bucket",
    },
    constraints: {
      budget: "low",
      financialPriority: "lowest_cost",
      dailyTreatmentTime: "15-30",
      maintenance: "simple",
      replacementAccess: "yes",
    },
    storage: {
      type: "covered_bucket",
      withdrawalMethod: "pour",
    },
    preferences: {
      priorities: ["lowest_cost", "best_safety"],
    },
  };
}

export function cleanStaleSourceDetails(assessment: HydroAssessment): HydroAssessment {
  const activeSources = assessment.waterAccess.availableSources;
  const updatedDetails = { ...assessment.sourceDetails };

  if (!activeSources.includes("rainwater")) delete updatedDetails.rainwater;
  if (!activeSources.includes("well")) delete updatedDetails.well;
  if (!activeSources.includes("spring")) delete updatedDetails.spring;
  if (
    !activeSources.includes("river") &&
    !activeSources.includes("stream") &&
    !activeSources.includes("lake_pond")
  ) {
    delete updatedDetails.surfaceWater;
  }
  if (!activeSources.includes("piped")) delete updatedDetails.piped;
  if (!activeSources.includes("truck_delivered")) delete updatedDetails.delivered;

  return { ...assessment, sourceDetails: updatedDetails };
}

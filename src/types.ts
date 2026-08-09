export type Language = "en" | "es";

export type TabType = "home" | "how" | "advisor" | "about";

export type AdvisorSubTab = "assessment" | "chat";

export interface FullAssessmentAnswers {
  needHelpWith: string; // "drinking" | "cooking" | "household" | "emergency" | "multiple"
  waterSource: string; // "rain" | "well" | "surface" | "piped" | "delivered" | "other" | "unknown"
  visualClarity: string[]; // ["clear", "cloudy", "muddy", "unusual_color", "floating_material", "unknown"]
  concerns: string[]; // ["smell", "sewage", "pesticides", "industrial", "flooding", "animals", "sickness", "none", "unknown"]
  householdSize: string; // "1", "2-4", "5-8", "9+"
  availableMaterials: string[]; // ["containers", "cloth", "sand", "gravel", "charcoal", "bleach", "stove", "electricity", "sunlight", "none"]
  budget: string; // "minimal", "small", "moderate", "unsure"
  maintenanceCapacity: string; // "minimal", "regular_short", "regular_thorough", "unsure"
  urgency: string; // "today", "few_days", "planning"
}

export interface VideoReference {
  id: string;
  titleEn: string;
  titleEs: string;
  sourceOrg: string;
  duration: string;
  url: string;
  referenceLabelEn?: string;
  referenceLabelEs?: string;
}

export interface SavedWaterPlan {
  id: string;
  savedAt: string;
  language: Language;
  situationSummary: string;
  safetyStatus: "caution" | "testing_recommended" | "do_not_use_without_advice";
  safetyMessage: string;
  suggestedSteps: {
    phase: string;
    action: string;
  }[];
  materialsNeeded: {
    name: string;
    alreadyHave: boolean;
    substitute?: string;
  }[];
  buildInstructions: string[];
  diagramType: "layered_filter" | "sodis_bottle" | "cloth_bucket" | "boiling_pot";
  useInstructions: string[];
  maintenanceInstructions: string[];
  limitations: string[];
  videoLinks: VideoReference[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

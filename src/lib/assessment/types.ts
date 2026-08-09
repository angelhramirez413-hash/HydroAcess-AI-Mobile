import { Language } from "../../types";

export type AssessmentStageId =
  | "location"
  | "environment"
  | "needs"
  | "sources"
  | "condition"
  | "source_details"
  | "resources"
  | "cost_maintenance"
  | "storage"
  | "priorities"
  | "review";

export type WaterSourceType =
  | "rainwater"
  | "well"
  | "spring"
  | "river"
  | "stream"
  | "lake_pond"
  | "piped"
  | "public_point"
  | "truck_delivered"
  | "bottled"
  | "other_household"
  | "another"
  | "unknown";

export type SettingType =
  | "urban"
  | "town"
  | "rural"
  | "remote"
  | "temporary"
  | "unknown";

export type AppearanceSignal =
  | "clear"
  | "cloudy"
  | "muddy"
  | "brown"
  | "yellow"
  | "green"
  | "floating_material"
  | "oily_shiny"
  | "something_else"
  | "unknown";

export type OdorSignal =
  | "none"
  | "sewage"
  | "rotten_egg"
  | "fuel_gasoline"
  | "chemical"
  | "earthy"
  | "another"
  | "unknown";

export type EnvironmentalRisk =
  | "toilets_sewage"
  | "farm_animals"
  | "wildlife"
  | "farms_agriculture"
  | "pesticides_fertilizer"
  | "factories"
  | "workshops"
  | "mining"
  | "fuel_storage"
  | "trash"
  | "floodwater"
  | "dead_animals"
  | "heavy_algae"
  | "none"
  | "unknown";

export type EnvironmentalEvent =
  | "drought"
  | "flooding"
  | "storm"
  | "wildfire"
  | "earthquake"
  | "broken_system"
  | "shortage"
  | "sewage_problem"
  | "none"
  | "unknown";

export type WaterUse =
  | "drinking"
  | "cooking"
  | "washing_food"
  | "brushing_teeth"
  | "bathing"
  | "washing_dishes"
  | "cleaning"
  | "laundry"
  | "animals"
  | "farming"
  | "emergency";

export type AvailableMaterial =
  | "buckets"
  | "lidded_containers"
  | "bottles"
  | "large_tank"
  | "clean_cloth"
  | "metal_pot"
  | "sand"
  | "gravel"
  | "activated_charcoal"
  | "ceramic_filter"
  | "commercial_filter"
  | "purification_tablets"
  | "bleach"
  | "clear_pet_bottles"
  | "tubing_hose"
  | "spigot_faucet"
  | "none"
  | "other";

export type Utility =
  | "electricity_full"
  | "electricity_partial"
  | "gas_stove"
  | "wood_fire"
  | "charcoal_fire"
  | "cooking_fuel"
  | "strong_sunlight"
  | "none";

export type Tool =
  | "no_tools"
  | "knife_scissors"
  | "hammer"
  | "drill"
  | "saw"
  | "hand_tools"
  | "power_tools"
  | "someone_can_help";

export type UserPriority =
  | "lowest_cost"
  | "best_safety"
  | "easy_to_build"
  | "easy_to_use"
  | "little_fuel"
  | "no_electricity"
  | "works_quickly"
  | "little_maintenance"
  | "uses_own_materials"
  | "more_volume";

export interface RainwaterAssessment {
  surface?: "roof" | "plastic_sheet" | "ground" | "open_containers" | "other" | "unknown";
  roofMaterial?: "metal" | "tile" | "concrete" | "plastic" | "wood" | "other" | "unknown";
  firstFlush?: "yes" | "no" | "sometimes" | "unknown_meaning";
  containerCovered?: "yes" | "no" | "sometimes" | "unknown";
  animalsOnSurface?: "yes" | "no" | "unknown";
}

export interface WellAssessment {
  wellType?: "hand_dug" | "drilled_borehole" | "unknown";
  isCovered?: "yes" | "no" | "partly" | "unknown";
  extractionMethod?: "hand_pump" | "electric_pump" | "bucket" | "other" | "unknown";
  floodReached?: "yes" | "no" | "unknown";
  nearbyRisks?: ("toilet_septic" | "animals" | "farm" | "trash" | "fuel_chemical" | "floodwater" | "none" | "unknown")[];
}

export interface SpringAssessment {
  isProtected?: "yes" | "no" | "partly" | "unknown";
  animalAccess?: "yes" | "no" | "unknown";
  muddyAfterRain?: "yes" | "no" | "sometimes" | "unknown";
}

export interface SurfaceWaterAssessment {
  upstreamHazards?: ("homes" | "sewage" | "farms" | "animals" | "factories" | "mining" | "roads" | "trash" | "algae" | "none" | "unknown")[];
  muddierAfterRain?: "yes" | "no" | "sometimes" | "unknown";
  waterMovement?: "moving" | "mostly_still" | "unknown";
}

export interface PipedWaterAssessment {
  continuous?: "yes" | "no" | "often_shuts_off" | "unknown";
  storesWhenOff?: "yes" | "no";
  storageContainer?: "covered_tank" | "open_tank" | "covered_bucket" | "open_bucket" | "bottles" | "other";
}

export interface DeliveredWaterAssessment {
  knowsOrigin?: "yes" | "no";
  transportClean?: "yes" | "no" | "unknown";
  storageContainer?: "covered_tank" | "open_tank" | "covered_bucket" | "open_bucket" | "bottles" | "other";
}

export interface HydroAssessment {
  version: number;
  locale: Language;

  geography: {
    countryCode: string;
    countryName: string;
    region?: string;
    locality?: string;
    setting: SettingType;
    elevationMeters?: number;
    elevationSource?: "user" | "estimated" | "unknown";
    climateConfirmed?: boolean;
    climate?: {
      general?: string;
      rainfallPattern?: string;
      source?: "derived" | "user";
    };
    environmentalEvents: EnvironmentalEvent[];
  };

  environment: {
    weather: string[];
    rainFrequency: "common" | "seasonal" | "uncommon" | "rare" | "unknown";
  };

  household: {
    people: number;
    uses: WaterUse[];
    needLevel: "drinking-only" | "drinking-cooking" | "household" | "maximum" | "unknown";
    urgency: "today" | "days" | "weeks" | "planning";
  };

  waterAccess: {
    availableSources: WaterSourceType[];
    primarySource?: WaterSourceType;
    availability: "year-round" | "seasonal" | "unreliable" | "unknown";
    accessDifficulty: "home" | "under-10-min" | "10-30-min" | "over-30-min" | "delivered" | "unknown";
  };

  condition: {
    appearance: AppearanceSignal[];
    odors: OdorSignal[];
    nearbyRisks: EnvironmentalRisk[];
    recentChanges: string;
  };

  safety: {
    warningSource?: string;
    warningType?: "boil" | "do-not-drink" | "do-not-use" | "other" | "none" | "unknown";
    warningDetail?: string;
    tested: "yes" | "no" | "unknown";
    knownContaminants: string[];
  };

  sourceDetails: {
    rainwater?: RainwaterAssessment;
    well?: WellAssessment;
    spring?: SpringAssessment;
    surfaceWater?: SurfaceWaterAssessment;
    piped?: PipedWaterAssessment;
    delivered?: DeliveredWaterAssessment;
  };

  resources: {
    materials: AvailableMaterial[];
    utilities: Utility[];
    tools: Tool[];
    space: "minimal" | "bucket" | "large-container" | "outdoor" | "large" | "unknown";
  };

  constraints: {
    budget: "minimal" | "low" | "moderate" | "flexible" | "unknown";
    financialPriority?: "lowest_cost" | "quality_durable" | "unsure";
    dailyTreatmentTime: "under-5" | "5-15" | "15-30" | "over-30" | "unknown";
    maintenance: "minimal" | "simple" | "regular" | "replace-materials" | "advanced" | "unknown";
    replacementAccess: "yes" | "maybe" | "no" | "unknown";
    supplyLocations?: string[];
  };

  storage: {
    type: "none" | "open_bucket" | "covered_bucket" | "bottle" | "container_with_lid" | "large_tank" | "other" | "unknown";
    withdrawalMethod: "pour" | "spigot" | "cup_scoop" | "hands_touch" | "other" | "unknown";
  };

  preferences: {
    priorities: UserPriority[];
  };
}

export interface QuestionOption {
  value: string;
  labelEn: string;
  labelEs: string;
  descriptionEn?: string;
  descriptionEs?: string;
}

export interface AssessmentQuestion {
  id: string;
  stage: AssessmentStageId;
  questionEn: string;
  questionEs: string;
  helpTextEn?: string;
  helpTextEs?: string;
  whyAskEn?: string;
  whyAskEs?: string;
  type:
    | "single"
    | "multi"
    | "number"
    | "text"
    | "country"
    | "elevation"
    | "geo_enrichment";
  options?: QuestionOption[];
  minNumber?: number;
  maxNumber?: number;
  maxSelections?: number;
  isVisible: (assessment: HydroAssessment) => boolean;
}

import { HydroAssessment } from "./types";
import { COUNTRIES } from "./countries";

export interface DerivedGeoData {
  elevationMeters?: number;
  climateGeneralEn: string;
  climateGeneralEs: string;
  rainfallPatternEn: string;
  rainfallPatternEs: string;
  confidence: "estimated" | "general";
}

export function deriveGeographicInfo(
  countryCode: string,
  region?: string
): DerivedGeoData | null {
  if (!countryCode) return null;

  const code = countryCode.toUpperCase();
  const reg = (region || "").toLowerCase();

  // Mountainous / Highland detection
  const isHighland =
    reg.includes("michoacan") ||
    reg.includes("oaxaca") ||
    reg.includes("chiapas") ||
    reg.includes("puebla") ||
    reg.includes("bogota") ||
    reg.includes("cundinamarca") ||
    reg.includes("quito") ||
    reg.includes("pichincha") ||
    reg.includes("cusco") ||
    reg.includes("la paz") ||
    reg.includes("guatemala") ||
    reg.includes("altiplano");

  let elevationMeters = isHighland ? 1600 : 250;

  if (["BO", "EC", "PE", "CO"].includes(code) && isHighland) {
    elevationMeters = 2400;
  } else if (["MX", "GT"].includes(code) && isHighland) {
    elevationMeters = 1800;
  }

  let climateGeneralEn = "Warm with seasonal rain";
  let climateGeneralEs = "Cálido con lluvia estacional";
  let rainfallPatternEn = "Most rain falls during part of the year";
  let rainfallPatternEs = "La mayor parte de la lluvia cae durante una época del año";

  if (["MX", "GT", "HN", "SV", "NI", "CR", "PA", "CO"].includes(code)) {
    climateGeneralEn = "Tropical / Subtropical seasonal climate";
    climateGeneralEs = "Clima tropical o subtropical estacional";
    rainfallPatternEn = "Distinct wet and dry seasons";
    rainfallPatternEs = "Temporadas marcadas de lluvia y sequía";
  } else if (["CL", "AR", "UY"].includes(code)) {
    climateGeneralEn = "Temperate seasonal climate";
    climateGeneralEs = "Clima templado por estaciones";
    rainfallPatternEn = "Rain varies throughout the year";
    rainfallPatternEs = "Lluvia variable durante el año";
  } else if (["EG", "MA"].includes(code)) {
    climateGeneralEn = "Dry, warm climate";
    climateGeneralEs = "Clima seco y cálido";
    rainfallPatternEn = "Rainfall is very light or rare";
    rainfallPatternEs = "La lluvia es escasa o muy rara";
  }

  return {
    elevationMeters,
    climateGeneralEn,
    climateGeneralEs,
    rainfallPatternEn,
    rainfallPatternEs,
    confidence: isHighland ? "estimated" : "general",
  };
}

export function getCurrencyForCountry(countryCode: string): string {
  const found = COUNTRIES.find((c) => c.code === countryCode.toUpperCase());
  return found?.defaultCurrency || "USD";
}

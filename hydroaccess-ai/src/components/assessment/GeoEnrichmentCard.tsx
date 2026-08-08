import React from "react";
import { Language } from "../../types";
import { HydroAssessment } from "../../lib/assessment/types";
import { deriveGeographicInfo } from "../../lib/assessment/geography";
import { MapPin, Mountain, CloudRain, Check, Edit2, HelpCircle } from "lucide-react";

interface GeoEnrichmentCardProps {
  assessment: HydroAssessment;
  language: Language;
  onUpdateAssessment: (updated: HydroAssessment) => void;
}

export const GeoEnrichmentCard: React.FC<GeoEnrichmentCardProps> = ({
  assessment,
  language,
  onUpdateAssessment,
}) => {
  const isEs = language === "es";
  const derived = deriveGeographicInfo(
    assessment.geography.countryCode,
    assessment.geography.region
  );

  const elevationText = derived
    ? `~${derived.elevationMeters} meters`
    : "~250 meters";

  const climateText = derived
    ? isEs
      ? derived.climateGeneralEs
      : derived.climateGeneralEn
    : isEs
    ? "Clima cálido con lluvia estacional"
    : "Warm with seasonal rain";

  const rainText = derived
    ? isEs
      ? derived.rainfallPatternEs
      : derived.rainfallPatternEn
    : isEs
    ? "Lluvia estacional"
    : "Seasonal rainfall";

  const handleConfirm = (confirmed: boolean) => {
    onUpdateAssessment({
      ...assessment,
      geography: {
        ...assessment.geography,
        climateConfirmed: true,
        elevationMeters: derived?.elevationMeters || 250,
        climate: {
          general: climateText,
          rainfallPattern: rainText,
          source: "derived",
        },
      },
    });
  };

  return (
    <div className="bg-[#0B1719] border border-[#2DD4BF]/40 rounded-xl p-5 sm:p-6 space-y-5 shadow-lg text-[#F0FDFD]">
      <div className="flex items-center gap-2.5 text-[#2DD4BF] font-extrabold text-base sm:text-lg">
        <MapPin className="w-5 h-5 shrink-0" />
        <span>
          {isEs
            ? `Información estimada para ${assessment.geography.countryName}`
            : `Estimated info for ${assessment.geography.countryName}`}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#94B0B4]">
        {isEs
          ? "Con base en su país y región, estimamos las siguientes características climáticas y de elevación para su plan de agua:"
          : "Based on your country and region, we estimated the following climate & elevation context for your water plan:"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#122528] p-4 rounded-lg border border-[#1E3E43]">
        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#2DD4BF] flex items-center gap-1">
            <Mountain className="w-3.5 h-3.5" />
            {isEs ? "Elevación" : "Elevation"}
          </span>
          <p className="text-sm font-bold text-[#F0FDFD]">{elevationText}</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#2DD4BF] flex items-center gap-1">
            <CloudRain className="w-3.5 h-3.5" />
            {isEs ? "Lluvia" : "Rain Pattern"}
          </span>
          <p className="text-sm font-bold text-[#F0FDFD]">{rainText}</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#2DD4BF] flex items-center gap-1">
            {isEs ? "Clima General" : "Climate"}
          </span>
          <p className="text-sm font-bold text-[#F0FDFD]">{climateText}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
        <button
          onClick={() => handleConfirm(true)}
          className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1719] font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
        >
          <Check className="w-4 h-4" />
          <span>{isEs ? "Se ve correcto" : "Looks right"}</span>
        </button>

        <button
          onClick={() => handleConfirm(false)}
          className="w-full sm:w-auto px-4 py-3 rounded-lg border border-[#1E3E43] text-[#F0FDFD] hover:bg-[#18383D] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Edit2 className="w-4 h-4 text-[#2DD4BF]" />
          <span>{isEs ? "Cambiar o corregir" : "Change it"}</span>
        </button>

        <button
          onClick={() => handleConfirm(true)}
          className="w-full sm:w-auto px-4 py-3 rounded-lg border border-[#1E3E43] text-[#94B0B4] hover:text-[#F0FDFD] hover:bg-[#18383D] font-medium text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isEs ? "No estoy seguro/a" : "I'm not sure"}</span>
        </button>
      </div>
    </div>
  );
};

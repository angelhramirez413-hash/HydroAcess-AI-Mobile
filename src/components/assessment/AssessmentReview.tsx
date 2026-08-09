import React, { useState } from "react";
import { Language } from "../../types";
import { HydroAssessment, AssessmentStageId } from "../../lib/assessment/types";
import { Edit2, ArrowRight, Loader2, MapPin, Users, Droplets, ShieldAlert, Wrench, DollarSign, Star } from "lucide-react";

interface AssessmentReviewProps {
  assessment: HydroAssessment;
  language: Language;
  onJumpToStage: (stage: AssessmentStageId) => void;
  onGeneratePlan: () => void;
}

export const AssessmentReview: React.FC<AssessmentReviewProps> = ({
  assessment,
  language,
  onJumpToStage,
  onGeneratePlan,
}) => {
  const isEs = language === "es";
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateClick = () => {
    setIsGenerating(true);
    setTimeout(() => {
      onGeneratePlan();
      setIsGenerating(false);
    }, 500);
  };

  const geo = assessment.geography;
  const household = assessment.household;
  const waterAccess = assessment.waterAccess;
  const condition = assessment.condition;
  const resources = assessment.resources;
  const constraints = assessment.constraints;
  const prefs = assessment.preferences;

  return (
    <div className="bg-[#122528] border border-[#1E3E43] rounded-xl p-6 space-y-6 shadow-xl text-[#F0FDFD]">
      {/* Header */}
      <div className="text-center space-y-2 border-b border-[#1E3E43] pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F0FDFD]">
          {isEs ? "Comprobar sus Respuestas" : "Check Your Answers"}
        </h2>
        <p className="text-xs sm:text-sm text-[#94B0B4]">
          {isEs
            ? "Revise la información de su hogar antes de generar su plan de agua personalizado."
            : "Review your household details before generating your personalized water plan."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. LOCATION */}
        <div className="bg-[#0B1719] border border-[#1E3E43] rounded-xl p-4 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-[#1E3E43] pb-2">
            <span className="text-xs font-mono font-bold uppercase text-[#2DD4BF] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {isEs ? "UBICACIÓN" : "LOCATION"}
            </span>
            <button
              onClick={() => onJumpToStage("location")}
              className="text-xs text-[#2DD4BF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEs ? "Cambiar" : "Change"}</span>
            </button>
          </div>
          <p className="text-sm text-[#F0FDFD]">
            <strong>{geo.countryName}</strong>
            {geo.region && `, ${geo.region}`}
            {geo.locality && ` (${geo.locality})`}
          </p>
          <p className="text-xs text-[#94B0B4]">
            {isEs ? "Tipo de zona:" : "Setting:"} <span className="text-[#F0FDFD] capitalize">{geo.setting}</span>
            {" • "}
            {isEs ? "Elevación:" : "Elevation:"} <span className="text-[#F0FDFD]">~{geo.elevationMeters || 250}m</span>
          </p>
        </div>

        {/* 2. WATER NEEDS */}
        <div className="bg-[#0B1719] border border-[#1E3E43] rounded-xl p-4 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-[#1E3E43] pb-2">
            <span className="text-xs font-mono font-bold uppercase text-[#2DD4BF] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              {isEs ? "NECESIDADES DE AGUA" : "WATER NEEDS"}
            </span>
            <button
              onClick={() => onJumpToStage("needs")}
              className="text-xs text-[#2DD4BF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEs ? "Cambiar" : "Change"}</span>
            </button>
          </div>
          <p className="text-sm text-[#F0FDFD]">
            <strong>{household.people}</strong> {household.people === 1 ? (isEs ? "persona" : "person") : (isEs ? "personas" : "people")}
          </p>
          <p className="text-xs text-[#94B0B4]">
            {isEs ? "Usos:" : "Uses:"} <span className="text-[#F0FDFD]">{household.uses.join(", ")}</span>
          </p>
          <p className="text-xs text-[#94B0B4]">
            {isEs ? "Urgencia:" : "Urgency:"} <span className="text-[#F0FDFD] capitalize">{household.urgency}</span>
          </p>
        </div>

        {/* 3. WATER SOURCES */}
        <div className="bg-[#0B1719] border border-[#1E3E43] rounded-xl p-4 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-[#1E3E43] pb-2">
            <span className="text-xs font-mono font-bold uppercase text-[#2DD4BF] flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5" />
              {isEs ? "FUENTES DE AGUA" : "WATER SOURCES"}
            </span>
            <button
              onClick={() => onJumpToStage("sources")}
              className="text-xs text-[#2DD4BF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEs ? "Cambiar" : "Change"}</span>
            </button>
          </div>
          <p className="text-sm text-[#F0FDFD]">
            {isEs ? "Fuentes disponibles:" : "Available sources:"} <strong>{waterAccess.availableSources.join(", ")}</strong>
          </p>
          {waterAccess.primarySource && (
            <p className="text-xs text-[#94B0B4]">
              {isEs ? "Fuente principal:" : "Main source:"} <span className="text-[#F0FDFD] font-bold capitalize">{waterAccess.primarySource}</span>
            </p>
          )}
        </div>

        {/* 4. WATER CONDITION & SAFETY */}
        <div className="bg-[#0B1719] border border-[#1E3E43] rounded-xl p-4 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-[#1E3E43] pb-2">
            <span className="text-xs font-mono font-bold uppercase text-[#2DD4BF] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              {isEs ? "ESTADO Y SEGURIDAD" : "WATER CONDITION"}
            </span>
            <button
              onClick={() => onJumpToStage("condition")}
              className="text-xs text-[#2DD4BF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEs ? "Cambiar" : "Change"}</span>
            </button>
          </div>
          <p className="text-sm text-[#F0FDFD]">
            {isEs ? "Aspecto:" : "Appearance:"} <strong>{condition.appearance.join(", ")}</strong>
          </p>
          <p className="text-xs text-[#94B0B4]">
            {isEs ? "Olor:" : "Odor:"} <span className="text-[#F0FDFD]">{condition.odors.join(", ")}</span>
          </p>
          <p className="text-xs text-[#94B0B4]">
            {isEs ? "Riesgos cercanos:" : "Risks:"} <span className="text-[#F0FDFD]">{condition.nearbyRisks.join(", ")}</span>
          </p>
        </div>

        {/* 5. WHAT YOU HAVE */}
        <div className="bg-[#0B1719] border border-[#1E3E43] rounded-xl p-4 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-[#1E3E43] pb-2">
            <span className="text-xs font-mono font-bold uppercase text-[#2DD4BF] flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              {isEs ? "MATERIALES DISPONIBLES" : "WHAT YOU HAVE"}
            </span>
            <button
              onClick={() => onJumpToStage("resources")}
              className="text-xs text-[#2DD4BF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEs ? "Cambiar" : "Change"}</span>
            </button>
          </div>
          <p className="text-xs text-[#F0FDFD]">
            {resources.materials.join(", ")}
          </p>
        </div>

        {/* 6. BUDGET & PRIORITIES */}
        <div className="bg-[#0B1719] border border-[#1E3E43] rounded-xl p-4 space-y-2 relative">
          <div className="flex items-center justify-between border-b border-[#1E3E43] pb-2">
            <span className="text-xs font-mono font-bold uppercase text-[#2DD4BF] flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5" />
              {isEs ? "PRESUPUESTO Y PRIORIDADES" : "BUDGET & PRIORITIES"}
            </span>
            <button
              onClick={() => onJumpToStage("priorities")}
              className="text-xs text-[#2DD4BF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{isEs ? "Cambiar" : "Change"}</span>
            </button>
          </div>
          <p className="text-xs text-[#94B0B4]">
            {isEs ? "Presupuesto:" : "Budget:"} <span className="text-[#F0FDFD] font-bold capitalize">{constraints.budget}</span>
          </p>
          <p className="text-xs text-[#94B0B4]">
            {isEs ? "Prioridades:" : "Priorities:"} <span className="text-[#F0FDFD]">{prefs.priorities.join(", ")}</span>
          </p>
        </div>
      </div>

      {/* Main Action Button */}
      <div className="pt-4 border-t border-[#1E3E43]">
        <button
          onClick={handleGenerateClick}
          disabled={isGenerating}
          className="w-full py-4 px-8 bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1719] rounded-xl font-extrabold text-lg sm:text-xl cursor-pointer shadow-lg flex items-center justify-center gap-3 transition-all"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{isEs ? "Creando su plan de agua…" : "Creating your water plan…"}</span>
            </>
          ) : (
            <>
              <span>{isEs ? "Generar mi plan de agua" : "Generate My Water Plan"}</span>
              <ArrowRight className="w-6 h-6" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

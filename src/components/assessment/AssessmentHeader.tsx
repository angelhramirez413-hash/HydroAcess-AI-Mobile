import React, { useState } from "react";
import { Language } from "../../types";
import { AssessmentStageId } from "../../lib/assessment/types";
import { STAGE_TITLES } from "../../lib/assessment/questions";
import { RotateCcw, AlertTriangle } from "lucide-react";

interface AssessmentHeaderProps {
  stageId: AssessmentStageId;
  stageNumber: number;
  totalStages: number;
  currentStep: number;
  totalQuestions: number;
  percentage: number;
  language: Language;
  onReset: () => void;
}

export const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  stageId,
  stageNumber,
  totalStages,
  currentStep,
  totalQuestions,
  percentage,
  language,
  onReset,
}) => {
  const isEs = language === "es";
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const stageTitle = STAGE_TITLES[stageId]
    ? isEs
      ? STAGE_TITLES[stageId].es
      : STAGE_TITLES[stageId].en
    : stageId;

  return (
    <div className="bg-[#0B1719] border border-[#1E3E43] rounded-xl p-4 sm:p-5 space-y-3 shadow-md">
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-[#2DD4BF] tracking-wider block">
            {isEs ? `Etapa ${stageNumber} de ${totalStages}` : `Stage ${stageNumber} of ${totalStages}`}
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#F0FDFD] font-sans">
            {stageTitle}
          </h2>
        </div>

        <button
          onClick={() => setShowConfirmReset(true)}
          className="text-xs font-medium text-[#94B0B4] hover:text-[#2DD4BF] flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#122528] hover:bg-[#18383D] border border-[#1E3E43] transition-colors cursor-pointer shrink-0"
          title={isEs ? "Reiniciar evaluación" : "Start over"}
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#2DD4BF]" />
          <span className="hidden sm:inline">{isEs ? "Reiniciar" : "Start Over"}</span>
        </button>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-[#2DD4BF]">
          <span>
            {isEs ? "Pregunta" : "Question"} {currentStep} {isEs ? "de" : "of"} {totalQuestions}
          </span>
          <span>{percentage}%</span>
        </div>

        <div className="w-full bg-[#122528] border border-[#1E3E43] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#14B8A6] h-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#122528] border border-[#1E3E43] rounded-xl p-6 max-w-md w-full space-y-4 shadow-2xl text-[#F0FDFD]">
            <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-lg">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <span>{isEs ? "¿Reiniciar evaluación?" : "Start Over?"}</span>
            </div>
            <p className="text-sm text-[#94B0B4]">
              {isEs
                ? "Se borrarán sus respuestas actuales y comenzará desde el principio."
                : "This will clear your current answers and start from the beginning."}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-lg border border-[#1E3E43] text-[#94B0B4] hover:bg-[#18383D] text-sm font-semibold cursor-pointer"
              >
                {isEs ? "Cancelar" : "Cancel"}
              </button>
              <button
                onClick={() => {
                  setShowConfirmReset(false);
                  onReset();
                }}
                className="px-4 py-2 rounded-lg bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-bold cursor-pointer shadow-md"
              >
                {isEs ? "Sí, reiniciar" : "Yes, Start Over"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

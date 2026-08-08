import React, { useState, useEffect } from "react";
import { Language, SavedWaterPlan } from "../../types";
import { HydroAssessment, AssessmentStageId, AssessmentQuestion } from "../../lib/assessment/types";
import {
  getApplicableQuestions,
  calculateProgress,
  getInitialAssessment,
  cleanStaleSourceDetails,
} from "../../lib/assessment/branching";
import {
  loadAssessmentFromStorage,
  saveAssessmentToStorage,
  clearAssessmentStorage,
} from "../../lib/assessment/persistence";
import { generateWaterPlanFromAssessment } from "../../lib/recommendation/engine";
import { AssessmentHeader } from "./AssessmentHeader";
import { QuestionCard } from "./QuestionCard";
import { GeoEnrichmentCard } from "./GeoEnrichmentCard";
import { AssessmentReview } from "./AssessmentReview";
import { SystemDiagram } from "../SystemDiagram";
import {
  ArrowLeft,
  ArrowRight,
  BookmarkCheck,
  Printer,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface WaterAssessmentProps {
  language: Language;
  onPlanGenerated?: (plan: SavedWaterPlan) => void;
  viewPlan?: SavedWaterPlan | null;
  onCloseViewPlan?: () => void;
}

export const WaterAssessment: React.FC<WaterAssessmentProps> = ({
  language,
  onPlanGenerated,
  viewPlan,
  onCloseViewPlan,
}) => {
  const isEs = language === "es";

  // State
  const [assessment, setAssessment] = useState<HydroAssessment>(() =>
    loadAssessmentFromStorage(language)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [activePlan, setActivePlan] = useState<SavedWaterPlan | null>(viewPlan || null);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<boolean>(false);

  // Sync external viewPlan
  useEffect(() => {
    if (viewPlan) {
      setActivePlan(viewPlan);
    }
  }, [viewPlan]);

  // Sync state to local storage
  useEffect(() => {
    saveAssessmentToStorage(assessment);
  }, [assessment]);

  // Sync language changes
  useEffect(() => {
    setAssessment((prev) => ({ ...prev, locale: language }));
  }, [language]);

  const applicableQuestions = getApplicableQuestions(assessment);
  const currentQuestion: AssessmentQuestion | undefined = applicableQuestions[currentQuestionIndex];

  // Map stage sequence (10 stages)
  const STAGE_ORDER: AssessmentStageId[] = [
    "location",
    "environment",
    "needs",
    "sources",
    "condition",
    "source_details",
    "resources",
    "cost_maintenance",
    "storage",
    "priorities",
  ];

  const currentStageId: AssessmentStageId = currentQuestion ? currentQuestion.stage : "location";
  const stageNumber = Math.max(1, STAGE_ORDER.indexOf(currentStageId) + 1);

  const { currentStep, totalQuestions, percentage } = calculateProgress(
    assessment,
    currentQuestion?.id || ""
  );

  // Handlers
  const handleUpdateAssessment = (updated: HydroAssessment) => {
    const cleaned = cleanStaleSourceDetails(updated);
    setAssessment(cleaned);
  };

  const handleNext = () => {
    if (currentQuestionIndex < applicableQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const handleBack = () => {
    if (isReviewing) {
      setIsReviewing(false);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleJumpToStage = (stage: AssessmentStageId) => {
    setIsReviewing(false);
    const targetIdx = applicableQuestions.findIndex((q) => q.stage === stage);
    if (targetIdx >= 0) {
      setCurrentQuestionIndex(targetIdx);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handleReset = () => {
    const fresh = clearAssessmentStorage(language);
    setAssessment(fresh);
    setCurrentQuestionIndex(0);
    setIsReviewing(false);
    setActivePlan(null);
  };

  const handleGeneratePlan = () => {
    const plan = generateWaterPlanFromAssessment(assessment, language);
    setActivePlan(plan);
    if (onPlanGenerated) onPlanGenerated(plan);
  };

  const handleSavePlanOffline = () => {
    if (!activePlan) return;
    try {
      const existing: SavedWaterPlan[] = JSON.parse(
        localStorage.getItem("hydro_saved_plans") || "[]"
      );
      const updated = [activePlan, ...existing.filter((p) => p.id !== activePlan.id)];
      localStorage.setItem("hydro_saved_plans", JSON.stringify(updated));
      setSaveSuccessMessage(true);
      setTimeout(() => setSaveSuccessMessage(false), 4000);
    } catch {
      alert("Failed to save plan offline.");
    }
  };

  // 1. ACTIVE WATER PLAN PRESENTATION
  if (activePlan) {
    return (
      <div className="bg-[#122528] border border-[#1E3E43] rounded-xl p-5 sm:p-8 space-y-6 shadow-xl text-[#F0FDFD]">
        <div className="flex items-center justify-between border-b border-[#1E3E43] pb-4">
          <button
            onClick={() => {
              setActivePlan(null);
              if (onCloseViewPlan) onCloseViewPlan();
            }}
            className="text-xs sm:text-sm font-bold text-[#2DD4BF] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isEs ? "Volver a la evaluación" : "Back to Assessment"}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSavePlanOffline}
              className="bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1719] text-xs font-extrabold px-3.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{isEs ? "Guardar sin internet" : "Save Offline"}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="border border-[#1E3E43] text-[#F0FDFD] hover:bg-[#18383D] text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{isEs ? "Imprimir" : "Print"}</span>
            </button>
          </div>
        </div>

        {saveSuccessMessage && (
          <div className="bg-[#18383D] border border-[#2DD4BF] p-3 rounded-lg text-xs text-[#2DD4BF] font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{isEs ? "Plan guardado con éxito. Puede verlo desde 'Planes Guardados'." : "Plan saved successfully. View anytime from 'Saved Plans'."}</span>
          </div>
        )}

        {/* Situation Summary */}
        <div className="bg-[#0B1719] p-4 rounded-xl border border-[#1E3E43]">
          <h3 className="text-xs font-mono font-bold uppercase text-[#2DD4BF] mb-1">
            {isEs ? "RESUMEN DE SITUACIÓN DE SU HOGAR" : "HOUSEHOLD SITUATION SUMMARY"}
          </h3>
          <p className="text-sm text-[#F0FDFD]">{activePlan.situationSummary}</p>
        </div>

        {/* Safety Banner */}
        <div
          className={`p-4 rounded-xl border ${
            activePlan.safetyStatus === "caution"
              ? "bg-[#1F2B20] border-[#F59E0B]/50 text-[#F0FDFD]"
              : "bg-[#2B1F20] border-[#EF4444]/60 text-[#F0FDFD]"
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm mb-1 text-[#F59E0B]">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>{isEs ? "ESTADO DE SEGURIDAD Y PRECAUCIÓN" : "SAFETY STATUS & WARNINGS"}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">{activePlan.safetyMessage}</p>
        </div>

        {/* Suggested Steps */}
        <div className="space-y-3">
          <h3 className="text-lg font-extrabold text-[#F0FDFD]">
            {isEs ? "Pasos del Sistema de Agua Recomendado" : "Recommended Water System Steps"}
          </h3>
          <div className="space-y-2.5">
            {activePlan.suggestedSteps.map((s, idx) => (
              <div key={idx} className="p-3.5 bg-[#0B1719] rounded-xl border border-[#1E3E43]">
                <span className="text-xs font-mono font-bold text-[#2DD4BF] block mb-0.5">
                  {s.phase}
                </span>
                <p className="text-sm text-[#F0FDFD] leading-relaxed">{s.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Materials List */}
        <div className="space-y-3">
          <h3 className="text-lg font-extrabold text-[#F0FDFD]">
            {isEs ? "Materiales Necesarios" : "Materials Needed"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activePlan.materialsNeeded.map((m, idx) => (
              <div key={idx} className="p-3.5 border border-[#1E3E43] rounded-xl bg-[#0B1719]">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-[#F0FDFD]">{m.name}</span>
                  {m.alreadyHave && (
                    <span className="text-[10px] font-bold bg-[#18383D] text-[#2DD4BF] border border-[#2DD4BF]/30 px-2 py-0.5 rounded shrink-0">
                      {isEs ? "Ya lo tiene" : "Already have"}
                    </span>
                  )}
                </div>
                {m.substitute && (
                  <p className="text-xs text-[#94B0B4] mt-1">
                    <span className="font-semibold">{isEs ? "Sustituto: " : "Substitute: "}</span>
                    {m.substitute}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Building Instructions */}
        <div className="space-y-3">
          <h3 className="text-lg font-extrabold text-[#F0FDFD]">
            {isEs ? "Instrucciones de Construcción" : "Build Instructions"}
          </h3>
          <ol className="space-y-2 text-sm text-[#F0FDFD]">
            {activePlan.buildInstructions.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3.5 bg-[#0B1719] rounded-xl border border-[#1E3E43]">
                <span className="font-bold text-[#2DD4BF] font-mono shrink-0">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {/* Direct Video Reference Link for Construction */}
          {activePlan.videoLinks.find((v) => v.id.startsWith("vid_sand") || v.id.startsWith("vid_sodis") || v.id.startsWith("vid_cloth")) && (
            <div className="pt-1">
              {(() => {
                const buildVideo = activePlan.videoLinks.find(
                  (v) => v.id.startsWith("vid_sand") || v.id.startsWith("vid_sodis") || v.id.startsWith("vid_cloth")
                );
                if (!buildVideo) return null;
                return (
                  <a
                    href={buildVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#18383D] hover:bg-[#2DD4BF] hover:text-[#0B1719] border border-[#2DD4BF]/50 text-[#2DD4BF] font-bold text-xs rounded-xl transition-all shadow-sm group cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <span>
                      {isEs
                        ? `${buildVideo.referenceLabelEs || "Video para su referencia"}: ${buildVideo.titleEs}`
                        : `${buildVideo.referenceLabelEn || "Video for your reference"}: ${buildVideo.titleEn}`}
                    </span>
                  </a>
                );
              })()}
            </div>
          )}
        </div>

        {/* System Diagram */}
        <div className="space-y-2">
          <h3 className="text-lg font-extrabold text-[#F0FDFD]">
            {isEs ? "Diagrama Ilustrativo del Sistema" : "System Visual Diagram"}
          </h3>
          <SystemDiagram type={activePlan.diagramType} language={language} />
        </div>

        {/* Use & Maintenance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 bg-[#0B1719] p-4 rounded-xl border border-[#1E3E43]">
            <h4 className="text-sm font-extrabold text-[#2DD4BF]">
              {isEs ? "Uso Diario" : "Daily Use"}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#F0FDFD]">
              {activePlan.useInstructions.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 bg-[#0B1719] p-4 rounded-xl border border-[#1E3E43]">
            <h4 className="text-sm font-extrabold text-[#2DD4BF]">
              {isEs ? "Mantenimiento y Limpieza" : "Maintenance"}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#F0FDFD]">
              {activePlan.maintenanceInstructions.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-[#1F2B20] border border-[#F59E0B]/30 p-4 rounded-xl space-y-1 text-xs text-[#F0FDFD]">
          <h4 className="font-bold text-[#F59E0B] font-sans">
            {isEs ? "Lo que este sistema NO elimina:" : "What this system does NOT remove:"}
          </h4>
          <ul className="space-y-1 pl-2">
            {activePlan.limitations.map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Video Resources */}
        <div className="space-y-3 border-t border-[#1E3E43] pt-4">
          <h3 className="text-lg font-extrabold text-[#F0FDFD]">
            {isEs ? "Guías y Videos de Referencia Recomendados" : "Recommended Reference Videos & Guides"}
          </h3>
          <p className="text-xs text-[#94B0B4]">
            {isEs
              ? "Estos enlaces externos a videos instructivos muestran demostraciones visuales para apoyar la construcción y tratamiento:"
              : "These external instructional video links provide visual references to support construction and water treatment:"}
          </p>
          <div className="space-y-2.5">
            {activePlan.videoLinks.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-[#1E3E43] hover:border-[#2DD4BF] rounded-xl bg-[#0B1719] hover:bg-[#18383D] transition-colors group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-[#18383D] text-[#2DD4BF] border border-[#2DD4BF]/30 px-2 py-0.5 rounded">
                      {isEs ? v.referenceLabelEs || "Video para su referencia" : v.referenceLabelEn || "Video for your reference"}
                    </span>
                    <span className="text-sm font-bold text-[#F0FDFD] group-hover:text-[#2DD4BF] block">
                      {isEs ? v.titleEs : v.titleEn}
                    </span>
                    <span className="text-xs text-[#94B0B4] font-mono block">
                      {v.sourceOrg} • {v.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 bg-[#122528] group-hover:bg-[#2DD4BF] text-[#2DD4BF] group-hover:text-[#0B1719] px-3 py-2 rounded-lg text-xs font-bold transition-colors">
                    <span>{isEs ? "Ver Video" : "Watch Video"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. REVIEW SCREEN
  if (isReviewing) {
    return (
      <AssessmentReview
        assessment={assessment}
        language={language}
        onJumpToStage={handleJumpToStage}
        onGeneratePlan={handleGeneratePlan}
      />
    );
  }

  // 3. ONE QUESTION AT A TIME SCREEN
  return (
    <div className="space-y-6">
      <AssessmentHeader
        stageId={currentStageId}
        stageNumber={stageNumber}
        totalStages={10}
        currentStep={currentStep}
        totalQuestions={totalQuestions}
        percentage={percentage}
        language={language}
        onReset={handleReset}
      />

      <div className="bg-[#122528] border border-[#1E3E43] rounded-xl p-5 sm:p-8 space-y-6 shadow-xl text-[#F0FDFD]">
        {currentQuestion ? (
          currentQuestion.type === "geo_enrichment" ? (
            <GeoEnrichmentCard
              assessment={assessment}
              language={language}
              onUpdateAssessment={handleUpdateAssessment}
            />
          ) : (
            <QuestionCard
              question={currentQuestion}
              assessment={assessment}
              language={language}
              onUpdateAssessment={handleUpdateAssessment}
            />
          )
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-[#94B0B4]">
              {isEs ? "Cargando preguntas de la evaluación..." : "Loading assessment questions..."}
            </p>
          </div>
        )}

        {/* Step Navigation Bar */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#1E3E43]">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0 && !isReviewing}
            className="px-5 py-3 rounded-xl border border-[#1E3E43] text-[#F0FDFD] hover:bg-[#18383D] disabled:opacity-30 disabled:hover:bg-transparent font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer transition-all min-h-[48px]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{isEs ? "Atrás" : "Back"}</span>
          </button>

          <button
            onClick={handleNext}
            className="px-8 py-3.5 rounded-xl bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1719] font-extrabold text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-lg transition-all min-h-[48px]"
          >
            <span>
              {currentQuestionIndex === applicableQuestions.length - 1
                ? isEs
                  ? "Ir a Revisión"
                  : "Go to Review"
                : isEs
                ? "Continuar"
                : "Continue"}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Language } from "../../types";
import { AssessmentQuestion, HydroAssessment, QuestionOption } from "../../lib/assessment/types";
import { COUNTRIES } from "../../lib/assessment/countries";
import { HelpCircle, CheckCircle2, Search, Minus, Plus } from "lucide-react";

interface QuestionCardProps {
  question: AssessmentQuestion;
  assessment: HydroAssessment;
  language: Language;
  onUpdateAssessment: (updated: HydroAssessment) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  assessment,
  language,
  onUpdateAssessment,
}) => {
  const isEs = language === "es";
  const [showWhyAsk, setShowWhyAsk] = useState(false);
  const [inputText, setInputText] = useState("");
  const [countryQuery, setCountryQuery] = useState("");

  const qTitle = isEs ? question.questionEs : question.questionEn;
  const qHelp = isEs ? question.helpTextEs : question.helpTextEn;
  const qWhy = isEs ? question.whyAskEs : question.whyAskEn;

  // Sync inputText when question or language changes
  useEffect(() => {
    setShowWhyAsk(false);
    if (question.type === "single") {
      const val = getSingleChoiceValue(question.id, assessment);
      const opt = question.options?.find((o) => o.value === val);
      if (opt) {
        setInputText(isEs ? opt.labelEs : opt.labelEn);
      } else {
        setInputText(val || "");
      }
    } else if (question.type === "multi") {
      const list = getMultiChoiceValue(question.id, assessment);
      const labels = list.map((val) => {
        const opt = question.options?.find((o) => o.value === val);
        return opt ? (isEs ? opt.labelEs : opt.labelEn) : val;
      });
      setInputText(labels.filter(Boolean).join(", "));
    } else if (question.type === "country") {
      const c = COUNTRIES.find((x) => x.code === assessment.geography.countryCode);
      setCountryQuery(c ? (isEs ? c.nameEs : c.nameEn) : "");
    }
  }, [question.id, language]);

  // Country Type Question
  if (question.type === "country") {
    const filteredCountries = COUNTRIES.filter(
      (c) =>
        c.nameEn.toLowerCase().includes(countryQuery.toLowerCase()) ||
        c.nameEs.toLowerCase().includes(countryQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(countryQuery.toLowerCase())
    );

    const selectedCode = assessment.geography.countryCode;

    return (
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-[#F0FDFD] font-sans leading-snug">
          {qTitle}
        </h3>

        {qHelp && <p className="text-sm text-[#94B0B4]">{qHelp}</p>}

        <div className="relative">
          <Search className="w-4 h-4 text-[#94B0B4] absolute left-3 top-3.5" />
          <input
            type="text"
            value={countryQuery}
            onChange={(e) => {
              const val = e.target.value;
              setCountryQuery(val);
              const match = COUNTRIES.find(
                (c) =>
                  c.nameEn.toLowerCase() === val.toLowerCase() ||
                  c.nameEs.toLowerCase() === val.toLowerCase() ||
                  c.code.toLowerCase() === val.toLowerCase()
              );
              if (match) {
                onUpdateAssessment({
                  ...assessment,
                  geography: {
                    ...assessment.geography,
                    countryCode: match.code,
                    countryName: isEs ? match.nameEs : match.nameEn,
                    climateConfirmed: false,
                  },
                });
              }
            }}
            placeholder={isEs ? "Escriba el nombre de su país..." : "Type your country name..."}
            className="w-full bg-[#0B1719] border border-[#1E3E43] focus:border-[#2DD4BF] text-[#F0FDFD] rounded-lg pl-9 pr-3 py-3 text-base outline-none transition-colors"
          />
        </div>

        {/* Compact matching list */}
        {countryQuery.trim().length > 0 && (
          <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredCountries.slice(0, 8).map((c) => {
              const isSelected = selectedCode === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    const countryName = isEs ? c.nameEs : c.nameEn;
                    setCountryQuery(countryName);
                    onUpdateAssessment({
                      ...assessment,
                      geography: {
                        ...assessment.geography,
                        countryCode: c.code,
                        countryName,
                        climateConfirmed: false,
                      },
                    });
                  }}
                  className={`w-full text-left px-3.5 py-2 rounded-md border text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#18383D] border-[#2DD4BF] text-[#2DD4BF]"
                      : "bg-[#0B1719] border-[#1E3E43] text-[#F0FDFD] hover:bg-[#122528]"
                  }`}
                >
                  <span>{isEs ? c.nameEs : c.nameEn}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#2DD4BF]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Text Type Question
  if (question.type === "text") {
    const isRegion = question.id === "geo_region";
    const currentValue = isRegion
      ? assessment.geography.region || ""
      : assessment.geography.locality || "";

    return (
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-[#F0FDFD] font-sans leading-snug">
          {qTitle}
        </h3>

        {qHelp && <p className="text-sm text-[#94B0B4]">{qHelp}</p>}

        <input
          type="text"
          value={currentValue}
          onChange={(e) => {
            const val = e.target.value;
            if (isRegion) {
              onUpdateAssessment({
                ...assessment,
                geography: { ...assessment.geography, region: val },
              });
            } else {
              onUpdateAssessment({
                ...assessment,
                geography: { ...assessment.geography, locality: val },
              });
            }
          }}
          placeholder={isEs ? "Escriba aquí..." : "Type here..."}
          className="w-full bg-[#0B1719] border border-[#1E3E43] focus:border-[#2DD4BF] text-[#F0FDFD] rounded-lg px-4 py-3 text-base outline-none transition-colors min-h-[48px]"
        />
      </div>
    );
  }

  // Number Type Question
  if (question.type === "number") {
    const currentNum = assessment.household.people || 1;

    const handleNumberChange = (nextNum: number) => {
      const clamped = Math.max(1, Math.min(100, nextNum));
      onUpdateAssessment({
        ...assessment,
        household: { ...assessment.household, people: clamped },
      });
    };

    return (
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-[#F0FDFD] font-sans leading-snug">
          {qTitle}
        </h3>

        {qHelp && <p className="text-sm text-[#94B0B4]">{qHelp}</p>}

        {qWhy && (
          <button
            onClick={() => setShowWhyAsk(!showWhyAsk)}
            className="text-xs text-[#2DD4BF] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              {showWhyAsk
                ? isEs
                  ? "Ocultar explicación"
                  : "Hide explanation"
                : isEs
                ? "¿Por qué preguntamos esto?"
                : "Why are we asking?"}
            </span>
          </button>
        )}

        {showWhyAsk && qWhy && (
          <div className="text-xs bg-[#18383D] p-3 rounded-lg border border-[#2DD4BF]/30 text-[#E2F1F1]">
            {qWhy}
          </div>
        )}

        <div className="flex items-center gap-4 py-4 px-4 bg-[#0B1719] border border-[#1E3E43] rounded-xl">
          <input
            type="number"
            min="1"
            max="100"
            value={currentNum}
            onChange={(e) => handleNumberChange(parseInt(e.target.value) || 1)}
            className="w-24 bg-[#122528] border border-[#1E3E43] focus:border-[#2DD4BF] text-[#2DD4BF] font-mono font-extrabold text-2xl rounded-lg px-3 py-2 text-center outline-none"
          />

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNumberChange(currentNum - 1)}
              disabled={currentNum <= 1}
              className="w-10 h-10 rounded-lg bg-[#18383D] hover:bg-[#2DD4BF] text-[#F0FDFD] hover:text-[#0B1719] disabled:opacity-30 flex items-center justify-center font-bold cursor-pointer transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNumberChange(currentNum + 1)}
              className="w-10 h-10 rounded-lg bg-[#18383D] hover:bg-[#2DD4BF] text-[#F0FDFD] hover:text-[#0B1719] flex items-center justify-center font-bold cursor-pointer transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <span className="text-sm font-medium text-[#94B0B4]">
            {currentNum === 1
              ? isEs
                ? "persona en el hogar"
                : "person in household"
              : isEs
              ? "personas en el hogar"
              : "people in household"}
          </span>
        </div>
      </div>
    );
  }

  // Single Choice Question
  if (question.type === "single") {
    const handleSingleTextTyped = (rawText: string) => {
      setInputText(rawText);
      const matchedOpt = question.options?.find(
        (o) =>
          o.labelEn.toLowerCase() === rawText.trim().toLowerCase() ||
          o.labelEs.toLowerCase() === rawText.trim().toLowerCase() ||
          o.value.toLowerCase() === rawText.trim().toLowerCase() ||
          rawText.trim().toLowerCase().includes(o.labelEn.toLowerCase()) ||
          rawText.trim().toLowerCase().includes(o.labelEs.toLowerCase())
      );

      if (matchedOpt) {
        handleSingleChoiceSelect(question.id, matchedOpt.value, assessment, onUpdateAssessment);
      } else if (rawText.trim().length > 0) {
        handleSingleChoiceSelect(question.id, rawText.trim(), assessment, onUpdateAssessment);
      }
    };

    return (
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-[#F0FDFD] font-sans leading-snug">
          {qTitle}
        </h3>

        {qHelp && <p className="text-sm text-[#94B0B4]">{qHelp}</p>}

        {qWhy && (
          <button
            onClick={() => setShowWhyAsk(!showWhyAsk)}
            className="text-xs text-[#2DD4BF] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              {showWhyAsk
                ? isEs
                  ? "Ocultar explicación"
                  : "Hide explanation"
                : isEs
                ? "¿Por qué preguntamos esto?"
                : "Why are we asking?"}
            </span>
          </button>
        )}

        {showWhyAsk && qWhy && (
          <div className="text-xs bg-[#18383D] p-3 rounded-lg border border-[#2DD4BF]/30 text-[#E2F1F1]">
            {qWhy}
          </div>
        )}

        {/* DIRECT TEXT INPUT */}
        <div className="space-y-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => handleSingleTextTyped(e.target.value)}
            placeholder={
              isEs
                ? "Escriba su respuesta aquí..."
                : "Type your answer here..."
            }
            className="w-full bg-[#0B1719] border border-[#1E3E43] focus:border-[#2DD4BF] text-[#F0FDFD] rounded-xl px-4 py-3 text-base outline-none transition-colors shadow-xs"
          />

          {/* COMPACT SUGGESTION CHIPS (NOT heavy cards) */}
          {question.options && question.options.length > 0 && (
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-mono text-[#94B0B4] uppercase block font-semibold">
                {isEs ? "Sugerencias rápidas (haga clic para completar):" : "Quick suggestions (click to fill):"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {question.options.map((opt) => {
                  const optLabel = isEs ? opt.labelEs : opt.labelEn;
                  const isSelected =
                    inputText.trim().toLowerCase() === optLabel.toLowerCase() ||
                    getSingleChoiceValue(question.id, assessment) === opt.value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setInputText(optLabel);
                        handleSingleChoiceSelect(question.id, opt.value, assessment, onUpdateAssessment);
                      }}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer font-medium ${
                        isSelected
                          ? "bg-[#14B8A6] border-[#2DD4BF] text-[#0B1719] font-bold"
                          : "bg-[#0B1719] border-[#1E3E43] text-[#94B0B4] hover:text-[#F0FDFD] hover:bg-[#122528]"
                      }`}
                    >
                      {optLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Multi Choice Question
  if (question.type === "multi") {
    const selectedList = getMultiChoiceValue(question.id, assessment);

    const toggleMultiOpt = (opt: QuestionOption) => {
      let updated: string[] = [];
      const optVal = opt.value;
      if (optVal === "none" || optVal === "unknown") {
        updated = [optVal];
      } else {
        const filtered = selectedList.filter((x) => x !== "none" && x !== "unknown");
        if (filtered.includes(optVal)) {
          updated = filtered.filter((x) => x !== optVal);
        } else {
          updated = [...filtered, optVal];
        }
      }

      handleMultiChoiceUpdate(question.id, updated, assessment, onUpdateAssessment);

      // update text input representation
      const newLabels = updated.map((v) => {
        const o = question.options?.find((item) => item.value === v);
        return o ? (isEs ? o.labelEs : o.labelEn) : v;
      });
      setInputText(newLabels.join(", "));
    };

    const handleMultiTextChange = (rawText: string) => {
      setInputText(rawText);
      const items = rawText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const matchedValues: string[] = [];
      items.forEach((item) => {
        const matchedOpt = question.options?.find(
          (o) =>
            o.labelEn.toLowerCase().includes(item.toLowerCase()) ||
            o.labelEs.toLowerCase().includes(item.toLowerCase()) ||
            o.value.toLowerCase().includes(item.toLowerCase())
        );
        if (matchedOpt) {
          if (!matchedValues.includes(matchedOpt.value)) matchedValues.push(matchedOpt.value);
        } else {
          if (!matchedValues.includes(item)) matchedValues.push(item);
        }
      });

      handleMultiChoiceUpdate(question.id, matchedValues, assessment, onUpdateAssessment);
    };

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F0FDFD] font-sans leading-snug">
            {qTitle}
          </h3>
        </div>

        {qHelp && <p className="text-sm text-[#94B0B4]">{qHelp}</p>}

        {qWhy && (
          <button
            onClick={() => setShowWhyAsk(!showWhyAsk)}
            className="text-xs text-[#2DD4BF] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              {showWhyAsk
                ? isEs
                  ? "Ocultar explicación"
                  : "Hide explanation"
                : isEs
                ? "¿Por qué preguntamos esto?"
                : "Why are we asking?"}
            </span>
          </button>
        )}

        {showWhyAsk && qWhy && (
          <div className="text-xs bg-[#18383D] p-3 rounded-lg border border-[#2DD4BF]/30 text-[#E2F1F1]">
            {qWhy}
          </div>
        )}

        {/* DIRECT TEXT INPUT FOR MULTI */}
        <div className="space-y-2">
          <textarea
            rows={2}
            value={inputText}
            onChange={(e) => handleMultiTextChange(e.target.value)}
            placeholder={
              isEs
                ? "Escriba lo que corresponda (separe por comas)..."
                : "Type what applies (separated by commas)..."
            }
            className="w-full bg-[#0B1719] border border-[#1E3E43] focus:border-[#2DD4BF] text-[#F0FDFD] rounded-xl px-4 py-3 text-sm outline-none transition-colors shadow-xs resize-none"
          />

          {/* COMPACT CHIPS */}
          {question.options && question.options.length > 0 && (
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-mono text-[#94B0B4] uppercase block font-semibold">
                {isEs ? "Opciones sugeridas (haga clic para agregar):" : "Suggested options (click to add):"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {question.options.map((opt) => {
                  const optLabel = isEs ? opt.labelEs : opt.labelEn;
                  const isSelected = selectedList.includes(opt.value);

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleMultiOpt(opt)}
                      className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer font-medium flex items-center gap-1 ${
                        isSelected
                          ? "bg-[#14B8A6] border-[#2DD4BF] text-[#0B1719] font-bold"
                          : "bg-[#0B1719] border-[#1E3E43] text-[#94B0B4] hover:text-[#F0FDFD] hover:bg-[#122528]"
                      }`}
                    >
                      <span>{optLabel}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Elevation Question
  if (question.type === "elevation") {
    const currentMeters = assessment.geography.elevationMeters || 0;

    return (
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-[#F0FDFD] font-sans leading-snug">
          {qTitle}
        </h3>

        {qHelp && <p className="text-sm text-[#94B0B4]">{qHelp}</p>}

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={currentMeters || ""}
              onChange={(e) => {
                const num = parseInt(e.target.value) || 0;
                onUpdateAssessment({
                  ...assessment,
                  geography: {
                    ...assessment.geography,
                    elevationMeters: num,
                    elevationSource: "user",
                  },
                });
              }}
              placeholder={isEs ? "Altitud en metros (ej. 1800)" : "Elevation in meters (e.g. 1800)"}
              className="flex-1 bg-[#0B1719] border border-[#1E3E43] focus:border-[#2DD4BF] text-[#F0FDFD] rounded-xl px-4 py-3 text-base outline-none transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                onUpdateAssessment({
                  ...assessment,
                  geography: { ...assessment.geography, elevationMeters: 200, elevationSource: "user" },
                })
              }
              className={`text-xs px-3 py-2 rounded-lg border font-medium cursor-pointer ${
                currentMeters < 1500
                  ? "bg-[#14B8A6] text-[#0B1719] font-bold border-[#2DD4BF]"
                  : "bg-[#0B1719] border-[#1E3E43] text-[#94B0B4]"
              }`}
            >
              {isEs ? "Zona baja (< 1,500m)" : "Lowland (< 1,500m)"}
            </button>
            <button
              type="button"
              onClick={() =>
                onUpdateAssessment({
                  ...assessment,
                  geography: { ...assessment.geography, elevationMeters: 1800, elevationSource: "user" },
                })
              }
              className={`text-xs px-3 py-2 rounded-lg border font-medium cursor-pointer ${
                currentMeters >= 1500
                  ? "bg-[#14B8A6] text-[#0B1719] font-bold border-[#2DD4BF]"
                  : "bg-[#0B1719] border-[#1E3E43] text-[#94B0B4]"
              }`}
            >
              {isEs ? "Montaña / Zona alta (> 1,500m)" : "High altitude (> 1,500m)"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Helper function to extract single choice value from state
function getSingleChoiceValue(questionId: string, a: HydroAssessment): string {
  switch (questionId) {
    case "geo_setting": return a.geography.setting;
    case "env_rain": return a.environment.rainFrequency;
    case "needs_quantity": return a.household.needLevel;
    case "needs_urgency": return a.household.urgency;
    case "sources_primary": return a.waterAccess.primarySource || "";
    case "sources_availability": return a.waterAccess.availability;
    case "sources_difficulty": return a.waterAccess.accessDifficulty;
    case "cond_odor": return a.condition.odors[0] || "none";
    case "cond_changes": return a.condition.recentChanges;
    case "safety_warning": return a.safety.warningSource || "no";
    case "safety_warning_detail": return a.safety.warningType || "none";
    case "safety_tested": return a.safety.tested;
    case "rain_surface": return a.sourceDetails.rainwater?.surface || "";
    case "rain_roof_material": return a.sourceDetails.rainwater?.roofMaterial || "";
    case "rain_first_flush": return a.sourceDetails.rainwater?.firstFlush || "";
    case "rain_container_covered": return a.sourceDetails.rainwater?.containerCovered || "";
    case "well_type": return a.sourceDetails.well?.wellType || "";
    case "well_covered": return a.sourceDetails.well?.isCovered || "";
    case "well_extraction": return a.sourceDetails.well?.extractionMethod || "";
    case "well_flood_reached": return a.sourceDetails.well?.floodReached || "";
    case "spring_protected": return a.sourceDetails.spring?.isProtected || "";
    case "piped_continuous": return a.sourceDetails.piped?.continuous || "";
    case "res_space": return a.resources.space;
    case "cost_budget": return a.constraints.budget;
    case "cost_fin_priority": return a.constraints.financialPriority || "lowest_cost";
    case "maint_time": return a.constraints.dailyTreatmentTime;
    case "maint_capacity": return a.constraints.maintenance;
    case "maint_replacements": return a.constraints.replacementAccess;
    case "storage_type": return a.storage.type;
    case "storage_withdrawal": return a.storage.withdrawalMethod;
    default: return "";
  }
}

// Helper function to set single choice value in state
function handleSingleChoiceSelect(
  qId: string,
  val: any,
  a: HydroAssessment,
  onUpdate: (updated: HydroAssessment) => void
) {
  switch (qId) {
    case "geo_setting": onUpdate({ ...a, geography: { ...a.geography, setting: val } }); break;
    case "env_rain": onUpdate({ ...a, environment: { ...a.environment, rainFrequency: val } }); break;
    case "needs_quantity": onUpdate({ ...a, household: { ...a.household, needLevel: val } }); break;
    case "needs_urgency": onUpdate({ ...a, household: { ...a.household, urgency: val } }); break;
    case "sources_primary": onUpdate({ ...a, waterAccess: { ...a.waterAccess, primarySource: val } }); break;
    case "sources_availability": onUpdate({ ...a, waterAccess: { ...a.waterAccess, availability: val } }); break;
    case "sources_difficulty": onUpdate({ ...a, waterAccess: { ...a.waterAccess, accessDifficulty: val } }); break;
    case "cond_odor": onUpdate({ ...a, condition: { ...a.condition, odors: [val] } }); break;
    case "cond_changes": onUpdate({ ...a, condition: { ...a.condition, recentChanges: val } }); break;
    case "safety_warning": onUpdate({ ...a, safety: { ...a.safety, warningSource: val } }); break;
    case "safety_warning_detail": onUpdate({ ...a, safety: { ...a.safety, warningType: val } }); break;
    case "safety_tested": onUpdate({ ...a, safety: { ...a.safety, tested: val } }); break;
    case "rain_surface": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, rainwater: { ...a.sourceDetails.rainwater, surface: val } } }); break;
    case "rain_roof_material": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, rainwater: { ...a.sourceDetails.rainwater, roofMaterial: val } } }); break;
    case "rain_first_flush": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, rainwater: { ...a.sourceDetails.rainwater, firstFlush: val } } }); break;
    case "rain_container_covered": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, rainwater: { ...a.sourceDetails.rainwater, containerCovered: val } } }); break;
    case "well_type": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, well: { ...a.sourceDetails.well, wellType: val } } }); break;
    case "well_covered": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, well: { ...a.sourceDetails.well, isCovered: val } } }); break;
    case "well_extraction": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, well: { ...a.sourceDetails.well, extractionMethod: val } } }); break;
    case "well_flood_reached": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, well: { ...a.sourceDetails.well, floodReached: val } } }); break;
    case "spring_protected": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, spring: { ...a.sourceDetails.spring, isProtected: val } } }); break;
    case "piped_continuous": onUpdate({ ...a, sourceDetails: { ...a.sourceDetails, piped: { ...a.sourceDetails.piped, continuous: val } } }); break;
    case "res_space": onUpdate({ ...a, resources: { ...a.resources, space: val } }); break;
    case "cost_budget": onUpdate({ ...a, constraints: { ...a.constraints, budget: val } }); break;
    case "cost_fin_priority": onUpdate({ ...a, constraints: { ...a.constraints, financialPriority: val } }); break;
    case "maint_time": onUpdate({ ...a, constraints: { ...a.constraints, dailyTreatmentTime: val } }); break;
    case "maint_capacity": onUpdate({ ...a, constraints: { ...a.constraints, maintenance: val } }); break;
    case "maint_replacements": onUpdate({ ...a, constraints: { ...a.constraints, replacementAccess: val } }); break;
    case "storage_type": onUpdate({ ...a, storage: { ...a.storage, type: val } }); break;
    case "storage_withdrawal": onUpdate({ ...a, storage: { ...a.storage, withdrawalMethod: val } }); break;
    default: break;
  }
}

// Helper function to get multi choice list from state
function getMultiChoiceValue(qId: string, a: HydroAssessment): string[] {
  switch (qId) {
    case "env_weather": return a.environment.weather;
    case "env_events": return a.geography.environmentalEvents;
    case "needs_uses": return a.household.uses;
    case "sources_available": return a.waterAccess.availableSources;
    case "cond_appearance": return a.condition.appearance;
    case "cond_risks": return a.condition.nearbyRisks;
    case "safety_test_results": return a.safety.knownContaminants;
    case "surface_upstream": return a.sourceDetails.surfaceWater?.upstreamHazards || [];
    case "res_materials": return a.resources.materials;
    case "res_utilities": return a.resources.utilities;
    case "res_tools": return a.resources.tools;
    case "pref_priorities": return a.preferences.priorities;
    default: return [];
  }
}

// Helper function to update multi choice list in state
function handleMultiChoiceUpdate(
  qId: string,
  val: string[],
  a: HydroAssessment,
  onUpdate: (updated: HydroAssessment) => void
) {
  switch (qId) {
    case "env_weather": onUpdate({ ...a, environment: { ...a.environment, weather: val } }); break;
    case "env_events": onUpdate({ ...a, geography: { ...a.geography, environmentalEvents: val as any } }); break;
    case "needs_uses": onUpdate({ ...a, household: { ...a.household, uses: val as any } }); break;
    case "sources_available": {
      const primary = a.waterAccess.primarySource;
      const validPrimary = val.includes(primary as any) ? primary : val[0] as any;
      onUpdate({ ...a, waterAccess: { ...a.waterAccess, availableSources: val as any, primarySource: validPrimary } });
      break;
    }
    case "cond_appearance": onUpdate({ ...a, condition: { ...a.condition, appearance: val as any } }); break;
    case "cond_risks": onUpdate({ ...a, condition: { ...a.condition, nearbyRisks: val as any } }); break;
    case "safety_test_results": onUpdate({ ...a, safety: { ...a.safety, knownContaminants: val } }); break;
    case "res_materials": onUpdate({ ...a, resources: { ...a.resources, materials: val as any } }); break;
    case "res_utilities": onUpdate({ ...a, resources: { ...a.resources, utilities: val as any } }); break;
    case "res_tools": onUpdate({ ...a, resources: { ...a.resources, tools: val as any } }); break;
    case "pref_priorities": onUpdate({ ...a, preferences: { ...a.preferences, priorities: val as any } }); break;
    default: break;
  }
}

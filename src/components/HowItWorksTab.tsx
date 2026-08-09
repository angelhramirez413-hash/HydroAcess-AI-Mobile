import React from "react";
import { Language, TabType } from "../types";
import { getTranslation } from "../data/translations";
import { ShieldAlert, ArrowRight } from "lucide-react";

interface HowItWorksTabProps {
  language: Language;
  setActiveTab: (tab: TabType) => void;
}

export const HowItWorksTab: React.FC<HowItWorksTabProps> = ({ language, setActiveTab }) => {
  const t = getTranslation(language);

  const steps = [
    { num: t.step1Num, title: t.step1Heading, text: t.step1Text },
    { num: t.step2Num, title: t.step2Heading, text: t.step2Text },
    { num: t.step3Num, title: t.step3Heading, text: t.step3Text },
    { num: t.step4Num, title: t.step4Heading, text: t.step4Text },
    { num: t.step5Num, title: t.step5Heading, text: t.step5Text },
    { num: t.step6Num, title: t.step6Heading, text: t.step6Text },
  ];

  return (
    <div className="space-y-10 py-4 max-w-3xl mx-auto">
      {/* Title & Intro */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F0FDFD] font-sans">
          {t.howTitle}
        </h1>
        <p className="text-base text-[#94B0B4] max-w-lg mx-auto leading-relaxed">
          {t.howIntro}
        </p>
      </div>

      {/* Step-by-Step List */}
      <div className="space-y-4">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="bg-[#122528] border border-[#1E3E43] p-5 rounded-xl flex items-start gap-4 shadow-md"
          >
            <div className="w-10 h-10 rounded-full bg-[#18383D] border border-[#2DD4BF]/40 text-[#2DD4BF] flex items-center justify-center font-extrabold text-lg shrink-0">
              {s.num}
            </div>
            <div className="space-y-1 pt-0.5">
              <h2 className="text-lg font-bold text-[#F0FDFD]">
                {s.title}
              </h2>
              <p className="text-sm text-[#94B0B4] leading-relaxed">
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* IMPORTANT SAFETY SECTION */}
      <div className="bg-[#1F2B20] border border-[#F59E0B]/40 p-6 rounded-xl space-y-2 shadow-md">
        <div className="flex items-center gap-2 text-[#F59E0B] font-bold text-base">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{t.safetyTitle}</span>
        </div>
        <p className="text-sm text-[#E2F1F1] leading-relaxed">
          {t.safetyDesc}
        </p>
      </div>

      {/* Bottom Action */}
      <div className="text-center pt-2">
        <button
          onClick={() => setActiveTab("advisor")}
          className="bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1719] font-extrabold text-base px-8 py-3.5 rounded-lg shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>{t.btnStartAdvisor}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

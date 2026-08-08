import React from "react";
import { Language, TabType } from "../types";
import { getTranslation } from "../data/translations";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface HomeTabProps {
  language: Language;
  setActiveTab: (tab: TabType) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ language, setActiveTab }) => {
  const t = getTranslation(language);

  return (
    <div className="space-y-12 py-4 max-w-4xl mx-auto">
      {/* SECTION 1: MAIN INTRODUCTION */}
      <section className="bg-[#122528] border border-[#1E3E43] rounded-xl p-6 sm:p-10 text-center shadow-lg relative overflow-hidden">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F0FDFD] leading-tight max-w-2xl mx-auto mb-4 font-sans">
          {t.heroTitle}
        </h1>

        <p className="text-base sm:text-lg text-[#94B0B4] max-w-xl mx-auto leading-relaxed mb-8">
          {t.heroDesc}
        </p>

        <div className="flex flex-col items-center gap-3">
          <button
            id="btn-start-advisor-hero"
            onClick={() => setActiveTab("advisor")}
            className="w-full sm:w-auto bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1719] font-extrabold text-lg px-8 py-4 rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{t.btnStartAdvisor}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab("how")}
            className="text-sm font-medium text-[#2DD4BF] hover:underline cursor-pointer py-1"
          >
            {t.linkHowItWorks}
          </button>
        </div>
      </section>

      {/* SECTION 2: THREE IMPORTANT FACTS */}
      <section className="bg-[#122528] border border-[#1E3E43] rounded-xl p-6 sm:p-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#1E3E43]">
          <div className="pt-4 md:pt-0 px-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2DD4BF] block mb-1">
              {t.fact1Number}
            </span>
            <span className="text-xs sm:text-sm text-[#94B0B4] leading-snug block">
              {t.fact1Text}
            </span>
          </div>

          <div className="pt-4 md:pt-0 px-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#2DD4BF] block mb-1">
              {t.fact2Number}
            </span>
            <span className="text-xs sm:text-sm text-[#94B0B4] leading-snug block">
              {t.fact2Text}
            </span>
          </div>

          <div className="pt-4 md:pt-0 px-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#F0FDFD] block mb-1">
              {t.fact3Number}
            </span>
            <span className="text-xs sm:text-sm text-[#94B0B4] leading-snug block">
              {t.fact3Text}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-[#94B0B4]/80 mt-6 pt-4 border-t border-[#1E3E43] text-center italic">
          {t.factSource}
        </p>
      </section>

      {/* SECTION 3: WHY HYDROACCESS IS EASY TO USE */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#F0FDFD] text-center font-sans">
          {t.whyTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#122528] border border-[#1E3E43] p-5 rounded-xl shadow-md">
            <div className="w-8 h-8 rounded bg-[#18383D] text-[#2DD4BF] flex items-center justify-center mb-3 font-bold border border-[#2DD4BF]/30">
              1
            </div>
            <h3 className="text-base font-bold text-[#F0FDFD] mb-1">
              {t.why1Heading}
            </h3>
            <p className="text-xs sm:text-sm text-[#94B0B4] leading-relaxed">
              {t.why1Text}
            </p>
          </div>

          <div className="bg-[#122528] border border-[#1E3E43] p-5 rounded-xl shadow-md">
            <div className="w-8 h-8 rounded bg-[#18383D] text-[#2DD4BF] flex items-center justify-center mb-3 font-bold border border-[#2DD4BF]/30">
              2
            </div>
            <h3 className="text-base font-bold text-[#F0FDFD] mb-1">
              {t.why2Heading}
            </h3>
            <p className="text-xs sm:text-sm text-[#94B0B4] leading-relaxed">
              {t.why2Text}
            </p>
          </div>

          <div className="bg-[#122528] border border-[#1E3E43] p-5 rounded-xl shadow-md">
            <div className="w-8 h-8 rounded bg-[#18383D] text-[#2DD4BF] flex items-center justify-center mb-3 font-bold border border-[#2DD4BF]/30">
              3
            </div>
            <h3 className="text-base font-bold text-[#F0FDFD] mb-1">
              {t.why3Heading}
            </h3>
            <p className="text-xs sm:text-sm text-[#94B0B4] leading-relaxed">
              {t.why3Text}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHORT EXPLANATION */}
      <section className="bg-[#122528] border border-[#1E3E43] rounded-xl p-6 sm:p-8 shadow-md">
        <h2 className="text-xl font-bold text-[#F0FDFD] mb-4 text-center font-sans">
          {t.helpTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {[
            t.helpItem1,
            t.helpItem2,
            t.helpItem3,
            t.helpItem4,
            t.helpItem5,
            t.helpItem6,
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span className="text-sm text-[#F0FDFD] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: FINAL ACTION */}
      <section className="bg-[#18383D] border border-[#2DD4BF]/30 rounded-xl p-8 text-center space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold text-[#2DD4BF] font-sans">
          {t.readyTitle}
        </h2>

        <p className="text-sm text-[#E2F1F1] max-w-md mx-auto">
          {t.readyDesc}
        </p>

        <button
          onClick={() => setActiveTab("advisor")}
          className="bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1719] font-extrabold text-base px-8 py-3.5 rounded-lg shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>{t.btnStartAdvisor}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};

import React from "react";
import { Language, TabType } from "../types";
import { getTranslation } from "../data/translations";

interface FooterProps {
  language: Language;
  setActiveTab: (tab: TabType) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, setActiveTab }) => {
  const t = getTranslation(language);

  return (
    <footer className="bg-[#0E2023] border-t border-[#1E3E43] text-[#94B0B4] mt-12 py-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-[#F0FDFD] text-lg font-sans">
            HydroAccess <span className="text-[#2DD4BF]">AI</span>
          </span>
        </div>

        {/* 4 Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("home")}
            className="hover:text-[#2DD4BF] transition-colors cursor-pointer text-[#94B0B4]"
          >
            {t.navHome}
          </button>
          <button
            onClick={() => setActiveTab("how")}
            className="hover:text-[#2DD4BF] transition-colors cursor-pointer text-[#94B0B4]"
          >
            {t.navHow}
          </button>
          <button
            onClick={() => setActiveTab("advisor")}
            className="hover:text-[#2DD4BF] transition-colors cursor-pointer font-semibold text-[#2DD4BF]"
          >
            {t.navAdvisor}
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className="hover:text-[#2DD4BF] transition-colors cursor-pointer text-[#94B0B4]"
          >
            {t.navAbout}
          </button>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#94B0B4] text-center md:text-right font-mono">
          {t.footerCopyright}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 pt-4 border-t border-[#1E3E43]/60 text-center text-[11px] text-[#94B0B4]/80">
        {t.footerDisclaimer}
      </div>
    </footer>
  );
};

import React, { useState } from "react";
import { Language, TabType } from "../types";
import { getTranslation } from "../data/translations";
import { Menu, X, Globe } from "lucide-react";
import logoImg from "../assets/images/hydroaccess_logo_1786148964761.jpg";

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  activeTab,
  setActiveTab,
}) => {
  const t = getTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "es" : "en";
    setLanguage(nextLang);
  };

  const handleNav = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#0E2023] border-b border-[#1E3E43] sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 text-left cursor-pointer group"
          aria-label="HydroAccess AI Home"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <img
              src={logoImg}
              alt="HydroAccess AI Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#F0FDFD] font-sans">
            HydroAccess <span className="text-[#2DD4BF]">AI</span>
          </span>
        </button>

        {/* Center/Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            id="nav-home"
            onClick={() => handleNav("home")}
            className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === "home"
                ? "bg-[#18383D] text-[#2DD4BF] font-semibold border border-[#2DD4BF]/30"
                : "text-[#94B0B4] hover:text-[#F0FDFD] hover:bg-[#142A2E]"
            }`}
          >
            {t.navHome}
          </button>

          <button
            id="nav-how"
            onClick={() => handleNav("how")}
            className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === "how"
                ? "bg-[#18383D] text-[#2DD4BF] font-semibold border border-[#2DD4BF]/30"
                : "text-[#94B0B4] hover:text-[#F0FDFD] hover:bg-[#142A2E]"
            }`}
          >
            {t.navHow}
          </button>

          <button
            id="nav-advisor"
            onClick={() => handleNav("advisor")}
            className={`px-4 py-2 rounded-md transition-all cursor-pointer font-semibold ${
              activeTab === "advisor"
                ? "bg-[#0D9488] text-white shadow-md ring-2 ring-[#2DD4BF]/50"
                : "bg-[#14B8A6] text-[#0B1719] font-bold hover:bg-[#2DD4BF]"
            }`}
          >
            {t.navAdvisor}
          </button>

          <button
            id="nav-about"
            onClick={() => handleNav("about")}
            className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === "about"
                ? "bg-[#18383D] text-[#2DD4BF] font-semibold border border-[#2DD4BF]/30"
                : "text-[#94B0B4] hover:text-[#F0FDFD] hover:bg-[#142A2E]"
            }`}
          >
            {t.navAbout}
          </button>
        </nav>

        {/* Far Right: Language Switcher & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <button
            id="lang-switcher-btn"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#224950] text-xs font-semibold text-[#F0FDFD] bg-[#122528] hover:bg-[#193337] transition-colors cursor-pointer"
            aria-label="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>{t.langSwitch}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-[#F0FDFD] hover:bg-[#142A2E] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1E3E43] bg-[#0E2023] px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <button
            onClick={() => handleNav("home")}
            className={`w-full text-left px-3 py-2.5 rounded-md font-medium text-base ${
              activeTab === "home" ? "bg-[#18383D] text-[#2DD4BF]" : "text-[#F0FDFD]"
            }`}
          >
            {t.navHome}
          </button>

          <button
            onClick={() => handleNav("how")}
            className={`w-full text-left px-3 py-2.5 rounded-md font-medium text-base ${
              activeTab === "how" ? "bg-[#18383D] text-[#2DD4BF]" : "text-[#F0FDFD]"
            }`}
          >
            {t.navHow}
          </button>

          <button
            onClick={() => handleNav("advisor")}
            className={`w-full text-left px-3 py-2.5 rounded-md font-bold text-base bg-[#14B8A6] text-[#0B1719]`}
          >
            {t.navAdvisor}
          </button>

          <button
            onClick={() => handleNav("about")}
            className={`w-full text-left px-3 py-2.5 rounded-md font-medium text-base ${
              activeTab === "about" ? "bg-[#18383D] text-[#2DD4BF]" : "text-[#F0FDFD]"
            }`}
          >
            {t.navAbout}
          </button>
        </div>
      )}
    </header>
  );
};

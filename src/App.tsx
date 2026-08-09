import React, { useState, useEffect } from "react";
import { Language, TabType } from "./types";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeTab } from "./components/HomeTab";
import { HowItWorksTab } from "./components/HowItWorksTab";
import { WaterAdvisorTab } from "./components/WaterAdvisorTab";
import { AboutTab } from "./components/AboutTab";

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const path = window.location.pathname;
    if (path.startsWith("/es")) return "es";
    return "en";
  });

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const path = window.location.pathname;
    if (path.includes("/how-it-works")) return "how";
    if (path.includes("/advisor")) return "advisor";
    if (path.includes("/about")) return "about";
    return "home";
  });

  // Sync route URL when activeTab or language changes
  useEffect(() => {
    let route = `/${language}`;
    if (activeTab === "how") route += "/how-it-works";
    else if (activeTab === "advisor") route += "/advisor";
    else if (activeTab === "about") route += "/about";

    if (window.location.pathname !== route) {
      window.history.pushState(null, "", route);
    }
  }, [language, activeTab]);

  return (
    <div className="bg-[#0B1719] text-[#F0FDFD] font-sans min-h-screen flex flex-col antialiased relative">
      {/* Navbar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === "home" && (
          <HomeTab language={language} setActiveTab={setActiveTab} />
        )}

        {activeTab === "how" && (
          <HowItWorksTab language={language} setActiveTab={setActiveTab} />
        )}

        {activeTab === "advisor" && (
          <WaterAdvisorTab language={language} />
        )}

        {activeTab === "about" && (
          <AboutTab language={language} />
        )}
      </main>

      {/* Footer */}
      <Footer language={language} setActiveTab={setActiveTab} />
    </div>
  );
}

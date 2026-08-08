import React from "react";
import { Language } from "../types";
import { getTranslation } from "../data/translations";
import { Info, Heart, Users, AlertTriangle } from "lucide-react";

interface AboutTabProps {
  language: Language;
}

export const AboutTab: React.FC<AboutTabProps> = ({ language }) => {
  const t = getTranslation(language);

  return (
    <div className="space-y-8 py-4 max-w-3xl mx-auto">
      {/* Page Title */}
      <div className="text-center space-y-2 border-b border-[#1E3E43] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F0FDFD] font-sans">
          {t.aboutTitle}
        </h1>
      </div>

      {/* WHAT IS HYDROACCESS AI */}
      <section className="bg-[#122528] border border-[#1E3E43] p-6 rounded-xl space-y-2 shadow-md">
        <h2 className="text-lg font-bold text-[#2DD4BF] flex items-center gap-2">
          <Info className="w-5 h-5 text-[#2DD4BF]" />
          <span>{t.aboutWhatHeading}</span>
        </h2>
        <p className="text-sm sm:text-base text-[#E2F1F1] leading-relaxed">
          {t.aboutWhatBody}
        </p>
      </section>

      {/* MY MISSION */}
      <section className="bg-[#122528] border border-[#1E3E43] p-6 rounded-xl space-y-2 shadow-md">
        <h2 className="text-lg font-bold text-[#2DD4BF] flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#2DD4BF]" />
          <span>{t.aboutMissionHeading}</span>
        </h2>
        <p className="text-sm sm:text-base text-[#E2F1F1] leading-relaxed">
          {t.aboutMissionBody}
        </p>
      </section>

      {/* WHY I CREATED HYDROACCESS AI */}
      <section className="bg-[#122528] border border-[#1E3E43] p-6 rounded-xl space-y-2 shadow-md">
        <h2 className="text-lg font-bold text-[#2DD4BF]">
          {t.aboutCreatedHeading}
        </h2>
        <p className="text-sm sm:text-base text-[#94B0B4] leading-relaxed">
          {t.aboutCreatedBody}
        </p>
      </section>

      {/* WHO IT IS FOR */}
      <section className="bg-[#122528] border border-[#1E3E43] p-6 rounded-xl space-y-3 shadow-md">
        <h2 className="text-lg font-bold text-[#F0FDFD] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#2DD4BF]" />
          <span>{t.aboutWhoHeading}</span>
        </h2>
        <ul className="space-y-2 text-sm text-[#E2F1F1] pl-1">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]"></span>
            <span>{t.aboutWho1}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]"></span>
            <span>{t.aboutWho2}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]"></span>
            <span>{t.aboutWho3}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]"></span>
            <span>{t.aboutWho4}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]"></span>
            <span>{t.aboutWho5}</span>
          </li>
        </ul>
      </section>

      {/* WHAT HYDROACCESS AI CANNOT DO */}
      <section className="bg-[#1F2B20] border border-[#F59E0B]/40 p-6 rounded-xl space-y-3 shadow-md">
        <h2 className="text-lg font-bold text-[#F59E0B] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
          <span>{t.aboutCannotHeading}</span>
        </h2>
        <ul className="space-y-1.5 text-sm text-[#E2F1F1]">
          <li>• {t.aboutCannot1}</li>
          <li>• {t.aboutCannot2}</li>
          <li>• {t.aboutCannot3}</li>
          <li>• {t.aboutCannot4}</li>
        </ul>
      </section>
    </div>
  );
};

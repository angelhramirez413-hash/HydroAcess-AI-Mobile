import React from "react";
import { Language } from "../types";

interface SystemDiagramProps {
  type: "layered_filter" | "sodis_bottle" | "cloth_bucket" | "boiling_pot";
  language: Language;
}

export const SystemDiagram: React.FC<SystemDiagramProps> = ({ type, language }) => {
  const isEs = language === "es";

  if (type === "layered_filter") {
    return (
      <div className="bg-[#0B1719] border border-[#1E3E43] p-4 rounded-lg my-4 max-w-md mx-auto text-center shadow-md">
        <span className="text-xs font-mono font-bold text-[#2DD4BF] uppercase block mb-3">
          {isEs ? "Diagrama: Filtro de Capas" : "Diagram: Layered Water Filter"}
        </span>
        <svg
          viewBox="0 0 280 240"
          className="w-full max-w-[260px] mx-auto h-auto text-[#F0FDFD]"
          role="img"
          aria-label="Layered water filter diagram showing cloth, sand, charcoal, and gravel"
        >
          {/* Water entering arrow */}
          <path d="M 140 10 L 140 30" stroke="#2DD4BF" strokeWidth="3" strokeDasharray="3,3" />
          <polygon points="135,30 140,38 145,30" fill="#2DD4BF" />
          <text x="140" y="8" textAnchor="middle" fontSize="10" fill="#2DD4BF" fontWeight="bold">
            {isEs ? "Agua Entrada ↓" : "Water In ↓"}
          </text>

          {/* Container outer body */}
          <path
            d="M 80 40 L 200 40 L 180 200 L 100 200 Z"
            fill="#122528"
            stroke="#2DD4BF"
            strokeWidth="3"
          />

          {/* Layer 1: Cloth top cover */}
          <line x1="80" y1="50" x2="200" y2="50" stroke="#2DD4BF" strokeWidth="4" />
          <text x="140" y="47" textAnchor="middle" fontSize="9" fill="#2DD4BF" fontWeight="bold">
            {isEs ? "1. Tela (Atrapa hojas/tierra)" : "1. Cloth (Catches leaves/dirt)"}
          </text>

          {/* Layer 2: Sand */}
          <rect x="85" y="55" width="110" height="50" fill="#E2D4B7" opacity="0.8" />
          <text x="140" y="82" textAnchor="middle" fontSize="11" fill="#0B1719" fontWeight="bold">
            {isEs ? "2. Arena Fina Lavada" : "2. Fine Washed Sand"}
          </text>

          {/* Layer 3: Charcoal */}
          <rect x="91" y="105" width="98" height="40" fill="#22363A" opacity="0.9" />
          <text x="140" y="128" textAnchor="middle" fontSize="11" fill="#FFFFFF" fontWeight="bold">
            {isEs ? "3. Carbón Vegetal" : "3. Crushed Charcoal"}
          </text>

          {/* Layer 4: Gravel */}
          <rect x="97" y="145" width="86" height="40" fill="#64748B" opacity="0.8" />
          <text x="140" y="168" textAnchor="middle" fontSize="11" fill="#F0FDFD" fontWeight="bold">
            {isEs ? "4. Grava / Piedras" : "4. Washed Gravel"}
          </text>

          {/* Drainage holes bottom */}
          <circle cx="120" cy="200" r="3" fill="#2DD4BF" />
          <circle cx="140" cy="200" r="3" fill="#2DD4BF" />
          <circle cx="160" cy="200" r="3" fill="#2DD4BF" />

          {/* Clean water drops */}
          <path d="M 140 205 L 140 220" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="2,2" />
          <polygon points="137,220 140,225 143,220" fill="#2DD4BF" />
          <text x="140" y="235" textAnchor="middle" fontSize="10" fill="#2DD4BF" fontWeight="bold">
            {isEs ? "Agua Filtrada Salida" : "Filtered Water Out"}
          </text>
        </svg>
      </div>
    );
  }

  if (type === "sodis_bottle") {
    return (
      <div className="bg-[#0B1719] border border-[#1E3E43] p-4 rounded-lg my-4 max-w-md mx-auto text-center shadow-md">
        <span className="text-xs font-mono font-bold text-[#2DD4BF] uppercase block mb-3">
          {isEs ? "Diagrama: Desinfección Solar SODIS" : "Diagram: SODIS Solar Bottle Disinfection"}
        </span>
        <svg
          viewBox="0 0 280 180"
          className="w-full max-w-[260px] mx-auto h-auto"
          role="img"
          aria-label="Solar water disinfection diagram with direct sun rays hitting clear plastic bottle"
        >
          {/* Sun */}
          <circle cx="140" cy="35" r="20" fill="#F59E0B" />
          <line x1="140" y1="5" x2="140" y2="10" stroke="#F59E0B" strokeWidth="3" />
          <line x1="110" y1="35" x2="105" y2="35" stroke="#F59E0B" strokeWidth="3" />
          <line x1="170" y1="35" x2="175" y2="35" stroke="#F59E0B" strokeWidth="3" />
          <line x1="118" y1="13" x2="114" y2="9" stroke="#F59E0B" strokeWidth="3" />
          <line x1="162" y1="13" x2="166" y2="9" stroke="#F59E0B" strokeWidth="3" />

          {/* Sun Rays to bottle */}
          <line x1="130" y1="60" x2="100" y2="105" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="140" y1="60" x2="140" y2="105" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="150" y1="60" x2="180" y2="105" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />

          {/* PET Bottle lying horizontally */}
          <rect x="60" y="110" width="150" height="36" rx="10" fill="#18383D" stroke="#2DD4BF" strokeWidth="3" />
          <rect x="210" y="120" width="15" height="16" fill="#14B8A6" />

          <text x="135" y="132" textAnchor="middle" fontSize="11" fill="#F0FDFD" fontWeight="bold">
            {isEs ? "Botella PET Clara (6 Horas al Sol)" : "Clear PET Bottle (6 Hrs Sun)"}
          </text>

          {/* Roof/surface underneath */}
          <line x1="30" y1="148" x2="250" y2="148" stroke="#94B0B4" strokeWidth="4" />
          <text x="140" y="165" textAnchor="middle" fontSize="10" fill="#94B0B4">
            {isEs ? "Superficie de Metal o Techo Oscuro" : "Dark Metal Roof or Sheet"}
          </text>
        </svg>
      </div>
    );
  }

  if (type === "boiling_pot") {
    return (
      <div className="bg-[#0B1719] border border-[#1E3E43] p-4 rounded-lg my-4 max-w-md mx-auto text-center shadow-md">
        <span className="text-xs font-mono font-bold text-[#2DD4BF] uppercase block mb-3">
          {isEs ? "Diagrama: Hervor de Agua" : "Diagram: Water Boiling Treatment"}
        </span>
        <svg
          viewBox="0 0 280 180"
          className="w-full max-w-[260px] mx-auto h-auto"
          role="img"
          aria-label="Water boiling pot diagram"
        >
          {/* Steam */}
          <path d="M 110 30 Q 115 15 110 5" stroke="#94B0B4" strokeWidth="2" fill="none" />
          <path d="M 140 30 Q 145 15 140 5" stroke="#94B0B4" strokeWidth="2" fill="none" />
          <path d="M 170 30 Q 175 15 170 5" stroke="#94B0B4" strokeWidth="2" fill="none" />

          {/* Pot */}
          <rect x="70" y="35" width="140" height="85" rx="6" fill="#18383D" stroke="#2DD4BF" strokeWidth="3" />
          {/* Handles */}
          <path d="M 50 55 C 65 55 65 75 70 75" stroke="#2DD4BF" strokeWidth="3" fill="none" />
          <path d="M 230 55 C 215 55 215 75 210 75" stroke="#2DD4BF" strokeWidth="3" fill="none" />

          {/* Boiling Water Bubbles */}
          <circle cx="100" cy="85" r="5" fill="#2DD4BF" />
          <circle cx="130" cy="70" r="7" fill="#2DD4BF" />
          <circle cx="160" cy="90" r="6" fill="#2DD4BF" />

          <text x="140" y="105" textAnchor="middle" fontSize="11" fill="#F0FDFD" fontWeight="bold">
            {isEs ? "Hervor Borboteante (1 Minuto)" : "Rolling Boil (1 Full Minute)"}
          </text>

          {/* Fire / Heat */}
          <polygon points="120,155 130,125 140,155" fill="#F59E0B" />
          <polygon points="135,155 145,120 155,155" fill="#EF4444" />
          <polygon points="150,155 160,128 170,155" fill="#F59E0B" />
          <line x1="60" y1="156" x2="220" y2="156" stroke="#94B0B4" strokeWidth="3" />
        </svg>
      </div>
    );
  }

  // Default: Cloth Filter over bucket
  return (
    <div className="bg-[#0B1719] border border-[#1E3E43] p-4 rounded-lg my-4 max-w-md mx-auto text-center shadow-md">
      <span className="text-xs font-mono font-bold text-[#2DD4BF] uppercase block mb-3">
        {isEs ? "Diagrama: Filtración con Tela y Cubeta" : "Diagram: Cloth Filter Over Bucket"}
      </span>
      <svg
        viewBox="0 0 280 180"
        className="w-full max-w-[260px] mx-auto h-auto"
        role="img"
        aria-label="Cloth filter over bucket diagram"
      >
        {/* Pouring Water */}
        <path d="M 140 10 L 140 35" stroke="#2DD4BF" strokeWidth="3" strokeDasharray="3,3" />
        <text x="140" y="8" textAnchor="middle" fontSize="10" fill="#2DD4BF" fontWeight="bold">
          {isEs ? "Agua Cruda ↓" : "Raw Water ↓"}
        </text>

        {/* Cloth Layer folded */}
        <path d="M 80 40 Q 140 65 200 40" stroke="#2DD4BF" strokeWidth="6" fill="none" />
        <text x="140" y="32" textAnchor="middle" fontSize="10" fill="#2DD4BF" fontWeight="bold">
          {isEs ? "Tela doblada 4 a 8 capas" : "Folded cloth 4 to 8 layers"}
        </text>

        {/* Bucket */}
        <path d="M 90 45 L 190 45 L 175 140 L 105 140 Z" fill="#18383D" stroke="#2DD4BF" strokeWidth="3" />

        {/* Filtered water inside bucket */}
        <path d="M 100 100 L 180 100 L 175 138 L 105 138 Z" fill="#2DD4BF" opacity="0.4" />
        <text x="140" y="122" textAnchor="middle" fontSize="11" fill="#F0FDFD" fontWeight="bold">
          {isEs ? "Agua Filtrada Clarificada" : "Clarified Filtered Water"}
        </text>
      </svg>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Language, AdvisorSubTab, SavedWaterPlan, ChatMessage } from "../types";
import { getTranslation } from "../data/translations";
import { WaterAssessment } from "./assessment/WaterAssessment";
import {
  BookmarkCheck,
  ShieldAlert,
  Send,
  Loader2,
  X,
  FileText,
  Trash2,
  Eye,
} from "lucide-react";

interface WaterAdvisorTabProps {
  language: Language;
}

export const WaterAdvisorTab: React.FC<WaterAdvisorTabProps> = ({ language }) => {
  const t = getTranslation(language);
  const isEs = language === "es";

  const [subTab, setSubTab] = useState<AdvisorSubTab>("assessment");
  const [selectedSavedPlan, setSelectedSavedPlan] = useState<SavedWaterPlan | null>(null);

  // Saved Plans state
  const [savedPlans, setSavedPlans] = useState<SavedWaterPlan[]>([]);
  const [showSavedModal, setShowSavedModal] = useState<boolean>(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "bot",
      text: isEs
        ? "Hola. Soy HydroAccess AI. ¿Tienes alguna pregunta sobre tu agua o sobre cómo filtrarla o desinfectarla?"
        : "Hello. I am HydroAccess AI. Do you have any questions about your water or how to treat it?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  // Update initial greeting when language toggles if chat hasn't started yet
  useEffect(() => {
    setChatMessages((prev) => {
      if (prev.length === 1 && prev[0].id === "init") {
        return [
          {
            id: "init",
            sender: "bot",
            text: isEs
              ? "Hola. Soy HydroAccess AI. ¿Tienes alguna pregunta sobre tu agua o sobre cómo filtrarla o desinfectarla?"
              : "Hello. I am HydroAccess AI. Do you have any questions about your water or how to treat it?",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ];
      }
      return prev;
    });
  }, [language, isEs]);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Load saved plans from localStorage
    try {
      const storedPlans = localStorage.getItem("hydro_saved_plans");
      if (storedPlans) {
        setSavedPlans(JSON.parse(storedPlans));
      }
    } catch {
      // ignore
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleSendChat = async (questionText?: string) => {
    const text = questionText || chatInput.trim();
    if (!text || chatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!questionText) setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language,
          history: chatMessages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) throw new Error("API failed");
      const data = await response.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.text || "No response.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch {
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: isEs
          ? "No se pudo conectar con el asistente en línea. Si estás sin internet, consulta tus sugerencias guardadas."
          : "Could not reach the online assistant. If you are offline, please view your saved water plans.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, errMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-4 max-w-4xl mx-auto">
      {/* Top Header & Sub-Tabs Navigation */}
      <div className="bg-[#122528] border border-[#1E3E43] rounded-xl p-4 sm:p-6 shadow-md text-center space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#F0FDFD]">
              {t.navAdvisor}
            </h1>
            <p className="text-xs sm:text-sm text-[#94B0B4]">
              {isEs
                ? "Evaluación guiada de agua e instrucciones paso a paso"
                : "Step-by-step water assessment & practical guidance"}
            </p>
          </div>

          {savedPlans.length > 0 && (
            <button
              onClick={() => setShowSavedModal(true)}
              className="bg-[#18383D] border border-[#2DD4BF]/30 text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-[#0B1719] px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{t.btnSavedPlans} ({savedPlans.length})</span>
            </button>
          )}
        </div>

        {/* TWO PRIMARY SUB-TABS */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#0B1719] rounded-lg border border-[#1E3E43]">
          <button
            onClick={() => {
              setSubTab("assessment");
              setSelectedSavedPlan(null);
            }}
            className={`py-2.5 px-4 rounded-md font-bold text-sm sm:text-base transition-all cursor-pointer ${
              subTab === "assessment"
                ? "bg-[#14B8A6] text-[#0B1719] shadow-md"
                : "text-[#94B0B4] hover:text-[#F0FDFD]"
            }`}
          >
            {t.tabAssessment}
          </button>

          <button
            onClick={() => {
              setSubTab("chat");
              setSelectedSavedPlan(null);
            }}
            className={`py-2.5 px-4 rounded-md font-bold text-sm sm:text-base transition-all cursor-pointer ${
              subTab === "chat"
                ? "bg-[#14B8A6] text-[#0B1719] shadow-md"
                : "text-[#94B0B4] hover:text-[#F0FDFD]"
            }`}
          >
            {t.tabAsk}
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: WATER ASSESSMENT */}
      {subTab === "assessment" && (
        <WaterAssessment
          language={language}
          viewPlan={selectedSavedPlan}
          onCloseViewPlan={() => setSelectedSavedPlan(null)}
          onPlanGenerated={(newPlan) => {
            setSavedPlans((prev) => [newPlan, ...prev.filter((p) => p.id !== newPlan.id)]);
          }}
        />
      )}

      {/* SUB-TAB 2: ASK HYDROACCESS */}
      {subTab === "chat" && (
        <div className="bg-[#122528] border border-[#1E3E43] rounded-xl p-4 sm:p-6 space-y-4 shadow-md">
          <div className="border-b border-[#1E3E43] pb-3">
            <h2 className="text-xl font-bold text-[#F0FDFD]">
              {t.askTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#94B0B4]">
              {t.askDesc}
            </p>
          </div>

          {/* Offline Warning Banner */}
          {isOffline && (
            <div className="p-3 bg-[#1F2B20] border border-[#F59E0B]/40 rounded-lg text-xs text-[#F59E0B] font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{t.offlineChatNotice}</span>
            </div>
          )}

          {/* Chat Messages Window */}
          <div className="h-80 overflow-y-auto p-4 bg-[#0B1719] rounded-lg border border-[#1E3E43] space-y-3 custom-scrollbar">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#14B8A6] text-[#0B1719] font-bold ml-auto rounded-br-none"
                    : "bg-[#122528] border border-[#1E3E43] text-[#F0FDFD] mr-auto rounded-bl-none shadow-xs"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`text-[10px] font-mono block mt-1 text-right ${
                    msg.sender === "user" ? "text-[#0B1719]/80" : "text-[#94B0B4]"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {chatLoading && (
              <div className="p-3 bg-[#122528] border border-[#1E3E43] rounded-lg text-xs font-mono text-[#2DD4BF] inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isEs ? "Pensando..." : "Thinking..."}</span>
              </div>
            )}
          </div>

          {/* 4 Clickable Example Questions */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-[#94B0B4] uppercase font-bold block">
              {isEs ? "Preguntas sugeridas:" : "Suggested questions:"}
            </span>
            <div className="flex flex-wrap gap-2">
              {[t.canned1, t.canned2, t.canned3, t.canned4].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendChat(q)}
                  disabled={chatLoading}
                  className="text-xs bg-[#18383D] text-[#2DD4BF] border border-[#2DD4BF]/30 hover:bg-[#2DD4BF] hover:text-[#0B1719] px-3 py-1.5 rounded-md transition-colors cursor-pointer text-left font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendChat();
            }}
            className="flex gap-2 pt-2 border-t border-[#1E3E43]"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={t.chatPlaceholder}
              disabled={chatLoading}
              className="flex-1 bg-[#0B1719] border border-[#224950] rounded-md px-3 py-2 text-sm text-[#F0FDFD] placeholder-[#94B0B4]/60 focus:outline-none focus:border-[#2DD4BF]"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1719] px-4 py-2 rounded-md font-extrabold text-sm cursor-pointer disabled:opacity-40 flex items-center gap-1.5 transition-all"
            >
              <span>{t.btnSend}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* SAVED PLANS MODAL */}
      {showSavedModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#122528] rounded-xl border border-[#1E3E43] max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-4 shadow-2xl text-[#F0FDFD]">
            <div className="flex items-center justify-between border-b border-[#1E3E43] pb-3">
              <h2 className="text-lg font-bold text-[#F0FDFD] flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-[#2DD4BF]" />
                <span>{t.btnSavedPlans}</span>
              </h2>
              <button
                onClick={() => setShowSavedModal(false)}
                className="text-[#94B0B4] hover:text-[#F0FDFD] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {savedPlans.length === 0 ? (
              <p className="text-sm text-[#94B0B4] text-center py-6">
                {isEs ? "No hay planes guardados aún." : "No saved water plans yet."}
              </p>
            ) : (
              <div className="space-y-3">
                {savedPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-4 bg-[#0B1719] border border-[#1E3E43] rounded-lg space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#94B0B4]">
                      <span>{plan.savedAt}</span>
                      <span className="font-bold text-[#2DD4BF] uppercase">{plan.language}</span>
                    </div>
                    <p className="text-sm text-[#F0FDFD] font-medium leading-relaxed">
                      {plan.situationSummary}
                    </p>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1E3E43]/60">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSavedPlan(plan);
                          setSubTab("assessment");
                          setShowSavedModal(false);
                        }}
                        className="px-3 py-1.5 rounded-md bg-[#14B8A6] hover:bg-[#2DD4BF] text-[#0B1719] text-xs font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isEs ? "Ver Plan" : "View Plan"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedPlans.filter((p) => p.id !== plan.id);
                          setSavedPlans(updated);
                          localStorage.setItem("hydro_saved_plans", JSON.stringify(updated));
                        }}
                        className="px-2.5 py-1.5 rounded-md border border-[#1E3E43] text-[#EF4444] hover:bg-[#EF4444]/10 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{isEs ? "Eliminar" : "Delete"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

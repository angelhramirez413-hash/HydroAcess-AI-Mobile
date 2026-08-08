import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize Gemini API lazily
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    return new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", mode: "low-bandwidth-active" });
  });

  // Ask HydroAccess Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language = "en", history = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // High risk safety trigger check
      const lowerMsg = message.toLowerCase();
      const dangerousKeywords = [
        "sewage", "drenaje", "gasoline", "gasolina", "petroleum", "petroleo",
        "pesticide", "pesticida", "chemical spill", "derrame quimico", "heavy metal", "metal pesado"
      ];
      const hasDanger = dangerousKeywords.some(k => lowerMsg.includes(k));

      if (hasDanger) {
        const dangerReply = language === "es"
          ? "PRECAUCIÓN DE SEGURIDAD: Los derrames químicos, gasolina, aguas negras o pesticidas NO se pueden purificar con métodos caseros sencillos (como hervir o filtros de arena). Por favor consulte inmediatamente a las autoridades locales de salud o use una fuente de agua segura alternativa."
          : "SAFETY CAUTION: Chemical spills, petroleum, sewage, or pesticides CANNOT be made safe with simple home methods (like boiling or sand filters). Please consult local health authorities immediately or seek an alternative safe water source.";
        return res.json({ text: dangerReply });
      }

      const ai = getAi();
      const systemInstruction = language === "es"
        ? "Eres 'HydroAccess AI', un asistente de agua comprensivo, claro y muy sencillo de entender. Debes responder SIEMPRE en español. Brindas orientación sobre filtración, ebullición, desinfección solar (SODIS), cloro y almacenamiento seguro de agua. Usa un lenguaje cotidiano, oraciones cortas y párrafos breves. Evita la jerga técnica compleja. Si el usuario pide que expliques algo más fácil o con más detalle, adapta la respuesta adecuadamente."
        : "You are 'HydroAccess AI', a helpful, clear, and easy-to-understand water assistant. Always respond in English. You provide practical guidance on filtration, boiling, solar disinfection (SODIS), chlorine bleach dosing, and safe water storage. Use simple everyday words, short sentences, and concise paragraphs. Avoid complex technical jargon. Adapt response length and detail if requested.";

      const formattedHistory = history.map((msg: { sender: string; text: string }) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const contents = [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.5,
        },
      });

      res.json({ text: response.text || "No response generated." });
    } catch (err: any) {
      console.error("Error in /api/chat:", err);
      res.status(500).json({
        error: "Failed to generate AI water advice.",
        details: err?.message || "Unknown error",
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

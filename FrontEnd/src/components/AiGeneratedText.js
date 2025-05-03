import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey:import.meta.env.VITE_GOOGLE_API_KEY });

export const generateAIContent = async (prompt) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      console.log("AI Response (Inspect):", JSON.stringify(response, null, 2)); // Use JSON.stringify for better readability
      return response;
    } catch (error) {
      console.error("Error generating AI content:", error);
      throw error;
    }
  };

import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const summarizeReport = async (fileBase64: string, mimeType: string): Promise<string> => {
  try {
    const model = mimeType.startsWith('image/') ? 'gemini-2.5-flash' : 'gemini-2.5-flash';
    
    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: fileBase64,
      },
    };

    const textPart = {
      text: "Summarize this medical report. Extract key findings, patient details, and any recommended actions. Present it in a clear, concise format."
    };

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: "You are a helpful medical assistant AI specializing in summarizing reports for busy healthcare professionals.",
        temperature: 0.2,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error summarizing report with Gemini:", error);
    if (error instanceof Error) {
        return `An error occurred while summarizing the report: ${error.message}`;
    }
    return "An unknown error occurred while summarizing the report.";
  }
};

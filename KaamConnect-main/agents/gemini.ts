import { RequestIntent } from '../types';

/**
 * Service to interact with Google Gemini API for intent parsing.
 * Note: Requires EXPO_PUBLIC_GEMINI_API_KEY in .env
 */
export async function callGeminiIntentAgent(userInput: string): Promise<RequestIntent> {
  const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  if (!API_KEY) {
    console.warn("Gemini API Key missing. Falling back to rule-based parser.");
    // Fallback logic handled in the orchestrator
    throw new Error("API_KEY_MISSING");
  }

  try {
    const prompt = `
      You are the Intent Understanding Agent for KaamConnect, a service app in Pakistan.
      Extract structured data from this user request (English, Urdu, or Roman Urdu).
      
      User Request: "${userInput}"
      
      Output ONLY a JSON object with these keys:
      - language: "english" | "urdu" | "roman_urdu"
      - service_type: "ac_technician" | "plumber" | "electrician" | "tutor" | "beautician" | "mechanic" | "carpenter" | "cleaning" | "appliance_repair" | "unknown"
      - location: sector name (e.g., G-13, F-10) or "Islamabad"
      - date: "Today", "Tomorrow", or specific date if mentioned
      - time_preference: "morning" | "afternoon" | "evening" | "night" | "anytime"
      - urgency: "urgent" | "normal"
      - confidence: 0.0 to 1.0
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

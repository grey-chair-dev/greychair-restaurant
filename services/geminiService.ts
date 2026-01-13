
import { GoogleGenAI } from "@google/genai";
import { MENU, ADDRESS, HOURS, PHONE } from "../constants";

const apiKey = process.env.API_KEY;

const systemInstruction = `
You are the digital concierge for Grey Chair, a wood-fired Mediterranean kitchen in Over-the-Rhine (OTR), Cincinnati.
Tone: Warm, plainspoken, confident, neighborhood-focused. 

CONTEXT:
- Name: Grey Chair
- Neighborhood: Over-the-Rhine / OTR
- Address: ${ADDRESS}
- Phone: ${PHONE}
- Hours: ${HOURS.map(h => `${h.day}: ${h.hours}`).join(', ')}
- Menu Highlights: ${MENU.map(m => `${m.name} ($${m.price}): ${m.description}`).join('; ')}
- Parking: Nearby surface lots and street parking throughout OTR. Washington Park garage is a 5-minute walk.
- Atmosphere: Urban, warm, centered around a wood-fired grill.
- Reservations: Recommended.

INSTRUCTIONS:
- Answer guest questions about the menu, location, parking, and dietary options.
- If someone asks for a reservation, explain they can use the form on the website or call.
- Be concise. Use short sentences.
- Stay focused on Grey Chair and the OTR neighborhood.
`;

export const askConcierge = async (prompt: string): Promise<string> => {
  if (!apiKey) return "Our assistant is currently offline. Please call us for assistance.";

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 250,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting right now. Feel free to call us at " + PHONE;
  }
};

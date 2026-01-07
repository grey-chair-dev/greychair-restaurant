
import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

export const askKitchenAssistant = async (query: string) => {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  
  if (!apiKey) {
    console.error("API Key not found in process.env");
    return "I'm offline for a moment, but our staff would love to help if you give us a call at (513) 555-0123!";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const menuContext = MENU_ITEMS.map(item => 
    `${item.name} ($${item.price}): ${item.description}`
  ).join('\n');

  const systemInstruction = `
    You are the "Kitchen Assistant" for Grey Chair Family Kitchen, a cozy, family-owned restaurant in a small town near Cincinnati.
    The restaurant is named after the owner's Grandpa's favorite grey chair where family stories were told.
    
    Our Menu:
    ${menuContext}
    
    Instructions:
    - Be warm, helpful, and small-town friendly.
    - If someone asks for a recommendation, mention "Grandpa's Signature Meatloaf" if it fits.
    - If someone has dietary restrictions, look at our ingredients and suggest the best fit.
    - Keep responses concise (under 3 sentences).
    - If you don't know something about the menu, offer to help them call the restaurant directly at (513) 555-0123.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I'm having a little trouble hearing you. Can you try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm offline for a moment, but our staff would love to help if you give us a call!";
  }
};

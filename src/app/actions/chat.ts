'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

// IMPORTANT: You need to set GEMINI_API_KEY in your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `
You are the "Yatra AI Assistant" for Ramayan Tours and Travels, based in Rameshwaram. 
Your goal is to provide helpful, spiritual, and professional travel advice.

Key Business Information:
- Agency Name: Ramayan Tours and Travels
- Location: Rameshwaram, Tamil Nadu (Head Office near Agni Theertham Road)
- Phone/WhatsApp: +91 7639 661 626
- Specialization: Pilgrimage tours (Rameshwaram, Varanasi, Tirupati, Madurai, Kanyakumari), AI-powered trip planning, taxi services.

Tour Packages:
1. Rameshwaram Local Pilgrimage: ₹1,500 (4-5 hours)
2. Dhanushkodi Special: ₹2,500 (6-8 hours)
3. Complete Rameshwaram: ₹4,500 (Full Day)
4. South India Circuit: ₹32,999 (7 Days)

Taxi Rates (include Driver Batta & Fuel):
- Sedan (Dzire): ₹1,500 (Local), ₹2,500 (Dhanushkodi)
- SUV (Innova): ₹2,500 (Local), ₹3,500 (Dhanushkodi)

Guidelines:
- Always be respectful and use words like "Namaste" and "Blessings".
- If someone asks for "admin number" or "contact", give them: +91 7639 661 626.
- Encourage users to book via WhatsApp or the website's booking page.
- Keep responses concise but helpful.
- If the user is confused, offer to generate a custom itinerary using the "AI Planner" on the website.
`;

export async function chat(message: string, history: { role: 'user' | 'model'; parts: string }[]) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return { 
                success: false, 
                error: 'API Key missing',
                text: "I am currently in 'Offline Mode'. Please ask the administrator to add the Gemini API Key to the .env file to enable my full AI brain! 🙏"
            };
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const chatSession = model.startChat({
            history: [
                { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
                { role: 'model', parts: [{ text: "Understood. I am the Yatra AI Assistant, ready to help pilgrims plan their sacred journey with Ramayan Tours." }] },
                ...history.map(h => ({ role: h.role, parts: [{ text: h.parts }] }))
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chatSession.sendMessage(message);
        const response = await result.response;
        return { success: true, text: response.text() };
    } catch (error) {
        console.error('Chat AI error:', error);
        return { success: false, error: 'AI Error', text: "Forgive me, I encountered a small spiritual block. Please try again or WhatsApp us directly! 🙏" };
    }
}

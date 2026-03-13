'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

// Google AI initialization will happen inside the functions to ensure fresh ENV variables 

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
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return { 
                success: false, 
                error: 'API Key missing',
                text: "Namaste! I am currently in 'Offline Mode'. Please check Vercel settings for GEMINI_API_KEY! 🙏"
            };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

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
    } catch (error: any) {
        console.error('Chat AI error:', error);
        return { 
            success: false, 
            error: error.message || 'AI Error', 
            text: `Connection Issue: ${error.message || 'Please check your API key and region.'} 🙏` 
        };
    }
}

export async function generateAIItinerary(destination: string, days: number, budget: string, style: string) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error('API Key missing');

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const prompt = `
            You are a professional travel planning expert for Ramayan Tours and Travels.
            Generate a spiritual pilgrimage itinerary for ${destination} for ${days} days.
            Travel Style: ${style}.

            Return ONLY a JSON object:
            {
                "destination": "${destination}",
                "days": ${days},
                "budget": "${style}",
                "totalCost": 15000,
                "itinerary": [
                    {
                        "day": 1,
                        "title": "Arrival",
                        "activities": ["Check-in", "Visit main temple"],
                        "temple": "Specific Temple",
                        "hotel": "Hotel Name",
                        "tip": "Travel tip"
                    }
                ],
                "hotels": ["Hotel 1"],
                "transport": "Car",
                "highlights": ["Temple"]
            }
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanedText = text.replace(/```json|```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error: any) {
        console.error('Final AI Planner Error:', error);
        return { 
            error: true, 
            message: error.message || 'Unknown AI error'
        };
    }
}

export async function listAIModels() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return { success: false, error: 'No API Key' };

        // We use a simple fetch to list models directly from the API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        
        if (!response.ok) {
            return { success: false, error: data.error?.message || 'Failed to fetch models' };
        }

        return { success: true, models: data.models };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

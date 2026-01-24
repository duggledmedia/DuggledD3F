import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI Sales Assistant for 'Duggled', a web design and digital marketing agency.
Your goal is to persuasively explain services and capture interest.
Key Information:
- Contact: +5491133510232
- Hook: Websites start from USD 30.
- Services:
  1. Design Low Cost ($60): One page, hosting included.
  2. Design Low Cost Plus ($100): One page + SEO + Search Engine Publication.
  3. Design Standard ($180): Multi-section (up to 5), React/Bootstrap, Google Ads integration.
  4. Design Pro ($230): Up to 7 sections, PHP/JS, Chatbots, Social Media Integration.
- Extra: Digital Marketing, Content Creation, Process Automation.

Tone: Professional, enthusiastic, persuasive, and concise.
Answer in Spanish (Español) as the target audience is Spanish speaking.
Keep responses short (under 50 words) to encourage conversation.
`;

let client: GoogleGenAI | null = null;

const getClient = () => {
  // Use process.env.API_KEY as per guidelines
  const apiKey = process.env.API_KEY;
  
  if (!client && apiKey) {
    client = new GoogleGenAI({ apiKey: apiKey });
  }
  return client;
};

// Respuestas simuladas para cuando no hay API Key o hay error de conexión
const getFallbackResponse = async (message: string): Promise<string> => {
  // Simular tiempo de "pensar"
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('precio') || lowerMsg.includes('plan') || lowerMsg.includes('costo') || lowerMsg.includes('cuanto') || lowerMsg.includes('valor')) {
    return "Nuestros planes van desde el Low Cost a $60 USD hasta el plan Pro a $230 USD. Todos incluyen hosting gratuito por un año. ¿Te interesa alguno en especial?";
  }
  if (lowerMsg.includes('contacto') || lowerMsg.includes('telefono') || lowerMsg.includes('whatsapp') || lowerMsg.includes('llamar')) {
    return "¡Claro! Puedes escribirnos directamente por WhatsApp al +5491133510232 para una atención inmediata.";
  }
  if (lowerMsg.includes('automat') || lowerMsg.includes('bot') || lowerMsg.includes('ia')) {
    return "Somos expertos en automatización. Implementamos chatbots inteligentes (como yo), respuestas automáticas en redes y CRMs para potenciar tus ventas.";
  }
  if (lowerMsg.includes('ejemplo') || lowerMsg.includes('portafolio') || lowerMsg.includes('trabajo')) {
    return "Puedes ver nuestros trabajos recientes en la sección de 'Portafolio' de esta misma página. Hacemos desde E-commerce hasta Landing Pages.";
  }
  if (lowerMsg.includes('hola') || lowerMsg.includes('buen') || lowerMsg.includes('saludos')) {
    return "¡Hola! Bienvenido a Duggled. Soy tu asistente virtual. ¿Estás buscando renovar tu sitio web o mejorar tu marketing digital?";
  }
  
  return "Esa es una excelente consulta. Para darte el mejor asesoramiento personalizado, por favor contáctanos al WhatsApp +5491133510232.";
};

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  const ai = getClient();
  
  // Si no hay API Key configurada, usar modo demostración automáticamente
  if (!ai) {
    console.warn("Duggled AI: API Key no detectada. Usando modo demostración.");
    return getFallbackResponse(message);
  }

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history as any,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Gemini Error (Usando respaldo):", error);
    // Si falla la conexión real (ej. cuota excedida o error de red), usar modo demostración
    return getFallbackResponse(message);
  }
};
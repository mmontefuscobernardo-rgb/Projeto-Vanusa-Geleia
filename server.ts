import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Initialize Gemini API client lazily to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not defined. AI Sommelier will run in fallback/mock mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Full flavor metadata for reference
const flavorsList = [
  {
    id: "laranja-amendoas",
    name: "Laranja com Amêndoas",
    tagline: "Cítrica e sofisticada, com crocância irresistível!",
    color: "amber",
    description: "Uma geleia que une a acidez refrescante da laranja com a crocância nobre das amêndoas laminadas. Uma experiência gourmet única.",
    pairings: ["Queijos finos (brie, camembert)", "Croissants", "Iogurte natural", "Torradas integrais"]
  },
  {
    id: "abacaxi-pimenta",
    name: "Abacaxi com Pimenta",
    tagline: "Doçura com um toque picante que desperta os sentidos!",
    color: "yellow",
    description: "O equilíbrio sublime entre a doçura tropical do abacaxi fresco e uma picância sutil e elegante da pimenta dedo-de-moça.",
    pairings: ["Queijo coalho grelhado", "Churrasco", "Carnes grelhadas", "Dadinhos de tapioca"]
  },
  {
    id: "morango-limao",
    name: "Morango com Limão",
    tagline: "Frescor e equilíbrio na medida certa!",
    color: "red",
    description: "Morangos vermelhos inteiros selecionados cozidos lentamente com um toque cítrico de limão espremido na hora, realçando o frescor natural.",
    pairings: ["Torradas com ricota", "Panquecas", "Waffles", "Bolo de baunilha"]
  },
  {
    id: "maca-canela",
    name: "Maçã com Canela",
    tagline: "Clássica, aromática e simplesmente acolhedora!",
    color: "amber",
    description: "Pedaços macios de maçã cozidos com canela em casca aromática. Lembra o aroma aconchegante de uma torta de maçã recém-saída do forno.",
    pairings: ["Bolo de aveia", "Panquecas de banana", "Queijo minas frescal", "Mingau de aveia"]
  },
  {
    id: "manga-maracuja",
    name: "Manga com Maracujá",
    tagline: "Tropical, leve e cheia de personalidade!",
    color: "yellow",
    description: "A cremosidade e doçura natural da manga palmer combinada perfeitamente com a acidez marcante e as sementes crocantes do maracujá azedo.",
    pairings: ["Tapioca", "Cheesecake saudável", "Iogurte natural com granola", "Biscoito de arroz"]
  },
  {
    id: "banana-cacau",
    name: "Banana com Cacau 100%",
    tagline: "Sabor intenso e incrivelmente saudável!",
    color: "amber",
    description: "A cremosidade rica da banana prata madura fundida com o sabor marcante e os benefícios antioxidantes do puro cacau brasileiro 100%.",
    pairings: ["Pão quentinho", "Panquecas de aveia", "Morangos frescos", "Comer de colher pura!"]
  },
  {
    id: "goiaba",
    name: "Goiaba",
    tagline: "O sabor da fruta, com cuidado que faz bem!",
    color: "red",
    description: "Goiabas vermelhas maduras e carnudas selecionadas diretamente do pomar, transformadas em uma geleia aveludada, encorpada e de sabor nostálgico.",
    pairings: ["Requeijão light", "Queijo branco/minas (O autêntico Romeu e Julieta)", "Bolachas de água e sal", "Grelhados"]
  },
  {
    id: "abacaxi-gengibre",
    name: "Abacaxi com Gengibre",
    tagline: "Refrescante e levemente picante, perfeita para qualquer momento!",
    color: "yellow",
    description: "O azedinho doce do abacaxi em pedaços com o toque termogênico e refrescante do gengibre fresco ralado. Extremamente estimulante.",
    pairings: ["Queijo brie morno", "Pão sueco", "Chás gelados", "Saladas de frutas"]
  }
];

// AI Recommendation Endpoint
app.post("/api/recommend", async (req, res) => {
  const { food, mood, restriction } = req.body;

  if (!food && !mood && !restriction) {
    return res.status(400).json({ error: "Por favor, informe pelo menos uma opção para a recomendação." });
  }

  const prompt = `Você é o "Sommelier de Geleias Inteligente" da marca brasileira de Geleias Artesanais Nusa.
Nossas geleias são 100% naturais, zero açúcar (sem culpa, adoçadas naturalmente/pela própria fruta), zero lactose, sem glúten e sem conservantes artificiais.

Os sabores disponíveis de Nusa são:
${flavorsList.map((f, i) => `${i + 1}. ${f.name}: "${f.tagline}". Descrição: ${f.description}. Combinações comuns: ${f.pairings.join(", ")}`).join("\n")}

DADOS DO CLIENTE:
- O cliente está comendo / quer combinar com: "${food || "Nenhuma comida específica informada"}"
- O humor ou ocasião do cliente é: "${mood || "Não especificado"}"
- Restrição alimentar ou foco: "${restriction || "Nenhuma específica"}"

INSTRUÇÕES:
Escolha de 1 a 2 sabores ideais de geleia Nusa para esse cliente. Escreva em português do Brasil, mantendo um tom acolhedor, sofisticado, alegre e focado em bem-estar e saúde gourmet. Explique a lógica de sabor (ex: equilíbrio entre acidez e gordura do queijo, ou energia extra para o treino). Dê uma dica criativa de receita rápida ou modo de servir.

Retorne obrigatoriamente um objeto JSON com o seguinte formato exato de esquema de dados:
{
  "recommendations": [
    {
      "flavorId": "id-do-sabor-correspondente-na-lista-como-laranja-amendoas-ou-abacaxi-pimenta",
      "flavorName": "Nome exato do Sabor",
      "reason": "Explicação gourmet, calorosa e convincente do porquê combina perfeitamente com a comida/humor do cliente.",
      "servingSuggestion": "Uma dica prática e deliciosa de preparo rápido usando essa combinação."
    }
  ],
  "generalTip": "Um conselho amigável e inspirador sobre alimentação saudável e bem-estar para finalizar o dia com Nusa."
}`;

  const hasApiKey = !!process.env.GEMINI_API_KEY;

  if (!hasApiKey) {
    // Elegant fallback if no key is present, providing smart mock matching
    console.log("Using smart mock recommendations for Nusa Sommelier...");
    // Simple rule-based match
    let selectedFlavors = [flavorsList[2], flavorsList[5]]; // defaults
    const lowerFood = (food || "").toLowerCase();
    const lowerMood = (mood || "").toLowerCase();

    if (lowerFood.includes("queijo") || lowerFood.includes("brie") || lowerFood.includes("coalho") || lowerFood.includes("salgado") || lowerFood.includes("carne")) {
      selectedFlavors = [flavorsList[1], flavorsList[0]]; // Abacaxi com Pimenta or Laranja com Amêndoas
    } else if (lowerFood.includes("pão") || lowerFood.includes("torrada") || lowerFood.includes("bolo") || lowerFood.includes("doce")) {
      selectedFlavors = [flavorsList[2], flavorsList[3]]; // Morango com Limão or Maçã com Canela
    } else if (lowerFood.includes("iogurte") || lowerFood.includes("aveia") || lowerFood.includes("granola") || lowerFood.includes("fitness") || lowerFood.includes("fit")) {
      selectedFlavors = [flavorsList[4], flavorsList[7]]; // Manga com Maracujá or Abacaxi com Gengibre
    } else if (lowerMood.includes("chocolate") || lowerFood.includes("panqueca") || lowerMood.includes("doce") || lowerMood.includes("energia")) {
      selectedFlavors = [flavorsList[5], flavorsList[6]]; // Banana com Cacau 100% or Goiaba
    }

    const mockResponse = {
      recommendations: selectedFlavors.map((flavor, index) => ({
        flavorId: flavor.id,
        flavorName: flavor.name,
        reason: `Escolhemos o sabor ${flavor.name} pois ele combina perfeitamente com o seu pedido de "${food || "lanche saudável"}". O sabor ${index === 0 ? "fresco e marcante" : "sofisticado"} traz o equilíbrio ideal que você procura para elevar sua refeição.`,
        servingSuggestion: `Experimente espalhar uma colher generosa de ${flavor.name} diretamente sobre ${food || "sua torrada"} ainda quente. O calor ajudará a liberar os aromas naturais das frutas orgânicas!`
      })),
      generalTip: "Lembre-se: comer bem é celebrar a vida com os melhores ingredientes que a natureza nos dá. Nusa traz o sabor real da fruta, 100% livre de açúcar e conservantes!"
    };

    return res.json(mockResponse);
  }

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  flavorId: { type: Type.STRING },
                  flavorName: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  servingSuggestion: { type: Type.STRING }
                },
                required: ["flavorId", "flavorName", "reason", "servingSuggestion"]
              }
            },
            generalTip: { type: Type.STRING }
          },
          required: ["recommendations", "generalTip"]
        },
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (text) {
      const data = JSON.parse(text);
      res.json(data);
    } else {
      throw new Error("Resposta da IA vazia");
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Erro ao processar sua recomendação com a IA. Por favor, tente novamente mais tarde." });
  }
});

// Setup Vite Dev server or static asset serving
async function startServer() {
  // Explicitly serve static files from the public directory in both dev and prod
  app.use(express.static(path.join(process.cwd(), "public")));

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

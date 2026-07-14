import { Flavor, Testimonial } from "./types";

export const FLAVORS: Flavor[] = [
  {
    id: "morango-limao",
    name: "Morango com Limão",
    tagline: "Frescor e equilíbrio na medida certa!",
    color: "red",
    colorClass: "bg-red-500",
    textBgClass: "bg-red-50 text-red-800 border-red-200",
    borderClass: "border-red-500/20",
    description: "Morangos vermelhos inteiros selecionados cozidos lentamente com um toque cítrico de limão espremido na hora, realçando o frescor natural.",
    pairings: ["Torradas com ricota", "Panquecas", "Waffles", "Bolo de baunilha"],
    ingredients: "Morango fresco, suco de limão e adoçante natural xilitol.",
    nutritionalInfo: "Porção de 20g (1 colher de sopa): Valor energético 18 kcal, Carboidratos 4.2g, Fibra alimentar 0.8g.",
    isBestSeller: true
  },
  {
    id: "abacaxi-pimenta",
    name: "Abacaxi com Pimenta",
    tagline: "Doçura com um toque picante que desperta os sentidos!",
    color: "yellow",
    colorClass: "bg-yellow-500",
    textBgClass: "bg-yellow-50 text-yellow-800 border-yellow-200",
    borderClass: "border-yellow-500/20",
    description: "O equilíbrio sublime entre a doçura tropical do abacaxi fresco e uma picância sutil e elegante da pimenta dedo-de-moça. Surpreendente e sofisticada.",
    pairings: ["Queijo coalho grelhado", "Churrasco", "Carnes grelhadas", "Dadinhos de tapioca"],
    ingredients: "Abacaxi fresco, pimenta dedo-de-moça e adoçante natural xilitol.",
    nutritionalInfo: "Porção de 20g (1 colher de sopa): Valor energético 16 kcal, Carboidratos 3.8g, Fibra alimentar 0.6g.",
    isBestSeller: true
  },
  {
    id: "laranja-amendoas",
    name: "Laranja com Amêndoas",
    tagline: "Cítrica e sofisticada, com crocância irresistível!",
    color: "orange",
    colorClass: "bg-orange-500",
    textBgClass: "bg-orange-50 text-orange-800 border-orange-200",
    borderClass: "border-orange-500/20",
    description: "Uma geleia que une a acidez refrescante da laranja com a crocância nobre das amêndoas laminadas. Uma textura que cativa na primeira mordida.",
    pairings: ["Queijos finos (brie, camembert)", "Croissants", "Iogurte natural", "Torradas integrais"],
    ingredients: "Laranja fresca, amêndoas laminadas e adoçante natural xilitol.",
    nutritionalInfo: "Porção de 20g (1 colher de sopa): Valor energético 24 kcal, Carboidratos 4.0g, Gorduras saudáveis 0.8g, Fibra alimentar 0.7g.",
    isBestSeller: true
  },
  {
    id: "banana-cacau",
    name: "Banana com Cacau 100%",
    tagline: "Sabor intenso e incrivelmente saudável!",
    color: "amber",
    colorClass: "bg-amber-800",
    textBgClass: "bg-amber-50 text-amber-900 border-amber-200",
    borderClass: "border-amber-800/20",
    description: "A cremosidade rica da banana prata madura fundida com o sabor marcante e os benefícios antioxidantes do puro cacau brasileiro 100%. Uma sobremesa em pote.",
    pairings: ["Pão quentinho", "Panquecas de aveia", "Morangos frescos", "Comer de colher pura!"],
    ingredients: "Banana prata fresca, cacau em pó 100% puro e adoçante natural xilitol.",
    nutritionalInfo: "Porção de 20g (1 colher de sopa): Valor energético 28 kcal, Carboidratos 5.4g, Fibra alimentar 1.1g, Potássio 120mg.",
    isBestSeller: false
  },
  {
    id: "maca-canela",
    name: "Maçã com Canela",
    tagline: "Clássica, aromática e simplesmente acolhedora!",
    color: "amber",
    colorClass: "bg-amber-600",
    textBgClass: "bg-amber-50 text-amber-800 border-amber-200",
    borderClass: "border-amber-600/20",
    description: "Pedaços macios de maçã cozidos com canela em casca aromática. Lembra o aroma aconchegante de uma torta de maçã quentinha saindo do forno.",
    pairings: ["Bolo de aveia", "Panquecas de banana", "Queijo minas frescal", "Mingau de aveia"],
    ingredients: "Maçã gala selecionada, canela em casca e pó, adoçante natural xilitol.",
    nutritionalInfo: "Porção de 20g (1 colher de sopa): Valor energético 17 kcal, Carboidratos 4.1g, Fibra alimentar 0.9g."
  },
  {
    id: "manga-maracuja",
    name: "Manga com Maracujá",
    tagline: "Tropical, leve e cheia de personalidade!",
    color: "yellow",
    colorClass: "bg-yellow-600",
    textBgClass: "bg-yellow-50 text-yellow-900 border-yellow-200",
    borderClass: "border-yellow-600/20",
    description: "A cremosidade e doçura natural da manga palmer combinada perfeitamente com a acidez marcante e as sementes crocantes do maracujá azedo.",
    pairings: ["Tapioca", "Cheesecake saudável", "Iogurte natural com granola", "Biscoito de arroz"],
    ingredients: "Manga palmer, maracujá com sementes, adoçante natural xilitol.",
    nutritionalInfo: "Porção de 20g (1 colher de sopa): Valor energético 19 kcal, Carboidratos 4.3g, Fibra alimentar 0.7g."
  },
  {
    id: "goiaba",
    name: "Goiaba",
    tagline: "O sabor da fruta, com cuidado que faz bem!",
    color: "red",
    colorClass: "bg-rose-600",
    textBgClass: "bg-rose-50 text-rose-800 border-rose-200",
    borderClass: "border-rose-600/20",
    description: "Goiabas vermelhas maduras e carnudas selecionadas diretamente do pomar, transformadas em uma geleia aveludada, encorpada e de sabor puramente nostálgico.",
    pairings: ["Requeijão light", "Queijo minas (O autêntico Romeu e Julieta)", "Bolachas de água e sal", "Crepioca"],
    ingredients: "Goiaba vermelha fresca, suco de limão sutil, adoçante natural xilitol.",
    nutritionalInfo: "Porção de 20g (1 colher de sopa): Valor energético 15 kcal, Carboidratos 3.5g, Fibra alimentar 1.2g, Licopeno abundante."
  },
  {
    id: "abacaxi-gengibre",
    name: "Abacaxi com Gengibre",
    tagline: "Refrescante e levemente picante!",
    color: "yellow",
    colorClass: "bg-yellow-400",
    textBgClass: "bg-yellow-50 text-yellow-700 border-yellow-100",
    borderClass: "border-yellow-400/20",
    description: "O azedinho doce do abacaxi em pedaços cozido com o toque termogênico, picante e refrescante do gengibre fresco ralado. Extremamente estimulante.",
    pairings: ["Queijo brie morno", "Pão sueco", "Chás gelados", "Salada de frutas"],
    ingredients: "Abacaxi fresco, gengibre fresco ralado, adoçante natural xilitol.",
    nutritionalInfo: "Porção de 20g (1 colher de sopa): Valor energético 16 kcal, Carboidratos 3.7g, Fibra alimentar 0.5g."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Mariana Costa",
    location: "Praia Grande - SP",
    rating: 5,
    text: "Sou diabética tipo 1 e sempre sofri para achar doces que não tivessem sabor residual de adoçante químico. As geleias da Nusa mudaram minha rotina! A de Laranja com Amêndoas é divina, a crocância é indescritível. Entrega super rápida aqui na baixada!",
    avatarColor: "bg-emerald-600",
    tag: "Diabética & Amante de Laranja"
  },
  {
    id: 2,
    name: "Renato Silveira",
    location: "Ipatinga - MG",
    rating: 5,
    text: "Comprei o Kit de 8 Sabores para um café da tarde em família e foi a sensação! O sabor é incrivelmente puro, dá para sentir os pedacinhos da fruta de verdade. Minha preferida disparada é Abacaxi com Pimenta com queijo coalho grelhado. Recomendo demais!",
    avatarColor: "bg-amber-600",
    tag: "Fã de Abacaxi com Pimenta"
  },
  {
    id: 3,
    name: "Dra. Luciana Ferreira",
    location: "São Paulo - SP",
    rating: 5,
    text: "Como nutricionista, sempre recomendo a Nusa para os meus pacientes que buscam reduzir o açúcar sem perder o prazer de comer. Ingredientes totalmente limpos, sem conservantes, sem aditivos químicos. O de Morango com Limão com iogurte grego natural é um lanche perfeito.",
    avatarColor: "bg-rose-600",
    tag: "Nutricionista Clínica"
  },
  {
    id: 4,
    name: "Arthur Valente",
    location: "Santos - SP",
    rating: 5,
    text: "A de Banana com Cacau 100% salvou meu pré-treino! Passo no pão integral ou na panqueca de aveia. É doce na medida, dá energia e sacia muito por causa das fibras naturais. Atendimento espetacular pelo WhatsApp, muito atenciosos.",
    avatarColor: "bg-blue-600",
    tag: "Atleta de Alta Performance"
  }
];

export const COMBOS = [
  {
    id: "individual",
    name: "Pote Individual",
    price: 22,
    description: "Ideal para experimentar seu sabor favorito e se apaixonar.",
    badge: "Experimente",
    capacity: 1,
    savingText: "R$ 22,00 por pote"
  },
  {
    id: "kit4",
    name: "Kit 4 Sabores",
    price: 79,
    description: "Escolha seus 4 sabores favoritos com desconto especial. Ideal para presentes!",
    badge: "Mais Vendido • Economize 10%",
    capacity: 4,
    savingText: "Apenas R$ 19,75 por pote"
  },
  {
    id: "kit8",
    name: "Kit Completo 8 Sabores",
    price: 149,
    description: "A coleção definitiva Nusa! Leve todos os 8 sabores clássicos e aproveite a máxima economia.",
    badge: "Melhor Valor • Economize 15%",
    capacity: 8,
    savingText: "Apenas R$ 18,62 por pote"
  }
];

export const PAIRINGS = [
  {
    name: "Pão Quentinho",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    desc: "A cremosidade perfeita espalhada sobre a fatia quentinha."
  },
  {
    name: "Iogurte Natural",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop",
    desc: "Adoce seu iogurte de forma natural, adicionando fibras e antioxidantes."
  },
  {
    name: "Queijos Nobres",
    image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=600&auto=format&fit=crop",
    desc: "O contraste perfeito do doce da fruta com o salgado do queijo brie ou coalho."
  },
  {
    name: "Bolos e Tortas",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
    desc: "Substitua coberturas calóricas por geleia pura e aromática de fruta."
  },
  {
    name: "Aveia & Panquecas",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=600&auto=format&fit=crop",
    desc: "O café da manhã perfeito, nutritivo, termogênico e rico em energia saudável."
  }
];

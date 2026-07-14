import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Leaf, 
  Flame, 
  ArrowRight, 
  Plus, 
  Minus, 
  Check, 
  MessageCircle, 
  Instagram, 
  Star, 
  X, 
  Info, 
  Percent, 
  ShieldCheck, 
  ArrowUpRight,
  UtensilsCrossed,
  Clock,
  ThumbsUp,
  Maximize2
} from "lucide-react";
import { FLAVORS, TESTIMONIALS, COMBOS, PAIRINGS } from "./data";
import { Flavor, Recommendation } from "./types";
import NusaLogo from "./components/NusaLogo";
import kit8SaboresFlyer from "./assets/images/kit_8_sabores_flyer_1783983284835.jpg";

export default function App() {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<string>("todos");
  
  // Flavor modal state
  const [selectedFlavorModal, setSelectedFlavorModal] = useState<Flavor | null>(null);

  // Flyer expanded modal state
  const [viewFlyerModal, setViewFlyerModal] = useState<boolean>(false);

  // Kit builder state
  const [selectedComboId, setSelectedComboId] = useState<string>("kit4");
  const [kitFlavors, setKitFlavors] = useState<{ [key: string]: number }>({});

  // Delivery location selection for the order template
  const [deliveryLocation, setDeliveryLocation] = useState<string>("Praia Grande - SP");

  // Selected combo metadata
  const currentCombo = COMBOS.find((c) => c.id === selectedComboId) || COMBOS[1];

  // Total jars selected in current kit - using Object.keys to guarantee TS number inference
  const totalJarsInKit: number = Object.keys(kitFlavors).reduce((sum, key) => sum + (kitFlavors[key] || 0), 0);

  // Get color classes based on theme
  const getJarBgGradient = (color: string) => {
    switch (color) {
      case "red":
        return "from-rose-500 via-red-600 to-rose-700 shadow-rose-500/30";
      case "yellow":
        return "from-amber-400 via-yellow-500 to-amber-600 shadow-yellow-500/30";
      case "orange":
        return "from-orange-400 via-orange-500 to-red-600 shadow-orange-500/30";
      case "amber":
        return "from-amber-700 via-amber-800 to-amber-950 shadow-amber-800/30";
      default:
        return "from-emerald-500 via-teal-600 to-emerald-700 shadow-emerald-500/30";
    }
  };

  // Change combo resets current kit selections to avoid overflow, or smart clips
  useEffect(() => {
    setKitFlavors({});
  }, [selectedComboId]);

  // Flavor filters
  const filteredFlavors = FLAVORS.filter((flavor) => {
    if (activeTab === "todos") return true;
    if (activeTab === "mais-vendidos") return flavor.isBestSeller;
    if (activeTab === "citricos") return flavor.id.includes("laranja") || flavor.id.includes("limao") || flavor.id.includes("maracuja");
    if (activeTab === "picantes") return flavor.id.includes("pimenta") || flavor.id.includes("gengibre");
    if (activeTab === "cremosos") return flavor.id.includes("banana") || flavor.id.includes("goiaba") || flavor.id.includes("maca");
    return true;
  });

  // Add flavor to current kit
  const addFlavorToKit = (flavorId: string) => {
    if (totalJarsInKit >= currentCombo.capacity) {
      // If we are at capacity, don't allow more
      return;
    }
    setKitFlavors((prev) => ({
      ...prev,
      [flavorId]: (prev[flavorId] || 0) + 1,
    }));
  };

  // Remove flavor from current kit
  const removeFlavorFromKit = (flavorId: string) => {
    if (!kitFlavors[flavorId]) return;
    setKitFlavors((prev) => {
      const next = { ...prev };
      if (next[flavorId] === 1) {
        delete next[flavorId];
      } else {
        next[flavorId]--;
      }
      return next;
    });
  };

  // Format the WhatsApp message for direct order
  const getWhatsAppLink = () => {
    const phoneNumber = "5513981711582"; // 13 98171-1582
    let message = `Olá Nusa! 🍓 Vi a Landing Page e gostaria de fazer um pedido de Geleias Zero Açúcar!\n\n`;
    
    message += `*PEDIDO:* ${currentCombo.name} (R$ ${currentCombo.price},00)\n`;
    message += `*LOCAL DE ENTREGA:* ${deliveryLocation}\n\n`;

    if (totalJarsInKit > 0) {
      message += `*SABORES ESCOLHIDOS:*\n`;
      Object.entries(kitFlavors).forEach(([flavorId, count]) => {
        const flavor = FLAVORS.find((f) => f.id === flavorId);
        if (flavor) {
          message += `• ${count}x Geleia de ${flavor.name}\n`;
        }
      });
    } else {
      message += `*(Ainda não escolhi os sabores, gostaria de ajuda para selecionar!)*\n`;
    }

    message += `\nPor favor, me informe o prazo de entrega e as formas de pagamento! Muito obrigado(a)!`;
    
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-[#A4161A] selection:text-white">
      
      {/* Dynamic Top Announcement Ticker */}
      <div className="bg-[#1B4332] text-[#E8F5E9] py-2 px-4 text-xs font-medium tracking-wide text-center uppercase flex justify-center items-center gap-2 overflow-hidden">
        <span className="inline-block animate-pulse">🍓</span>
        <span>Oferta Especial: Ganhe frete grátis em Praia Grande - SP e Ipatinga - MG na compra de qualquer Kit!</span>
        <span className="hidden md:inline">• 100% Sabor, 0% Açúcar, 0% Culpa</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Group */}
          <div className="flex items-center gap-2">
            <NusaLogo size={60} className="hover:scale-105 transition-transform" />
            <div>
              <span className="block font-serif font-bold text-xl tracking-tight text-stone-900 leading-none">Nusa</span>
              <span className="block text-[8px] font-bold tracking-widest text-[#2D6A4F] uppercase mt-1">Geleias Artesanais</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#sabores" className="hover:text-[#A4161A] transition-colors">Sabores</a>
            <a href="#beneficios" className="hover:text-[#A4161A] transition-colors">Benefícios</a>
            <a href="#kit-builder" className="hover:text-[#A4161A] transition-colors">Montar Kit</a>
            <a href="#depoimentos" className="hover:text-[#A4161A] transition-colors">Depoimentos</a>
          </nav>

          {/* Direct Buy Header Button */}
          <div className="flex items-center gap-2">
            <a 
              href="#kit-builder" 
              className="bg-[#A4161A] hover:bg-[#801013] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-1.5 sm:gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Pedir Agora</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 md:py-24 overflow-hidden bg-gradient-to-b from-[#FDFBF7] to-[#F5EFE6]">
        
        {/* Abstract background shapes */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Organic Badges */}
            <div className="inline-flex flex-wrap justify-center lg:justify-start gap-2">
              <span className="bg-[#E8F5E9] text-[#2D6A4F] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-[#81C784]/30 flex items-center gap-1.5 shadow-sm">
                <Leaf className="w-3.5 h-3.5" /> 100% Saudável
              </span>
              <span className="bg-[#FFF8E1] text-[#F57F17] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-[#FFE082]/30 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" /> Sem Açúcar Adicionado
              </span>
              <span className="bg-red-50 text-red-800 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-red-100 flex items-center gap-1.5 shadow-sm">
                <Heart className="w-3.5 h-3.5" /> Receita de Família
              </span>
            </div>

            {/* Direct Value Pitch Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-none">
              O sabor real da fruta, <br />
              <span className="text-[#A4161A] relative inline-block">
                Sem culpa e 100% natural!
                <span className="absolute bottom-1.5 left-0 w-full h-2 bg-amber-400/30 -z-10 rounded-full"></span>
              </span>
            </h1>

            {/* Sub-Headline & Taglines */}
            <p className="text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Geleias gourmet artesanais preparadas lentamente com frutas frescas selecionadas, ricas em pedaços e zero açúcar. Sem conservantes artificiais, sem glúten e sem lactose. O acompanhamento perfeito para o seu dia a dia saudável.
            </p>

            {/* Main CTA & Benefits Overview */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="#kit-builder" 
                className="w-full sm:w-auto bg-[#A4161A] hover:bg-[#801013] text-white px-8 py-4 rounded-full text-base font-bold tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Escolher Meus Sabores</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#sabores" 
                className="w-full sm:w-auto bg-white hover:bg-stone-50 text-[#1B4332] border-2 border-[#1B4332]/20 px-8 py-4 rounded-full text-base font-bold tracking-wide transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                <span>Conhecer Sabores</span>
              </a>
            </div>

            {/* Delivery Locations Indicators */}
            <div className="pt-6 border-t border-stone-300/40 grid grid-cols-2 md:grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#A4161A] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold uppercase text-stone-500 tracking-widest">Praia Grande</span>
                  <span className="block text-sm font-semibold text-stone-800">Entrega Expressa SP</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#A4161A] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold uppercase text-stone-500 tracking-widest">Ipatinga</span>
                  <span className="block text-sm font-semibold text-stone-800">Entrega Local MG</span>
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-bold uppercase text-stone-500 tracking-widest">Qualidade</span>
                  <span className="block text-sm font-semibold text-stone-800">100% Puro</span>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Column - Kit 8 Sabores Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-stone-200/50 max-w-sm sm:max-w-md w-full">
              
              {/* Promo Seal */}
              <div className="absolute -top-5 -right-5 bg-amber-400 text-stone-950 font-bold px-4 py-3 rounded-2xl rotate-12 shadow-lg z-10 border-2 border-white flex flex-col items-center">
                <span className="text-[10px] tracking-widest uppercase font-black leading-none">Super Kit</span>
                <span className="text-xl leading-none">8 Sabores</span>
              </div>

              {/* Jar Visual Overlay Stack */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl overflow-hidden flex items-center justify-center p-6 border border-stone-100">
                <div className="relative flex items-center justify-center w-full h-full">
                  
                  {/* Decorative fruit icons around */}
                  <span className="absolute top-4 left-6 text-3xl animate-bounce" style={{ animationDuration: '3s' }}>🍓</span>
                  <span className="absolute bottom-6 right-6 text-3xl animate-bounce" style={{ animationDuration: '4s' }}>🍊</span>
                  <span className="absolute top-6 right-10 text-2xl">🍍</span>
                  <span className="absolute bottom-4 left-10 text-2xl">🍌</span>
                  
                  {/* Glowing core jar vector representation */}
                  <div className="w-32 h-40 bg-stone-100 rounded-2xl relative border-2 border-stone-200/80 shadow-2xl flex flex-col justify-between overflow-hidden">
                    <div className="h-10 bg-amber-100 border-b-4 border-amber-600/30 flex items-center justify-center">
                      <div className="w-24 h-5 bg-amber-600 rounded-sm shadow-inner" />
                    </div>
                    <div className="flex-1 bg-gradient-to-b from-red-600 to-rose-800 flex flex-col items-center justify-center relative">
                      <div className="w-20 bg-amber-50 border border-amber-800/20 rounded-md p-1.5 text-center shadow-md relative z-10">
                        <span className="block font-serif font-black text-xs text-stone-900 leading-none">Nusa</span>
                        <span className="block text-[5px] text-emerald-800 uppercase tracking-widest font-bold font-sans mt-0.5">Morango & Limão</span>
                        <div className="w-6 h-1 bg-stone-300 mx-auto my-1 rounded-full" />
                        <span className="block text-[4px] text-stone-500 font-bold">ZERO AÇÚCAR</span>
                      </div>
                      
                      {/* Jam fill color glow */}
                      <div className="absolute inset-0 bg-radial from-transparent to-red-950/20" />
                    </div>
                  </div>

                  {/* Behind second jar */}
                  <div className="w-28 h-36 bg-stone-100 rounded-xl absolute -right-4 bottom-8 border border-stone-200 shadow-xl flex flex-col justify-between overflow-hidden opacity-90 rotate-6 -z-10">
                    <div className="h-8 bg-amber-100 border-b border-amber-600/20" />
                    <div className="flex-1 bg-gradient-to-b from-yellow-400 to-amber-600" />
                  </div>

                  {/* Left jar */}
                  <div className="w-28 h-36 bg-stone-100 rounded-xl absolute -left-4 bottom-8 border border-stone-200 shadow-xl flex flex-col justify-between overflow-hidden opacity-90 -rotate-6 -z-10">
                    <div className="h-8 bg-amber-100 border-b border-amber-600/20" />
                    <div className="flex-1 bg-gradient-to-b from-amber-600 to-orange-700" />
                  </div>

                </div>
              </div>

              {/* Core Features Quick list from image */}
              <div className="mt-6 space-y-4">
                <div className="bg-[#E8F5E9]/50 border border-emerald-500/10 p-3.5 rounded-xl flex items-center justify-between text-xs font-bold text-[#1B4332]">
                  <span className="flex items-center gap-1.5">🍃 Zero Açúcar • Zero Glúten</span>
                  <span className="flex items-center gap-1.5">🌿 Zero Lactose • Sem Conservantes</span>
                </div>
                
                {/* Visual mini benefits row */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    <span className="block font-serif text-lg font-bold text-[#A4161A]">100% Sabor</span>
                    <span className="block text-[10px] text-stone-500 font-medium">Frutas verdadeiras</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    <span className="block font-serif text-lg font-bold text-emerald-800">0% Culpa</span>
                    <span className="block text-[10px] text-stone-500 font-medium">Lanche saudável</span>
                  </div>
                </div>
                
                <a 
                  href="#kit-builder" 
                  className="w-full bg-[#1B4332] hover:bg-[#122C21] text-white py-3 rounded-xl font-bold text-sm tracking-wide text-center block transition-all shadow-md"
                >
                  Garantir Kit Completo 8 Sabores
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Core Brand Benefits Section ("Funcionalidades que fazem bem") */}
      <section id="beneficios" className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#A4161A] text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">Funcionalidades que Fazem Bem</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Ingredientes puros, benefícios que você sente no corpo
            </h2>
            <p className="text-stone-600 font-sans">
              Cada pote de Nusa é feito de forma artesanal com muito amor, respeitando o tempo da natureza para oferecer uma geleia funcional e de sabor inigualável.
            </p>
          </div>

          {/* Grid of Benefits with Custom Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Benefit 1 */}
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Zero Açúcar Adicionado</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Mais saúde, menos preocupações. Adoçadas de forma natural com xilitol (proveniente de fontes naturais), garantindo baixo índice glicêmico — ideal para diabéticos e dietas de emagrecimento.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Fonte Natural de Fibras</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Nossas geleias contêm pedaços inteiros de frutas e sementes naturais que auxiliam no bom funcionamento intestinal e promovem maior saciedade ao longo do dia.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Rica em Vitamina C</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Preparadas com frutas frescas ricas em vitamina C (como morango, laranja e goiaba), as geleias Nusa ajudam a fortalecer a imunidade corporal e possuem propriedades antioxidantes naturais.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Ingredientes 100% Naturais</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Sem corantes artificiais, sem aromas sintéticos e sem conservantes químicos. Conservadas apenas com ingredientes naturais das frutas para manter o sabor real e autêntico.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Feito com Puro Amor</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Um produto verdadeiramente artesanal, cozido em pequenos lotes com todo carinho e técnica tradicional de doces brasileiros, para levar a melhor qualidade à sua mesa de café da família.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="bg-[#FDFBF7] p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Livre de Alérgenos</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Totalmente livres de glúten e lactose. Um alimento seguro, saudável e inclusivo para que todos na sua casa possam saborear sem nenhum receio ou restrições alimentares.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Catalog Section */}
      <section id="sabores" className="py-20 bg-[#F5EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-[#A4161A] text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">Gourmet & Artesanal</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Descubra nossos sabores mais vendidos
            </h2>
            <p className="text-stone-600 font-sans">
              Clique em cada sabor para ver a lista de ingredientes limpos, tabela de calorias e dicas de harmonização perfeita.
            </p>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {[
              { id: "todos", label: "Todos os Sabores" },
              { id: "mais-vendidos", label: "🔥 Mais Vendidos" },
              { id: "citricos", label: "🍋 Cítricos & Refrescantes" },
              { id: "picantes", label: "🌶️ Toque Picante" },
              { id: "cremosos", label: "🍌 Doces & Cremosos" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all ${
                  activeTab === tab.id
                    ? "bg-[#A4161A] text-white shadow-md"
                    : "bg-white text-stone-600 hover:bg-stone-50 border border-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid of Interactive Flavors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredFlavors.map((flavor) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={flavor.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200/60 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between relative group cursor-pointer"
                  onClick={() => setSelectedFlavorModal(flavor)}
                >
                  
                  {/* Best seller ribbon */}
                  {flavor.isBestSeller && (
                    <div className="absolute -top-2.5 -left-2 bg-amber-400 text-stone-900 font-bold px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase z-10 shadow-sm">
                      Mais Vendido
                    </div>
                  )}

                  {/* Flavor Color Cap Indicator */}
                  <div className="space-y-4">
                    <div className="aspect-square bg-stone-50 rounded-xl relative flex items-center justify-center p-6 border border-stone-100 overflow-hidden group-hover:bg-stone-100/50 transition-colors">
                      
                      {/* Animated float of jar representation */}
                      <div className="w-16 h-24 bg-stone-100 rounded-lg relative border border-stone-200/80 shadow-md flex flex-col justify-between overflow-hidden">
                        <div className="h-6 bg-amber-100 border-b border-amber-600/20" />
                        <div className={`flex-1 bg-gradient-to-b ${getJarBgGradient(flavor.color)}`} />
                      </div>

                      {/* Small visual fruit badge in corner */}
                      <div className="absolute bottom-3 right-3 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center border border-stone-100">
                        <span className="text-lg">
                          {flavor.id.includes("morango") ? "🍓" : 
                           flavor.id.includes("laranja") ? "🍊" : 
                           flavor.id.includes("banana") ? "🍌" : 
                           flavor.id.includes("abacaxi") ? "🍍" : 
                           flavor.id.includes("goiaba") ? "🍎" : "🍎"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${flavor.textBgClass}`}>
                        {flavor.color === "red" ? "Frutas Vermelhas" : 
                         flavor.color === "yellow" ? "Frutas Amarelas" : 
                         flavor.color === "orange" ? "Cítricos" : "Cremosos"}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#A4161A] transition-colors">{flavor.name}</h3>
                      <p className="text-xs text-stone-500 italic mt-1 font-medium leading-relaxed">{flavor.tagline}</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFlavorModal(flavor);
                      }}
                      className="text-stone-500 hover:text-stone-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Ver receita e nutrição</span>
                    </button>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addFlavorToKit(flavor.id);
                      }}
                      className="w-8 h-8 rounded-full bg-[#1B4332] hover:bg-[#122C21] text-white flex items-center justify-center transition-colors shadow-md active:scale-95"
                      title="Adicionar ao Kit"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Flyer Oficial - Kit 8 Sabores Section */}
      <section id="flyer-completo" className="py-20 bg-white border-t border-b border-stone-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-60 -z-10" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-60 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: The Flyer Graphic */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white transition-all duration-500 hover:scale-[1.02] bg-stone-100 max-w-sm sm:max-w-md w-full">
                <img 
                  src={kit8SaboresFlyer} 
                  alt="Flyer Oficial Nusa Kit 8 Sabores" 
                  className="w-full h-auto object-cover cursor-pointer"
                  onClick={() => setViewFlyerModal(true)}
                />
                
                {/* Interactive Overlay Indicator */}
                <div 
                  onClick={() => setViewFlyerModal(true)}
                  className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer select-none"
                >
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-lg">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-sm tracking-wide">Expandir Imagem</span>
                </div>

                <div className="absolute bottom-4 left-4 bg-stone-900/70 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Menu e Informações Úteis
                </div>
              </div>
            </div>

            {/* Right: Rich Details and Feature Cards */}
            <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
              <div className="space-y-4 text-center lg:text-left">
                <span className="text-[#A4161A] text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100 inline-block">
                  Folder de Lançamento
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  Kit 8 Sabores que Encantam! <br />
                  <span className="text-[#2D6A4F]">100% Sabor, 0% Culpa</span>
                </h2>
                <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
                  Confira o cardápio oficial de sabores das nossas geleias zero açúcar. Cada pote é cuidadosamente preparado com carinho de forma artesanal, sem aditivos químicos ou conservantes.
                </p>
              </div>

              {/* Grid of the 8 exquisite flavors matching the flyer */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-stone-200/50 flex items-center gap-2">
                  <span className="text-xl">🍊</span>
                  <div className="min-w-0">
                    <span className="block font-serif font-black text-xs text-stone-900 truncate">Laranja com Amêndoas</span>
                    <span className="block text-[10px] text-stone-500 truncate leading-tight">Cítrica e crocante</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-stone-200/50 flex items-center gap-2">
                  <span className="text-xl">🌶️</span>
                  <div className="min-w-0">
                    <span className="block font-serif font-black text-xs text-stone-900 truncate">Abacaxi com Pimenta</span>
                    <span className="block text-[10px] text-stone-500 truncate leading-tight">Toque picante especial</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-stone-200/50 flex items-center gap-2">
                  <span className="text-xl">🍓</span>
                  <div className="min-w-0">
                    <span className="block font-serif font-black text-xs text-stone-900 truncate">Morango com Limão</span>
                    <span className="block text-[10px] text-stone-500 truncate leading-tight">Frescor equilibrado</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-stone-200/50 flex items-center gap-2">
                  <span className="text-xl">🍎</span>
                  <div className="min-w-0">
                    <span className="block font-serif font-black text-xs text-stone-900 truncate">Maçã com Canela</span>
                    <span className="block text-[10px] text-stone-500 truncate leading-tight">Clássica e acolhedora</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-stone-200/50 flex items-center gap-2">
                  <span className="text-xl">🥭</span>
                  <div className="min-w-0">
                    <span className="block font-serif font-black text-xs text-stone-900 truncate">Manga com Maracujá</span>
                    <span className="block text-[10px] text-stone-500 truncate leading-tight">Tropical e marcante</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-stone-200/50 flex items-center gap-2">
                  <span className="text-xl">🍌</span>
                  <div className="min-w-0">
                    <span className="block font-serif font-black text-xs text-stone-900 truncate">Banana com Cacau</span>
                    <span className="block text-[10px] text-stone-500 truncate leading-tight">Intenso sabor 100% fit</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-stone-200/50 flex items-center gap-2">
                  <span className="text-xl">🍈</span>
                  <div className="min-w-0">
                    <span className="block font-serif font-black text-xs text-stone-900 truncate">Goiaba Puríssima</span>
                    <span className="block text-[10px] text-stone-500 truncate leading-tight">Doce natural da fruta</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FDFBF7] rounded-xl border border-stone-200/50 flex items-center gap-2">
                  <span className="text-xl">🍍</span>
                  <div className="min-w-0">
                    <span className="block font-serif font-black text-xs text-stone-900 truncate">Abacaxi com Gengibre</span>
                    <span className="block text-[10px] text-stone-500 truncate leading-tight">Leveza refrescante</span>
                  </div>
                </div>
              </div>

              {/* Core Features list directly from the flyer */}
              <div className="bg-stone-50/70 rounded-2xl p-6 border border-stone-200/30 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500">Funcionalidades e Benefícios Reais:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div className="flex items-center gap-2 text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Zero Açúcar</strong>: 100% saudável</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Rica em Vitamina C</strong>: imunidade</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Fonte de Fibras</strong>: bom trânsito</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Natural</strong>: sem aditivos químicos</span>
                  </div>
                </div>
              </div>

              {/* Promo Call To Action block */}
              <div className="bg-amber-50/60 border border-amber-500/10 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
                <div>
                  <span className="block text-[10px] font-black text-[#A4161A] uppercase tracking-wider mb-1">Promoção Especial de Lançamento</span>
                  <span className="block text-2xl font-serif font-black text-stone-900 leading-none">R$ 139,00 <span className="text-xs font-bold text-stone-500 font-sans">(Kit 8 Unidades)</span></span>
                  <span className="block text-[10px] text-emerald-800 font-bold mt-1">Economia garantida no pacote completo + Brinde!</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedComboId("kit8");
                    const element = document.getElementById("kit-builder");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full sm:w-auto bg-[#A4161A] hover:bg-[#801013] text-white px-6 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md hover:scale-[1.02] active:scale-95"
                >
                  Escolher Meu Kit 8
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Interactive Kit Builder Section */}
      <section id="kit-builder" className="py-20 bg-gradient-to-b from-[#FDFBF7] to-[#F5EFE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#A4161A] text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">Faça Seu Pedido</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Monte seu Kit Especial Nusa
            </h2>
            <p className="text-stone-600 font-sans">
              Monte seu combo ideal com total liberdade. Economize levando os kits de 4 ou 8 sabores e peça direto pelo WhatsApp!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Choose size & list flavors to fill */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Step 1: Select Combo Size */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 shadow-md space-y-6">
                <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-sm font-bold">1</span>
                  <span>Escolha o tamanho do seu pedido</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {COMBOS.map((combo) => (
                    <div
                      key={combo.id}
                      onClick={() => setSelectedComboId(combo.id)}
                      className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedComboId === combo.id
                          ? "border-[#A4161A] bg-red-50/10 shadow-md"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      {/* Badge info */}
                      <span className="absolute -top-3 left-4 bg-amber-400 text-stone-950 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {combo.badge}
                      </span>

                      <div className="space-y-2 mt-1">
                        <h4 className="font-serif font-bold text-lg text-stone-900">{combo.name}</h4>
                        <p className="text-xs text-stone-500 leading-relaxed">{combo.description}</p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 mt-4 flex items-baseline justify-between">
                        <div>
                          <span className="text-xs font-bold text-stone-400 line-through mr-1 block">
                            {combo.id === "kit4" ? "R$ 88,00" : combo.id === "kit8" ? "R$ 176,00" : ""}
                          </span>
                          <span className="text-2xl font-serif font-black text-[#A4161A]">R$ {combo.price},00</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#2D6A4F] bg-[#E8F5E9] px-2 py-1 rounded">
                          {combo.savingText}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Pick Flavors to fill spots */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 shadow-md space-y-6">
                
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-sm font-bold">2</span>
                    <span>Selecione seus sabores</span>
                  </h3>
                  
                  {/* Spots indicator */}
                  <div className="bg-stone-50 border border-stone-200/80 rounded-full px-4 py-1.5 text-xs font-bold text-stone-600">
                    Vagas no Kit: <span className={totalJarsInKit === currentCombo.capacity ? "text-emerald-600" : "text-[#A4161A]"}>
                      {totalJarsInKit} de {currentCombo.capacity} potes
                    </span>
                  </div>
                </div>

                {/* Grid of flavors with simple additive counts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FLAVORS.map((flavor) => {
                    const countInKit = kitFlavors[flavor.id] || 0;
                    const isKitFull = totalJarsInKit >= currentCombo.capacity;

                    return (
                      <div
                        key={flavor.id}
                        className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                          countInKit > 0
                            ? "border-emerald-500/30 bg-emerald-50/5"
                            : "border-stone-100 bg-stone-50/50 hover:bg-stone-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          
                          {/* Mini visual representation */}
                          <div className={`w-8 h-10 rounded bg-gradient-to-br ${getJarBgGradient(flavor.color)} shadow-sm shrink-0 flex items-center justify-center`}>
                            <span className="text-xs">
                              {flavor.id.includes("morango") ? "🍓" : 
                               flavor.id.includes("laranja") ? "🍊" : "🍍"}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm text-stone-950">{flavor.name}</h4>
                            <p className="text-[10px] text-stone-500 italic truncate max-w-[150px] sm:max-w-[180px]">
                              {flavor.tagline}
                            </p>
                          </div>
                        </div>

                        {/* Control buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFlavorFromKit(flavor.id)}
                            disabled={countInKit === 0}
                            className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 disabled:opacity-30 disabled:hover:text-stone-500 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="text-sm font-bold text-stone-900 w-5 text-center">
                            {countInKit}
                          </span>

                          <button
                            onClick={() => addFlavorToKit(flavor.id)}
                            disabled={isKitFull}
                            className="w-7 h-7 rounded-full bg-[#1B4332] text-white flex items-center justify-center hover:bg-[#122C21] disabled:opacity-30 disabled:bg-stone-300 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Visual Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Progresso do preenchimento:</span>
                    <span>{Math.round((totalJarsInKit / currentCombo.capacity) * 100)}% preenchido</span>
                  </div>
                  <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                      style={{ width: `${(totalJarsInKit / currentCombo.capacity) * 100}%` }}
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Checkout Summary Panel */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              
              <div className="bg-white rounded-3xl border border-stone-200/50 shadow-lg p-6 sm:p-8 space-y-6">
                
                <h3 className="font-serif font-bold text-xl text-stone-900 pb-4 border-b border-stone-100 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#A4161A]" />
                  <span>Resumo do Pedido</span>
                </h3>

                <div className="space-y-4">
                  
                  {/* Selected Combo item */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-stone-900">{currentCombo.name}</span>
                      <span className="block text-xs text-stone-500">{currentCombo.description}</span>
                    </div>
                    <span className="font-serif font-black text-stone-950 shrink-0">R$ {currentCombo.price},00</span>
                  </div>

                  {/* Selected jars list details */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase text-stone-500 tracking-wider block">Sabores no Pote:</span>
                    
                    {totalJarsInKit === 0 ? (
                      <p className="text-xs text-stone-400 italic">Nenhum sabor selecionado ainda. Clique nos botões de + ao lado para montar seu kit!</p>
                    ) : (
                      <div className="space-y-2">
                        {Object.entries(kitFlavors).map(([flavorId, count]) => {
                          const flavor = FLAVORS.find((f) => f.id === flavorId);
                          if (!flavor) return null;
                          return (
                            <div key={flavorId} className="flex justify-between text-xs text-stone-700">
                              <span>{flavor.name}</span>
                              <span className="font-bold">x{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Delivery Location selector to dynamically update text */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest">
                      📍 Escolha a Região de Entrega:
                    </label>
                    <select
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1B4332] text-stone-800"
                    >
                      <option value="Praia Grande - SP">Praia Grande - SP (Entrega Expressa)</option>
                      <option value="Ipatinga - MG">Ipatinga - MG (Entrega Local)</option>
                      <option value="Outra Região (Via Correios)">Outra Região (Correios / Envio Nacional)</option>
                    </select>
                  </div>

                  {/* Shipping info indicator */}
                  <div className="bg-emerald-50/50 border border-emerald-500/10 p-3.5 rounded-xl text-[11px] text-emerald-800 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block uppercase tracking-wide mb-0.5">Frete Promocional!</span>
                      <span>{deliveryLocation.includes("Outra") ? "Para outros estados, enviamos via Sedex com taxas reduzidas de atacado." : "Frete grátis garantido para pedidos na sua cidade!"}</span>
                    </div>
                  </div>

                </div>

                {/* Final calculated pricing */}
                <div className="pt-6 border-t border-stone-100 space-y-3.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-stone-600 font-medium">Subtotal</span>
                    <span className="text-sm font-semibold text-stone-800">R$ {currentCombo.price},00</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-stone-600 font-medium">Frete</span>
                    <span className="text-sm font-extrabold text-emerald-600">
                      {deliveryLocation.includes("Outra") ? "A calcular" : "GRÁTIS"}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-base font-serif font-bold text-stone-900">Total Estimado</span>
                    <span className="text-2xl font-serif font-black text-[#A4161A]">R$ {currentCombo.price},00</span>
                  </div>

                  {/* Primary call to WhatsApp Checkout */}
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold tracking-wide text-center flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-sm"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                    <span>Enviar Pedido via WhatsApp</span>
                  </a>

                  <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                    Você será redirecionado para o WhatsApp com seu pedido pronto. Nossa equipe finalizará o pagamento (Pix, Cartão ou Dinheiro) e combinará a entrega!
                  </p>
                </div>

              </div>

              {/* Social Instagram Banner */}
              <a 
                href="https://www.instagram.com/Nusazeroacucar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-2xl p-5 shadow-md flex items-center justify-between group cursor-pointer transition-transform hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="w-6 h-6 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-pink-100">Siga nossa rotina</span>
                    <span className="block text-sm font-extrabold">@Nusazeroacucar</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* Visual Pairings / Harmonization Section */}
      <section className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#A4161A] text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">Combina Com Tudo</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Combinações deliciosas para o seu dia a dia
            </h2>
            <p className="text-stone-600 font-sans">
              Descubra como harmonizar as geleias artesanais Nusa e elevar suas refeições diárias de forma prática e muito saborosa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PAIRINGS.map((pairing, idx) => (
              <div 
                key={idx} 
                className="bg-[#FDFBF7] rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                  <img 
                    src={pairing.image} 
                    alt={pairing.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-900 mb-1">{pairing.name}</h3>
                    <p className="text-xs text-stone-500 leading-relaxed font-sans">{pairing.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials Section ("Quem Prova, Ama! ❤️") */}
      <section id="depoimentos" className="py-20 bg-[#F5EFE6] border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#A4161A] text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">Opinião de Quem Ama</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              O que dizem os apaixonados pela Nusa
            </h2>
            <p className="text-stone-600 font-sans">
              A satisfação dos nossos clientes é a nossa prioridade número um. Veja depoimentos reais de quem já se rendeu às nossas geleias gourmet.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                
                {/* Text feedback */}
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-stone-700 italic leading-relaxed font-serif">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>

                {/* Profile card details */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-stone-100">
                  <div className={`w-11 h-11 rounded-full ${testimonial.avatarColor} text-white font-bold flex items-center justify-center text-sm`}>
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <span className="block font-bold text-sm text-stone-900">{testimonial.name}</span>
                    <span className="block text-xs text-stone-500 font-semibold">{testimonial.location} • {testimonial.tag}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#A4161A] text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">Dúvidas Frequentes</span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Tudo sobre as geleias Nusa
            </h2>
          </div>

          <div className="space-y-6">
            
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-950">1. Como as geleias são adoçadas se não levam açúcar?</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Utilizamos como adoçante o xilitol puro de alta qualidade, um ingrediente 100% natural extraído de fibras vegetais. Ele possui o mesmo poder adoçante do açúcar comum, porém com baixíssimo índice glicêmico e sem aquele gosto residual amargo comum em adoçantes artificiais.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-950">2. Qual o prazo de validade após a fabricação e após aberta?</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Nossas geleias fechadas têm validade de 6 meses (armazenadas em local seco e fresco). Como não utilizamos conservantes químicos ou estabilizantes artificiais, após aberta, a geleia deve ser mantida obrigatoriamente na geladeira e consumida em até 30 dias.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-950">3. Como funciona a entrega em Praia Grande - SP e Ipatinga - MG?</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Em Praia Grande - SP e Ipatinga - MG, temos entregas programadas semanais. Na compra de qualquer Kit de 4 ou 8 sabores, a taxa de entrega local é 100% gratuita. Para outras regiões do país, realizamos envios semanais via Correios (Sedex/PAC) com tarifas econômicas especiais.
              </p>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 space-y-2">
              <h3 className="font-serif font-bold text-base text-stone-950">4. Alérgicos, celíacos ou intolerantes a lactose podem consumir?</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                Sim! Todas as nossas geleias são formuladas e preparadas em ambiente estritamente livre de contaminação cruzada. São 100% seguras para celíacos (zero glúten) e intolerantes/alérgicos a lactose (zero leite e derivados).
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Footer Details */}
      <footer className="bg-stone-900 text-white py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <NusaLogo size={52} className="bg-white rounded-full p-0.5 shadow-sm" />
              <div>
                <span className="block font-serif font-bold text-xl tracking-tight">Nusa</span>
                <span className="block text-[8px] font-semibold tracking-widest text-[#81C784] uppercase">Geleias Artesanais</span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              Levando o sabor puro da fruta colhida do pé, com receitas tradicionais gourmet de pequenos lotes e zero adição de açúcares. Feito com amor para a sua mesa saudável todos os dias.
            </p>
          </div>

          <div className="space-y-3">
            <span className="block text-xs font-extrabold uppercase text-stone-400 tracking-widest">Nossas Sedes & Contato</span>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Praia Grande - SP & Ipatinga - MG</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fale no WhatsApp: 13 98171-1582</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instagram: @Nusazeroacucar</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <span className="block text-xs font-extrabold uppercase text-stone-400 tracking-widest">Atendimento ao Cliente</span>
            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              Segunda a Sábado, das 09:00 às 19:00. <br />
              Entregas semanais sob agendamento. Pedidos via WhatsApp facilitados. Aceitamos Pix, Cartão de Crédito e Débito no ato da entrega.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-stone-800 text-center text-[10px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Nusa Geleias Artesanais. Todos os direitos reservados. Feito com carinho no Brasil.</span>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/Nusazeroacucar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href={`https://api.whatsapp.com/send?phone=5513981711582`} className="hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>

      {/* Flavor Detail Modal (Dialog wrapper) */}
      <AnimatePresence>
        {selectedFlavorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFlavorModal(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative z-10 border border-stone-200"
            >
              <button 
                onClick={() => setSelectedFlavorModal(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                
                {/* Header title */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-16 rounded-xl bg-gradient-to-br ${getJarBgGradient(selectedFlavorModal.color)} shadow-md flex items-center justify-center shrink-0`}>
                    <span className="text-xl">🍓</span>
                  </div>
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${selectedFlavorModal.textBgClass}`}>
                      Artesanal & Funcional
                    </span>
                    <h3 className="font-serif font-black text-2xl text-stone-950">{selectedFlavorModal.name}</h3>
                    <p className="text-xs text-stone-500 italic font-medium">{selectedFlavorModal.tagline}</p>
                  </div>
                </div>

                {/* Body details */}
                <div className="space-y-4">
                  
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold uppercase text-stone-500 tracking-wider">A Experiência do Sabor:</h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">{selectedFlavorModal.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                      <span className="text-[10px] font-extrabold uppercase text-stone-500 tracking-wider block mb-1">🌿 Ingredientes:</span>
                      <p className="text-[11px] text-stone-600 leading-relaxed font-medium font-sans">{selectedFlavorModal.ingredients}</p>
                    </div>

                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                      <span className="text-[10px] font-extrabold uppercase text-stone-500 tracking-wider block mb-1">📊 Tabela Nutricional:</span>
                      <p className="text-[11px] text-stone-600 leading-relaxed font-medium font-sans">{selectedFlavorModal.nutritionalInfo}</p>
                    </div>

                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-extrabold uppercase text-stone-500 tracking-wider block">🥗 Harmonizações Ideais:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFlavorModal.pairings.map((pairing, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{pairing}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer action button */}
                <div className="pt-4 border-t border-stone-200 flex gap-3">
                  <button
                    onClick={() => {
                      addFlavorToKit(selectedFlavorModal.id);
                      setSelectedFlavorModal(null);
                      // Scroll to builder
                      const element = document.getElementById("kit-builder");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="flex-1 bg-[#1B4332] hover:bg-[#122C21] text-white py-3 rounded-xl font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Adicionar ao meu Kit
                  </button>
                  <button
                    onClick={() => setSelectedFlavorModal(null)}
                    className="px-4 py-3 border border-stone-200 text-stone-600 hover:bg-stone-50 rounded-xl font-bold text-xs transition-colors"
                  >
                    Fechar
                  </button>
                </div>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* Flyer Zoom Modal (Dialog wrapper) */}
      <AnimatePresence>
        {viewFlyerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewFlyerModal(false)}
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-3 sm:p-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 border border-stone-200 flex flex-col items-center"
            >
              <button 
                onClick={() => setViewFlyerModal(false)}
                className="absolute top-4 right-4 bg-stone-900/80 hover:bg-stone-900 text-white p-2 rounded-full transition-colors z-20 shadow"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full h-full overflow-hidden rounded-2xl flex justify-center">
                <img 
                  src={kit8SaboresFlyer} 
                  alt="Flyer Oficial Nusa Kit 8 Sabores Expandido" 
                  className="w-auto h-auto max-h-[80vh] object-contain"
                />
              </div>

              <div className="w-full text-center py-2 text-xs text-stone-500 font-medium font-sans">
                Clique fora para fechar • Folder de Lançamento Nusa Geleias Artesanais
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* Floating Sticky WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Floating Help Bubble */}
        <motion.div 
          className="hidden md:block bg-white text-stone-800 text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-stone-200/60 max-w-[210px] leading-snug pointer-events-auto"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3 }}
        >
          <span className="block text-emerald-600 text-[10px] uppercase font-extrabold tracking-wider mb-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Atendimento Online
          </span>
          Dúvidas ou Pedidos? Fale conosco no WhatsApp! 🍓
        </motion.div>
        
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 pointer-events-auto relative group"
          title="Fale no WhatsApp"
        >
          {/* Pulse wave effects */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 -z-10" />
          <MessageCircle className="w-8 h-8 fill-white/10" />
        </a>
      </motion.div>

    </div>
  );
}

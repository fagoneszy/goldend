import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Dumbbell,
  Users,
  Trophy,
  Target,
  Star,
  Shield,
  Phone,
  Mail,
  MapPin,
  Zap,
} from 'lucide-react';
import {
  FaInstagram as Instagram,     
  FaFacebook as Facebook,      
  FaTwitter as Twitter,         
} from 'react-icons/fa';

// --- Types ---

interface NavLink {
  name: string;
  href: string;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

// --- Data ---

const NAV_LINKS: NavLink[] = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Treinos', href: '#treinos' },
  { name: 'Preços', href: '#precos' },
  { name: 'Créditos', href: '#creditos' },
];

const STATS: Stat[] = [
  { label: 'Atletas', value: 1200, suffix: '+' },
  { label: 'Treinadores', value: 15, suffix: '' },
  { label: 'Prêmios', value: 8, suffix: '' },
  { label: 'Anos de História', value: 12, suffix: '+' },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Roberto Silva',
    role: 'Atleta de Musculação',
    content: 'A Golden Academy mudou minha vida. O ambiente é motivador e os equipamentos são de primeira linha. Recomendo para quem busca resultados reais.',
    image: 'https://picsum.photos/seed/user1/200/200',
  },
  {
    name: 'Ana Oliveira',
    role: 'Entusiasta de Fitness',
    content: 'O suporte dos treinadores é excepcional. Nunca me senti tão bem cuidada em um ambiente de treino. A estrutura é impecável.',
    image: 'https://picsum.photos/seed/user2/200/200',
  },
  {
    name: 'Marco Antônio',
    role: 'Empresário',
    content: 'Treinar aqui é a melhor parte do meu dia. A vibe é incrível e o foco profissional da academia faz toda a diferença.',
    image: 'https://picsum.photos/seed/user3/200/200',
  },
];

const PRICING: PricingTier[] = [
  {
    name: 'Iniciante',
    price: 'R$ 149',
    features: ['Acesso à área de treino', 'Avaliação mensal', 'Suporte básico', 'Vestiário completo'],
  },
  {
    name: 'Profissional',
    price: 'R$ 199',
    features: ['Acesso prioritário', 'Plano personalizado', 'Suporte 24/7', 'Área VIP', 'Kit de boas-vindas'],
    popular: true,
  },
  {
    name: 'Elite',
    price: 'R$ 299',
    features: ['Personal trainer dedicado', 'Suplementação inclusa', 'Check-up quinzenal', 'Eventos exclusivos'],
  },
];

// --- Components ---

const Preloader = () => (
  <motion.div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      className="flex flex-col items-center"
    >
      <Dumbbell className="w-16 h-16 text-brand-gold mb-4" />
      <span className="text-xl font-display font-extrabold tracking-widest text-brand-text uppercase">GOLDEN ACADEMY</span>
    </motion.div>
  </motion.div>
);

const SectionHeader = ({ title, subtitle, centered = false }: { title: string; subtitle: string; centered?: boolean }) => (
  <motion.div 
    className={`mb-16 ${centered ? 'text-center' : ''}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase">{title}</h2>
    <div className={`h-1 w-20 bg-brand-gold ${centered ? 'mx-auto' : ''} mb-6`} />
    <p className="text-brand-text/60 max-w-2xl text-lg leading-relaxed">{subtitle}</p>
  </motion.div>
);

const StatCard = ({ stat, index }: { stat: Stat; index: number; key?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(handle);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(handle);
  }, [stat.value]);

  return (
    <motion.div
      className="p-8 bg-brand-card border border-brand-border rounded-2xl flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <span className="text-4xl md:text-5xl font-extrabold text-brand-gold mb-2">
        {count}{stat.suffix}
      </span>
      <span className="text-brand-text/60 uppercase tracking-widest text-sm font-medium">{stat.label}</span>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative overflow-x-hidden antialiased">
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-[100] origin-left" style={{ scaleX }} />

      {/* Navigation Toggle */}
      <button 
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-[110] p-4 bg-brand-gold text-brand-bg rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Fullscreen Navigation Menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[105] bg-brand-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col gap-6 md:gap-10 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={toggleMenu}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-4xl md:text-7xl font-extrabold hover:text-brand-gold transition-colors italic uppercase tracking-tighter"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-16 flex gap-8"
            >
              <Instagram className="cursor-pointer hover:text-brand-gold transition-all hover:scale-110" />
              <Facebook className="cursor-pointer hover:text-brand-gold transition-all hover:scale-110" />
              <Twitter className="cursor-pointer hover:text-brand-gold transition-all hover:scale-110" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`${isMenuOpen ? 'blur-md' : ''} transition-[filter] duration-500`}>
        
        {/* Hero Section */}
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 parallax-bg"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1920&auto=format&fit=crop")',
              filter: 'brightness(0.35)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-bg z-0" />
          
          <div className="container mx-auto px-6 z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-block px-4 py-1 border border-brand-gold/30 rounded-full mb-8 text-brand-gold text-xs font-bold tracking-[0.3em] uppercase bg-brand-gold/5"
              >
                Welcome to the Elite
              </motion.div>
              <h1 className="text-6xl md:text-[10rem] font-extrabold mb-4 leading-[0.85] tracking-tighter italic uppercase text-white">
                GOLDEN<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gold-dark to-brand-gold">ACADEMY</span>
              </h1>
              <p className="text-lg md:text-2xl text-brand-text/70 mb-12 tracking-[0.2em] uppercase font-light max-w-3xl mx-auto leading-relaxed">
                A excelência em cada repetição.<br className="hidden md:block" /> Treine com os melhores do mundo.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href="#precos" className="px-10 py-5 bg-brand-gold text-brand-bg font-extrabold rounded-full flex items-center gap-3 hover:bg-white transition-all hover:scale-105 active:scale-95 group shadow-xl shadow-brand-gold/20">
                  ASSINAR AGORA <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#sobre" className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 hover:border-brand-gold rounded-full font-extrabold transition-all hover:bg-white/10">
                  SABER MAIS
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => document.getElementById('sobre')?.scrollIntoView()}
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto" />
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-brand-bg relative z-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Alternating Layout */}
        <section id="sobre" className="py-32 bg-brand-bg relative overflow-hidden">
          <div className="container mx-auto px-6">
            
            {/* Split 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32 mb-40">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <SectionHeader 
                  title="Performance de Elite" 
                  subtitle="Na Golden Academy, não apenas levantamos pesos. Nós construímos atletas. Nossa história é forjada na disciplina e na busca incessante pela perfeição física e mental." 
                />
                <div className="space-y-8">
                  {[
                    { icon: Shield, title: "Segurança Impecável", desc: "Equipamentos calibrados e monitoramento profissional constante." },
                    { icon: Target, title: "Foco Individual", desc: "Cada membro recebe uma rota de sucesso personalizada." },
                    { icon: Zap, title: "Resultados Reais", desc: "Metodologias aplicadas por treinadores premiados internacionalmente." }
                  ].map((item, i) => (
                    <motion.div 
                      key={item.title} 
                      className="flex gap-6 items-start group"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <div className="p-4 bg-brand-card border border-brand-border rounded-2xl text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-bg transition-all duration-300">
                        <item.icon size={26} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xl mb-1 uppercase italic tracking-tight">{item.title}</h4>
                        <p className="text-brand-text/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                className="flex-1 relative"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-brand-border group">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200" 
                    alt="Treino na Academia" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <motion.div 
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-gold rounded-full flex flex-col items-center justify-center text-brand-bg text-center p-4 font-black shadow-2xl hidden md:flex"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-xs tracking-widest mb-1 opacity-60">GOLDEN</span>
                  <span className="text-2xl">#1 SP</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Split 2 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <SectionHeader 
                  title="Equipamento Superior" 
                  subtitle="Temos a maior coleção de halteres vintage e modernos da América Latina. O toque frio do ferro, a ergonomia perfeita." 
                />
                <p className="text-brand-text/70 leading-relaxed mb-10 text-lg">
                  Esqueça as máquinas de plástico. Nossos equipamentos são escolhidos a dedo para garantir que cada fibra muscular seja ativada. Treine em um ambiente que respira o esporte tradicional com tecnologia de análise biométrica.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 bg-brand-card border border-brand-border rounded-[2rem] hover:border-brand-gold/50 transition-colors">
                    <Dumbbell className="text-brand-gold mb-4" size={32} />
                    <h5 className="font-extrabold text-xl mb-2 italic">IRON ZONE</h5>
                    <p className="text-sm opacity-50">Área exclusiva para treinos de altíssima intensidade.</p>
                  </div>
                  <div className="p-8 bg-brand-card border border-brand-border rounded-[2rem] hover:border-brand-gold/50 transition-colors">
                    <Zap className="text-brand-gold mb-4" size={32} />
                    <h5 className="font-extrabold text-xl mb-2 italic">CARDIO HUB</h5>
                    <p className="text-sm opacity-50">Equipamentos conectados com monitoramento em tempo real.</p>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden border border-brand-border group">
                  <img 
                    src="https://images.unsplash.com/photo-1637430308606-86576d8fef3c?q=80&w=1200" 
                    alt="Halteres de Luxo" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-bg/20 group-hover:bg-transparent transition-colors" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Parallax Mid-section */}
        <section className="h-[70vh] relative overflow-hidden flex items-center justify-center">
          <div 
            className="absolute inset-0 parallax-bg scale-110"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920")',
              filter: 'brightness(0.3) saturate(0.5)'
            }}
          />
          <div className="relative z-10 text-center container px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="text-5xl md:text-8xl font-black mb-6 italic tracking-tighter uppercase">NO PAIN, NO GOLD.</h3>
              <p className="text-xl md:text-2xl font-light tracking-[0.3em] opacity-60">TRANSFORME SUOR EM CONQUISTA.</p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="treinos" className="py-40 bg-brand-bg relative overflow-hidden">
          <div className="container mx-auto px-6">
            <SectionHeader 
              title="A Voz do Atleta" 
              subtitle="O que dizem os membros da nossa família elite."
              centered 
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {TESTIMONIALS.map((t, i) => (
                <motion.div 
                  key={t.name}
                  className="p-10 bg-brand-card border border-brand-border rounded-[2.5rem] relative group hover:border-brand-gold/30 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="flex gap-1 mb-8">
                    {[1,2,3,4,5].map(star => <Star key={star} size={16} className="text-brand-gold fill-brand-gold" />)}
                  </div>
                  <p className="text-xl italic mb-10 leading-relaxed font-light opacity-90 group-hover:opacity-100 transition-opacity">"{t.content}"</p>
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                      <div className="absolute -bottom-1 -right-1 bg-brand-gold p-1 rounded-full"><Trophy size={12} className="text-brand-bg" /></div>
                    </div>
                    <div>
                      <h5 className="font-extrabold text-lg uppercase tracking-tight">{t.name}</h5>
                      <p className="text-sm opacity-40 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plan */}
        <section id="precos" className="py-40 bg-brand-bg border-t border-brand-border/10">
          <div className="container mx-auto px-6">
            <SectionHeader 
              title="Planos & Investimento" 
              subtitle="Escolha o nível da sua transformação. Investimento transparente para resultados extraordinários."
              centered 
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto items-center">
              {PRICING.map((p, i) => (
                <motion.div
                  key={p.name}
                  className={`relative p-12 rounded-[3rem] border transition-all duration-500 ${p.popular ? 'border-brand-gold bg-brand-card/80 scale-105 z-10 shadow-2xl shadow-brand-gold/10' : 'border-brand-border bg-brand-card/40 opacity-70 hover:opacity-100 hover:scale-[1.02]'}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  {p.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-bg px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg">
                      Mais Procurado
                    </div>
                  )}
                  <h4 className="text-2xl font-black mb-4 uppercase italic tracking-tighter">{p.name}</h4>
                  <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-6xl font-black text-brand-gold tracking-tighter">{p.price}</span>
                    <span className="text-brand-text/30 uppercase text-sm font-bold tracking-widest">/mês</span>
                  </div>
                  <ul className="space-y-5 mb-12">
                    {p.features.map(f => (
                      <li key={f} className="flex items-start gap-4 text-brand-text/60 text-sm">
                        <div className="mt-1"><Zap className="text-brand-gold" size={14} /></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 ${p.popular ? 'bg-brand-gold text-brand-bg hover:bg-white shadow-xl shadow-brand-gold/20' : 'bg-white/5 border border-white/10 hover:border-white/30'}`}>
                    COMEÇAR AGORA
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="creditos" className="bg-brand-card border-t border-brand-border pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-8">
                  <Dumbbell className="text-brand-gold" size={32} />
                  <span className="text-4xl font-extrabold italic tracking-tighter text-white">GOLDEN ACADEMY</span>
                </div>
                <p className="text-brand-text/50 max-w-md text-lg leading-relaxed mb-10">
                  O santuário do fisiculturismo e fitness de elite em São Paulo. Onde cada detalhe é ouro e cada gota de suor conta.
                </p>
                <div className="flex gap-6">
                  <motion.a whileHover={{ scale: 1.1, color: '#d4af37' }} href="#" className="p-4 bg-brand-bg border border-brand-border rounded-full transition-all"><Instagram size={22} /></motion.a>
                  <motion.a whileHover={{ scale: 1.1, color: '#d4af37' }} href="#" className="p-4 bg-brand-bg border border-brand-border rounded-full transition-all"><Facebook size={22} /></motion.a>
                  <motion.a whileHover={{ scale: 1.1, color: '#d4af37' }} href="#" className="p-4 bg-brand-bg border border-brand-border rounded-full transition-all"><Twitter size={22} /></motion.a>
                </div>
              </div>
              
              <div>
                <h5 className="font-extrabold text-xl mb-8 uppercase italic tracking-wider">MAPA DO OURO</h5>
                <ul className="space-y-4">
                  {NAV_LINKS.map(link => (
                    <li key={link.name}>
                      <a href={link.href} className="text-brand-text/40 hover:text-brand-gold transition-colors flex items-center gap-2 group">
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-extrabold text-xl mb-8 uppercase italic tracking-wider">CONTATO</h5>
                <ul className="space-y-6 text-brand-text/40">
                  <li className="flex gap-4 items-center group cursor-pointer hover:text-brand-text transition-colors">
                    <Phone className="text-brand-gold" size={20} />
                    <span>(11) 98765-4321</span>
                  </li>
                  <li className="flex gap-4 items-center group cursor-pointer hover:text-brand-text transition-colors">
                    <Mail className="text-brand-gold" size={20} />
                    <span>elite@goldenacademy.com</span>
                  </li>
                  <li className="flex gap-4 items-start group cursor-pointer hover:text-brand-text transition-colors">
                    <MapPin className="text-brand-gold mt-1" size={20} />
                    <span>Rua do Ouro, 777 - Jardins<br />São Paulo, SP</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-brand-border/30 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-brand-text/20 text-sm font-medium tracking-widest uppercase">
                &copy; {new Date().getFullYear()} Golden Academy. All Professional Rights Reserved.
              </p>
              <div className="flex gap-12 text-[10px] font-black tracking-[0.3em] text-brand-text/20 uppercase">
                <a href="#" className="hover:text-brand-gold transition-colors">Safety</a>
                <a href="#" className="hover:text-brand-gold transition-colors">Careers</a>
                <a href="#" className="hover:text-brand-gold transition-colors">Press</a>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

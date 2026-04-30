
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Globe, Phone, Mail, MapPin, ArrowRight, Gauge, Cpu, Wind, 
  Repeat, ArrowRightLeft, Boxes, Ruler, Scan, HardDrive, Anchor, 
  Settings, Plus, ChevronRight, Play, Calendar, Bookmark, CheckCircle,
  Hammer, Compass, Layers, Users, Star, Briefcase, MessageCircle, Clock,
  ArrowUpRight, Shield, Scissors, Droplets, Binary, Instagram, Facebook, 
  Music, Share2, Loader2
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { translations, categories, companyData, testimonials } from './constants';
import { supabase } from './lib/supabase';

const categoryIcons: { [key: string]: React.ElementType } = {
  "measuring-testing": Gauge,
  "robotic-integration": Cpu,
  "pneumatic-system": Wind,
  "conveyor-system": Repeat,
  "linear-motion": ArrowRightLeft,
  "miscellaneous": Boxes,
  "measuring-small": Ruler,
  "measuring-system": Scan,
  "material-testing": HardDrive,
  "press-machine": Anchor,
  "cnc-machine": Settings,
  "industrial-safety": Shield,
  "cutting-tools": Scissors,
  "hydraulic-systems": Droplets,
  "smart-factory": Binary,
  "others": Plus,
};

export default function App() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { scrollY } = useScroll();
  const t = translations[lang];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: 'Industrial Sourcing',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 1. Submit to Supabase
      const { error: supabaseError } = await supabase
        .from('contacts')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          details: formData.details
        }]);

      if (supabaseError) throw supabaseError;

      // 2. Submit to Formspree using fetch to avoid redirect
      const formspreeResponse = await fetch('https://formspree.io/f/xykogvkv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: `Inquiry: ${formData.projectType}`,
          message: formData.details
        })
      });

      if (!formspreeResponse.ok) {
        // We log but don't strictly throw if Supabase succeeded, 
        // as the data is already saved. But for completeness:
        console.warn('Formspree submission failed');
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        projectType: 'Industrial Sourcing',
        details: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const heroSlides = [
            {
        image: "https://lh3.googleusercontent.com/d/1WKpDZ93a_5rCWh53yBS2kDdK2Fi4UBKi",
        title: lang === 'id' ? "Trading Company Terpercaya" : "Trusted Trading Company",
        subtitle: lang === 'id' ? "Penyedia komponen industri dengan jaringan global dan dukungan lokal." : "Industrial component provider with global network and local support."
      },
      {
        image: "https://lh3.googleusercontent.com/d/17jdN9IlQTKxEkE6uFhvbuWFQCVidTnCd",
        title: lang === 'id' ? "Peralatan Pengujian Presisi" : "Precision Testing Equipment",
        subtitle: lang === 'id' ? "Standar kualitas tinggi untuk hasil pengukuran yang akurat dan andal." : "High quality standards for accurate and reliable measurement results."
      }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Parallax transforms
  const yHero = useTransform(scrollY, [0, 500], [0, -150]);
  const yPattern = useTransform(scrollY, [0, 1000], [0, -300]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'id' ? 'en' : 'id');

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-effect py-3 shadow-md' : 'bg-transparent py-5'}`}>
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div 
              className="flex items-center gap-3 cursor-pointer group animate-slide-right" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg flex items-center justify-center text-white">
                  <Hammer className="w-4 h-4" />
                </div>
                <div className="absolute inset-0 h-8 w-8 rounded-xl bg-blue-500 animate-pulse opacity-50 group-hover:opacity-20 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm sm:text-lg md:text-xl tracking-tighter block leading-none text-slate-900">Presitama</span>
                <span className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-slate-500 block mt-0.5 sm:mt-1 tracking-[0.2em] font-sans">SERVICE INDUSTRY</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-10">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'categories', label: t.nav.categories },
                { id: 'about', label: t.nav.about },
                { id: 'process', label: 'Process' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
              >
                <Globe className="w-4 h-4" />
                {lang.toUpperCase()}
              </button>
              <a 
                href={`https://wa.me/${companyData.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                <MessageCircle className="w-4 h-4" />
                {t.hero.contactCta}
              </a>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-3 rounded-xl hover:bg-slate-100 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white flex flex-col p-8 pt-24"
          >
            <div className="flex items-center gap-3 mb-12 border-b border-slate-100 pb-8">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg flex items-center justify-center text-white">
                <Hammer className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tighter block leading-none text-slate-900">Presitama</span>
                <span className="text-[10px] font-bold text-slate-500 block mt-1 tracking-[0.2em] font-sans">SERVICE INDUSTRY</span>
              </div>
            </div>
            <div className="space-y-8">
              {['home', 'categories', 'about', 'contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollTo(item === 'home' ? 'home' : item)}
                  className="block text-lg font-bold text-slate-900 text-left hover:text-blue-600 transition-colors"
                >
                  {t.nav[item as keyof typeof t.nav]}
                </button>
              ))}
            </div>
            <div className="mt-auto space-y-6 pt-8 border-t border-slate-100">
               <a 
                href={`https://wa.me/${companyData.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green-500 text-white font-bold shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                {t.hero.contactCta} (WhatsApp)
              </a>
               <button 
                onClick={toggleLang}
                className="flex items-center gap-3 text-lg font-bold text-slate-600"
              >
                <Globe className="w-5 h-5" />
                {lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Parallax Hero Slider */}
        <section id="home" className="relative h-screen flex items-center overflow-hidden bg-white">
          {/* Custom Background Image Overlay (Requested) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.img 
              src="https://lh3.googleusercontent.com/d/1dGZD6IyGAnD6YguZa4muYYGpBdc5P3HA" 
              alt="Premium Interior Backdrop" 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-[140%] object-cover pointer-events-none"
              style={{ y: useTransform(scrollY, [0, 1000], [0, -400]) }}
            />
            {/* The signature gradient: white/95 on text side, transparent on image side */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-transparent" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 z-[1]"
            >
              <img 
                src={heroSlides[currentSlide].image} 
                alt="Slide Context" 
                className="w-full h-full object-cover grayscale brightness-125"
              />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-96 sm:pt-96 pb-12 grid lg:grid-cols-12 gap-16 items-center w-full focus:outline-none">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] font-bold mb-6 sm:mb-8 bg-slate-100 text-slate-600 shadow-sm border border-slate-200 uppercase tracking-widest leading-none">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    {t.hero.badge}
                  </div>
                  
                  <h1 className="text-3xl sm:text-5xl lg:text-5xl leading-[1.1] tracking-tighter mb-8 sm:mb-12 flex flex-col">
                    <span className="font-light text-slate-900">{heroSlides[currentSlide].title}</span>
                    <span className="font-bold text-slate-900">& {lang === 'id' ? 'Hero Teknik' : 'Technical Hero'}</span>
                    <span className="font-light text-slate-400 italic">Excellence</span>
                  </h1>
                  
                  <div className="max-w-xl">
                    <p className="text-base sm:text-xl font-light leading-relaxed mb-8 sm:mb-12 text-slate-500">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 mb-16">
                      <button 
                        onClick={() => scrollTo('categories')}
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl bg-slate-900 text-white hover:bg-slate-800"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        {lang === 'id' ? 'Lihat Portofolio' : 'View Portofolio'}
                      </button>
                      <button 
                        onClick={() => scrollTo('about')}
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-slate-200 font-bold transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white shadow-sm"
                      >
                        <Calendar className="w-5 h-5" />
                        Request Consultation
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots */}
              <div className="flex gap-3 mb-12">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-12 bg-slate-900' : 'w-3 bg-slate-300'}`}
                  />
                ))}
              </div>

              {/* Stats Mini */}
              <div className="grid grid-cols-3 gap-12 border-t border-slate-100 pt-12">
                <div>
                  <div className="text-3xl font-light text-slate-900 mb-1">10+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.about.experience}</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-slate-900 mb-1">500+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.about.projects}</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-slate-900 mb-1">99%</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Satisfaction</div>
                </div>
              </div>
            </div>


            {/* Right Featured Project Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="relative rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] p-10 bg-white group">
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-widest">Industrial Sourcing</span>
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 uppercase tracking-widest">Global Parts</span>
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-bold bg-slate-900 text-white uppercase tracking-widest">Featured</span>
                  </div>
 
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">{t.categories.items['cnc-machine']}</h3>
                    <p className="text-sm text-slate-400 font-medium tracking-wide italic">Scientific research, Machining, Electronic industry, Aerospace</p>
                  </div>
 
                  <div className="rounded-[3rem] overflow-hidden mb-8 group relative aspect-[4/3] shadow-inner">
                    <img 
                      src="https://lh3.googleusercontent.com/d/17jdN9IlQTKxEkE6uFhvbuWFQCVidTnCd" 
                      alt="Industrial Project" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:opacity-0 transition-opacity duration-300" />
                  </div>
 
                  <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="text-center p-4 rounded-3xl bg-slate-50 border border-slate-100">
                       <Ruler className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                       <div className="text-sm font-bold text-slate-900">12,500</div>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">SQ FT AREA</p>
                    </div>
                    <div className="text-center p-4 rounded-3xl bg-slate-50 border border-slate-100">
                       <Clock className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                       <div className="text-sm font-bold text-slate-900">24/7</div>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">MONITORING</p>
                    </div>
                    <div className="text-center p-4 rounded-3xl bg-green-50/50 border border-green-100">
                       <CheckCircle className="w-5 h-5 mx-auto mb-2 text-green-500" />
                       <div className="text-sm font-bold text-slate-900">Delivered</div>
                       <p className="text-[9px] text-green-600 font-bold uppercase tracking-widest mt-1">ON TIME</p>
                    </div>
                  </div>
 
                  <button 
                    onClick={() => scrollTo('categories')}
                    className="w-full py-5 px-4 rounded-3xl bg-slate-900 text-white font-bold text-sm transition-all duration-300 hover:bg-blue-600 hover:shadow-2xl hover:scale-[1.02]"
                  >
                    View Project Details
                  </button>
                </div>
 
                {/* Floating Overlay Box */}
                <div className="absolute -top-10 -right-10 w-56 hidden xl:block z-20">
                  <div className="rounded-[2rem] shadow-2xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white/50 p-6 flex flex-col items-center text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Support Center</p>
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 group cursor-pointer">
                      <img src="https://lh3.googleusercontent.com/d/1WKpDZ93a_5rCWh53yBS2kDdK2Fi4UBKi" className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="Support" />
                      <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-current ml-1" />
                         </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900 leading-none">VIRTUAL CONSULTATION</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services / Performance Portfolio */}
        <section id="categories" className="py-32 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-[10px] font-bold mb-6 bg-blue-50 text-blue-700 uppercase tracking-widest border border-blue-100">
                  <Compass className="w-3 h-3" />
                  Contracting Expertise
                </div>
                <h2 className="text-5xl lg:text-6xl font-light tracking-tight text-slate-900 leading-snug">
                  High-Performance <span className="font-bold">Technical Portfolio</span>
                </h2>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-3xl font-bold text-slate-900">12+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specialized Segments</p>
                </div>
                <button 
                  onClick={() => scrollTo('contact')}
                  className="px-10 py-5 rounded-full bg-slate-900 text-white font-bold hover:bg-blue-600 transition-all duration-300 flex items-center gap-3 group shadow-xl hover:shadow-blue-500/20"
                >
                  Full Catalog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, i) => {
                const Icon = categoryIcons[category.id] || Boxes;
                const categoryTitle = t.categories.items[category.id] || category.id;
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.1 }}
                  >
                    <div 
                      onClick={() => setSelectedProduct({ ...category, title: categoryTitle, idNum: i + 101 })}
                      className="group cursor-pointer h-full bg-white rounded-[2rem] border border-slate-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-blue-500/20 overflow-hidden glass-card"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={categoryTitle} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute top-4 left-4 h-12 w-12 rounded-[1rem] bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.2em] leading-none">Industrial</span>
                          <div className="h-[1px] w-4 bg-slate-100" />
                          <span className="text-[9px] font-bold text-slate-300">0{i + 1}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 tracking-tight leading-none group-hover:text-blue-600 transition-colors uppercase h-in-tight line-clamp-2">{categoryTitle}</h3>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                          <button className="text-[10px] font-bold text-slate-900 flex items-center gap-2 group/btn hover:text-blue-600 transition-colors uppercase tracking-[0.2em] leading-none">
                            PRODUCT DETAILS
                            <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process / Value Proposition Section */}
        <section id="process" className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                  Technical Excellence
                </div>
                <h2 className="text-5xl font-light leading-tight mb-8 text-slate-900">
                  How We Help <span className="font-bold">Industrial Partners Thrive</span>
                </h2>
                
                <div className="space-y-10">
                  {[
                    { 
                      title: "Consultative Sourcing", 
                      desc: "We don't just sell parts; we analyze your technical requirements to provide optimized machinery solutions.",
                      icon: Compass 
                    },
                    { 
                      title: "Global Supply Chain", 
                      desc: "Strategic partnerships with global manufacturers ensure you get genuine parts at competitive costs.",
                      icon: Layers
                    },
                    { 
                      title: "Turnkey Logistics", 
                      desc: "Headquartered in MM2100 Bekasi, we provide just-in-time delivery for critical industrial operations.",
                      icon: Clock
                    }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{step.title}</h4>
                        <p className="text-slate-500 font-light leading-relaxed text-[15px]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1WKpDZ93a_5rCWh53yBS2kDdK2Fi4UBKi" 
                    alt="Industrial Support"
                    className="w-full h-[650px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                      <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                          <Settings className="w-8 h-8 animate-spin-slow" />
                        </div>
                        <div>
                          <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Local Support Hub</p>
                          <h4 className="text-white text-xl font-bold">MM2100 Bekasi Distribution</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Stat Card */}
                <div className="absolute -top-10 -left-10 bg-white p-8 rounded-[2rem] shadow-3xl border border-slate-100 hidden xl:block floating">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">24/7</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Global Sourcing</p>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="Avatar" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white">
                      +10
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About / Testimonials Section */}
        <section id="about" className="bg-slate-900 text-white py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
             <div className="absolute inset-0 pattern-dots" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-10 bg-white/10 text-white">
                  <Users className="w-4 h-4" />
                  Trusted by Industrial Leaders
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8">
                  Reliable Technical <span className="font-bold text-blue-400">Solution Delivery</span>
                </h2>
                
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  {t.about.description}
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 flex flex-col relative group"
                >
                  <div className="flex text-yellow-400 gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-[14px] font-light italic text-slate-200 leading-relaxed mb-8 flex-grow">
                    "{item.text}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                    <div className="h-12 w-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-white/10 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt={item.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{item.author}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">{item.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-24 pt-20 border-t border-white/5 text-center">
              {[
                { val: "10+", label: t.about.experience },
                { val: "500+", label: t.about.projects },
                { val: "100+", label: "Active Clients" },
                { val: "99%", label: "Satisfaction" }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl font-light mb-2">{stat.val}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 bg-blue-100 text-blue-800">
                  <MessageCircle className="w-4 h-4" />
                  Get In Touch
                </div>
                
                <h2 className="text-5xl font-light tracking-tight mb-6">
                  Ready to Support Your <span className="font-semibold">Operations?</span>
                </h2>
                
                <p className="text-xl text-slate-600 mb-12 font-light leading-relaxed">
                   Let's discuss your technical needs and create a resilient supply chain together. Schedule a consultation for your next equipment maintenance.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: Phone, title: "Phone", value: companyData.phone, color: "blue" },
                    { icon: Mail, title: "Email", value: companyData.email, color: "green" },
                    { icon: MapPin, title: "MM2100 Bekasi Area", value: companyData.address, color: "purple" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className={`p-4 rounded-2xl bg-${item.color}-50 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="text-slate-600 text-sm font-light">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
              >
                <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 lg:p-14 gradient-border">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400" 
                          placeholder="John" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400" 
                          placeholder="Doe" 
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400" 
                          placeholder="john@company.com" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t.contact.form.phone}</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400" 
                          placeholder="+62..." 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all bg-white font-medium"
                      >
                        <option>Industrial Sourcing</option>
                        <option>Automation Design</option>
                        <option>Testing Equipment</option>
                        <option>Maintenance Support</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Inquiry Details</label>
                      <textarea 
                        name="details"
                        rows={4} 
                        value={formData.details}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none placeholder:text-slate-400" 
                        placeholder="Tell us more..."
                      ></textarea>
                    </div>
                    
                    {submitStatus === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5" />
                        {lang === 'id' ? 'Pesan berhasil terkirim! Terima kasih.' : 'Message sent successfully! Thank you.'}
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium flex items-center gap-3"
                      >
                        <X className="w-5 h-5" />
                        {lang === 'id' ? 'Terjadi kesalahan. Silakan coba lagi.' : 'An error occurred. Please try again.'}
                      </motion.div>
                    )}

                    <button 
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {lang === 'id' ? 'Mengirim...' : 'Sending...'}
                        </>
                      ) : (
                        'Request Solution'
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

        {/* Footer */}
      <footer className="bg-slate-950 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-16 pb-20 border-b border-white/5">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-8 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                 <div className="p-2 rounded-xl bg-gradient-to-br from-slate-200 to-slate-400 group-hover:scale-110 transition-transform">
                    <Hammer className="w-5 h-5 text-slate-900" />
                 </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg tracking-tighter block leading-none">Presitama</span>
                    <span className="text-[12px] font-bold text-slate-400 block mt-1 tracking-widest font-sans">SERVICE INDUSTRY</span>
                  </div>
              </div>
              <p className="text-slate-400 font-light leading-relaxed mb-8">
                Delivering high-precision technical trading services with industrial reliability and expert support for the MM2100 Bekasi region.
              </p>
              <div className="flex gap-4">
                 {[Globe, Phone, Mail].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all cursor-pointer group">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-white" />
                    </div>
                 ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-slate-500">Solutions</h4>
              <ul className="space-y-4 text-slate-400 font-light text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Industrial Automation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pneumatic Systems</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Testing Equipment</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Global Sourcing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-slate-500">Industries</h4>
              <ul className="space-y-4 text-slate-400 font-light text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Automotive OEM</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Consumer Electronics</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Food & Beverage</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">General Manufacture</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-slate-500">Contact</h4>
              <p className="text-slate-400 font-light leading-relaxed text-sm mb-4">
                {companyData.address}
              </p>
              <div className="rounded-xl overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 border border-white/10 h-32">
                <iframe 
                  src={`https://maps.google.com/maps?q=${companyData.mapCoordinates.lat},${companyData.mapCoordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest leading-none">
             <p>© 2026 {companyData.name}. ALL RIGHTS RESERVED.</p>
             <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             </div>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] border border-slate-100"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-xl hover:scale-110 flex items-center justify-center border-2 border-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="md:w-1/2 relative bg-slate-100 min-h-[300px] md:min-h-0">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 text-white hidden md:block">
                  <div className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-[0.2em] mb-4 inline-block border border-white/10">
                    Product Identifier: PR-{selectedProduct.idNum}
                  </div>
                  <h4 className="text-xl font-bold tracking-tight uppercase leading-tight mb-2">{selectedProduct.title}</h4>
                  <p className="text-white/70 text-sm font-light">Precision Engineering Solutions</p>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-1/2 p-10 lg:p-14 overflow-y-auto bg-white">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">Catalog Category</span>
                  <div className="h-[1px] w-8 bg-slate-100" />
                  <span className="text-[10px] font-bold text-slate-400 capitalize">{selectedProduct.id.replace('-', ' ')}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight md:hidden">
                  {selectedProduct.title}
                </h3>

                <div className="prose prose-slate prose-sm max-w-none mb-10">
                  <p className="text-slate-600 leading-relaxed text-[15px] font-light mb-4">
                    Kami di **PT. Presitama Service Industry** berkomitmen untuk menyediakan solusi **{selectedProduct.title.toLowerCase()}** kelas dunia. Produk ini dirancang khusus untuk memenuhi kebutuhan operasional manufaktur yang presisi dan efisien, khususnya bagi industri di kawasan MM2100 Bekasi.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-[15px] font-light mb-4">
                    Kelebihan utama dari sistem ini meliputi durabilitas tinggi untuk beban kerja industri berat, akurasi pemrosesan yang stabil, dan kemudahan integrasi dengan ekosistem pabrik pintar (smart factory). Kami menjamin setiap unit telah memenuhi standar sertifikasi internasional.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-[15px] font-light">
                    Layanan purna jual kami mencakup inspeksi rutin, ketersediaan suku cadang asli yang cepat di gudang lokal kami, serta dukungan teknis langsung di lokasi oleh engineer berpengalaman untuk meminimalisir waktu henti produksi Anda.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div className="p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <Boxes className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Stok Status</p>
                      <p className="text-slate-900 font-bold text-sm">Ready in Warehouse</p>
                    </div>
                  </div>
                  <div className="p-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Dukungan</p>
                      <p className="text-slate-900 font-bold text-sm">Respons 24 Jam</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <a 
                    href={`https://wa.me/${companyData.phone.replace(/\D/g, '')}?text=Halo PT. Presitama Service Industry, saya tertarik dengan produk ${selectedProduct.title}. Bisa minta penawaran harganya?`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-5 bg-slate-900 text-white rounded-[1.2rem] font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 group"
                  >
                    Minta Penawaran Harga
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="pt-8 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">Bagikan Solusi Ini</p>
                    <div className="flex gap-4">
                      {[
                        { Icon: MessageCircle, color: "bg-green-500", label: "WhatsApp", url: `https://wa.me/?text=Lihat solusi ${selectedProduct.title} dari PT. Presitama Service Industry: ${window.location.href}` },
                        { Icon: Music, color: "bg-slate-900", label: "TikTok", url: "https://tiktok.com" },
                        { Icon: Instagram, color: "bg-pink-600", label: "Instagram", url: "https://instagram.com" },
                        { Icon: Facebook, color: "bg-blue-600", label: "Facebook", url: "https://facebook.com" },
                      ].map((social, i) => (
                        <a 
                          key={social.label}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`${social.color} text-white p-3.5 rounded-xl hover:scale-110 transition-all shadow-md active:scale-95`}
                          title={`Bagikan di ${social.label}`}
                        >
                          <social.Icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href={`https://wa.me/${companyData.phone.replace(/\D/g, '')}`}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[60] flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white shadow-2xl transition-shadow hover:shadow-green-500/40 group overflow-visible"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
        <span className="absolute right-full mr-4 px-4 py-2 rounded-xl bg-white text-slate-900 text-sm font-bold shadow-2xl opacity-0 -translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap border border-slate-100">
          {lang === 'id' ? 'Hubungi Kami (WA)' : 'Contact Us (WA)'}
        </span>
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping -z-10 opacity-20" />
      </motion.a>

    </div>
  );
}

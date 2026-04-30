import React, { useState, useEffect, useRef } from 'react';
import { 
  BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation
} from 'react-router-dom';
import { 
  Menu, X, Globe, Phone, Mail, MapPin, ArrowRight, Gauge, Cpu, Wind, 
  Repeat, ArrowRightLeft, Boxes, Ruler, Scan, HardDrive, Anchor, 
  Settings, Plus, ChevronRight, Play, Calendar, Bookmark, CheckCircle,
  Hammer, Compass, Layers, Users, Star, Briefcase, MessageCircle, Clock,
  ArrowUpRight, Shield, Scissors, Droplets, Binary, Instagram, Facebook, 
  Music, Share2, Loader2, LogOut, LayoutDashboard, Database, MessageSquare,
  TrendingUp, Eye, ShoppingBag, Trash2, Edit3, Save, Search, Filter,
  Mail as MailIcon, Smartphone, MessageCircle as WhatsAppIcon
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { translations, categories, companyData, testimonialsData } from './constants';
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

// --- HomePage Component ---

function HomePage({ lang, toggleLang }: { lang: 'id' | 'en', toggleLang: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);
  const { scrollY } = useScroll();
  const t = translations[lang];
  const testimonials = testimonialsData[lang];

  const productsPerPage = 12;
  const allProducts = dynamicProducts.length > 0 ? dynamicProducts : categories;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) setDynamicProducts(data);
    }
    fetchProducts();
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: lang === 'id' ? 'Sourcing Industri' : 'Industrial Sourcing',
    details: ''
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      projectType: lang === 'id' ? 'Sourcing Industri' : 'Industrial Sourcing'
    }));
  }, [lang]);

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

      // 2. Submit to Formspree via AJAX
      const response = await fetch('https://formspree.io/f/xykogvkv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.details
        })
      });

      if (!response.ok) {
        console.warn('Formspree submission failed, but Supabase succeeded.');
      }

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        projectType: lang === 'id' ? 'Sourcing Industri' : 'Industrial Sourcing',
        details: ''
      });
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
      title: t.hero.title,
      subtitle: t.hero.subtitle
    },
    {
      image: "https://lh3.googleusercontent.com/d/17jdN9IlQTKxEkE6uFhvbuWFQCVidTnCd",
      title: lang === 'id' ? "Peralatan Pengujian Presisi" : "Precision Testing Equipment",
      subtitle: lang === 'id' ? "Standar kualitas tinggi untuk hasil pengukuran yang akurat dan andal." : "High quality standards for accurate and reliable measurement results."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const incrementProductView = async (product: any) => {
    setSelectedProduct(product);
    if (!product.id) return;
    try {
      await supabase.rpc('increment_view', { row_id: product.id });
    } catch (e) {
      await supabase.from('products').update({ views_count: (product.views_count || 0) + 1 }).eq('id', product.id);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'}`}>
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                  <Hammer className="w-5 h-5" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg md:text-xl tracking-tighter leading-none text-slate-900">
                  PT. Presitama Service Industry
                </span>
                <span className="text-[9px] md:text-[10px] font-bold text-slate-500 mt-1 tracking-widest">
                  {lang === 'id' ? 'LAYANAN INDUSTRI & TRADING' : 'INDUSTRIAL SERVICE & TRADING'}
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-10">
              {[
                { id: 'home', label: t.nav.home },
                { id: 'categories', label: t.nav.categories },
                { id: 'about', label: t.nav.about },
                { id: 'contact', label: t.nav.contact },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={toggleLang}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all border border-slate-100"
              >
                <Globe className="w-4 h-4" />
                {lang.toUpperCase()}
              </button>
              <a 
                href={`https://wa.me/${companyData.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full text-sm font-bold bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {t.hero.contactCta}
              </a>
            </div>

            <button className="md:hidden p-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {['home', 'categories', 'about', 'contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-2xl font-bold text-slate-900 text-left capitalize"
                >
                  {t.nav[item as keyof typeof t.nav]}
                </button>
              ))}
              <button onClick={toggleLang} className="text-xl font-bold text-blue-600 text-left flex items-center gap-3">
                <Globe className="w-6 h-6" /> LANGUAGE: {lang.toUpperCase()}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <motion.img 
              src={heroSlides[currentSlide].image} 
              className="w-full h-[110%] object-cover"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-400 text-[9px] font-bold uppercase tracking-[0.3em] border border-blue-500/20 mb-6"
            >
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              {lang === 'id' ? 'TRADING INDUSTRI TERPERCAYA' : 'TRUSTED INDUSTRIAL TRADING'}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tighter mb-6"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-slate-400 font-medium mb-10 max-w-lg leading-relaxed"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => scrollTo('categories')}
                className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shadow-xl flex items-center gap-2 group text-sm"
              >
                {t.hero.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 bg-slate-900/50 backdrop-blur-md border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all text-sm"
              >
                {t.hero.contactCta}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section id="categories" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-xl mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">{t.categories.title}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              {t.categories.subtitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {currentProducts.map((prod, i) => {
              const Icon = categoryIcons[prod.category_id || prod.id] || Plus;
              const shareUrl = window.location.href;
              const shareText = `Check out ${prod.title} at ${companyData.name}`;

              return (
                <motion.div 
                  key={prod.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.1 }}
                  className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image Area */}
                  <div 
                    className="relative h-64 overflow-hidden cursor-pointer"
                    onClick={() => incrementProductView(prod)}
                  >
                    <img 
                      src={prod.image_url || prod.image} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                      alt={prod.title}
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute top-4 left-4 flex justify-between w-[calc(100%-2rem)] items-start">
                      <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      {prod.is_best_seller && (
                        <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-bold uppercase tracking-widest border border-white/20">
                          Best Seller
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1 block">
                        {t.categories.items[prod.category_id || prod.id] || 'Industrial Part'}
                      </span>
                      <h4 
                        className="text-lg font-bold text-slate-900 leading-tight tracking-tight hover:text-blue-600 transition-colors cursor-pointer"
                        onClick={() => incrementProductView(prod)}
                      >
                        {prod.title}
                      </h4>
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                      {/* Interaction Area */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`https://wa.me/${companyData.phone.replace(/\D/g, '')}?text=Halo, saya tertarik dengan produk ${prod.title}`, '_blank');
                          }}
                          className="flex-grow py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-1.5 group/btn"
                        >
                          {t.product.quotation.split(' ').slice(0, 2).join(' ')}
                          <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>

                        <div className="flex items-center gap-1">
                          <a 
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                            target="_blank" rel="noreferrer"
                            className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-green-500 hover:bg-green-100 transition-all border border-slate-100"
                            title="WhatsApp"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                          </a>
                          <div className="relative group/share">
                            <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-100 transition-all border border-slate-100">
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                            <div className="absolute bottom-full right-0 mb-2 hidden group-hover/share:flex flex-col gap-2 bg-white p-2 rounded-xl shadow-xl border border-slate-100 z-30">
                              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-50 text-blue-600"><Facebook className="w-4 h-4" /></a>
                              <a href={`https://www.instagram.com/`} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-50 text-pink-500"><Instagram className="w-4 h-4" /></a>
                              <a href={`https://www.tiktok.com/`} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-slate-50 text-slate-900"><Music className="w-4 h-4" /></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  scrollTo('categories');
                }}
                disabled={currentPage === 1}
                className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-600 transition-all shadow-sm"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(i + 1);
                      scrollTo('categories');
                    }}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-500 border border-slate-100 hover:border-blue-200'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  scrollTo('categories');
                }}
                disabled={currentPage === totalPages}
                className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-600 transition-all shadow-sm"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>



      {/* About & Trust Section */}
      <section id="about" className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold mb-6 bg-white/5 text-white border border-white/10 tracking-[0.2em] uppercase">
                <Users className="w-3 h-3" />
                {t.about.title}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
                {lang === 'id' ? 'Kemitraan Strategis' : 'Strategic'} <span className="text-blue-400">Partnerships</span>
              </h2>

              <p className="text-base text-slate-400 font-medium leading-relaxed mb-10 max-w-lg">
                {t.about.description}
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-white tracking-tight mb-1">12+</div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.about.experience}</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 tracking-tight mb-1">99%</div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{lang === 'id' ? 'Kepuasan Layanan' : 'Service Satisfaction'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid gap-6">
                {[
                  { text: lang === 'id' ? "Sangat membantu dalam pengadaan sparepart industri kami." : "Crucial for our industrial sparepart procurement.", author: "Budi Santoso", pos: "Factory Manager", img: "https://i.pravatar.cc/100?u=1" },
                  { text: lang === 'id' ? "Respon cepat dan teknisi yang sangat kompeten." : "Fast response and highly competent technicians.", author: "Lutfi Hakim", pos: "Maintenance Lead", img: "https://i.pravatar.cc/100?u=2" },
                  { text: lang === 'id' ? "Partner terpercaya untuk otomasi pabrik." : "Trusted partner for factory automation.", author: "Susi Susanti", pos: "Operations Dir", img: "https://i.pravatar.cc/100?u=3" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex gap-4 items-start">
                    <img src={item.img} className="w-12 h-12 rounded-full border border-white/20" alt={item.author} />
                    <div>
                      <div className="flex gap-1 text-yellow-500 mb-2">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                      </div>
                      <p className="text-sm text-slate-300 italic mb-3 leading-relaxed">"{item.text}"</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold text-white">{item.author}</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.pos}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold mb-6 bg-blue-50 text-blue-700 tracking-[0.2em] uppercase">
                <MessageCircle className="w-3 h-3" />
                {lang === 'id' ? 'Hubungi Kami' : 'Get In Touch'}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
                {t.contact.title}
              </h2>
              <p className="text-base text-slate-500 font-medium mb-12 leading-relaxed max-w-md">
                {t.contact.desc}
              </p>

              <div className="space-y-6">
                {[
                  { icon: Phone, label: t.contact.labels.phone, val: companyData.phone, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { icon: Mail, label: t.contact.labels.email, val: companyData.email, color: 'text-green-600', bg: 'bg-green-50' },
                  { icon: MapPin, label: t.contact.labels.location, val: companyData.address, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className={`h-12 w-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</h4>
                      <p className="text-sm font-bold text-slate-900">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-[2rem] shadow-xl p-10 border border-slate-100"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{t.contact.form.firstName}</label>
                    <input name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm font-bold" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{t.contact.form.lastName}</label>
                    <input name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm font-bold" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{t.contact.form.email}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm font-bold" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Phone / HP</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm font-bold" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{lang === 'id' ? 'Tipe Proyek' : 'Project Type'}</label>
                  <select name="projectType" value={formData.projectType} onChange={handleInputChange} className="w-full p-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm font-bold appearance-none">
                    <option>{lang === 'id' ? 'Sourcing Industri' : 'Industrial Sourcing'}</option>
                    <option>{lang === 'id' ? 'Komponen Mesin' : 'Machine Components'}</option>
                    <option>{lang === 'id' ? 'Integrasi Robotik' : 'Robotic Integration'}</option>
                    <option>{lang === 'id' ? 'Pemeliharaan' : 'Maintenance'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{t.contact.form.message}</label>
                  <textarea name="details" value={formData.details} onChange={handleInputChange} rows={3} className="w-full p-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none transition-all text-sm font-bold resize-none" required />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-lg active:scale-95 disabled:opacity-50">
                  {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
                </button>
                {submitStatus === 'success' && <p className="text-green-600 text-[11px] font-bold text-center mt-2">✓ {t.contact.form.success}</p>}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Hammer className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-lg md:text-xl tracking-tighter">
                  {companyData.name}
                </span>
              </div>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 text-sm">
                {lang === 'id' ? 'Mitra industri terpercaya untuk solusi sourcing berkelanjutan.' : 'Your trusted industrial partner for sustainable sourcing.'}
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Music, Share2].map((Icon, i) => (
                  <button key={i} className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-6 text-slate-400">{t.nav.categories}</h3>
              <ul className="space-y-3">
                {Object.keys(translations.en.categories.items).slice(0, 5).map(key => (
                  <li key={key}>
                    <button onClick={() => scrollTo('categories')} className="text-slate-500 hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest text-left">
                      {t.categories.items[key as keyof typeof t.categories.items]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-6 text-slate-400">{lang === 'id' ? 'Akses Cepat' : 'Quick Access'}</h3>
              <ul className="space-y-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                {['home', 'categories', 'about', 'contact'].map(item => (
                  <li key={item}>
                    <button onClick={() => scrollTo(item)} className="hover:text-white transition-all">
                      {t.nav[item as keyof typeof t.nav]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] mb-6 text-slate-400">Map Localization</h3>
              <div className="rounded-xl overflow-hidden h-32 w-full grayscale contrast-125 opacity-50 hover:opacity-100 hover:grayscale-0 transition-all bg-slate-900 border border-white/5">
                <iframe 
                  src="https://maps.google.com/maps?q=-6.313468,107.082684&z=17&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  title="MM2100 Office Location"
                ></iframe>
              </div>
              <p className="mt-3 text-[10px] text-slate-600 font-bold uppercase tracking-widest text-center">Office Localization</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.3em]">
              © 2026 PT. Presitama Service Industry.
            </p>
            <div className="flex gap-6 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">
              <a href="#" className="hover:text-white transition-all">Privacy</a>
              <a href="/admin/login" className="hover:text-white transition-all text-blue-900">Admin Entrance</a>
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
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-all shadow-xl"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row h-full overflow-y-auto">
                {/* Image Side */}
                <div className="md:w-1/2 flex flex-col bg-slate-50 border-r border-slate-100">
                  <div className="relative h-[300px] md:h-auto md:flex-grow">
                    <img src={selectedProduct.image_url || selectedProduct.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  </div>
                  
                  {/* Action Bar Below Image */}
                  <div className="p-8 md:p-10 bg-white">
                    <div className="flex flex-col gap-6">
                      <a 
                        href={`https://wa.me/${companyData.phone.replace(/\D/g, '')}?text=Halo, saya tertarik dengan produk ${selectedProduct.title}`}
                        target="_blank"
                        className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-2xl shadow-blue-200 active:scale-95"
                      >
                        {t.product.quotation} <ArrowUpRight className="w-5 h-5" />
                      </a>
                      
                      <div className="flex flex-col items-center gap-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{lang === 'id' ? 'BAGIKAN PRODUK INI:' : 'SHARE THIS PRODUCT:'}</span>
                        <div className="flex gap-4">
                          <a 
                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(selectedProduct.title + ' ' + window.location.href)}`}
                            target="_blank" rel="noreferrer"
                            className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-green-500 hover:bg-green-50 transition-all border border-slate-100 group/shareItem"
                          >
                            <WhatsAppIcon className="w-6 h-6" />
                          </a>
                          <a 
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank" rel="noreferrer"
                            className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100"
                          >
                            <Facebook className="w-6 h-6" />
                          </a>
                          <a 
                            href="https://www.instagram.com"
                            target="_blank" rel="noreferrer"
                            className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-pink-500 hover:bg-pink-50 transition-all border border-slate-100"
                          >
                            <Instagram className="w-6 h-6" />
                          </a>
                          <a 
                            href="https://www.tiktok.com"
                            target="_blank" rel="noreferrer"
                            className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-100"
                          >
                            <Music className="w-6 h-6" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:w-1/2 p-12 lg:p-16 bg-white space-y-12">
                   <div>
                      <div className="flex items-center gap-3 mb-6">
                         <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{selectedProduct.id_num || 'PR-100'}</span>
                         <div className="w-8 h-[1px] bg-slate-100" />
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {t.categories.items[selectedProduct.category_id || selectedProduct.id] || 'Industrial'}
                         </span>
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-6">{selectedProduct.title}</h3>
                      <p className="text-xl text-slate-500 font-medium leading-relaxed">
                         {selectedProduct.description || "Premium industrial component for manufacturing excellence. Built to withstand extreme conditions and deliver high precision."}
                      </p>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                         <Boxes className="w-6 h-6 text-blue-600 mb-4" />
                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t.product.stockStatus}</p>
                         <p className="font-bold text-slate-900">{t.product.readyWarehouse}</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                         <Clock className="w-6 h-6 text-green-600 mb-4" />
                         <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Response Time</p>
                         <p className="font-bold text-slate-900">24/7 Available</p>
                      </div>
                   </div>

                   {/* SPECIFICATION SECTION AT BOTTOM PER REQUEST */}
                   <div className="pt-12 border-t border-slate-100">
                      <h4 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">{t.product.specTitle}</h4>
                      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                         {selectedProduct.specification ? (
                           selectedProduct.specification.split('\n').map((para: string, idx: number) => (
                             <p key={idx}>{para}</p>
                           ))
                         ) : (
                            <p>{t.product.longDescription}</p>
                         )}
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Support Center */}
      <div className="fixed bottom-8 right-8 z-40 hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-100 flex items-center gap-6 max-w-sm"
        >
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white">
              <Phone className="w-6 h-6" />
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
              <div className="h-1.5 w-1.5 bg-white rounded-full animate-pulse" />
            </div>
          </div>
            <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.categories.supportCenter}</p>
            <p className="text-sm font-bold text-slate-900 leading-tight">
              {lang === 'id' ? 'Gratis Konsultasi Teknis' : 'Free Technical Consulting'}
            </p>
            <a 
              href={`https://wa.me/${companyData.phone.replace(/\D/g, '')}`}
              target="_blank"
              className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2 block hover:translate-x-1 transition-transform"
            >
              {lang === 'id' ? 'Hubungi Sekarang' : 'Connect Now'} →
            </a>
          </div>
        </motion.div>
      </div>
      </main>
    </div>
  );
}

// --- Admin Components ---

function AdminDashboard() {
  const [view, setView] = useState<'overview' | 'products' | 'messages'>('overview');
  const [products, setProducts] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    const { data: p } = await supabase.from('products').select('*');
    const { data: m } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    if (p) setProducts(p);
    if (m) setMessages(m);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [view]);

  const logout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const chartData = [...products].sort((a,b) => (b.views_count || 0) - (a.views_count || 0)).slice(0, 5).map(p => ({
    name: p.title.substring(0, 15) + '...',
    views: p.views_count || 0
  }));

  if (loading && view === 'overview') return <div className="h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 text-blue-600 animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-950 text-white p-8 flex flex-col fixed h-full z-30">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <span className="font-black text-2xl tracking-tighter">Admin Hub</span>
        </div>

        <nav className="space-y-4 flex-1">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Database },
            { id: 'messages', label: 'Messages', icon: MailIcon },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as any)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-sm font-bold transition-all ${view === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </nav>

        <button onClick={logout} className="flex items-center gap-4 p-4 text-slate-500 hover:text-red-400 transition-all text-sm font-bold border-t border-white/10 pt-8">
           <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 p-16">
        <header className="flex justify-between items-center mb-16">
           <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter capitalize">{view}</h1>
              <p className="text-slate-400 font-medium">Control Center for PT. Presitama</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
                 <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-xs font-bold uppercase tracking-widest text-slate-500">System Live</span>
              </div>
           </div>
        </header>

        {view === 'overview' && (
           <div className="space-y-12">
              <div className="grid grid-cols-3 gap-8">
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Catalog</p>
                       <p className="text-4xl font-black text-slate-900 tracking-tighter">{products.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50 text-blue-600"><Database /></div>
                 </div>
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Queries</p>
                       <p className="text-4xl font-black text-slate-900 tracking-tighter">{products.reduce((a,b) => a + (b.views_count || 0), 0)}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-purple-50 text-purple-600"><Eye /></div>
                 </div>
                 <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Unread Inquiries</p>
                       <p className="text-4xl font-black text-slate-900 tracking-tighter">{messages.filter(m => !m.is_read).length}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-green-50 text-green-600"><MailIcon /></div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                    <h3 className="font-black text-xl mb-10 tracking-tight flex items-center gap-2">
                       <ShoppingBag className="w-5 h-5 text-blue-600" /> Best Performance (Top Views)
                    </h3>
                    <div className="h-80">
                       <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={chartData}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} />
                           <XAxis dataKey="name" fontSize={10} fontWeight="bold" stroke="#cbd5e1" />
                           <YAxis fontSize={10} fontWeight="bold" stroke="#cbd5e1" />
                           <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                           <Bar dataKey="views" fill="#2563eb" radius={[10, 10, 0, 0]} />
                         </BarChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
                    <h3 className="font-black text-xl mb-10 tracking-tight flex items-center gap-2">
                       <Star className="w-5 h-5 text-yellow-500" /> Highlight (Featured / Best Seller)
                    </h3>
                    <div className="space-y-4">
                       {products.filter(p => p.is_best_seller).slice(0, 5).map(p => (
                         <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="h-12 w-12 rounded-xl overflow-hidden shadow-sm">
                               <img src={p.image_url} className="w-full h-full object-cover" />
                            </div>
                            <div>
                               <p className="font-bold text-slate-900 leading-none mb-1">{p.title}</p>
                               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{p.id_num}</p>
                            </div>
                            <div className="ml-auto text-blue-600 font-black text-sm">{p.views_count} <span className="text-[10px] uppercase text-slate-300">views</span></div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        )}

        {view === 'products' && <ProductManager products={products} refresh={fetchData} />}
        {view === 'messages' && <MessageManager messages={messages} refresh={fetchData} />}
      </main>
    </div>
  );
}

function ProductManager({ products, refresh }: { products: any[], refresh: () => void }) {
  const [isEditing, setIsEditing] = useState<any>(null);
  const [search, setSearch] = useState('');

  const saveProduct = async (productData: any) => {
    const { id, ...data } = productData;
    let error;
    
    if (id) {
      const { error: updateError } = await supabase.from('products').update(data).eq('id', id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from('products').insert([data]);
      error = insertError;
    }

    if (!error) {
      setIsEditing(null);
      refresh();
    } else {
      console.error('Save error:', error);
      alert('Error saving product: ' + error.message);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) refresh();
    else alert('Error deleting product: ' + error.message);
  };

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md ml-4">
           <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
           <input 
            type="text" 
            placeholder="Search items..." 
            className="w-full pl-10 pr-4 py-3 bg-transparent outline-none font-bold text-slate-500 placeholder:text-slate-300"
            value={search}
            onChange={e => setSearch(e.target.value)}
           />
        </div>
        <button 
          onClick={() => setIsEditing({ 
            title: '', 
            description: '', 
            category_id: 'others', 
            image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', 
            specification: '',
            is_best_seller: false,
            id_num: 'PR-' + (products.length + 101),
            views_count: 0
          })}
          className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-600 transition-all shadow-xl"
        >
          <Plus className="w-5 h-5" /> Create New
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {filtered.map(p => (
           <div key={p.id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm group">
              <div className="h-48 bg-slate-100 relative">
                 <img src={p.image_url} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                    <button onClick={() => setIsEditing(p)} className="h-12 w-12 rounded-xl bg-white text-slate-900 flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
                       <Edit3 className="w-5 h-5" />
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="h-12 w-12 rounded-xl bg-red-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all">
                       <Trash2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>
              <div className="p-8">
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-widest">{p.category_id}</span>
                    <span className="text-[10px] font-bold text-slate-300">{p.id_num}</span>
                 </div>
                 <h4 className="font-black text-slate-900 text-lg mb-2 truncate">{p.title}</h4>
                 <p className="text-xs text-slate-400 font-medium line-clamp-2">{p.description}</p>
                 <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-300">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {p.views_count} queries</span>
                    {p.is_best_seller && <span className="text-orange-400 uppercase tracking-widest flex items-center gap-1"><Star className="w-3 h-3 fill-orange-400" /> Featured</span>}
                 </div>
              </div>
           </div>
        ))}
      </div>

      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[3rem] w-full max-w-3xl p-12 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{isEditing.id ? 'Modify Product' : 'Registry Product'}</h3>
                 <button onClick={() => setIsEditing(null)} className="p-3 rounded-full hover:bg-slate-100"><X /></button>
              </div>

              <div className="grid grid-cols-2 gap-8">
                 <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Title / Model Name</label>
                    <input className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-600 font-bold" value={isEditing.title} onChange={e => setIsEditing({...isEditing, title: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category (Ref Slug)</label>
                    <select 
                      className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-600 font-bold" 
                      value={isEditing.category_id} 
                      onChange={e => setIsEditing({...isEditing, category_id: e.target.value})}
                    >
                       {Object.keys(translations.en.categories.items).map(k => (
                         <option key={k} value={k}>{translations.en.categories.items[k]}</option>
                       ))}
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">ID Number (Internal)</label>
                    <input className="w-full p-4 rounded-xl border border-slate-200" value={isEditing.id_num} onChange={e => setIsEditing({...isEditing, id_num: e.target.value})} />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Image Resource URL</label>
                    <input className="w-full p-4 rounded-xl border border-slate-200" value={isEditing.image_url} onChange={e => setIsEditing({...isEditing, image_url: e.target.value})} />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Short Brief</label>
                    <textarea rows={3} className="w-full p-4 rounded-xl border border-slate-200 font-medium" value={isEditing.description} onChange={e => setIsEditing({...isEditing, description: e.target.value})} />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Detailed Specification (Paragraphs)</label>
                    <textarea rows={6} className="w-full p-4 rounded-xl border border-slate-200 font-medium text-sm leading-relaxed" value={isEditing.specification} onChange={e => setIsEditing({...isEditing, specification: e.target.value})} placeholder="Write detailed specification text here. Use new lines for paragraphs." />
                 </div>
                 <div className="flex items-center gap-4">
                    <input type="checkbox" className="w-5 h-5 rounded-md accent-blue-600" id="is_best" checked={isEditing.is_best_seller} onChange={e => setIsEditing({...isEditing, is_best_seller: e.target.checked})} />
                    <label htmlFor="is_best" className="text-sm font-bold text-slate-900 uppercase tracking-widest">Mark as Featured / Best Seller</label>
                 </div>
              </div>

              <div className="flex gap-4 mt-12 pt-8 border-t border-slate-100">
                 <button onClick={() => saveProduct(isEditing)} className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl">
                    <Save className="w-5 h-5" /> Persist Changes
                 </button>
                 <button onClick={() => setIsEditing(null)} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-bold">Discard</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MessageManager({ messages, refresh }: { messages: any[], refresh: () => void }) {
  const [selected, setSelected] = useState<any>(null);

  const markRead = async (id: string) => {
    await supabase.from('contacts').update({ is_read: true }).eq('id', id);
    refresh();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('contacts').delete().eq('id', id);
    setSelected(null);
    refresh();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
         {messages.length === 0 ? (
           <div className="p-12 text-center text-slate-300 font-bold uppercase tracking-widest text-xs border-2 border-dashed border-slate-100 rounded-3xl">No messages</div>
         ) : messages.map(m => (
           <div 
            key={m.id} 
            onClick={() => { setSelected(m); if(!m.is_read) markRead(m.id); }}
            className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all group ${selected?.id === m.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-white border-slate-100 hover:border-blue-400 shadow-sm'}`}
           >
              <div className="flex justify-between items-start mb-4">
                 <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-[0.2em] ${selected?.id === m.id ? 'bg-white/20 text-white' : (m.is_read ? 'bg-slate-100 text-slate-400' : 'bg-green-100 text-green-600')}`}>
                    {m.is_read ? 'Archived' : 'New'}
                 </span>
                 <span className={`text-[10px] font-bold ${selected?.id === m.id ? 'text-white/60' : 'text-slate-300'}`}>{new Date(m.created_at).toLocaleDateString()}</span>
              </div>
              <p className={`font-black text-lg tracking-tight mb-1 ${selected?.id === m.id ? 'text-white' : 'text-slate-900'}`}>{m.first_name} {m.last_name}</p>
              <p className={`text-xs font-bold uppercase tracking-widest ${selected?.id === m.id ? 'text-white/80' : 'text-blue-500'}`}>{m.project_type}</p>
           </div>
         ))}
      </div>

      <div className="lg:col-span-2">
        {selected ? (
          <div className="bg-white rounded-[3rem] border border-slate-200 p-12 lg:p-16 shadow-2xl relative">
             <button 
               onClick={() => deleteMessage(selected.id)}
               className="absolute top-8 right-8 p-3 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all"
             >
                <Trash2 className="w-5 h-5" />
             </button>
             <div className="flex justify-between items-start mb-12 pb-12 border-b border-slate-100 pr-12">
               <div>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">{selected.first_name} {selected.last_name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    <p className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">{selected.project_type}</p>
                  </div>
               </div>
               <div className="flex flex-col items-end text-right">
                  <div className="flex items-center gap-2 text-slate-900 font-bold mb-1">
                    <MailIcon className="w-4 h-4 text-slate-400" /> {selected.email}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-medium">
                    <Smartphone className="w-4 h-4" /> {selected.phone}
                  </div>
               </div>
             </div>

             <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-slate-300" />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiry details</p>
                </div>
                <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 text-slate-700 leading-relaxed font-medium text-lg whitespace-pre-wrap italic shadow-inner">
                   "{selected.details}"
                </div>

                <div className="grid grid-cols-2 gap-6 pt-10">
                   <a 
                    href={`mailto:${selected.email}`}
                    className="flex items-center justify-center gap-3 py-6 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl"
                   >
                     <MailIcon className="w-5 h-5" /> Reply by Email
                   </a>
                   <a 
                    href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 py-6 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-xl"
                   >
                     <WhatsAppIcon className="w-5 h-5" /> Reply by WhatsApp
                   </a>
                </div>
             </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 border-4 border-dashed border-slate-100 rounded-[3rem] p-32">
             <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                <MailIcon className="w-10 h-10 opacity-20" />
             </div>
             <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-40">Direct inquiry context will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminLogin() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'Admin' && pass === 'AdminPresitama') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setErr('Invalid credentials established. Please verify identity.');
    }
  };

  return (
    <div className="h-screen bg-slate-950 flex shadow-inner relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col justify-center p-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
        >
           <div className="flex flex-col items-center mb-16">
              <div className="h-20 w-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white mb-8 shadow-2xl shadow-blue-500/40">
                 <Shield className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Gatekeeper</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Restricted Administrative Access</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-8">
              <div>
                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">Identity</label>
                 <input 
                  type="text" 
                  placeholder="Username"
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700" 
                  value={user}
                  onChange={e => setUser(e.target.value)}
                 />
              </div>
              <div>
                 <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-2">Secure Key</label>
                 <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-4 focus:ring-blue-100 transition-all font-bold text-slate-700" 
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                 />
              </div>
              {err && <p className="text-red-500 text-xs font-black text-center uppercase tracking-widest">{err}</p>}
              <button className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group shadow-2xl">
                 Initialize Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
           </form>
        </motion.div>
      </div>
    </div>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
}

export default function App() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const toggleLang = () => setLang(prev => prev === 'id' ? 'en' : 'id');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage lang={lang} toggleLang={toggleLang} />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

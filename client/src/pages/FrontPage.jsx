import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Building2, ShoppingBag, ShieldCheck, ArrowRight, 
  Sparkles, CheckCircle2, Star, Shield, Award, 
  Clock, Truck, Users, Layers, Globe, Sun, Moon,
  HeartHandshake, Compass, ArrowUpRight, Check, Send
} from 'lucide-react';
import PhotoCards3D from '../components/PhotoCards3D';
import NatureBackground from '../components/NatureBackground';
import { soundFX } from '../utils/audioFX';

export default function FrontPage({ lang = 'hi', setLang, theme = 'dark', toggleTheme }) {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleTryMiligrams = () => {
    soundFX.click();
    navigate('/login');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    soundFX.success();
    setNewsletterSent(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSent(false);
    }, 3500);
  };

  // Produce Shelf items matching Figma product row
  const produceItems = [
    {
      id: 1,
      nameHi: 'शरबती गेहूं (Sharbati Wheat)',
      nameEn: 'Sharbati Wheat',
      price: '₹28 / kg',
      grade: 'Grade A',
      farmer: 'Gurpreet Singh',
      image: '/farmer-sunset-field.jpg'
    },
    {
      id: 2,
      nameHi: 'देसी बाजरा (Pearl Millet)',
      nameEn: 'Organic Pearl Millet',
      price: '₹24 / kg',
      grade: 'Grade A+',
      farmer: 'Balwant Yadav',
      image: '/farm-aerial-harvest.jpg'
    },
    {
      id: 3,
      nameHi: 'शाही बासमती (Basmati Rice)',
      nameEn: 'Royal Basmati 1121',
      price: '₹68 / kg',
      grade: 'Export Grade',
      farmer: 'Harinder Mann',
      image: '/nature-farm-banner.jpg'
    },
    {
      id: 4,
      nameHi: 'पीली सरसों (Mustard Seeds)',
      nameEn: 'Yellow Mustard Seeds',
      price: '₹52 / kg',
      grade: 'Grade A',
      farmer: 'Rajesh Meena',
      image: '/farmer-thumbs-up-sold.jpg'
    }
  ];

  const supplyChainNodes = [
    {
      id: 'farm',
      icon: Sprout,
      titleHi: 'खेत (Farm Source)',
      titleEn: 'Farm Source',
      subHi: 'आवाज AI फसल पंजीकरण व डिजिटल पर्ची',
      subEn: 'Voice AI harvest logging & Kisan receipt',
      color: '#10b981'
    },
    {
      id: 'transport',
      icon: Truck,
      titleHi: 'परिवहन (Cold-Chain Transit)',
      titleEn: 'Cold-Chain Transit',
      subHi: 'जीपीएस व तापमान निगरानी पारगमन',
      subEn: 'GPS tracked farm-to-silo transit dispatch',
      color: '#38bdf8'
    },
    {
      id: 'storage',
      icon: Building2,
      titleHi: 'भंडारण (Smart Silo)',
      titleEn: 'Smart Silo Storage',
      subHi: '20,000 क्विंटल क्षमता व <12% नमी सेंसर',
      subEn: '20k quintal silos & digital moisture audit',
      color: '#f59e0b'
    },
    {
      id: 'market',
      icon: ShoppingBag,
      titleHi: 'मंडी (Fair-Trade Market)',
      titleEn: 'Fair-Trade Market',
      subHi: '15-दिन एजिंग छूट व सीधी थोक खरीद',
      subEn: '15-day aging discounts & fair procurement',
      color: '#06b6d4'
    },
    {
      id: 'consumer',
      icon: Users,
      titleHi: 'उपभोक्ता (Consumer Trust)',
      titleEn: 'Consumer Trust',
      subHi: 'क्यूआर कोड से किसान की प्रामाणिकता जांच',
      subEn: 'Farm-to-fork origin and purity trace',
      color: '#a855f7'
    },
    {
      id: 'traceable',
      icon: ShieldCheck,
      titleHi: 'सत्यापित (Safe & Sustainable)',
      titleEn: 'Safe & Sustainable',
      subHi: 'क्रिप्टोग्राफिक SHA-256 ब्लॉकचेन मुहर',
      subEn: 'Zero-waste mathematical trust ledger',
      color: '#22c55e'
    }
  ];

  const portalCards = [
    {
      role: 'farmer',
      icon: Sprout,
      color: '#10b981',
      badgeHi: 'सुगम आवाज AI',
      badgeEn: 'VOICE AI ACCESS',
      titleHi: 'किसान पोर्टल (Farmer)',
      titleEn: 'Farmer Voice Portal',
      descHi: 'कम पढ़े-लिखे किसानों के लिए आवाज से फसल दर्ज करने की सुविधा, कानूनी किसान पर्ची, और एग्रीस्टैक KYC सत्यापन।',
      descEn: 'Voice-driven crop logging for low-literacy farmers, digital Kisan receipts, and official AgriStack verification.',
      path: '/farmer'
    },
    {
      role: 'warehouse',
      icon: Building2,
      color: '#f59e0b',
      badgeHi: 'स्मार्ट भंडारण',
      badgeEn: 'SILO LOGISTICS',
      titleHi: 'गोदाम / साइलो हब (Warehouse)',
      titleEn: 'Smart Silo Warehouse',
      descHi: '20,000 क्विंटल क्षमता, स्वचालित नमी सेंसर (<12%), और वैज्ञानिक कोल्ड/ड्राई स्टोरेज से शून्य बर्बादी।',
      descEn: 'Manage 20,000 quintal silos with digital moisture sensors (<12%) and segregated climate-controlled storage.',
      path: '/warehouse'
    },
    {
      role: 'buyer',
      icon: ShoppingBag,
      color: '#06b6d4',
      badgeHi: 'थोक मंडी',
      badgeEn: 'FAIR-TRADE MARKET',
      titleHi: 'व्यापारी मंडी (Buyer)',
      titleEn: 'Commodity Buyer Market',
      descHi: 'बिचौलिया-मुक्त 100% सत्यापित लॉट, 15-दिन शेल्फ-लाइफ मूल्य छूट, और पारदर्शी किसान समीक्षा प्रणाली।',
      descEn: 'Direct procurement from verified growers, 15-day progressive aging discounts, and community farmer ratings.',
      path: '/buyer'
    },
    {
      role: 'admin',
      icon: ShieldCheck,
      color: '#8b5cf6',
      badgeHi: 'लेजर प्रशासन',
      badgeEn: 'LEDGER GOVERNANCE',
      titleHi: 'सिस्टम एडमिन (Admin & Ledger)',
      titleEn: 'Cryptographic Admin Ledger',
      descHi: 'जेनेसिस ब्लॉक से जुड़ी SHA-256 श्रृंखला, किसान KYC अनुमोदन, 15-दिन सिमुलेटर, और छेड़छाड़ पहचान परीक्षण।',
      descEn: 'Immutable SHA-256 ledger explorer, farmer KYC verification desk, 15-day aging simulation, and zero-trust audit.',
      path: '/admin'
    }
  ];

  const testimonials = [
    {
      id: 1,
      nameHi: 'सरदार गुरप्रीत सिंह',
      nameEn: 'Sardar Gurpreet Singh',
      roleHi: 'शरबती गेहूं व धान किसान, समराला (पंजाब)',
      roleEn: 'Wheat & Paddy Farmer, Ludhiana (Punjab)',
      quoteHi: 'मुझे पढ़ना-लिखना नहीं आता था, लेकिन मिलीग्राम्स में बस माइक दबाकर "500 किलो गेहूं" बोला और तुरंत पक्की पर्ची बन गई! मंडी में आढ़तियों की मनमानी और कम तौल से हमेशा के लिए आजादी मिल गई।',
      quoteEn: 'I cannot read or write, but with MiliGrams I just tapped the mic and said "500 kg Wheat", and my official receipt was ready! No more cheating by local middlemen or arbitrary price deductions.',
      rating: 5,
      avatarBg: '#10b981',
      badgeHi: 'एग्रीस्टैक सत्यापित किसान',
      badgeEn: 'AgriStack Verified Farmer'
    },
    {
      id: 2,
      nameHi: 'विपिन सचदेवा',
      nameEn: 'Vipin Sachdeva',
      roleHi: 'हब प्रबंधक, सेंट्रल साइलो करनाल (हरियाणा)',
      roleEn: 'Hub Operations Manager, Karnal Silos (Haryana)',
      quoteHi: '20,000 क्विंटल अनाज के भंडारण में नमी और 15-दिन की शेल्फ लाइफ ट्रैक करना पहले सिरदर्द था। अब ऑटोमेटेड मॉइश्चर सेंसर और लेजर से एक दाना भी खराब नहीं होता और समय पर मंडी डिस्पैच हो जाता है।',
      quoteEn: 'Managing moisture levels and 15-day shelf life across 20,000 quintals used to be a logistics nightmare. Now our automated sensor ledger ensures zero grain rot and optimized warehouse turnaround.',
      rating: 5,
      avatarBg: '#f59e0b',
      badgeHi: 'साइलो लॉजिस्टिक्स हेड',
      badgeEn: 'Silo Logistics Head'
    },
    {
      id: 3,
      nameHi: 'अमित सिंघानिया',
      nameEn: 'Amit Singhania',
      roleHi: 'थोक अनाज निर्यातक, दिल्ली ग्रेन्स प्राइवेट लिमिटेड',
      roleEn: 'Managing Director, Delhi Grains Export Ltd.',
      quoteHi: 'एग्रीस्टैक-सत्यापित किसानों से सीधे 15-दिन डिस्काउंट में प्रीमियम बासमती और शरबती गेहूं खरीदना मेरे व्यापार का सबसे भरोसेमंद फैसला रहा। हर लॉट का ब्लॉकचेन इतिहास मुझे और मेरे ग्राहकों को संतुष्ट रखता है।',
      quoteEn: 'Procuring verified basmati and wheat with 15-day fair-trade discounts directly from growers transformed our export margins. The cryptographic origin hash gives our global buyers complete confidence.',
      rating: 5,
      avatarBg: '#06b6d4',
      badgeHi: 'थोक कमोडिटी खरीदार',
      badgeEn: 'Verified Commodity Buyer'
    },
    {
      id: 4,
      nameHi: 'डॉ. मीनाक्षी अय्यर',
      nameEn: 'Dr. Meenakshi Iyer',
      roleHi: 'कृषि अर्थशास्त्री व लेजर ऑडिटर, राज्य कृषि निदेशालय',
      roleEn: 'Agricultural Economist & Ledger Auditor, State Agri Dept.',
      quoteHi: 'मिलीग्राम्स का गणितीय SHA-256 लेजर और 15-दिन एजिंग चक्र भारत के कृषि सुधारों का भविष्य है। बिचौलियों का अनुचित कमीशन खत्म होकर पूरा पैसा सीधे किसान की जेब में पहुंच रहा है।',
      quoteEn: 'The mathematical transparency of MiliGrams’ SHA-256 ledger combined with 15-day aging cycles sets a gold standard for agricultural governance. Direct farmer empowerment in its purest form.',
      rating: 5,
      avatarBg: '#8b5cf6',
      badgeHi: 'राज्य कृषि ऑडिटर',
      badgeEn: 'State Agricultural Auditor'
    }
  ];

  return (
    <div className="front-page-container">
      {/* Ambient background aura */}
      <NatureBackground />

      {/* 1. FIGMA TOP SUB-NAVBAR */}
      <nav className="figma-top-bar">
        <div className="figma-top-links">
          <a href="#produce" className="figma-top-link">
            {lang === 'hi' ? 'ताज़ा उपज (Shop)' : 'Shop Mandi'}
          </a>
          <button 
            onClick={() => { soundFX.click(); navigate('/vision'); }}
            className="figma-top-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: 'var(--primary)' }}
          >
            <span>🔬 {lang === 'hi' ? 'एआई विज़न स्कैनर' : 'AI Vision Lab'}</span>
          </button>
          <a href="#editorial" className="figma-top-link">
            {lang === 'hi' ? 'लेजर समाचार (Newsstand)' : 'Newsstand'}
          </a>
          <a href="#ecosystem" className="figma-top-link">
            {lang === 'hi' ? 'आपूर्ति श्रृंखला' : 'Who we are'}
          </a>
          <a href="#portals" className="figma-top-link">
            {lang === 'hi' ? 'कार्यक्षेत्र (4 Portals)' : '4 Portals'}
          </a>
        </div>

        <div className="figma-top-actions">
          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
            title="Switch Language"
          >
            <Globe size={13} />
            <span>{lang === 'hi' ? 'English' : 'हिन्दी'}</span>
          </button>

          {/* Theme Toggle */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="btn btn-secondary btn-sm"
              title="Toggle Theme"
              style={{ padding: '0.35rem 0.65rem' }}
            >
              {theme === 'dark' ? <Sun size={14} color="#fbbf24" /> : <Moon size={14} color="#183b28" />}
            </button>
          )}

          {/* Connect / Enter CTA */}
          <button
            onClick={handleTryMiligrams}
            className="figma-btn-forest"
            style={{ padding: '0.45rem 1.15rem', fontSize: '0.82rem' }}
          >
            <span>{lang === 'hi' ? 'लॉगिन करें' : 'Open Portal'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* 2. FIGMA MASSIVE EDITORIAL MASTHEAD */}
      <header className="figma-masthead-section">
        <h1 className="figma-masthead-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>MiliGrams</span>
          <span className="figma-registered-mark">®</span>
        </h1>
        <p className="figma-mission-statement">
          {lang === 'hi'
            ? 'पारदर्शिता व किसान-सम्मान मिलीग्राम्स की आत्मा है — हम केवल सत्यापित किसानों और वैज्ञानिक साइलो से सीधे व्यापारियों को बिना बिचौलियों के जोड़ते हैं।'
            : 'Sustainability is at the heart of what MiliGrams stands for — connecting verified growers directly with institutional buyers on an immutable sovereign ledger.'}
        </p>
      </header>

      {/* 3. FIGMA CENTERPIECE FLOATING HERO WINDOW (Node 2012-278) */}
      <section className="figma-hero-window-wrapper">
        <div className="figma-hero-window">
          {/* Left Hero Content */}
          <div className="figma-hero-content">
            <div className="figma-hero-tag">
              <Sparkles size={13} />
              <span>{lang === 'hi' ? 'एग्रीस्टैक व ब्लॉकचेन सत्यापित' : 'AgriStack & Blockchain Verified'}</span>
            </div>

            <h2 className="figma-hero-title">
              {lang === 'hi' ? (
                <>खेत से मंडी तक, <br />हर ग्राम का सच्चा हिसाब।</>
              ) : (
                <>From farm to buyer, <br />every gram accountable.</>
              )}
            </h2>

            <p className="figma-hero-sub">
              {lang === 'hi'
                ? 'बीज से लेकर थोक मंडी तक प्रत्येक लेनदेन SHA-256 ब्लॉकचेन पर दर्ज। शून्य बिचौलिया कटौती, 15-दिन फसल शेल्फ लाइफ सुरक्षा, और 20,000 क्विंटल आधुनिक साइलो।'
                : 'All crops are cryptographically traced from farmer to certified warehouse, and directly to wholesale buyers. Zero middleman cuts, 15-day price security, every grain accounted for.'}
            </p>

            <div className="figma-hero-actions">
              <button onClick={handleTryMiligrams} className="figma-btn-forest">
                <Sprout size={18} />
                <span>{lang === 'hi' ? 'मिलीग्राम्स आज़माएँ (Try MiliGrams)' : 'Try MiliGrams Now'}</span>
                <ArrowRight size={17} />
              </button>

              <button onClick={() => navigate('/overview')} className="figma-btn-outline">
                <Compass size={17} />
                <span>{lang === 'hi' ? '3D क्वेस्ट देखें' : 'Launch 3D Quest'}</span>
              </button>
            </div>

            {/* Stat Counters */}
            <div className="figma-hero-stats">
              <div className="figma-stat-item">
                <span className="figma-stat-num">12,400+</span>
                <span className="figma-stat-label">{lang === 'hi' ? 'सत्यापित किसान' : 'Verified Farmers'}</span>
              </div>
              <div className="figma-stat-item">
                <span className="figma-stat-num">99.8%</span>
                <span className="figma-stat-label">{lang === 'hi' ? 'वितरण विश्वसनीयता' : 'Delivery Reliability'}</span>
              </div>
              <div className="figma-stat-item">
                <span className="figma-stat-num">15 Days</span>
                <span className="figma-stat-label">{lang === 'hi' ? 'एजिंग सुरक्षा चक्र' : 'Aging Price Cycle'}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card with Floating Ledger Badge */}
          <div className="figma-hero-media">
            <img 
              src="/farmer-sunset-field.jpg" 
              alt="Verdant Agricultural Farmland" 
              className="figma-hero-img" 
            />
            
            {/* Dark Translucent Floating Ledger Badge */}
            <div className="figma-hero-media-badge">
              <div className="figma-badge-title">
                <CheckCircle2 size={15} color="#34d399" />
                <span>{lang === 'hi' ? 'लॉट #1042 — 100% क्रिप्टोग्राफिक अखंडता' : 'Wheat Lot #1042 — 100% Verified'}</span>
              </div>
              <div className="figma-badge-sub">
                {lang === 'hi' ? '15-दिन री-वेरिफिकेशन सक्रिय • ग्रेड A प्रमाणित • किसान: राम सिंह' : '15-Day Aging Protection Active • Grade A Certified • Farmer: Ram Singh'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FIGMA FRESH PRODUCE SHELF (Horizontal Cards with Price) */}
      <section id="produce" className="figma-produce-section">
        <div className="figma-produce-header">
          <h3 className="figma-produce-title">
            {lang === 'hi' ? 'मंडी में उपलब्ध ताज़ा प्रमाणित उपज' : 'Fresh Certified Crops in Marketplace'}
          </h3>
          <button 
            onClick={() => { soundFX.click(); navigate('/buyer'); }}
            className="btn-link" 
            style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
          >
            <span>{lang === 'hi' ? 'पूरी मंडी देखें (Buyer Market)' : 'Open Buyer Mandi'}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="figma-produce-grid">
          {produceItems.map((item) => (
            <div 
              key={item.id} 
              className="figma-produce-card"
              onClick={() => { soundFX.click(); navigate(`/buyer?crop=${encodeURIComponent(item.nameEn)}`); }}
              title={lang === 'hi' ? `${item.nameHi} - मंडी में खरीदने के लिए क्लिक करें` : `Click to view ${item.nameEn} in Buyer Marketplace`}
            >
              <div className="figma-produce-img-wrap">
                <img src={item.image} alt={item.nameEn} className="figma-produce-img" />
                <span 
                  className="badge" 
                  style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', background: 'rgba(24, 59, 40, 0.85)', color: '#ffffff', fontSize: '0.68rem', backdropFilter: 'blur(8px)' }}
                >
                  {item.grade}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.click();
                    navigate('/vision');
                  }}
                  className="badge"
                  style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', background: 'rgba(16, 185, 129, 0.9)', color: '#ffffff', fontSize: '0.68rem', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  title="Scan with AI Computer Vision"
                >
                  <span>🔬 {lang === 'hi' ? 'विज़न जांच' : 'AI Scan'}</span>
                </button>
              </div>
              
              <div className="figma-produce-footer">
                <div>
                  <div className="figma-produce-name">{lang === 'hi' ? item.nameHi : item.nameEn}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>📍 {item.farmer}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="figma-produce-price">{item.price}</div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700 }}>
                    {lang === 'hi' ? 'मंडी देखें →' : 'Trade →'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4.5 NEW FIGMA SHOWCASE: AI COMPUTER VISION QUALITY LAB */}
      <section id="vision-lab" className="figma-produce-section" style={{ paddingTop: '1rem', paddingBottom: '2.5rem' }}>
        <div className="glass-panel" style={{ borderRadius: '24px', padding: '2.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, var(--surface-card) 100%)', border: '1px solid var(--border-accent)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#10b981', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.85rem' }}>
                <Sparkles size={14} />
                <span>AI COMPUTER VISION & GRAIN QUALITY ENGINE</span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 500, color: 'var(--text-main)', margin: '0 0 0.85rem', lineHeight: 1.25 }}>
                {lang === 'hi'
                  ? 'अनाज के हर दाने की एआई कंप्यूटर विज़न से 100% सटीक जांच'
                  : 'Sub-millimeter AI Computer Vision Grain Inspection'}
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                {lang === 'hi'
                  ? 'अनाज के दानों की एकरूपता, नमी (<12%) और सूक्ष्म अशुद्धियों की रीयल-टाइम न्यूरल स्कैनिंग। बिना किसी लैब देरी के किसान और व्यापारी दोनों को तुरंत ब्लॉकचेन-प्रमाणित ग्रेड A+ प्रमाणपत्र।'
                  : 'Instantly detect grain purity, moisture thresholds, and foreign chaff with our real-time neural vision scanner. Mint cryptographic quality certificates straight onto the blockchain ledger.'}
              </p>

              {/* Feature Points */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>{lang === 'hi' ? '98.8% शुद्धता व एकरूपता' : '98.8% Purity & Uniformity'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>{lang === 'hi' ? '<12% नमी साइलो सुरक्षा' : '<12% Moisture Silo Guard'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>{lang === 'hi' ? 'रीयल-टाइम बाउंडिंग बॉक्सेज' : 'Real-time Grain Bounding Boxes'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>{lang === 'hi' ? 'SHA-256 ब्लॉकचेन मुहर' : 'SHA-256 Quality Seal'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => { soundFX.click(); navigate('/vision'); }}
                  className="figma-btn-forest"
                  style={{ padding: '0.75rem 1.6rem', fontSize: '0.92rem' }}
                >
                  <span>🔬 {lang === 'hi' ? 'एआई विज़न स्कैनर खोलें' : 'Open AI Vision Scanner'}</span>
                  <ArrowRight size={17} />
                </button>

                <button
                  onClick={() => { soundFX.click(); navigate('/farmer'); }}
                  className="figma-btn-outline"
                  style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem' }}
                >
                  <Sprout size={17} />
                  <span>{lang === 'hi' ? 'किसान पोर्टल में जांचें' : 'Scan in Farmer Portal'}</span>
                </button>
              </div>
            </div>

            {/* Right Live Visual Simulation Card */}
            <div 
              style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', border: '2px solid rgba(16, 185, 129, 0.4)', background: '#09130d', height: '340px', cursor: 'pointer', boxShadow: '0 12px 36px rgba(0,0,0,0.35)' }}
              onClick={() => { soundFX.click(); navigate('/vision'); }}
              title="Click to launch full AI Computer Vision Scanner"
            >
              <img 
                src="/farmer-sunset-field.jpg" 
                alt="AI Vision Grain Scan" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />

              {/* Animated Laser Beam */}
              <div className="cv-laser-sweep">
                <div className="cv-laser-beam" />
                <div className="cv-laser-glow" />
              </div>

              {/* Demo Bounding Boxes */}
              <div style={{ position: 'absolute', top: '25%', left: '28%', width: '18%', height: '22%', border: '2px solid #10b981', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '4px' }}>
                <span style={{ position: 'absolute', top: '-18px', left: 0, background: 'rgba(0,0,0,0.85)', color: '#34d399', fontSize: '0.62rem', fontWeight: 800, padding: '0.1rem 0.35rem', borderRadius: '3px', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                  Clean Grain: 99.4%
                </span>
              </div>

              <div style={{ position: 'absolute', top: '55%', left: '55%', width: '16%', height: '20%', border: '2px solid #f59e0b', background: 'rgba(245, 158, 11, 0.18)', borderRadius: '4px' }}>
                <span style={{ position: 'absolute', top: '-18px', left: 0, background: 'rgba(0,0,0,0.85)', color: '#fbbf24', fontSize: '0.62rem', fontWeight: 800, padding: '0.1rem 0.35rem', borderRadius: '3px', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                  Husk: 0.4%
                </span>
              </div>

              {/* Floating Verified Quality Badge */}
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'rgba(15, 23, 19, 0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ShieldCheck size={14} color="#10b981" />
                    <span>MiliGrams Neural Vision Active</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a39b' }}>
                    Grade A+ Certified • SHA-256 Ledger Verified
                  </div>
                </div>
                <span className="badge" style={{ background: '#10b981', color: '#ffffff', fontWeight: 800, fontSize: '0.72rem' }}>
                  98.8% Pure
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FIGMA 3 SIGNATURE EDITORIAL COLOR CARDS (Lilac, Lime, Peach) */}
      <section id="editorial" className="figma-editorial-section">
        <div className="figma-editorial-container">
          {/* Card 1: Wide Lilac Card */}
          <div className="editorial-card-lilac">
            <div>
              <div className="editorial-date">
                {lang === 'hi' ? 'पारदर्शी मूल्य निर्धारण • 24 सितंबर 2026' : 'EDITORIAL DEEP DIVE • SEP 24, 2026'}
              </div>
              <h3 className="editorial-title-large">
                {lang === 'hi'
                  ? '"राहत की सांस" — बिचौलियों के बिना किसान का सच्चा हक'
                  : '"Sigh of re-leaf" — a deeper dive into fair farmer pricing.'}
              </h3>
            </div>
            <div>
              <p className="editorial-excerpt">
                {lang === 'hi'
                  ? 'स्थानीय मंडियों में आढ़तियों की 8-12% मनमानी कमीशन और कम तौल को खत्म करके मिलीग्राम्स ने किसानों को सीधे संस्थागत खरीदारों से जोड़ा है। हर खरीद का भुगतान सीधे किसान के बैंक खाते में और हर बोरी का डिजिटल प्रमाण पत्र लेजर पर हमेशा के लिए दर्ज रहता है।'
                  : 'By completely eliminating the arbitrary 8-12% broker commissions and unauthorized weight cuts in conventional mandis, MiliGrams bridges grassroots growers directly to institutional buyers. Payments settle instantly to bank accounts with immutable provenance receipts.'}
              </p>
            </div>
          </div>

          {/* Row of 2 Cards: Lime & Peach */}
          <div className="editorial-row-split">
            {/* Card 2: Lime Yellow-Green */}
            <div className="editorial-card-lime">
              <div>
                <div className="editorial-date">
                  {lang === 'hi' ? 'स्मार्ट साइलो तकनीक' : 'SMART SILO TECH'}
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 500, margin: '0.6rem 0 0.8rem', lineHeight: 1.2 }}>
                  {lang === 'hi' ? 'शून्य सड़ांध साइलो — 20,000 क्विंटल वैज्ञानिक भंडारण' : 'Zero-Rot Silos — 20,000Q automated IoT audit'}
                </h4>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, opacity: 0.9 }}>
                  {lang === 'hi'
                    ? 'स्वचालित डिजिटल नमी सेंसर (<12%) और पृथक तापमान नियंत्रण से अनाज के सड़ांध को जड़ से खत्म किया गया है।'
                    : 'Real-time moisture sensors under 12% and climate segregation safeguard crops against rot and post-harvest wastage.'}
                </p>
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '1rem' }}>
                {lang === 'hi' ? 'गोदाम सुरक्षा ढांचा →' : 'Read Silo Blueprint →'}
              </div>
            </div>

            {/* Card 3: Warm Terracotta Peach */}
            <div className="editorial-card-peach">
              <div>
                <div className="editorial-date">
                  {lang === 'hi' ? '15-दिन एजिंग चक्र' : 'AGING ALGORITHM'}
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 500, margin: '0.6rem 0 0.8rem', lineHeight: 1.2 }}>
                  {lang === 'hi' ? '15-दिन मूल्य सुरक्षा — संकटकालीन बिक्री से बचाव' : '15-Day Aging Engine — fair-trade discounts'}
                </h4>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.6, opacity: 0.9 }}>
                  {lang === 'hi'
                    ? '15 दिन न बिकने पर स्वतः 20% मूल्य छूट और ब्लॉकचेन री-वेरिफिकेशन दर्ज होता है, जिससे उपज तुरंत बिक जाती है।'
                    : 'Smart contracts automatically apply transparent 20% discounts after 15 days, ensuring inventory turn without distressed sales.'}
                </p>
              </div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '1rem' }}>
                {lang === 'hi' ? 'एजिंग नियम देखें →' : 'Explore Aging Logic →'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE 3D PHOTO CARDS */}
      <section className="front-section" style={{ paddingTop: 0 }}>
        <div className="front-section-header">
          <span className="badge" style={{ background: 'rgba(24, 59, 40, 0.08)', color: 'var(--primary)', borderColor: 'rgba(24, 59, 40, 0.2)' }}>
            <Sparkles size={13} />
            <span>{lang === 'hi' ? 'वास्तविक जीवन परिप्रेक्ष्य' : 'FIELD PERSPECTIVES'}</span>
          </span>
          <h2 className="front-section-title">
            {lang === 'hi' ? 'भारतीय कृषि का नया डिजिटल सवेरा' : 'A New Digital Dawn for Indian Agriculture'}
          </h2>
        </div>
        <PhotoCards3D lang={lang} />
      </section>

      {/* 7. THE 4 DEDICATED PORTALS */}
      <section id="portals" className="front-section">
        <div className="front-section-header">
          <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#0284c7', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
            <Layers size={13} />
            <span>{lang === 'hi' ? 'समर्पित कार्यक्षेत्र' : '4 DEDICATED ROLES'}</span>
          </span>
          <h2 className="front-section-title">
            {lang === 'hi' ? 'हर हितधारक के लिए अलग पोर्टल' : 'Tailored Portals for Every Actor'}
          </h2>
          <p className="front-section-sub">
            {lang === 'hi'
              ? 'किसान, गोदाम प्रबंधक, थोक व्यापारी और सरकारी ऑडिटर — सभी के लिए सुगम और सुरक्षित इंटरफेस।'
              : 'Farmers, warehouse operators, grain traders, and state regulators each enjoy a purpose-built workspace.'}
          </p>
        </div>

        <div className="front-portals-grid">
          {portalCards.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.role} 
                className="front-portal-card glass-panel"
                style={{ borderTop: `4px solid ${p.color}`, cursor: 'pointer' }}
                onClick={() => {
                  soundFX.click();
                  navigate(p.path);
                }}
                title={lang === 'hi' ? `${p.titleHi} खोलें` : `Open ${p.titleEn}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div 
                    style={{ 
                      width: '46px', 
                      height: '46px', 
                      borderRadius: '12px', 
                      background: `${p.color}20`, 
                      color: p.color, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: `1px solid ${p.color}40`
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="badge" style={{ background: `${p.color}15`, color: p.color, borderColor: `${p.color}35` }}>
                    {lang === 'hi' ? p.badgeHi : p.badgeEn}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.22rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.45rem' }}>
                  {lang === 'hi' ? p.titleHi : p.titleEn}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                  {lang === 'hi' ? p.descHi : p.descEn}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 700 }}>
                    {lang === 'hi' ? 'लॉगिन कर देखें' : 'Sign in to access'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: p.color, fontWeight: 800, fontSize: '0.84rem' }}>
                    <span>{lang === 'hi' ? 'प्रवेश करें' : 'Open'}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. SUPPLY CHAIN NODES & BLUEPRINT */}
      <section id="ecosystem" className="front-section">
        <div className="front-section-header">
          <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <HeartHandshake size={13} />
            <span>{lang === 'hi' ? 'संपूर्ण आपूर्ति श्रृंखला' : 'INTEGRATED SUPPLY CHAIN'}</span>
          </span>
          <h2 className="front-section-title">
            {lang === 'hi' ? 'पारदर्शिता के 6 स्तंभ' : '6 Pillars of Farm-to-Fork Traceability'}
          </h2>
        </div>

        <div className="front-nodes-grid">
          {supplyChainNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div key={node.id} className="front-node-card glass-panel">
                <div 
                  className="front-node-icon-wrap"
                  style={{ background: `${node.color}18`, color: node.color, borderColor: `${node.color}35` }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="front-node-card-title">
                  {lang === 'hi' ? node.titleHi : node.titleEn}
                </h3>
                <p className="front-node-card-desc">
                  {lang === 'hi' ? node.subHi : node.subEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Blueprint Visual */}
        <div className="front-architecture-banner glass-panel" style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={20} color="#34d399" />
              <span style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'प्रणाली स्थापत्य व लेजर सुरक्षा ढांचा' : 'System Architecture & Cryptographic Trust Blueprint'}
              </span>
            </div>
            <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)', fontSize: '0.72rem' }}>
              SHA-256 Validated Node Network
            </span>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#0a0f1d' }}>
            <img 
              src="/miligrams-ui-architecture.jpg" 
              alt="MiliGrams UI Architecture Diagram" 
              style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      </section>

      {/* 9. COMMUNITY TESTIMONIALS */}
      <section id="testimonials" className="front-section">
        <div className="front-section-header">
          <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <Star size={13} />
            <span>{lang === 'hi' ? 'विश्वसनीयता व अनुभव' : 'USER REVIEWS & TESTIMONIALS'}</span>
          </span>
          <h2 className="front-section-title">
            {lang === 'hi' ? 'हमारे उपयोगकर्ताओं की जुबानी' : 'What Our Community Says'}
          </h2>
        </div>

        <div className="front-testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="front-testimonial-card glass-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.85rem' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" />
                ))}
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', marginLeft: '0.35rem' }}>
                  5.0 / 5.0
                </span>
              </div>

              <p className="front-testimonial-quote">
                "{lang === 'hi' ? t.quoteHi : t.quoteEn}"
              </p>

              <div className="front-testimonial-author">
                <div 
                  className="front-testimonial-avatar"
                  style={{ background: t.avatarBg }}
                >
                  {(lang === 'hi' ? t.nameHi : t.nameEn).charAt(0)}
                </div>
                <div>
                  <h4 className="front-testimonial-name">
                    {lang === 'hi' ? t.nameHi : t.nameEn}
                  </h4>
                  <p className="front-testimonial-role">
                    {lang === 'hi' ? t.roleHi : t.roleEn}
                  </p>
                  <span className="badge" style={{ fontSize: '0.66rem', padding: '0.15rem 0.45rem', marginTop: '0.25rem' }}>
                    <CheckCircle2 size={10} color="#34d399" />
                    <span>{lang === 'hi' ? t.badgeHi : t.badgeEn}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FIGMA NEWSLETTER SECTION */}
      <section className="figma-newsletter-section">
        <div className="figma-newsletter-box">
          <div>
            <h3 className="figma-newsletter-title">
              {lang === 'hi' ? 'ताज़ा बहीखाता समाचार पत्र' : 'Farm fresh Email Newsletter'}
            </h3>
            <p className="figma-newsletter-sub">
              {lang === 'hi'
                ? 'नवीनतम फसल आवक, दैनिक मंडी थोक भाव, और ब्लॉकचेन सत्यापन अपडेट सीधे अपने ईमेल पर प्राप्त करें।'
                : 'Get verified crop arrivals, daily wholesale mandi rates, and cryptographic governance updates straight to your inbox.'}
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="figma-newsletter-form">
            <div className="figma-email-input-wrap">
              <input 
                type="email" 
                placeholder={lang === 'hi' ? 'आपका ईमेल पता (your.email@domain.com)' : 'your.email@domain.com'}
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="figma-email-input" 
              />
              <button type="submit" className="figma-email-submit" title="Subscribe">
                {newsletterSent ? <Check size={20} color="#10b981" /> : <ArrowRight size={20} />}
              </button>
            </div>

            <div className="figma-checkbox-group">
              <label className="figma-checkbox-item">
                <input type="checkbox" defaultChecked />
                <span>{lang === 'hi' ? 'दैनिक भाव (Daily Prices)' : 'Daily Mandi Rates'}</span>
              </label>
              <label className="figma-checkbox-item">
                <input type="checkbox" defaultChecked />
                <span>{lang === 'hi' ? '15-दिन एजिंग छूट' : 'Aging Lot Alerts'}</span>
              </label>
              <label className="figma-checkbox-item">
                <input type="checkbox" />
                <span>{lang === 'hi' ? 'लेजर ऑडिट रिपोर्ट' : 'Ledger Audits'}</span>
              </label>
            </div>

            {newsletterSent && (
              <div style={{ color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 700 }}>
                ✓ {lang === 'hi' ? 'सफलतापूर्वक सदस्यता ली गई! धन्यवाद।' : 'Subscribed successfully! Welcome to MiliGrams.'}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* 11. GRAND BOTTOM CTA SECTION */}
      <section className="front-bottom-cta-section">
        <div className="front-bottom-cta-card glass-panel glass-panel-glow">
          <div className="front-cta-glow-circle" />
          
          <span className="badge" style={{ background: 'rgba(24, 59, 40, 0.12)', color: 'var(--primary)', borderColor: 'rgba(24, 59, 40, 0.25)', marginBottom: '1rem' }}>
            <Sparkles size={14} />
            <span>{lang === 'hi' ? 'कृषि में नई क्रांति' : 'ENTER SOVEREIGN AGRI-PLATFORM'}</span>
          </span>

          <h2 className="front-bottom-cta-title">
            {lang === 'hi' ? 'कृषि में नई क्रांति का हिस्सा बनें' : 'Ready to Experience Fair Agri-Trade?'}
          </h2>

          <p className="front-bottom-cta-sub">
            {lang === 'hi'
              ? 'अभी "Try MiliGrams" पर क्लिक करें, अपनी भूमिका चुनें और आधुनिक ब्लॉकचेन पोर्टल का लाइव प्रोटोटाइप आज़माएँ।'
              : 'Click below to enter the Role Gateway, pick your persona, and experience the full interactive prototype with guided tutorials.'}
          </p>

          <button
            onClick={handleTryMiligrams}
            className="figma-btn-forest figma-cta-pulse-btn"
            style={{ fontSize: '1.05rem', padding: '0.95rem 2.25rem' }}
          >
            <Sprout size={20} />
            <span style={{ fontSize: '1.05rem', fontWeight: 800 }}>
              {lang === 'hi' ? 'मिलीग्राम्स आज़माएँ (Try MiliGrams)' : 'Try MiliGrams Now'}
            </span>
            <ArrowRight size={20} />
          </button>

          <div className="front-cta-footer-tags">
            <span>✓ {lang === 'hi' ? 'आवाज से फसल पंजीकरण' : 'Voice AI Logging'}</span>
            <span>✓ {lang === 'hi' ? '20,000 क्विंटल साइलो' : 'Smart Silos'}</span>
            <span>✓ {lang === 'hi' ? '15-दिन मूल्य सुरक्षा' : '15-Day Aging Engine'}</span>
            <span>✓ {lang === 'hi' ? 'SHA-256 ब्लॉकचेन' : 'Cryptographic Ledger'}</span>
          </div>
        </div>
      </section>

      {/* 12. FIGMA EDITORIAL MINIMALIST FOOTER */}
      <footer className="figma-editorial-footer">
        <div className="figma-footer-content">
          <div>
            <h3 className="figma-footer-brand-title">MiliGrams®</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '360px', margin: '0 0 1rem' }}>
              {lang === 'hi' 
                ? 'भारतीय किसानों और व्यापारियों के लिए निष्पक्ष, सुरक्षित व पारदर्शी क्रिप्टोग्राफिक बहीखाता।' 
                : 'Sovereign agricultural provenance protocol empowering grassroots Indian growers with mathematical trust.'}
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
              AgriStack UID: AGRI-DL-2026-9042
            </div>
          </div>

          <div>
            <div className="figma-footer-col-title">{lang === 'hi' ? 'ताज़ा मंडी (Shop)' : 'Shop Mandi'}</div>
            <ul className="figma-footer-links">
              <li><span onClick={handleTryMiligrams} className="figma-footer-link">{lang === 'hi' ? 'शरबती गेहूं' : 'Sharbati Wheat'}</span></li>
              <li><span onClick={handleTryMiligrams} className="figma-footer-link">{lang === 'hi' ? 'शाही बासमती' : 'Royal Basmati'}</span></li>
              <li><span onClick={handleTryMiligrams} className="figma-footer-link">{lang === 'hi' ? 'देसी बाजरा' : 'Organic Millet'}</span></li>
              <li><span onClick={handleTryMiligrams} className="figma-footer-link">{lang === 'hi' ? 'पीली सरसों' : 'Yellow Mustard'}</span></li>
            </ul>
          </div>

          <div>
            <div className="figma-footer-col-title">{lang === 'hi' ? 'कार्यक्षेत्र (Portals)' : 'Workspaces'}</div>
            <ul className="figma-footer-links">
              <li><span onClick={() => navigate('/farmer')} className="figma-footer-link">{lang === 'hi' ? 'किसान पोर्टल' : 'Farmer Voice Hub'}</span></li>
              <li><span onClick={() => navigate('/warehouse')} className="figma-footer-link">{lang === 'hi' ? 'साइलो गोदाम' : 'Smart Silos'}</span></li>
              <li><span onClick={() => navigate('/buyer')} className="figma-footer-link">{lang === 'hi' ? 'थोक मंडी' : 'Buyer Market'}</span></li>
              <li><span onClick={() => navigate('/admin')} className="figma-footer-link">{lang === 'hi' ? 'एडमिन लेजर' : 'Admin Ledger'}</span></li>
            </ul>
          </div>

          <div>
            <div className="figma-footer-col-title">{lang === 'hi' ? 'संसाधन व सहायता' : 'Resources'}</div>
            <ul className="figma-footer-links">
              <li><span onClick={() => navigate('/overview')} className="figma-footer-link">{lang === 'hi' ? '3D इकोसिस्टम' : '3D Provenance Quest'}</span></li>
              <li><a href="#ecosystem" className="figma-footer-link">{lang === 'hi' ? 'आपूर्ति ढांचा' : 'System Blueprint'}</a></li>
              <li><span onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')} className="figma-footer-link">Language: {lang === 'hi' ? 'English' : 'हिन्दी'}</span></li>
              <li><span onClick={toggleTheme} className="figma-footer-link">Theme: {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span></li>
            </ul>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '2.5rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-light)' }}>
          <div>© 2026 MiliGrams Sovereign Agri-Blockchain. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Provenance</span>
            <span>AgriStack Governance</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

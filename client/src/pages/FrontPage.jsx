import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Building2, ShoppingBag, ShieldCheck, ArrowRight, 
  Sparkles, CheckCircle2, Star, Shield, Award, 
  Clock, Truck, Users, Layers, Globe, Sun, Moon,
  HeartHandshake, Compass, ArrowUpRight, Check, Send,
  Brain, Scale, Link2, MapPin, ChevronRight, BarChart3, Database
} from 'lucide-react';
import PhotoCards3D from '../components/PhotoCards3D';
import NatureBackground from '../components/NatureBackground';
import { soundFX } from '../utils/audioFX';

export default function FrontPage({ lang = 'hi', setLang = () => {}, theme = 'light', toggleTheme = () => {} }) {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleExploreMiligrams = () => {
    soundFX.click();
    navigate('/marketplace');
  };

  const handleDiscoverFarmistor = () => {
    soundFX.click();
    navigate('/farmistor');
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

  // Fresh Produce Shelf matching verified batches
  const produceItems = [
    {
      id: 1,
      nameHi: 'शरबती गेहूं (Sharbati Wheat C-306)',
      nameEn: 'Sharbati Golden Wheat',
      variety: 'Sharbati C-306 Bold',
      price: '₹28 / kg',
      grade: 'Grade A+ Certified',
      farmer: 'Ramesh Patel',
      location: 'Ludhiana, Punjab',
      image: '/farmer-sunset-field.jpg',
      declaredQty: '1,200 kg',
      verifiedQty: '1,200 kg (100% Match)'
    },
    {
      id: 2,
      nameHi: 'शाही बासमती (Royal Basmati 1121)',
      nameEn: 'Royal Basmati 1121 Rice',
      variety: 'Extra Long Slender',
      price: '₹68 / kg',
      grade: 'Export Grade A+',
      farmer: 'Ramesh Patel',
      location: 'Samrala, Punjab',
      image: '/nature-farm-banner.jpg',
      declaredQty: '800 kg',
      verifiedQty: '790 kg (-10 kg Dockage)'
    },
    {
      id: 3,
      nameHi: 'देसी बाजरा (Organic Pearl Millet)',
      nameEn: 'Organic Pearl Millet (Bajra)',
      variety: 'Hybrid Desi Bajra',
      price: '₹24 / kg',
      grade: 'Nutri-Grade A',
      farmer: 'Balwant Yadav',
      location: 'Bhatinda, Punjab',
      image: '/farm-aerial-harvest.jpg',
      declaredQty: '650 kg',
      verifiedQty: 'Awaiting Silo Intake'
    },
    {
      id: 4,
      nameHi: 'पीली सरसों (Yellow Mustard Seeds)',
      nameEn: 'Pusa Bold Yellow Mustard',
      variety: 'High Oil (42%)',
      price: '₹52 / kg',
      grade: 'Grade A',
      farmer: 'Sita Devi',
      location: 'Karnal, Haryana',
      image: '/farmer-thumbs-up-sold.jpg',
      declaredQty: '450 kg',
      verifiedQty: 'Awaiting Silo Intake'
    }
  ];

  // 3-Stage Visual Crop Journey
  const journeyStages = [
    {
      stage: '01',
      id: 'farm',
      role: 'FARM GATE',
      titleHi: '1. खेत से शुरुआत (Farm Gate Logging)',
      titleEn: '1. Farm Origin & Declaration',
      descHi: 'किसान का विशिष्ट Farmer ID पंजीकरण, आवाज या टच द्वारा फसल घोषणा (मात्रा, किस्म, कटाई तिथि) और ब्लॉकचेन पर प्रारंभिक किसान पर्ची का निर्माण।',
      descEn: 'Farmer registers with unique ID. Harvest quantity, variety, and harvest date are logged via voice or mobile, minting the initial digital custody receipt.',
      metricHi: 'घोषित मात्रा: 1,200 kg',
      metricEn: 'Declared: 1,200 kg',
      badge: 'PROVENANCE BIRTH',
      color: '#2E6847',
      icon: Sprout
    },
    {
      stage: '02',
      id: 'warehouse',
      role: 'SMART SILO',
      titleHi: '2. वैज्ञानिक साइलो भंडारण (Silo Intake)',
      titleEn: '2. Warehouse Weighbridge Verification',
      descHi: 'धर्मकांटा पर घोषित मात्रा बनाम वास्तविक प्राप्त मात्रा का मिलान, स्वतः अंतर (Discrepancy) गणना, <12% नमी सेंसर निगरानी और साइलो बे आवंटन।',
      descEn: 'Gate weighbridge compares farmer-declared vs received quantity, highlighting shortages or surpluses. Climate silos (<12% moisture) prevent grain rot.',
      metricHi: 'सत्यापित मात्रा: 1,200 kg (0 kg अंतर)',
      metricEn: 'Verified: 1,200 kg (Zero Variance)',
      badge: 'DISCREPANCY AUDIT',
      color: '#D6A75C',
      icon: Building2
    },
    {
      stage: '03',
      id: 'buyer',
      role: 'FAIR-TRADE MARKET',
      titleHi: '3. थोक मंडी व सीधा व्यापार (Wholesale Settlement)',
      titleEn: '3. Transparent Marketplace Settlement',
      descHi: 'बिचौलियों की 8-12% कटौती के बिना सीधे प्रमाणित व्यापारियों को बिक्री। 15-दिन मूल्य सुरक्षा छूट और सीधा इलेक्ट्रॉनिक भुगतान हस्तांतरण।',
      descEn: 'Direct procurement by institutional buyers with zero intermediary cuts. 15-day progressive discounts and immediate title transfer block minted on ledger.',
      metricHi: 'सीधा भुगतान: ₹33,600 किसान खाते में',
      metricEn: 'Direct Settlement: ₹33,600 to Grower',
      badge: 'IMMEDIATE SETTLEMENT',
      color: '#173D2B',
      icon: ShoppingBag
    }
  ];

  // 5 Core Feature Showcases
  const coreFeatures = [
    {
      id: 'traceability',
      titleHi: 'फसल ट्रेसिबिलिटी (Crop Traceability)',
      titleEn: 'End-to-End Crop Traceability',
      descHi: 'हर फसल लॉट का अद्वितीय Crop ID, घोषित बनाम सत्यापित मात्रा का पारदर्शी विभाजन और खेत से खरीदार तक की संपूर्ण वर्टिकल टाइमलाइन।',
      descEn: 'Every harvest batch receives a unique Crop ID. Declared and warehouse-verified quantities are recorded separately in an intuitive chronological timeline.',
      icon: Sprout,
      color: '#2E6847',
      link: '/marketplace'
    },
    {
      id: 'farmistor',
      titleHi: 'फार्मिस्टर स्मार्ट फसल योजना (Farmistor)',
      titleEn: 'Farmistor Smart Crop Planning',
      descHi: 'मिट्टी, पानी, मौसम और बजट के अनुसार नियम-आधारित वैज्ञानिक सिफारिशें, शुद्ध मुनाफा अनुमान और फसलों की सीधी आमने-सामने तुलना।',
      descEn: 'Intelligent multi-step planning calibrated by soil, water availability, season, and budget. Transparent explainability and side-by-side comparison.',
      icon: Brain,
      color: '#8DBB78',
      link: '/farmistor'
    },
    {
      id: 'ledger',
      titleHi: 'डिजिटल लेजर (Tamper-Evident Ledger)',
      titleEn: 'Tamper-Evident Digital Ledger',
      descHi: 'SHA-256 हैश-लिंक्ड ब्लॉकचेन श्रृंखला, मर्कल ट्री सत्यापन और वास्तविक समय में छेड़छाड़ पहचान परीक्षण — बिना किसी पुराने रिकॉर्ड को ओवरराइट किए।',
      descEn: 'SHA-256 hash-linked event blocks with Merkle tree roots. Historical records cannot be altered; corrections append new verifiable blocks.',
      icon: Link2,
      color: '#173D2B',
      link: '/ledger'
    },
    {
      id: 'warehouse',
      titleHi: 'गोदाम प्रबंधन व वजन मिलान',
      titleEn: 'Warehouse Discrepancy Verification',
      descHi: '25,000 क्विंटल आधुनिक साइलो, वास्तविक आवक वजन बनाम किसान घोषणा की स्वतः तुलना और 15-दिन आवधिक स्टॉक सत्यापन अलार्म।',
      descEn: 'Dedicated warehouse operator dashboard tracking expected batches, automated discrepancy calculation, and 15-day stock audit alerts.',
      icon: Building2,
      color: '#D6A75C',
      link: '/warehouse'
    },
    {
      id: 'marketplace',
      titleHi: 'पारदर्शी थोक मंडी (Fair-Trade Mandi)',
      titleEn: 'Farmer–Buyer Direct Marketplace',
      descHi: 'केवल एग्रीस्टैक-सत्यापित किसानों से सीधी थोक खरीद, पारदर्शी स्टार रेटिंग, 15-दिन शेल्फ-लाइफ छूट और बिचौलिया-मुक्त भुगतान।',
      descEn: 'Direct connection between verified growers and commodity buyers. Dynamic 15-day aging discounts and transparent farmer rating reviews.',
      icon: ShoppingBag,
      color: '#202720',
      link: '/marketplace'
    }
  ];

  // Dedicated Portals
  const portalCards = [
    {
      role: 'farmer',
      icon: Sprout,
      color: '#2E6847',
      badgeHi: 'आवाज व टच AI',
      badgeEn: 'VOICE ASSISTED',
      titleHi: 'किसान पोर्टल (Farmer Dashboard)',
      titleEn: 'Farmer Portal & Harvest Desk',
      descHi: 'फसल दर्ज करें, कानूनी डिजिटल किसान पर्ची प्राप्त करें, एग्रीस्टैक KYC पूरा करें और गोदाम आवक स्थिति ट्रैक करें।',
      descEn: 'Log harvests, generate digital Kisan receipts, verify AgriStack credentials, and track warehouse weighing.',
      path: '/farmer'
    },
    {
      role: 'warehouse',
      icon: Building2,
      color: '#D6A75C',
      badgeHi: 'साइलो लॉजिस्टिक्स',
      badgeEn: 'SILO LOGISTICS',
      titleHi: 'गोदाम / साइलो हब (Warehouse)',
      titleEn: 'Smart Silo Warehouse Hub',
      descHi: '25,000 क्विंटल क्षमता प्रबंधन, आवक वजन मिलान, मात्रा अंतर (Discrepancy) रिकॉर्डिंग और 15-दिन स्टॉक ऑडिट।',
      descEn: 'Manage silo capacity, record weighbridge intake, highlight quantity discrepancies, and execute 15-day audits.',
      path: '/warehouse'
    },
    {
      role: 'buyer',
      icon: ShoppingBag,
      color: '#173D2B',
      badgeHi: 'थोक खरीद',
      badgeEn: 'FAIR-TRADE',
      titleHi: 'व्यापारी मंडी (Commodity Buyer)',
      titleEn: 'Commodity Buyer Marketplace',
      descHi: '100% सत्यापित लॉट, संपूर्ण ब्लॉकचेन इतिहास, 15-दिन एजिंग छूट और बिचौलिया-मुक्त सीधी थोक खरीद।',
      descEn: 'Procure verified batches directly from growers with complete chronological provenance and zero broker cuts.',
      path: '/marketplace'
    },
    {
      role: 'admin',
      icon: ShieldCheck,
      color: '#202720',
      badgeHi: 'लेजर गवर्नेंस',
      badgeEn: 'GOVERNANCE',
      titleHi: 'सिस्टम एडमिन व लेजर (Governance)',
      titleEn: 'Cryptographic Admin Ledger',
      descHi: 'किसान आधार व खतौनी KYC सत्यापन डेस्क, SHA-256 ब्लॉकचेन अखंडता परीक्षण और 15-दिन एजिंग सिमुलेटर।',
      descEn: 'Manual farmer KYC verification desk, SHA-256 ledger explorer, aging simulation, and zero-trust audit.',
      path: '/admin'
    }
  ];

  const testimonials = [
    {
      id: 1,
      nameHi: 'सरदार गुरप्रीत सिंह',
      nameEn: 'Sardar Gurpreet Singh',
      roleHi: 'शरबती गेहूं व धान किसान, समराला (पंजाब)',
      roleEn: 'Wheat & Paddy Grower, Samrala (Punjab)',
      quoteHi: 'मिलीग्राम्स में फसल दर्ज करते ही मुझे पक्की किसान पर्ची मिल गई। गोदाम पर तौल होने के बाद जो वजन तय हुआ, वही लेजर में दर्ज रहा — मंडी में आढ़तियों की 5-8% मनमानी कटौती हमेशा के लिए खत्म हो गई।',
      quoteEn: 'With MiliGrams, my harvest was recorded instantly with an official receipt. The weighbridge weight at the silo matched the ledger exactly — no arbitrary weight deductions or broker commissions.',
      rating: 5,
      badgeHi: 'एग्रीस्टैक सत्यापित किसान',
      badgeEn: 'AgriStack Verified Grower'
    },
    {
      id: 2,
      nameHi: 'विपिन सचदेवा',
      nameEn: 'Vipin Sachdeva',
      roleHi: 'हब प्रबंधक, सेंट्रल साइलो करनाल (हरियाणा)',
      roleEn: 'Silo Operations Head, Karnal (Haryana)',
      quoteHi: 'किसान की घोषित मात्रा और गोदाम के कांटे पर आने वाली मात्रा में जो भी अंतर होता है, हमारा सिस्टम उसे तुरंत दर्ज कर नया ब्लॉक बना देता है। 15-दिन की शेल्फ लाइफ निगरानी से अनाज की बर्बादी शून्य है।',
      quoteEn: 'Comparing farmer-declared quantity against weighbridge received quantity with transparent discrepancy tracking gives complete inventory clarity across our 25,000 quintal silos.',
      rating: 5,
      badgeHi: 'साइलो लॉजिस्टिक्स हेड',
      badgeEn: 'Silo Logistics Head'
    },
    {
      id: 3,
      nameHi: 'अमित सिंघानिया',
      nameEn: 'Amit Singhania',
      roleHi: 'प्रबंध निदेशक, दिल्ली ग्रेन्स एक्सपोर्ट्स',
      roleEn: 'Managing Director, Delhi Grains Export Ltd.',
      quoteHi: 'फसल की पूरी टाइमलाइन — कब कटी, किस साइलो में रखी गई और वजन में कोई अंतर था या नहीं — खरीदने से पहले स्क्रीन पर दिखती है। यह पारदर्शिता कमोडिटी व्यापार में क्रांतिकारी है।',
      quoteEn: 'Being able to inspect the complete provenance timeline — harvest date, silo bay, and weighbridge verification — before placing a wholesale order gives our buyers absolute trust.',
      rating: 5,
      badgeHi: 'थोक कमोडिटी खरीदार',
      badgeEn: 'Verified Commodity Buyer'
    }
  ];

  return (
    <div className="front-page-container">
      {/* Subtle organic ambient canvas */}
      <NatureBackground />

      {/* 1. EDITORIAL SUB-NAVBAR */}
      <nav className="figma-top-bar">
        <div className="figma-top-links">
          <a href="#produce" className="figma-top-link">
            {lang === 'hi' ? 'ताज़ा उपज (Mandi)' : 'Shop Mandi'}
          </a>
          <a href="#journey" className="figma-top-link">
            {lang === 'hi' ? 'फसल यात्रा (Journey)' : 'Crop Journey'}
          </a>
          <button 
            onClick={handleDiscoverFarmistor}
            className="figma-top-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, color: '#2E6847' }}
          >
            <span>🧠 {lang === 'hi' ? 'फार्मिस्टर प्लानर' : 'Farmistor Planner'}</span>
          </button>
          <a href="#features" className="figma-top-link">
            {lang === 'hi' ? 'मुख्य स्तंभ (5 Pillars)' : '5 Pillars'}
          </a>
          <a href="#portals" className="figma-top-link">
            {lang === 'hi' ? 'कार्यक्षेत्र (4 Portals)' : '4 Portals'}
          </a>
          <button 
            onClick={() => navigate('/ledger')}
            className="figma-top-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--text-muted)' }}
          >
            <span>🔗 {lang === 'hi' ? 'डिजिटल लेजर' : 'Ledger Explorer'}</span>
          </button>
        </div>

        <div className="figma-top-actions">
          {/* Language Switch */}
          <button
            onClick={() => { soundFX.click(); setLang(lang === 'hi' ? 'en' : 'hi'); }}
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
              onClick={() => { soundFX.click(); toggleTheme(); }}
              className="btn btn-secondary btn-sm"
              title="Toggle Theme"
              style={{ padding: '0.35rem 0.65rem' }}
            >
              {theme === 'dark' ? <Sun size={14} color="#D6A75C" /> : <Moon size={14} color="#173D2B" />}
            </button>
          )}

          {/* Connect / Enter CTA */}
          <button
            onClick={() => { soundFX.click(); navigate('/login'); }}
            className="figma-btn-forest"
            style={{ padding: '0.45rem 1.15rem', fontSize: '0.82rem' }}
          >
            <span>{lang === 'hi' ? 'पोर्टल में प्रवेश' : 'Open Portal'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* 2. REFINED EDITORIAL MASTHEAD */}
      <header className="figma-masthead-section">
        <h1 className="figma-masthead-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>MiliGrams</span>
          <span className="figma-registered-mark">®</span>
        </h1>
        <p className="figma-mission-statement">
          {lang === 'hi'
            ? 'खेत से खरीदार तक, हर ग्राम का सच्चा हिसाब — एक किसान-केंद्रित कृषि पारितंत्र जो फसल ट्रैकिंग, मात्रा जवाबदेही, डिजिटल लेजर और बुद्धिमान फसल योजना को जोड़ता है।'
            : 'From Farm to Buyer, Every Gram Accountable — A farmer-centric agricultural ecosystem connecting growers, warehouses, and buyers through transparent tracking, quantity accountability, and intelligent crop planning.'}
        </p>
      </header>

      {/* 3. IMMERSIVE HERO: "EVERY GRAM HAS A JOURNEY" */}
      <section className="figma-hero-window-wrapper">
        <div className="figma-hero-window">
          {/* Left Hero Content */}
          <div className="figma-hero-content">
            <div className="figma-hero-tag">
              <Sparkles size={13} />
              <span>{lang === 'hi' ? 'पारदर्शी कृषि ट्रेसिबिलिटी व डिजिटल लेजर' : 'Transparent Crop Traceability & Digital Ledger'}</span>
            </div>

            <h2 className="figma-hero-title">
              {lang === 'hi' ? (
                <>हर ग्राम की अपनी एक यात्रा है। <br /><span style={{ color: '#2E6847' }}>Every Gram Has a Journey.</span></>
              ) : (
                <>Every Gram <br />Has a Journey.</>
              )}
            </h2>

            <p className="figma-hero-sub">
              {lang === 'hi'
                ? 'किसान द्वारा घोषित मात्रा और गोदाम द्वारा सत्यापित वजन का पारदर्शी हिसाब। अपरिवर्तनीय SHA-256 डिजिटल लेजर, 15-दिन शेल्फ लाइफ मूल्य सुरक्षा और फार्मिस्टर बुद्धिमान फसल योजना।'
                : 'Accountable crop tracking connecting verified Indian growers directly with wholesale buyers. Farmer-declared vs warehouse-verified weight transparency, tamper-evident SHA-256 records, and Farmistor smart agronomic planning.'}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="figma-hero-actions">
              <button onClick={handleExploreMiligrams} className="figma-btn-forest">
                <Sprout size={18} />
                <span>{lang === 'hi' ? 'मिलीग्राम्स देखें (Explore Miligrams)' : 'Explore Miligrams'}</span>
                <ArrowRight size={17} />
              </button>

              <button onClick={handleDiscoverFarmistor} className="figma-btn-outline">
                <Brain size={17} />
                <span>{lang === 'hi' ? 'फार्मिस्टर खोजें (Discover Farmistor)' : 'Discover Farmistor'}</span>
              </button>
            </div>

            {/* Real Stats */}
            <div className="figma-hero-stats">
              <div className="figma-stat-item">
                <span className="figma-stat-num">12,400+</span>
                <span className="figma-stat-label">{lang === 'hi' ? 'सत्यापित किसान' : 'Verified Farmers'}</span>
              </div>
              <div className="figma-stat-item">
                <span className="figma-stat-num">99.8%</span>
                <span className="figma-stat-label">{lang === 'hi' ? 'तौल मिलान सटीकता' : 'Weighbridge Accuracy'}</span>
              </div>
              <div className="figma-stat-item">
                <span className="figma-stat-num">15 Days</span>
                <span className="figma-stat-label">{lang === 'hi' ? 'एजिंग सुरक्षा चक्र' : 'Aging Audit Cycle'}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual with Floating Verified Ledger Badge */}
          <div className="figma-hero-media">
            <img 
              src="/farmer-sunset-field.jpg" 
              alt="Golden Wheat Harvest in Punjab" 
              className="figma-hero-img" 
            />
            
            {/* Floating Provenance Badge */}
            <div className="figma-hero-media-badge">
              <div className="figma-badge-title">
                <CheckCircle2 size={15} color="#8DBB78" />
                <span>{lang === 'hi' ? 'लॉट #1042 — वजन व लेजर सत्यापित' : 'Lot #1042 — Weighbridge Verified'}</span>
              </div>
              <div className="figma-badge-sub">
                {lang === 'hi' 
                  ? 'घोषित: 1,200 kg • सत्यापित: 1,200 kg (0 kg अंतर) • किसान: रमेश पटेल • साइलो अल्फा' 
                  : 'Declared: 1,200 kg • Verified: 1,200 kg (0 kg variance) • Farmer: Ramesh Patel'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIQUE VISUAL CROP JOURNEY: FARM → WAREHOUSE → BUYER */}
      <section id="journey" className="front-section">
        <div className="front-section-header">
          <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.1)', color: '#2E6847', borderColor: 'rgba(46, 104, 71, 0.25)' }}>
            <Compass size={13} />
            <span>VISUAL CROP LIFECYCLE</span>
          </span>
          <h2 className="front-section-title">
            {lang === 'hi' ? 'फसल की पारदर्शी यात्रा: खेत से खरीदार तक' : 'The Visual Crop Journey: Farm → Warehouse → Buyer'}
          </h2>
          <p className="front-section-sub">
            {lang === 'hi'
              ? 'प्रत्येक महत्वपूर्ण पड़ाव पर मात्रा और गुणवत्ता की स्वतंत्र पुष्टि होती है, जिसे कोई भी बिचौलिया बदल नहीं सकता।'
              : 'Every gram is tracked across three verified physical custody nodes, creating an unbroken chain of accountability.'}
          </p>
        </div>

        <div className="journey-nodes-grid">
          {journeyStages.map((stg) => {
            const Icon = stg.icon;
            return (
              <div key={stg.id} className="glass-panel journey-node-card">
                <div className="journey-node-top">
                  <div className="journey-node-num">{stg.stage}</div>
                  <span className="badge" style={{ background: `${stg.color}15`, color: stg.color, borderColor: `${stg.color}35` }}>
                    {stg.badge}
                  </span>
                </div>

                <div className="journey-node-icon" style={{ background: `${stg.color}15`, color: stg.color }}>
                  <Icon size={24} />
                </div>

                <h3 className="journey-node-title">
                  {lang === 'hi' ? stg.titleHi : stg.titleEn}
                </h3>

                <p className="journey-node-desc">
                  {lang === 'hi' ? stg.descHi : stg.descEn}
                </p>

                <div className="journey-node-metric-box">
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 800, textTransform: 'uppercase' }}>
                    KEY ACCOUNTABILITY DATA
                  </span>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: stg.color, marginTop: '0.2rem' }}>
                    {lang === 'hi' ? stg.metricHi : stg.metricEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FRESH CERTIFIED PRODUCE SHELF (Horizontal Cards with Declared/Verified Weights) */}
      <section id="produce" className="figma-produce-section">
        <div className="figma-produce-header">
          <div>
            <span className="badge" style={{ background: 'rgba(214, 167, 92, 0.15)', color: '#D6A75C', borderColor: 'rgba(214, 167, 92, 0.3)', marginBottom: '0.4rem' }}>
              DIRECT COMMODITY LISTINGS
            </span>
            <h3 className="figma-produce-title" style={{ margin: 0 }}>
              {lang === 'hi' ? 'मंडी में उपलब्ध ताज़ा प्रमाणित उपज' : 'Fresh Verified Batches in Marketplace'}
            </h3>
          </div>

          <button 
            onClick={handleExploreMiligrams}
            className="btn-link" 
            style={{ color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
          >
            <span>{lang === 'hi' ? 'पूरी मंडी देखें (Browse All)' : 'Open Full Marketplace'}</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="figma-produce-grid">
          {produceItems.map((item) => (
            <div 
              key={item.id} 
              className="figma-produce-card"
              onClick={() => { soundFX.click(); navigate(`/marketplace?crop=${encodeURIComponent(item.nameEn)}`); }}
              title={lang === 'hi' ? `${item.nameHi} - मंडी में खरीदने के लिए क्लिक करें` : `Click to view ${item.nameEn} in Marketplace`}
            >
              <div className="figma-produce-img-wrap">
                <img src={item.image} alt={item.nameEn} className="figma-produce-img" />
                <span 
                  className="badge" 
                  style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', background: 'rgba(23, 61, 43, 0.88)', color: '#ffffff', fontSize: '0.68rem', backdropFilter: 'blur(8px)' }}
                >
                  {item.grade}
                </span>
              </div>
              
              <div className="figma-produce-footer">
                <div>
                  <div className="figma-produce-name">{lang === 'hi' ? item.nameHi : item.nameEn}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>📍 {item.farmer} • {item.location}</div>
                  <div style={{ fontSize: '0.7rem', color: '#2E6847', fontWeight: 700, marginTop: '0.25rem' }}>
                    ✓ {item.verifiedQty}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="figma-produce-price">{item.price}</div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700 }}>
                    {lang === 'hi' ? 'सौदा करें →' : 'Trade →'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PREMIUM 5 CORE MODULES SHOWCASE */}
      <section id="features" className="front-section">
        <div className="front-section-header">
          <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.1)', color: '#2E6847', borderColor: 'rgba(46, 104, 71, 0.25)' }}>
            <Layers size={13} />
            <span>INTEGRATED SYSTEM ARCHITECTURE</span>
          </span>
          <h2 className="front-section-title">
            {lang === 'hi' ? 'पारदर्शिता के 5 मुख्य स्तंभ' : 'The 5 Core Pillars of MiliGrams'}
          </h2>
          <p className="front-section-sub">
            {lang === 'hi'
              ? 'फसल ट्रैकिंग से लेकर स्मार्ट साइलो प्रबंधन, अपरिवर्तनीय लेजर और एग्रोनॉमिक फसल योजना।'
              : 'Engineered from the ground up for quantity accountability, provenance truth, and intelligent farming.'}
          </p>
        </div>

        <div className="front-features-grid">
          {coreFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.id} 
                className="glass-panel front-feature-box"
                onClick={() => { soundFX.click(); navigate(feat.link); }}
                style={{ cursor: 'pointer' }}
              >
                <div className="front-feature-icon" style={{ background: `${feat.color}15`, color: feat.color, borderColor: `${feat.color}30` }}>
                  <Icon size={24} />
                </div>
                <h3 className="front-feature-title">
                  {lang === 'hi' ? feat.titleHi : feat.titleEn}
                </h3>
                <p className="front-feature-desc">
                  {lang === 'hi' ? feat.descHi : feat.descEn}
                </p>
                <div className="front-feature-link" style={{ color: feat.color }}>
                  <span>{lang === 'hi' ? 'विस्तार से देखें' : 'Explore Feature'}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. SPOTLIGHT: FARMISTOR CROP PLANNER TEASER */}
      <section className="front-section" style={{ paddingTop: '1rem' }}>
        <div className="glass-panel farmistor-front-banner">
          <div className="farmistor-banner-grid">
            <div>
              <div className="farmistor-pill-tag">
                <Brain size={14} />
                <span>INTELLIGENT PLANNING ENGINE</span>
              </div>

              <h3 className="farmistor-banner-heading">
                {lang === 'hi'
                  ? 'फार्मिस्टर: बुवाई से पहले मिट्टी, पानी व बजट के अनुसार सही फसल का चयन'
                  : 'Farmistor: Agronomic Intelligence Before You Sow'}
              </h3>

              <p className="farmistor-banner-sub">
                {lang === 'hi'
                  ? 'अंधेरे में बुवाई करने के दिन खत्म। फार्मिस्टर आपकी जमीन के प्रकार (जलोढ़, काली, दोमट), उपलब्ध पानी (नहर, ट्यूबवेल, ड्रिप) और बजट के अनुसार उपयुक्तता स्कोर (जैसे 96% Match), कुल लागत और शुद्ध लाभ का पारदर्शी नियम-आधारित अनुमान प्रदान करता है।'
                  : 'Input your soil texture, water availability, target season, and financial budget. Farmistor calculates explainable suitability scores, cost breakdowns, and yield projections with side-by-side comparison.'}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
                <button onClick={handleDiscoverFarmistor} className="figma-btn-forest" style={{ padding: '0.8rem 1.8rem' }}>
                  <Brain size={18} />
                  <span>{lang === 'hi' ? 'फार्मिस्टर प्लानर शुरू करें' : 'Launch Farmistor Planner'}</span>
                  <ArrowRight size={17} />
                </button>

                <button onClick={() => navigate('/ledger')} className="figma-btn-outline" style={{ padding: '0.8rem 1.6rem' }}>
                  <Link2 size={17} />
                  <span>{lang === 'hi' ? 'डिजिटल लेजर देखें' : 'Audit Digital Ledger'}</span>
                </button>
              </div>
            </div>

            {/* Visual Teaser Cards */}
            <div className="farmistor-teaser-preview">
              <div className="farmistor-teaser-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#2E6847' }}>#1 SUITABILITY MATCH</span>
                  <span className="badge" style={{ background: '#2E6847', color: '#ffffff' }}>96% MATCH</span>
                </div>
                <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Sharbati Wheat (शरबती गेहूं)
                </h4>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Alluvial Soil • Canal Water • Rabi Season • 115–125 Days
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem' }}>
                  <span>Est. Net Profit:</span>
                  <strong style={{ color: '#2E6847' }}>₹32,000 – ₹43,000 / Acre</strong>
                </div>
              </div>

              <div className="farmistor-teaser-card" style={{ opacity: 0.85, transform: 'scale(0.97)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#D6A75C' }}>#2 SUITABILITY MATCH</span>
                  <span className="badge" style={{ background: 'rgba(214, 167, 92, 0.2)', color: '#D6A75C' }}>91% MATCH</span>
                </div>
                <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Yellow Mustard (पीली सरसों)
                </h4>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Sandy Loam • 1–2 Irrigations • Low Water Risk
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. THE 4 DEDICATED WORKSPACES */}
      <section id="portals" className="front-section">
        <div className="front-section-header">
          <span className="badge" style={{ background: 'rgba(23, 61, 43, 0.08)', color: 'var(--primary)', borderColor: 'rgba(23, 61, 43, 0.2)' }}>
            <Users size={13} />
            <span>PURPOSE-BUILT ROLE WORKSPACES</span>
          </span>
          <h2 className="front-section-title">
            {lang === 'hi' ? 'हर हितधारक के लिए अलग पोर्टल' : 'Dedicated Portals for Every Actor'}
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
                      background: `${p.color}15`, 
                      color: p.color, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: `1px solid ${p.color}30`
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
                    {lang === 'hi' ? 'क्लिक कर प्रवेश करें' : 'Open Workspace'}
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

      {/* 9. REALISTIC 3D PHOTO CARDS OF INDIAN AGRICULTURE */}
      <section className="front-section" style={{ paddingTop: 0 }}>
        <div className="front-section-header">
          <span className="badge" style={{ background: 'rgba(23, 61, 43, 0.08)', color: 'var(--primary)', borderColor: 'rgba(23, 61, 43, 0.2)' }}>
            <Sparkles size={13} />
            <span>FIELD PERSPECTIVES</span>
          </span>
          <h2 className="front-section-title">
            {lang === 'hi' ? 'भारतीय कृषि का नया डिजिटल सवेरा' : 'A New Digital Dawn for Indian Agriculture'}
          </h2>
        </div>
        <PhotoCards3D lang={lang} />
      </section>

      {/* 10. AUTHENTIC COMMUNITY TESTIMONIALS */}
      <section id="testimonials" className="front-section">
        <div className="front-section-header">
          <span className="badge" style={{ background: 'rgba(214, 167, 92, 0.15)', color: '#D6A75C', borderColor: 'rgba(214, 167, 92, 0.3)' }}>
            <Star size={13} />
            <span>GROUND-LEVEL IMPACT</span>
          </span>
          <h2 className="front-section-title">
            {lang === 'hi' ? 'खेत और मंडी से वास्तविक अनुभव' : 'Verified Voices Across the Supply Chain'}
          </h2>
        </div>

        <div className="front-testimonials-grid">
          {testimonials.map((test) => (
            <div key={test.id} className="front-testimonial-card glass-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div 
                    style={{ 
                      width: '42px', 
                      height: '42px', 
                      borderRadius: '50%', 
                      background: '#2E6847', 
                      color: '#ffffff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 800, 
                      fontSize: '1rem' 
                    }}
                  >
                    {test.nameEn.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {lang === 'hi' ? test.nameHi : test.nameEn}
                    </h4>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {lang === 'hi' ? test.roleHi : test.roleEn}
                    </span>
                  </div>
                </div>

                <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.12)', color: '#2E6847', borderColor: 'rgba(46, 104, 71, 0.25)', fontSize: '0.66rem' }}>
                  {lang === 'hi' ? test.badgeHi : test.badgeEn}
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
                "{lang === 'hi' ? test.quoteHi : test.quoteEn}"
              </p>

              <div style={{ display: 'flex', gap: '0.2rem', marginTop: '1.25rem' }}>
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={14} color="#D6A75C" fill="#D6A75C" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. NEWSLETTER & EDITORIAL FOOTER */}
      <section className="figma-newsletter-section">
        <div className="figma-newsletter-box">
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D6A75C' }}>
              AGRITECH DISPATCH & MANDI BULLETIN
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 500, color: 'var(--text-main)', margin: '0.5rem 0' }}>
              {lang === 'hi' ? 'ताज़ा मंडी भाव व लेजर बुलेटिन प्राप्त करें' : 'Fresh Harvest Alerts & Daily Mandi Rates'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0 }}>
              {lang === 'hi' 
                ? 'सीधे अपने ईमेल पर पाएं 15-दिन शेल्फ लाइफ छूट, सत्यापित साइलो क्षमता और नए फसल लॉट की सूचना।'
                : 'Subscribe to receive certified lot alerts, wholesale price indices, and transparent ledger dispatches.'}
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="figma-newsletter-form">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder={lang === 'hi' ? 'अपना ईमेल दर्ज करें...' : 'Enter your work email...'}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="figma-newsletter-input"
                required
              />
              <button type="submit" className="figma-btn-forest" style={{ padding: '0 1.5rem', whiteSpace: 'nowrap' }}>
                {newsletterSent ? <Check size={16} /> : <Send size={16} />}
                <span>{newsletterSent ? (lang === 'hi' ? 'जुड़ गए!' : 'Subscribed') : (lang === 'hi' ? 'सब्सक्राइब' : 'Subscribe')}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 12. MINIMALIST EDITORIAL FOOTER */}
      <footer className="figma-editorial-footer">
        <div className="figma-footer-content">
          <div>
            <h2 className="figma-footer-brand-title">MiliGrams®</h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', maxWidth: '320px', lineHeight: 1.6 }}>
              {lang === 'hi'
                ? 'खेत से खरीदार तक, हर ग्राम का सच्चा हिसाब। अपरिवर्तनीय SHA-256 लेजर और किसान-केंद्रित एग्रोटेक प्लेटफॉर्म।'
                : 'From Farm to Buyer, Every Gram Accountable. A tamper-evident digital ledger ecosystem for Indian agriculture.'}
            </p>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-light)', marginTop: '1.25rem' }}>
              © 2026 MiliGrams AgriTech. All rights reserved.
            </div>
          </div>

          <div>
            <div className="figma-footer-col-title">{lang === 'hi' ? 'प्लेटफॉर्म' : 'Platform'}</div>
            <ul className="figma-footer-links">
              <li><a onClick={() => navigate('/marketplace')} className="figma-footer-link">{lang === 'hi' ? 'ताज़ा मंडी (Marketplace)' : 'Marketplace'}</a></li>
              <li><a onClick={() => navigate('/farmistor')} className="figma-footer-link">{lang === 'hi' ? 'फार्मिस्टर (Crop Planner)' : 'Farmistor Planner'}</a></li>
              <li><a onClick={() => navigate('/ledger')} className="figma-footer-link">{lang === 'hi' ? 'डिजिटल लेजर (Explorer)' : 'Ledger Explorer'}</a></li>
              <li><a onClick={() => navigate('/farmer')} className="figma-footer-link">{lang === 'hi' ? 'किसान पोर्टल (Farmer)' : 'Farmer Portal'}</a></li>
            </ul>
          </div>

          <div>
            <div className="figma-footer-col-title">{lang === 'hi' ? 'कार्यक्षेत्र' : 'Workspaces'}</div>
            <ul className="figma-footer-links">
              <li><a onClick={() => navigate('/warehouse')} className="figma-footer-link">{lang === 'hi' ? 'गोदाम साइलो (Warehouse)' : 'Silo Warehouse'}</a></li>
              <li><a onClick={() => navigate('/admin')} className="figma-footer-link">{lang === 'hi' ? 'गवर्नेंस व ऑडिट (Admin)' : 'Admin Governance'}</a></li>
              <li><a onClick={() => navigate('/notifications')} className="figma-footer-link">{lang === 'hi' ? 'सूचना केंद्र (Alerts)' : 'Notifications'}</a></li>
              <li><a onClick={() => navigate('/settings')} className="figma-footer-link">{lang === 'hi' ? 'सिस्टम सेटिंग्स (Settings)' : 'Settings'}</a></li>
            </ul>
          </div>

          <div>
            <div className="figma-footer-col-title">{lang === 'hi' ? 'सुरक्षा व तकनीक' : 'Governance & Tech'}</div>
            <ul className="figma-footer-links">
              <li><span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>SHA-256 Chained Hash</span></li>
              <li><span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Merkle Tree Root Proof</span></li>
              <li><span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>AgriStack KYC Integration</span></li>
              <li><span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>15-Day Aging Protection</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

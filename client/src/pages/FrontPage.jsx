import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Building2, ShoppingBag, ShieldCheck, ArrowRight, 
  Sparkles, CheckCircle2, Star, Shield, Award, 
  Clock, Truck, Users, Layers, Globe, Sun, Moon,
  Compass, ArrowUpRight, Check, Send, Brain, Scale, 
  Link2, MapPin, ChevronRight, BarChart3, Database, Activity
} from 'lucide-react';
import { soundFX } from '../utils/audioFX';

export default function FrontPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleExploreMiligrams = () => {
    soundFX.click();
    navigate('/role-select');
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
      nameHi: 'शरबती गेहूं (Sharbati C-306)',
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
      verifiedQty: 'Farm Gate Verified'
    },
    {
      id: 4,
      nameHi: 'पीली सरसों (Pusa Bold Mustard)',
      nameEn: 'Pusa Bold Yellow Mustard',
      variety: 'High Oil Content (42%)',
      price: '₹52 / kg',
      grade: 'Grade A',
      farmer: 'Sita Devi',
      location: 'Karnal, Haryana',
      image: '/farmer-thumbs-up-sold.jpg',
      declaredQty: '450 kg',
      verifiedQty: 'Farm Gate Verified'
    }
  ];

  // 3-Stage Visual Crop Journey
  const journeyStages = [
    {
      stage: '01',
      id: 'farm',
      role: 'FARM GATE',
      titleHi: '1. खेत से घोषणा (Farm Origin & Declaration)',
      titleEn: '1. Farm Origin & Declaration',
      descHi: 'किसान का विशिष्ट Farmer ID पंजीकरण, फसल घोषणा (मात्रा, किस्म, कटाई तिथि) और ब्लॉकचेन पर प्रारंभिक किसान पर्ची का निर्माण।',
      descEn: 'Farmer registers with unique ID. Harvest quantity, variety, and harvest date are logged, minting the initial digital custody receipt.',
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
      titleHi: '2. धर्मकांटा वजन सत्यापन (Silo Intake)',
      titleEn: '2. Warehouse Weighbridge Verification',
      descHi: 'धर्मकांटा पर घोषित मात्रा बनाम वास्तविक प्राप्त मात्रा का मिलान, स्वतः अंतर (Discrepancy) गणना और साइलो बे आवंटन।',
      descEn: 'Gate weighbridge compares farmer-declared vs received quantity, highlighting shortages or surpluses. Climate silos prevent spoilage.',
      metricHi: 'सत्यापित मात्रा: 1,200 kg (0 kg अंतर)',
      metricEn: 'Verified: 1,200 kg (Zero Variance)',
      badge: 'DISCREPANCY AUDIT',
      color: '#D6A75C',
      icon: Building2
    },
    {
      stage: '03',
      id: 'buyer',
      role: 'FAIR-TRADE MANDI',
      titleHi: '3. पारदर्शी थोक मंडी (Wholesale Settlement)',
      titleEn: '3. Transparent Mandi Settlement',
      descHi: 'बिचौलियों की मनमानी कटौती के बिना सीधे प्रमाणित व्यापारियों को बिक्री। 15-दिन मूल्य सुरक्षा छूट और सीधा भुगतान।',
      descEn: 'Direct procurement by institutional buyers with zero intermediary cuts. 15-day progressive discounts and immediate title transfer.',
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
      titleHi: 'फसल ट्रेसिबिलिटी व दोहरी तौल',
      titleEn: 'Dual-Weight Crop Traceability',
      descHi: 'हर फसल लॉट का अद्वितीय Crop ID, घोषित बनाम सत्यापित मात्रा का पारदर्शी विभाजन और खेत से खरीदार तक की संपूर्ण वर्टिकल टाइमलाइन।',
      descEn: 'Every harvest batch receives a unique Crop ID. Declared and warehouse-verified quantities are recorded separately in an intuitive chronological timeline.',
      icon: Sprout,
      color: '#2E6847',
      link: '/marketplace'
    },
    {
      id: 'farmistor',
      titleHi: 'फार्मिस्टर स्मार्ट फसल योजना',
      titleEn: 'Farmistor Smart Crop Planning',
      descHi: 'मिट्टी, पानी, मौसम और बजट के अनुसार नियम-आधारित वैज्ञानिक सिफारिशें, शुद्ध मुनाफा अनुमान और फसलों की सीधी आमने-सामने तुलना।',
      descEn: 'Intelligent multi-step planning calibrated by soil, water availability, season, and budget. Transparent explainability and side-by-side comparison.',
      icon: Brain,
      color: '#8DBB78',
      link: '/farmistor'
    },
    {
      id: 'ledger',
      titleHi: 'छेड़छाड़-मुक्त डिजिटल लेजर',
      titleEn: 'Tamper-Evident SHA-256 Ledger',
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
      titleHi: 'पारदर्शी किसान-व्यापारी मंडी',
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
      badgeHi: 'किसान पोर्टल',
      badgeEn: 'FARMER PORTAL',
      titleHi: 'किसान पोर्टल (Farmer Portal)',
      titleEn: 'Farmer Portal & Harvest Desk',
      descHi: 'फसल दर्ज करें, कानूनी डिजिटल किसान पर्ची प्राप्त करें, एग्रीस्टैक KYC पूरा करें और गोदाम आवक स्थिति ट्रैक करें।',
      descEn: 'Log harvests, generate digital Kisan receipts, verify AgriStack credentials, and track warehouse weighing.',
      path: '/farmer'
    },
    {
      role: 'warehouse',
      icon: Building2,
      color: '#D6A75C',
      badgeHi: 'साइलो हब',
      badgeEn: 'SILO LOGISTICS',
      titleHi: 'स्मार्ट गोदाम हब (Warehouse)',
      titleEn: 'Smart Silo Warehouse Hub',
      descHi: '25,000 क्विंटल क्षमता प्रबंधन, आवक वजन मिलान, मात्रा अंतर (Discrepancy) रिकॉर्डिंग और 15-दिन स्टॉक ऑडिट।',
      descEn: 'Manage silo capacity, record weighbridge intake, highlight quantity discrepancies, and execute 15-day audits.',
      path: '/warehouse'
    },
    {
      role: 'buyer',
      icon: ShoppingBag,
      color: '#173D2B',
      badgeHi: 'व्यापारी मंडी',
      badgeEn: 'COMMODITY BUYER',
      titleHi: 'थोक व्यापारी मंडी (Buyer Mandi)',
      titleEn: 'Commodity Buyer Marketplace',
      descHi: '100% सत्यापित लॉट, संपूर्ण ब्लॉकचेन इतिहास, 15-दिन एजिंग छूट और बिचौलिया-मुक्त सीधी थोक खरीद।',
      descEn: 'Procure verified batches directly from growers with complete chronological provenance and zero broker cuts.',
      path: '/marketplace'
    },
    {
      role: 'admin',
      icon: ShieldCheck,
      color: '#202720',
      badgeHi: 'सिस्टम गवर्नेंस',
      badgeEn: 'GOVERNANCE',
      titleHi: 'सिस्टम एडमिन व लेजर (Governance)',
      titleEn: 'Cryptographic Admin Ledger',
      descHi: 'किसान आधार व खतौनी KYC सत्यापन डेस्क, SHA-256 ब्लॉकचेन अखंडता परीक्षण और 15-दिन एजिंग सिमुलेटर।',
      descEn: 'Manual farmer KYC verification desk, SHA-256 ledger explorer, aging simulation, and zero-trust audit.',
      path: '/admin'
    }
  ];

  const fieldPhotos = [
    {
      id: 1,
      image: '/farmer-sunset-field.jpg',
      titleHi: 'लुधियाना, पंजाब — शरबती गेहूं कटाई',
      titleEn: 'Ludhiana, Punjab — Golden Wheat Harvest',
      captionHi: 'शाम के समय तैयार गेहूं की बालियां। खेत से सीधे साइलो आवक के लिए तैयार।',
      captionEn: 'Prime golden grain standing ready for combine harvest and certified silo intake.'
    },
    {
      id: 2,
      image: '/farm-aerial-harvest.jpg',
      titleHi: 'वैज्ञानिक कंबाइन हार्वेस्टिंग',
      titleEn: 'Precision Combine Harvesting',
      captionHi: 'आधुनिक मशीनी कटाई से दानों की टूट-फूट न्यूनतम, 12% से कम नमी स्तर सुनिश्चित।',
      captionEn: 'Mechanized harvest preserves seed integrity and maintains optimum moisture below 12%.'
    },
    {
      id: 3,
      image: '/nature-farm-banner.jpg',
      titleHi: 'समराला, पंजाब — शाही बासमती 1121',
      titleEn: 'Samrala, Punjab — Export Basmati Paddy',
      captionHi: 'उच्च गुणवत्ता की निर्यात-ग्रेड बासमती धान की जैविक खेती।',
      captionEn: 'Organic premium extra-long grain basmati paddy ready for export-grade milling.'
    },
    {
      id: 4,
      image: '/farmer-thumbs-up-sold.jpg',
      titleHi: 'सत्यापित किसान — त्वरित डिजिटल भुगतान',
      titleEn: 'Verified Grower — Direct Settlement',
      captionHi: 'मंडी में फसल बिकते ही मोबाइल पर रसीद और सीधे बैंक खाते में भुगतान।',
      captionEn: 'Instant settlement alert directly on mobile with zero broker deductions.'
    }
  ];

  const testimonials = [
    {
      id: 1,
      nameHi: 'सरदार गुरप्रीत सिंह',
      nameEn: 'Sardar Gurpreet Singh',
      roleHi: 'गेहूं व धान किसान, समराला (पंजाब)',
      roleEn: 'Wheat & Paddy Grower, Samrala (Punjab)',
      quoteHi: 'मिलीग्राम्स में फसल दर्ज करते ही मुझे पक्की डिजिटल किसान पर्ची मिल गई। गोदाम पर तौल होने के बाद जो वजन तय हुआ, वही लेजर में दर्ज रहा — मंडी में आढ़तियों की 5-8% मनमानी कटौती हमेशा के लिए खत्म हो गई।',
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
    <div className="luxury-landing-root">
      {/* 1. TOP EDITORIAL NAVIGATION BAR */}
      <header className="luxury-nav-header">
        <div className="luxury-nav-container">
          {/* Brand Mark */}
          <div 
            className="luxury-nav-brand" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="luxury-brand-icon">
              <Sprout size={20} />
            </div>
            <div className="luxury-brand-text-block">
              <span className="luxury-brand-title">MILIGRAMS</span>
              <span className="luxury-brand-subtitle">
                {lang === 'hi' ? 'हर ग्राम का सच्चा हिसाब' : 'Every Gram Accountable'}
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="luxury-nav-links">
            <a href="#journey" className="luxury-nav-link">
              {lang === 'hi' ? 'फसल यात्रा' : 'Crop Journey'}
            </a>
            <button 
              onClick={handleDiscoverFarmistor}
              className="luxury-nav-link luxury-nav-pill-btn"
            >
              <Brain size={14} className="luxury-nav-pill-icon" />
              <span>{lang === 'hi' ? 'फार्मिस्टर प्लानर' : 'Farmistor Planner'}</span>
              <span className="luxury-nav-dot" />
            </button>
            <a href="#produce" className="luxury-nav-link">
              {lang === 'hi' ? 'प्रमाणित मंडी' : 'Mandi Shelf'}
            </a>
            <a href="#features" className="luxury-nav-link">
              {lang === 'hi' ? 'मुख्य स्तंभ' : '5 Core Pillars'}
            </a>
            <button 
              onClick={() => navigate('/ledger')}
              className="luxury-nav-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Link2 size={14} />
              <span>{lang === 'hi' ? 'डिजिटल लेजर' : 'Ledger'}</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="luxury-nav-actions">
            {/* Language Switcher */}
            <button
              onClick={() => {
                soundFX.click();
                setLang(lang === 'hi' ? 'en' : 'hi');
              }}
              className="luxury-action-btn"
              title="Toggle Hindi / English"
            >
              <Globe size={14} />
              <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                {lang === 'hi' ? 'English' : 'हिन्दी'}
              </span>
            </button>

            {/* Theme Toggle */}
            {toggleTheme && (
              <button
                onClick={() => {
                  soundFX.click();
                  toggleTheme();
                }}
                className="luxury-action-btn"
                title="Toggle Light / Dark Theme"
              >
                {theme === 'dark' ? <Sun size={15} color="#D6A75C" /> : <Moon size={15} color="#173D2B" />}
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={handleExploreMiligrams}
              className="luxury-enter-btn"
            >
              <span>{lang === 'hi' ? 'पोर्टल में प्रवेश करें' : 'Open Portal'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. FULL-SCREEN EDITORIAL LUXURY HERO */}
      <section className="luxury-hero-section">
        <div className="luxury-hero-container">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="luxury-hero-content">
            {/* Live Infrastructure Tag */}
            <div className="luxury-hero-eyebrow">
              <span className="luxury-hero-pulse-dot" />
              <span>
                {lang === 'hi' 
                  ? 'स्वायत्त कृषि ब्लॉकचेन व मात्रा जवाबदेही' 
                  : 'Sovereign Agricultural Supply Chain • SHA-256 Validated'}
              </span>
            </div>

            {/* Large Editorial Headline */}
            <h1 className="luxury-hero-heading">
              {lang === 'hi' ? (
                <>
                  हर ग्राम की अपनी <br />
                  <span className="luxury-hero-serif-accent">एक सच्ची यात्रा है।</span>
                </>
              ) : (
                <>
                  Every Gram <br />
                  <span className="luxury-hero-serif-accent">Has a Journey.</span>
                </>
              )}
            </h1>

            {/* Supporting Copy */}
            <p className="luxury-hero-description">
              {lang === 'hi'
                ? 'किसान द्वारा घोषित मात्रा और गोदाम धर्मकांटा द्वारा सत्यापित वजन का पारदर्शी हिसाब। अपरिवर्तनीय SHA-256 डिजिटल लेजर, 15-दिन शेल्फ लाइफ सुरक्षा और फार्मिस्टर नियम-आधारित वैज्ञानिक फसल योजना।'
                : 'A farmer-centric agricultural ecosystem connecting verified Indian growers, smart silos, and commercial buyers through transparent crop tracking, dual-weight accountability, and intelligent agronomic planning.'}
            </p>

            {/* Dual CTAs */}
            <div className="luxury-hero-button-group">
              <button
                onClick={handleExploreMiligrams}
                className="luxury-hero-primary-btn"
              >
                <Sprout size={18} />
                <span>{lang === 'hi' ? 'मिलीग्राम्स देखें (Explore Miligrams)' : 'Explore Miligrams'}</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={handleDiscoverFarmistor}
                className="luxury-hero-secondary-btn"
              >
                <Brain size={18} />
                <span>{lang === 'hi' ? 'फार्मिस्टर खोजें (Discover Farmistor)' : 'Discover Farmistor'}</span>
              </button>
            </div>

            {/* Trust Metrics Row */}
            <div className="luxury-hero-trust-row">
              <div className="luxury-trust-item">
                <span className="luxury-trust-number">12,400+</span>
                <span className="luxury-trust-label">
                  {lang === 'hi' ? 'सत्यापित किसान' : 'Verified Farmers'}
                </span>
              </div>
              <div className="luxury-trust-divider" />
              <div className="luxury-trust-item">
                <span className="luxury-trust-number">25,000 Qtl</span>
                <span className="luxury-trust-label">
                  {lang === 'hi' ? 'आधुनिक साइलो क्षमता' : 'Silo Telemetry'}
                </span>
              </div>
              <div className="luxury-trust-divider" />
              <div className="luxury-trust-item">
                <span className="luxury-trust-number">99.8%</span>
                <span className="luxury-trust-label">
                  {lang === 'hi' ? 'धर्मकांटा सटीकता' : 'Weighbridge Accuracy'}
                </span>
              </div>
              <div className="luxury-trust-divider" />
              <div className="luxury-trust-item">
                <span className="luxury-trust-number">100%</span>
                <span className="luxury-trust-label">
                  {lang === 'hi' ? 'लेजर अखंडता' : 'SHA-256 Verified'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Image & Floating Certifications */}
          <div className="luxury-hero-visual-col">
            <div className="luxury-hero-image-frame">
              <img 
                src="/farmer-sunset-field.jpg" 
                alt="Golden Wheat Harvest in Punjab"
                className="luxury-hero-main-img"
              />

              {/* Floating Certified Intake Badge (Top Right) */}
              <div className="luxury-floating-badge luxury-floating-badge-top">
                <div className="luxury-badge-header">
                  <div className="luxury-badge-dot-green" />
                  <span className="luxury-badge-title">
                    {lang === 'hi' ? 'धर्मकांटा तौल सत्यापित' : 'Weighbridge Intake Verified'}
                  </span>
                </div>
                <div className="luxury-badge-lot">
                  Lot #1042 • Sharbati Golden Wheat
                </div>
                <div className="luxury-badge-weights">
                  <span>Declared: <strong>1,200 kg</strong></span>
                  <span className="luxury-weight-arrow">➔</span>
                  <span className="luxury-verified-val">Verified: <strong>1,200 kg</strong></span>
                </div>
                <div className="luxury-badge-zero-variance">
                  {lang === 'hi' ? '✓ शून्य अंतर (100% Match)' : '✓ Zero Variance (100% Match)'}
                </div>
              </div>

              {/* Floating Cryptographic Block Badge (Bottom Left) */}
              <div className="luxury-floating-badge luxury-floating-badge-bottom">
                <div className="luxury-badge-header">
                  <Link2 size={13} color="#2E6847" />
                  <span className="luxury-badge-title">
                    {lang === 'hi' ? 'SHA-256 ब्लॉक #4' : 'SHA-256 Event Block #4'}
                  </span>
                </div>
                <div className="luxury-badge-hash">
                  Hash: 4bbcbdcd82ad315d0be6...
                </div>
                <div className="luxury-badge-subtext">
                  {lang === 'hi' ? 'अपरिवर्तनीय डिजिटल लेजर पर सील' : 'Tamper-Evident Provable History'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UNIQUE VISUAL CROP JOURNEY: FARM GATE ➔ WAREHOUSE ➔ BUYER */}
      <section id="journey" className="luxury-section-wrap luxury-journey-section">
        <div className="luxury-section-inner">
          <div className="luxury-section-heading-block">
            <span className="luxury-section-pill">
              <Compass size={13} />
              <span>ACCOUNTABLE 3-STAGE LIFECYCLE</span>
            </span>
            <h2 className="luxury-section-title">
              {lang === 'hi' 
                ? 'फसल की पारदर्शी यात्रा: खेत से खरीदार तक' 
                : 'The Visual Crop Journey: Farm → Warehouse → Buyer'}
            </h2>
            <p className="luxury-section-subtitle">
              {lang === 'hi'
                ? 'प्रत्येक भौतिक पड़ाव पर मात्रा और गुणवत्ता की स्वतंत्र पुष्टि होती है, जिसे कोई भी बिचौलिया बदल नहीं सकता।'
                : 'Every gram is measured and cryptographically logged across three sovereign custody nodes, eliminating phantom deductions.'}
            </p>
          </div>

          <div className="luxury-journey-grid">
            {journeyStages.map((stage) => {
              const Icon = stage.icon;
              return (
                <div key={stage.id} className="luxury-journey-card">
                  <div className="luxury-journey-card-top">
                    <span className="luxury-journey-num">{stage.stage}</span>
                    <span 
                      className="luxury-journey-badge"
                      style={{ color: stage.color, borderColor: `${stage.color}35`, background: `${stage.color}12` }}
                    >
                      {stage.badge}
                    </span>
                  </div>

                  <div 
                    className="luxury-journey-icon-wrap"
                    style={{ background: `${stage.color}15`, color: stage.color }}
                  >
                    <Icon size={26} />
                  </div>

                  <h3 className="luxury-journey-card-title">
                    {lang === 'hi' ? stage.titleHi : stage.titleEn}
                  </h3>

                  <p className="luxury-journey-card-desc">
                    {lang === 'hi' ? stage.descHi : stage.descEn}
                  </p>

                  <div className="luxury-journey-metric-pill">
                    <span className="luxury-metric-tag">KEY ACCOUNTABILITY PROOF</span>
                    <div className="luxury-metric-value" style={{ color: stage.color }}>
                      {lang === 'hi' ? stage.metricHi : stage.metricEn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FRESH CERTIFIED COMMODITY MANDI SHELF */}
      <section id="produce" className="luxury-section-wrap luxury-produce-section">
        <div className="luxury-section-inner">
          <div className="luxury-produce-header-flex">
            <div>
              <span className="luxury-section-pill" style={{ color: '#D6A75C', borderColor: 'rgba(214, 167, 92, 0.35)', background: 'rgba(214, 167, 92, 0.12)' }}>
                <Award size={13} />
                <span>DIRECT MANDI LISTINGS</span>
              </span>
              <h2 className="luxury-section-title" style={{ margin: '0.4rem 0 0' }}>
                {lang === 'hi' ? 'मंडी में उपलब्ध ताज़ा प्रमाणित उपज' : 'Fresh Verified Batches in Mandi'}
              </h2>
            </div>

            <button
              onClick={() => {
                soundFX.click();
                navigate('/marketplace');
              }}
              className="luxury-produce-view-all-btn"
            >
              <span>{lang === 'hi' ? 'पूरी मंडी ब्राउज़ करें' : 'Browse Full Mandi'}</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="luxury-produce-grid">
            {produceItems.map((item) => (
              <div 
                key={item.id} 
                className="luxury-produce-card"
                onClick={() => {
                  soundFX.click();
                  navigate('/marketplace');
                }}
              >
                <div className="luxury-produce-img-box">
                  <img src={item.image} alt={item.nameEn} className="luxury-produce-img" />
                  <span className="luxury-produce-grade-tag">
                    {item.grade}
                  </span>
                </div>

                <div className="luxury-produce-details">
                  <div className="luxury-produce-name">
                    {lang === 'hi' ? item.nameHi : item.nameEn}
                  </div>
                  <div className="luxury-produce-meta">
                    <MapPin size={13} />
                    <span>{item.farmer} • {item.location}</span>
                  </div>

                  <div className="luxury-produce-verified-row">
                    <CheckCircle2 size={13} color="#2E6847" />
                    <span>{item.verifiedQty}</span>
                  </div>

                  <div className="luxury-produce-footer">
                    <span className="luxury-produce-price">{item.price}</span>
                    <span className="luxury-produce-trade-link">
                      {lang === 'hi' ? 'सौदा करें →' : 'Trade →'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE 5 CORE ARCHITECTURAL PILLARS SHOWCASE */}
      <section id="features" className="luxury-section-wrap luxury-pillars-section">
        <div className="luxury-section-inner">
          <div className="luxury-section-heading-block">
            <span className="luxury-section-pill">
              <Layers size={13} />
              <span>INTEGRATED SYSTEM ARCHITECTURE</span>
            </span>
            <h2 className="luxury-section-title">
              {lang === 'hi' ? 'पारदर्शिता के 5 मुख्य स्तंभ' : 'The 5 Core Pillars of MiliGrams'}
            </h2>
            <p className="luxury-section-subtitle">
              {lang === 'hi'
                ? 'मात्रा जवाबदेही, उत्पत्ति सत्यता और किसान सशक्तीकरण के लिए शुरू से अंत तक निर्मित।'
                : 'Engineered from the ground up for quantity accountability, provenance truth, and intelligent farming.'}
            </p>
          </div>

          <div className="luxury-pillars-grid">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.id} 
                  className="luxury-pillar-card"
                  onClick={() => {
                    soundFX.click();
                    navigate(feat.link);
                  }}
                >
                  <div 
                    className="luxury-pillar-icon"
                    style={{ background: `${feat.color}15`, color: feat.color, borderColor: `${feat.color}30` }}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="luxury-pillar-title">
                    {lang === 'hi' ? feat.titleHi : feat.titleEn}
                  </h3>
                  <p className="luxury-pillar-desc">
                    {lang === 'hi' ? feat.descHi : feat.descEn}
                  </p>
                  <div className="luxury-pillar-link" style={{ color: feat.color }}>
                    <span>{lang === 'hi' ? 'विस्तार से देखें' : 'Explore Feature'}</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SPOTLIGHT: FARMISTOR CROP PLANNER BANNER */}
      <section className="luxury-section-wrap luxury-farmistor-banner-wrap">
        <div className="luxury-section-inner">
          <div className="luxury-farmistor-banner">
            <div className="luxury-farmistor-banner-content">
              <div className="luxury-farmistor-pill">
                <Brain size={14} />
                <span>INTELLIGENT PLANNING ENGINE</span>
              </div>

              <h3 className="luxury-farmistor-heading">
                {lang === 'hi'
                  ? 'फार्मिस्टर: बुवाई से पहले मिट्टी, पानी व बजट के अनुसार सही फसल का चयन'
                  : 'Farmistor: Agronomic Intelligence Before You Sow'}
              </h3>

              <p className="luxury-farmistor-sub">
                {lang === 'hi'
                  ? 'अंधेरे में बुवाई करने के दिन खत्म। फार्मिस्टर आपकी जमीन (जलोढ़, काली, दोमट), उपलब्ध पानी (नहर, ट्यूबवेल, ड्रिप) और बजट के अनुसार उपयुक्तता स्कोर (जैसे 96% Match), कुल लागत और शुद्ध लाभ का पारदर्शी नियम-आधारित अनुमान प्रदान करता है।'
                  : 'Input your soil texture, water availability, target season, and financial budget. Farmistor calculates explainable suitability scores, cost breakdowns, and yield projections with side-by-side comparison.'}
              </p>

              <div className="luxury-farmistor-btn-group">
                <button 
                  onClick={handleDiscoverFarmistor}
                  className="luxury-hero-primary-btn"
                >
                  <Brain size={18} />
                  <span>{lang === 'hi' ? 'फार्मिस्टर प्लानर शुरू करें' : 'Launch Farmistor Planner'}</span>
                  <ArrowRight size={17} />
                </button>

                <button 
                  onClick={() => navigate('/ledger')}
                  className="luxury-hero-secondary-btn"
                >
                  <Link2 size={17} />
                  <span>{lang === 'hi' ? 'डिजिटल लेजर देखें' : 'Audit Digital Ledger'}</span>
                </button>
              </div>
            </div>

            {/* Farmistor Teaser Preview Box */}
            <div className="luxury-farmistor-preview-cards">
              <div className="luxury-farmistor-card-featured">
                <div className="luxury-farmistor-card-header">
                  <span className="luxury-farmistor-rank">#1 SUITABILITY MATCH</span>
                  <span className="luxury-farmistor-match-badge">96% MATCH</span>
                </div>
                <h4 className="luxury-farmistor-crop-name">
                  Sharbati Wheat (शरबती गेहूं)
                </h4>
                <div className="luxury-farmistor-specs">
                  Alluvial Soil • Canal Water • Rabi Season • 115–125 Days
                </div>
                <div className="luxury-farmistor-profit-row">
                  <span>Est. Net Profit:</span>
                  <strong className="luxury-profit-green">₹32,000 – ₹43,000 / Acre</strong>
                </div>
              </div>

              <div className="luxury-farmistor-card-secondary">
                <div className="luxury-farmistor-card-header">
                  <span className="luxury-farmistor-rank" style={{ color: '#D6A75C' }}>#2 SUITABILITY MATCH</span>
                  <span className="luxury-farmistor-match-badge" style={{ background: 'rgba(214, 167, 92, 0.2)', color: '#D6A75C' }}>91% MATCH</span>
                </div>
                <h4 className="luxury-farmistor-crop-name">
                  Pusa Bold Mustard (पीली सरसों)
                </h4>
                <div className="luxury-farmistor-specs">
                  Sandy Loam • 1–2 Irrigations • Low Water Risk
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DEDICATED STAKEHOLDER PORTALS */}
      <section id="portals" className="luxury-section-wrap luxury-portals-section">
        <div className="luxury-section-inner">
          <div className="luxury-section-heading-block">
            <span className="luxury-section-pill">
              <Users size={13} />
              <span>PURPOSE-BUILT ROLE WORKSPACES</span>
            </span>
            <h2 className="luxury-section-title">
              {lang === 'hi' ? 'हर हितधारक के लिए समर्पित पोर्टल' : 'Dedicated Portals for Every Actor'}
            </h2>
            <p className="luxury-section-subtitle">
              {lang === 'hi'
                ? 'किसान, गोदाम प्रबंधक, थोक व्यापारी और सरकारी ऑडिटर — सभी के लिए सुगम और सुरक्षित इंटरफेस।'
                : 'Farmers, warehouse operators, grain traders, and state regulators each enjoy a purpose-built workspace.'}
            </p>
          </div>

          <div className="luxury-portals-grid">
            {portalCards.map((portal) => {
              const Icon = portal.icon;
              return (
                <div 
                  key={portal.role} 
                  className="luxury-portal-card"
                  style={{ borderTop: `4px solid ${portal.color}` }}
                  onClick={() => {
                    soundFX.click();
                    navigate(portal.path);
                  }}
                >
                  <div className="luxury-portal-card-top">
                    <div 
                      className="luxury-portal-icon-box"
                      style={{ background: `${portal.color}15`, color: portal.color, borderColor: `${portal.color}30` }}
                    >
                      <Icon size={24} />
                    </div>
                    <span 
                      className="luxury-portal-badge"
                      style={{ background: `${portal.color}15`, color: portal.color, borderColor: `${portal.color}35` }}
                    >
                      {lang === 'hi' ? portal.badgeHi : portal.badgeEn}
                    </span>
                  </div>

                  <h3 className="luxury-portal-title">
                    {lang === 'hi' ? portal.titleHi : portal.titleEn}
                  </h3>
                  <p className="luxury-portal-desc">
                    {lang === 'hi' ? portal.descHi : portal.descEn}
                  </p>

                  <div className="luxury-portal-footer">
                    <span className="luxury-portal-action-text">
                      {lang === 'hi' ? 'कार्यक्षेत्र खोलें' : 'Open Workspace'}
                    </span>
                    <div className="luxury-portal-action-link" style={{ color: portal.color }}>
                      <span>{lang === 'hi' ? 'प्रवेश करें' : 'Enter'}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. AUTHENTIC FIELD PERSPECTIVES: REAL INDIAN AGRICULTURE PHOTOGRAPHY */}
      <section className="luxury-section-wrap luxury-gallery-section">
        <div className="luxury-section-inner">
          <div className="luxury-section-heading-block">
            <span className="luxury-section-pill">
              <Sparkles size={13} />
              <span>AUTHENTIC FIELD PERSPECTIVES</span>
            </span>
            <h2 className="luxury-section-title">
              {lang === 'hi' ? 'भारतीय कृषि का नया डिजिटल सवेरा' : 'A New Digital Dawn for Indian Agriculture'}
            </h2>
            <p className="luxury-section-subtitle">
              {lang === 'hi'
                ? 'पंजाब और हरियाणा के उपजाऊ खेतों से लेकर 25,000 क्विंटल आधुनिक साइलो तक की वास्तविक तस्वीरें।'
                : 'Real photography capturing the harvest rhythm, silo custody, and direct farmer empowerment across Punjab and Haryana.'}
            </p>
          </div>

          <div className="luxury-gallery-grid">
            {fieldPhotos.map((photo) => (
              <div key={photo.id} className="luxury-gallery-card">
                <div className="luxury-gallery-img-wrap">
                  <img src={photo.image} alt={photo.titleEn} className="luxury-gallery-img" />
                </div>
                <div className="luxury-gallery-info">
                  <h4 className="luxury-gallery-title">
                    {lang === 'hi' ? photo.titleHi : photo.titleEn}
                  </h4>
                  <p className="luxury-gallery-caption">
                    {lang === 'hi' ? photo.captionHi : photo.captionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SUPPLY CHAIN IMPACT TESTIMONIALS */}
      <section id="testimonials" className="luxury-section-wrap luxury-testimonials-section">
        <div className="luxury-section-inner">
          <div className="luxury-section-heading-block">
            <span className="luxury-section-pill" style={{ color: '#D6A75C', borderColor: 'rgba(214, 167, 92, 0.35)', background: 'rgba(214, 167, 92, 0.12)' }}>
              <Star size={13} />
              <span>GROUND-LEVEL IMPACT</span>
            </span>
            <h2 className="luxury-section-title">
              {lang === 'hi' ? 'खेत और मंडी से वास्तविक अनुभव' : 'Verified Voices Across the Supply Chain'}
            </h2>
          </div>

          <div className="luxury-testimonials-grid">
            {testimonials.map((test) => (
              <div key={test.id} className="luxury-testimonial-card">
                <div className="luxury-testimonial-header">
                  <div className="luxury-testimonial-avatar">
                    {test.nameEn.charAt(0)}
                  </div>
                  <div>
                    <h4 className="luxury-testimonial-name">
                      {lang === 'hi' ? test.nameHi : test.nameEn}
                    </h4>
                    <span className="luxury-testimonial-role">
                      {lang === 'hi' ? test.roleHi : test.roleEn}
                    </span>
                  </div>
                </div>

                <p className="luxury-testimonial-quote">
                  "{lang === 'hi' ? test.quoteHi : test.quoteEn}"
                </p>

                <div className="luxury-testimonial-footer">
                  <div className="luxury-testimonial-stars">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={14} color="#D6A75C" fill="#D6A75C" />
                    ))}
                  </div>
                  <span className="luxury-testimonial-badge">
                    {lang === 'hi' ? test.badgeHi : test.badgeEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER & AGRI BULLETIN DISPATCH */}
      <section className="luxury-section-wrap luxury-newsletter-section">
        <div className="luxury-section-inner">
          <div className="luxury-newsletter-box">
            <div>
              <span className="luxury-newsletter-tag">AGRITECH DISPATCH & MANDI BULLETIN</span>
              <h3 className="luxury-newsletter-heading">
                {lang === 'hi' ? 'ताज़ा मंडी भाव व लेजर बुलेटिन प्राप्त करें' : 'Fresh Harvest Alerts & Daily Mandi Rates'}
              </h3>
              <p className="luxury-newsletter-sub">
                {lang === 'hi' 
                  ? 'सीधे अपने ईमेल पर पाएं 15-दिन शेल्फ लाइफ छूट, सत्यापित साइलो क्षमता और नए फसल लॉट की सूचना।'
                  : 'Subscribe to receive certified lot alerts, wholesale price indices, and transparent ledger dispatches.'}
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="luxury-newsletter-form">
              <div className="luxury-newsletter-input-group">
                <input
                  type="email"
                  placeholder={lang === 'hi' ? 'अपना ईमेल दर्ज करें...' : 'Enter your email...'}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="luxury-newsletter-input"
                  required
                />
                <button type="submit" className="luxury-newsletter-submit-btn">
                  {newsletterSent ? <Check size={16} /> : <Send size={16} />}
                  <span>{newsletterSent ? (lang === 'hi' ? 'जुड़ गए!' : 'Subscribed') : (lang === 'hi' ? 'सब्सक्राइब' : 'Subscribe')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 11. REFINED EDITORIAL FOOTER */}
      <footer className="luxury-footer">
        <div className="luxury-footer-container">
          <div className="luxury-footer-brand-col">
            <div className="luxury-footer-brand-title">MiliGrams®</div>
            <p className="luxury-footer-brand-desc">
              {lang === 'hi'
                ? 'खेत से खरीदार तक, हर ग्राम का सच्चा हिसाब। अपरिवर्तनीय SHA-256 लेजर और किसान-केंद्रित एग्रोटेक प्लेटफॉर्म।'
                : 'From Farm to Buyer, Every Gram Accountable. A tamper-evident digital ledger and agronomic planning platform for Indian agriculture.'}
            </p>
            <div className="luxury-footer-copyright">
              © 2026 MiliGrams AgriTech. All rights reserved.
            </div>
          </div>

          <div className="luxury-footer-links-col">
            <h5 className="luxury-footer-col-title">{lang === 'hi' ? 'प्लेटफॉर्म' : 'Platform'}</h5>
            <ul className="luxury-footer-list">
              <li><a onClick={() => navigate('/marketplace')}>{lang === 'hi' ? 'ताज़ा मंडी (Marketplace)' : 'Marketplace'}</a></li>
              <li><a onClick={() => navigate('/farmistor')}>{lang === 'hi' ? 'फार्मिस्टर (Crop Planner)' : 'Farmistor Planner'}</a></li>
              <li><a onClick={() => navigate('/ledger')}>{lang === 'hi' ? 'डिजिटल लेजर (Explorer)' : 'Ledger Explorer'}</a></li>
              <li><a onClick={() => navigate('/farmer')}>{lang === 'hi' ? 'किसान पोर्टल (Farmer)' : 'Farmer Portal'}</a></li>
            </ul>
          </div>

          <div className="luxury-footer-links-col">
            <h5 className="luxury-footer-col-title">{lang === 'hi' ? 'कार्यक्षेत्र' : 'Workspaces'}</h5>
            <ul className="luxury-footer-list">
              <li><a onClick={() => navigate('/warehouse')}>{lang === 'hi' ? 'गोदाम साइलो (Warehouse)' : 'Silo Warehouse'}</a></li>
              <li><a onClick={() => navigate('/admin')}>{lang === 'hi' ? 'गवर्नेंस व ऑडिट (Admin)' : 'Admin Governance'}</a></li>
              <li><a onClick={() => navigate('/notifications')}>{lang === 'hi' ? 'सूचना केंद्र (Alerts)' : 'Notifications'}</a></li>
              <li><a onClick={() => navigate('/settings')}>{lang === 'hi' ? 'सिस्टम सेटिंग्स (Settings)' : 'Settings'}</a></li>
            </ul>
          </div>

          <div className="luxury-footer-links-col">
            <h5 className="luxury-footer-col-title">{lang === 'hi' ? 'सुरक्षा व तकनीक' : 'Governance & Tech'}</h5>
            <ul className="luxury-footer-list">
              <li><span>SHA-256 Chained Hash</span></li>
              <li><span>Merkle Tree Root Proof</span></li>
              <li><span>AgriStack KYC Integration</span></li>
              <li><span>15-Day Aging Protection</span></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

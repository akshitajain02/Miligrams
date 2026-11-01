import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Building2, ShoppingBag, ShieldCheck, 
  ArrowRight, CheckCircle2, ChevronLeft, Globe, 
  Sun, Moon, Sparkles, Scale, Database, Shield, Award,
  Clock, Lock, Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { soundFX } from '../utils/audioFX';

export default function RoleSelectionPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();
  const { login, currentUser, currentRole } = useAuth();
  const [hoveredRole, setHoveredRole] = useState(null);

  const roles = [
    {
      id: 'farmer',
      route: '/farmer',
      titleHi: 'किसान पोर्टल (Farmer)',
      titleEn: 'Farmer Sovereign Portal',
      badgeHi: 'आवाज व टच AI',
      badgeEn: 'VOICE ASSISTED',
      taglineHi: 'फसल घोषणा, डिजिटल किसान पर्ची और उत्पत्ति प्रमाण',
      taglineEn: 'Harvest Declaration, Digital Kisan Receipts & Provenance Birth',
      descHi: 'अपनी उपज की मात्रा, किस्म और कटाई दर्ज करें। धर्मकांटा वजन का पारदर्शी हिसाब रखें और सीधे व्यापारियों से जुड़ें।',
      descEn: 'Register crop batches, track declared vs verified weights, view immutable custody receipts, and access fair-trade buyers.',
      icon: Sprout,
      color: '#2E6847',
      bgGlow: 'rgba(46, 104, 71, 0.12)',
      features: [
        lang === 'hi' ? 'विशिष्ट Farmer ID व AgriStack KYC' : 'Unique Farmer ID & AgriStack KYC',
        lang === 'hi' ? 'घोषित बनाम सत्यापित वजन पारदर्शकता' : 'Declared vs Verified Weight Tracking',
        lang === 'hi' ? 'डिजिटल किसान पर्ची व लेजर हैश' : 'Digital Kisan Receipts & Block Hashes',
        lang === 'hi' ? 'फार्मिस्टर स्मार्ट फसल योजना' : 'Farmistor Agronomic Crop Planning'
      ]
    },
    {
      id: 'warehouse',
      route: '/warehouse',
      titleHi: 'स्मार्ट गोदाम ऑपरेटर (Warehouse)',
      titleEn: 'Smart Warehouse Silo Hub',
      badgeHi: 'साइलो लॉजिस्टिक्स',
      badgeEn: 'SILO LOGISTICS',
      taglineHi: 'धर्मकांटा वजन सत्यापन, नमी जांच व 15-दिन ऑडिट',
      taglineEn: 'Certified Weighbridge Scale Verification & Storage Telemetry',
      descHi: 'आवक फसल लॉट्स का धर्मकांटा वजन रिकॉर्ड करें, मात्रा अंतर (Discrepancy) दर्ज करें और 25,000 क्विंटल साइलो का प्रबंधन करें।',
      descEn: 'Log incoming harvest batches on certified scales, record dockage deductions, allocate climate bays, and run 15-day aging audits.',
      icon: Building2,
      color: '#D6A75C',
      bgGlow: 'rgba(214, 167, 92, 0.14)',
      features: [
        lang === 'hi' ? '25,000 क्विंटल आधुनिक साइलो क्षमता' : '25,000 Quintal Modern Silo Capacity',
        lang === 'hi' ? 'धर्मकांटा वजन अंतर (Discrepancy) मिलान' : 'Automated Gate Discrepancy Calculator',
        lang === 'hi' ? '15-दिन आवधिक स्टॉक सत्यापन अलार्म' : '15-Day Periodic Stock Audit Alarms',
        lang === 'hi' ? 'अपरिवर्तनीय गोदाम रसीद ब्लॉक मिंटिंग' : 'Immutable Intake Block Minting'
      ]
    },
    {
      id: 'buyer',
      route: '/buyer',
      titleHi: 'थोक व्यापारी मंडी (Commodity Buyer)',
      titleEn: 'Commodity Buyer Exchange',
      badgeHi: 'थोक व्यापार',
      badgeEn: 'FAIR-TRADE',
      taglineHi: 'सीधी किसान खरीद, 100% सत्यापन व 15-दिन छूट',
      taglineEn: 'Direct Farm Procurement with 100% Verified Traceability',
      descHi: 'प्रमाणित किसानों से सीधे थोक कृषि उत्पाद खरीदें। पूर्ण फसल इतिहास देखें और 15-दिन शेल्फ-लाइफ छूट का लाभ उठाएं।',
      descEn: 'Procure verified crops directly from KYC-checked growers. Inspect full weighbridge provenance and settle trades instantly.',
      icon: ShoppingBag,
      color: '#173D2B',
      bgGlow: 'rgba(23, 61, 43, 0.12)',
      features: [
        lang === 'hi' ? 'केवल AgriStack-सत्यापित किसान उपज' : 'AgriStack-Verified Harvests Only',
        lang === 'hi' ? '15-दिन शेल्फ लाइफ मूल्य सुरक्षा छूट' : '15-Day Aging Shelf-Life Discounts',
        lang === 'hi' ? 'खेत से धर्मकांटा तक संपूर्ण टाइमलाइन' : 'Farm-to-Gate Traceability Dossiers',
        lang === 'hi' ? 'किसान समीक्षा व 5-स्टार रेटिंग प्रणाली' : 'Post-Settlement Farmer Review System'
      ]
    },
    {
      id: 'admin',
      route: '/admin',
      titleHi: 'सिस्टम एडमिन व लेजर (Governance)',
      titleEn: 'Cryptographic Ledger & Admin',
      badgeHi: 'लेजर गवर्नेंस',
      badgeEn: 'GOVERNANCE',
      taglineHi: 'SHA-256 ब्लॉकचेन ऑडिट, किसान KYC व सिस्टम कंट्रोल',
      taglineEn: 'Zero-Trust Cryptographic Audit & AgriStack KYC Desk',
      descHi: 'संपूर्ण लेजर की SHA-256 अखंडता जांचें, किसान पहचान पत्रों की समीक्षा करें और 15-दिन एजिंग चक्र स्वचालित करें।',
      descEn: 'Audit cryptographic SHA-256 event chains, review pending farmer KYC applications, and simulate ledger tampering.',
      icon: ShieldCheck,
      color: '#202720',
      bgGlow: 'rgba(32, 39, 32, 0.12)',
      features: [
        lang === 'hi' ? 'SHA-256 ब्लॉकचेन सत्यापन व मर्कल ट्री' : 'SHA-256 Cryptographic Chain Verification',
        lang === 'hi' ? 'आधार व खतौनी किसान KYC अनुमोदन डेस्क' : 'Aadhaar & Land Khatauni KYC Approval Desk',
        lang === 'hi' ? '15-दिन फसल एजिंग ऑटोमेशन इंजन' : '15-Day Aging Cycle Automation Engine',
        lang === 'hi' ? 'अकादमिक छेड़छाड़ परीक्षण (Tamper Sandbox)' : 'Interactive Academic Tamper Sandbox'
      ]
    }
  ];

  const handleSelectRole = (role) => {
    soundFX.click();
    // Auto-login with default role entity
    const defaultUserMap = {
      farmer: { uniqueId: 'FARMER-101', name: 'Ramesh Patel', role: 'farmer' },
      warehouse: { uniqueId: 'WH-CENTRAL-01', name: 'Ambala Logistics Hub', role: 'warehouse' },
      buyer: { uniqueId: 'BUYER-501', name: 'Punjab Agri Commodities Ltd.', role: 'buyer' },
      admin: { uniqueId: 'ADMIN-SYS-01', name: 'Miligrams Chief Auditor', role: 'admin' }
    };
    login(defaultUserMap[role.id]);
    navigate(role.route);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Bar */}
      <header style={{ maxWidth: '1200px', margin: '0 auto 2.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
        <button 
          onClick={() => { soundFX.click(); navigate('/'); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
        >
          <ChevronLeft size={18} />
          <span>{lang === 'hi' ? 'होम पेज पर वापस' : 'Back to Home'}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--forest-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F6F4EC' }}>
            <Sprout size={18} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--text-main)' }}>Miligrams</h2>
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>ROLE SELECTOR</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => { soundFX.click(); setLang(lang === 'hi' ? 'en' : 'hi'); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}
          >
            <Globe size={13} />
            <span>{lang === 'hi' ? 'English' : 'हिन्दी'}</span>
          </button>
          {toggleTheme && (
            <button
              onClick={() => { soundFX.click(); toggleTheme(); }}
              style={{ padding: '0.35rem 0.65rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', cursor: 'pointer' }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} color="#D6A75C" /> : <Moon size={14} color="#173D2B" />}
            </button>
          )}
        </div>
      </header>

      {/* Main Title Section */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', flex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.9rem', borderRadius: '999px', background: 'rgba(46, 104, 71, 0.1)', border: '1px solid var(--border)', color: 'var(--botanical-green)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            <Sparkles size={13} />
            <span>{lang === 'hi' ? 'पारदर्शी कृषि पारिस्थितिकी तंत्र' : 'Agricultural Sovereign Ecosystem'}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, margin: '0 0 0.75rem', color: 'var(--text-main)', lineHeight: 1.2 }}>
            {lang === 'hi' ? 'अपनी भूमिका का चयन करें' : 'Choose Your Sovereign Portal'}
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            {lang === 'hi'
              ? 'मिलीग्राम्स में किसान, गोदाम ऑपरेटर, थोक खरीदार और सिस्टम एडमिन के लिए अलग-अलग विशिष्ट डैशबोर्ड और सुरक्षा अनुमतियाँ उपलब्ध हैं।'
              : 'Every stakeholder in the agricultural value chain operates with sovereign identity, dedicated tooling, and verifiable cryptographic accountability.'}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {roles.map((role) => {
            const Icon = role.icon;
            const isHovered = hoveredRole === role.id;

            return (
              <div
                key={role.id}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                style={{
                  background: 'var(--surface-card)',
                  border: `1.5px solid ${isHovered ? role.color : 'var(--border)'}`,
                  borderRadius: '16px',
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isHovered ? `0 16px 36px -8px ${role.bgGlow}` : 'var(--shadow-sm)',
                  transform: isHovered ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Top Badge & Icon */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${role.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: role.color }}>
                      <Icon size={24} />
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '999px', background: `${role.color}15`, color: role.color, border: `1px solid ${role.color}35`, letterSpacing: '0.05em' }}>
                      {lang === 'hi' ? role.badgeHi : role.badgeEn}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 0 0.35rem', color: 'var(--text-main)' }}>
                    {lang === 'hi' ? role.titleHi : role.titleEn}
                  </h3>
                  
                  <p style={{ fontSize: '0.78rem', fontWeight: 600, color: role.color, margin: '0 0 0.85rem' }}>
                    {lang === 'hi' ? role.taglineHi : role.taglineEn}
                  </p>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
                    {lang === 'hi' ? role.descHi : role.descEn}
                  </p>

                  {/* Feature Bullets */}
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {role.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-main)' }}>
                        <Check size={13} color={role.color} style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enter Button */}
                <button
                  onClick={() => handleSelectRole(role)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: role.color,
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: `0 4px 14px ${role.bgGlow}`,
                    transition: 'opacity 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <span>{lang === 'hi' ? 'प्रवेश करें' : 'Access Portal'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Info Banner */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Lock size={20} color="var(--botanical-green)" />
            <div>
              <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'सुरक्षित व संप्रभु डिजिटल पहचान' : 'Sovereign Agricultural Identity'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {lang === 'hi' 
                  ? 'हर लेनदेन SHA-256 अपरिवर्तनीय लेजर पर ब्लॉक के रूप में दर्ज होता है।' 
                  : 'All actions append tamper-evident SHA-256 blocks with deterministic Merkle verification.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => { soundFX.click(); navigate('/login'); }}
              style={{ background: 'none', border: 'none', color: 'var(--botanical-green)', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
            >
              {lang === 'hi' ? 'विशिष्ट क्रेडेंशियल्स से लॉगिन करें →' : 'Sign in with Custom Credentials →'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

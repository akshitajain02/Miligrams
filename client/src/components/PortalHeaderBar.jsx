import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Sprout, Building2, ShoppingBag, ShieldCheck, 
  Scan, Globe, Sun, Moon, Home, Sparkles 
} from 'lucide-react';
import { soundFX } from '../utils/audioFX';

export default function PortalHeaderBar({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {},
  currentPortal = 'farmer'
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackHome = () => {
    soundFX.click();
    navigate('/');
  };

  const navItems = [
    { id: 'farmer', path: '/farmer', labelHi: '🌾 किसान', labelEn: '🌾 Farmer', color: '#10b981' },
    { id: 'warehouse', path: '/warehouse', labelHi: '🏢 गोदाम', labelEn: '🏢 Warehouse', color: '#f59e0b' },
    { id: 'buyer', path: '/buyer', labelHi: '🛍️ मंडी', labelEn: '🛍️ Buyer', color: '#06b6d4' },
    { id: 'admin', path: '/admin', labelHi: '🛡️ एडमिन', labelEn: '🛡️ Admin', color: '#8b5cf6' },
    { id: 'vision', path: '/vision', labelHi: '🔬 AI विज़न', labelEn: '🔬 AI Vision', color: '#10b981' }
  ];

  return (
    <div className="portal-top-header-bar">
      {/* 1. Left Return Home Button */}
      <div className="portal-header-left">
        <button
          onClick={handleBackHome}
          className="portal-back-home-btn"
          title={lang === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएँ' : 'Return to Front Page'}
        >
          <ArrowLeft size={18} className="portal-back-arrow" />
          <span className="portal-back-text">
            {lang === 'hi' ? '← मुख्य पृष्ठ (Home)' : '← Back to Home'}
          </span>
        </button>

        {/* Brand Masthead mark */}
        <div 
          className="portal-brand-mark"
          onClick={handleBackHome}
          title="MiliGrams Home"
        >
          <span className="portal-brand-text">MiliGrams</span>
          <span className="portal-brand-reg">®</span>
        </div>
      </div>

      {/* 2. Center Quick Portal Switcher Pills */}
      <div className="portal-header-switcher">
        {navItems.map(item => {
          const isActive = location.pathname === item.path || currentPortal === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundFX.click();
                navigate(item.path);
              }}
              className={`portal-pill-btn ${isActive ? 'portal-pill-active' : ''}`}
              style={isActive ? { borderColor: item.color, background: `${item.color}18`, color: 'var(--text-main)' } : {}}
              title={lang === 'hi' ? `${item.labelHi} पोर्टल पर जाएँ` : `Switch to ${item.labelEn}`}
            >
              <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
              {isActive && <span className="portal-active-dot" style={{ background: item.color }} />}
            </button>
          );
        })}
      </div>

      {/* 3. Right Utility Actions */}
      <div className="portal-header-right">
        {/* Language switch */}
        <button
          onClick={() => {
            soundFX.click();
            setLang(lang === 'hi' ? 'en' : 'hi');
          }}
          className="portal-util-btn"
          title={lang === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
        >
          <Globe size={14} />
          <span style={{ fontWeight: 700, fontSize: '0.78rem' }}>
            {lang === 'hi' ? 'English' : 'हिन्दी'}
          </span>
        </button>

        {/* Theme toggle */}
        {toggleTheme && (
          <button
            onClick={() => {
              soundFX.click();
              toggleTheme();
            }}
            className="portal-util-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#183b28" />}
          </button>
        )}
      </div>
    </div>
  );
}

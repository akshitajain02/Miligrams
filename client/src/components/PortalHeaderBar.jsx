import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Sprout, Building2, ShoppingBag, ShieldCheck, 
  Globe, Sun, Moon, Sparkles, Bell, Compass, Cpu
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
    { id: 'farmer', path: '/farmer', labelHi: '🌾 किसान', labelEn: '🌾 Farmer', color: '#2E6847' },
    { id: 'warehouse', path: '/warehouse', labelHi: '🏢 गोदाम', labelEn: '🏢 Warehouse', color: '#D6A75C' },
    { id: 'marketplace', path: '/marketplace', labelHi: '🛍️ मंडी', labelEn: '🛍️ Marketplace', color: '#2E6847' },
    { id: 'farmistor', path: '/farmistor', labelHi: '🧠 फार्मिस्टर', labelEn: '🧠 Farmistor', color: '#8DBB78' },
    { id: 'ledger', path: '/ledger', labelHi: '🔗 लेजर', labelEn: '🔗 Ledger', color: '#173D2B' },
    { id: 'admin', path: '/admin', labelHi: '🛡️ एडमिन', labelEn: '🛡️ Admin', color: '#202720' }
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
          <ArrowLeft size={16} className="portal-back-arrow" />
          <span className="portal-back-text">
            {lang === 'hi' ? '← मुख्य पृष्ठ' : '← Back to Home'}
          </span>
        </button>

        {/* Brand Masthead mark */}
        <div 
          className="portal-brand-mark"
          onClick={handleBackHome}
          title="MiliGrams — From Farm to Buyer, Every Gram Accountable"
        >
          <span className="portal-brand-text">MiliGrams</span>
          <span className="portal-brand-reg">®</span>
          <span className="portal-brand-tagline">Every Gram Accountable</span>
        </div>
      </div>

      {/* 2. Center Quick Portal Switcher Pills */}
      <div className="portal-header-switcher">
        {navItems.map(item => {
          const isActive = location.pathname === item.path || 
            (item.id === 'marketplace' && (location.pathname === '/marketplace' || location.pathname === '/buyer')) ||
            (item.id === 'ledger' && location.pathname.startsWith('/ledger')) ||
            currentPortal === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                soundFX.click();
                navigate(item.path);
              }}
              className={`portal-pill-btn ${isActive ? 'portal-pill-active' : ''}`}
              style={isActive ? { borderColor: item.color, background: `${item.color}15`, color: 'var(--text-main)' } : {}}
              title={lang === 'hi' ? `${item.labelHi} खोलें` : `Switch to ${item.labelEn}`}
            >
              <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
              {isActive && <span className="portal-active-dot" style={{ background: item.color }} />}
            </button>
          );
        })}
      </div>

      {/* 3. Right Utility Actions */}
      <div className="portal-header-right">
        {/* Notifications Icon Button */}
        <button
          onClick={() => {
            soundFX.click();
            navigate('/notifications');
          }}
          className="portal-util-btn"
          style={{ position: 'relative' }}
          title={lang === 'hi' ? 'सूचनाएं' : 'Notifications'}
        >
          <Bell size={14} />
          <span style={{ 
            position: 'absolute', 
            top: '4px', 
            right: '4px', 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            background: '#D6A75C' 
          }} />
        </button>

        {/* Language switch */}
        <button
          onClick={() => {
            soundFX.click();
            setLang(lang === 'hi' ? 'en' : 'hi');
          }}
          className="portal-util-btn"
          title={lang === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
        >
          <Globe size={13} />
          <span style={{ fontWeight: 700, fontSize: '0.78rem' }}>
            {lang === 'hi' ? 'EN' : 'हि'}
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
            {theme === 'dark' ? <Sun size={14} color="#D6A75C" /> : <Moon size={14} color="#173D2B" />}
          </button>
        )}
      </div>
    </div>
  );
}

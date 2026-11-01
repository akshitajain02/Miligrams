import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, User, Globe, Sun, Moon, ShieldCheck, 
  Database, Volume2, LogOut, CheckCircle2, ChevronRight
} from 'lucide-react';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { useAuth } from '../context/AuthContext';
import { soundFX } from '../utils/audioFX';

export default function SettingsPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();
  const { currentUser, currentRole, logout } = useAuth();

  const handleRoleJump = (role) => {
    soundFX.click();
    navigate(`/${role}`);
  };

  return (
    <div className="settings-page-container">
      <PortalHeaderBar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentPortal="farmer" 
      />

      <div className="settings-main-wrapper">
        <div className="settings-header">
          <div className="farmistor-pill-tag">
            <Settings size={13} />
            <span>PLATFORM PREFERENCES</span>
          </div>
          <h1 className="settings-title">
            {lang === 'hi' ? 'खाता व प्रणाली सेटिंग्स' : 'Account & System Settings'}
          </h1>
          <p className="settings-subtitle">
            {lang === 'hi' 
              ? 'अपनी प्रोफाइल, भाषा, डार्क/लाइट थीम और ब्लॉकचेन लेजर कनेक्टिविटी का प्रबंधन करें।' 
              : 'Configure your profile credentials, locale, display theme, and active role workspace.'}
          </p>
        </div>

        <div className="settings-grid">
          {/* Section 1: Active User & Role */}
          <div className="glass-panel settings-card">
            <div className="settings-card-header">
              <User size={18} color="#2E6847" />
              <h3>{lang === 'hi' ? 'सक्रिय उपयोगकर्ता व भूमिका' : 'Active Account Profile'}</h3>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                {currentUser?.name || 'Authorized AgriTech Operator'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                ID: <code style={{ color: 'var(--primary)', fontWeight: 700 }}>{currentUser?.uniqueId || 'FARMER-101'}</code>
                {' '}• Role: <span style={{ textTransform: 'uppercase', fontWeight: 800, color: '#D6A75C' }}>{currentRole || 'farmer'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/login')} className="btn btn-secondary btn-sm">
                <span>{lang === 'hi' ? 'भूमिका बदलें' : 'Switch Role'}</span>
                <ChevronRight size={13} />
              </button>
              <button onClick={() => { soundFX.click(); logout(); navigate('/login'); }} className="btn btn-secondary btn-sm" style={{ color: '#dc2626' }}>
                <LogOut size={13} />
                <span>{lang === 'hi' ? 'लॉगआउट' : 'Log Out'}</span>
              </button>
            </div>
          </div>

          {/* Section 2: Appearance & Theme */}
          <div className="glass-panel settings-card">
            <div className="settings-card-header">
              <Sun size={18} color="#D6A75C" />
              <h3>{lang === 'hi' ? 'थीम व डिस्प्ले मोड' : 'Display & Theme Mode'}</h3>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {lang === 'hi' 
                ? 'वार्म आइवरी लिनन (Figma Natural Light) या डीप बॉटनिकल फ़ॉरेस्ट डार्क मोड चुनें।'
                : 'Choose between Warm Natural Ivory Linen or Deep Obsidian Forest Dark theme.'}
            </p>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <button
                onClick={() => { if (theme !== 'light') toggleTheme(); }}
                className={`btn btn-sm ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.6rem' }}
              >
                <Sun size={15} />
                <span>Warm Ivory (Light)</span>
              </button>

              <button
                onClick={() => { if (theme !== 'dark') toggleTheme(); }}
                className={`btn btn-sm ${theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.6rem' }}
              >
                <Moon size={15} />
                <span>Deep Forest (Dark)</span>
              </button>
            </div>
          </div>

          {/* Section 3: Language & Localization */}
          <div className="glass-panel settings-card">
            <div className="settings-card-header">
              <Globe size={18} color="#0284c7" />
              <h3>{lang === 'hi' ? 'भाषा प्राथमिकता (Language)' : 'Language & Localization'}</h3>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {lang === 'hi' 
                ? 'किसान भाइयों के लिए संपूर्ण हिन्दी भाषा व अंग्रेजी इंटरफेस का त्वरित चयन।'
                : 'Full interface translation across Hindi and English for accessible farmer usability.'}
            </p>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <button
                onClick={() => { soundFX.click(); setLang('hi'); }}
                className={`btn btn-sm ${lang === 'hi' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.6rem' }}
              >
                <span>हिन्दी (Hindi)</span>
              </button>

              <button
                onClick={() => { soundFX.click(); setLang('en'); }}
                className={`btn btn-sm ${lang === 'en' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flex: 1, padding: '0.6rem' }}
              >
                <span>English (UK/IN)</span>
              </button>
            </div>
          </div>

          {/* Section 4: Cryptographic Ledger Network */}
          <div className="glass-panel settings-card">
            <div className="settings-card-header">
              <ShieldCheck size={18} color="#2E6847" />
              <h3>{lang === 'hi' ? 'क्रिप्टोग्राफिक लेजर कनेक्टिविटी' : 'Ledger Network Status'}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Ledger Protocol:</span>
                <strong style={{ color: 'var(--text-main)' }}>SHA-256 Chained Hash & Merkle</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Genesis State:</span>
                <strong style={{ color: '#2E6847' }}>Sealed & Validated</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Database Engine:</span>
                <strong style={{ color: 'var(--text-main)' }}>Embedded High-Reliability MongoDB</strong>
              </div>
            </div>

            <button
              onClick={() => navigate('/ledger')}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%' }}
            >
              <span>{lang === 'hi' ? 'लेजर एक्सप्लोरर खोलें' : 'Open Ledger Explorer'}</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

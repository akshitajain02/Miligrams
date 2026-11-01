import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, CheckCircle2, AlertTriangle, Building2, ShoppingBag, 
  Sprout, ShieldCheck, Clock, Trash2, ArrowRight
} from 'lucide-react';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { soundFX } from '../utils/audioFX';

export default function NotificationsPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warehouse',
      titleHi: 'गोदाम आवक वजन सत्यापन संपन्न',
      titleEn: 'Warehouse Intake Verified & Sealed',
      descHi: 'लॉट #1042 (शरबती गेहूं): 1,200 kg का धर्मकांटा वजन 100% मिलान के साथ साइलो अल्फा बे-3 में दर्ज हुआ।',
      descEn: 'Lot #1042 (Sharbati Wheat): 1,200 kg verified with 0 kg variance. Stored in Silo Alpha Bay 3.',
      time: '10 मिनट पूर्व (10 mins ago)',
      read: false,
      link: '/crop/1042'
    },
    {
      id: 2,
      type: 'kyc',
      titleHi: 'एग्रीस्टैक केवाईसी सत्यापन स्वीकृत',
      titleEn: 'AgriStack KYC Verification Approved',
      descHi: 'किसान रमेश पटेल (FARMER-101) का आधार व खतौनी सत्यापन सफल रहा। मंडी में असीमित थोक बिक्री सक्रिय है।',
      descEn: 'Farmer Ramesh Patel (FARMER-101) Aadhaar and Khatauni verification approved by state admin.',
      time: '2 घंटे पूर्व (2 hrs ago)',
      read: false,
      link: '/farmer'
    },
    {
      id: 3,
      type: 'marketplace',
      titleHi: 'थोक खरीद आदेश प्राप्त हुआ',
      titleEn: 'New Wholesale Procurement Order',
      descHi: 'पंजाब एग्री कमोडिटीज ने 790 kg बासमती चावल का ₹53,720 में ऑर्डर कन्फर्म किया।',
      descEn: 'Punjab Agri Commodities Ltd. placed a purchase order for 790 kg Royal Basmati Rice (₹53,720).',
      time: '1 दिन पूर्व (1 day ago)',
      read: true,
      link: '/marketplace'
    },
    {
      id: 4,
      type: 'aging',
      titleHi: '15-दिन शेल्फ-लाइफ स्वचालित समीक्षा',
      titleEn: '15-Day Stock Aging Review Notice',
      descHi: 'गोदाम स्टॉक #WH-NORTH-02: 15-दिन चक्र पूरा होने पर स्वतः 20% मूल्य छूट लागू कर दी गई है।',
      descEn: 'Warehouse batch completed 15-day unsold window. Automated 20% promotional discount applied.',
      time: '2 दिन पूर्व (2 days ago)',
      read: true,
      link: '/ledger'
    }
  ]);

  const [activeTab, setActiveTab] = useState('ALL');

  const markAllRead = () => {
    soundFX.click();
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    soundFX.click();
    setNotifications([]);
  };

  const filtered = notifications.filter(n => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'UNREAD') return !n.read;
    return n.type === activeTab;
  });

  return (
    <div className="notifications-page-container">
      <PortalHeaderBar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentPortal="farmer" 
      />

      <div className="notifications-main-wrapper">
        <div className="notifications-header">
          <div>
            <div className="farmistor-pill-tag">
              <Bell size={13} />
              <span>COMMUNICATION DISPATCH</span>
            </div>
            <h1 className="notifications-title">
              {lang === 'hi' ? 'सूचनाएं व गतिविधि केंद्र' : 'Platform Notifications & Alerts'}
            </h1>
            <p className="notifications-subtitle">
              {lang === 'hi' 
                ? 'फसल सत्यापन, गोदाम तौल रसीद, केवाईसी अनुमोदन और मंडी सौदों की सीधी रीयल-टाइम अपडेट।'
                : 'Real-time telemetry on crop verifications, warehouse arrivals, KYC audits, and trade settlements.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button onClick={markAllRead} className="btn btn-secondary btn-sm">
              <CheckCircle2 size={14} />
              <span>{lang === 'hi' ? 'सभी पढ़ा हुआ मार्क करें' : 'Mark All Read'}</span>
            </button>
            <button onClick={clearAll} className="btn btn-secondary btn-sm" style={{ color: '#dc2626' }}>
              <Trash2 size={14} />
              <span>{lang === 'hi' ? 'साफ करें' : 'Clear All'}</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="notifications-filter-bar">
          {[
            { id: 'ALL', label: 'All Updates' },
            { id: 'UNREAD', label: 'Unread Only' },
            { id: 'warehouse', label: 'Warehouse & Silo' },
            { id: 'marketplace', label: 'Marketplace' },
            { id: 'kyc', label: 'KYC & Governance' },
            { id: 'aging', label: '15-Day Aging' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => { soundFX.click(); setActiveTab(f.id); }}
              className={`ledger-filter-chip ${activeTab === f.id ? 'active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filtered.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Bell size={36} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }} />
              <h3>{lang === 'hi' ? 'कोई नई सूचना नहीं है' : 'No notifications in this category'}</h3>
              <p>{lang === 'hi' ? 'आपके सभी कार्य अद्यतित और सुरक्षित हैं।' : 'All system records and verifications are up to date.'}</p>
            </div>
          ) : (
            filtered.map(item => (
              <div 
                key={item.id} 
                className={`glass-panel notification-card ${!item.read ? 'notification-card-unread' : ''}`}
              >
                <div className="notification-icon-wrap" style={{
                  background: item.type === 'warehouse' ? 'rgba(214, 167, 92, 0.15)' :
                    item.type === 'kyc' ? 'rgba(46, 104, 71, 0.15)' :
                    item.type === 'marketplace' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(23, 61, 43, 0.15)',
                  color: item.type === 'warehouse' ? '#D6A75C' :
                    item.type === 'kyc' ? '#2E6847' :
                    item.type === 'marketplace' ? '#0284c7' : '#173D2B'
                }}>
                  {item.type === 'warehouse' ? <Building2 size={20} /> :
                   item.type === 'kyc' ? <ShieldCheck size={20} /> :
                   item.type === 'marketplace' ? <ShoppingBag size={20} /> : <Clock size={20} />}
                </div>

                <div className="notification-body">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 className="notification-item-title">
                      {lang === 'hi' ? item.titleHi : item.titleEn}
                    </h3>
                    <span className="notification-time">{item.time}</span>
                  </div>

                  <p className="notification-desc">
                    {lang === 'hi' ? item.descHi : item.descEn}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.65rem' }}>
                    <button
                      onClick={() => navigate(item.link)}
                      className="btn-link"
                      style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <span>{lang === 'hi' ? 'विवरण देखें' : 'View Event'}</span>
                      <ArrowRight size={13} />
                    </button>
                    {!item.read && (
                      <span className="badge" style={{ background: 'rgba(214, 167, 92, 0.15)', color: '#D6A75C', fontSize: '0.66rem' }}>
                        NEW
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

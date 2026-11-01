import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, ShieldCheck, Award, Star, MapPin, Phone, 
  FileText, Calendar, Sprout, CheckCircle2, Clock, 
  AlertTriangle, ArrowLeft, Edit3, Save, Check, ExternalLink,
  Layers, Package, Shield, Scale
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { soundFX } from '../utils/audioFX';

export default function FarmerProfilePage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  // Edit form state
  const [form, setForm] = useState({
    name: '',
    contact: '',
    location: '',
    agriStackId: '',
    aadhaarNumber: '',
    khatauniNumber: ''
  });

  const farmerId = currentUser?.role === 'farmer' ? currentUser.uniqueId : 'FARMER-101';

  useEffect(() => {
    fetchFarmerProfile();
  }, [farmerId]);

  const fetchFarmerProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/farmers/${farmerId}`);
      const data = await res.json();
      if (data.success && data.farmer) {
        setFarmer(data.farmer);
        setForm({
          name: data.farmer.name || '',
          contact: data.farmer.contact || '',
          location: data.farmer.location || '',
          agriStackId: data.farmer.agriStackId || '',
          aadhaarNumber: data.farmer.aadhaarNumber || '',
          khatauniNumber: data.farmer.khatauniNumber || ''
        });
      }
    } catch (err) {
      console.error('Error fetching farmer profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/farmers/${farmerId}/kyc-submit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success && data.farmer) {
        soundFX.success();
        setFarmer(data.farmer);
        setIsEditing(false);
        setEditSuccess(true);
        setTimeout(() => setEditSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)', paddingBottom: '3rem' }}>
      <PortalHeaderBar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentPortal="farmer" 
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Breadcrumb Back Link */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <button 
            onClick={() => navigate('/farmer')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} />
            <span>{lang === 'hi' ? 'किसान डैशबोर्ड पर वापस' : 'Back to Farmer Dashboard'}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => navigate('/farmer/crops')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
            >
              <Sprout size={14} color="var(--botanical-green)" />
              <span>{lang === 'hi' ? 'मेरी फसलें देखें' : 'View My Crops'}</span>
            </button>
            <button
              onClick={() => navigate('/farmer/register-crop')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--botanical-green)', color: '#ffffff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}
            >
              <span>{lang === 'hi' ? '+ नई फसल दर्ज करें' : '+ Register Harvest'}</span>
            </button>
          </div>
        </div>

        {editSuccess && (
          <div style={{ background: 'rgba(46, 104, 71, 0.15)', border: '1px solid var(--botanical-green)', borderRadius: '10px', padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--botanical-green)', fontWeight: 600, fontSize: '0.88rem' }}>
            <CheckCircle2 size={18} />
            <span>{lang === 'hi' ? 'किसान प्रोफाइल व AgriStack क्रेडेंशियल्स सफलतापूर्वक अपडेट किए गए!' : 'Farmer profile & AgriStack credentials successfully updated!'}</span>
          </div>
        )}

        {loading ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--surface-card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div className="spin-slow" style={{ width: '36px', height: '36px', border: '3px solid var(--border)', borderTopColor: 'var(--botanical-green)', borderRadius: '50%', margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{lang === 'hi' ? 'किसान पहचान रिकॉर्ड लोड हो रहे हैं...' : 'Loading sovereign farmer profile...'}</p>
          </div>
        ) : !farmer ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--surface-card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'किसान रिकॉर्ड नहीं मिला।' : 'Farmer record not found.'}</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
            {/* Left Profile Details Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Profile Card Header */}
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(46, 104, 71, 0.15)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {farmer.photoUrl ? (
                        <img src={farmer.photoUrl} alt={farmer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <User size={40} color="var(--botanical-green)" />
                      )}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                          {farmer.name}
                        </h1>
                        <span style={{ 
                          padding: '0.2rem 0.65rem', 
                          borderRadius: '999px', 
                          fontSize: '0.72rem', 
                          fontWeight: 800, 
                          background: farmer.kycStatus === 'verified' ? 'rgba(46, 104, 71, 0.15)' : 'rgba(214, 167, 92, 0.15)',
                          color: farmer.kycStatus === 'verified' ? 'var(--botanical-green)' : 'var(--harvest-gold)',
                          border: `1px solid ${farmer.kycStatus === 'verified' ? 'var(--botanical-green)' : 'var(--harvest-gold)'}`
                        }}>
                          {farmer.kycStatus === 'verified' ? (lang === 'hi' ? 'सत्यापित किसान ✓' : 'VERIFIED PRODUCER') : (lang === 'hi' ? 'सत्यापन लंबित' : 'KYC PENDING')}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 0.5rem', color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MapPin size={14} color="var(--botanical-green)" />
                        <span>{farmer.location || 'Punjab, India'}</span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <Phone size={14} color="var(--botanical-green)" />
                        <span>{farmer.contact || '+91 98765 43210'}</span>
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', padding: '0.2rem 0.5rem', background: 'var(--hash-bg)', color: 'var(--hash-color)', borderRadius: '4px', fontWeight: 700 }}>
                          {farmer.uniqueId}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {lang === 'hi' ? 'पंजीकृत किसान पहचान' : 'Sovereign Grower UID'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0.95rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
                  >
                    <Edit3 size={14} />
                    <span>{isEditing ? (lang === 'hi' ? 'संपादन रद्द करें' : 'Cancel Edit') : (lang === 'hi' ? 'विवरण संपादित करें' : 'Edit Credentials')}</span>
                  </button>
                </div>
              </div>

              {/* Edit Mode Form vs View Mode */}
              {isEditing ? (
                <form onSubmit={handleSaveProfile} style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 0 1.25rem', color: 'var(--text-main)' }}>
                    {lang === 'hi' ? 'किसान पहचान व AgriStack विवरण अपडेट करें' : 'Update Sovereign Farmer Details & KYC'}
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        {lang === 'hi' ? 'पूरा नाम' : 'Full Name'}
                      </label>
                      <input 
                        type="text" 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        {lang === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
                      </label>
                      <input 
                        type="text" 
                        value={form.contact} 
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      {lang === 'hi' ? 'खेत का स्थान (जिला, राज्य)' : 'Farm Location (District, State)'}
                    </label>
                    <input 
                      type="text" 
                      value={form.location} 
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        {lang === 'hi' ? 'एग्रीस्टैक आईडी (AgriStack ID)' : 'AgriStack Sovereign ID'}
                      </label>
                      <input 
                        type="text" 
                        value={form.agriStackId} 
                        onChange={(e) => setForm({ ...form, agriStackId: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem', fontFamily: 'var(--font-mono)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        {lang === 'hi' ? 'आधार कार्ड नंबर' : 'Aadhaar Reference'}
                      </label>
                      <input 
                        type="text" 
                        value={form.aadhaarNumber} 
                        onChange={(e) => setForm({ ...form, aadhaarNumber: e.target.value })}
                        placeholder="XXXX-XXXX-XXXX"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        {lang === 'hi' ? 'खतौनी / भू-अभिलेख संख्या' : 'Khatauni Land Record #'}
                      </label>
                      <input 
                        type="text" 
                        value={form.khatauniNumber} 
                        onChange={(e) => setForm({ ...form, khatauniNumber: e.target.value })}
                        placeholder="KH-9021/26-PB"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      style={{ padding: '0.6rem 1.15rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.35rem', borderRadius: '8px', border: 'none', background: 'var(--botanical-green)', color: '#ffffff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}
                    >
                      <Save size={15} />
                      <span>{lang === 'hi' ? 'परिवर्तन सहेजें' : 'Save KYC Updates'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* KYC Dossier Breakdown Cards */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', color: 'var(--botanical-green)' }}>
                      <ShieldCheck size={18} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {lang === 'hi' ? 'एग्रीस्टैक पहचान' : 'AgriStack Sovereign ID'}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {farmer.agriStackId || 'AGRI-PB-2026-8891'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {lang === 'hi' ? 'कृषि मंत्रालय डेटाबेस से लिंक' : 'Linked with Ministry of Agriculture registry'}
                    </p>
                  </div>

                  <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', color: 'var(--harvest-gold)' }}>
                      <FileText size={18} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {lang === 'hi' ? 'खतौनी भू-अभिलेख' : 'Khatauni Land Record'}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {farmer.khatauniNumber || 'KH-9021/26-PB'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {lang === 'hi' ? 'स्वामित्व भूमि रकबा: 3.5 एकड़' : 'Verified parcel: 3.5 Acres'}
                    </p>
                  </div>

                  <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem', color: '#38bdf8' }}>
                      <Shield size={18} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {lang === 'hi' ? 'आधार प्रमाणीकरण' : 'Aadhaar e-KYC'}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {farmer.aadhaarNumber || 'XXXX-XXXX-4321'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {lang === 'hi' ? 'सत्यापित डिजिटल फिंगरप्रिंट' : 'Cryptographically verified citizen UID'}
                    </p>
                  </div>
                </div>
              )}

              {/* Verified Buyer Reviews Feed */}
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Award size={20} color="var(--harvest-gold)" />
                    <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                      {lang === 'hi' ? 'व्यापारी समीक्षाएँ व 5-स्टार रेटिंग' : 'Mandi Buyer Reviews & Reputation'}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(214, 167, 92, 0.15)', padding: '0.3rem 0.75rem', borderRadius: '999px', color: 'var(--harvest-gold)', fontWeight: 800, fontSize: '0.85rem' }}>
                    <Star size={14} fill="currentColor" />
                    <span>{farmer.rating || 5.0} / 5.0</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>({farmer.totalReviews || farmer.reviews?.length || 0})</span>
                  </div>
                </div>

                {farmer.reviews && farmer.reviews.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {farmer.reviews.map((rev, idx) => (
                      <div key={idx} style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                            {rev.buyerName || rev.buyerId}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--harvest-gold)' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} fill={i < Math.floor(rev.rating) ? 'currentColor' : 'none'} />
                            ))}
                          </div>
                        </div>
                        <p style={{ margin: '0 0 0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          "{rev.comment}"
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                          <span>{rev.cropType}</span>
                          <span>•</span>
                          <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                    {lang === 'hi' ? 'सफल थोक मंडी बिक्री के बाद खरीदार यहाँ रेटिंग व टिप्पणी दर्ज करते हैं।' : 'Verified wholesale buyers record reviews and ratings after each trade settlement.'}
                  </p>
                )}
              </div>
            </div>

            {/* Right Summary Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Quick Holdings Metric */}
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 1rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {lang === 'hi' ? 'कृषि पोर्टफोलियो सारांश' : 'Harvest Portfolio'}
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{lang === 'hi' ? 'पंजीकृत फसलें' : 'Registered Batches'}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>{farmer.cropsOwned?.length || 4}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{lang === 'hi' ? 'सत्यापित साइलो स्टॉक' : 'Silo Verified Stock'}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--botanical-green)' }}>1,990 kg</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border-light)' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{lang === 'hi' ? 'वजन मिलान सटीकता' : 'Weight Consistency'}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--harvest-gold)' }}>99.2%</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{lang === 'hi' ? 'सफल बिक्री सेटलमेंट' : 'Settled Mandi Trades'}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>₹1,42,800</span>
                  </div>
                </div>
              </div>

              {/* Fast Action Links */}
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <button
                  onClick={() => navigate('/farmer/crops')}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span>{lang === 'hi' ? 'मेरी फसलें (My Crops) →' : 'My Harvest Lots →'}</span>
                </button>
                <button
                  onClick={() => navigate('/farmistor')}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span>{lang === 'hi' ? 'फार्मिस्टर फसल योजना →' : 'Farmistor Crop Planner →'}</span>
                </button>
                <button
                  onClick={() => navigate('/ledger')}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span>{lang === 'hi' ? 'ब्लॉकचेन लेजर एक्सप्लोरर →' : 'Digital Ledger Explorer →'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

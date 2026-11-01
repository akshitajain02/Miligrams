import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, ArrowLeft, ShieldCheck, Scale, MapPin, 
  Calendar, Clock, AlertTriangle, CheckCircle2, User, 
  Building2, Printer, Star, Layers, Tag, Truck, Check, 
  ArrowRight, Phone, MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { soundFX } from '../utils/audioFX';

export default function BuyerCropDetailPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Purchase Modal State
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [destination, setDestination] = useState('Central Mandi Warehouse, Delhi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settledResult, setSettledResult] = useState(null);

  // Inquiry message state
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryMsg, setInquiryMsg] = useState('');

  const buyerId = currentUser?.role === 'buyer' ? currentUser.uniqueId : 'BUYER-501';

  useEffect(() => {
    fetchCropDetails();
  }, [id]);

  const fetchCropDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/crops/${id}`);
      const data = await res.json();
      if (data.success && data.crop) {
        setCrop(data.crop);
      } else {
        setError(data.message || 'Crop record not found');
      }
    } catch (err) {
      setError('Network connection failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExecutePurchase = async (e) => {
    e.preventDefault();
    if (!crop) return;

    setIsSubmitting(true);
    soundFX.click();

    const effectivePrice = crop.suggestedPriceDrop 
      ? crop.expectedPrice * 0.8 
      : crop.expectedPrice;
    const totalAmount = Math.round(crop.quantity * effectivePrice);

    try {
      const res = await fetch('/api/marketplace/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropId: crop._id,
          buyerId,
          amount: totalAmount
        })
      });

      const data = await res.json();
      if (data.success) {
        soundFX.success();
        setSettledResult({
          transaction: data.transaction,
          crop: data.crop,
          block: data.block
        });
        setIsPurchaseModalOpen(false);
        fetchCropDetails();
      } else {
        alert(data.message || 'Purchase failed');
      }
    } catch (err) {
      alert('Purchase error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!inquiryMsg) return;
    soundFX.success();
    setInquirySent(true);
    setTimeout(() => {
      setInquiryMsg('');
      setInquirySent(false);
    }, 3500);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)' }}>
        <PortalHeaderBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} currentPortal="buyer" />
        <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
          <div className="spin-slow" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--botanical-green)', borderRadius: '50%', margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'प्रमाणित फसल डोजियर लोड हो रहा है...' : 'Retrieving certified procurement dossier...'}</p>
        </div>
      </div>
    );
  }

  if (error || !crop) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)' }}>
        <PortalHeaderBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} currentPortal="buyer" />
        <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '2rem', background: 'var(--surface-card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <AlertTriangle size={42} color="var(--harvest-gold)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 0.5rem' }}>{lang === 'hi' ? 'फसल लॉट नहीं मिला' : 'Lot Not Found'}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
          <button onClick={() => navigate('/marketplace')} className="figma-btn-forest">
            <span>{lang === 'hi' ? 'मंडी में वापस जाएं' : 'Return to Marketplace'}</span>
          </button>
        </div>
      </div>
    );
  }

  const effectivePrice = crop.suggestedPriceDrop 
    ? Math.round(crop.expectedPrice * 0.8) 
    : crop.expectedPrice;
  const totalAmount = Math.round(crop.quantity * effectivePrice);
  const declared = crop.declaredQuantity || crop.quantity;
  const verified = crop.verifiedQuantity;
  const isSold = crop.currentStage === 'sold';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)', paddingBottom: '4rem' }}>
      <PortalHeaderBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} currentPortal="buyer" />

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/marketplace')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} />
            <span>{lang === 'hi' ? 'थोक मंडी में वापस जाएं' : 'Back to Wholesale Marketplace'}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => navigate(`/crop/${crop._id}/trace`)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--botanical-green)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}
            >
              <span>{lang === 'hi' ? 'ट्रेसिबिलिटी टाइमलाइन देखें →' : 'View Full Trace Timeline →'}</span>
            </button>
          </div>
        </div>

        {/* Trade Settlement Success Banner */}
        {settledResult && (
          <div style={{ background: 'rgba(46, 104, 71, 0.15)', border: '1.5px solid var(--botanical-green)', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
              <CheckCircle2 size={28} color="var(--botanical-green)" />
              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {lang === 'hi' ? 'थोक खरीद सफलतापूर्वक संपन्न व सेटल!' : 'Procurement Trade Finalized & Title Transferred!'}
                </h3>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {lang === 'hi' 
                    ? `कुल राशि ₹${settledResult.transaction.amount?.toLocaleString('en-IN')} किसान खाते में प्रेषित। रसीद ब्लॉक #${settledResult.block.index} मिंट किया गया।` 
                    : `Settlement of ₹${settledResult.transaction.amount?.toLocaleString('en-IN')} escrowed to farmer. Block #${settledResult.block.index} minted.`}
                </p>
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '0.65rem 1rem', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--hash-color)' }}>
              Settlement Hash: {settledResult.block.hash}
            </div>
          </div>
        )}

        {/* Main Dossier Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Left Column: Visual & Certified Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Visual Hero Card */}
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ height: '320px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={crop.cropImages?.[0] || '/farmer-sunset-field.jpg'} 
                  alt={crop.cropType}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }} />

                {/* Status Badges Overlay */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'var(--botanical-green)', color: '#ffffff' }}>
                    {crop.qualityStatus || 'Grade A'} Certified
                  </span>
                  {crop.suggestedPriceDrop && (
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '999px', background: 'var(--harvest-gold)', color: '#1a180f' }}>
                      15-DAY AGING DISCOUNT (-20%)
                    </span>
                  )}
                </div>

                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', right: '1.5rem', color: '#ffffff' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    BATCH #{crop._id.toString().slice(-8).toUpperCase()}
                  </span>
                  <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, margin: '0.2rem 0', color: '#ffffff' }}>
                    {crop.cropType}
                  </h1>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
                    {crop.variety} • {crop.farmLocation}
                  </p>
                </div>
              </div>

              {/* Dual-Weight Verification Bar */}
              <div style={{ padding: '1.5rem', background: 'var(--surface)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '0.85rem 1rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
                      {lang === 'hi' ? 'किसान घोषित वजन' : 'Declared Farm Weight'}
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {declared.toLocaleString('en-IN')} kg
                    </span>
                  </div>

                  <div style={{ background: 'var(--bg)', border: '1.5px solid var(--botanical-green)', borderRadius: '10px', padding: '0.85rem 1rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--botanical-green)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', fontWeight: 700 }}>
                      {lang === 'hi' ? 'गोदाम सत्यापित वजन' : 'Verified Silo Weight'}
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--botanical-green)' }}>
                      {verified ? `${verified.toLocaleString('en-IN')} kg` : `${crop.quantity.toLocaleString('en-IN')} kg`}
                    </span>
                  </div>
                </div>

                {crop.discrepancy !== 0 && (
                  <div style={{ background: 'rgba(214, 167, 92, 0.1)', border: '1px solid rgba(214, 167, 92, 0.25)', borderRadius: '8px', padding: '0.65rem 0.85rem', fontSize: '0.78rem', color: 'var(--harvest-gold)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Scale size={15} style={{ flexShrink: 0 }} />
                    <span>
                      {lang === 'hi' 
                        ? `धर्मकांटा अंतर: ${crop.discrepancy} kg (${crop.discrepancyNotes || 'सफाई कटौती'})` 
                        : `Weighbridge Variance: ${crop.discrepancy} kg (${crop.discrepancyNotes || 'pre-cleaning dockage'})`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Storage & Custody Specifications */}
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', fontWeight: 800, margin: '0 0 1rem', color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'भंडारण व गुणवत्ता विनिर्देश' : 'Storage & Custody Specifications'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', fontSize: '0.85rem' }}>
                <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.65rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>{lang === 'hi' ? 'गोदाम हब:' : 'Warehouse:'}</span>
                  <strong style={{ color: 'var(--text-main)' }}>{crop.currentWarehouseId || 'WH-CENTRAL-01'}</strong>
                </div>
                <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.65rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>{lang === 'hi' ? 'साइलो बे:' : 'Silo Bay:'}</span>
                  <strong style={{ color: 'var(--text-main)' }}>{crop.storageLocation || 'Silo Alpha — Bay 3'}</strong>
                </div>
                <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.65rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>{lang === 'hi' ? 'नमी स्तर:' : 'Moisture Level:'}</span>
                  <strong style={{ color: 'var(--botanical-green)' }}>11.2% (Grade A Dry)</strong>
                </div>
                <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.65rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>{lang === 'hi' ? 'कटाई तिथि:' : 'Harvest Date:'}</span>
                  <strong style={{ color: 'var(--text-main)' }}>{new Date(crop.harvestDate).toLocaleDateString()}</strong>
                </div>
              </div>
            </div>

            {/* Producer Information */}
            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(46, 104, 71, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--botanical-green)' }}>
                    <User size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>{crop.farmerName}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{crop.farmerId}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(214, 167, 92, 0.15)', padding: '0.25rem 0.65rem', borderRadius: '999px', color: 'var(--harvest-gold)', fontWeight: 800, fontSize: '0.85rem' }}>
                  <Star size={13} fill="currentColor" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--botanical-green)', fontWeight: 700, marginBottom: '1rem' }}>
                <ShieldCheck size={16} />
                <span>{lang === 'hi' ? 'एग्रीस्टैक व आधार सत्यापित किसान (AgriStack Sovereign KYC)' : 'AgriStack & Aadhaar Sovereign KYC Verified'}</span>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSendInquiry} style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
                  {lang === 'hi' ? 'किसान से सीधा संपर्क / व्यापार पूछताछ:' : 'Send Direct Trade Inquiry to Farmer:'}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder={lang === 'hi' ? 'उदा: क्या आप डिलीवरी का प्रबंध कर सकते हैं?' : 'e.g. Can you arrange rail siding dispatch?'}
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.82rem' }}
                  />
                  <button
                    type="submit"
                    style={{ padding: '0.5rem 0.95rem', borderRadius: '8px', border: 'none', background: 'var(--surface-alt)', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                  >
                    {inquirySent ? '✓ Sent' : (lang === 'hi' ? 'भेजें' : 'Send')}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Settlement Action */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '1.5rem' }}>
            <div style={{ background: 'var(--surface-card)', border: '1.5px solid var(--botanical-green)', borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {lang === 'hi' ? 'थोक भाव विनिर्देश' : 'COMMODITY LOT PRICING'}
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '999px', background: isSold ? 'rgba(239, 68, 68, 0.15)' : 'rgba(46, 104, 71, 0.15)', color: isSold ? '#ef4444' : 'var(--botanical-green)' }}>
                  {isSold ? 'SOLD' : 'AVAILABLE NOW'}
                </span>
              </div>

              {/* Pricing Display */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '2.4rem', fontWeight: 800, fontFamily: 'var(--font-serif)', color: 'var(--text-main)' }}>
                    ₹{effectivePrice}
                  </span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>/ kg</span>
                  {crop.suggestedPriceDrop && (
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                      ₹{crop.expectedPrice}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  (₹{effectivePrice * 100} / Quintal)
                </span>
              </div>

              {/* Lot Total Price Calculation */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'कुल उपलब्ध मात्रा:' : 'Certified Quantity:'}</span>
                  <strong>{crop.quantity.toLocaleString('en-IN')} kg</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'थोक भाव:' : 'Unit Price:'}</span>
                  <span>₹{effectivePrice} / kg</span>
                </div>

                {crop.suggestedPriceDrop && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--harvest-gold)' }}>
                    <span>{lang === 'hi' ? '15-दिन शेल्फ-लाइफ छूट:' : '15-Day Aging Discount:'}</span>
                    <strong>-20%</strong>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px solid var(--border-light)', fontSize: '1.05rem', fontWeight: 800 }}>
                  <span>{lang === 'hi' ? 'कुल लॉट लागत:' : 'Total Lot Value:'}</span>
                  <span style={{ color: 'var(--botanical-green)' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Purchase Execution CTA */}
              {!isSold ? (
                <button
                  onClick={() => setIsPurchaseModalOpen(true)}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: 'var(--botanical-green)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 14px rgba(46, 104, 71, 0.25)'
                  }}
                >
                  <ShoppingBag size={18} />
                  <span>{lang === 'hi' ? 'पूरा लॉट खरीदें (Procure Batch)' : 'Procure Certified Lot Now'}</span>
                </button>
              ) : (
                <div style={{ padding: '0.85rem', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                  {lang === 'hi' ? 'यह लॉट पहले ही बिक चुका है' : 'This lot has been procured and settled.'}
                </div>
              )}

              <p style={{ margin: '1rem 0 0', fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>
                {lang === 'hi'
                  ? 'खरीद पूरी होने पर स्वामित्व का नया ब्लॉक तत्काल SHA-256 लेजर पर मिंट होगा।'
                  : 'Title deed block is minted immediately upon purchase settlement.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {isPurchaseModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'var(--surface-solid)', border: '1px solid var(--border)', borderRadius: '16px', maxWidth: '480px', width: '100%', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--text-main)' }}>
              {lang === 'hi' ? 'थोक खरीद ऑर्डर पुष्टि' : 'Confirm Wholesale Procurement'}
            </h3>
            <p style={{ margin: '0 0 1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {crop.cropType} ({crop.variety}) • {crop.quantity.toLocaleString('en-IN')} kg
            </p>

            <form onSubmit={handleExecutePurchase}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{lang === 'hi' ? 'कुल देय राशि:' : 'Total Settlement:'}</span>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--botanical-green)' }}>
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {lang === 'hi' ? 'डिलीवरी गंतव्य (Destination):' : 'Delivery Destination Silo / Warehouse:'}
                </label>
                <input 
                  type="text" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsPurchaseModalOpen(false)}
                  style={{ padding: '0.65rem 1.15rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                >
                  {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ padding: '0.65rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--botanical-green)', color: '#ffffff', fontWeight: 700, fontSize: '0.85rem', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? (lang === 'hi' ? 'सेटलमेंट जारी है...' : 'Settling Trade...') : (lang === 'hi' ? 'ऑर्डर की पुष्टि करें' : 'Confirm & Settle Trade')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

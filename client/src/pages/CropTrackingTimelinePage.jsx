import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Sprout, Building2, ShoppingBag, ShieldCheck, ArrowLeft, 
  Calendar, Scale, MapPin, Tag, Clock, CheckCircle2, AlertTriangle, 
  FileText, ArrowRight, User, Layers, Share2, Printer, ExternalLink,
  Lock, Check, Compass, Eye, Shield, Link2, Sparkles
} from 'lucide-react';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { soundFX } from '../utils/audioFX';

export default function CropTrackingTimelinePage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);
  const [ledgerHistory, setLedgerHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlockData, setSelectedBlockData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/crops/${id}`);
      const data = await res.json();
      if (data.success && data.crop) {
        setCrop(data.crop);
        setLedgerHistory(data.ledgerHistory || []);
      } else {
        setError(data.message || 'Crop not found');
      }
    } catch (err) {
      setError('Failed to fetch crop traceability data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)' }}>
        <PortalHeaderBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} currentPortal="farmer" />
        <div style={{ padding: '5rem 2rem', textAlign: 'center' }}>
          <div className="spin-slow" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--botanical-green)', borderRadius: '50%', margin: '0 auto 1.5rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'ब्लॉकचेन लेजर से ट्रेसिबिलिटी टाइमलाइन लोड हो रही है...' : 'Retrieving immutable crop traceability timeline...'}</p>
        </div>
      </div>
    );
  }

  if (error || !crop) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)' }}>
        <PortalHeaderBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} currentPortal="farmer" />
        <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '2rem', background: 'var(--surface-card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <AlertTriangle size={42} color="var(--harvest-gold)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 0.5rem' }}>{lang === 'hi' ? 'फसल रिकॉर्ड नहीं मिला' : 'Crop Lot Not Found'}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
          <button onClick={() => navigate('/marketplace')} className="figma-btn-forest">
            <span>{lang === 'hi' ? 'मंडी में अन्य फसलें देखें' : 'Browse Marketplace'}</span>
          </button>
        </div>
      </div>
    );
  }

  const declared = crop.declaredQuantity || crop.quantity;
  const verified = crop.verifiedQuantity;
  const discrepancy = crop.discrepancy || 0;
  const hasWarehouseVerified = crop.currentStage === 'warehouse' || crop.currentStage === 'sold' || verified !== null;
  const hasSold = crop.currentStage === 'sold';

  // 7 Distinct Chronological Timeline Milestones
  const milestones = [
    {
      id: 'harvest',
      stageNum: 1,
      titleHi: 'खेत पर पंजीकरण व मात्रा घोषणा (Farm Gate)',
      titleEn: 'Farm Gate Harvest Registration & Quantity Declaration',
      status: 'completed',
      date: new Date(crop.harvestDate).toLocaleDateString(),
      actor: `${crop.farmerName} (${crop.farmerId})`,
      actorRole: 'Grower / Sovereign Farmer',
      icon: Sprout,
      color: 'var(--botanical-green)',
      dataBadge: `Declared: ${declared.toLocaleString('en-IN')} kg`,
      detailsHi: `किसान ने ${declared} kg ${crop.cropType} (${crop.variety}) का पंजीकरण किया। गुणवत्ता ग्रेड: ${crop.qualityStatus}। खेत स्थान: ${crop.farmLocation}।`,
      detailsEn: `Farmer recorded harvest of ${declared} kg ${crop.cropType} (${crop.variety}). Quality certified as ${crop.qualityStatus}. Field origin: ${crop.farmLocation}.`,
      hash: crop.blockHash || 'SHA256_FARM_MINTED_001',
      blockIndex: 1
    },
    {
      id: 'weighbridge',
      stageNum: 2,
      titleHi: 'गोदाम धर्मकांटा तौल व अंतर (Discrepancy) मिलान',
      titleEn: 'Certified Weighbridge Scale Intake & Discrepancy Audit',
      status: hasWarehouseVerified ? (discrepancy !== 0 ? 'discrepancy' : 'completed') : 'pending',
      date: crop.lastVerifiedDate ? new Date(crop.lastVerifiedDate).toLocaleDateString() : 'Awaiting Delivery',
      actor: crop.currentWarehouseId || 'WH-CENTRAL-01 Operator',
      actorRole: 'Weighbridge Certified Scale Inspector',
      icon: Scale,
      color: hasWarehouseVerified ? (discrepancy !== 0 ? 'var(--harvest-gold)' : 'var(--botanical-green)') : 'var(--text-muted)',
      dataBadge: hasWarehouseVerified ? (discrepancy === 0 ? '100% Exact Weight Match' : `Variance: ${discrepancy > 0 ? '+' : ''}${discrepancy} kg`) : 'Awaiting Scale Verification',
      detailsHi: hasWarehouseVerified
        ? `धर्मकांटा तौल: ${verified || declared} kg प्राप्त। किसान घोषित वजन: ${declared} kg। अंतर: ${discrepancy} kg (${crop.discrepancyNotes || 'सत्यापित'})।`
        : 'उपज गोदाम पहुंचने पर प्रमाणित इलेक्ट्रॉनिक धर्मकांटा पर वास्तविक वजन तौला जाएगा।',
      detailsEn: hasWarehouseVerified
        ? `Intake weighbridge registered ${verified || declared} kg. Farmer declared ${declared} kg. Variance: ${discrepancy} kg (${crop.discrepancyNotes || 'Verified'}).`
        : 'Certified weighbridge intake reading will be captured upon arrival at warehouse.',
      hash: crop.blockHash,
      blockIndex: 2
    },
    {
      id: 'silo',
      stageNum: 3,
      titleHi: 'वैज्ञानिक साइलो आवंटन व नमी नियंत्रण',
      titleEn: 'Climate-Controlled Silo Bay Allocation',
      status: hasWarehouseVerified ? 'completed' : 'pending',
      date: crop.lastVerifiedDate ? new Date(crop.lastVerifiedDate).toLocaleDateString() : 'Pending Silo Bay',
      actor: crop.currentWarehouseId || 'WH-CENTRAL-01',
      actorRole: 'Silo Storage Manager',
      icon: Building2,
      color: hasWarehouseVerified ? 'var(--botanical-green)' : 'var(--text-muted)',
      dataBadge: crop.storageLocation || 'Silo Alpha — Bay 3',
      detailsHi: `भंडारण स्थान: ${crop.storageLocation || 'साइलो अल्फा, बे 3'}। नमी स्तर <12% बनाए रखने हेतु वातानुकूलित साइलो में सुरक्षित।`,
      detailsEn: `Allocated to ${crop.storageLocation || 'Silo Alpha — Bay 3'}. Climate monitored to preserve grain vitality and protect against post-harvest pest loss.`,
      hash: crop.blockHash,
      blockIndex: 2
    },
    {
      id: 'aging',
      stageNum: 4,
      titleHi: '15-दिन आवधिक स्टॉक सत्यापन व शेल्फ लाइफ ऑडिट',
      titleEn: 'Periodic 15-Day Storage & Aging Quality Audit',
      status: crop.verificationCount > 0 ? 'completed' : (hasWarehouseVerified ? 'active' : 'pending'),
      date: crop.lastVerifiedDate ? new Date(crop.lastVerifiedDate).toLocaleDateString() : 'Cycle Active',
      actor: 'Automated 15-Day Aging Engine',
      actorRole: 'System Protocol',
      icon: Clock,
      color: crop.verificationCount > 0 ? 'var(--harvest-gold)' : (hasWarehouseVerified ? 'var(--botanical-green)' : 'var(--text-muted)'),
      dataBadge: crop.verificationCount > 0 ? `Audit Cycle #${crop.verificationCount} (20% Price Drop)` : 'Cycle 1 Active (0–15 Days)',
      detailsHi: crop.verificationCount > 0
        ? `फसल 15 दिन से अधिक गोदाम में रही। गुणवत्ता पुनः सत्यापित की गई तथा 20% मूल्य छूट लागू की गई।`
        : 'हर 15 दिन में स्वचालित गुणवत्ता व वजन पुनः जांच की जाती है ताकि अनाज खराब होने से पहले बिक सके।',
      detailsEn: crop.verificationCount > 0
        ? `Crop reached secondary storage period. Relisted with 20% suggested price drop and re-verified block minted.`
        : 'Automated 15-day surveillance active. Periodic audits verify moisture levels and trigger shelf-life market adjustments.',
      hash: crop.blockHash,
      blockIndex: 3
    },
    {
      id: 'mandi_listing',
      stageNum: 5,
      titleHi: 'पारदर्शी थोक मंडी में सीधी लिस्टिंग',
      titleEn: 'Direct Wholesale Mandi Exchange Listing',
      status: crop.status !== 'unsellable' ? 'completed' : 'pending',
      date: new Date(crop.listedDate || crop.createdAt).toLocaleDateString(),
      actor: 'Miligrams Fair-Trade Exchange',
      actorRole: 'Market Settlement Engine',
      icon: Layers,
      color: 'var(--botanical-green)',
      dataBadge: `Floor Price: ₹${crop.expectedPrice}/kg`,
      detailsHi: `प्रमाणित लॉट को सीधे थोक व्यापारियों, फ्लोर मिलों और निर्यातकों के लिए उपलब्ध कराया गया। शून्य बिचौलिया कमीशन।`,
      detailsEn: `Lot opened for direct procurement by institutional buyers and wholesale processors with zero intermediary deductions.`,
      hash: crop.blockHash,
      blockIndex: 3
    },
    {
      id: 'inquiry',
      stageNum: 6,
      titleHi: 'व्यापारी रुचि, बातचीत व ऑर्डर कोटेशन',
      titleEn: 'Buyer Trade Inquiry & Order Confirmation',
      status: hasSold ? 'completed' : (hasWarehouseVerified ? 'active' : 'pending'),
      date: hasSold ? new Date(crop.updatedAt).toLocaleDateString() : 'Awaiting Bids',
      actor: hasSold ? (crop.buyerName || crop.currentBuyerId || 'Institutional Merchant') : 'Mandi Network Buyers',
      actorRole: 'Procurement Entity',
      icon: ShoppingBag,
      color: hasSold ? 'var(--botanical-green)' : 'var(--text-muted)',
      dataBadge: hasSold ? 'Offer Accepted' : 'Open for Purchase',
      detailsHi: hasSold
        ? `थोक खरीदार द्वारा संपूर्ण लॉट का कोटेशन स्वीकृत किया गया। डिलीवरी गंतव्य निर्धारित।`
        : 'खरीदार सीधे किसान व गोदाम से संपर्क कर संपूर्ण बैच का आर्डर बुक कर सकते हैं।',
      detailsEn: hasSold
        ? 'Trade terms aligned, payment escrow authorized, and batch allocated for dispatch.'
        : 'Commercial buyers can inspect this lot dossier and place purchase orders directly.',
      hash: crop.blockHash,
      blockIndex: 4
    },
    {
      id: 'settlement',
      stageNum: 7,
      titleHi: 'अंतिम खरीद सेटलमेंट व स्वामित्व अंतरण',
      titleEn: 'Final Settlement & Title Transfer Minting',
      status: hasSold ? 'completed' : 'pending',
      date: hasSold ? new Date(crop.updatedAt).toLocaleDateString() : 'Pending Trade Settlement',
      actor: crop.buyerName || 'Spot Commodity Buyer',
      actorRole: 'Purchaser & Escrow Clearing',
      icon: ShieldCheck,
      color: hasSold ? 'var(--forest-green)' : 'var(--text-muted)',
      dataBadge: hasSold ? `Settled: ₹${(crop.quantity * crop.expectedPrice).toLocaleString('en-IN')}` : 'Awaiting Settlement',
      detailsHi: hasSold
        ? `व्यापार संपन्न! कुल राशि ₹${(crop.quantity * crop.expectedPrice).toLocaleString('en-IN')} किसान खाते में ट्रांसफर की गई और स्वामित्व अंतरण का ब्लॉक लेजर पर मिंट हुआ।`
        : 'बिक्री पूरी होने पर इलेक्ट्रॉनिक भुगतान किसान खाते में प्रेषित होगा तथा लेजर पर अंतिम स्वामित्व ब्लॉक मिंट किया जाएगा।',
      detailsEn: hasSold
        ? `Trade successfully finalized! Title deed transferred and payment settled. Permanent SHA-256 settlement block minted.`
        : 'Upon trade completion, funds are transferred directly to grower bank account and final settlement block is sealed.',
      hash: crop.blockHash,
      blockIndex: 5
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)', paddingBottom: '4rem' }}>
      <PortalHeaderBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} currentPortal="farmer" />

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              onClick={() => navigate(`/crop/${crop._id}`)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
            >
              <ArrowLeft size={16} />
              <span>{lang === 'hi' ? 'फसल विवरण पर वापस' : 'Back to Crop Dossier'}</span>
            </button>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--botanical-green)', fontWeight: 700 }}>
              {lang === 'hi' ? 'ट्रेसिबिलिटी टाइमलाइन' : 'Chronological Trace Timeline'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => window.print()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
            >
              <Printer size={14} />
              <span>{lang === 'hi' ? 'प्रिंट टाइमलाइन' : 'Print Trace'}</span>
            </button>
            <button
              onClick={() => navigate('/ledger')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.95rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--botanical-green)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}
            >
              <Link2 size={14} />
              <span>{lang === 'hi' ? 'लेजर एक्सप्लोरर' : 'Ledger Explorer'}</span>
            </button>
          </div>
        </div>

        {/* Hero Batch Banner */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem 2rem', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', padding: '0.2rem 0.55rem', background: 'var(--hash-bg)', color: 'var(--hash-color)', borderRadius: '4px', fontWeight: 700 }}>
                  LOT #{crop._id.toString().slice(-6).toUpperCase()}
                </span>
                <span style={{ 
                  fontSize: '0.72rem', 
                  fontWeight: 800, 
                  padding: '0.2rem 0.65rem', 
                  borderRadius: '999px',
                  background: crop.currentStage === 'sold' ? 'rgba(23, 61, 43, 0.15)' : 'rgba(46, 104, 71, 0.15)',
                  color: crop.currentStage === 'sold' ? 'var(--forest-green)' : 'var(--botanical-green)',
                  border: '1px solid currentColor'
                }}>
                  {crop.currentStage === 'sold' ? 'SOLD & SETTLED' : crop.currentStage === 'warehouse' ? 'WAREHOUSE VERIFIED' : 'FARM ORIGIN'}
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, margin: '0 0 0.4rem', color: 'var(--text-main)' }}>
                {crop.cropType}
              </h1>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {crop.variety} • {crop.qualityStatus} • {lang === 'hi' ? 'किसान:' : 'Producer:'} <strong style={{ color: 'var(--text-main)' }}>{crop.farmerName}</strong> ({crop.farmerId})
              </p>
            </div>

            {/* Weight Highlights Card */}
            <div style={{ display: 'flex', gap: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1rem 1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
                  {lang === 'hi' ? 'घोषित वजन' : 'Declared Weight'}
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {declared.toLocaleString('en-IN')} kg
                </span>
              </div>

              <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '1.5rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
                  {lang === 'hi' ? 'सत्यापित वजन' : 'Verified Weight'}
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: verified ? 'var(--botanical-green)' : 'var(--text-muted)' }}>
                  {verified ? `${verified.toLocaleString('en-IN')} kg` : 'Pending Scale'}
                </span>
              </div>

              {discrepancy !== 0 && (
                <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '1.5rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
                    {lang === 'hi' ? 'तौल अंतर' : 'Variance'}
                  </span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--harvest-gold)' }}>
                    {discrepancy > 0 ? `+${discrepancy}` : discrepancy} kg
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cryptographic Ledger Disclaimer Notice */}
        <div style={{ background: 'rgba(46, 104, 71, 0.08)', border: '1px solid rgba(46, 104, 71, 0.25)', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Lock size={20} color="var(--botanical-green)" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
            <strong>{lang === 'hi' ? 'अपरिवर्तनीय डिजिटल लेजर मुहर:' : 'Tamper-Evident Ledger Integrity:'} </strong>
            {lang === 'hi'
              ? 'प्रत्येक मील का पत्थर पिछले ब्लॉक से SHA-256 हैश द्वारा शृंखलाबद्ध है। ऐतिहासिक रिकॉर्ड्स को कभी बदला नहीं जाता; संशोधन नए ब्लॉक के रूप में जोड़े जाते हैं।'
              : 'Every milestone in this journey computes a cryptographic SHA-256 hash incorporating the previous block link and Merkle root. Tamper-evident records guarantee audit trail integrity.'}
          </div>
        </div>

        {/* Vertical Chronological Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* Vertical Connecting Backbone Line */}
          <div style={{ position: 'absolute', left: '19px', top: '24px', bottom: '24px', width: '3px', background: 'var(--border)' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {milestones.map((m) => {
              const Icon = m.icon;
              const isCompleted = m.status === 'completed';
              const isDiscrepancy = m.status === 'discrepancy';
              const isActive = m.status === 'active';

              const markerBg = isCompleted ? 'var(--botanical-green)' : isDiscrepancy ? 'var(--harvest-gold)' : isActive ? 'var(--forest-green)' : 'var(--surface-alt)';
              const markerBorder = isCompleted ? 'var(--leaf-accent)' : isDiscrepancy ? 'var(--harvest-gold)' : 'var(--border)';

              return (
                <div key={m.id} style={{ position: 'relative', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  {/* Step Marker Badge */}
                  <div style={{
                    position: 'absolute',
                    left: '-2rem',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: markerBg,
                    border: `3px solid ${markerBorder}`,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isCompleted || isDiscrepancy ? '0 0 0 4px rgba(46, 104, 71, 0.15)' : 'none',
                    zIndex: 2
                  }}>
                    {isCompleted ? <Check size={18} /> : isDiscrepancy ? <AlertTriangle size={17} /> : <Icon size={18} />}
                  </div>

                  {/* Card Content */}
                  <div style={{
                    flex: 1,
                    background: 'var(--surface-card)',
                    border: `1.5px solid ${isDiscrepancy ? 'rgba(214, 167, 92, 0.4)' : isCompleted ? 'rgba(46, 104, 71, 0.3)' : 'var(--border)'}`,
                    borderRadius: '14px',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.55rem', borderRadius: '4px', background: `${m.color}15`, color: m.color, letterSpacing: '0.04em' }}>
                          STAGE 0{m.stageNum}
                        </span>
                        <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                          {lang === 'hi' ? m.titleHi : m.titleEn}
                        </h3>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Calendar size={13} />
                          <span>{m.date}</span>
                        </span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '999px', background: isCompleted ? 'rgba(46, 104, 71, 0.15)' : isDiscrepancy ? 'rgba(214, 167, 92, 0.15)' : 'rgba(100, 116, 108, 0.15)', color: m.color }}>
                          {m.dataBadge}
                        </span>
                      </div>
                    </div>

                    <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      {lang === 'hi' ? m.detailsHi : m.detailsEn}
                    </p>

                    {/* Metadata Strip */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.85rem', borderTop: '1px solid var(--border-light)', fontSize: '0.78rem', color: 'var(--text-dim)', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <User size={13} color="var(--botanical-green)" />
                        <span>{lang === 'hi' ? 'उत्तरदायी कर्ता:' : 'Actor:'} <strong style={{ color: 'var(--text-main)' }}>{m.actor}</strong> ({m.actorRole})</span>
                      </div>

                      {m.hash && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Lock size={12} color="var(--botanical-green)" />
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--hash-color)' }}>
                            Block #{m.blockIndex}: {m.hash.substring(0, 16)}...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

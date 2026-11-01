import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Sprout, Building2, ShoppingBag, ShieldCheck, ArrowLeft, 
  Calendar, Scale, MapPin, Tag, Clock, CheckCircle2, AlertTriangle, 
  FileText, ArrowRight, User, Layers, Share2, Printer, ExternalLink
} from 'lucide-react';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { soundFX } from '../utils/audioFX';

export default function CropDetailPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setHistory(data.ledgerHistory || []);
      } else {
        setError(data.message || 'Crop record not found');
      }
    } catch (err) {
      setError('Failed to connect to ledger server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysAgo = (dateStr) => {
    if (!dateStr) return 0;
    const diff = Date.now() - new Date(dateStr).getTime();
    return Math.max(0, Math.floor(diff / (1000 * 3600 * 24)));
  };

  return (
    <div className="crop-detail-page-container">
      {/* Top Universal Header Bar */}
      <PortalHeaderBar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentPortal="farmer" 
      />

      <div className="crop-detail-main">
        {/* Breadcrumb Navigation */}
        <div className="crop-breadcrumb">
          <button onClick={() => navigate(-1)} className="crop-back-link">
            <ArrowLeft size={15} />
            <span>{lang === 'hi' ? 'वापस जाएँ' : 'Back'}</span>
          </button>
          <span className="crop-breadcrumb-sep">/</span>
          <span className="crop-breadcrumb-current">
            {lang === 'hi' ? 'फसल विवरण व ट्रेसिबिलिटी टाइमलाइन' : 'Crop Traceability & Lot Dossier'}
          </span>
        </div>

        {loading ? (
          <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <div className="spin-slow" style={{ width: '40px', height: '40px', border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 1.5rem' }} />
            <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem' }}>
              {lang === 'hi' ? 'लेजर से डेटा लोड हो रहा है...' : 'Retrieving immutable ledger records...'}
            </h3>
          </div>
        ) : error || !crop ? (
          <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
            <AlertTriangle size={42} color="#D6A75C" style={{ margin: '0 auto 1rem', display: 'block' }} />
            <h2 style={{ color: 'var(--text-main)', margin: '0 0 0.5rem' }}>
              {lang === 'hi' ? 'फसल नहीं मिली' : 'Crop Lot Not Found'}
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
            <button onClick={() => navigate('/marketplace')} className="figma-btn-forest">
              <span>{lang === 'hi' ? 'मंडी में अन्य फसलें देखें' : 'Browse Marketplace'}</span>
            </button>
          </div>
        ) : (
          <>
            {/* Header Lot Hero Card */}
            <div className="glass-panel crop-lot-hero-card">
              <div className="crop-lot-hero-grid">
                {/* Crop Photo / Visual */}
                <div className="crop-lot-media-wrap">
                  <img 
                    src={crop.cropImages?.[0] || (crop.cropType?.toLowerCase().includes('rice') ? '/nature-farm-banner.jpg' : '/farmer-sunset-field.jpg')} 
                    alt={crop.cropType} 
                    className="crop-lot-img"
                  />
                  <div className="crop-lot-stage-pill">
                    {crop.currentStage === 'sold' ? (
                      <span className="badge" style={{ background: '#2E6847', color: '#ffffff' }}>
                        ✓ {lang === 'hi' ? 'बिक्री संपन्न (Sold)' : 'Sold & Dispatched'}
                      </span>
                    ) : crop.currentStage === 'warehouse' ? (
                      <span className="badge" style={{ background: '#D6A75C', color: '#173D2B', fontWeight: 800 }}>
                        🏢 {lang === 'hi' ? 'साइलो में सुरक्षित (Warehouse)' : 'Stored in Silo'}
                      </span>
                    ) : (
                      <span className="badge" style={{ background: 'rgba(141, 187, 120, 0.25)', color: '#2E6847', fontWeight: 800 }}>
                        🌾 {lang === 'hi' ? 'खेत पर तैयार (Farm Gate)' : 'At Farm Gate'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Crop Core Info */}
                <div className="crop-lot-info-wrap">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="badge" style={{ background: 'rgba(23, 61, 43, 0.08)', color: 'var(--primary)', borderColor: 'rgba(23, 61, 43, 0.2)' }}>
                      LOT #{crop._id.substring(crop._id.length - 8).toUpperCase()}
                    </span>
                    <span className="badge" style={{ background: 'rgba(214, 167, 92, 0.15)', color: '#D6A75C', borderColor: 'rgba(214, 167, 92, 0.3)' }}>
                      {crop.qualityStatus || 'Grade A'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {lang === 'hi' ? `कटाई: ${calculateDaysAgo(crop.harvestDate)} दिन पूर्व` : `Harvested ${calculateDaysAgo(crop.harvestDate)} days ago`}
                    </span>
                  </div>

                  <h1 className="crop-lot-title">
                    {crop.cropType}
                  </h1>

                  <p className="crop-lot-variety">
                    {lang === 'hi' ? `किस्म: ${crop.variety || 'देसी मानक'}` : `Variety: ${crop.variety || 'Standard Desi'}`} • 📍 {crop.farmLocation || 'Punjab, India'}
                  </p>

                  {/* Quantity Accountability Banner (Declared vs Verified) */}
                  <div className="crop-lot-qty-banner">
                    <div className="crop-qty-col">
                      <span className="crop-qty-label">
                        {lang === 'hi' ? 'किसान द्वारा घोषित मात्रा' : 'Declared Quantity (Farmer)'}
                      </span>
                      <span className="crop-qty-num" style={{ color: 'var(--text-main)' }}>
                        {(crop.declaredQuantity || crop.quantity).toLocaleString('en-IN')} kg
                      </span>
                      <span className="crop-qty-sub">
                        {lang === 'hi' ? 'खेत पर्ची पर दर्ज' : 'Declared at Farm Intake'}
                      </span>
                    </div>

                    <div className="crop-qty-divider" />

                    <div className="crop-qty-col">
                      <span className="crop-qty-label">
                        {lang === 'hi' ? 'गोदाम द्वारा सत्यापित मात्रा' : 'Verified Quantity (Warehouse)'}
                      </span>
                      <span className="crop-qty-num" style={{ color: crop.verifiedQuantity ? '#2E6847' : '#D6A75C' }}>
                        {crop.verifiedQuantity !== null && crop.verifiedQuantity !== undefined
                          ? `${crop.verifiedQuantity.toLocaleString('en-IN')} kg`
                          : (lang === 'hi' ? 'सत्यापन लंबित' : 'Pending Silo Intake')}
                      </span>
                      <span className="crop-qty-sub">
                        {crop.verifiedQuantity !== null && crop.verifiedQuantity !== undefined
                          ? (lang === 'hi' ? 'धर्मकांटा वजन मुहर' : 'Weighbridge Certified')
                          : (lang === 'hi' ? 'गोदाम आवक प्रतीक्षित' : 'Awaiting Arrival')}
                      </span>
                    </div>

                    <div className="crop-qty-divider" />

                    <div className="crop-qty-col">
                      <span className="crop-qty-label">
                        {lang === 'hi' ? 'मात्रा अंतर (Discrepancy)' : 'Weight Discrepancy'}
                      </span>
                      <span className="crop-qty-num" style={{ 
                        color: crop.discrepancy === 0 ? '#2E6847' : (crop.discrepancy < 0 ? '#dc2626' : '#16a34a') 
                      }}>
                        {crop.discrepancy === 0 ? '±0 kg (100% Match)' : `${crop.discrepancy > 0 ? '+' : ''}${crop.discrepancy} kg`}
                      </span>
                      <span className="crop-qty-sub">
                        {crop.discrepancyNotes || (crop.discrepancy === 0 ? (lang === 'hi' ? 'पूर्ण मिलान' : 'Zero Variance') : (lang === 'hi' ? 'छनाई / भूसी कटौती' : 'Dockage adjustment'))}
                      </span>
                    </div>
                  </div>

                  {/* Pricing and Action Row */}
                  <div className="crop-lot-pricing-row">
                    <div>
                      <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-light)', fontWeight: 800 }}>
                        {lang === 'hi' ? 'अपेक्षित थोक भाव' : 'EXPECTED LOT PRICE'}
                      </span>
                      <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                        ₹{crop.expectedPrice || 28} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ kg (₹{(crop.expectedPrice || 28) * 100} / Q)</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {crop.currentStage !== 'sold' && (
                        <button
                          onClick={() => navigate(`/marketplace?crop=${encodeURIComponent(crop.cropType)}`)}
                          className="figma-btn-forest"
                        >
                          <ShoppingBag size={16} />
                          <span>{lang === 'hi' ? 'मंडी में खरीदें (Trade)' : 'Procure in Marketplace'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => window.print()}
                        className="btn btn-secondary"
                        title="Print Certified Lot Dossier"
                      >
                        <Printer size={15} />
                        <span>{lang === 'hi' ? 'दस्तावेज प्रिंट करें' : 'Print Dossier'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata & Custody Cards */}
            <div className="crop-meta-grid">
              {/* Farmer Origin Profile */}
              <div className="glass-panel crop-meta-card">
                <div className="crop-meta-icon" style={{ background: 'rgba(46, 104, 71, 0.12)', color: '#2E6847' }}>
                  <User size={20} />
                </div>
                <div>
                  <span className="crop-meta-label">{lang === 'hi' ? 'मूल उत्पादक किसान' : 'Origin Producer'}</span>
                  <h4 className="crop-meta-val">{crop.farmerName || 'Independent Farmer'}</h4>
                  <p className="crop-meta-sub">
                    Farmer ID: <span style={{ fontFamily: 'var(--font-mono)' }}>{crop.farmerId}</span>
                  </p>
                </div>
              </div>

              {/* Warehouse Silo Custody */}
              <div className="glass-panel crop-meta-card">
                <div className="crop-meta-icon" style={{ background: 'rgba(214, 167, 92, 0.15)', color: '#D6A75C' }}>
                  <Building2 size={20} />
                </div>
                <div>
                  <span className="crop-meta-label">{lang === 'hi' ? 'गोदाम व साइलो भंडारण' : 'Warehouse Custody'}</span>
                  <h4 className="crop-meta-val">{crop.currentWarehouseId || (lang === 'hi' ? 'खेत पर (In Transit)' : 'Direct Farm Custody')}</h4>
                  <p className="crop-meta-sub">
                    {crop.storageLocation || (lang === 'hi' ? 'साइलो अलॉटमेंट प्रतीक्षित' : 'Intake Bay Assignment')}
                  </p>
                </div>
              </div>

              {/* Digital Ledger Tamper-Evident Seal */}
              <div className="glass-panel crop-meta-card">
                <div className="crop-meta-icon" style={{ background: 'rgba(23, 61, 43, 0.12)', color: '#173D2B' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <span className="crop-meta-label">{lang === 'hi' ? 'डिजिटल लेजर मुहर' : 'Cryptographic Ledger Hash'}</span>
                  <h4 className="crop-meta-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {crop.blockHash ? `${crop.blockHash.substring(0, 16)}...` : 'Minted Genesis Link'}
                  </h4>
                  <p className="crop-meta-sub">
                    <button 
                      onClick={() => navigate('/ledger')} 
                      style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontSize: '0.78rem', fontWeight: 700 }}
                    >
                      {lang === 'hi' ? 'लेजर एक्सप्लोरर में देखें →' : 'Audit in Ledger Explorer →'}
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Vertical Chronological Crop Tracking Timeline */}
            <div className="glass-panel crop-timeline-section">
              <div className="crop-timeline-header">
                <div>
                  <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.12)', color: '#2E6847', borderColor: 'rgba(46, 104, 71, 0.3)', marginBottom: '0.45rem' }}>
                    CHRONOLOGICAL PROVENANCE
                  </span>
                  <h2 style={{ fontSize: '1.65rem', fontWeight: 600, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                    {lang === 'hi' ? 'फसल की संपूर्ण यात्रा (Farm to Buyer)' : 'Crop Journey & Ledger Event Timeline'}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>
                    {lang === 'hi' 
                      ? 'प्रत्येक ऐतिहासिक घटना लेजर में अपरिवर्तनीय है — पुराने रिकॉर्ड्स को ओवरराइट करने के बजाय संशोधन को नया ब्लॉक बनाया जाता है।'
                      : 'Historical ledger events are immutable. New updates, corrections, and inspections append chronological events.'}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="pulsing-dot pulsing-dot-green" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {lang === 'hi' ? 'लेजर सक्रिय' : 'Ledger Sealed'}
                  </span>
                </div>
              </div>

              {/* Timeline Items */}
              <div className="crop-v-timeline">
                {/* Stage 1: Farmer Harvest & Registration */}
                <div className="timeline-node timeline-node-completed">
                  <div className="timeline-marker">
                    <Sprout size={16} />
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="timeline-badge timeline-badge-harvest">
                          {lang === 'hi' ? 'फसल पंजीकरण' : 'FARM REGISTRATION'}
                        </span>
                        <strong className="timeline-title">
                          {lang === 'hi' ? 'फसल कटाई व प्रारंभिक मात्रा घोषणा' : 'Harvest Entry & Quantity Declaration'}
                        </strong>
                      </div>
                      <span className="timeline-time">
                        {new Date(crop.harvestDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="timeline-desc">
                      {lang === 'hi'
                        ? `किसान ${crop.farmerName} (${crop.farmerId}) द्वारा ${crop.declaredQuantity || crop.quantity} kg ${crop.cropType} का पंजीकरण किया गया। गुणवत्ता: ${crop.qualityStatus}।`
                        : `Farmer ${crop.farmerName} declared ${crop.declaredQuantity || crop.quantity} kg of ${crop.cropType} (${crop.variety}) harvested in ${crop.farmLocation}. Quality tagged as ${crop.qualityStatus}.`}
                    </p>
                    <div className="timeline-meta-bar">
                      <span>Actor: <strong>{crop.farmerName}</strong></span>
                      <span>Declared: <strong>{crop.declaredQuantity || crop.quantity} kg</strong></span>
                      <span>Gate Price: <strong>₹{crop.expectedPrice || 28}/kg</strong></span>
                    </div>
                  </div>
                </div>

                {/* Stage 2: Warehouse Intake & Verification */}
                <div className={`timeline-node ${crop.currentStage === 'warehouse' || crop.currentStage === 'sold' ? 'timeline-node-completed' : 'timeline-node-pending'}`}>
                  <div className="timeline-marker">
                    <Building2 size={16} />
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="timeline-badge timeline-badge-warehouse">
                          {lang === 'hi' ? 'गोदाम सत्यापन' : 'WAREHOUSE INTAKE'}
                        </span>
                        <strong className="timeline-title">
                          {lang === 'hi' ? 'गोदाम आवक, वजन मिलान व साइलो भंडारण' : 'Weighbridge Intake & Silo Allocation'}
                        </strong>
                      </div>
                      <span className="timeline-time">
                        {crop.currentStage === 'warehouse' || crop.currentStage === 'sold'
                          ? new Date(crop.lastVerifiedDate || crop.updatedAt).toLocaleDateString()
                          : (lang === 'hi' ? 'प्रतीक्षित' : 'Pending')}
                      </span>
                    </div>
                    <p className="timeline-desc">
                      {crop.verifiedQuantity !== null && crop.verifiedQuantity !== undefined ? (
                        lang === 'hi'
                          ? `गोदाम ${crop.currentWarehouseId || 'WH-CENTRAL-01'} में वजन परीक्षण पूर्ण हुआ। घोषित: ${crop.declaredQuantity} kg, सत्यापित: ${crop.verifiedQuantity} kg। ${crop.discrepancyNotes || 'अंतर: 0 kg'}`
                          : `Warehouse ${crop.currentWarehouseId || 'WH-CENTRAL-01'} completed gate weighbridge audit. Declared: ${crop.declaredQuantity} kg, Verified: ${crop.verifiedQuantity} kg. ${crop.discrepancyNotes || 'Variance: 0 kg'}.`
                      ) : (
                        lang === 'hi'
                          ? 'उपज खेत से गोदाम पारगमन में है। गोदाम प्रबंधक द्वारा वास्तविक वजन और नमी की जांच के उपरांत नया ब्लॉक मिंट होगा।'
                          : 'Crop batch is in transit or awaiting weighbridge receiving dock verification.'
                      )}
                    </p>
                    {crop.verifiedQuantity !== null && crop.verifiedQuantity !== undefined && (
                      <div className="timeline-meta-bar">
                        <span>Hub: <strong>{crop.currentWarehouseId}</strong></span>
                        <span>Verified: <strong>{crop.verifiedQuantity} kg</strong></span>
                        <span>Variance: <strong style={{ color: crop.discrepancy === 0 ? '#2E6847' : '#dc2626' }}>{crop.discrepancy} kg</strong></span>
                        <span>Bay: <strong>{crop.storageLocation || 'Silo Alpha'}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stage 3: 15-Day Aging & Periodic Verification */}
                <div className={`timeline-node ${crop.verificationCount > 0 ? 'timeline-node-completed' : 'timeline-node-pending'}`}>
                  <div className="timeline-marker">
                    <Clock size={16} />
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="timeline-badge timeline-badge-audit">
                          {lang === 'hi' ? 'एजिंग निगरानी' : '15-DAY AGING CYCLE'}
                        </span>
                        <strong className="timeline-title">
                          {lang === 'hi' ? '15-दिन शेल्फ-लाइफ व मूल्य सुरक्षा चक्र' : 'Automated 15-Day Quality Audit'}
                        </strong>
                      </div>
                      <span className="timeline-time">
                        {crop.verificationCount > 0 
                          ? new Date(crop.lastVerifiedDate).toLocaleDateString()
                          : (lang === 'hi' ? 'सक्रिय चक्र' : 'Cycle Active')}
                      </span>
                    </div>
                    <p className="timeline-desc">
                      {crop.verificationCount > 0 ? (
                        lang === 'hi'
                          ? `15-दिन से अधिक अवधि तक सूचीबद्ध रहने के कारण स्वतः गुणवत्ता री-वेरिफिकेशन किया गया और ${crop.discountPercent || 20}% की निष्पक्ष छूट लागू की गई।`
                          : `Automated smart rule applied after 15 days unsold: re-verified lot quality with a ${crop.discountPercent || 20}% promotional fair-trade discount.`
                      ) : (
                        lang === 'hi'
                          ? '15-दिन शेल्फ-लाइफ टाइमर सक्रिय है। यदि 15 दिनों के भीतर बिक्री नहीं होती, तो गुणवत्ता की दोबारा पुष्टि की जाएगी।'
                          : '15-day stock aging guard is actively monitoring this batch. If unsold after 15 days, automated audit runs.'
                      )}
                    </p>
                    <div className="timeline-meta-bar">
                      <span>Status: <strong>{crop.status || 'listed'}</strong></span>
                      <span>Audits Passed: <strong>{crop.verificationCount || 0}</strong></span>
                      <span>Discount: <strong>{crop.discountPercent || 0}%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Stage 4: Buyer Purchase & Settlement */}
                <div className={`timeline-node ${crop.currentStage === 'sold' ? 'timeline-node-completed' : 'timeline-node-pending'}`}>
                  <div className="timeline-marker">
                    <ShoppingBag size={16} />
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="timeline-badge timeline-badge-sale">
                          {lang === 'hi' ? 'मंडी लेनदेन' : 'MARKETPLACE SALE'}
                        </span>
                        <strong className="timeline-title">
                          {lang === 'hi' ? 'थोक खरीद, निपटान व डिजिटल मालिकाना हक' : 'Buyer Procurement & Settlement'}
                        </strong>
                      </div>
                      <span className="timeline-time">
                        {crop.currentStage === 'sold'
                          ? new Date(crop.updatedAt).toLocaleDateString()
                          : (lang === 'hi' ? 'मंडी में खुला' : 'Open in Mandi')}
                      </span>
                    </div>
                    <p className="timeline-desc">
                      {crop.currentStage === 'sold' ? (
                        lang === 'hi'
                          ? `सत्यापित खरीदार ${crop.currentBuyerId || 'BUYER-501'} ने लॉट की खरीद की। भुगतान सीधे किसान को स्थानांतरित और लेजर पर पूर्ण मुहर दर्ज।`
                          : `Purchased by verified institutional buyer ${crop.currentBuyerId || 'BUYER-501'}. Direct payment settled to grower account with cryptographic title transfer.`
                      ) : (
                        lang === 'hi'
                          ? 'यह लॉट वर्तमान में थोक व्यापारियों के लिए सत्यापित मंडी में उपलब्ध है। पारदर्शी मूल्य पर सीधे किसान से खरीदें।'
                          : 'Currently listed in the verified commodity marketplace with full cryptographic provenance.'
                      )}
                    </p>
                    {crop.currentStage === 'sold' && (
                      <div className="timeline-meta-bar">
                        <span>Buyer: <strong>{crop.currentBuyerId}</strong></span>
                        <span>Title: <strong>Settled & Transferred</strong></span>
                        <span>Status: <strong>Delivered</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Chained Ledger History from Server */}
            {history.length > 0 && (
              <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem', borderRadius: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <ShieldCheck size={20} color="#2E6847" />
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {lang === 'hi' ? 'लेजर ब्लॉक श्रृंखला (Raw Chained Blocks)' : 'Cryptographic Event Blocks'}
                    </h3>
                  </div>
                  <span className="badge" style={{ background: 'rgba(23, 61, 43, 0.08)', color: 'var(--primary)' }}>
                    {history.length} {lang === 'hi' ? 'ब्लॉक्स लिंक' : 'Linked Blocks'}
                  </span>
                </div>

                <div className="crop-raw-blocks-list">
                  {history.map((block, i) => (
                    <div key={block.hash || i} className="crop-raw-block-row">
                      <div className="crop-block-index">#{block.index}</div>
                      <div className="crop-block-action">
                        <strong>{block.data?.action || 'LEDGER_EVENT'}</strong>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {new Date(block.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="crop-block-hash">
                        <span style={{ color: 'var(--text-light)', fontSize: '0.72rem' }}>HASH: </span>
                        <code style={{ color: '#2E6847', fontWeight: 700 }}>{block.hash?.substring(0, 20)}...</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Calendar, Scale, MapPin, Tag, ArrowLeft, 
  Sparkles, CheckCircle2, AlertTriangle, Layers, Award, 
  ExternalLink, Eye, Printer, FastForward, Building2, 
  ShoppingBag, Filter, Search, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PortalHeaderBar from '../components/PortalHeaderBar';
import KisanReceiptModal from '../components/KisanReceiptModal';
import { soundFX } from '../utils/audioFX';

export default function MyCropsPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stageFilter, setStageFilter] = useState('all'); // 'all', 'farm', 'warehouse', 'sold'
  const [searchQuery, setSearchQuery] = useState('');
  const [agingMsg, setAgingMsg] = useState(null);

  // Receipt modal state
  const [selectedCropForReceipt, setSelectedCropForReceipt] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const farmerId = currentUser?.role === 'farmer' ? currentUser.uniqueId : 'FARMER-101';

  useEffect(() => {
    fetchCrops();
  }, [farmerId]);

  const fetchCrops = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/crops?farmerId=${farmerId}`);
      const data = await res.json();
      if (data.success && data.crops) {
        setCrops(data.crops);
      }
    } catch (err) {
      console.error('Error fetching crops:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateAging = async (cropId) => {
    soundFX.click();
    try {
      const res = await fetch('/api/crops/simulate-aging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropId, daysFastForward: 16 })
      });
      const data = await res.json();
      if (data.success) {
        soundFX.success();
        setAgingMsg(data.message);
        fetchCrops();
        setTimeout(() => setAgingMsg(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCrops = crops.filter(c => {
    const matchesStage = stageFilter === 'all' || c.currentStage === stageFilter;
    const matchesQuery = !searchQuery || 
      c.cropType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.variety?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c._id?.toString().includes(searchQuery);
    return matchesStage && matchesQuery;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)', paddingBottom: '3rem' }}>
      <PortalHeaderBar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentPortal="farmer" 
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Top Navigation & Actions Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/farmer')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} />
            <span>{lang === 'hi' ? 'किसान डैशबोर्ड पर वापस' : 'Back to Dashboard'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => navigate('/farmer/profile')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
            >
              <span>{lang === 'hi' ? 'किसान प्रोफाइल' : 'Farmer Profile'}</span>
            </button>
            <button
              onClick={() => navigate('/farmer/register-crop')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--botanical-green)', color: '#ffffff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}
            >
              <Sprout size={15} />
              <span>{lang === 'hi' ? '+ नई फसल दर्ज करें' : '+ Register Harvest'}</span>
            </button>
          </div>
        </div>

        {/* Page Title & Stats */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--text-main)' }}>
            {lang === 'hi' ? 'मेरी फसलें (My Crops & Inventory)' : 'My Registered Harvests & Inventory'}
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            {lang === 'hi'
              ? 'किसान द्वारा घोषित मात्रा बनाम गोदाम द्वारा सत्यापित वजन की लाइव निगरानी और प्रत्येक लॉट की ब्लॉकचेन टाइमलाइन।'
              : 'Monitor declared vs verified weights, gate weighbridge discrepancies, and chronological ledger milestones.'}
          </p>
        </div>

        {agingMsg && (
          <div style={{ background: 'rgba(214, 167, 92, 0.15)', border: '1px solid var(--harvest-gold)', borderRadius: '10px', padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--harvest-gold)', fontWeight: 600, fontSize: '0.88rem' }}>
            <FastForward size={18} />
            <span>{agingMsg}</span>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
              {lang === 'hi' ? 'चरण:' : 'Stage:'}
            </span>
            {[
              { id: 'all', labelHi: 'सभी फसलें', labelEn: 'All Crops' },
              { id: 'farm', labelHi: 'खेत पर (Farm Gate)', labelEn: 'Farm Gate' },
              { id: 'warehouse', labelHi: 'गोदाम साइलो में (Warehouse)', labelEn: 'In Warehouse Silos' },
              { id: 'sold', labelHi: 'बिक्री संपन्न (Sold)', labelEn: 'Settled / Sold' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setStageFilter(f.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '8px',
                  border: `1px solid ${stageFilter === f.id ? 'var(--botanical-green)' : 'var(--border)'}`,
                  background: stageFilter === f.id ? 'var(--botanical-green)' : 'var(--surface)',
                  color: stageFilter === f.id ? '#ffffff' : 'var(--text-main)',
                  fontWeight: stageFilter === f.id ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {lang === 'hi' ? f.labelHi : f.labelEn}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '240px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder={lang === 'hi' ? 'फसल, किस्म या आईडी खोजें...' : 'Search crop name, variety, ID...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '0.45rem 0.75rem 0.45rem 2rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.82rem' }}
              />
            </div>
            <button
              onClick={fetchCrops}
              style={{ padding: '0.45rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', cursor: 'pointer' }}
              title="Refresh crops"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Crops List Grid */}
        {loading ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--surface-card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <div className="spin-slow" style={{ width: '36px', height: '36px', border: '3px solid var(--border)', borderTopColor: 'var(--botanical-green)', borderRadius: '50%', margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{lang === 'hi' ? 'फसल रिकॉर्ड लोड हो रहे हैं...' : 'Loading registered crop records...'}</p>
          </div>
        ) : filteredCrops.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--surface-card)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <Sprout size={48} color="var(--botanical-green)" style={{ margin: '0 auto 1rem', opacity: 0.6 }} />
            <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-main)' }}>
              {lang === 'hi' ? 'कोई फसल नहीं मिली' : 'No Crops Found in This Filter'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              {lang === 'hi' ? 'इस श्रेणी में अभी कोई फसल दर्ज नहीं है।' : 'Register your first harvest batch to mint an immutable ledger receipt.'}
            </p>
            <button
              onClick={() => navigate('/farmer/register-crop')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem', borderRadius: '8px', border: 'none', background: 'var(--botanical-green)', color: '#ffffff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
            >
              <Sprout size={16} />
              <span>{lang === 'hi' ? 'नई फसल दर्ज करें' : 'Register Harvest'}</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {filteredCrops.map((crop) => {
              const declared = crop.declaredQuantity || crop.quantity;
              const verified = crop.verifiedQuantity;
              const hasDiscrepancy = verified !== null && verified !== undefined && crop.discrepancy !== 0;

              return (
                <div
                  key={crop._id}
                  style={{
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Top Status & Stage Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: 800, 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '999px',
                        background: crop.currentStage === 'warehouse' ? 'rgba(214, 167, 92, 0.15)' : crop.currentStage === 'sold' ? 'rgba(23, 61, 43, 0.15)' : 'rgba(46, 104, 71, 0.15)',
                        color: crop.currentStage === 'warehouse' ? 'var(--harvest-gold)' : crop.currentStage === 'sold' ? 'var(--forest-green)' : 'var(--botanical-green)',
                        border: `1px solid ${crop.currentStage === 'warehouse' ? 'var(--harvest-gold)' : crop.currentStage === 'sold' ? 'var(--forest-green)' : 'var(--botanical-green)'}`
                      }}>
                        {crop.currentStage === 'warehouse' ? (lang === 'hi' ? 'साइलो में सुरक्षित (Warehouse)' : 'IN WAREHOUSE') :
                         crop.currentStage === 'sold' ? (lang === 'hi' ? 'बिक्री संपन्न (Sold)' : 'SOLD') :
                         (lang === 'hi' ? 'खेत पर (Farm Gate)' : 'AT FARM GATE')}
                      </span>

                      {crop.status === 'aged-relisted' && (
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(214, 167, 92, 0.2)', color: 'var(--harvest-gold)' }}>
                          {lang === 'hi' ? '15-दिन एजिंग छूट (-20%)' : '15-DAY AGED (-20%)'}
                        </span>
                      )}
                    </div>

                    {/* Title & Variety */}
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 800, margin: '0 0 0.25rem', color: 'var(--text-main)' }}>
                      {crop.cropType}
                    </h3>
                    <p style={{ margin: '0 0 1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {crop.variety || 'Standard Desi'} • {crop.qualityStatus || 'Grade A'}
                    </p>

                    {/* Quantity Showcase: Declared vs Verified */}
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '0.85rem 1rem', marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {lang === 'hi' ? 'घोषित वजन' : 'Declared Weight'}
                        </span>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                          {declared.toLocaleString('en-IN')} kg
                        </span>
                      </div>

                      <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '0.75rem' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {lang === 'hi' ? 'धर्मकांटा तौल' : 'Verified Weight'}
                        </span>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: verified ? 'var(--botanical-green)' : 'var(--text-muted)' }}>
                          {verified ? `${verified.toLocaleString('en-IN')} kg` : (lang === 'hi' ? 'आवक लंबित' : 'Awaiting Scale')}
                        </span>
                      </div>
                    </div>

                    {/* Discrepancy Alert If Any */}
                    {hasDiscrepancy && (
                      <div style={{ background: 'rgba(214, 167, 92, 0.1)', border: '1px solid rgba(214, 167, 92, 0.3)', borderRadius: '8px', padding: '0.5rem 0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--harvest-gold)' }}>
                        <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                        <span>
                          {lang === 'hi' 
                            ? `धर्मकांटा अंतर: ${crop.discrepancy} kg (${crop.discrepancyNotes || 'सफाई कटौती'})` 
                            : `Scale Variance: ${crop.discrepancy} kg (${crop.discrepancyNotes || 'dockage'})`}
                        </span>
                      </div>
                    )}

                    {/* Crop Metadata Strip */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{lang === 'hi' ? 'अपेक्षित मूल्य:' : 'Expected Price:'}</span>
                        <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>₹{crop.expectedPrice}/kg (₹{crop.expectedPrice * 100}/Q)</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{lang === 'hi' ? 'कटाई तिथि:' : 'Harvest Date:'}</span>
                        <span style={{ fontWeight: 600 }}>{new Date(crop.harvestDate).toLocaleDateString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{lang === 'hi' ? 'खेत का स्थान:' : 'Farm Location:'}</span>
                        <span style={{ fontWeight: 600 }}>{crop.farmLocation || 'Ludhiana, Punjab'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setSelectedCropForReceipt(crop);
                        setIsReceiptOpen(true);
                      }}
                      style={{ padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      title="Print legal digital custody receipt"
                    >
                      <Printer size={13} />
                      <span>{lang === 'hi' ? 'किसान पर्ची' : 'Receipt'}</span>
                    </button>

                    {crop.currentStage !== 'sold' && (
                      <button
                        onClick={() => handleSimulateAging(crop._id)}
                        style={{ padding: '0.45rem 0.65rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--harvest-gold)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        title="Simulate 15-day aging cycle for demo"
                      >
                        <FastForward size={13} />
                        <span>{lang === 'hi' ? '15-दिन चक्र' : '+15 Days'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/crop/${crop._id}/trace`)}
                      style={{ padding: '0.45rem 0.85rem', borderRadius: '8px', border: 'none', background: 'var(--botanical-green)', color: '#ffffff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      <span>{lang === 'hi' ? 'टाइमलाइन देखें' : 'View Trace'}</span>
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Kisan Receipt Modal */}
      {isReceiptOpen && selectedCropForReceipt && (
        <KisanReceiptModal 
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          crop={selectedCropForReceipt}
          block={{ hash: selectedCropForReceipt.blockHash || 'SHA256_PENDING', index: 1, timestamp: selectedCropForReceipt.createdAt }}
          lang={lang}
        />
      )}
    </div>
  );
}

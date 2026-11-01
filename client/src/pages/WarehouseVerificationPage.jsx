import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, Scale, ArrowLeft, CheckCircle2, AlertTriangle, 
  Layers, Package, Calendar, MapPin, Tag, RefreshCw, 
  ShieldCheck, FileText, Check, ArrowRight, User, Sparkles
} from 'lucide-react';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { soundFX } from '../utils/audioFX';

export default function WarehouseVerificationPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crops, setCrops] = useState([]);
  const [selectedCropId, setSelectedCropId] = useState(id || '');
  const [warehouseId, setWarehouseId] = useState('WH-CENTRAL-01');
  const [receivedQuantity, setReceivedQuantity] = useState('');
  const [storageLocation, setStorageLocation] = useState('Silo Alpha — Bay 3 (Dry Aerated)');
  const [conditionStatus, setConditionStatus] = useState('Grade A');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchIncomingCrops();
  }, []);

  useEffect(() => {
    if (id) {
      setSelectedCropId(id);
    }
  }, [id]);

  const fetchIncomingCrops = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/crops');
      const data = await res.json();
      if (data.success && data.crops) {
        setCrops(data.crops);
        if (!selectedCropId && data.crops.length > 0) {
          const incoming = data.crops.find(c => c.currentStage === 'farm') || data.crops[0];
          setSelectedCropId(incoming._id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedCrop = crops.find(c => c._id === selectedCropId);

  // Set initial received quantity when crop is selected
  useEffect(() => {
    if (selectedCrop && receivedQuantity === '') {
      setReceivedQuantity(selectedCrop.declaredQuantity || selectedCrop.quantity);
    }
  }, [selectedCrop]);

  const declaredQty = selectedCrop ? (selectedCrop.declaredQuantity || selectedCrop.quantity) : 0;
  const numReceived = receivedQuantity !== '' ? Number(receivedQuantity) : declaredQty;
  const discrepancy = numReceived - declaredQty;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCropId) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/warehouse/update-stock', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropId: selectedCropId,
          warehouseId,
          receivedQuantity: numReceived,
          storageLocation,
          conditionStatus,
          notes: notes || (discrepancy === 0 ? 'Exact weighbridge match' : `Discrepancy of ${discrepancy} kg recorded`)
        })
      });

      const data = await res.json();
      if (data.success && data.crop) {
        soundFX.success();
        setSuccessResult({
          crop: data.crop,
          block: data.block,
          discrepancy
        });
        fetchIncomingCrops();
      } else {
        setErrorMsg(data.message || 'Verification failed');
      }
    } catch (err) {
      setErrorMsg('Network error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)', paddingBottom: '3rem' }}>
      <PortalHeaderBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} currentPortal="warehouse" />

      <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/warehouse')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} />
            <span>{lang === 'hi' ? 'गोदाम हब पर वापस' : 'Back to Warehouse Dashboard'}</span>
          </button>

          <span style={{ fontSize: '0.82rem', color: 'var(--harvest-gold)', fontWeight: 700 }}>
            {lang === 'hi' ? 'धर्मकांटा आवक वजन सत्यापन' : 'Weighbridge Intake Audit Station'}
          </span>
        </div>

        {/* Title Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '999px', background: 'rgba(214, 167, 92, 0.15)', color: 'var(--harvest-gold)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.6rem', textTransform: 'uppercase' }}>
            <Scale size={13} />
            <span>{lang === 'hi' ? 'प्रमाणित धर्मकांटा पैमाना' : 'Certified Gate Scale Audit'}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, margin: '0 0 0.4rem', color: 'var(--text-main)' }}>
            {lang === 'hi' ? 'गोदाम फसल सत्यापन व तौल मिलान' : 'Weighbridge Intake & Discrepancy Verification'}
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            {lang === 'hi'
              ? 'किसान द्वारा घोषित वजन बनाम धर्मकांटा पर वास्तविक प्राप्त वजन का मिलान करें। अंतर (Discrepancy) स्थायी रूप से लेजर पर दर्ज होगा।'
              : 'Audit declared farm harvest weight against certified scale readings. Discrepancies and dockage deductions are permanently minted onto the ledger.'}
          </p>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#ef4444', fontSize: '0.88rem' }}>
            <AlertTriangle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Modal / Result Banner */}
        {successResult && (
          <div style={{ background: 'rgba(46, 104, 71, 0.15)', border: '1.5px solid var(--botanical-green)', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={24} color="var(--botanical-green)" />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontWeight: 800, color: 'var(--text-main)' }}>
                    {lang === 'hi' ? 'फसल सफलतापूर्वक सत्यापित व गोदाम में दर्ज!' : 'Harvest Lot Verified & Minted into Silo Inventory!'}
                  </h3>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {lang === 'hi' 
                      ? `घोषित: ${successResult.crop.declaredQuantity} kg • सत्यापित: ${successResult.crop.verifiedQuantity} kg • अंतर: ${successResult.discrepancy} kg`
                      : `Declared: ${successResult.crop.declaredQuantity} kg • Verified: ${successResult.crop.verifiedQuantity} kg • Variance: ${successResult.discrepancy} kg`}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => navigate(`/crop/${successResult.crop._id}/trace`)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--botanical-green)', color: '#ffffff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  <span>{lang === 'hi' ? 'टाइमलाइन देखें' : 'View Timeline'}</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => setSuccessResult(null)}
                  style={{ padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  {lang === 'hi' ? 'अन्य फसल सत्यापित करें' : 'Verify Another'}
                </button>
              </div>
            </div>

            {successResult.block && (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '10px', padding: '0.75rem 1rem', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span>Minted Block #{successResult.block.index}:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--hash-color)', fontWeight: 700 }}>
                  {successResult.block.hash}
                </span>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Left Form Column */}
          <form onSubmit={handleSubmit} style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 800, margin: '0 0 1.5rem', color: 'var(--text-main)' }}>
              {lang === 'hi' ? 'आवक बैच व धर्मकांटा विवरण' : 'Weighbridge Intake Parameters'}
            </h2>

            {/* Crop Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? 'सत्यापन हेतु फसल बैच चुनें' : 'Select Incoming Harvest Batch'}
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => {
                  setSelectedCropId(e.target.value);
                  const found = crops.find(c => c._id === e.target.value);
                  if (found) {
                    setReceivedQuantity(found.declaredQuantity || found.quantity);
                  }
                }}
                style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}
              >
                {crops.map(c => (
                  <option key={c._id} value={c._id}>
                    {c.cropType} ({c.variety}) • Declared: {c.declaredQuantity || c.quantity} kg • Farmer: {c.farmerName} [{c.currentStage.toUpperCase()}]
                  </option>
                ))}
              </select>
            </div>

            {/* Dual Quantity Calculator */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* Farmer Declared (Read Only) */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.25rem' }}>
                  {lang === 'hi' ? 'किसान घोषित वजन (Farm Gate)' : 'Farmer Declared Weight'}
                </span>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {declaredQty.toLocaleString('en-IN')} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>kg</span>
                </div>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  {lang === 'hi' ? 'किसान पर्ची पर दर्ज प्रारंभिक वजन' : 'Original weight minted at farm gate'}
                </p>
              </div>

              {/* Certified Scale Input */}
              <div style={{ background: 'var(--surface)', border: '1.5px solid var(--harvest-gold)', borderRadius: '12px', padding: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.25rem', fontWeight: 700 }}>
                  {lang === 'hi' ? 'धर्मकांटा वास्तविक तौल (Scale Intake)' : 'Certified Scale Reading (kg)'}
                </span>
                <input 
                  type="number" 
                  value={receivedQuantity} 
                  onChange={(e) => setReceivedQuantity(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.35rem 0', fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', background: 'transparent', border: 'none', outline: 'none' }}
                />
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {lang === 'hi' ? 'प्रमाणित वेइब्रिज से प्राप्त संख्या' : 'Enter certified weighbridge scale reading'}
                </p>
              </div>
            </div>

            {/* Live Discrepancy Status Banner */}
            <div style={{ 
              background: discrepancy === 0 ? 'rgba(46, 104, 71, 0.1)' : 'rgba(214, 167, 92, 0.12)', 
              border: `1.5px solid ${discrepancy === 0 ? 'var(--botanical-green)' : 'var(--harvest-gold)'}`, 
              borderRadius: '12px', 
              padding: '1rem 1.25rem', 
              marginBottom: '1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {discrepancy === 0 ? <CheckCircle2 size={22} color="var(--botanical-green)" /> : <AlertTriangle size={22} color="var(--harvest-gold)" />}
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {discrepancy === 0 
                      ? (lang === 'hi' ? '100% सही वजन मिलान (Exact Match)' : 'Zero Weight Variance (Exact Match)') 
                      : (lang === 'hi' ? `वजन में अंतर दर्ज: ${discrepancy} kg` : `Weight Discrepancy Detected: ${discrepancy > 0 ? '+' : ''}${discrepancy} kg`)}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {discrepancy === 0 
                      ? (lang === 'hi' ? 'घोषित और प्राप्त वजन में शून्य अंतर है।' : 'Farmer declared weight matches weighbridge reading perfectly.')
                      : (discrepancy < 0 
                          ? (lang === 'hi' ? 'कमी (Shortage/Dockage): सफाई व नमी की कटौती।' : 'Deficit / Dockage: Moisture or chaff deduction applied.')
                          : (lang === 'hi' ? 'अतिरिक्त (Surplus): किसान घोषणा से अधिक वजन।' : 'Surplus: Received quantity exceeds declared declaration.'))}
                  </p>
                </div>
              </div>

              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 800, color: discrepancy === 0 ? 'var(--botanical-green)' : 'var(--harvest-gold)' }}>
                {discrepancy > 0 ? `+${discrepancy}` : discrepancy} kg
              </span>
            </div>

            {/* Warehouse & Storage Location */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {lang === 'hi' ? 'गोदाम पहचान (Warehouse ID)' : 'Warehouse Facility'}
                </label>
                <select
                  value={warehouseId}
                  onChange={(e) => setWarehouseId(e.target.value)}
                  style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
                >
                  <option value="WH-CENTRAL-01">WH-CENTRAL-01 (Ambala Logistics Hub)</option>
                  <option value="WH-NORTH-02">WH-NORTH-02 (Patiala Grain Depot)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {lang === 'hi' ? 'साइलो बे आवंटन' : 'Silo Bay Allocation'}
                </label>
                <select
                  value={storageLocation}
                  onChange={(e) => setStorageLocation(e.target.value)}
                  style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
                >
                  <option value="Silo Alpha — Bay 3 (Dry Aerated)">Silo Alpha — Bay 3 (Dry Aerated)</option>
                  <option value="Silo Alpha — Bay 1 (Climate Controlled)">Silo Alpha — Bay 1 (Climate Controlled)</option>
                  <option value="Silo Beta — Bay 2 (Ventilated Shed)">Silo Beta — Bay 2 (Ventilated Shed)</option>
                  <option value="Cold Storage Unit C-1">Cold Storage Unit C-1</option>
                </select>
              </div>
            </div>

            {/* Quality Re-verification & Condition Notes */}
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.25rem', marginBottom: '1.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {lang === 'hi' ? 'सत्यापित ग्रेड' : 'Verified Grade'}
                </label>
                <select
                  value={conditionStatus}
                  onChange={(e) => setConditionStatus(e.target.value)}
                  style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
                >
                  <option value="Grade A">Grade A</option>
                  <option value="Organic Premium">Organic Premium</option>
                  <option value="Grade B">Grade B</option>
                  <option value="Grade C">Grade C</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {lang === 'hi' ? 'निरीक्षण व अंतर टिप्पणी (Dockage Notes)' : 'Inspection & Dockage Reason'}
                </label>
                <input 
                  type="text" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'hi' ? 'उदा: 10 kg भूसा व धूल कटौती, 11.2% नमी स्तर' : 'e.g. 10 kg dockage deduction for pre-cleaning, 11.2% moisture'}
                  style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            {/* Submit Action */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} color="var(--botanical-green)" />
                <span>{lang === 'hi' ? 'लेजर पर अपरिवर्तनीय सत्यापन ब्लॉक मिंट होगा' : 'Mints WAREHOUSE_QUANTITY_VERIFIED block'}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.85rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'var(--harvest-gold)',
                  color: '#1a180f',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(214, 167, 92, 0.3)'
                }}
              >
                <Scale size={18} />
                <span>
                  {isSubmitting
                    ? (lang === 'hi' ? 'सत्यापित हो रहा है...' : 'Minting Verification Block...')
                    : (lang === 'hi' ? 'वजन सत्यापित करें व रसीद बनाएं' : 'Verify Weight & Seal Block')}
                </span>
              </button>
            </div>
          </form>

          {/* Right Summary Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {selectedCrop && (
              <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, margin: '0 0 1rem', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {lang === 'hi' ? 'चयनित फसल लॉट' : 'Selected Lot Dossier'}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'फसल:' : 'Crop:'}</span>
                    <strong style={{ color: 'var(--text-main)' }}>{selectedCrop.cropType}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'किस्म:' : 'Variety:'}</span>
                    <span>{selectedCrop.variety}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'किसान:' : 'Farmer:'}</span>
                    <span>{selectedCrop.farmerName} ({selectedCrop.farmerId})</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'खेत का स्थान:' : 'Origin:'}</span>
                    <span>{selectedCrop.farmLocation}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'कटाई तिथि:' : 'Harvest Date:'}</span>
                    <span>{new Date(selectedCrop.harvestDate).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px solid var(--border-light)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{lang === 'hi' ? 'थोक भाव:' : 'Lot Value:'}</span>
                    <strong style={{ color: 'var(--botanical-green)' }}>₹{(selectedCrop.quantity * (selectedCrop.expectedPrice || 28)).toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>
            )}

            <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                onClick={() => navigate('/warehouse')}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>{lang === 'hi' ? 'साइलो क्षमता डैशबोर्ड →' : 'Silo Telemetry Dashboard →'}</span>
              </button>
              <button
                onClick={() => navigate('/ledger')}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>{lang === 'hi' ? 'लेजर एक्सप्लोरर ऑडिट →' : 'Audit Digital Ledger →'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

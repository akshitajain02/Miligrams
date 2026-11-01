import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, Calendar, Scale, MapPin, Tag, ArrowLeft, 
  Sparkles, CheckCircle2, AlertTriangle, Layers, Award, 
  Mic, MicOff, Volume2, ShieldCheck, Check, Info, FileText, Image
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PortalHeaderBar from '../components/PortalHeaderBar';
import KisanReceiptModal from '../components/KisanReceiptModal';
import { startVoiceRecognition, parseSpokenCrop, speakText } from '../utils/speechUtils';
import { soundFX } from '../utils/audioFX';

export default function CropRegistrationPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [farmers, setFarmers] = useState([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState(
    currentUser?.role === 'farmer' ? currentUser.uniqueId : 'FARMER-101'
  );

  // Form Fields
  const [cropType, setCropType] = useState('Sharbati Golden Wheat');
  const [variety, setVariety] = useState('Sharbati C-306 Bold');
  const [declaredQuantity, setDeclaredQuantity] = useState(1000);
  const [expectedPrice, setExpectedPrice] = useState(28);
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0]);
  const [qualityGrade, setQualityGrade] = useState('Grade A');
  const [farmLocation, setFarmLocation] = useState('Ludhiana, Punjab');
  const [cropImage, setCropImage] = useState('/farmer-sunset-field.jpg');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mintedData, setMintedData] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Voice Recognition State
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState(lang === 'hi' ? 'hi-IN' : 'en-IN');
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const [activeRecognition, setActiveRecognition] = useState(null);

  useEffect(() => {
    fetch('/api/farmers')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.farmers) {
          setFarmers(data.farmers);
          if (!selectedFarmerId && data.farmers.length > 0) {
            setSelectedFarmerId(data.farmers[0].uniqueId);
          }
        }
      })
      .catch(console.error);
  }, []);

  const popularCrops = [
    { type: 'Sharbati Golden Wheat', variety: 'Sharbati C-306 Bold', price: 28, img: '/farmer-sunset-field.jpg', hi: 'शरबती गेहूं' },
    { type: 'Royal Basmati Rice', variety: 'Basmati 1121 Extra Long', price: 68, img: '/nature-farm-banner.jpg', hi: 'शाही बासमती' },
    { type: 'Organic Pearl Millet', variety: 'Desi Hybrid Bajra', price: 24, img: '/farm-aerial-harvest.jpg', hi: 'देसी बाजरा' },
    { type: 'Yellow Mustard Seeds', variety: 'Pusa Bold Mustard', price: 54, img: '/farmer-thumbs-up-sold.jpg', hi: 'पीली सरसों' },
    { type: 'Desi Chickpeas (Chana)', variety: 'Desi Bold Chana', price: 61, img: '/nature-farm-banner.jpg', hi: 'देसी चना' },
    { type: 'Hybrid Sweet Maize', variety: 'DKC-9108 Orange Grain', price: 22, img: '/farm-aerial-harvest.jpg', hi: 'संकर मक्का' }
  ];

  const handleSelectPreset = (item) => {
    soundFX.click();
    setCropType(item.type);
    setVariety(item.variety);
    setExpectedPrice(item.price);
    setCropImage(item.img);
  };

  const handleStartVoice = () => {
    if (isListening && activeRecognition) {
      activeRecognition.stop();
      setIsListening(false);
      setVoiceFeedback('');
      return;
    }

    soundFX.click();
    setIsListening(true);
    setVoiceFeedback(lang === 'hi' ? 'सुन रहे हैं... बोलिए (उदा: "500 किलो शरबती गेहूं")' : 'Listening... speak (e.g. "800 kg Basmati Rice")');

    const rec = startVoiceRecognition(
      voiceLang,
      (transcript) => {
        setVoiceFeedback(`"${transcript}"`);
        const parsed = parseSpokenCrop(transcript);

        if (parsed.cropName) {
          setCropType(parsed.cropName);
        }
        if (parsed.quantity) {
          setDeclaredQuantity(parsed.quantity);
        }
        if (parsed.grade) {
          setQualityGrade(parsed.grade);
        }

        soundFX.success();
        setIsListening(false);
      },
      (err) => {
        setVoiceFeedback(lang === 'hi' ? 'आवाज पहचानी नहीं गई, पुनः प्रयास करें।' : 'Could not recognize speech, try again.');
        setIsListening(false);
      }
    );

    setActiveRecognition(rec);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const activeFarmer = farmers.find(f => f.uniqueId === selectedFarmerId) || { name: 'Ramesh Patel', uniqueId: 'FARMER-101' };

    try {
      const payload = {
        cropType,
        variety,
        quantity: Number(declaredQuantity),
        declaredQuantity: Number(declaredQuantity),
        expectedPrice: Number(expectedPrice),
        harvestDate,
        qualityStatus: qualityGrade,
        farmerId: activeFarmer.uniqueId,
        farmerName: activeFarmer.name,
        farmLocation,
        cropImages: [cropImage]
      };

      const res = await fetch('/api/crops/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success && data.crop) {
        soundFX.success();
        setMintedData({
          crop: data.crop,
          block: data.block
        });
        setIsReceiptOpen(true);
      } else {
        setErrorMsg(data.message || 'Failed to upload crop batch');
      }
    } catch (err) {
      setErrorMsg('Network error: ' + err.message);
    } finally {
      setIsSubmitting(false);
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

      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <button 
            onClick={() => navigate('/farmer')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} />
            <span>{lang === 'hi' ? 'किसान पोर्टल पर वापस' : 'Back to Farmer Portal'}</span>
          </button>

          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {lang === 'hi' ? 'कदम 1: खेत से नई फसल का पंजीकरण' : 'Step 1: Farm Gate Harvest Registration'}
          </span>
        </div>

        {/* Title Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '999px', background: 'rgba(46, 104, 71, 0.12)', color: 'var(--botanical-green)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.6rem', textTransform: 'uppercase' }}>
            <Sparkles size={13} />
            <span>{lang === 'hi' ? 'अपरिवर्तनीय लेजर मिंटिंग' : 'Immutable Provenance Birth'}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--text-main)' }}>
            {lang === 'hi' ? 'नई फसल दर्ज करें (Crop Registration)' : 'Register Harvest Lot & Mint Ledger Block'}
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {lang === 'hi'
              ? 'किसान द्वारा घोषित मात्रा डिजिटल पर्ची के रूप में लेजर पर दर्ज होगी। गोदाम में वास्तविक धर्मकांटा तौल के समय अंतर का सत्यापन किया जाएगा।'
              : 'Declared harvest weight creates an immutable custody receipt on the SHA-256 digital ledger. Certified scales verify weights upon warehouse delivery.'}
          </p>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '10px', padding: '0.85rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#ef4444', fontSize: '0.88rem' }}>
            <AlertTriangle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Voice AI Assistant Strip */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={handleStartVoice}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: 'none',
                background: isListening ? '#ef4444' : 'var(--botanical-green)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isListening ? '0 0 0 6px rgba(239, 68, 68, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
              title="Voice input"
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>{lang === 'hi' ? 'आवाज से फसल विवरण भरें' : 'Voice-Assisted Harvest Entry'}</span>
                <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(46, 104, 71, 0.15)', color: 'var(--botanical-green)', fontWeight: 800 }}>
                  {voiceLang === 'hi-IN' ? 'हिन्दी' : 'English'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {voiceFeedback || (lang === 'hi' ? 'माइक दबाकर बोलें: "500 किलो शरबती गेहूं ग्रेड ए"' : 'Tap microphone and speak: "800 kg Basmati Rice Grade A"')}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setVoiceLang('hi-IN')}
              style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: voiceLang === 'hi-IN' ? 'var(--botanical-green)' : 'var(--surface)', color: voiceLang === 'hi-IN' ? '#ffffff' : 'var(--text-main)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
            >
              हिन्दी वॉइस
            </button>
            <button
              type="button"
              onClick={() => setVoiceLang('en-IN')}
              style={{ padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border)', background: voiceLang === 'en-IN' ? 'var(--botanical-green)' : 'var(--surface)', color: voiceLang === 'en-IN' ? '#ffffff' : 'var(--text-main)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
            >
              English Voice
            </button>
          </div>
        </div>

        {/* Popular Presets Selector */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {lang === 'hi' ? 'त्वरित फसल चयन (Quick Crop Preset):' : 'Select Crop Category:'}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
            {popularCrops.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectPreset(c)}
                style={{
                  padding: '0.75rem 0.65rem',
                  borderRadius: '10px',
                  border: `1.5px solid ${cropType === c.type ? 'var(--botanical-green)' : 'var(--border)'}`,
                  background: cropType === c.type ? 'rgba(46, 104, 71, 0.1)' : 'var(--surface-card)',
                  color: 'var(--text-main)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.82rem'
                }}
              >
                <div>{lang === 'hi' ? c.hi : c.type}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>₹{c.price}/kg</div>
              </button>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            {/* Farmer Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? 'पंजीकृत किसान (Farmer Identity)' : 'Sovereign Farmer ID'}
              </label>
              <select
                value={selectedFarmerId}
                onChange={(e) => setSelectedFarmerId(e.target.value)}
                style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem', fontWeight: 600 }}
              >
                {farmers.map(f => (
                  <option key={f.uniqueId} value={f.uniqueId}>
                    {f.name} ({f.uniqueId}) • {f.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Crop Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? 'फसल का नाम (Crop Name)' : 'Crop Name'}
              </label>
              <input 
                type="text" 
                value={cropType} 
                onChange={(e) => setCropType(e.target.value)}
                required
                style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            {/* Variety */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? 'फसल किस्म (Variety)' : 'Crop Variety'}
              </label>
              <input 
                type="text" 
                value={variety} 
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. C-306, 1121 Extra Long"
                style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
              />
            </div>

            {/* Declared Quantity */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? 'घोषित मात्रा (Declared Quantity kg)' : 'Declared Quantity (kg)'}
              </label>
              <input 
                type="number" 
                min="1"
                value={declaredQuantity} 
                onChange={(e) => setDeclaredQuantity(e.target.value)}
                required
                style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem', fontWeight: 700 }}
              />
            </div>

            {/* Expected Price */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? 'अपेक्षित मूल्य (₹/kg)' : 'Expected Price (₹/kg)'}
              </label>
              <input 
                type="number" 
                min="1"
                value={expectedPrice} 
                onChange={(e) => setExpectedPrice(e.target.value)}
                required
                style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Harvest Date */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? 'कटाई तिथि (Harvest Date)' : 'Harvest Date'}
              </label>
              <input 
                type="date" 
                value={harvestDate} 
                onChange={(e) => setHarvestDate(e.target.value)}
                required
                style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
              />
            </div>

            {/* Quality Grade */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? 'गुणवत्ता ग्रेड (Quality Grade)' : 'Quality Grade'}
              </label>
              <select
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value)}
                style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
              >
                <option value="Grade A">Grade A (Certified Clean)</option>
                <option value="Organic Premium">Organic Premium</option>
                <option value="Grade B">Grade B (Standard)</option>
                <option value="Grade C">Grade C (Industrial/Feed)</option>
              </select>
            </div>

            {/* Farm Location */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {lang === 'hi' ? 'खेत का स्थान (Farm Location)' : 'Farm Location'}
              </label>
              <input 
                type="text" 
                value={farmLocation} 
                onChange={(e) => setFarmLocation(e.target.value)}
                style={{ width: '100%', padding: '0.7rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-main)', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} color="var(--botanical-green)" />
              <span>{lang === 'hi' ? 'अपलोड के साथ SHA-256 ब्लॉक स्वतः मिंट होगा' : 'Mints SHA-256 block immediately upon submission'}</span>
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
                background: 'var(--botanical-green)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(46, 104, 71, 0.25)'
              }}
            >
              <Sprout size={18} />
              <span>
                {isSubmitting
                  ? (lang === 'hi' ? 'लेजर पर दर्ज हो रहा है...' : 'Minting Ledger Block...')
                  : (lang === 'hi' ? 'फसल दर्ज करें व पर्ची बनाएं' : 'Register Harvest Batch')}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Kisan Receipt Modal on Successful Mint */}
      {isReceiptOpen && mintedData && (
        <KisanReceiptModal 
          isOpen={isReceiptOpen}
          onClose={() => {
            setIsReceiptOpen(false);
            navigate(`/crop/${mintedData.crop._id}`);
          }}
          crop={mintedData.crop}
          block={mintedData.block}
          lang={lang}
        />
      )}
    </div>
  );
}

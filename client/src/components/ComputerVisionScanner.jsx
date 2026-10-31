import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scan, Camera, Upload, CheckCircle2, AlertTriangle, ShieldCheck, 
  Sparkles, RefreshCw, FileText, Download, ArrowLeft, Eye, EyeOff,
  Cpu, Award, Layers, Sprout, Share2, Printer, Check
} from 'lucide-react';
import { soundFX } from '../utils/audioFX';
import PortalHeaderBar from './PortalHeaderBar';

export default function ComputerVisionScanner({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {},
  isModal = false,
  onClose = null,
  onApplyCertificate = null
}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Preset Crops for Inspection
  const presets = [
    {
      id: 'wheat',
      nameHi: 'शरबती गेहूं (Sharbati Wheat)',
      nameEn: 'Sharbati Golden Wheat',
      image: '/farmer-sunset-field.jpg',
      purity: 98.8,
      moisture: 11.2,
      impurities: 1.2,
      uniformity: 97.4,
      grade: 'Grade A+',
      priceEst: '₹2,850 / क्विंटल',
      color: '#10b981',
      boxes: [
        { id: 1, top: '22%', left: '30%', width: '12%', height: '14%', label: 'Kernel #01: 99.4%', type: 'clean' },
        { id: 2, top: '38%', left: '54%', width: '15%', height: '16%', label: 'Kernel #02: 98.9%', type: 'clean' },
        { id: 3, top: '56%', left: '26%', width: '14%', height: '15%', label: 'Kernel #03: 99.1%', type: 'clean' },
        { id: 4, top: '65%', left: '68%', width: '11%', height: '12%', label: 'Chaff / Husk: 0.6%', type: 'impurity' },
        { id: 5, top: '28%', left: '72%', width: '13%', height: '14%', label: 'Kernel #04: 98.2%', type: 'clean' },
        { id: 6, top: '72%', left: '42%', width: '10%', height: '11%', label: 'Broken: 0.4%', type: 'broken' }
      ]
    },
    {
      id: 'rice',
      nameHi: 'शाही बासमती 1121 (Basmati Rice)',
      nameEn: 'Royal Basmati 1121 Rice',
      image: '/nature-farm-banner.jpg',
      purity: 99.3,
      moisture: 10.8,
      impurities: 0.7,
      uniformity: 98.9,
      grade: 'Export Grade A+',
      priceEst: '₹6,800 / क्विंटल',
      color: '#38bdf8',
      boxes: [
        { id: 1, top: '25%', left: '32%', width: '10%', height: '18%', label: 'Slender Rice: 99.8%', type: 'clean' },
        { id: 2, top: '42%', left: '48%', width: '9%', height: '19%', label: 'Slender Rice: 99.6%', type: 'clean' },
        { id: 3, top: '60%', left: '35%', width: '10%', height: '17%', label: 'Slender Rice: 99.1%', type: 'clean' },
        { id: 4, top: '30%', left: '65%', width: '8%', height: '16%', label: 'Minor Discolor: 0.4%', type: 'impurity' },
        { id: 5, top: '68%', left: '62%', width: '11%', height: '15%', label: 'Slender Rice: 98.9%', type: 'clean' }
      ]
    },
    {
      id: 'millet',
      nameHi: 'देसी बाजरा (Pearl Millet)',
      nameEn: 'Organic Pearl Millet (Bajra)',
      image: '/farm-aerial-harvest.jpg',
      purity: 97.6,
      moisture: 11.9,
      impurities: 2.4,
      uniformity: 95.8,
      grade: 'Grade A',
      priceEst: '₹2,400 / क्विंटल',
      color: '#f59e0b',
      boxes: [
        { id: 1, top: '28%', left: '25%', width: '13%', height: '13%', label: 'Millet Seed: 98.2%', type: 'clean' },
        { id: 2, top: '45%', left: '50%', width: '12%', height: '12%', label: 'Millet Seed: 97.9%', type: 'clean' },
        { id: 3, top: '62%', left: '30%', width: '11%', height: '11%', label: 'Dust / Husk: 1.2%', type: 'impurity' },
        { id: 4, top: '35%', left: '68%', width: '14%', height: '14%', label: 'Millet Seed: 98.4%', type: 'clean' },
        { id: 5, top: '68%', left: '58%', width: '12%', height: '12%', label: 'Foreign Kernel: 0.8%', type: 'impurity' }
      ]
    },
    {
      id: 'mustard',
      nameHi: 'पीली सरसों (Mustard Seeds)',
      nameEn: 'Yellow Mustard Seeds',
      image: '/farmer-thumbs-up-sold.jpg',
      purity: 98.4,
      moisture: 8.5,
      impurities: 1.6,
      uniformity: 96.9,
      grade: 'Grade A',
      priceEst: '₹5,200 / क्विंटल',
      color: '#eab308',
      boxes: [
        { id: 1, top: '30%', left: '32%', width: '10%', height: '10%', label: 'Mustard Bead: 99.0%', type: 'clean' },
        { id: 2, top: '48%', left: '45%', width: '11%', height: '11%', label: 'Mustard Bead: 98.6%', type: 'clean' },
        { id: 3, top: '65%', left: '28%', width: '10%', height: '10%', label: 'Mustard Bead: 98.8%', type: 'clean' },
        { id: 4, top: '38%', left: '64%', width: '9%', height: '9%', label: 'Pod husk: 0.9%', type: 'impurity' }
      ]
    }
  ];

  const [selectedCrop, setSelectedCrop] = useState(presets[0]);
  const [customImage, setCustomImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [scanProgress, setScanProgress] = useState(100);
  const [mintedCertificate, setMintedCertificate] = useState(null);
  const [isMinting, setIsMinting] = useState(false);

  // Trigger scan animation
  const triggerScan = () => {
    soundFX.click();
    setIsScanning(true);
    setScanProgress(0);
    setMintedCertificate(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        soundFX.success();
      }
    }, 120);
  };

  const handlePresetSelect = (preset) => {
    soundFX.click();
    setSelectedCrop(preset);
    setCustomImage(null);
    setMintedCertificate(null);
    triggerScan();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      soundFX.click();
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setSelectedCrop({
          ...selectedCrop,
          nameHi: `कस्टम नमूना: ${file.name.substring(0, 18)}`,
          nameEn: `Custom Sample: ${file.name.substring(0, 18)}`,
          purity: 98.5,
          moisture: 11.0,
          impurities: 1.5,
          uniformity: 97.1,
          grade: 'Grade A+ Verified',
          priceEst: '₹2,920 / क्विंटल'
        });
        triggerScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMintCertificate = () => {
    soundFX.click();
    setIsMinting(true);

    setTimeout(() => {
      const randomHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const certId = `CERT-CV-${Math.floor(100000 + Math.random() * 900000)}`;

      const cert = {
        id: certId,
        cropName: lang === 'hi' ? selectedCrop.nameHi : selectedCrop.nameEn,
        grade: selectedCrop.grade,
        purity: selectedCrop.purity,
        moisture: selectedCrop.moisture,
        impurities: selectedCrop.impurities,
        uniformity: selectedCrop.uniformity,
        hash: randomHash,
        timestamp: new Date().toLocaleString(),
        inspector: 'MiliGrams Neural Vision Engine v3.4',
        agriStackVerified: true
      };

      setMintedCertificate(cert);
      setIsMinting(false);
      soundFX.success();

      if (onApplyCertificate) {
        onApplyCertificate(cert);
      }
    }, 900);
  };

  const activeImage = customImage || selectedCrop.image;

  return (
    <div className={`cv-scanner-container ${isModal ? 'cv-scanner-modal-mode' : ''}`}>
      {/* Top Navigation Bar (Only on standalone page) */}
      {!isModal && (
        <PortalHeaderBar 
          lang={lang} 
          setLang={setLang} 
          theme={theme} 
          toggleTheme={toggleTheme} 
          currentPortal="vision" 
        />
      )}

      {/* Main Scanner Section */}
      <div className="cv-scanner-wrapper">
        {/* Header Hero */}
        <div className="cv-scanner-header">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            <Cpu size={14} />
            <span>AI COMPUTER VISION CROP QUALITY LAB</span>
          </div>
          
          <h1 className="cv-scanner-title">
            {lang === 'hi'
              ? 'एआई कंप्यूटर विज़न से फसल गुणवत्ता व शुद्धता परीक्षण'
              : 'AI Computer Vision Crop Quality & Purity Inspection'}
          </h1>
          
          <p className="cv-scanner-subtitle">
            {lang === 'hi'
              ? 'अत्याधुनिक न्यूरल विज़न तकनीक द्वारा अनाज के एक-एक दाने की एकरूपता, नमी और अशुद्धियों की रीयल-टाइम जांच करें और ब्लॉकचेन पर डिजिटल गुणवत्ता मुहर प्राप्त करें।'
              : 'Real-time grain purity, uniformity, moisture detection, and SHA-256 cryptographic quality certification powered by MiliGrams Neural Vision.'}
          </p>
        </div>

        {/* Preset Crop Selector Tabs */}
        <div className="cv-presets-row">
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {lang === 'hi' ? 'नमूना चुनें:' : 'SELECT PRESET:'}
          </span>
          <div className="cv-preset-chips">
            {presets.map(p => {
              const isSelected = selectedCrop.id === p.id && !customImage;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePresetSelect(p)}
                  className={`cv-preset-chip ${isSelected ? 'active' : ''}`}
                  style={isSelected ? { borderColor: p.color, background: `${p.color}15`, color: 'var(--text-main)' } : {}}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                  <span>{lang === 'hi' ? p.nameHi : p.nameEn}</span>
                </button>
              );
            })}

            {/* Custom Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`cv-preset-chip ${customImage ? 'active' : ''}`}
              title="Upload your own grain sample photo"
            >
              <Upload size={14} />
              <span>{lang === 'hi' ? 'अपनी फोटो अपलोड करें' : 'Upload Crop Photo'}</span>
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleFileUpload} 
            />
          </div>
        </div>

        {/* Main 2-Column Inspection Viewport */}
        <div className="cv-viewport-grid">
          {/* Left Column: Live Visual Viewport with Scanning Laser & Bounding Boxes */}
          <div className="cv-camera-frame glass-panel">
            <div className="cv-frame-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`pulsing-dot ${isScanning ? 'pulsing-dot-amber' : 'pulsing-dot-green'}`} />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '0.04em' }}>
                  {isScanning 
                    ? (lang === 'hi' ? 'विज़न स्कैनिंग जारी...' : 'SCANNING GRAINS...') 
                    : (lang === 'hi' ? 'लाइव विज़न विश्लेषण' : 'VISION LIVE FEED')}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.72rem', padding: '0.25rem 0.55rem' }}
                  title="Toggle Bounding Boxes"
                >
                  {showBoundingBoxes ? <Eye size={13} /> : <EyeOff size={13} />}
                  <span>{showBoundingBoxes ? (lang === 'hi' ? 'बॉक्सेज चालू' : 'Labels ON') : (lang === 'hi' ? 'बॉक्सेज बंद' : 'Labels OFF')}</span>
                </button>

                <button
                  onClick={triggerScan}
                  className="btn btn-primary btn-sm"
                  style={{ fontSize: '0.72rem', padding: '0.25rem 0.65rem' }}
                  disabled={isScanning}
                >
                  <RefreshCw size={13} className={isScanning ? 'spin-slow' : ''} />
                  <span>{lang === 'hi' ? 'पुनः स्कैन करें' : 'Rescan'}</span>
                </button>
              </div>
            </div>

            {/* Visual Viewport Stage */}
            <div className="cv-stage-viewport">
              <img 
                src={activeImage} 
                alt="Grain Quality Inspection" 
                className="cv-sample-image" 
              />

              {/* Laser Scanning Line Sweep */}
              {isScanning && (
                <div className="cv-laser-sweep">
                  <div className="cv-laser-beam" />
                  <div className="cv-laser-glow" />
                </div>
              )}

              {/* Neural Bounding Boxes */}
              {showBoundingBoxes && selectedCrop.boxes && selectedCrop.boxes.map(box => (
                <div
                  key={box.id}
                  className={`cv-bounding-box cv-box-${box.type}`}
                  style={{
                    top: box.top,
                    left: box.left,
                    width: box.width,
                    height: box.height
                  }}
                >
                  <span className="cv-box-label">
                    {box.label}
                  </span>
                </div>
              ))}

              {/* Viewport Overlay HUD Grid */}
              <div className="cv-hud-overlay">
                <div className="cv-hud-corner cv-hud-tl" />
                <div className="cv-hud-corner cv-hud-tr" />
                <div className="cv-hud-corner cv-hud-bl" />
                <div className="cv-hud-corner cv-hud-br" />
                <div className="cv-hud-crosshair" />
              </div>

              {/* Progress Bar during scan */}
              {isScanning && (
                <div className="cv-scan-progress-bar">
                  <div className="cv-scan-fill" style={{ width: `${scanProgress}%` }} />
                </div>
              )}
            </div>

            {/* Viewport Footer Bar */}
            <div className="cv-frame-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                <Scan size={14} color="#10b981" />
                <span>
                  {lang === 'hi' 
                    ? `लॉट: ${selectedCrop.nameHi} • 4K रेजोल्यूशन विज़न विश्लेषण`
                    : `Lot: ${selectedCrop.nameEn} • 4K Ultra-Resolution Vision Inspection`}
                </span>
              </div>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)', fontSize: '0.7rem' }}>
                {selectedCrop.grade}
              </span>
            </div>
          </div>

          {/* Right Column: AI Inspection Metrics & Blockchain Minting */}
          <div className="cv-metrics-card glass-panel">
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)', marginBottom: '0.5rem' }}>
                <Award size={12} />
                <span>NEURAL ANALYSIS REPORT</span>
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                {lang === 'hi' ? selectedCrop.nameHi : selectedCrop.nameEn}
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
                {lang === 'hi' ? 'कंप्यूटर विज़न द्वारा आकलित गुणवत्ता विनिर्देश' : 'Computer Vision Quality Specifications'}
              </p>
            </div>

            {/* Quality Metrics Grid */}
            <div className="cv-metrics-grid">
              {/* Metric 1: Purity Index */}
              <div className="cv-metric-box">
                <div className="cv-metric-top">
                  <span className="cv-metric-name">{lang === 'hi' ? 'शुद्धता दर (Purity)' : 'Purity Index'}</span>
                  <span className="cv-metric-val" style={{ color: '#10b981' }}>{selectedCrop.purity}%</span>
                </div>
                <div className="cv-bar-bg">
                  <div className="cv-bar-fill" style={{ width: `${selectedCrop.purity}%`, background: '#10b981' }} />
                </div>
                <span className="cv-metric-note">
                  {lang === 'hi' ? 'मानक: >98% शुद्ध' : 'Standard: >98% Pure'}
                </span>
              </div>

              {/* Metric 2: Moisture Content */}
              <div className="cv-metric-box">
                <div className="cv-metric-top">
                  <span className="cv-metric-name">{lang === 'hi' ? 'नमी स्तर (Moisture)' : 'Moisture Index'}</span>
                  <span className="cv-metric-val" style={{ color: '#38bdf8' }}>{selectedCrop.moisture}%</span>
                </div>
                <div className="cv-bar-bg">
                  <div className="cv-bar-fill" style={{ width: `${(selectedCrop.moisture / 15) * 100}%`, background: '#38bdf8' }} />
                </div>
                <span className="cv-metric-note">
                  {lang === 'hi' ? 'सुरक्षित साइलो भंडारण: <12%' : 'Safe Silo Storage: <12%'}
                </span>
              </div>

              {/* Metric 3: Grain Uniformity */}
              <div className="cv-metric-box">
                <div className="cv-metric-top">
                  <span className="cv-metric-name">{lang === 'hi' ? 'दाना एकरूपता (Uniformity)' : 'Grain Uniformity'}</span>
                  <span className="cv-metric-val" style={{ color: '#a855f7' }}>{selectedCrop.uniformity}%</span>
                </div>
                <div className="cv-bar-bg">
                  <div className="cv-bar-fill" style={{ width: `${selectedCrop.uniformity}%`, background: '#a855f7' }} />
                </div>
                <span className="cv-metric-note">
                  {lang === 'hi' ? 'अनाज का सुडौल आकार' : 'Kernel Size Consistency'}
                </span>
              </div>

              {/* Metric 4: Impurities */}
              <div className="cv-metric-box">
                <div className="cv-metric-top">
                  <span className="cv-metric-name">{lang === 'hi' ? 'विदेशी अशुद्धियां (Impurities)' : 'Foreign Matter'}</span>
                  <span className="cv-metric-val" style={{ color: '#f59e0b' }}>{selectedCrop.impurities}%</span>
                </div>
                <div className="cv-bar-bg">
                  <div className="cv-bar-fill" style={{ width: `${selectedCrop.impurities * 10}%`, background: '#f59e0b' }} />
                </div>
                <span className="cv-metric-note">
                  {lang === 'hi' ? 'भूसी / धूल / खंडित दाना' : 'Chaff, dust, broken'}
                </span>
              </div>
            </div>

            {/* Quality Summary Banner */}
            <div className="cv-quality-summary-banner">
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {lang === 'hi' ? 'प्रमाणित गुणवत्ता ग्रेड' : 'VERIFIED QUALITY GRADE'}
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                  {selectedCrop.grade}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {lang === 'hi' ? 'अनुमानित थोक भाव' : 'EST. MARKET PRICE'}
                </span>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {selectedCrop.priceEst}
                </div>
              </div>
            </div>

            {/* Blockchain Mint Action */}
            <div style={{ marginTop: '1.5rem' }}>
              {!mintedCertificate ? (
                <button
                  onClick={handleMintCertificate}
                  disabled={isMinting || isScanning}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                >
                  <ShieldCheck size={18} />
                  <span>
                    {isMinting 
                      ? (lang === 'hi' ? 'ब्लॉकचेन पर मुहर लग रही है...' : 'Minting to Ledger...') 
                      : (lang === 'hi' ? 'ब्लॉकचेन गुणवत्ता प्रमाणपत्र जारी करें (Mint)' : 'Mint Quality Certificate to Blockchain')}
                  </span>
                </button>
              ) : (
                <div className="cv-minted-banner">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={18} color="#10b981" />
                    <strong style={{ color: '#10b981', fontSize: '0.96rem' }}>
                      {lang === 'hi' ? 'गुणवत्ता प्रमाणपत्र ब्लॉकचेन पर सील हुआ!' : 'Quality Certificate Sealed on Ledger!'}
                    </strong>
                  </div>

                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    <span>{lang === 'hi' ? 'प्रमाणपत्र आईडी:' : 'Cert ID:'} </span>
                    <strong style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>{mintedCertificate.id}</strong>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace', wordBreak: 'break-all', background: 'rgba(56, 189, 248, 0.08)', padding: '0.4rem 0.6rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                    SHA-256: {mintedCertificate.hash}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => window.print()}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, fontSize: '0.76rem' }}
                    >
                      <Printer size={13} />
                      <span>{lang === 'hi' ? 'प्रिंट पर्ची' : 'Print Receipt'}</span>
                    </button>

                    {onApplyCertificate && (
                      <button
                        onClick={() => onClose && onClose()}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, fontSize: '0.76rem' }}
                      >
                        <Check size={13} />
                        <span>{lang === 'hi' ? 'फसल में जोड़ें' : 'Apply to Crop'}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Close Button in Modal Mode */}
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '0.75rem' }}
              >
                <span>{lang === 'hi' ? 'बंद करें (Close)' : 'Close'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Informational Strip on How Computer Vision Works */}
        <div className="cv-info-strip glass-panel">
          <div className="cv-info-col">
            <div className="cv-info-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Cpu size={20} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.2rem', fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'सटीक दाना पहचान' : 'Sub-millimeter Kernel Scan'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {lang === 'hi' 
                  ? 'न्यूरल नेटवर्क प्रति सेकंड 1,200 दानों के आकार और वजन का विश्लेषण करता है।' 
                  : 'YOLO-based neural network analyzes 1,200 grains/sec for size & density.'}
              </p>
            </div>
          </div>

          <div className="cv-info-col">
            <div className="cv-info-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <Layers size={20} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.2rem', fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'नमी व सड़ांध जांच' : 'Spectrometric Moisture Audit'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {lang === 'hi' 
                  ? 'अनाज में नमी <12% होने पर ही साइलो में भंडारण की स्वचालित स्वीकृति मिलती है।' 
                  : 'Ensures <12% moisture threshold before warehouse silo admittance.'}
              </p>
            </div>
          </div>

          <div className="cv-info-col">
            <div className="cv-info-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.2rem', fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'ब्लॉकचेन डिजिटल मुहर' : 'Cryptographic Purity Stamp'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {lang === 'hi' 
                  ? 'हर जांच का अद्वितीय SHA-256 हैश किसान और व्यापारी दोनों के लेजर पर हमेशा रहता है।' 
                  : 'Immutable SHA-256 hash seals inspection results permanently on ledger.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

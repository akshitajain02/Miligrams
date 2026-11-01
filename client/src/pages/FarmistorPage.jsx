import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, Sprout, Droplets, MapPin, Calendar, DollarSign, 
  Target, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, 
  Sparkles, Layers, ShieldCheck, ChevronRight, BarChart3, 
  RefreshCw, Award, Info, Scale, Compass, Check, HelpCircle
} from 'lucide-react';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { soundFX } from '../utils/audioFX';

export default function FarmistorPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();

  // Wizard Step: 1 to 5 for input, 6 for recommendations
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    soilType: 'Alluvial',
    landArea: 3,
    waterAvailability: 'Canal Irrigation',
    season: 'Rabi',
    location: 'Punjab, India',
    budgetPerAcre: 20000,
    farmingGoal: 'Maximum Profit'
  });

  const [recommendations, setRecommendations] = useState([]);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryMeta, setQueryMeta] = useState(null);

  // Soil Type Options with descriptive badges
  const soilOptions = [
    {
      id: 'Alluvial',
      nameHi: 'जलोढ़ मिट्टी (Alluvial Soil)',
      nameEn: 'Alluvial Soil',
      descHi: 'गंगा-सिंधु मैदानों की उपजाऊ मिट्टी, गेहूं व धान के लिए सर्वोत्तम।',
      descEn: 'Highly fertile, rich in potash, ideal for wheat, paddy, mustard & sugarcane.',
      tag: 'High Organic Carbon',
      color: '#2E6847'
    },
    {
      id: 'Black Cotton',
      nameHi: 'काली मिट्टी (Black Cotton Soil)',
      nameEn: 'Black Cotton Soil',
      descHi: 'दक्कन क्षेत्र की गहरी नमी रोकने वाली मिट्टी, कपास व सोयाबीन हेतु उपयुक्त।',
      descEn: 'High clay content with high moisture retention, ideal for cotton, soybean & gram.',
      tag: 'Moisture Retentive',
      color: '#173D2B'
    },
    {
      id: 'Loamy Clay',
      nameHi: 'दोमट मिट्टी (Loamy Soil)',
      nameEn: 'Loamy Clay',
      descHi: 'रेत, गाद और मिट्टी का संतुलित मिश्रण, बहुमुखी फसल अनुकूलता।',
      descEn: 'Balanced sand-silt-clay with optimal drainage and aeration for pulses and cereals.',
      tag: 'Balanced Aeration',
      color: '#8DBB78'
    },
    {
      id: 'Sandy/Light Loam',
      nameHi: 'रेतीली दोमट (Sandy Loam)',
      nameEn: 'Sandy / Light Loam',
      descHi: 'कम पानी वाली शुष्क मिट्टी, बाजरा व सरसों के लिए अनुकूल।',
      descEn: 'Fast-draining, thrives under low irrigation for millets, mustard and pulses.',
      tag: 'Drought Hardy',
      color: '#D6A75C'
    },
    {
      id: 'Red/Sandy',
      nameHi: 'लाल व पीली मिट्टी (Red Sandy Soil)',
      nameEn: 'Red / Sandy Soil',
      descHi: 'आयरन युक्त हल्की मिट्टी, दलहन व मोटे अनाजों के लिए बेहतर।',
      descEn: 'Porous with low clay, well-suited for groundnut, pulses, and pearl millet.',
      tag: 'Porous Structure',
      color: '#c2410c'
    }
  ];

  // Water Availability Options
  const waterOptions = [
    {
      id: 'Canal Irrigation',
      nameHi: 'नहरी सिंचाई (Canal Water)',
      nameEn: 'Canal Irrigation Network',
      subHi: 'नियमित नहरी पानी की उपलब्धता',
      subEn: 'Perennial canal supply with scheduled rotational turns',
      icon: Droplets,
      level: 'High / Regular'
    },
    {
      id: 'Deep Borewell',
      nameHi: 'ट्यूबवेल / सबमर्सिबल (Borewell)',
      nameEn: 'Deep Tube Well / Borewell',
      subHi: 'विश्वसनीय भूजल स्त्रोत, विद्युत या सौर पंप',
      subEn: 'Reliable on-demand groundwater with electric/solar pump',
      icon: Droplets,
      level: 'Reliable On-Demand'
    },
    {
      id: 'Drip Irrigation',
      nameHi: 'ड्रिप व स्प्रिंकलर (Micro Irrigation)',
      nameEn: 'Drip & Precision Sprinkler',
      subHi: 'उच्च जल दक्षता, बूंद-बूंद सिंचाई तंत्र',
      subEn: 'High-efficiency pressurized water-saving technology',
      icon: Droplets,
      level: 'Precision Conserving'
    },
    {
      id: 'Rainfed / Dryland',
      nameHi: 'वर्षा आधारित (Rainfed / Dryland)',
      nameEn: 'Rainfed Monsoon Dependent',
      subHi: 'केवल मौसमी वर्षा पर निर्भर खेती',
      subEn: 'Dependent on seasonal rainfall with no dedicated tubewell',
      icon: Droplets,
      level: 'Precipitation Dependent'
    }
  ];

  // Season Options
  const seasonOptions = [
    {
      id: 'Rabi',
      nameHi: 'रबी (सर्दियों की फसल: अक्टू–अप्रैल)',
      nameEn: 'Rabi (Winter: Oct–Apr)',
      crops: 'Wheat, Mustard, Chickpeas, Barley',
      icon: Calendar
    },
    {
      id: 'Kharif',
      nameHi: 'खरीफ (मानसून की फसल: जून–अक्टू)',
      nameEn: 'Kharif (Monsoon: Jun–Oct)',
      crops: 'Paddy / Basmati, Bajra, Soybean, Maize',
      icon: Calendar
    },
    {
      id: 'Zaid',
      nameHi: 'जायद (ग्रीष्मकालीन फसल: मार्च–जून)',
      nameEn: 'Zaid (Summer: Mar–Jun)',
      crops: 'Moong Dal, Urad, Watermelon, Fodder',
      icon: Calendar
    }
  ];

  // Goals
  const goalOptions = [
    {
      id: 'Maximum Profit',
      nameHi: 'अधिकतम शुद्ध मुनाफा (Max Net Profit)',
      nameEn: 'Maximum Net Profit',
      descHi: 'उच्च बाजार भाव वाली प्रीमियम फसलों की प्राथमिकता',
      descEn: 'Maximize gross & net rupee return per acre through market premium crops'
    },
    {
      id: 'Low Water / Drought Resilience',
      nameHi: 'कम पानी व सूखा सुरक्षा (Low Water Stress)',
      nameEn: 'Drought Resilience & Water Conservation',
      descHi: 'कम सिंचाई में पकने वाली मजबूत फसलें',
      descEn: 'Prioritize low-irrigation crops with extreme weather resilience'
    },
    {
      id: 'Soil Regeneration',
      nameHi: 'मिट्टी की उर्वरता सुधार (Soil Health & Nitrogen)',
      nameEn: 'Soil Health & Nitrogen Fixation',
      descHi: 'दलहनी फसलें जो अगली फसल के लिए यूरिया की बचत कराएं',
      descEn: 'Leguminous pulses that enrich natural root nitrogen and soil biology'
    },
    {
      id: 'Low Initial Capital',
      nameHi: 'कम लागत में खेती (Low Capital Outlay)',
      nameEn: 'Low Initial Investment',
      descHi: 'कम बीज व खाद खर्च में सुरक्षित आमदनी',
      descEn: 'Minimize cash expenditure per acre with safe downside protection'
    }
  ];

  const handleNextStep = () => {
    soundFX.click();
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      runRecommendationEngine();
    }
  };

  const handlePrevStep = () => {
    soundFX.click();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const runRecommendationEngine = async () => {
    setLoading(true);
    soundFX.click();
    try {
      const res = await fetch('/api/farmistor/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
        setQueryMeta(data.query);
        // Pre-select top 2 for comparison
        if (data.recommendations.length >= 2) {
          setSelectedForCompare([data.recommendations[0].id, data.recommendations[1].id]);
        }
      }
    } catch (err) {
      console.error('Farmistor API error:', err);
    } finally {
      setLoading(false);
      setCurrentStep(6);
      soundFX.success();
    }
  };

  const toggleCompare = (cropId) => {
    soundFX.click();
    if (selectedForCompare.includes(cropId)) {
      setSelectedForCompare(selectedForCompare.filter(id => id !== cropId));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, cropId]);
      } else {
        setSelectedForCompare([selectedForCompare[1], selectedForCompare[2], cropId]);
      }
    }
  };

  const comparedCrops = recommendations.filter(c => selectedForCompare.includes(c.id));

  return (
    <div className="farmistor-page-container">
      {/* Universal Top Bar */}
      <PortalHeaderBar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentPortal="farmistor" 
      />

      <div className="farmistor-main-wrapper">
        {/* Farmistor Hero Header */}
        <header className="farmistor-masthead">
          <div className="farmistor-pill-tag">
            <Brain size={14} />
            <span>FARMISTOR • INTELLIGENT CROP ADVISORY</span>
          </div>

          <h1 className="farmistor-title">
            {lang === 'hi'
              ? 'वैज्ञानिक फसल योजना व पारदर्शी एग्रोनॉमिक मार्गदर्शन'
              : 'Smart Crop Planning & Agronomic Intelligence'}
          </h1>

          <p className="farmistor-subtitle">
            {lang === 'hi'
              ? 'अपनी मिट्टी के प्रकार, जल स्त्रोत, मौसम और बजट के आधार पर सबसे उपयुक्त, कम जोखिम वाली और अधिकतम मुनाफा देने वाली फसलों की पारदर्शी सिफारिशें प्राप्त करें।'
              : 'Rule-based crop recommendations calibrated for your specific soil type, water availability, seasonal window, and financial goals.'}
          </p>

          {/* Stepper Progress Bar (Only during steps 1-5) */}
          {currentStep <= 5 && (
            <div className="farmistor-stepper">
              {[
                { num: 1, labelHi: 'मिट्टी', labelEn: 'Soil' },
                { num: 2, labelHi: 'जमीन व क्षेत्र', labelEn: 'Area & State' },
                { num: 3, labelHi: 'पानी', labelEn: 'Water' },
                { num: 4, labelHi: 'मौसम व बजट', labelEn: 'Season & Budget' },
                { num: 5, labelHi: 'उद्देश्य', labelEn: 'Goals' }
              ].map(step => (
                <div 
                  key={step.num} 
                  className={`farmistor-step-item ${currentStep === step.num ? 'active' : (currentStep > step.num ? 'completed' : '')}`}
                  onClick={() => {
                    if (currentStep > step.num) setCurrentStep(step.num);
                  }}
                >
                  <div className="farmistor-step-circle">
                    {currentStep > step.num ? '✓' : step.num}
                  </div>
                  <span className="farmistor-step-label">
                    {lang === 'hi' ? step.labelHi : step.labelEn}
                  </span>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* WIZARD CARD CONTAINER */}
        {currentStep <= 5 && (
          <div className="glass-panel farmistor-wizard-card">
            {/* STEP 1: SOIL TYPE */}
            {currentStep === 1 && (
              <div className="farmistor-step-content">
                <div className="farmistor-step-heading">
                  <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.1)', color: '#2E6847' }}>STEP 1 OF 5</span>
                  <h2>{lang === 'hi' ? 'आपकी जमीन की मिट्टी का प्रकार क्या है?' : 'What is your farm’s soil type?'}</h2>
                  <p>{lang === 'hi' ? 'मिट्टी की उर्वरता और जलधारण क्षमता फसल की पैदावार तय करने में मुख्य भूमिका निभाती है।' : 'Soil texture and water-holding capacity dictate nutrient uptake and root depth.'}</p>
                </div>

                <div className="farmistor-options-grid">
                  {soilOptions.map(soil => {
                    const isSelected = formData.soilType === soil.id;
                    return (
                      <div
                        key={soil.id}
                        className={`farmistor-choice-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => { soundFX.click(); setFormData({ ...formData, soilType: soil.id }); }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                          <span className="badge" style={{ background: `${soil.color}15`, color: soil.color, borderColor: `${soil.color}35` }}>
                            {soil.tag}
                          </span>
                          <div className={`farmistor-radio-check ${isSelected ? 'checked' : ''}`}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </div>

                        <h3 className="farmistor-choice-title">{lang === 'hi' ? soil.nameHi : soil.nameEn}</h3>
                        <p className="farmistor-choice-desc">{lang === 'hi' ? soil.descHi : soil.descEn}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: LAND AREA & LOCATION */}
            {currentStep === 2 && (
              <div className="farmistor-step-content">
                <div className="farmistor-step-heading">
                  <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.1)', color: '#2E6847' }}>STEP 2 OF 5</span>
                  <h2>{lang === 'hi' ? 'आपके पास कुल कितनी कृषि भूमि है?' : 'What is your cultivated acreage and location?'}</h2>
                  <p>{lang === 'hi' ? 'खेत का क्षेत्रफल और भौगोलिक राज्य दर्ज करें ताकि बीज मात्रा व कुल मुनाफे का सटीक अनुमान लगे।' : 'Enter land holding size in acres to accurately estimate input costs, yield tonnage, and net earnings.'}</p>
                </div>

                <div style={{ maxWidth: '640px', margin: '2rem auto' }}>
                  <div style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                      <label className="form-label" style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', margin: 0 }}>
                        {lang === 'hi' ? 'खेती योग्य भूमि (एकड़ में)' : 'Cultivated Land Area (Acres)'}
                      </label>
                      <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                        {formData.landArea} {lang === 'hi' ? 'एकड़' : 'Acres'}
                      </span>
                    </div>

                    <input 
                      type="range" 
                      min="0.5" 
                      max="50" 
                      step="0.5" 
                      value={formData.landArea} 
                      onChange={(e) => setFormData({ ...formData, landArea: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                      <span>0.5 एकड़ (Smallholder)</span>
                      <span>10 एकड़</span>
                      <span>25 एकड़</span>
                      <span>50 एकड़ (Large Estate)</span>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--text-main)', marginBottom: '0.5rem', display: 'block' }}>
                      📍 {lang === 'hi' ? 'राज्य व क्षेत्र' : 'State & Region'}
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="form-input"
                      style={{ fontSize: '1rem', padding: '0.85rem 1rem' }}
                    >
                      <option value="Ludhiana, Punjab">पंजाब (Punjab — Ludhiana, Patiala, Bhatinda)</option>
                      <option value="Karnal, Haryana">हरियाणा (Haryana — Karnal, Ambala, Sirsa)</option>
                      <option value="Indore, Madhya Pradesh">मध्य प्रदेश (Madhya Pradesh — Indore, Ujjain, Sehore)</option>
                      <option value="Meerut, Uttar Pradesh">उत्तर प्रदेश (Uttar Pradesh — Meerut, Bareilly, Varanasi)</option>
                      <option value="Kota, Rajasthan">राजस्थान (Rajasthan — Kota, Sriganganagar, Alwar)</option>
                      <option value="Nashik, Maharashtra">महाराष्ट्र (Maharashtra — Nashik, Pune, Vidarbha)</option>
                      <option value="Warangal, Telangana">दक्षिण भारत (South India — Telangana, Andhra, Karnataka)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: WATER AVAILABILITY */}
            {currentStep === 3 && (
              <div className="farmistor-step-content">
                <div className="farmistor-step-heading">
                  <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.1)', color: '#2E6847' }}>STEP 3 OF 5</span>
                  <h2>{lang === 'hi' ? 'आपके खेत पर पानी और सिंचाई का क्या साधन है?' : 'What is your primary irrigation source?'}</h2>
                  <p>{lang === 'hi' ? 'फसल चयन में पानी की पर्याप्तता सबसे महत्वपूर्ण है ताकि फसल सूखे या अधिक नमी से न मरे।' : 'Matching water requirements protects crops against terminal drought stress or costly fuel pumping.'}</p>
                </div>

                <div className="farmistor-options-grid">
                  {waterOptions.map(water => {
                    const isSelected = formData.waterAvailability === water.id;
                    const Icon = water.icon;
                    return (
                      <div
                        key={water.id}
                        className={`farmistor-choice-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => { soundFX.click(); setFormData({ ...formData, waterAvailability: water.id }); }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                          <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#0284c7', borderColor: 'rgba(56, 189, 248, 0.25)' }}>
                            {water.level}
                          </span>
                          <div className={`farmistor-radio-check ${isSelected ? 'checked' : ''}`}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </div>

                        <h3 className="farmistor-choice-title">{lang === 'hi' ? water.nameHi : water.nameEn}</h3>
                        <p className="farmistor-choice-desc">{lang === 'hi' ? water.subHi : water.subEn}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: SEASON & BUDGET */}
            {currentStep === 4 && (
              <div className="farmistor-step-content">
                <div className="farmistor-step-heading">
                  <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.1)', color: '#2E6847' }}>STEP 4 OF 5</span>
                  <h2>{lang === 'hi' ? 'बुवाई का मौसम और आपका प्रति एकड़ बजट क्या है?' : 'Select Sowing Season & Investment Budget'}</h2>
                  <p>{lang === 'hi' ? 'मौसम के अनुसार बुवाई करने से प्राकृतिक तापमान और धूप का पूरा लाभ मिलता है।' : 'Accurate financial headroom ensures complete fertilizer, seed, and pest management cycles.'}</p>
                </div>

                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                  {/* Season Selection */}
                  <div style={{ marginBottom: '2.5rem' }}>
                    <label className="form-label" style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--text-main)', marginBottom: '0.75rem', display: 'block' }}>
                      🗓️ {lang === 'hi' ? 'बुवाई का मौसम चुनें' : 'Select Target Sowing Window'}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                      {seasonOptions.map(s => {
                        const isSelected = formData.season === s.id;
                        return (
                          <div
                            key={s.id}
                            className={`farmistor-choice-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => { soundFX.click(); setFormData({ ...formData, season: s.id }); }}
                            style={{ padding: '1.25rem' }}
                          >
                            <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                              {lang === 'hi' ? s.nameHi : s.nameEn}
                            </h4>
                            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                              {s.crops}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Slider */}
                  <div style={{ background: 'var(--surface-alt)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
                      <label className="form-label" style={{ fontWeight: 800, fontSize: '0.96rem', color: 'var(--text-main)', margin: 0 }}>
                        {lang === 'hi' ? 'प्रति एकड़ उपलब्ध निवेश बजट' : 'Available Budget per Acre (₹)'}
                      </label>
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: '#D6A75C', fontFamily: 'var(--font-mono)' }}>
                        ₹{formData.budgetPerAcre.toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ एकड़</span>
                      </span>
                    </div>

                    <input 
                      type="range" 
                      min="8000" 
                      max="45000" 
                      step="1000" 
                      value={formData.budgetPerAcre} 
                      onChange={(e) => setFormData({ ...formData, budgetPerAcre: Number(e.target.value) })}
                      style={{ width: '100%', accentColor: '#D6A75C', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                      <span>₹8,000 (कम लागत)</span>
                      <span>₹20,000 (औसत)</span>
                      <span>₹35,000</span>
                      <span>₹45,000 (उच्च तकनीकी)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: FARMING GOALS */}
            {currentStep === 5 && (
              <div className="farmistor-step-content">
                <div className="farmistor-step-heading">
                  <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.1)', color: '#2E6847' }}>STEP 5 OF 5</span>
                  <h2>{lang === 'hi' ? 'इस सीजन में आपका मुख्य लक्ष्य क्या है?' : 'What is your primary farming objective?'}</h2>
                  <p>{lang === 'hi' ? 'फार्मिस्टर आपके व्यक्तिगत लक्ष्य के अनुसार फसलों को प्राथमिकता देकर क्रमबद्ध करेगा।' : 'Farmistor weights economic models according to your risk tolerance and ecological objectives.'}</p>
                </div>

                <div className="farmistor-options-grid">
                  {goalOptions.map(goal => {
                    const isSelected = formData.farmingGoal === goal.id;
                    return (
                      <div
                        key={goal.id}
                        className={`farmistor-choice-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => { soundFX.click(); setFormData({ ...formData, farmingGoal: goal.id }); }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                          <span className="badge" style={{ background: 'rgba(214, 167, 92, 0.15)', color: '#D6A75C', borderColor: 'rgba(214, 167, 92, 0.3)' }}>
                            {isSelected ? '✓ PRIORITY MATCH' : 'SELECT GOAL'}
                          </span>
                          <div className={`farmistor-radio-check ${isSelected ? 'checked' : ''}`}>
                            {isSelected && <Check size={12} />}
                          </div>
                        </div>

                        <h3 className="farmistor-choice-title">{lang === 'hi' ? goal.nameHi : goal.nameEn}</h3>
                        <p className="farmistor-choice-desc">{lang === 'hi' ? goal.descHi : goal.descEn}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Wizard Navigation Footer Buttons */}
            <div className="farmistor-wizard-nav">
              {currentStep > 1 ? (
                <button onClick={handlePrevStep} className="btn btn-secondary">
                  <ArrowLeft size={16} />
                  <span>{lang === 'hi' ? 'पिछला चरण' : 'Previous Step'}</span>
                </button>
              ) : <div />}

              <button 
                onClick={handleNextStep} 
                disabled={loading}
                className="figma-btn-forest"
                style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="spin-slow" />
                    <span>{lang === 'hi' ? 'एग्रोनॉमिक विश्लेषण जारी...' : 'Analyzing Agronomic Rules...'}</span>
                  </>
                ) : (
                  <>
                    <span>{currentStep === 5 ? (lang === 'hi' ? 'स्मार्ट सिफारिशें देखें' : 'Generate Crop Plan') : (lang === 'hi' ? 'अगला चरण →' : 'Continue →')}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: RECOMMENDATION RESULTS & COMPARISON VIEW */}
        {currentStep === 6 && (
          <div className="farmistor-results-section">
            {/* Top Results Overview Strip */}
            <div className="glass-panel farmistor-results-summary-strip">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="badge" style={{ background: 'rgba(46, 104, 71, 0.15)', color: '#2E6847', borderColor: 'rgba(46, 104, 71, 0.3)', marginBottom: '0.4rem' }}>
                    RECOMMENDATION PROFILE GENERATED
                  </span>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-main)', margin: '0.2rem 0' }}>
                    {lang === 'hi' 
                      ? `${formData.landArea} एकड़ ${formData.season} सीजन के लिए अनुशंसित फसलें` 
                      : `Recommended Crops for ${formData.landArea} Acres (${formData.season} Season)`}
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0 }}>
                    📍 {formData.location} • 🪨 {formData.soilType} Soil • 💧 {formData.waterAvailability} • 🎯 {formData.farmingGoal}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => { soundFX.click(); setCurrentStep(1); }} 
                    className="btn btn-secondary"
                  >
                    <RefreshCw size={14} />
                    <span>{lang === 'hi' ? 'पैरामीटर्स बदलें' : 'Adjust Inputs'}</span>
                  </button>

                  <button 
                    onClick={() => window.print()} 
                    className="figma-btn-forest"
                  >
                    <span>{lang === 'hi' ? 'योजना प्रिंट / सेव करें' : 'Export Crop Plan'}</span>
                  </button>
                </div>
              </div>

              {/* Scientific Transparency Disclaimer */}
              <div className="farmistor-disclaimer-box">
                <Info size={16} color="#D6A75C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  {lang === 'hi'
                    ? 'महत्वपूर्ण पारदर्शी सूचना: यह अनुमान भारतीय कृषि अनुसंधान परिषद (ICAR) एवं राज्य कृषि विश्वविद्यालयों के नियम-आधारित एग्रोनॉमिक मॉडल पर आधारित हैं। वास्तविक पैदावार मौसम, बीज गुणवत्ता व खेत प्रबंधन पर निर्भर करती है।'
                    : 'Transparent Agronomic Note: Projections are rule-based agronomic estimations based on regional ICAR agro-climatic datasets. Actual yield varies with localized weather and micro-management.'}
                </span>
              </div>
            </div>

            {/* Recommended Crops Cards Grid */}
            <div className="farmistor-cards-grid">
              {recommendations.slice(0, 3).map((crop, idx) => {
                const isSelectedForComp = selectedForCompare.includes(crop.id);
                return (
                  <div 
                    key={crop.id} 
                    className={`glass-panel farmistor-crop-card ${idx === 0 ? 'farmistor-crop-card-top' : ''}`}
                  >
                    {idx === 0 && (
                      <div className="farmistor-top-badge">
                        <Award size={13} />
                        <span>#1 HIGHEST SUITABILITY</span>
                      </div>
                    )}

                    <div className="farmistor-card-top">
                      <div>
                        <span className="farmistor-crop-cat">{crop.category}</span>
                        <h3 className="farmistor-crop-name">
                          {lang === 'hi' ? crop.nameHi : crop.name}
                        </h3>
                      </div>

                      <div className="farmistor-score-circle">
                        <span className="farmistor-score-val">{crop.suitabilityScore}%</span>
                        <span className="farmistor-score-txt">MATCH</span>
                      </div>
                    </div>

                    {/* Key Agronomic KPIs */}
                    <div className="farmistor-kpi-row">
                      <div className="farmistor-kpi-item">
                        <span className="farmistor-kpi-label">{lang === 'hi' ? 'अवधि' : 'Duration'}</span>
                        <span className="farmistor-kpi-val">{crop.durationDays}</span>
                      </div>
                      <div className="farmistor-kpi-item">
                        <span className="farmistor-kpi-label">{lang === 'hi' ? 'जल आवश्यकता' : 'Water Need'}</span>
                        <span className="farmistor-kpi-val">{crop.waterNeeds}</span>
                      </div>
                      <div className="farmistor-kpi-item">
                        <span className="farmistor-kpi-label">{lang === 'hi' ? 'जोखिम' : 'Risk Level'}</span>
                        <span className="farmistor-kpi-val" style={{ color: crop.riskLevel === 'Low' || crop.riskLevel === 'Very Low' ? '#2E6847' : '#D6A75C' }}>
                          {crop.riskLevel}
                        </span>
                      </div>
                    </div>

                    {/* Economics Block */}
                    <div className="farmistor-econ-block">
                      <div className="farmistor-econ-row">
                        <span>{lang === 'hi' ? `कुल अनुमानित निवेश (${formData.landArea} एकड़):` : `Est. Total Investment (${formData.landArea} Ac):`}</span>
                        <strong>₹{crop.economics.totalInvestment.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="farmistor-econ-row">
                        <span>{lang === 'hi' ? 'अपेक्षित कुल पैदावार:' : 'Expected Harvest Yield:'}</span>
                        <strong>{crop.economics.totalYieldRange}</strong>
                      </div>
                      <div className="farmistor-econ-row farmistor-profit-highlight">
                        <span>{lang === 'hi' ? 'अनुमानित शुद्ध लाभ (Net Profit):' : 'Projected Net Profit:'}</span>
                        <strong style={{ color: '#2E6847', fontSize: '1.05rem' }}>{crop.economics.estNetProfitRange}</strong>
                      </div>
                    </div>

                    {/* Explainable Why Recommended */}
                    <div className="farmistor-why-box">
                      <span className="farmistor-why-title">
                        {lang === 'hi' ? 'यह सिफारिश क्यों?' : 'Why Farmistor Recommends This:'}
                      </span>
                      <ul className="farmistor-why-list">
                        {crop.suitabilityReasons.map((reason, rIdx) => (
                          <li key={rIdx}>{reason}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Bar */}
                    <div className="farmistor-card-footer">
                      <button
                        onClick={() => toggleCompare(crop.id)}
                        className={`btn btn-sm ${isSelectedForComp ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ flex: 1, fontSize: '0.82rem' }}
                      >
                        {isSelectedForComp ? '✓ Compared' : '+ Add to Compare'}
                      </button>

                      <button
                        onClick={() => navigate('/farmer')}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1, fontSize: '0.82rem' }}
                        title="Register this crop into Miligrams ledger"
                      >
                        <span>{lang === 'hi' ? 'मिलीग्राम्स में दर्ज करें' : 'Log in Miligrams'}</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SIDE-BY-SIDE RECOMMENDATION COMPARISON TABLE */}
            {comparedCrops.length >= 2 && (
              <div className="glass-panel farmistor-comparison-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Scale size={20} color="#2E6847" />
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {lang === 'hi' ? 'आमने-सामने फसल तुलना (Side-by-Side Comparison)' : 'Direct Side-by-Side Crop Comparison'}
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Comparing {comparedCrops.length} selected recommendations
                  </span>
                </div>

                <div className="farmistor-compare-table-wrap">
                  <table className="farmistor-compare-table">
                    <thead>
                      <tr>
                        <th style={{ width: '22%' }}>Parameter</th>
                        {comparedCrops.map(c => (
                          <th key={c.id} style={{ width: `${78 / comparedCrops.length}%` }}>
                            {lang === 'hi' ? c.nameHi : c.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Suitability Score</td>
                        {comparedCrops.map(c => (
                          <td key={c.id}>
                            <strong style={{ color: '#2E6847', fontSize: '1.1rem' }}>{c.suitabilityScore}% Match</strong>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td>Growing Duration</td>
                        {comparedCrops.map(c => (
                          <td key={c.id}>{c.durationDays}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Total Investment ({formData.landArea} Ac)</td>
                        {comparedCrops.map(c => (
                          <td key={c.id}><strong>₹{c.economics.totalInvestment.toLocaleString('en-IN')}</strong></td>
                        ))}
                      </tr>
                      <tr>
                        <td>Expected Total Yield</td>
                        {comparedCrops.map(c => (
                          <td key={c.id}>{c.economics.totalYieldRange}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Expected Price / Quintal</td>
                        {comparedCrops.map(c => (
                          <td key={c.id}>₹{c.economics.expectedPricePerQ.toLocaleString('en-IN')} / Q</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Projected Net Profit</td>
                        {comparedCrops.map(c => (
                          <td key={c.id}>
                            <strong style={{ color: '#2E6847', fontSize: '1.05rem' }}>{c.economics.estNetProfitRange}</strong>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td>Water Requirement</td>
                        {comparedCrops.map(c => (
                          <td key={c.id}>{c.waterNeeds}</td>
                        ))}
                      </tr>
                      <tr>
                        <td>Risk Profile</td>
                        {comparedCrops.map(c => (
                          <td key={c.id}>
                            <span className="badge" style={{ background: c.riskLevel === 'Low' || c.riskLevel === 'Very Low' ? 'rgba(46, 104, 71, 0.15)' : 'rgba(214, 167, 92, 0.15)', color: c.riskLevel === 'Low' || c.riskLevel === 'Very Low' ? '#2E6847' : '#D6A75C' }}>
                              {c.riskLevel}
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

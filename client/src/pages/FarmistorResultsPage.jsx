import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Brain, Sprout, ArrowLeft, CheckCircle2, AlertTriangle, 
  Sparkles, Layers, DollarSign, Target, BarChart3, Scale, 
  Compass, Check, Info, RefreshCw, Printer, ArrowRight
} from 'lucide-react';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { soundFX } from '../utils/audioFX';

export default function FarmistorResultsPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [recommendations, setRecommendations] = useState(location.state?.recommendations || []);
  const [query, setQuery] = useState(location.state?.query || {
    soilType: 'Alluvial',
    landArea: 3,
    waterAvailability: 'Canal Irrigation',
    season: 'Rabi',
    location: 'Punjab, India',
    budgetPerAcre: 20000,
    farmingGoal: 'Maximum Profit'
  });
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recommendations.length === 0) {
      fetchRecommendations();
    }
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/farmistor/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      });
      const data = await res.json();
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompare = (cropId) => {
    soundFX.click();
    if (selectedForCompare.includes(cropId)) {
      setSelectedForCompare(selectedForCompare.filter(id => id !== cropId));
    } else {
      if (selectedForCompare.length >= 3) {
        alert(lang === 'hi' ? 'आप एक साथ अधिकतम 3 फसलों की तुलना कर सकते हैं।' : 'You can compare at most 3 crops side by side.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, cropId]);
    }
  };

  const comparedCrops = recommendations.filter(c => selectedForCompare.includes(c.id));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-main)', paddingBottom: '4rem' }}>
      <PortalHeaderBar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} currentPortal="farmer" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <button 
            onClick={() => navigate('/farmistor')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}
          >
            <ArrowLeft size={16} />
            <span>{lang === 'hi' ? 'प्लानर इनपुट बदलें' : 'Modify Farm Planner Inputs'}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => window.print()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
            >
              <Printer size={14} />
              <span>{lang === 'hi' ? 'योजना प्रिंट करें' : 'Print Plan'}</span>
            </button>
            <button
              onClick={() => navigate('/farmer/register-crop')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--botanical-green)', color: '#ffffff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700 }}
            >
              <span>{lang === 'hi' ? 'फसल दर्ज करें →' : 'Register Crop →'}</span>
            </button>
          </div>
        </div>

        {/* Page Title & Query Summary Banner */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem 2rem', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'rgba(46, 104, 71, 0.12)', color: 'var(--botanical-green)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.6rem', textTransform: 'uppercase' }}>
                <Brain size={13} />
                <span>{lang === 'hi' ? 'ICAR व SAU मानक नियम-आधारित सिफारिशें' : 'Rule-Based Agronomic Evaluation Engine'}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--text-main)' }}>
                {lang === 'hi' ? 'फार्मिस्टर फसल सिफारिश परिणाम' : 'Farmistor Crop Planning Recommendations'}
              </h1>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                {lang === 'hi'
                  ? 'आपकी मिट्टी, पानी, मौसम और वित्तीय बजट के आधार पर वैज्ञानिक रूप से अनुकूलित फसल विकल्प।'
                  : 'Transparent suitability rankings calibrated against soil vitality, water availability, and return on investment.'}
              </p>
            </div>

            {/* Farmer Parameters Pill Box */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1rem 1.25rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 1.25rem' }}>
              <div>{lang === 'hi' ? 'मिट्टी:' : 'Soil:'} <strong style={{ color: 'var(--text-main)' }}>{query.soilType}</strong></div>
              <div>{lang === 'hi' ? 'क्षेत्रफल:' : 'Area:'} <strong style={{ color: 'var(--text-main)' }}>{query.landArea} Acres</strong></div>
              <div>{lang === 'hi' ? 'सिंचाई:' : 'Water:'} <strong style={{ color: 'var(--text-main)' }}>{query.waterAvailability}</strong></div>
              <div>{lang === 'hi' ? 'मौसम:' : 'Season:'} <strong style={{ color: 'var(--text-main)' }}>{query.season}</strong></div>
              <div>{lang === 'hi' ? 'बजट:' : 'Budget:'} <strong style={{ color: 'var(--text-main)' }}>₹{query.budgetPerAcre}/Acre</strong></div>
              <div>{lang === 'hi' ? 'लक्ष्य:' : 'Goal:'} <strong style={{ color: 'var(--botanical-green)' }}>{query.farmingGoal}</strong></div>
            </div>
          </div>
        </div>

        {/* Disclaimer Alert */}
        <div style={{ background: 'rgba(214, 167, 92, 0.1)', border: '1px solid rgba(214, 167, 92, 0.3)', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Info size={18} color="var(--harvest-gold)" style={{ flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
            <strong>{lang === 'hi' ? 'पारदर्शी अनुमान सूचना:' : 'Agronomic Transparency Disclaimer:'} </strong>
            {lang === 'hi'
              ? 'ये आंकड़े भारतीय कृषि अनुसंधान परिषद (ICAR) व राज्य कृषि विश्वविद्यालयों के औसत मानकों पर आधारित हैं। वास्तविक उत्पादन स्थानीय मौसम, बीज गुणवत्ता व कृषि प्रबंधन पर निर्भर करता है।'
              : 'Estimates provided are calculated using transparent rule-based agronomic models from Indian ICAR & State Agricultural Universities. Realized yields vary with seed purity, rainfall, and micro-farm management.'}
          </p>
        </div>

        {/* Side-by-Side Comparison Matrix If Selected */}
        {comparedCrops.length > 1 && (
          <div style={{ background: 'var(--surface-card)', border: '2px solid var(--botanical-green)', borderRadius: '16px', padding: '1.75rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scale size={20} color="var(--botanical-green)" />
                <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                  {lang === 'hi' ? 'फसलों की सीधी तुलना (Side-by-Side Comparison)' : 'Side-by-Side Crop Comparison Matrix'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedForCompare([])}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
              >
                {lang === 'hi' ? 'तुलना साफ करें' : 'Clear Comparison'}
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>{lang === 'hi' ? 'मीट्रिक' : 'Agronomic Metric'}</th>
                    {comparedCrops.map(c => (
                      <th key={c.id} style={{ textAlign: 'center', padding: '0.75rem 1rem', color: 'var(--text-main)', fontWeight: 800, fontSize: '0.95rem' }}>
                        {lang === 'hi' ? c.nameHi : c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>{lang === 'hi' ? 'अनुकूलता स्कोर (Suitability)' : 'Suitability Score'}</td>
                    {comparedCrops.map(c => (
                      <td key={c.id} style={{ textAlign: 'center', padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--botanical-green)', fontSize: '1.1rem' }}>
                        {c.suitabilityScore}%
                      </td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>{lang === 'hi' ? 'फसल अवधि' : 'Duration'}</td>
                    {comparedCrops.map(c => (
                      <td key={c.id} style={{ textAlign: 'center', padding: '0.75rem 1rem' }}>{c.durationDays}</td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>{lang === 'hi' ? 'कुल अनुमानित निवेश' : 'Total Investment'}</td>
                    {comparedCrops.map(c => (
                      <td key={c.id} style={{ textAlign: 'center', padding: '0.75rem 1rem', fontWeight: 700 }}>₹{c.economics.totalInvestment.toLocaleString('en-IN')}</td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>{lang === 'hi' ? 'अनुमानित शुद्ध मुनाफा' : 'Est. Net Profit'}</td>
                    {comparedCrops.map(c => (
                      <td key={c.id} style={{ textAlign: 'center', padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--botanical-green)' }}>
                        {c.economics.estNetProfitRange}
                      </td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>{lang === 'hi' ? 'अनुमानित ROI' : 'Projected ROI'}</td>
                    {comparedCrops.map(c => (
                      <td key={c.id} style={{ textAlign: 'center', padding: '0.75rem 1rem', fontWeight: 800, color: 'var(--harvest-gold)' }}>
                        {c.economics.roiPercentage}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontWeight: 600 }}>{lang === 'hi' ? 'जोखिम स्तर' : 'Risk Profile'}</td>
                    {comparedCrops.map(c => (
                      <td key={c.id} style={{ textAlign: 'center', padding: '0.75rem 1rem' }}>
                        <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, background: c.riskLevel === 'Low' || c.riskLevel === 'Very Low' ? 'rgba(46, 104, 71, 0.15)' : 'rgba(214, 167, 92, 0.15)', color: c.riskLevel === 'Low' || c.riskLevel === 'Very Low' ? 'var(--botanical-green)' : 'var(--harvest-gold)' }}>
                          {c.riskLevel} Risk
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recommendations Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {recommendations.map((crop, idx) => {
            const isCompared = selectedForCompare.includes(crop.id);

            return (
              <div
                key={crop.id}
                style={{
                  background: 'var(--surface-card)',
                  border: idx === 0 ? '2px solid var(--botanical-green)' : '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: idx === 0 ? '0 12px 28px -6px rgba(46, 104, 71, 0.18)' : 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top Badge Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {idx === 0 && (
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'var(--botanical-green)', color: '#ffffff' }}>
                          TOP CHOICE ★
                        </span>
                      )}
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {crop.category}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(46, 104, 71, 0.12)', padding: '0.25rem 0.65rem', borderRadius: '999px', color: 'var(--botanical-green)', fontWeight: 800, fontSize: '0.9rem' }}>
                      <span>{crop.suitabilityScore}%</span>
                      <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Match</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontWeight: 800, margin: '0 0 0.35rem', color: 'var(--text-main)' }}>
                    {lang === 'hi' ? crop.nameHi : crop.name}
                  </h3>
                  <p style={{ margin: '0 0 1.25rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {crop.durationDays} • {crop.waterNeeds} Water • {crop.riskLevel} Risk
                  </p>

                  {/* Financial & Yield Estimates Box */}
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block' }}>
                        {lang === 'hi' ? 'कुल निवेश' : 'Total Investment'}
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        ₹{crop.economics.totalInvestment.toLocaleString('en-IN')}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>
                        (₹{crop.economics.investmentPerAcre}/Acre)
                      </span>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--botanical-green)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', fontWeight: 700 }}>
                        {lang === 'hi' ? 'अनुमानित शुद्ध लाभ' : 'Est. Net Profit'}
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--botanical-green)' }}>
                        {crop.economics.estNetProfitRange}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--harvest-gold)', fontWeight: 700, display: 'block' }}>
                        ROI: ~{crop.economics.roiPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Explainability: Why Recommended */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.4rem' }}>
                      {lang === 'hi' ? 'यह फसल क्यों अनुशंसित है:' : 'Why this crop is recommended:'}
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {crop.suitabilityReasons.slice(0, 2).map((reason, rIdx) => (
                        <li key={rIdx} style={{ marginBottom: '0.35rem' }}>{reason}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk Indicators */}
                  {crop.riskFactors && crop.riskFactors.length > 0 && (
                    <div style={{ background: 'rgba(214, 167, 92, 0.08)', border: '1px solid rgba(214, 167, 92, 0.25)', borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '1.5rem', fontSize: '0.75rem', color: 'var(--harvest-gold)' }}>
                      <strong>{lang === 'hi' ? 'सावधानी:' : 'Risk Watch:'} </strong>
                      <span>{crop.riskFactors[0]}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', gap: '0.5rem' }}>
                  <button
                    onClick={() => toggleCompare(crop.id)}
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      border: `1px solid ${isCompared ? 'var(--botanical-green)' : 'var(--border)'}`,
                      background: isCompared ? 'rgba(46, 104, 71, 0.1)' : 'var(--surface)',
                      color: isCompared ? 'var(--botanical-green)' : 'var(--text-main)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {isCompared ? (lang === 'hi' ? '✓ तुलना में जोड़ा गया' : '✓ Added to Compare') : (lang === 'hi' ? '+ तुलना करें' : '+ Compare')}
                  </button>

                  <button
                    onClick={() => navigate('/farmer/register-crop')}
                    style={{
                      padding: '0.45rem 0.95rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'var(--botanical-green)',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <span>{lang === 'hi' ? 'यह फसल लगाएं' : 'Cultivate This'}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

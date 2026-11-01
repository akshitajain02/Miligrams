import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ShieldAlert, Link2, Search, RefreshCw, 
  CheckCircle2, AlertTriangle, Layers, Copy, Check, 
  ExternalLink, ArrowLeft, Info, Cpu, Database, Play, RotateCcw
} from 'lucide-react';
import PortalHeaderBar from '../components/PortalHeaderBar';
import { soundFX } from '../utils/audioFX';

export default function LedgerExplorerPage({ 
  lang = 'hi', 
  setLang = () => {}, 
  theme = 'light', 
  toggleTheme = () => {} 
}) {
  const navigate = useNavigate();

  const [blocks, setBlocks] = useState([]);
  const [chainStatus, setChainStatus] = useState({ isValid: true, chainLength: 0, summary: 'Checking chain...' });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');
  const [copiedHash, setCopiedHash] = useState(null);
  const [tamperFeedback, setTamperFeedback] = useState(null);

  useEffect(() => {
    fetchLedgerData();
  }, []);

  const fetchLedgerData = async () => {
    setLoading(true);
    try {
      const [blocksRes, verifyRes] = await Promise.all([
        fetch('/api/ledger/blocks'),
        fetch('/api/ledger/verify-chain')
      ]);

      const blocksData = await blocksRes.json();
      const verifyData = await verifyRes.json();

      if (blocksData.success) {
        setBlocks(blocksData.chain || []);
      }
      if (verifyData.success) {
        setChainStatus(verifyData);
      }
    } catch (err) {
      console.error('Failed to load ledger:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    soundFX.click();
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const handleSimulateTamper = async () => {
    soundFX.click();
    try {
      const targetIndex = blocks.length > 1 ? 1 : 0;
      const res = await fetch('/api/ledger/simulate-tamper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blockIndex: targetIndex, tamperedQuantity: 999999 })
      });
      const data = await res.json();
      setTamperFeedback({
        type: 'alert',
        message: data.message || `Tampering injected into Block #${targetIndex}. Check chain verification status!`
      });
      fetchLedgerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestoreChain = async () => {
    soundFX.click();
    try {
      const res = await fetch('/api/ledger/restore-chain', { method: 'POST' });
      const data = await res.json();
      setTamperFeedback({
        type: 'success',
        message: data.message || 'Chain restored to original tamper-evident state.'
      });
      fetchLedgerData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBlocks = blocks.filter(b => {
    const actionMatch = filterAction === 'ALL' || b.data?.action === filterAction;
    if (!actionMatch) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const strData = JSON.stringify(b.data || {}).toLowerCase();
    const hash = (b.hash || '').toLowerCase();
    const prev = (b.previousHash || '').toLowerCase();
    const idx = String(b.index);

    return hash.includes(q) || prev.includes(q) || strData.includes(q) || idx === q;
  });

  return (
    <div className="ledger-page-container">
      {/* Universal Top Header */}
      <PortalHeaderBar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentPortal="ledger" 
      />

      <div className="ledger-main-wrapper">
        {/* Masthead */}
        <div className="ledger-header">
          <div className="farmistor-pill-tag">
            <Link2 size={14} />
            <span>TAMPER-EVIDENT DIGITAL LEDGER</span>
          </div>

          <h1 className="ledger-title">
            {lang === 'hi' 
              ? 'अपरिवर्तनीय डिजिटल लेजर व घटना रिकॉर्ड्स' 
              : 'Tamper-Evident SHA-256 Ledger Explorer'}
          </h1>

          <p className="ledger-subtitle">
            {lang === 'hi'
              ? 'खेत कटाई से लेकर गोदाम सत्यापन और मंडी खरीद तक की प्रत्येक घटना क्रिप्टोग्राफिक SHA-256 हैश व मर्कल ट्री द्वारा स्थायी रूप से जुड़ी है।'
              : 'Audit every agricultural event from farm declaration to warehouse weighbridge verification and wholesale procurement.'}
          </p>

          {/* Critical Truth & Tamper-Evident Disclaimer */}
          <div className="ledger-truth-disclaimer">
            <Info size={17} color="#D6A75C" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>{lang === 'hi' ? 'लेजर प्रामाणिकता व सीमाएं:' : 'Cryptographic Integrity Notice:'} </strong>
              <span>
                {lang === 'hi'
                  ? 'SHA-256 हैश-लिंक्ड रिकॉर्ड्स इस बात की गारंटी देते हैं कि एक बार दर्ज होने के बाद कोई भी ऐतिहासिक रिकॉर्ड बिना पकड़े बदले या हटाए नहीं जा सकते। यह श्रृंखला डिजिटल हस्ताक्षर और ऑडिट ट्रेल की अखंडता प्रमाणित करती है, न कि किसी सार्वजनिक प्रूफ-ऑफ-वर्क ब्लॉकचेन को।'
                  : 'Hash-linked records guarantee that historical events cannot be altered or deleted without breaking subsequent cryptographic hashes. Hashing guarantees tamper-evident audit history; it does not independently verify the physical accuracy of manual inputs.'}
              </span>
            </div>
          </div>
        </div>

        {/* Chain Integrity Status Card & Simulator */}
        <div className="glass-panel ledger-status-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div 
                style={{ 
                  width: '52px', 
                  height: '52px', 
                  borderRadius: '14px', 
                  background: chainStatus.isValid ? 'rgba(46, 104, 71, 0.15)' : 'rgba(239, 68, 68, 0.15)', 
                  color: chainStatus.isValid ? '#2E6847' : '#ef4444', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                {chainStatus.isValid ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.2rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {chainStatus.isValid 
                      ? (lang === 'hi' ? 'लेजर अखंडता 100% सत्यापित (Sealed)' : 'Ledger Integrity 100% Verified') 
                      : (lang === 'hi' ? 'चेतावनी: लेजर में छेड़छाड़ पकड़ी गई!' : 'CRITICAL ALERT: Tampering Detected!')}
                  </h3>
                  <span className="badge" style={{ background: chainStatus.isValid ? 'rgba(46, 104, 71, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: chainStatus.isValid ? '#2E6847' : '#ef4444' }}>
                    {chainStatus.isValid ? '● SECURE & INTACT' : '● TAMPER DETECTED'}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                  {chainStatus.summary}
                </p>
              </div>
            </div>

            {/* Quick Metrics & Educational Tamper Test */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'right', paddingRight: '1rem', borderRight: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {lang === 'hi' ? 'कुल ब्लॉक' : 'TOTAL BLOCKS'}
                </span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                  {blocks.length}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={fetchLedgerData}
                  className="btn btn-secondary btn-sm"
                  title="Refresh ledger verification"
                >
                  <RefreshCw size={14} className={loading ? 'spin-slow' : ''} />
                  <span>{lang === 'hi' ? 'सत्यापित करें' : 'Verify'}</span>
                </button>

                {chainStatus.isValid ? (
                  <button
                    onClick={handleSimulateTamper}
                    className="btn btn-secondary btn-sm"
                    style={{ borderColor: 'rgba(214, 167, 92, 0.4)', color: '#D6A75C' }}
                    title="Simulate data tampering to test cryptographic detection"
                  >
                    <Play size={13} />
                    <span>{lang === 'hi' ? 'छेड़छाड़ टेस्ट' : 'Tamper Test'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleRestoreChain}
                    className="btn btn-primary btn-sm"
                    style={{ background: '#2E6847' }}
                  >
                    <RotateCcw size={13} />
                    <span>{lang === 'hi' ? 'चेन रीस्टोर करें' : 'Restore Chain'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {tamperFeedback && (
            <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: tamperFeedback.type === 'alert' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(46, 104, 71, 0.1)', color: tamperFeedback.type === 'alert' ? '#ef4444' : '#2E6847', fontSize: '0.85rem', fontWeight: 700 }}>
              {tamperFeedback.message}
            </div>
          )}
        </div>

        {/* Search & Action Filter Bar */}
        <div className="ledger-filter-bar">
          <div className="ledger-search-box">
            <Search size={16} color="var(--text-light)" />
            <input 
              type="text" 
              placeholder={lang === 'hi' ? 'Crop ID, Farmer ID, Block Index या Hash खोजें...' : 'Search by Crop ID, Farmer ID, Index, or SHA-256 Hash...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ledger-search-input"
            />
          </div>

          <div className="ledger-filter-chips">
            {[
              { id: 'ALL', label: 'All Events' },
              { id: 'CROP_HARVESTED_AND_REGISTERED', label: 'Harvest Logged' },
              { id: 'WAREHOUSE_QUANTITY_VERIFIED', label: 'Warehouse Verified' },
              { id: 'CROP_REVERIFIED_AGING', label: '15-Day Aging' },
              { id: 'CROP_PURCHASED_AND_SETTLED', label: 'Marketplace Sale' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => { soundFX.click(); setFilterAction(f.id); }}
                className={`ledger-filter-chip ${filterAction === f.id ? 'active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blocks Chained List */}
        <div className="ledger-blocks-list">
          {filteredBlocks.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Layers size={36} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.5 }} />
              <h3>{lang === 'hi' ? 'कोई ब्लॉक नहीं मिला' : 'No matching blocks found'}</h3>
              <p>{lang === 'hi' ? 'खोज शब्द बदलें या फिल्टर रीसेट करें।' : 'Adjust search query or filter selection.'}</p>
            </div>
          ) : (
            filteredBlocks.map((block) => {
              const isGenesis = block.index === 0;
              const action = block.data?.action || (isGenesis ? 'GENESIS_INITIALIZATION' : 'LEDGER_ENTRY');

              return (
                <div key={block.hash || block.index} className="glass-panel ledger-block-card">
                  {/* Block Header */}
                  <div className="ledger-block-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="ledger-block-index-badge">
                        BLOCK #{block.index}
                      </span>
                      <span className="ledger-block-action-tag">
                        {action.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <Clock size={13} />
                      <span>{new Date(block.timestamp).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Block Payload Summary */}
                  <div className="ledger-block-payload-grid">
                    {block.data?.cropId && (
                      <div className="ledger-payload-item">
                        <span className="ledger-payload-key">CROP BATCH ID</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span className="ledger-payload-val" style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 800 }}>
                            {block.data.cropId}
                          </span>
                          <button
                            onClick={() => navigate(`/crop/${block.data.cropId}`)}
                            className="btn-link"
                            style={{ padding: 0, color: 'var(--primary)', display: 'inline-flex' }}
                            title="View Full Crop Dossier"
                          >
                            <ExternalLink size={13} />
                          </button>
                        </div>
                      </div>
                    )}

                    {block.data?.cropType && (
                      <div className="ledger-payload-item">
                        <span className="ledger-payload-key">COMMODITY & VARIETY</span>
                        <span className="ledger-payload-val">
                          {block.data.cropType} {block.data.variety ? `(${block.data.variety})` : ''}
                        </span>
                      </div>
                    )}

                    {(block.data?.declaredQuantity !== undefined || block.data?.quantity !== undefined) && (
                      <div className="ledger-payload-item">
                        <span className="ledger-payload-key">DECLARED QUANTITY</span>
                        <span className="ledger-payload-val">
                          {(block.data.declaredQuantity ?? block.data.quantity).toLocaleString('en-IN')} kg
                        </span>
                      </div>
                    )}

                    {block.data?.verifiedQuantity !== undefined && (
                      <div className="ledger-payload-item">
                        <span className="ledger-payload-key">VERIFIED QUANTITY</span>
                        <span className="ledger-payload-val" style={{ color: '#2E6847', fontWeight: 800 }}>
                          {typeof block.data.verifiedQuantity === 'number' 
                            ? `${block.data.verifiedQuantity.toLocaleString('en-IN')} kg` 
                            : String(block.data.verifiedQuantity)}
                        </span>
                      </div>
                    )}

                    {block.data?.farmerName && (
                      <div className="ledger-payload-item">
                        <span className="ledger-payload-key">ORIGIN PRODUCER</span>
                        <span className="ledger-payload-val">
                          {block.data.farmerName} ({block.data.farmerId})
                        </span>
                      </div>
                    )}

                    {block.data?.warehouseId && (
                      <div className="ledger-payload-item">
                        <span className="ledger-payload-key">WAREHOUSE SILO</span>
                        <span className="ledger-payload-val">
                          {block.data.warehouseId} • {block.data.storageLocation || 'General Bay'}
                        </span>
                      </div>
                    )}

                    {block.data?.buyerId && (
                      <div className="ledger-payload-item">
                        <span className="ledger-payload-key">BUYER SETTLEMENT</span>
                        <span className="ledger-payload-val">
                          {block.data.buyerName || block.data.buyerId}
                        </span>
                      </div>
                    )}

                    {block.data?.notes && (
                      <div className="ledger-payload-item" style={{ gridColumn: '1 / -1' }}>
                        <span className="ledger-payload-key">INSPECTOR AUDIT NOTES</span>
                        <span className="ledger-payload-val" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                          "{block.data.notes}"
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Cryptographic Linkage Footer */}
                  <div className="ledger-block-crypto-footer">
                    <div className="ledger-crypto-row">
                      <span className="ledger-crypto-label">PREV HASH:</span>
                      <code className="ledger-crypto-code">
                        {block.previousHash || '0000000000000000000000000000000000000000000000000000000000000000 (GENESIS)'}
                      </code>
                    </div>

                    <div className="ledger-crypto-row">
                      <span className="ledger-crypto-label">BLOCK HASH:</span>
                      <code className="ledger-crypto-code ledger-crypto-highlight">
                        {block.hash}
                      </code>
                      <button
                        onClick={() => copyToClipboard(block.hash)}
                        className="ledger-copy-btn"
                        title="Copy SHA-256 Hash"
                      >
                        {copiedHash === block.hash ? <Check size={12} color="#2E6847" /> : <Copy size={12} />}
                      </button>
                    </div>

                    {block.merkleRoot && (
                      <div className="ledger-crypto-row">
                        <span className="ledger-crypto-label">MERKLE ROOT:</span>
                        <code className="ledger-crypto-code" style={{ opacity: 0.8 }}>
                          {block.merkleRoot}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

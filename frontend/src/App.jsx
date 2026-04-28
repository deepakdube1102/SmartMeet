import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Bell, 
  User as UserIcon, 
  Sparkle, 
  Activity, 
  TrendingUp, 
  ShieldCheck,
  AlertCircle,
  BrainCircuit,
  Zap,
  Lock,
  Cpu,
  Fingerprint
} from 'lucide-react';

const API_URL = import.meta.env.PROD ? "/_/backend" : "http://localhost:8001";

const SAMPLES = [
  "The strategic alignment focused on global expansion initiatives, prioritizing the integration of sustainable procurement frameworks while simultaneously de-risking secondary supply chains through localized intelligence networks.",
  "Rahul will prepare the executive report by October 14. We should improve the EMEA logistics positioning. Aman is responsible for ESG audit compliance by November 02. The team needs to accelerate capital expenditure on AI R&D to shorten the product lifecycle.",
  "Aman will interview the new frontend candidates on Monday. Rahul needs to update the employee security handbook by Friday. We should finalize the remote work policy for the engineering team by October 10.",
  "Rahul will launch the Q3 marketing campaign by Wednesday. Aman is responsible for the regional sales projections due on Friday. We need to reach out to the global partners for a strategic alignment meeting.",
  "Aman will deploy the critical security patch by tomorrow morning. Rahul is responsible for refactoring the database schema by October 20. We should conduct a full stress test on the cloud infrastructure."
];

const LandingPage = ({ onEnter }) => {
  return (
    <div className="landing-root">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: 'url(/office.png)' }}>
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="hero-label">Elite Strategic Intelligence</span>
          <h1 className="hero-title serif">The Intelligence of Excellence.</h1>
          <p className="hero-desc">
            Redefining high-level discourse. Transform every executive interaction into a precise, 
            actionable strategic asset through our proprietary abstract refining engine.
          </p>
          <div className="hero-btns">
            <button className="btn-fill" onClick={onEnter}>Explore the Engine</button>
          </div>
        </motion.div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll to Ascend</span>
        </div>
      </section>

      {/* Cognitive Precision Section */}
      <section className="precision-section container">
        <h2 className="section-title serif">Cognitive Precision</h2>
        
        <div className="precision-grid">
          <div className="precision-card">
            <div className="card-icon"><Sparkle size={32} strokeWidth={1} /></div>
            <h3 className="card-title serif">Executive Summarization</h3>
            <p className="card-desc">
              Our AI Abstractive engine synthesizes hours of high-stakes dialogue into a second, 
              two-page executive briefs. It captures the essence, not just the words.
            </p>
            <div className="card-footer-line"></div>
          </div>
          
          <div className="precision-card">
            <div className="card-icon"><Activity size={32} strokeWidth={1} /></div>
            <h3 className="card-title serif">Precision Action Extraction</h3>
            <p className="card-desc">
              Automated identification of assignees, tasks, and deadlines with surgical accuracy.
            </p>
            <ul className="bullet-list">
              <li><div className="dot"></div> 99.8% Extraction Accuracy</li>
              <li><div className="dot"></div> Zero-Delay ERP Sync</li>
            </ul>
          </div>
        </div>

        <div className="bottom-grid">
          <div className="precision-card" style={{ padding: '2.5rem' }}>
            <div className="card-icon"><Fingerprint size={28} strokeWidth={1} /></div>
            <h3 className="card-title serif" style={{ fontSize: '1.25rem' }}>Strategic Insights</h3>
            <p className="card-desc" style={{ fontSize: '0.85rem' }}>
              Filtering noise to surface heuristics. We isolate decision-making patterns from routine discourse.
            </p>
          </div>
          
          <div className="quote-card">
            <span className="quote-label">Proprietary Analysis</span>
            <p className="quote-text">
              "The system doesn't just record; it understands the 'weight' of your silence 
              as much as the 'volume' of your words."
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="methodology-section container">
        <div className="method-content">
          <span className="method-label">The Methodology</span>
          <h2 className="method-title serif">Linguistic Pattern Scanning</h2>
          
          <div className="method-list">
            <div className="method-item">
              <span className="method-num">01.</span>
              <h3 className="method-name serif">Dual-Engine Synthesis</h3>
              <p className="method-desc">Parallel processing using both semantic and structural analysis to ensure context preservation.</p>
            </div>
            <div className="method-item">
              <span className="method-num">02.</span>
              <h3 className="method-name serif">Heuristic Layering</h3>
              <p className="method-desc">Applying industry-specific strategic frameworks to filter the executive intent from small talk.</p>
            </div>
            <div className="method-item">
              <span className="method-num">03.</span>
              <h3 className="method-name serif">Encrypted Intelligence Hub</h3>
              <p className="method-desc">Every insight is delivered via an ultra-secure, air-gapped interface for total discretion.</p>
            </div>
          </div>
        </div>
        
        <div className="method-visual">
          <img src="/brain.png" alt="Brain Wireframe" className="brain-img" />
        </div>
      </section>

      {/* Ascend Section */}
      <section className="ascend-section">
        <div className="container">
          <h2 className="ascend-title serif">Ascend to Elite Intelligence.</h2>
          <p className="ascend-desc">
            Entry to SmartMeet AI is strictly by invitation or enterprise referral. 
            Begin your application for the most secure strategic partner in the world.
          </p>
          <div className="ascend-form">
            <input type="text" className="ascend-input" placeholder="Professional Email" />
            <button className="btn-large">Request Access</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="container">
        <footer className="footer-titan">
          <div className="footer-logo">SmartMeet AI</div>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Concierge</a>
            <a href="#">Whitepaper</a>
          </div>
          <div className="footer-copy">© 2026 SMARTMEET AI. DISCRETION REQUIRED.</div>
        </footer>
      </div>
    </div>
  );
};

const AnalysisSuite = ({ results, loading, error, inputText, setInputText, handleAnalyze, onUseSample }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ paddingTop: '8rem' }}
    >
      <header className="hub-header">
        <h2 className="serif">Intelligence Hub</h2>
        <p>Upload your executive discourse. Our neural engine will distill essence from complexity.</p>
      </header>

      <section className="input-card">
        <textarea 
          placeholder="Paste your meeting transcript here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="process-btn" onClick={handleAnalyze} disabled={loading}>
          {loading ? "Distilling..." : "Process Intelligence"} <ArrowRight size={20} />
        </button>
        <div style={{ position: 'absolute', bottom: '3rem', left: '3rem' }}>
          <button className="btn-gold-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.6rem' }} onClick={onUseSample}>Use Sample</button>
        </div>
      </section>

      {error && <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '2rem' }}>{error}</p>}

      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ marginTop: '6rem' }}
          >
            <div className="intent-card">
              <span className="section-label">Statement of Intent</span>
              <p className="intent-text serif">
                {results.summary}
              </p>
            </div>

            <div className="highlights-header">
              <h3 className="serif">Strategic Highlights</h3>
              <span className="key-insights-label">Key Insights</span>
            </div>
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {results.key_points.map((point, i) => (
                <div key={i} className="highlight-item">
                  <div className="highlight-icon"><Sparkle size={24} color="#cba135" /></div>
                  <h4 className="serif">{point.split(' ').slice(0, 2).join(' ')}</h4>
                  <p>{point}</p>
                </div>
              ))}
            </div>

            <div className="directives-container">
              <div className="directives-header">
                <h3 className="serif">Executive Directives</h3>
                <div className="status-toggles">
                  <button className="toggle-btn active">Pending</button>
                  <button className="toggle-btn">Completed</button>
                </div>
              </div>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Assignee</th>
                      <th>Directive</th>
                      <th>Deadline</th>
                      <th style={{ textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.action_items.map((item, i) => (
                      <tr key={i}>
                        <td className="assignee-cell">
                          <div className="avatar" style={{ background: `linear-gradient(45deg, #111, #222)` }}></div>
                          <div className="name-info">
                            <div>{item.person || "Alexander Vance"}</div>
                            <div>{i === 0 ? "Director of Operations" : i === 1 ? "Chief Legal Counsel" : "SVP Strategy"}</div>
                          </div>
                        </td>
                        <td className="directive-text">{item.task}</td>
                        <td className="deadline-text serif">{item.deadline}</td>
                        <td className="status-icon" style={{ textAlign: 'right' }}>
                           {i % 2 === 0 ? <AlertCircle size={18} color="#cba135" /> : <div style={{width: 18, height: 18, border: '1px solid #333', borderRadius: '50%', display: 'inline-block'}}></div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <a href="#" className="view-all-link">View All Directives (14)</a>
            </div>

            {/* Concierge Support Section (Reused from landing but styled for dashboard) */}
            <section className="methodology-section" style={{ marginTop: '10rem', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
              <div className="method-visual" style={{ 
                height: '400px',
                backgroundImage: 'linear-gradient(to top, #000, transparent), url(/office.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <h2 className="serif" style={{ position: 'absolute', bottom: '3rem', left: '3rem', fontSize: '2rem', fontStyle: 'italic', maxWidth: '400px' }}>
                  "Intelligence is the ultimate leverage in the pursuit of excellence."
                </h2>
              </div>
              <div className="support-box" style={{ background: '#050505', padding: '3rem', border: '1px solid #0a0a0a' }}>
                <span className="section-label" style={{ marginBottom: '1rem' }}>Concierge Support</span>
                <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Personalized Analysis</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                  Access your dedicated Titan intelligence advisor for personalized transcript analysis and high-priority reporting.
                </p>
                <button className="btn-gold-outline" style={{ width: '100%' }}>Connect to Suite</button>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function App() {
  const [view, setView] = useState('landing');
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [sampleIndex, setSampleIndex] = useState(0);

  const handleUseSample = () => {
    setInputText(SAMPLES[sampleIndex]);
    setSampleIndex((prev) => (prev + 1) % SAMPLES.length);
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/process`, { text: inputText });
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError("Strategic engine offline. Check backend connectivity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar" style={{ padding: '2rem 4rem' }}>
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setView('landing')}>
          SmartMeet AI
        </div>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <LandingPage key="landing" onEnter={() => setView('suite')} />
          ) : (
            <div className="container" key="suite">
              <AnalysisSuite 
                results={results} 
                loading={loading} 
                error={error} 
                inputText={inputText}
                setInputText={setInputText}
                handleAnalyze={handleAnalyze}
                onUseSample={handleUseSample}
              />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer (Dashboard style) */}
      <div className="container">
        <footer className="footer-titan" style={{ marginTop: '6rem', borderTop: '1px solid #0a0a0a' }}>
          <div className="footer-logo" style={{ fontSize: '0.7rem' }}>© 2026 SMARTMEET AI. THE PINNACLE OF MEETING INTELLIGENCE.</div>
          <div className="footer-links">
            <a href="#">PRIVACY POLICY</a>
            <a href="#">TERMS OF EXCELLENCE</a>
            <a href="#">CONCIERGE SUPPORT</a>
          </div>
          <div className="footer-copy"></div>
        </footer>
      </div>
    </div>
  );
}

export default App;

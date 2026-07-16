import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

export default function AuthView({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);

  const isLogin = mode === 'login';

  return (
    <div style={styles.container} className="animate-fade-in">
      {/* LEFT: Branding & Image */}
      <div style={styles.brandPanel}>
        <div style={styles.brandTop}>
          <span style={styles.brandIcon}>◈</span>
          <span style={styles.brandName}>STARDUST</span>
        </div>
        
        <div style={styles.brandBody}>
          <h1 style={styles.brandTitle}>
            EXPLORE<br />
            <span style={{ color: 'var(--accent)' }}>THE</span><br />
            UNIVERSE.
          </h1>
          <div style={styles.brandDivider}></div>
          <p style={styles.brandDesc}>
            NASA Astronomy Picture of the Day. Deep Space Terminal.
            Authentic imagery straight from the source.
          </p>
        </div>
        
        <div style={styles.brandFooter}>
          <div style={styles.statBox}>
            <div style={styles.statNum}>10K+</div>
            <div style={styles.statLabel}>ARCHIVES</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNum}>NASA</div>
            <div style={styles.statLabel}>OFFICIAL API</div>
          </div>
        </div>
      </div>

      {/* RIGHT: Auth Forms */}
      <div style={styles.formPanel}>
        <div style={styles.formWrapper}>
          <div style={styles.formEyebrow}>// AUTHORIZATION REQUIRED</div>
          
          <div style={styles.tabs}>
            <button 
              style={{...styles.tab, ...(isLogin ? styles.activeTab : {})}} 
              onClick={() => setMode('login')}
            >
              SIGN IN
            </button>
            <button 
              style={{...styles.tab, ...(!isLogin ? styles.activeTab : {})}} 
              onClick={() => setMode('register')}
            >
              REGISTER
            </button>
          </div>
          
          <AuthForm mode={mode} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '100vh',
    width: '100%',
  },
  brandPanel: {
    backgroundColor: 'var(--bg-main)',
    borderRight: '1px solid var(--border)',
    padding: '4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
  },
  brandTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  brandIcon: {
    color: 'var(--accent)',
    fontSize: '1.2rem',
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    letterSpacing: '0.3em',
    color: 'var(--text-hi)',
    fontSize: '1rem',
  },
  brandBody: {
    maxWidth: '400px',
  },
  brandTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '4.5rem',
    fontWeight: '900',
    lineHeight: '0.95',
    letterSpacing: '-0.02em',
    color: 'var(--text-hi)',
    marginBottom: '2rem',
  },
  brandDivider: {
    height: '2px',
    width: '40px',
    backgroundColor: 'var(--accent)',
    marginBottom: '2rem',
  },
  brandDesc: {
    color: 'var(--text-muted)',
    fontSize: '1rem',
    lineHeight: '1.6',
    fontWeight: '400',
  },
  brandFooter: {
    display: 'flex',
    gap: '3rem',
    borderTop: '1px solid var(--border)',
    paddingTop: '2rem',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  statNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-hi)',
  },
  statLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.15em',
  },
  formPanel: {
    backgroundColor: 'var(--bg-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
  },
  formWrapper: {
    width: '100%',
    maxWidth: '380px',
  },
  formEyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--accent)',
    letterSpacing: '0.2em',
    marginBottom: '3rem',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid var(--border)',
    marginBottom: '2.5rem',
  },
  tab: {
    flex: 1,
    padding: '0.75rem 0',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontFamily: 'var(--font-display)',
    fontWeight: '600',
    fontSize: '0.85rem',
    letterSpacing: '0.15em',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  activeTab: {
    color: 'var(--text-hi)',
    borderBottomColor: 'var(--accent)',
  }
};

import { LogOut } from 'lucide-react';
import { useAuth } from '../AuthContext';

export default function Navbar({ currentDate, onDateChange }) {
  const { user, logout } = useAuth();

  const handlePrevDay = () => {
    if (!currentDate) return;
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    if (!currentDate) return;
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    if (d > new Date()) return;
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleRandomDay = () => {
    const start = new Date(1995, 5, 16).getTime();
    const end = new Date().getTime();
    const random = new Date(start + Math.random() * (end - start));
    onDateChange(random.toISOString().split('T')[0]);
  };

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <span style={styles.logoMark}>◈</span>
        <span style={styles.logoText}>STARDUST</span>
        <span style={styles.logoTag}>NASA · APOD MISSION TERMINAL</span>
      </div>

      <div style={styles.center}>
        <div style={styles.navigator}>
          <button onClick={handlePrevDay} style={styles.navBtn}>{'<'}</button>
          <input 
            type="date" 
            value={currentDate} 
            onChange={(e) => onDateChange(e.target.value)}
            style={styles.dateInput}
            max={new Date().toISOString().split('T')[0]}
          />
          <button onClick={handleNextDay} style={styles.navBtn}>{'>'}</button>
          <button onClick={handleRandomDay} style={styles.randomBtn}>RANDOM</button>
        </div>
      </div>

      <div style={styles.right}>
        <span style={styles.welcome}>USER: {user?.username?.toUpperCase() || 'GUEST'}</span>
        <button onClick={logout} style={styles.logoutBtn}>
          <LogOut size={14} />
          LOGOUT
        </button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: '60px',
    backgroundColor: 'var(--bg-main)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    flexShrink: 0,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoMark: {
    color: 'var(--accent)',
    fontSize: '1.1rem',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    fontSize: '1.1rem',
    letterSpacing: '0.25em',
  },
  logoTag: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.6rem',
    color: 'var(--text-muted)',
    borderLeft: '1px solid var(--border)',
    paddingLeft: '1rem',
    marginLeft: '0.5rem',
    letterSpacing: '0.1em',
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  navigator: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    padding: '2px',
    gap: '2px',
  },
  navBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    padding: '4px 12px',
    cursor: 'pointer',
    fontFamily: 'var(--font-mono)',
  },
  dateInput: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--text-hi)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    textAlign: 'center',
    padding: '4px 8px',
    colorScheme: 'dark',
    cursor: 'pointer',
  },
  randomBtn: {
    backgroundColor: 'transparent',
    border: '1px solid var(--border)',
    borderTop: 'none',
    borderBottom: 'none',
    borderRight: 'none',
    color: 'var(--text-muted)',
    padding: '4px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  welcome: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.1em',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-muted)',
    padding: '6px 12px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }
};

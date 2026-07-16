import { useState } from 'react';
import { useAuth } from '../AuthContext';

const API_BASE = `http://${window.location.hostname}:5000/api/auth`;

export default function AuthForm({ mode }) {
  const isLogin = mode === 'login';
  const { login: authenticate } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!isLogin && password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }
    
    const endpoint = isLogin ? '/login' : '/register';
    const payload = isLogin ? { email, password } : { username, email, password };
    
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      
      authenticate(data.token, { username: data.username, email: data.email });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <div style={styles.alert}>{error}</div>}
      
      {!isLogin && (
        <div style={styles.field}>
          <label style={styles.label}>USERNAME</label>
          <input 
            type="text" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={styles.input} 
            required
          />
        </div>
      )}
      
      <div style={styles.field}>
        <label style={styles.label}>EMAIL</label>
        <input 
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input} 
          required
        />
      </div>
      
      <div style={styles.field}>
        <label style={styles.label}>PASSWORD</label>
        <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input} 
          required
        />
      </div>
      
      <button type="submit" disabled={loading} style={styles.button}>
        {loading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'INITIALIZE')}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  alert: {
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 69, 0, 0.08)',
    borderLeft: '2px solid var(--accent)',
    color: '#ff8a80',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.15em',
  },
  input: {
    padding: '0.85rem 1rem',
    backgroundColor: 'var(--bg-main)',
    border: '1px solid var(--border)',
    color: 'var(--text-hi)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
  },
  button: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '0.9rem',
    fontWeight: '700',
    letterSpacing: '0.2em',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }
};

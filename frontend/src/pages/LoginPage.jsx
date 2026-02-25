import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg)', padding: '1rem',
  },
  card: {
    width: '100%', maxWidth: '420px',
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '8px', padding: '3rem 2.5rem',
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem',
    letterSpacing: '4px', color: 'var(--accent)', marginBottom: '0.3rem',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
    letterSpacing: '3px', color: 'var(--muted)', textAlign: 'center',
    marginBottom: '2.5rem', textTransform: 'uppercase',
  },
  label: {
    display: 'block', fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '2px',
    textTransform: 'uppercase', marginBottom: '0.4rem',
  },
  input: {
    width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: '4px', padding: '0.75rem 1rem', color: 'var(--text)',
    fontSize: '0.9rem', outline: 'none', marginBottom: '1.2rem',
    transition: 'border-color 0.2s',
  },
  btn: {
    width: '100%', padding: '0.9rem', background: 'var(--accent)',
    border: 'none', borderRadius: '4px', color: '#000',
    fontWeight: '700', fontSize: '0.8rem', letterSpacing: '2px',
    textTransform: 'uppercase', cursor: 'pointer', marginTop: '0.5rem',
    transition: 'all 0.2s',
  },
  backLink: {
    display: 'block', textAlign: 'center', marginTop: '1.5rem',
    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
    color: 'var(--muted)', letterSpacing: '1px', cursor: 'pointer',
    transition: 'color 0.2s',
  },
  divider: {
    textAlign: 'center', color: 'var(--muted)', fontSize: '0.7rem',
    margin: '1rem 0', fontFamily: "'JetBrains Mono', monospace",
  },
  credentials: {
    background: 'rgba(232,255,71,0.06)', border: '1px solid rgba(232,255,71,0.15)',
    borderRadius: '4px', padding: '0.8rem 1rem', marginBottom: '1.5rem',
    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
    color: 'var(--muted)', lineHeight: '1.8',
  },
};

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      loginUser(res.data.token, {
        username: res.data.username,
        fullName: res.data.fullName,
        email: res.data.email,
      });
      toast.success('Connexion réussie !');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card} className="fade-in">
        <div style={styles.logo}>DLDP</div>
        <div style={styles.subtitle}>Accès Administration</div>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Identifiant</label>
          <input
            style={styles.input}
            type="text"
            placeholder="admin"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
          <label style={styles.label}>Mot de passe</label>
          <input
            style={styles.input}
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
          <button
            type="submit"
            style={styles.btn}
            disabled={loading}
            onMouseEnter={(e) => (e.target.style.boxShadow = '0 6px 24px rgba(232,255,71,0.35)')}
            onMouseLeave={(e) => (e.target.style.boxShadow = 'none')}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <span
          style={styles.backLink}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
        >
          ← Retour au portfolio
        </span>
      </div>
    </div>
  );
}

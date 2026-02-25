import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '1.2rem 3rem',
    backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)',
    background: 'rgba(10,10,10,0.85)',
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem',
    letterSpacing: '3px', color: 'var(--accent)',
  },
  links: { display: 'flex', gap: '2rem', listStyle: 'none' },
  link: {
    color: 'var(--muted)', textDecoration: 'none', fontSize: '0.72rem',
    fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase',
    cursor: 'pointer', transition: 'color 0.2s',
    background: 'none', border: 'none',
  },
  right: { display: 'flex', alignItems: 'center', gap: '1rem' },
  btnEdit: {
    background: 'var(--accent)', color: '#000', border: 'none',
    padding: '0.5rem 1.2rem', fontWeight: '700', fontSize: '0.7rem',
    letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
    borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem',
    transition: 'all 0.2s',
  },
  btnEditActive: {
    background: 'var(--accent2)', color: '#fff',
  },
  btnLogout: {
    background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border)',
    padding: '0.5rem 1rem', fontWeight: '600', fontSize: '0.7rem',
    letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer',
    borderRadius: '2px', transition: 'all 0.2s',
  },
  userInfo: {
    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem',
    color: 'var(--muted)', letterSpacing: '1px',
  },
};

const navItems = [
  { href: '#skills',     label: 'Compétences' },
  { href: '#experience', label: 'Expérience' },
  { href: '#projects',   label: 'Projets' },
  { href: '#education',  label: 'Formation' },
  { href: '#about',      label: 'Profil' },
];

export default function Navbar({ editMode, onToggleEdit }) {
  const { user, isAuth, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    toast.success('Déconnexion réussie');
    navigate('/');
  };

  return (
    <nav style={s.nav}>
      <div style={s.logo}>DLDP</div>

      <ul style={s.links}>
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <a href={href} style={s.link}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
            >{label}</a>
          </li>
        ))}
      </ul>

      <div style={s.right}>
        {isAuth ? (
          <>
            <span style={s.userInfo}>👤 {user?.username}</span>
            <button
              style={{ ...s.btnEdit, ...(editMode ? s.btnEditActive : {}) }}
              onClick={onToggleEdit}
            >
              ✏️ {editMode ? 'Terminer' : 'Modifier'}
            </button>
            <button
              style={s.btnLogout}
              onClick={handleLogout}
              onMouseEnter={(e) => { e.target.style.color = '#fff'; e.target.style.borderColor = '#fff'; }}
              onMouseLeave={(e) => { e.target.style.color = 'var(--muted)'; e.target.style.borderColor = 'var(--border)'; }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <button
            style={s.btnEdit}
            onClick={() => navigate('/login')}
          >
            🔐 Se connecter
          </button>
        )}
      </div>
    </nav>
  );
}

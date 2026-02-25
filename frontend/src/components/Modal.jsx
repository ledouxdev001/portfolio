import React, { useEffect, useRef } from 'react';

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
    zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(12px)', padding: '1rem',
  },
  modal: {
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: '8px', padding: '2.5rem',
    width: '100%', maxWidth: '500px', maxHeight: '85vh', overflowY: 'auto',
    animation: 'fadeInUp 0.3s ease',
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem',
    letterSpacing: '2px', color: 'var(--accent)', marginBottom: '1.5rem',
  },
  label: {
    display: 'block', fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '2px',
    textTransform: 'uppercase', marginBottom: '0.4rem',
  },
  input: {
    width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: '4px', padding: '0.65rem 0.9rem', color: 'var(--text)',
    fontSize: '0.85rem', outline: 'none', marginBottom: '1rem',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
    borderRadius: '4px', padding: '0.65rem 0.9rem', color: 'var(--text)',
    fontSize: '0.85rem', outline: 'none', marginBottom: '1rem', resize: 'vertical',
    minHeight: '90px', transition: 'border-color 0.2s',
  },
  actions: { display: 'flex', gap: '0.8rem', marginTop: '0.5rem' },
  btnConfirm: {
    flex: 1, padding: '0.75rem', background: 'var(--accent)', border: 'none',
    borderRadius: '4px', color: '#000', fontWeight: '700', fontSize: '0.75rem',
    letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase',
  },
  btnCancel: {
    flex: 1, padding: '0.75rem', background: 'transparent',
    border: '1px solid var(--border)', borderRadius: '4px', color: 'var(--muted)',
    fontWeight: '700', fontSize: '0.75rem', letterSpacing: '1px', cursor: 'pointer',
    textTransform: 'uppercase',
  },
};

function Field({ label, id, type = 'text', placeholder = '', value, onChange }) {
  return (
    <div>
      <label style={styles.label} htmlFor={id}>{label}</label>
      <input
        style={styles.input} id={id} type={type} placeholder={placeholder}
        value={value || ''} onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />
    </div>
  );
}

function TextArea({ label, id, placeholder = '', value, onChange }) {
  return (
    <div>
      <label style={styles.label} htmlFor={id}>{label}</label>
      <textarea
        style={styles.textarea} id={id} placeholder={placeholder}
        value={value || ''} onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />
    </div>
  );
}

export { Field, TextArea };

export default function Modal({ open, title, children, onConfirm, onClose, confirmLabel = 'Enregistrer' }) {
  const overlayRef = useRef();

  useEffect(() => {
    const handler = (e) => { if (e.target === overlayRef.current) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;
  return (
    <div style={styles.overlay} ref={overlayRef}>
      <div style={styles.modal}>
        <div style={styles.title}>{title}</div>
        {children}
        <div style={styles.actions}>
          <button style={styles.btnConfirm} onClick={onConfirm}>{confirmLabel}</button>
          <button style={styles.btnCancel} onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

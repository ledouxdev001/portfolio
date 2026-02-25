import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Modal, { Field, TextArea } from '../components/Modal';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../services/api';

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = {
  // Hero
  hero: { minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: 80 },
  heroLeft: { display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 3rem 6rem 5rem', zIndex: 2 },
  heroTag: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' },
  heroName: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(4rem,8vw,8rem)', lineHeight: 0.9, letterSpacing: 2, marginBottom: '1.5rem' },
  heroTitle: { fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--muted)', marginBottom: '2rem', lineHeight: 1.5 },
  heroDesc: { fontSize: '0.9rem', lineHeight: 1.8, color: '#aaa', maxWidth: 420, marginBottom: '3rem' },
  heroContacts: { display: 'flex', flexWrap: 'wrap', gap: '0.8rem' },
  chip: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: 2, fontSize: '0.75rem', color: 'var(--muted)', fontFamily: "'JetBrains Mono',monospace", transition: 'all 0.2s', cursor: 'pointer' },
  heroRight: { display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  card: { position: 'absolute', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, padding: '2rem', width: 280, animation: 'float 6s ease-in-out infinite' },
  cardSmall: { width: 160, padding: '1.2rem', animation: 'float 7s ease-in-out infinite' },
  cardLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.8rem' },
  cardValue: { fontFamily: "'Bebas Neue',sans-serif", fontSize: '2.5rem', lineHeight: 1 },
  cardSub: { fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.3rem' },
  // Sections
  section: { padding: '6rem 5rem' },
  sectionAlt: { padding: '6rem 5rem', background: 'var(--surface)' },
  sectionHeader: { display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '4rem' },
  sectionNum: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: 2 },
  sectionTitle: { fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: 2, lineHeight: 1 },
  sectionLine: { flex: 1, height: 1, background: 'var(--border)', marginLeft: '1rem' },
  // Skills
  skillsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' },
  skillCard: { padding: '2rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 4, transition: 'border-color 0.3s', position: 'relative' },
  skillCatName: { fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace", marginBottom: '1rem' },
  skillTags: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
  skillTag: { background: 'var(--surface2)', border: '1px solid var(--border)', padding: '0.3rem 0.8rem', borderRadius: 2, fontSize: '0.75rem', color: 'var(--text)', fontFamily: "'JetBrains Mono',monospace" },
  // Timeline
  timeline: { display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0, position: 'relative' },
  expDate: { padding: '2rem 2rem 2rem 0', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'right', borderBottom: '1px solid var(--border)' },
  expContent: { padding: '2rem 0 2rem 2.5rem', borderBottom: '1px solid var(--border)', position: 'relative' },
  expCompany: { fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: 2, textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace", marginBottom: '0.4rem' },
  expRole: { fontFamily: "'DM Serif Display',serif", fontSize: '1.4rem', marginBottom: '1rem' },
  expTask: { fontSize: '0.82rem', color: '#aaa', display: 'flex', gap: '0.8rem', lineHeight: 1.6, marginBottom: '0.4rem' },
  // Projects
  projGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' },
  projCard: { background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 4, padding: '2rem', transition: 'all 0.3s', position: 'relative', cursor: 'default' },
  projName: { fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.5rem', letterSpacing: 1, marginBottom: '0.8rem' },
  projDesc: { fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.2rem' },
  projLink: { fontSize: '0.7rem', color: 'var(--accent)', fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, display: 'flex', alignItems: 'center', gap: '0.4rem' },
  // Edu
  eduGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' },
  eduCard: { padding: '2rem', border: '1px solid var(--border)', borderRadius: 4, transition: 'border-color 0.3s', background: 'var(--bg)', position: 'relative' },
  eduPeriod: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: 2, marginBottom: '0.8rem' },
  eduDegree: { fontFamily: "'DM Serif Display',serif", fontSize: '1.1rem', marginBottom: '0.4rem', lineHeight: 1.4 },
  eduSchool: { fontSize: '0.8rem', color: 'var(--muted)' },
  // About
  aboutGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' },
  aboutLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: '1.5rem' },
  langItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border)' },
  langBar: { width: 100, height: 2, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' },
  langFill: { height: '100%', background: 'var(--accent)', borderRadius: 2 },
  qualityTag: { padding: '0.6rem 1.2rem', border: '1px solid var(--border)', borderRadius: 40, fontSize: '0.8rem', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s', position: 'relative' },
  qualityTags: { display: 'flex', flexWrap: 'wrap', gap: '0.8rem' },
  // Edit controls
  addBtn: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', background: 'rgba(232,255,71,0.08)', border: '1px dashed rgba(232,255,71,0.3)', color: 'var(--accent)', fontSize: '0.7rem', fontFamily: "'JetBrains Mono',monospace", letterSpacing: 1, cursor: 'pointer', borderRadius: 4, marginTop: '1rem', width: 'fit-content' },
  delBtn: { position: 'absolute', top: 8, right: 8, width: 22, height: 22, background: 'var(--accent2)', border: 'none', borderRadius: '50%', color: 'white', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  editBtn: { position: 'absolute', top: 8, right: 36, width: 22, height: 22, background: 'var(--border)', border: 'none', borderRadius: '50%', color: 'var(--text)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  // Toolbar
  toolbar: { position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 50, padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 200, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)' },
  toolbarLabel: { fontFamily: "'JetBrains Mono',monospace", fontSize: '0.65rem', color: 'var(--muted)' },
  footer: { padding: '3rem 5rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
};

// ─── EMPTY STATES ─────────────────────────────────────────────────────────────
const emptyProfile = { firstName: '', lastName: '', jobTitle: '', description: '', phone: '', email: '', website: '', location: '', availability: '', yearsExp: '' };
const emptySkillCat = { name: '', items: [] };
const emptyExp = { dateRange: '', company: '', role: '', tasks: [] };
const emptyProject = { name: '', description: '', link: '' };
const emptyEdu = { period: '', degree: '', school: '' };
const emptyLang = { name: '', level: '', proficiencyPct: 50 };
const emptyQuality = { name: '' };

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function SectionHeader({ num, title }) {
  return (
    <div style={css.sectionHeader}>
      <span style={css.sectionNum}>{num}</span>
      <h2 style={css.sectionTitle}>{title}</h2>
      <div style={css.sectionLine} />
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const { isAuth } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modal, setModal] = useState({ open: false, type: '', data: {}, id: null });

  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await api.getPortfolio();
      setPortfolio(res.data);
    } catch (err) {
      toast.error('Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPortfolio(); }, [fetchPortfolio]);

  const toggleEdit = () => {
    if (!isAuth) { toast.error('Connectez-vous pour modifier'); return; }
    setEditMode((e) => !e);
  };

  const openModal = (type, data = {}, id = null) => setModal({ open: true, type, data, id });
  const closeModal = () => setModal({ open: false, type: '', data: {}, id: null });
  const setModalData = (field, val) => setModal((m) => ({ ...m, data: { ...m.data, [field]: val } }));

  // ── SAVE HANDLERS ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    const { type, data, id } = modal;
    try {
      switch (type) {
        case 'profile':   await api.updateProfile(data); break;
        case 'skillCat':  id ? await api.updateSkillCategory(id, { ...data, items: (data.itemsStr||'').split(',').map((s,i)=>({ name: s.trim(), displayOrder: i })) })
                              : await api.addSkillCategory({ ...data, items: (data.itemsStr||'').split(',').map((s,i)=>({ name: s.trim(), displayOrder: i })) }); break;
        case 'exp':       {
          const tasks = (data.tasksStr||'').split('\n').filter(Boolean).map((d,i)=>({ description: d.trim(), displayOrder: i }));
          id ? await api.updateExperience(id, { ...data, tasks }) : await api.addExperience({ ...data, tasks });
          break;
        }
        case 'project':   id ? await api.updateProject(id, data) : await api.addProject(data); break;
        case 'edu':       id ? await api.updateEducation(id, data) : await api.addEducation(data); break;
        case 'lang':      id ? await api.updateLanguage(id, data) : await api.addLanguage(data); break;
        case 'quality':   id ? await api.updateQuality(id, data) : await api.addQuality(data); break;
        default: break;
      }
      toast.success('Enregistré !');
      closeModal();
      fetchPortfolio();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Erreur');
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Supprimer cet élément ?')) return;
    try {
      switch (type) {
        case 'skillCat': await api.deleteSkillCategory(id); break;
        case 'exp':      await api.deleteExperience(id); break;
        case 'project':  await api.deleteProject(id); break;
        case 'edu':      await api.deleteEducation(id); break;
        case 'lang':     await api.deleteLanguage(id); break;
        case 'quality':  await api.deleteQuality(id); break;
        default: break;
      }
      toast.success('Supprimé');
      fetchPortfolio();
    } catch { toast.error('Erreur de suppression'); }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ width: 36, height: 36, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: 2 }}>CHARGEMENT...</div>
    </div>
  );

  if (!portfolio) return null;
  const { profile, skills, experiences, projects, education, languages, qualities } = portfolio;

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar editMode={editMode} onToggleEdit={toggleEdit} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section id="hero" style={css.hero}>
        <div style={css.heroLeft}>
          <div style={css.heroTag} className="fade-in-1">
            <span style={{ width: 30, height: 1, background: 'var(--accent)', display: 'block' }} />
            {profile?.jobTitle || 'DÉVELOPPEUR WEB FULL STACK'}
          </div>
          <h1 style={css.heroName} className="fade-in-2">
            {profile?.firstName || 'DORCEL'}<br />
            <span style={{ color: 'var(--accent)' }}>{profile?.lastName || 'LE DOUX FOPA'}</span>
          </h1>
          <p style={css.heroTitle} className="fade-in-3">Passionné par l'architecture logicielle & l'innovation</p>
          <p style={css.heroDesc} className="fade-in-3">{profile?.description}</p>
          <div style={css.heroContacts} className="fade-in-4">
            {profile?.phone    && <span style={css.chip}>📞 {profile.phone}</span>}
            {profile?.email    && <span style={css.chip}>✉️ {profile.email}</span>}
            {profile?.website  && <a href={profile.website} target="_blank" rel="noreferrer" style={css.chip}>🌐 {profile.website.replace('https://','')}</a>}
            {profile?.location && <span style={css.chip}>📍 {profile.location}</span>}
          </div>
          {editMode && (
            <button style={{ ...css.addBtn, marginTop: '1.5rem' }} onClick={() => openModal('profile', profile || emptyProfile)}>
              ✏️ Modifier le profil
            </button>
          )}
        </div>

        <div style={css.heroRight}>
          <div style={{ width: 380, height: 480, position: 'relative' }}>
            <div style={{ ...css.card, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
              <div style={css.cardLabel}>Disponibilité</div>
              <div style={css.cardValue}>{profile?.availability || '4-6'}</div>
              <div style={css.cardSub}>mois de stage disponible</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.8rem' }}>
                {skills?.slice(0,2).flatMap(c=>c.items?.slice(0,2)).map((item,i)=>(
                  <span key={i} style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', background: 'rgba(232,255,71,0.1)', border: '1px solid rgba(232,255,71,0.2)', borderRadius: 20, color: 'var(--accent)', fontFamily: "'JetBrains Mono',monospace" }}>{item?.name}</span>
                ))}
              </div>
            </div>
            <div style={{ ...css.card, ...css.cardSmall, top: '10%', right: 0, border: '1px solid var(--accent)' }}>
              <div style={css.cardLabel}>Exp.</div>
              <div style={{ ...css.cardValue, fontSize: '2rem' }}>{profile?.yearsExp || '3+'}</div>
              <div style={css.cardSub}>ans en prod</div>
            </div>
            <div style={{ ...css.card, ...css.cardSmall, bottom: '10%', left: 0 }}>
              <div style={css.cardLabel}>Stack</div>
              <div style={{ ...css.cardValue, fontSize: '1.4rem' }}>Full<br />Stack</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────── */}
      <section id="skills" style={css.sectionAlt}>
        <SectionHeader num="01" title="COMPÉTENCES" />
        <div style={css.skillsGrid}>
          {skills?.map((cat) => (
            <div key={cat.id} style={{ ...css.skillCard, ...(editMode ? { paddingTop: '2.5rem' } : {}) }}>
              {editMode && (
                <>
                  <button style={css.delBtn} onClick={() => handleDelete('skillCat', cat.id)}>×</button>
                  <button style={css.editBtn} onClick={() => openModal('skillCat', { name: cat.name, itemsStr: cat.items?.map(i=>i.name).join(', ') }, cat.id)}>✏</button>
                </>
              )}
              <div style={css.skillCatName}>{cat.name}</div>
              <div style={css.skillTags}>
                {cat.items?.map((item) => (
                  <span key={item.id} style={css.skillTag}>{item.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {editMode && <button style={css.addBtn} onClick={() => openModal('skillCat', { name: '', itemsStr: '' })}>+ Ajouter une catégorie</button>}
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────── */}
      <section id="experience" style={{ ...css.section, borderTop: '1px solid var(--border)' }}>
        <SectionHeader num="02" title="EXPÉRIENCES" />
        <div style={{ ...css.timeline, ...(window.innerWidth < 700 ? { gridTemplateColumns: '1fr' } : {}) }}>
          <div style={{ position: 'absolute', left: 199, top: 0, bottom: 0, width: 1, background: 'var(--border)' }} />
          {experiences?.map((exp) => (
            <React.Fragment key={exp.id}>
              <div style={css.expDate}>{exp.dateRange}</div>
              <div style={{ ...css.expContent, ...(editMode ? { paddingTop: '2.5rem' } : {}) }}>
                <div style={{ position: 'absolute', left: -5, top: editMode ? 40 : 36, width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--bg)' }} />
                {editMode && (
                  <>
                    <button style={css.delBtn} onClick={() => handleDelete('exp', exp.id)}>×</button>
                    <button style={css.editBtn} onClick={() => openModal('exp', { ...exp, tasksStr: exp.tasks?.map(t=>t.description).join('\n') }, exp.id)}>✏</button>
                  </>
                )}
                <div style={css.expCompany}>{exp.company}</div>
                <div style={css.expRole}>{exp.role}</div>
                {exp.tasks?.map((t) => (
                  <div key={t.id} style={css.expTask}><span style={{ color: 'var(--accent2)', flexShrink: 0 }}>→</span><span>{t.description}</span></div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
        {editMode && <button style={css.addBtn} onClick={() => openModal('exp', { ...emptyExp, tasksStr: '' })}>+ Ajouter une expérience</button>}
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────── */}
      <section id="projects" style={css.sectionAlt}>
        <SectionHeader num="03" title="PROJETS" />
        <div style={css.projGrid}>
          {projects?.map((p) => (
            <div key={p.id} style={{ ...css.projCard, ...(editMode ? { paddingTop: '2.5rem' } : {}) }}>
              {editMode && (
                <>
                  <button style={css.delBtn} onClick={() => handleDelete('project', p.id)}>×</button>
                  <button style={css.editBtn} onClick={() => openModal('project', p, p.id)}>✏</button>
                </>
              )}
              <div style={css.projName}>{p.name}</div>
              <div style={css.projDesc}>{p.description}</div>
              {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={css.projLink}>→ VOIR LE PROJET</a>}
            </div>
          ))}
        </div>
        {editMode && <button style={css.addBtn} onClick={() => openModal('project', emptyProject)}>+ Ajouter un projet</button>}
      </section>

      {/* ── EDUCATION ────────────────────────────────────────────────── */}
      <section id="education" style={{ ...css.section, borderTop: '1px solid var(--border)' }}>
        <SectionHeader num="04" title="FORMATION" />
        <div style={css.eduGrid}>
          {education?.map((e) => (
            <div key={e.id} style={{ ...css.eduCard, ...(editMode ? { paddingTop: '2.5rem' } : {}) }}>
              {editMode && (
                <>
                  <button style={css.delBtn} onClick={() => handleDelete('edu', e.id)}>×</button>
                  <button style={css.editBtn} onClick={() => openModal('edu', e, e.id)}>✏</button>
                </>
              )}
              <div style={css.eduPeriod}>{e.period}</div>
              <div style={css.eduDegree}>{e.degree}</div>
              <div style={css.eduSchool}>{e.school}</div>
            </div>
          ))}
        </div>
        {editMode && <button style={css.addBtn} onClick={() => openModal('edu', emptyEdu)}>+ Ajouter une formation</button>}
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" style={css.sectionAlt}>
        <SectionHeader num="05" title="PROFIL" />
        <div style={css.aboutGrid}>
          <div>
            <div style={css.aboutLabel}>Langues</div>
            {languages?.map((l) => (
              <div key={l.id} style={{ ...css.langItem, position: 'relative', ...(editMode ? { paddingRight: 60 } : {}) }}>
                {editMode && (
                  <>
                    <button style={{ ...css.delBtn, position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }} onClick={() => handleDelete('lang', l.id)}>×</button>
                    <button style={{ ...css.editBtn, position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)' }} onClick={() => openModal('lang', l, l.id)}>✏</button>
                  </>
                )}
                <div>
                  <div style={{ fontSize: '0.9rem' }}>{l.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--muted)' }}>{l.level}</div>
                </div>
                <div style={css.langBar}><div style={{ ...css.langFill, width: `${l.proficiencyPct}%` }} /></div>
              </div>
            ))}
            {editMode && <button style={css.addBtn} onClick={() => openModal('lang', emptyLang)}>+ Ajouter une langue</button>}
          </div>
          <div>
            <div style={css.aboutLabel}>Qualités</div>
            <div style={css.qualityTags}>
              {qualities?.map((q) => (
                <span key={q.id} style={{ ...css.qualityTag, ...(editMode ? { paddingRight: editMode ? '2rem' : '1.2rem' } : {}) }}>
                  {q.name}
                  {editMode && (
                    <button style={{ ...css.delBtn, position: 'absolute', top: '50%', right: -4, transform: 'translateY(-50%)', width: 18, height: 18, fontSize: 10 }} onClick={() => handleDelete('quality', q.id)}>×</button>
                  )}
                </span>
              ))}
            </div>
            {editMode && <button style={css.addBtn} onClick={() => openModal('quality', emptyQuality)}>+ Ajouter une qualité</button>}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={css.footer}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.5rem', letterSpacing: 3, color: 'var(--muted)' }}>
          {profile?.firstName} {profile?.lastName}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--muted)' }}>
          © 2025 — FULL STACK DEVELOPER
        </div>
      </footer>

      {/* ── EDIT TOOLBAR ─────────────────────────────────────────────── */}
      {editMode && (
        <div style={css.toolbar}>
          <span style={css.toolbarLabel}>✏️ MODE ÉDITION ACTIF</span>
          <button style={{ padding: '0.4rem 1rem', background: 'var(--accent)', border: 'none', borderRadius: 30, color: '#000', fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer', letterSpacing: 1 }} onClick={() => { setEditMode(false); toast.success('Modifications terminées'); }}>
            ✓ Terminer
          </button>
        </div>
      )}

      {/* ── MODAL ────────────────────────────────────────────────────── */}
      <Modal open={modal.open} title={getModalTitle(modal.type, modal.id)} onConfirm={handleSave} onClose={closeModal}>
        {renderModalContent(modal.type, modal.data, setModalData)}
      </Modal>
    </>
  );
}

// ─── MODAL CONTENT BY TYPE ───────────────────────────────────────────────────
function getModalTitle(type, id) {
  const action = id ? 'Modifier' : 'Ajouter';
  const map = { profile: 'Modifier le profil', skillCat: `${action} une catégorie`, exp: `${action} une expérience`, project: `${action} un projet`, edu: `${action} une formation`, lang: `${action} une langue`, quality: `${action} une qualité` };
  return map[type] || 'Modifier';
}

function renderModalContent(type, data, set) {
  switch (type) {
    case 'profile': return (<>
      <Field label="Prénom" value={data.firstName} onChange={v=>set('firstName',v)} />
      <Field label="Nom" value={data.lastName} onChange={v=>set('lastName',v)} />
      <Field label="Titre du poste" value={data.jobTitle} onChange={v=>set('jobTitle',v)} />
      <TextArea label="Description" value={data.description} onChange={v=>set('description',v)} />
      <Field label="Téléphone" value={data.phone} onChange={v=>set('phone',v)} />
      <Field label="Email" value={data.email} onChange={v=>set('email',v)} />
      <Field label="Site web" value={data.website} onChange={v=>set('website',v)} />
      <Field label="Localisation" value={data.location} onChange={v=>set('location',v)} />
      <Field label="Disponibilité (ex: 4-6 mois)" value={data.availability} onChange={v=>set('availability',v)} />
      <Field label="Années d'expérience (ex: 3+)" value={data.yearsExp} onChange={v=>set('yearsExp',v)} />
    </>);
    case 'skillCat': return (<>
      <Field label="Nom de la catégorie" value={data.name} onChange={v=>set('name',v)} placeholder="ex: Mobile" />
      <Field label="Compétences (séparées par des virgules)" value={data.itemsStr} onChange={v=>set('itemsStr',v)} placeholder="Flutter, Dart, Kotlin" />
    </>);
    case 'exp': return (<>
      <Field label="Période" value={data.dateRange} onChange={v=>set('dateRange',v)} placeholder="01/2024 → 06/2024" />
      <Field label="Entreprise" value={data.company} onChange={v=>set('company',v)} placeholder="Entreprise — Ville, Pays" />
      <Field label="Poste" value={data.role} onChange={v=>set('role',v)} placeholder="Développeur Backend" />
      <TextArea label="Tâches (une par ligne)" value={data.tasksStr} onChange={v=>set('tasksStr',v)} placeholder={"Développement API\nTests unitaires"} />
    </>);
    case 'project': return (<>
      <Field label="Nom du projet" value={data.name} onChange={v=>set('name',v)} />
      <TextArea label="Description" value={data.description} onChange={v=>set('description',v)} />
      <Field label="Lien (optionnel)" value={data.link} onChange={v=>set('link',v)} placeholder="https://github.com/..." />
    </>);
    case 'edu': return (<>
      <Field label="Période" value={data.period} onChange={v=>set('period',v)} placeholder="2023 — 2025" />
      <Field label="Diplôme" value={data.degree} onChange={v=>set('degree',v)} />
      <Field label="École" value={data.school} onChange={v=>set('school',v)} />
    </>);
    case 'lang': return (<>
      <Field label="Langue" value={data.name} onChange={v=>set('name',v)} placeholder="Espagnol" />
      <Field label="Niveau (ex: B1 — Intermédiaire)" value={data.level} onChange={v=>set('level',v)} />
      <Field label="Maîtrise en % (0-100)" type="number" value={data.proficiencyPct} onChange={v=>set('proficiencyPct', parseInt(v)||50)} />
    </>);
    case 'quality': return (<>
      <Field label="Qualité" value={data.name} onChange={v=>set('name',v)} placeholder="Rigoureux" />
    </>);
    default: return null;
  }
}

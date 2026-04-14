import { useState, useEffect } from 'react'
import { ArrowRight, Mail, Phone, ExternalLink, Globe, ShoppingBag, Code2, Zap, Shield, HeadphonesIcon } from 'lucide-react'

const PROJECTS = [
  {
    tag: 'Application Web',
    title: 'SEMASC',
    desc: "Création de ressources pédagogiques pour renforcer les capacités des clubs sportifs amateurs en lien avec les initiatives européennes.",
    tech: ['React', 'Spring Boot', 'PostgreSQL'],
    icon: <Globe size={18} />,
    color: '#818cf8',
  },
  {
    tag: 'E-commerce',
    title: 'Emmael Céramique',
    desc: "Site e-commerce dédié à la céramique artisanale. Design élégant, expérience d'achat fluide, gestion de catalogue complète.",
    tech: ['React', 'TypeScript', 'Tailwind'],
    icon: <ShoppingBag size={18} />,
    color: '#a78bfa',
  },
  {
    tag: 'Site Vitrine',
    title: 'Weirding Code',
    desc: "Portfolio et site vitrine personnel. Stack moderne, déploiement automatisé, HTTPS. Conçu et déployé from scratch.",
    tech: ['React', 'Spring Boot', 'Java 21'],
    icon: <Code2 size={18} />,
    color: '#60a5fa',
  },
]

const SERVICES = [
  { icon: <Globe size={20} />,           title: 'Site Web Vitrine',        desc: "Une présence en ligne élégante et efficace. Designs épurés, responsive, avec optimisation SEO de base." },
  { icon: <Zap size={20} />,             title: 'Solution Web Complète',    desc: "De la conception des maquettes à l'hébergement. Développement sur mesure, base de données, maintenance." },
  { icon: <Code2 size={20} />,           title: 'Développement Sur-Mesure', desc: "Applications web adaptées à vos besoins spécifiques — du front-end au back-end, de A à Z." },
  { icon: <Shield size={20} />,          title: 'Sécurité & Conformité',    desc: "Meilleures pratiques de sécurité, conformité RGPD, et maintien des performances sur le long terme." },
  { icon: <Zap size={20} />,             title: 'Optimisation',             desc: "Amélioration de la vitesse, de l'expérience utilisateur et de la scalabilité de vos applications." },
  { icon: <HeadphonesIcon size={20} />,  title: 'Accompagnement Technique', desc: "Conseil, audit et suivi technique pour garantir la réussite de vos projets numériques." },
]

const TECH_TAGS = ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Java', 'Tailwind CSS', 'WordPress', 'SEO', 'REST API']
const MARQUEE   = 'SPRING BOOT · REACT · TYPESCRIPT · POSTGRESQL · JAVA · DOCKER · WORDPRESS · REST API · TAILWIND · '

const s = {
  // flex helpers
  row:     { display: 'flex', alignItems: 'center' } as React.CSSProperties,
  rowGap8: { display: 'flex', alignItems: 'center', gap: 8 } as React.CSSProperties,
  rowSB:   { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } as React.CSSProperties,
  col:     { display: 'flex', flexDirection: 'column' } as React.CSSProperties,
  wrap:    { display: 'flex', flexWrap: 'wrap', gap: 8 } as React.CSSProperties,
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [form, setForm] = useState({ company: '', email: '', message: '' })

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-brand">
          <div className="nav-logo">W</div>
          <span>Weirding Code</span>
        </a>
        <ul className="nav-links hide-mobile">
          {[['À propos','#about'],['Réalisations','#projects'],['Services','#services'],['Contact','#contact']].map(([l,h])=>(
            <li key={l}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-primary hide-mobile" style={{ padding: '8px 18px', fontSize: '0.8rem' }}>
          Me contacter
        </a>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 100, paddingLeft: 'var(--px)', paddingRight: 'var(--px)', overflow: 'hidden' }}>
        <div className="blob" style={{ width: 500, height: 500, top: -100, left: -100, background: 'rgba(129,140,248,0.07)' }} />
        <div className="blob" style={{ width: 400, height: 400, top: 50, right: -50, background: 'rgba(167,139,250,0.05)', animationDelay: '3s' }} />

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 680 }}>

            {/* Badge */}
            <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: 'var(--accent-dim)', border: '1px solid rgba(129,140,248,0.2)', marginBottom: 32 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.8)' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)' }}>Disponible pour de nouveaux projets</span>
            </div>

            {/* Title */}
            <h1 className="h1 fade-up delay-1" style={{ marginBottom: 24 }}>
              Votre réalisateur de<br />
              <span className="gradient-text">solutions WEB</span>
            </h1>

            {/* Subtitle */}
            <p className="fade-up delay-2" style={{ fontSize: '1.1rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
              Je suis <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Flavien Desse</strong>, développeur fullstack.
              Je conçois des solutions sur mesure, adaptées précisément à vos besoins.
            </p>

            {/* CTAs */}
            <div className="fade-up delay-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
              <a href="#projects" className="btn btn-primary">Voir mes réalisations <ArrowRight size={16} /></a>
              <a href="#contact" className="btn btn-ghost">Me contacter</a>
            </div>

            {/* Tags */}
            <div style={s.wrap}>
              {TECH_TAGS.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap divider" style={{ padding: '14px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="marquee-track">
          {[MARQUEE, MARQUEE].map((t, i) => (
            <span key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: 'var(--section-py) var(--px)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center' }}>

          {/* Text */}
          <div>
            <div className="label">À propos</div>
            <h2 className="h2" style={{ marginBottom: 20 }}>Du code avec intention,<br />des projets qui durent</h2>
            <div style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p>Je suis passionné par l'art de transformer des idées en projets uniques. Chaque projet est l'occasion d'explorer de nouvelles voies et de créer des expériences qui vous ressemblent.</p>
              <p>Avec une écoute attentive et une volonté d'innover, je vous accompagne de la conception initiale à la mise en production.</p>
            </div>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 28, fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)' }}>
              Travaillons ensemble <ArrowRight size={15} />
            </a>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[['10+','Projets livrés'],['5+','Années d\'XP'],['100%','Sur mesure']].map(([v,l])=>(
                <div key={l} className="card" style={{ padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{v}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Code block */}
            <div className="code-block">
              <div className="code-bar">
                {['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="code-dot" style={{ background: c }} />)}
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--muted)', marginLeft: 8 }}>flavien.ts</span>
              </div>
              <div className="code-body">
                {[
                  [null, '{', 'muted'],
                  ['name',      '"Flavien Desse"',          'str'],
                  ['role',      '"Développeur Fullstack"',   'str'],
                  ['location',  '"France"',                  'str'],
                  ['coffee',    'Infinity',                  'num'],
                  ['available', 'true',                      'num'],
                  [null, '}', 'muted'],
                ].map(([key, val, type], i) => (
                  <div key={i} style={{ paddingLeft: key ? 20 : 0 }}>
                    {key && <><span className="code-key">{key}</span><span className="code-muted">: </span></>}
                    <span className={type === 'str' ? 'code-str' : type === 'num' ? 'code-num' : 'code-muted'} style={type === 'str' ? { color: '#60a5fa' } : type === 'num' ? { color: '#34d399' } : {}}>{val}</span>
                    {key && i < 5 && <span className="code-muted">,</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section-bg" style={{ padding: 'var(--section-py) var(--px)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="label">Réalisations</div>
          <h2 className="h2" style={{ marginBottom: 48 }}>Projets récents</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {PROJECTS.map(p => (
              <div key={p.title} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div className="icon-box" style={{ background: `${p.color}18`, color: p.color }}>{p.icon}</div>
                  <span className="tag">{p.tag}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)', marginBottom: 8 }}>{p.title}</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{p.desc}</p>
                </div>
                <div style={s.wrap}>{p.tech.map(t=><span key={t} className="tag">{t}</span>)}</div>
                <button
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                >
                  <ExternalLink size={13} /> Voir le projet
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: 'var(--section-py) var(--px)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="label">Services</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
            <h2 className="h2">Ce que je propose</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 300 }}>
              Des solutions adaptées à chaque besoin, de la vitrine au système complet.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {SERVICES.map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: 24 }}>
                <div className="icon-box" style={{ marginBottom: 18 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-bg" style={{ padding: 'var(--section-py) var(--px)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64 }}>

          {/* Info */}
          <div>
            <div className="label">Contact</div>
            <h2 className="h2" style={{ marginBottom: 16 }}>Parlons de votre projet</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 36, maxWidth: 360 }}>
              Décrivez-moi votre projet et transformons vos ambitions en réalités. Réponse sous 24h.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="mailto:weirding.code@gmail.com" className="contact-row">
                <div className="icon-box"><Mail size={16} /></div>
                <div style={{ flex: 1 }}>
                  <div className="contact-info-label">EMAIL</div>
                  <div className="contact-info-val">weirding.code@gmail.com</div>
                </div>
                <ExternalLink size={14} style={{ color: 'var(--muted)' }} />
              </a>
              <a href="tel:+33649198086" className="contact-row">
                <div className="icon-box"><Phone size={16} /></div>
                <div style={{ flex: 1 }}>
                  <div className="contact-info-label">TÉLÉPHONE</div>
                  <div className="contact-info-val">06 49 19 80 86</div>
                </div>
                <ExternalLink size={14} style={{ color: 'var(--muted)' }} />
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { key: 'company', label: 'ENTREPRISE', type: 'text',  ph: 'Votre entreprise ou nom' },
              { key: 'email',   label: 'EMAIL',       type: 'email', ph: 'votre@email.com' },
            ].map(({ key, label, type, ph }) => (
              <div key={key}>
                <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>{label}</label>
                <input type={type} placeholder={ph} className="input"
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>MESSAGE</label>
              <textarea rows={5} placeholder="Décrivez votre projet..." className="input"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Envoyer le message <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <footer className="footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="nav-logo" style={{ width: 24, height: 24, fontSize: '0.65rem' }}>W</div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Weirding Code</span>
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--muted)' }}>© 2026 Flavien Desse</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--muted)' }}>Spring Boot + React</span>
        </footer>
      </div>
    </div>
  )
}

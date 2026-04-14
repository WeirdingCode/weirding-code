import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  ArrowRight,
  Mail,
  Phone,
  ExternalLink,
  Globe,
  ShoppingBag,
  Code2,
  Zap,
  Shield,
  HeadphonesIcon,
  ChevronRight,
} from 'lucide-react'

// ── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'À propos', href: '#about' },
  { label: 'Réalisations', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

const PROJECTS = [
  {
    tag: 'Application Web',
    title: 'SEMASC',
    desc: 'Création de ressources pédagogiques pour renforcer les capacités des clubs sportifs amateurs en lien avec les initiatives européennes.',
    tech: ['React', 'Spring Boot', 'PostgreSQL'],
    icon: <Globe size={18} />,
    color: '#818cf8',
  },
  {
    tag: 'E-commerce',
    title: 'Emmael Céramique',
    desc: 'Site e-commerce dédié à la céramique artisanale. Design élégant, expérience d\'achat fluide, gestion de catalogue complète.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    icon: <ShoppingBag size={18} />,
    color: '#a78bfa',
  },
  {
    tag: 'Site Vitrine',
    title: 'Weirding Code',
    desc: 'Portfolio et site vitrine personnel. Stack moderne, déploiement automatisé, HTTPS. Conçu et déployé from scratch.',
    tech: ['React', 'Spring Boot', 'Java 21'],
    icon: <Code2 size={18} />,
    color: '#60a5fa',
  },
]

const SERVICES = [
  {
    icon: <Globe size={22} />,
    title: 'Site Web Vitrine',
    desc: 'Une présence en ligne élégante et efficace. Designs épurés, responsive, avec optimisation SEO de base.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Solution Web Complète',
    desc: 'De la conception des maquettes à l\'hébergement. Développement sur mesure, base de données, maintenance.',
  },
  {
    icon: <Code2 size={22} />,
    title: 'Développement Sur-Mesure',
    desc: 'Applications web adaptées à vos besoins spécifiques — du front-end au back-end, de A à Z.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Sécurité & Conformité',
    desc: 'Meilleures pratiques de sécurité, conformité RGPD, et maintien des performances sur le long terme.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Optimisation',
    desc: 'Amélioration de la vitesse, de l\'expérience utilisateur et de la scalabilité de vos applications.',
  },
  {
    icon: <HeadphonesIcon size={22} />,
    title: 'Accompagnement Technique',
    desc: 'Conseil, audit et suivi technique pour garantir la réussite de vos projets numériques.',
  },
]

const TECH_TAGS = ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Java', 'Tailwind CSS', 'WordPress', 'SEO', 'REST API']

const MARQUEE_TEXT = 'SPRING BOOT · REACT · TYPESCRIPT · POSTGRESQL · JAVA · DOCKER · WORDPRESS · REST API · TAILWIND · '

// ── Component ─────────────────────────────────────────────────────────────────

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [form, setForm] = useState({ company: '', email: '', message: '' })

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navScrolled = scrollY > 40

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          borderBottom: navScrolled ? '1px solid var(--border)' : '1px solid transparent',
          background: navScrolled ? 'rgba(7,9,15,0.85)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(20px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <span style={{ color: '#07090f', fontSize: '0.75rem', fontWeight: 800, fontFamily: 'Plus Jakarta Sans' }}>W</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Weirding Code</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="nav-link">{label}</a>
            ))}
          </nav>

          <a
            href="#contact"
            className="btn-primary hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
          >
            Me contacter
          </a>
        </div>
      </header>

      <main>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-28 px-6 md:px-10 overflow-hidden">

          {/* Ambient blobs */}
          <div className="glow-blob w-96 h-96 -top-20 -left-20" style={{ background: 'rgba(129,140,248,0.08)' }} />
          <div className="glow-blob w-80 h-80 top-20 right-0" style={{ background: 'rgba(167,139,250,0.06)', animationDelay: '3s' }} />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="max-w-3xl">

              {/* Badge */}
              <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ background: 'var(--accent-dim)', border: '1px solid rgba(129,140,248,0.2)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.8)' }} />
                <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>Disponible pour de nouveaux projets</span>
              </div>

              {/* Title */}
              <h1 className="animate-fade-up animate-fade-up-2" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '1.5rem' }}>
                Votre réalisateur de
                <br />
                <span className="gradient-text">solutions WEB</span>
              </h1>

              {/* Tagline */}
              <p className="animate-fade-up animate-fade-up-3" style={{ fontSize: '1.125rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '2.5rem' }}>
                Je suis <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Flavien Desse</strong>, développeur fullstack.
                Je conçois des solutions sur mesure en partant de zéro, adaptées précisément à vos besoins.
              </p>

              {/* CTAs */}
              <div className="animate-fade-up animate-fade-up-4 flex flex-wrap gap-3">
                <a href="#projects" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold">
                  Voir mes réalisations <ArrowRight size={16} />
                </a>
                <a href="#contact" className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold">
                  Me contacter
                </a>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-12">
                {TECH_TAGS.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MARQUEE ───────────────────────────────────────────────────── */}
        <div className="overflow-hidden py-4 divider" style={{ borderBottom: '1px solid var(--border)', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
          <div className="marquee-track">
            {[MARQUEE_TEXT, MARQUEE_TEXT].map((text, i) => (
              <span key={i} className="font-mono text-xs px-0" style={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* ── ABOUT ─────────────────────────────────────────────────────── */}
        <section id="about" className="py-28 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Left */}
              <div>
                <div className="section-label mb-5">À propos</div>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--text)', marginBottom: '1.5rem' }}>
                  Du code avec intention,<br />des projets qui durent
                </h2>
                <div style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1rem' }} className="space-y-4">
                  <p>
                    Je suis passionné par l'art de transformer des idées en projets uniques.
                    Chaque projet est l'occasion d'explorer de nouvelles voies et de créer
                    des expériences qui vous ressemblent.
                  </p>
                  <p>
                    Avec une écoute attentive et une volonté d'innover, je vous accompagne
                    dans la construction d'un univers sur mesure à votre image —
                    de la conception initiale à la mise en production.
                  </p>
                </div>

                <a href="#contact" className="inline-flex items-center gap-2 mt-8 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  Travaillons ensemble <ChevronRight size={16} />
                </a>
              </div>

              {/* Right — Stats + Code block */}
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { val: '10+', label: 'Projets livrés' },
                    { val: '5+', label: 'Années d\'XP' },
                    { val: '100%', label: 'Sur mesure' },
                  ].map(({ val, label }) => (
                    <div key={label} className="card rounded-2xl p-5 text-center">
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{val}</div>
                      <div className="font-mono mt-1" style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* Code block */}
                <div className="card rounded-2xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                    {['#ff5f57','#ffbd2e','#28c840'].map((c) => (
                      <div key={c} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.8 }} />
                    ))}
                    <span className="font-mono text-xs ml-2" style={{ color: 'var(--muted)' }}>flavien.ts</span>
                  </div>
                  <div className="p-6 font-mono text-xs leading-7" style={{ color: 'var(--muted)' }}>
                    {[
                      [null, '{', 'brace'],
                      ['name', '"Flavien Desse"', 'string'],
                      ['role', '"Développeur Fullstack"', 'string'],
                      ['location', '"France"', 'string'],
                      ['coffee', 'Infinity', 'num'],
                      ['available', 'true', 'bool'],
                      [null, '}', 'brace'],
                    ].map(([key, val, type], i) => (
                      <div key={i} className={cn(key ? 'pl-5' : '')}>
                        {key && <span style={{ color: '#60a5fa' }}>{key}</span>}
                        {key && <span style={{ color: 'var(--muted)' }}>: </span>}
                        <span style={{
                          color: type === 'string' ? '#a78bfa'
                            : type === 'num' || type === 'bool' ? '#34d399'
                            : 'var(--muted)',
                        }}>
                          {val}
                        </span>
                        {key && i < 5 && <span style={{ color: 'var(--muted)' }}>,</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ──────────────────────────────────────────────────── */}
        <section id="projects" className="py-28 px-6 md:px-10" style={{ background: 'var(--surface)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-14">
              <div>
                <div className="section-label mb-5">Réalisations</div>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  Projets récents
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {PROJECTS.map((p) => (
                <div key={p.title} className="card rounded-2xl p-6 flex flex-col gap-5">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}18`, color: p.color }}>
                      {p.icon}
                    </div>
                    <span className="tag">{p.tag}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.6rem' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{p.desc}</p>
                  </div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>

                  {/* Link */}
                  <button className="flex items-center gap-1.5 text-xs font-semibold transition-colors" style={{ color: 'var(--muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)' }}
                  >
                    <ExternalLink size={13} /> Voir le projet
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ──────────────────────────────────────────────────── */}
        <section id="services" className="py-28 px-6 md:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="section-label mb-5">Services</div>
            <div className="flex items-end justify-between mb-14">
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                Ce que je propose
              </h2>
              <p className="hidden md:block max-w-xs text-sm" style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                Des solutions adaptées à chaque besoin, de la vitrine au système complet.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map(({ icon, title, desc }) => (
                <div key={title} className="card rounded-2xl p-6 group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                    {icon}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.6rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────────────────────── */}
        <section id="contact" className="py-28 px-6 md:px-10" style={{ background: 'var(--surface)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">

              {/* Left */}
              <div>
                <div className="section-label mb-5">Contact</div>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '1.25rem' }}>
                  Parlons de votre projet
                </h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, maxWidth: '380px', marginBottom: '2.5rem' }}>
                  Décrivez-moi votre projet et transformons vos ambitions en réalités concrètes. Réponse sous 24h.
                </p>

                <div className="space-y-3">
                  <a href="mailto:weirding.code@gmail.com" className="flex items-center gap-4 p-4 rounded-xl transition-colors group" style={{ border: '1px solid var(--border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="font-mono text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Email</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>weirding.code@gmail.com</div>
                    </div>
                    <ExternalLink size={14} className="ml-auto" style={{ color: 'var(--muted)' }} />
                  </a>

                  <a href="tel:+33649198086" className="flex items-center gap-4 p-4 rounded-xl transition-colors" style={{ border: '1px solid var(--border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="font-mono text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Téléphone</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>06 49 19 80 86</div>
                    </div>
                    <ExternalLink size={14} className="ml-auto" style={{ color: 'var(--muted)' }} />
                  </a>
                </div>
              </div>

              {/* Right — Form */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-mono text-xs block mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.06em' }}>ENTREPRISE</label>
                  <input
                    type="text"
                    placeholder="Votre entreprise ou nom"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="input-field px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs block mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.06em' }}>EMAIL</label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field px-4 py-3 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs block mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.06em' }}>MESSAGE</label>
                  <textarea
                    rows={5}
                    placeholder="Décrivez votre projet..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field px-4 py-3 rounded-xl text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold"
                >
                  Envoyer le message <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="px-6 md:px-10 py-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--accent)' }}>
              <span style={{ color: '#07090f', fontSize: '0.65rem', fontWeight: 800 }}>W</span>
            </div>
            <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Weirding Code</span>
          </div>
          <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>© 2026 Flavien Desse — Tous droits réservés</span>
          <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>Spring Boot + React</span>
        </div>
      </footer>
    </div>
  )
}

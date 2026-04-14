import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import {
  GitFork,
  Mail,
  ExternalLink,
  Terminal,
  Code2,
  ArrowRight,
  Globe,
} from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────

interface Project {
  tag: string
  title: string
  desc: string
  tech: string[]
  color: string
  icon: React.ReactNode
}

interface Stat {
  label: string
  value: string
}

// ── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    tag: 'APPLICATION WEB',
    title: 'SEMASC',
    desc: 'Création de ressources pédagogiques pour renforcer les capacités des clubs sportifs amateurs en lien avec les initiatives européennes.',
    tech: ['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
    color: '#00e5ff',
    icon: <Globe size={20} />,
  },
  {
    tag: 'E-COMMERCE',
    title: 'Emmael Céramique',
    desc: 'Site e-commerce dédié à la céramique artisanale. Design élégant, expérience d\'achat fluide, gestion de catalogue.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Spring Boot'],
    color: '#ff006e',
    icon: <Code2 size={20} />,
  },
  {
    tag: 'SIDE PROJECT',
    title: 'Weirding Code',
    desc: 'Ce site. Fait avec passion, Spring Boot, React, shadcn et beaucoup de café. Le craft dans sa forme la plus pure.',
    tech: ['React', 'shadcn', 'Java 21', 'Maven'],
    color: '#f5ff00',
    icon: <Terminal size={20} />,
  },
]

const STATS: Stat[] = [
  { label: 'Projets', value: '10+' },
  { label: 'Cafés', value: '∞' },
  { label: 'Années d\'XP', value: '5+' },
]

const TECH_TAGS = ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Java', 'Tailwind', 'WordPress']

const MARQUEE_TEXT = 'SPRING BOOT · REACT · TYPESCRIPT · POSTGRESQL · SHADCN · JAVA · DOCKER · WORDPRESS · SEO · '


// ── Helpers ───────────────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(#00e5ff 1px, transparent 1px), linear-gradient(90deg, #00e5ff 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }}
    />
  )
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="font-code text-xs mb-5 tracking-widest flex items-center gap-3" style={{ color: '#00e5ff' }}>
      <span className="w-8 h-px" style={{ background: '#00e5ff' }} />
      {index} / {children}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // suppress unused warning — cn is available via import for future use
  void cn

  return (
    <>
      {/* Ambient cursor glow */}
      <div
        className="fixed pointer-events-none z-50 rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          transition: 'left 0.08s linear, top 0.08s linear',
        }}
      />

      {/* Scanline */}
      <div className="scanline" />

      <main className="relative min-h-screen overflow-x-hidden" style={{ background: '#080808' }}>

        {/* ── NAV ─────────────────────────────────────────────────────── */}
        <nav
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5 transition-all"
          style={{
            backdropFilter: scrollY > 60 ? 'blur(16px)' : 'none',
            borderBottom: scrollY > 60 ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
            background: scrollY > 60 ? 'rgba(8,8,8,0.85)' : 'transparent',
          }}
        >
          <div className="font-code text-xs text-white/30 tracking-widest uppercase flex items-center gap-2">
            <span className="neon text-xs">▶</span> weirding-code.com
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['about', 'projects', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="font-code text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pb-16 overflow-hidden"
        >
          <GridBackground />

          {/* Ghost big letters */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 font-display leading-none select-none pointer-events-none"
            style={{ fontSize: '22vw', color: 'rgba(255,255,255,0.018)', letterSpacing: '-0.04em' }}
          >
            WC
          </div>

          {/* Floating terminal snippet */}
          <div className="absolute top-32 right-8 md:right-16 font-code text-white/[0.12] text-xs leading-6 float hidden md:block">
            <span style={{ color: 'rgba(0,229,255,0.3)' }}>{'// init\n'}</span>
            {'> booting...\n> ready: true\n> vibe: 100'}
          </div>

          {/* Accent lines */}
          <div className="absolute top-20 left-0 w-px h-32" style={{ background: 'linear-gradient(to bottom, transparent, #00e5ff40, transparent)' }} />
          <div className="absolute bottom-20 right-0 w-px h-32" style={{ background: 'linear-gradient(to bottom, transparent, #ff006e40, transparent)' }} />

          <div className="relative z-10 max-w-7xl">
            <SectionLabel index="00">INTRO</SectionLabel>

            {/* Main title */}
            <div className="font-code text-white/30 text-sm mb-2 tracking-widest">flavien desse</div>
            <h1
              className="glitch font-display leading-none"
              data-text="WEIRDING CODE"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 13rem)',
                letterSpacing: '-0.02em',
                color: 'white',
                lineHeight: 0.9,
              }}
            >
              WEIRDING CODE
            </h1>

            {/* Tagline */}
            <div className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-10">
              <p className="text-white/45 text-lg max-w-lg leading-relaxed" style={{ fontFamily: 'Syne, sans-serif' }}>
                Développeur <span style={{ color: '#ff006e', fontWeight: 700 }}>fullstack</span> —
                votre réalisateur de solutions{' '}
                <span style={{ color: '#f5ff00', fontWeight: 700 }}>WEB</span> sur mesure.
              </p>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <a
                  href="#projects"
                  className="btn-neon font-code text-sm font-bold uppercase tracking-widest px-8 py-4 flex items-center gap-2"
                  style={{ background: '#00e5ff', color: '#080808' }}
                >
                  Voir le travail <ArrowRight size={16} />
                </a>
                <a
                  href="#contact"
                  className="font-code text-xs uppercase tracking-widest px-8 py-4 border text-white/50 hover:text-white hover:border-white/40 transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Tech tags */}
            <div className="mt-16 flex flex-wrap gap-2">
              {TECH_TAGS.map((tech) => (
                <span
                  key={tech}
                  className="font-code text-xs text-white/25 border px-3 py-1 uppercase tracking-wider hover:text-[#00e5ff] transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-8 flex flex-col items-center gap-2 text-white/20">
            <span className="font-code text-xs tracking-widest">SCROLL</span>
            <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, rgba(0,229,255,0.5), transparent)' }} />
          </div>
        </section>

        {/* ── MARQUEE ───────────────────────────────────────────────────── */}
        <div
          className="overflow-hidden py-4"
          style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="marquee-track">
            {[MARQUEE_TEXT, MARQUEE_TEXT].map((text, idx) => (
              <span key={idx} className="font-code text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.18)' }}>
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* ── ABOUT ─────────────────────────────────────────────────────── */}
        <section id="about" className="relative py-32 px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

            {/* Terminal card */}
            <div className="relative float">
              <div className="border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0f0f0f' }}>
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,0,110,0.6)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(245,255,0,0.6)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,229,255,0.6)' }} />
                  <span className="font-code text-xs text-white/20 ml-2">about.json</span>
                </div>
                {/* Code */}
                <div className="p-8 font-code text-xs leading-8">
                  {[
                    { key: null,         val: '{',                    type: 'brace' },
                    { key: 'name',       val: '"Flavien Desse"',      type: 'string' },
                    { key: 'role',       val: '"Développeur Fullstack"', type: 'string' },
                    { key: 'passion',    val: '"solutions sur mesure"', type: 'string' },
                    { key: 'coffee',     val: 'Infinity',             type: 'number' },
                    { key: 'location',   val: '"France"',             type: 'string' },
                    { key: 'available',  val: 'true',                 type: 'bool' },
                    { key: null,         val: '}',                    type: 'brace' },
                  ].map((line, i) => (
                    <div key={i} className={line.key ? 'pl-6' : ''} style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {line.key && (
                        <>
                          <span style={{ color: '#f5ff00' }}>{line.key}</span>
                          <span>: </span>
                        </>
                      )}
                      <span
                        style={{
                          color:
                            line.type === 'string' ? '#ff006e' :
                            line.type === 'number' || line.type === 'bool' ? '#00e5ff' :
                            line.type === 'null' ? 'rgba(255,255,255,0.3)' :
                            'rgba(255,255,255,0.5)',
                        }}
                      >
                        {line.val}
                      </span>
                      {i === 7 && <span className="cursor-blink" style={{ color: '#00e5ff' }}>_</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -inset-6 blur-3xl -z-10 rounded-full" style={{ background: 'rgba(0,229,255,0.04)' }} />
            </div>

            {/* Text */}
            <div>
              <SectionLabel index="01">ABOUT</SectionLabel>
              <h2
                className="font-display leading-none mb-10"
                style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', letterSpacing: '-0.02em', color: 'white' }}
              >
                QUI JE<br />
                <span style={{ color: '#ff006e' }}>SUIS</span>
              </h2>
              <div className="space-y-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Syne, sans-serif' }}>
                <p>
                  Je suis <span style={{ color: 'white', fontWeight: 600 }}>Flavien Desse</span>, passionné par l'art de transformer
                  des idées en projets uniques. Je conçois des solutions sur mesure en partant de zéro,
                  m'adaptant précisément à vos besoins.
                </p>
                <p>
                  Mon approche collaborative me permet de comprendre vos ambitions en profondeur et de développer
                  des stratégies personnalisées qui transforment vos idées en{' '}
                  <span style={{ color: 'white', fontWeight: 600 }}>réalités concrètes</span>.
                </p>
                <p>
                  De la conception initiale à la réalisation finale, je prends en charge chaque détail
                  pour garantir des solutions <span style={{ color: 'white', fontWeight: 600 }}>efficaces et esthétiques</span>.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6">
                {STATS.map(({ label, value }) => (
                  <div key={label} className="pl-5" style={{ borderLeft: '2px solid rgba(0,229,255,0.3)' }}>
                    <div className="font-display text-4xl" style={{ color: '#00e5ff' }}>{value}</div>
                    <div className="font-code text-xs text-white/30 uppercase tracking-widest mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ──────────────────────────────────────────────────── */}
        <section id="projects" className="py-32 px-8 md:px-16 lg:px-24" style={{ background: '#0a0a0a' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <SectionLabel index="02">PROJECTS</SectionLabel>
                <h2
                  className="font-display leading-none"
                  style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.02em', color: 'white' }}
                >
                  CE QUE<br />
                  J'AI <span style={{ color: '#f5ff00' }}>CONSTRUIT</span>
                </h2>
              </div>
              <div className="font-code text-xs text-white/15 hidden md:block">[hover to explore]</div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project) => (
                <div
                  key={project.title}
                  className="card-wc flex flex-col gap-6 p-8 border"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0f0f0f' }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 flex items-center justify-center border"
                      style={{ borderColor: project.color + '50', color: project.color }}
                    >
                      {project.icon}
                    </div>
                    <span className="font-code text-xs tracking-widest" style={{ color: project.color + '70' }}>
                      {project.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-4xl mb-3" style={{ letterSpacing: '-0.01em', color: 'white' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Syne, sans-serif' }}>
                      {project.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-code text-xs px-2 py-0.5 uppercase border"
                        style={{ color: 'rgba(255,255,255,0.25)', borderColor: 'rgba(255,255,255,0.08)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 w-fit" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    <ExternalLink size={13} />
                    <span
                      className="font-code text-xs uppercase tracking-wider"
                      style={{ transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#00e5ff' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.2)' }}
                    >
                      Voir le projet
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────────────────────── */}
        <section id="contact" className="relative py-32 px-8 md:px-16 lg:px-24 overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center font-display select-none pointer-events-none leading-none"
            style={{ fontSize: '35vw', color: 'rgba(255,255,255,0.012)', letterSpacing: '-0.04em' }}
          >
            HI
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionLabel index="03">CONTACT</SectionLabel>

            <h2
              className="font-display leading-none mb-20"
              style={{ fontSize: 'clamp(3rem, 9vw, 10rem)', letterSpacing: '-0.02em', color: 'white' }}
            >
              ON BOSSE<br />
              ENSEMBLE<span style={{ color: '#00e5ff' }}>.</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Coordonnées */}
              <div className="space-y-6">
                <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Syne, sans-serif' }}>
                  Un projet, une idée ?{' '}
                  <span style={{ color: 'white' }}>Je suis disponible.</span>{' '}
                  Écrivez-moi et transformons vos ambitions en succès.
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:weirding.code@gmail.com"
                    className="link-row flex items-center justify-between p-5 border transition-all"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="flex items-center gap-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      <Mail size={18} style={{ color: '#00e5ff' }} />
                      <span className="font-code text-sm">weirding.code@gmail.com</span>
                    </div>
                    <ExternalLink size={14} style={{ color: 'rgba(255,255,255,0.15)' }} />
                  </a>
                  <a
                    href="tel:+33649198086"
                    className="link-row flex items-center justify-between p-5 border transition-all"
                    style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="flex items-center gap-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      <GitFork size={18} style={{ color: '#ff006e' }} />
                      <span className="font-code text-sm">06 49 19 80 86</span>
                    </div>
                    <ExternalLink size={14} style={{ color: 'rgba(255,255,255,0.15)' }} />
                  </a>
                </div>
              </div>

              {/* Formulaire de contact */}
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: 'Entreprise', type: 'text', placeholder: 'Votre entreprise' },
                  { label: 'Email', type: 'email', placeholder: 'votre@email.com' },
                ].map(({ label, type, placeholder }) => (
                  <div key={label}>
                    <label className="font-code text-xs text-white/30 uppercase tracking-widest block mb-2">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 font-code text-sm text-white placeholder-white/20 border outline-none focus:border-[#00e5ff] transition-colors"
                      style={{ background: '#0f0f0f', borderColor: 'rgba(255,255,255,0.08)' }}
                    />
                  </div>
                ))}
                <div>
                  <label className="font-code text-xs text-white/30 uppercase tracking-widest block mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre projet..."
                    className="w-full px-4 py-3 font-code text-sm text-white placeholder-white/20 border outline-none focus:border-[#00e5ff] transition-colors resize-none"
                    style={{ background: '#0f0f0f', borderColor: 'rgba(255,255,255,0.08)' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-neon font-code text-sm font-bold uppercase tracking-widest px-8 py-4 flex items-center justify-center gap-2"
                  style={{ background: '#00e5ff', color: '#080808' }}
                >
                  Envoyer <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────────── */}
        <footer
          className="flex items-center justify-between px-8 md:px-16 lg:px-24 py-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <span className="font-code text-xs text-white/20">© 2026 weirding-code.com</span>
          <span className="font-code text-xs text-white/20">
            Built with <span style={{ color: '#ff006e' }}>♥</span> + Spring Boot + React
          </span>
        </footer>
      </main>
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Mail, Phone, ExternalLink, Globe, ShoppingBag, Code2, Zap, Shield, HeadphonesIcon } from 'lucide-react'
import HeroSpectacular from './components/HeroSpectacular'

const PROJECTS = [
  {
    tag: 'Application Web',
    title: 'SEMASC',
    year: '2024',
    desc: "Création de ressources pédagogiques pour renforcer les capacités des clubs sportifs amateurs en lien avec les initiatives européennes.",
    tech: ['React', 'Spring Boot', 'PostgreSQL'],
    icon: <Globe size={18} />,
    url: 'https://semasc.fmh.ulisboa.pt/',
  },
  {
    tag: 'E-commerce',
    title: 'Emmael Céramique',
    year: '2025',
    desc: "Site e-commerce dédié à la céramique artisanale. Design élégant, expérience d'achat fluide, gestion de catalogue complète.",
    tech: ['WordPress', 'Divi', 'WooCommerce', 'SEO'],
    icon: <ShoppingBag size={18} />,
    url: 'https://emmaelceramique.com/',
  },
  {
    tag: 'Site Vitrine',
    title: 'Weirding Code',
    year: '2026',
    desc: "Portfolio et site vitrine personnel. Stack moderne, déploiement automatisé, HTTPS. Conçu et déployé from scratch.",
    tech: ['React', 'Spring Boot', 'Java 21', 'SEO'],
    icon: <Code2 size={18} />,
    url: 'https://weirding-code.fr',
  },
  {
    tag: 'Site Vitrine',
    title: 'Enzo Pizza',
    year: '2026',
    desc: "Site vitrine pour une pizzeria artisanale. Présentation du menu, localisation et prise de contact. Design chaleureux et appétissant.",
    tech: ['React', 'Spring Boot', 'Java 21', 'Backoffice', 'SEO'],
    icon: <Globe size={18} />,
    url: 'https://www.enzo-pizza.com/',
  },
  {
    tag: 'Portfolio',
    title: 'Quentin Stoupy',
    year: '2026',
    desc: "Portfolio personnel pour un professionnel. Design sobre et élégant, mise en valeur des compétences et réalisations.",
    tech: ['React', 'Spring Boot', 'Java 21', 'SEO'],
    icon: <Code2 size={18} />,
    url: 'https://quentin-stoupy.fr',
  },
  {
    tag: 'Site Vitrine',
    title: 'Les P\'tits Pieds dans les Prés',
    year: '2018',
    desc: "Site vitrine pour une structure d'accueil en pleine nature. Présentation des activités, hébergements et contact.",
    tech: ['WordPress', 'SEO'],
    icon: <Globe size={18} />,
    url: 'https://www.les-ptits-pieds-dans-les-pres.fr/',
  },
  {
    tag: 'Application Web',
    title: 'Municora',
    year: '2026',
    desc: "Application web dédiée à la gestion municipale. Interface moderne, gestion des données et suivi des opérations en temps réel.",
    tech: ['React', 'Spring Boot', 'Java 21', 'PostgreSQL'],
    icon: <Code2 size={18} />,
    url: 'https://dev.municora.com',
  },
]

const SERVICES = [
  {
    icon: <Globe size={22} />,
    title: 'Site Web Vitrine',
    desc: "Une présence en ligne élégante, rapide et optimisée. Conçu pour convertir vos visiteurs.",
    features: ['Design responsive sur-mesure', 'Référencement SEO intégré', 'Mise en ligne & hébergement'],
  },
  {
    icon: <ShoppingBag size={22} />,
    title: 'E-commerce',
    desc: "Boutique en ligne complète avec gestion de catalogue, paiement sécurisé et backoffice intuitif.",
    features: ['WooCommerce ou sur-mesure', 'Tunnel d\'achat optimisé', 'Gestion stocks & commandes'],
  },
  {
    icon: <Code2 size={22} />,
    title: 'Application Web',
    desc: "De l'idée au produit fini — architecture solide, API REST, base de données et interface moderne.",
    features: ['React + Spring Boot + PostgreSQL', 'Authentification & sécurité', 'Déploiement HTTPS automatisé'],
  },
  {
    icon: <Zap size={22} />,
    title: 'Optimisation & Refonte',
    desc: "Votre site existant ralentit ou vieillit ? Je l'audite, le modernise et le rends plus performant.",
    features: ['Audit performance & SEO', 'Refonte visuelle & technique', 'Migration sans perte de données'],
  },
  {
    icon: <Shield size={22} />,
    title: 'Sécurité & Conformité',
    desc: "Mises à jour, sauvegardes, RGPD et bonnes pratiques pour un site fiable sur le long terme.",
    features: ['Conformité RGPD', 'Sauvegardes automatiques', 'Certificats SSL & HTTPS'],
  },
  {
    icon: <HeadphonesIcon size={22} />,
    title: 'Accompagnement Technique',
    desc: "Conseil, formation et suivi. Je reste disponible bien après la livraison de votre projet.",
    features: ['Support & maintenance', 'Formation à l\'outil', 'Évolutions & nouvelles features'],
  },
]



type Project = typeof PROJECTS[number]

function ProjectCard({ p, large }: { p: Project; num: number; large: boolean }) {
  return (
    <a
      href={p.url ?? undefined}
      target={p.url ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={{
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'space-between',
        gap:            24,
        padding:        large ? '36px 36px 32px' : '28px 28px 24px',
        background:     'var(--bg)',
        border:         '1px solid var(--border)',
        borderRadius:   'var(--radius-lg)',
        cursor:         p.url ? 'pointer' : 'default',
        textDecoration: 'none',
        color:          'inherit',
        transition:     'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
        minHeight:      large ? 280 : 220,
        position:       'relative',
        overflow:       'hidden',
      }}
      onMouseEnter={e => {
        if (!p.url) return
        const el = e.currentTarget
        el.style.borderColor = 'var(--border-h)'
        el.style.boxShadow   = '0 12px 40px rgba(0,0,0,0.08)'
        el.style.transform   = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border)'
        el.style.boxShadow   = 'none'
        el.style.transform   = 'translateY(0)'
      }}
    >
      {/* Preview screenshot en fond bas-droite */}
      {p.url && (
        <img
          src={`https://s0.wordpress.com/mshots/v1/${encodeURIComponent(p.url)}?w=800`}
          alt=""
          aria-hidden
          style={{
            position:   'absolute',
            bottom:     0,
            right:      0,
            width:      '65%',
            height:     '75%',
            objectFit:  'cover',
            objectPosition: 'top left',
            opacity:    0.20,
            pointerEvents: 'none',
            maskImage:  'linear-gradient(to top left, black 10%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to top left, black 10%, transparent 60%)',
          }}
        />
      )}

      {/* Top */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="tag">{p.tag}</span>
        {'year' in p && p.year && (
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>{p.year as string}</span>
        )}
        {p.url && <ExternalLink size={12} style={{ color: 'var(--muted)', marginLeft: 'auto' }} />}
      </div>

      {/* Contenu */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: large ? '1.35rem' : '1.05rem', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{p.title}</div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.7 }}>{p.desc}</p>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        {!p.url && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--surface-3)' }}>Bientôt</span>}
      </div>
    </a>
  )
}

function ServiceBlock({ icon, title, desc, features, num }: { icon: React.ReactNode; title: string; desc: string; features: string[]; num: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '40px 36px',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        border: '1px solid',
        borderColor: hovered ? 'rgba(232,83,107,0.35)' : 'rgba(255,255,255,0.07)',
        transition: 'background 0.25s, border-color 0.25s',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow coin hover */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 200, height: 200,
        background: 'radial-gradient(circle at top right, rgba(232,83,107,0.12) 0%, transparent 65%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
      }} />

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 'var(--radius-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? 'rgba(232,83,107,0.15)' : 'rgba(255,255,255,0.07)',
          color: hovered ? '#e8536b' : 'rgba(255,255,255,0.55)',
          transition: 'background 0.25s, color 0.25s',
        }}>{icon}</div>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem',
          color: hovered ? 'rgba(232,83,107,0.7)' : 'rgba(255,255,255,0.18)',
          letterSpacing: '0.1em', transition: 'color 0.25s',
        }}>{String(num).padStart(2, '0')}</span>
      </div>

      {/* Texte */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f5f0eb', letterSpacing: '-0.02em', lineHeight: 1.25 }}>{title}</div>
        <p style={{ fontSize: '0.875rem', color: 'rgba(245,240,235,0.45)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
        {features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: hovered ? '#e8536b' : 'rgba(255,255,255,0.25)', flexShrink: 0, transition: 'background 0.25s' }} />
            <span style={{ fontSize: '0.82rem', color: 'rgba(245,240,235,0.55)' }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Hooks animations ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

function useCountUp(target: number, duration = 1400) {
  const [count, setCount]     = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!started) return
    let cur = 0
    const step = target / (duration / 16)
    const id = setInterval(() => {
      cur += step
      if (cur >= target) { setCount(target); clearInterval(id) }
      else setCount(Math.floor(cur))
    }, 16)
    return () => clearInterval(id)
  }, [started, target, duration])
  return { count, ref }
}

/* ── Legal Modal ── */
const LEGAL: Record<string, { title: string; content: React.ReactNode }> = {
  mentions: {
    title: 'Mentions légales',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {[
          {
            h: 'Éditeur du site',
            body: <>
              <b>Flavien Desse</b> — Auto-entrepreneur<br />
              Activité : Développement web & conseil informatique<br />
              Adresse : 5 rue Yvon Lamand, 59112 Annœullin<br />
              Email : <a href="mailto:weirding.code@gmail.com" style={{ color: 'var(--accent)' }}>weirding.code@gmail.com</a><br />
              Téléphone : 06 49 19 80 86<br />
              SIRET : 88793426300021
            </>
          },
          {
            h: 'Hébergement',
            body: <>Le site est hébergé par un prestataire technique sécurisé. Les coordonnées complètes sont disponibles sur demande.</>
          },
          {
            h: 'Propriété intellectuelle',
            body: <>L'ensemble des contenus présents sur ce site (textes, images, code, logo) sont la propriété exclusive de Flavien Desse et protégés par le droit d'auteur. Toute reproduction sans autorisation est interdite.</>
          },
          {
            h: 'Limitation de responsabilité',
            body: <>Flavien Desse s'efforce de maintenir les informations de ce site à jour et exactes. Il ne saurait être tenu responsable des éventuelles erreurs ou omissions.</>
          },
        ].map(({ h, body }) => (
          <div key={h}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 8 }}>{h}</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.8 }}>{body}</p>
          </div>
        ))}
      </div>
    )
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {[
          {
            h: 'Données collectées',
            body: <>Ce site ne collecte aucune donnée personnelle de manière automatique. Les seules données transmises sont celles que vous communiquez volontairement via les liens de contact (email, téléphone).</>
          },
          {
            h: 'Finalité du traitement',
            body: <>Les données transmises (nom, email, message) sont utilisées uniquement pour répondre à vos demandes de contact. Elles ne sont jamais revendues ni partagées avec des tiers.</>
          },
          {
            h: 'Cookies',
            body: <>Ce site n'utilise aucun cookie de tracking, de publicité ou d'analyse comportementale. Aucun consentement cookie n'est requis.</>
          },
          {
            h: 'Vos droits (RGPD)',
            body: <>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits : <a href="mailto:weirding.code@gmail.com" style={{ color: 'var(--accent)' }}>weirding.code@gmail.com</a></>
          },
          {
            h: 'Conservation des données',
            body: <>Les données de contact sont conservées le temps nécessaire au traitement de votre demande, et au maximum 3 ans conformément aux obligations légales.</>
          },
        ].map(({ h, body }) => (
          <div key={h}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 8 }}>{h}</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.8 }}>{body}</p>
          </div>
        ))}
      </div>
    )
  }
}

function LegalModal({ id, onClose }: { id: string; onClose: () => void }) {
  const page = LEGAL[id]
  if (!page) return null

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(8,4,10,0.75)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px var(--px)',
        animation: 'fade-up 0.25s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: 640, width: '100%',
          maxHeight: '80vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>{page.title}</div>
          <button
            onClick={onClose}
            style={{ background: 'var(--surface-2)', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '1.1rem', lineHeight: 1 }}
          >×</button>
        </div>
        {/* Body */}
        <div style={{ padding: '28px 32px', overflowY: 'auto' }}>
          {page.content}
        </div>
      </div>
    </div>
  )
}

function scrollTo(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  const start  = window.scrollY
  const target = (el as HTMLElement).getBoundingClientRect().top + start - 64
  const dist   = target - start
  const dur    = 900
  let t0: number | null = null
  const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2
  const step = (ts: number) => {
    if (!t0) t0 = ts
    const p = Math.min((ts - t0) / dur, 1)
    window.scrollTo(0, start + dist * ease(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function SectionLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="label">
      <span className="label-bullet" />
      <span className="label-num">{num} /</span>
      {text}
    </div>
  )
}


function StatItem({ value, suffix, label, border }: { value: number; suffix: string; label: string; border: boolean }) {
  const { count, ref } = useCountUp(value)
  return (
    <div ref={ref} style={{ padding: '40px 32px', borderRight: border ? '1px solid var(--border)' : 'none' }}>
      <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 10 }}>{label}</div>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [legal, setLegal] = useState<string | null>(null)

  /* Reveal refs */
  const aboutHeader  = useReveal()
  const aboutStats   = useReveal()
  const aboutText    = useReveal()
  const aboutCode    = useReveal()
  const projHeader   = useReveal()
  const projRow1     = useReveal()
  const projRow2     = useReveal()
  const projRow3     = useReveal()
  const svcHeader    = useReveal()
  const svcGrid      = useReveal()
  const ctaLeft      = useReveal()
  const ctaRight     = useReveal()

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
          <img src="/WC.png" alt="Weirding Code" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span>Weirding Code</span>
        </a>
        <ul className="nav-links hide-mobile">
          {[['À propos','#about'],['Réalisations','#projects'],['Services','#services'],['Contact','#contact']].map(([l,h])=>(
            <li key={l}>
              <a href={h} onClick={e => { e.preventDefault(); scrollTo(h) }}>{l}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-primary hide-mobile" style={{ padding: '8px 18px', fontSize: '0.8rem' }}
          onClick={e => { e.preventDefault(); scrollTo('#contact') }}>
          Me contacter
        </a>
      </nav>

      {/* ── HERO ── */}
      <HeroSpectacular />


      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: 'var(--section-py) var(--px)', position: 'relative', overflow: 'hidden' }}>

        {/* En-tête */}
        <div ref={aboutHeader} className="reveal-item" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 64, flexWrap: 'wrap' }}>
          <div>
            <SectionLabel num="01" text="À PROPOS" />
            <h2 className="h2">Du code avec intention,<br />des projets qui durent</h2>
          </div>
          <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('#contact') }} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-2)', whiteSpace: 'nowrap', paddingBottom: 4 }}>
            Travaillons ensemble <ArrowRight size={15} />
          </a>
        </div>

        {/* Stats */}
        <div ref={aboutStats} className="reveal-item about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 80 }}>
          <StatItem value={10} suffix="+" label="Projets livrés" border />
          <StatItem value={5}  suffix="+" label="Années d'XP"    border />
          <StatItem value={100} suffix="%" label="Sur mesure"    border={false} />
        </div>

        {/* Corps */}
        <div className="about-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div ref={aboutText} className="reveal-item" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.9, fontSize: '1rem' }}>Je suis passionné par l'art de transformer des idées en projets uniques. Chaque projet est l'occasion d'explorer de nouvelles voies et de créer des expériences qui vous ressemblent.</p>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.9, fontSize: '1rem' }}>Avec une écoute attentive et une volonté d'innover, je vous accompagne de la conception initiale à la mise en production — en garantissant un code maintenable, performant et sécurisé.</p>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.9, fontSize: '1rem' }}>Je travaille aussi bien en autonomie qu'en collaboration avec des équipes existantes, sur des projets from scratch ou des bases de code legacy à moderniser.</p>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Écoute & analyse approfondie de vos besoins','Conception UX/UI et architecture technique','Développement itératif, livraisons régulières','Mise en prod, tests, suivi post-lancement'].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={aboutCode} className="reveal-item code-block">
            <div className="code-bar">
              {['#ff5f57','#ffbd2e','#28c840'].map(c=><div key={c} className="code-dot" style={{ background: c }} />)}
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--muted)', marginLeft: 8 }}>flavien.ts</span>
            </div>
            <div className="code-body">
              {([
                [null,        '{',                           'muted'],
                ['name',      '"Flavien Desse"',             'str'  ],
                ['role',      '"Développeur Fullstack"',     'str'  ],
                ['location',  '"France"',                    'str'  ],
                ['stack',     '["React","Spring Boot","TS"]','str'  ],
                ['coffee',    'Infinity',                    'num'  ],
                ['available', 'true',                        'num'  ],
                [null,        '}',                           'muted'],
              ] as [string|null,string,string][]).map(([key, val, type], i) => (
                <div key={i} style={{ paddingLeft: key ? 20 : 0 }}>
                  {key && <><span className="code-key">{key}</span><span className="code-muted">: </span></>}
                  <span className={type === 'str' ? 'code-str' : type === 'num' ? 'code-num' : 'code-muted'}>{val}</span>
                  {key && i < 6 && <span className="code-muted">,</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding: 'var(--section-py) var(--px)', background: 'var(--surface)' }}>

        {/* Header */}
        <div ref={projHeader} className="reveal-item" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 64, flexWrap: 'wrap' }}>
          <div>
            <SectionLabel num="02" text="RÉALISATIONS" />
            <h2 className="h2">Projets récents</h2>
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--muted)', paddingBottom: 6 }}>
            {PROJECTS.length} projets
          </span>
        </div>

        {/* Ligne 1 — 2 cards */}
        <div ref={projRow1} className="reveal-item projects-row-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {PROJECTS.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.title} p={p} num={i + 1} large />
          ))}
        </div>

        {/* Ligne 2 — 3 cards */}
        <div ref={projRow2} className="reveal-item projects-row-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16, transitionDelay: '0.1s' }}>
          {PROJECTS.slice(2, 5).map((p, i) => (
            <ProjectCard key={p.title} p={p} num={i + 3} large={false} />
          ))}
        </div>

        {/* Ligne 3 — 2 cards */}
        <div ref={projRow3} className="reveal-item projects-row-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, transitionDelay: '0.2s' }}>
          {PROJECTS.slice(5).map((p, i) => (
            <ProjectCard key={p.title} p={p} num={i + 6} large={false} />
          ))}
        </div>

      </section>

      {/* ── INTERLUDE 02 → 03 ── */}
      <div style={{ background: '#08040a', overflow: 'hidden', padding: '72px 0', position: 'relative' }}>
        <div className="hero-grain" style={{ opacity: 0.04 }} />

        {/* Ligne 1 — gauche */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 20, maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
          <div style={{ display: 'flex', gap: 0, animation: 'marquee 18s linear infinite', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {['DÉVELOPPEMENT WEB', 'SPRING BOOT', 'REACT', 'SUR-MESURE', 'FULLSTACK', 'JAVA 21', 'TYPESCRIPT', 'POSTGRESQL'].map(t => (
              <span key={t} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', padding: '0 32px' }}>
                {t} <span style={{ color: '#e8536b', opacity: 0.7 }}>·</span>
              </span>
            ))}
            {['DÉVELOPPEMENT WEB', 'SPRING BOOT', 'REACT', 'SUR-MESURE', 'FULLSTACK', 'JAVA 21', 'TYPESCRIPT', 'POSTGRESQL'].map(t => (
              <span key={t + '2'} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', padding: '0 32px' }}>
                {t} <span style={{ color: '#e8536b', opacity: 0.7 }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Phrase centrale */}
        <div className="interlude-center" style={{ textAlign: 'center', padding: '40px var(--px)', position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#f5f0eb', letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0 }}>
            Du code pensé pour{' '}
            <span style={{ color: '#e8536b', position: 'relative' }}>durer.</span>
          </p>
          <p style={{ fontSize: '0.95rem', color: 'rgba(245,240,235,0.4)', marginTop: 16, fontWeight: 400 }}>
            Chaque ligne écrite avec intention, chaque projet livré avec soin.
          </p>
        </div>

        {/* Ligne 2 — droite (sens inverse) */}
        <div style={{ display: 'flex', gap: 0, marginTop: 20, maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
          <div style={{ display: 'flex', gap: 0, animation: 'marquee 22s linear infinite reverse', whiteSpace: 'nowrap', flexShrink: 0 }}>
            {['SÉCURITÉ', 'PERFORMANCE', 'WORDPRESS', 'SEO', 'DOCKER', 'REST API', 'UX/UI', 'MAINTENANCE'].map(t => (
              <span key={t} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)', padding: '0 32px' }}>
                {t} <span style={{ color: '#e8536b', opacity: 0.5 }}>·</span>
              </span>
            ))}
            {['SÉCURITÉ', 'PERFORMANCE', 'WORDPRESS', 'SEO', 'DOCKER', 'REST API', 'UX/UI', 'MAINTENANCE'].map(t => (
              <span key={t + '2'} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)', padding: '0 32px' }}>
                {t} <span style={{ color: '#e8536b', opacity: 0.5 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '0 var(--px) var(--section-py)', position: 'relative', overflow: 'hidden', background: '#08040a' }}>

        {/* Grain */}
        <div className="hero-grain" style={{ opacity: 0.04 }} />

        {/* Blob déco */}
        <div className="blob" style={{ width: 600, height: 600, top: -200, right: -100, background: 'radial-gradient(circle, rgba(76,6,29,0.18) 0%, transparent 70%)' }} />

<div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Label */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e8536b', boxShadow: '0 0 8px rgba(232,83,107,0.8)', flexShrink: 0, display: 'block' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#e8536b' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', marginRight: 6 }}>03 /</span>SERVICES
            </span>
          </div>

          {/* Header full-width */}
          <div ref={svcHeader} className="reveal-item services-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, marginBottom: 72, flexWrap: 'wrap' }}>
            <h2 className="h2" style={{ color: '#f5f0eb' }}>Ce que je propose</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <p style={{ fontSize: '0.95rem', color: 'rgba(245,240,235,0.45)', lineHeight: 1.7, maxWidth: 340 }}>
                De la vitrine aux systèmes complexes — des solutions pensées pour durer et performer.
              </p>
              <a href="#contact" className="btn btn-primary btn-shimmer" style={{ flexShrink: 0 }}>
                Démarrer un projet <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Grille de blocs */}
          <div ref={svcGrid} className="reveal-item services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {SERVICES.map(({ icon, title, desc, features }, i) => (
              <ServiceBlock key={title} icon={icon} title={title} desc={desc} features={features} num={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: '#08040a', padding: 'var(--section-py) var(--px)', position: 'relative', overflow: 'hidden' }}>

        {/* Grain */}
        <div className="hero-grain" style={{ opacity: 0.04 }} />

        {/* Blobs */}
        <div className="blob" style={{ width: 700, height: 700, bottom: -300, left: -200, background: 'radial-gradient(circle, rgba(76,6,29,0.22) 0%, transparent 65%)' }} />
        <div className="blob" style={{ width: 400, height: 400, top: -100, right: -50, background: 'radial-gradient(circle, rgba(232,83,107,0.08) 0%, transparent 65%)', animationDelay: '3s' }} />

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Label */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 72 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e8536b', boxShadow: '0 0 8px rgba(232,83,107,0.8)', flexShrink: 0, display: 'block' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#e8536b' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', marginRight: 6 }}>04 /</span>CONTACT
            </span>
          </div>

          {/* Grid principal */}
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* Gauche — statement */}
            <div ref={ctaLeft} className="reveal-item" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', fontWeight: 800, color: '#f5f0eb', letterSpacing: '-0.04em', lineHeight: 1.1, margin: 0 }}>
                Votre projet<br />
                mérite le<br />
                <span style={{ color: '#e8536b' }}>meilleur.</span>
              </h2>

              <p style={{ fontSize: '1rem', color: 'rgba(245,240,235,0.45)', lineHeight: 1.8, maxWidth: 420, margin: 0 }}>
                Décrivez-moi votre idée — je vous réponds sous 24h avec une première analyse et une proposition adaptée.
              </p>

              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  { dot: true, text: 'Disponible pour nouveaux projets' },
                  { dot: false, text: 'Réponse sous 24h' },
                  { dot: false, text: 'Devis gratuit' },
                ].map(({ dot, text }) => (
                  <div key={text} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                    {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8536b', boxShadow: '0 0 6px rgba(232,83,107,0.9)', flexShrink: 0 }} />}
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Droite — contacts */}
            <div ref={ctaRight} className="reveal-item" style={{ display: 'flex', flexDirection: 'column', gap: 12, transitionDelay: '0.15s' }}>

              {/* Email */}
              <a href="mailto:weirding.code@gmail.com" style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '28px 32px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none', color: 'inherit',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,83,107,0.07)'; e.currentTarget.style.borderColor = 'rgba(232,83,107,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(232,83,107,0.12)', color: '#e8536b', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 5 }}>EMAIL</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#f5f0eb' }}>weirding.code@gmail.com</div>
                </div>
                <ArrowRight size={16} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
              </a>

              {/* Téléphone */}
              <a href="tel:+33649198086" style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '28px 32px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none', color: 'inherit',
                transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,83,107,0.07)'; e.currentTarget.style.borderColor = 'rgba(232,83,107,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 5 }}>TÉLÉPHONE</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#f5f0eb' }}>06 49 19 80 86</div>
                </div>
                <ArrowRight size={16} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
              </a>

              {/* CTA */}
              <a href="mailto:weirding.code@gmail.com" className="btn btn-primary btn-shimmer btn-full" style={{ marginTop: 8, padding: '16px', fontSize: '0.95rem' }}>
                Envoyer un message <ArrowRight size={16} />
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <footer className="footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/WC.png" alt="Weirding Code" style={{ width: 28, height: 28, objectFit: 'contain' }} />
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Weirding Code</span>
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--muted)' }}>© 2026 Flavien Desse</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Mentions légales','mentions'],['Confidentialité','confidentialite']].map(([label, id]) => (
              <button key={id} onClick={() => setLegal(id)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem',
                color: 'var(--muted)', transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >{label}</button>
            ))}
          </div>
        </footer>
      </div>

      {/* ── MODALS LÉGAUX ── */}
      {legal && <LegalModal id={legal} onClose={() => setLegal(null)} />}

    </div>
  )
}

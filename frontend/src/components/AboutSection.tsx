import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

/* ── Count-up au scroll ── */
function useCountUp(target: number, duration = 1600) {
  const [count, setCount]     = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.6 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let current = 0
    const step  = target / (duration / 16)
    const id    = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(id) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(id)
  }, [started, target, duration])

  return { count, ref }
}

/* ── Scroll reveal ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* ── Stat ── */
function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCountUp(value)
  return (
    <div
      ref={ref}
      className="reveal-item"
      style={{
        padding: '40px 32px',
        borderRight: delay < 2 ? '1px solid var(--border)' : 'none',
        transition: `opacity 0.6s ${delay * 0.15}s, transform 0.6s ${delay * 0.15}s`,
      }}
    >
      <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 10 }}>
        {label}
      </div>
    </div>
  )
}

/* ── Section ── */
export default function AboutSection() {
  const headerRef = useReveal()
  const statsRef  = useReveal()
  const textRef   = useReveal()
  const codeRef   = useReveal()

  const PROCESS = [
    'Écoute & analyse approfondie de vos besoins',
    'Conception UX/UI et architecture technique',
    'Développement itératif, livraisons régulières',
    'Mise en prod, tests, suivi post-lancement',
  ]

  return (
    <section id="about" style={{ padding: 'var(--section-py) var(--px)', position: 'relative', overflow: 'hidden' }}>

      {/* Filigrane décoratif */}
      <div aria-hidden style={{
        position: 'absolute', right: -20, top: 0,
        fontSize: 'clamp(160px, 20vw, 280px)', fontWeight: 900,
        color: 'rgba(0,0,0,0.035)', lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none',
        letterSpacing: '-0.05em',
      }}>01</div>

      {/* En-tête */}
      <div ref={headerRef} className="reveal-item" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 64, flexWrap: 'wrap' }}>
        <div>
          <div className="label" style={{ marginBottom: 20 }}>
            <span className="label-bullet" />
            <span className="label-num">01 /</span>
            À PROPOS
          </div>
          <h2 className="h2">Du code avec intention,<br />des projets qui durent</h2>
        </div>
        <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-2)', whiteSpace: 'nowrap', paddingBottom: 4 }}>
          Travaillons ensemble <ArrowRight size={15} />
        </a>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="reveal-item" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 80 }}>
        <Stat value={10} suffix="+" label="Projets livrés"  delay={0} />
        <Stat value={5}  suffix="+" label="Années d'XP"     delay={1} />
        <Stat value={100} suffix="%" label="Sur mesure"     delay={2} />
      </div>

      {/* Corps */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

        {/* Texte */}
        <div ref={textRef} className="reveal-item" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.9, fontSize: '1rem' }}>
            Je suis passionné par l'art de transformer des idées en projets uniques. Chaque projet est l'occasion d'explorer de nouvelles voies et de créer des expériences qui vous ressemblent.
          </p>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.9, fontSize: '1rem' }}>
            Avec une écoute attentive et une volonté d'innover, je vous accompagne de la conception initiale à la mise en production — en garantissant un code maintenable, performant et sécurisé.
          </p>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.9, fontSize: '1rem' }}>
            Je travaille aussi bien en autonomie qu'en collaboration avec des équipes existantes, sur des projets from scratch ou des bases de code legacy à moderniser.
          </p>

          {/* Process */}
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PROCESS.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CheckCircle2 size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code block */}
        <div ref={codeRef} className="reveal-item code-block">
          <div className="code-bar">
            {['#ff5f57','#ffbd2e','#28c840'].map(c => <div key={c} className="code-dot" style={{ background: c }} />)}
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
            ] as [string|null, string, string][]).map(([key, val, type], i) => (
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
  )
}

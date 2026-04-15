import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ArrowRight, ChevronDown } from 'lucide-react'

function useNetwork(mountRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = window.innerWidth
    const H = window.innerHeight

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const N       = 80
    const SPREAD  = 6
    const CONNECT = 2.2
    const ACCENT  = 12

    const pts: [number, number, number][] = Array.from({ length: N }, () => [
      (Math.random() - 0.5) * SPREAD,
      (Math.random() - 0.5) * SPREAD,
      (Math.random() - 0.5) * SPREAD,
    ])

    /* Points */
    const ptPos = new Float32Array(N * 3)
    const ptCol = new Float32Array(N * 3)
    pts.forEach(([x, y, z], i) => {
      ptPos[i*3] = x; ptPos[i*3+1] = y; ptPos[i*3+2] = z
      if (i < ACCENT) { ptCol[i*3]=0.91; ptCol[i*3+1]=0.33; ptCol[i*3+2]=0.42 }
      else            { ptCol[i*3]=1;    ptCol[i*3+1]=1;    ptCol[i*3+2]=1    }
    })
    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3))
    ptGeo.setAttribute('color',    new THREE.BufferAttribute(ptCol, 3))
    const ptMat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.35 })

    /* Connexions */
    const pairs: number[] = []
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const [ax,ay,az]=pts[i], [bx,by,bz]=pts[j]
        const dx=ax-bx, dy=ay-by, dz=az-bz
        if (dx*dx+dy*dy+dz*dz < CONNECT*CONNECT) pairs.push(i, j)
      }

    const nL = pairs.length / 2
    const lPos = new Float32Array(nL * 6)
    const lCol = new Float32Array(nL * 6)
    for (let k = 0; k < nL; k++) {
      const a=pairs[k*2], b=pairs[k*2+1]
      lPos.set([...pts[a], ...pts[b]], k*6)
      const acc = a < ACCENT || b < ACCENT
      const c: [number,number,number] = acc ? [0.91,0.33,0.42] : [1,1,1]
      lCol.set([...c,...c], k*6)
    }
    const lGeo = new THREE.BufferGeometry()
    lGeo.setAttribute('position', new THREE.BufferAttribute(lPos, 3))
    lGeo.setAttribute('color',    new THREE.BufferAttribute(lCol, 3))
    const lMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.07 })

    const network = new THREE.Group()
    network.add(new THREE.Points(ptGeo, ptMat))
    network.add(new THREE.LineSegments(lGeo, lMat))
    network.position.set(3.5, 2.5, 0)
    scene.add(network)

    /* Deuxième réseau — plus petit, bas gauche */
    const N2 = 35, SPREAD2 = 2.8, CONNECT2 = 1.6, ACCENT2 = 5
    const pts2: [number,number,number][] = Array.from({ length: N2 }, () => [
      (Math.random() - 0.5) * SPREAD2,
      (Math.random() - 0.5) * SPREAD2,
      (Math.random() - 0.5) * SPREAD2,
    ])
    const ptPos2 = new Float32Array(N2 * 3)
    const ptCol2 = new Float32Array(N2 * 3)
    pts2.forEach(([x,y,z], i) => {
      ptPos2[i*3]=x; ptPos2[i*3+1]=y; ptPos2[i*3+2]=z
      if (i < ACCENT2) { ptCol2[i*3]=0.91; ptCol2[i*3+1]=0.33; ptCol2[i*3+2]=0.42 }
      else             { ptCol2[i*3]=1;    ptCol2[i*3+1]=1;    ptCol2[i*3+2]=1    }
    })
    const ptGeo2 = new THREE.BufferGeometry()
    ptGeo2.setAttribute('position', new THREE.BufferAttribute(ptPos2, 3))
    ptGeo2.setAttribute('color',    new THREE.BufferAttribute(ptCol2, 3))
    const ptMat2 = new THREE.PointsMaterial({ size: 0.055, vertexColors: true, transparent: true, opacity: 0.28 })

    const pairs2: number[] = []
    for (let i = 0; i < N2; i++)
      for (let j = i + 1; j < N2; j++) {
        const [ax,ay,az]=pts2[i], [bx,by,bz]=pts2[j]
        const dx=ax-bx, dy=ay-by, dz=az-bz
        if (dx*dx+dy*dy+dz*dz < CONNECT2*CONNECT2) pairs2.push(i, j)
      }
    const nL2 = pairs2.length / 2
    const lPos2 = new Float32Array(nL2 * 6)
    const lCol2 = new Float32Array(nL2 * 6)
    for (let k = 0; k < nL2; k++) {
      const a=pairs2[k*2], b=pairs2[k*2+1]
      lPos2.set([...pts2[a], ...pts2[b]], k*6)
      const acc = a < ACCENT2 || b < ACCENT2
      const c: [number,number,number] = acc ? [0.91,0.33,0.42] : [1,1,1]
      lCol2.set([...c,...c], k*6)
    }
    const lGeo2 = new THREE.BufferGeometry()
    lGeo2.setAttribute('position', new THREE.BufferAttribute(lPos2, 3))
    lGeo2.setAttribute('color',    new THREE.BufferAttribute(lCol2, 3))
    const lMat2 = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.06 })

    const network2 = new THREE.Group()
    network2.add(new THREE.Points(ptGeo2, ptMat2))
    network2.add(new THREE.LineSegments(lGeo2, lMat2))
    network2.position.set(-6.5, -4.5, 0)
    scene.add(network2)

    let mx = 0, my = 0
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    let raf: number, t = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.0008
      network.rotation.y  = t + mx * 0.2
      network.rotation.x  = mx * 0.05 + my * 0.1
      network2.rotation.y = -t * 0.7 + mx * 0.15
      network2.rotation.x = my * 0.08
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      ptGeo.dispose(); ptMat.dispose(); lGeo.dispose(); lMat.dispose()
      ptGeo2.dispose(); ptMat2.dispose(); lGeo2.dispose(); lMat2.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])
}

export default function HeroSpectacular() {
  const networkRef = useRef<HTMLDivElement>(null)
  useNetwork(networkRef)

  return (
    <section style={{ minHeight: '100vh', background: '#08040a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      {/* Réseau 3D — fond absolu */}
      <div ref={networkRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Grain */}
      <div className="hero-grain" />

      {/* Contenu */}
      <div style={{ padding: '120px var(--px) 80px', paddingLeft: 'clamp(40px, 8vw, 120px)', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 860 }}>

          {/* Label */}
          <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 44 }}>
            <div style={{ width: 36, height: 1, background: 'rgba(232,83,107,0.6)' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
              Flavien Desse · Développeur Fullstack · Ingénieur Diplômé
            </span>
          </div>

          {/* Title */}
          <h1 className="h1" style={{ marginBottom: 24, color: '#f5f0eb', fontSize: 'clamp(3.2rem, 6.5vw, 5.8rem)' }}>
            <span className="word-wrap"><span className="word-inner" style={{ animationDelay: '0.1s' }}>Votre</span></span>{' '}
            <span className="word-wrap"><span className="word-inner" style={{ animationDelay: '0.3s' }}>réalisateur</span></span>{' '}
            <span className="word-wrap"><span className="word-inner" style={{ animationDelay: '0.5s' }}>de</span></span>
            <br />
            <span className="word-wrap"><span className="word-inner" style={{ animationDelay: '0.7s', color: '#e8536b' }}>solutions WEB</span></span>
          </h1>

          {/* Badge */}
          <div className="fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', marginBottom: 32, animationDelay: '1.1s' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8536b', boxShadow: '0 0 6px rgba(232,83,107,0.9)' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)' }}>
              Disponible pour de nouveaux projets
            </span>
          </div>

          {/* Subtitle */}
          <p className="fade-up" style={{ fontSize: '1.15rem', color: 'rgba(245,240,235,0.55)', lineHeight: 1.8, maxWidth: 620, marginBottom: 44, animationDelay: '1.3s' }}>
            Je suis{' '}
            <strong style={{ color: '#f5f0eb', fontWeight: 700, fontSize: '1.15rem' }}>Flavien Desse</strong>
            , développeur fullstack. Je conçois des solutions sur mesure,
            adaptées précisément à vos besoins.
          </p>

          {/* CTAs */}
          <div className="fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, animationDelay: '1.55s' }}>
            <a href="#projects" className="btn btn-primary btn-shimmer">
              Voir mes réalisations <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-ghost-dark">
              Me contacter
            </a>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <ChevronDown size={18} />
      </div>

    </section>
  )
}

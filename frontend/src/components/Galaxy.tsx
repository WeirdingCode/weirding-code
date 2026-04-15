import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function makeSprite(): THREE.Texture {
  const c = document.createElement('canvas')
  c.width = 32; c.height = 32
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  g.addColorStop(0,   'rgba(255,255,255,1)')
  g.addColorStop(0.3, 'rgba(255,255,255,0.5)')
  g.addColorStop(1,   'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 32, 32)
  return new THREE.CanvasTexture(c)
}

export default function Galaxy() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 5, 5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const sprite = makeSprite()
    const additive: Partial<THREE.PointsMaterialParameters> = {
      map: sprite, sizeAttenuation: true,
      depthWrite: false, vertexColors: true,
      transparent: true, blending: THREE.AdditiveBlending,
    }

    /* ── Bras spiraux ── */
    const ARM_COUNT = 14000
    const RADIUS    = 8
    const armPos    = new Float32Array(ARM_COUNT * 3)
    const armCol    = new Float32Array(ARM_COUNT * 3)
    const cCore  = new THREE.Color('#fff8e8')
    const cMid   = new THREE.Color('#ffffff')
    const cOuter = new THREE.Color('#b8ccff')

    for (let i = 0; i < ARM_COUNT; i++) {
      const i3    = i * 3
      const r     = Math.pow(Math.random(), 0.6) * RADIUS
      const angle = (i % 2) / 2 * Math.PI * 2 + r * 1.8
      const rx    = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.32 * r
      const ry    = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.08
      const rz    = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.32 * r
      armPos[i3]     = Math.cos(angle) * r + rx
      armPos[i3 + 1] = ry
      armPos[i3 + 2] = Math.sin(angle) * r + rz
      const t = r / RADIUS
      const c = t < 0.35 ? cCore.clone().lerp(cMid, t / 0.35) : cMid.clone().lerp(cOuter, (t - 0.35) / 0.65)
      armCol[i3] = c.r; armCol[i3 + 1] = c.g; armCol[i3 + 2] = c.b
    }
    const armGeo = new THREE.BufferGeometry()
    armGeo.setAttribute('position', new THREE.BufferAttribute(armPos, 3))
    armGeo.setAttribute('color',    new THREE.BufferAttribute(armCol, 3))
    const arms = new THREE.Points(armGeo, new THREE.PointsMaterial({ ...additive, size: 0.035, opacity: 0.85 }))

    /* ── Core dense ── */
    const CORE_COUNT = 3000
    const corePos = new Float32Array(CORE_COUNT * 3)
    const coreCol = new Float32Array(CORE_COUNT * 3)
    const cCoreHot = new THREE.Color('#fff0c0')
    for (let i = 0; i < CORE_COUNT; i++) {
      const i3    = i * 3
      const r     = Math.pow(Math.random(), 2) * 1.8
      const theta = Math.random() * Math.PI * 2
      corePos[i3]     = Math.cos(theta) * r
      corePos[i3 + 1] = (Math.random() - 0.5) * 0.15
      corePos[i3 + 2] = Math.sin(theta) * r
      coreCol[i3] = cCoreHot.r; coreCol[i3 + 1] = cCoreHot.g; coreCol[i3 + 2] = cCoreHot.b
    }
    const coreGeo = new THREE.BufferGeometry()
    coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3))
    coreGeo.setAttribute('color',    new THREE.BufferAttribute(coreCol, 3))
    const corePoints = new THREE.Points(coreGeo, new THREE.PointsMaterial({ ...additive, size: 0.05, opacity: 0.9 }))

    /* ── Halo ── */
    const HALO_COUNT = 2000
    const haloPos = new Float32Array(HALO_COUNT * 3)
    const haloCol = new Float32Array(HALO_COUNT * 3)
    for (let i = 0; i < HALO_COUNT; i++) {
      const i3    = i * 3
      const r     = 4 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi   = (Math.random() - 0.5) * Math.PI * 0.5
      haloPos[i3]     = Math.cos(theta) * Math.cos(phi) * r
      haloPos[i3 + 1] = Math.sin(phi) * r * 0.4
      haloPos[i3 + 2] = Math.sin(theta) * Math.cos(phi) * r
      const warm      = Math.random() > 0.6
      haloCol[i3]     = warm ? 1.0 : 0.85
      haloCol[i3 + 1] = warm ? 0.96 : 0.92
      haloCol[i3 + 2] = warm ? 0.80 : 1.0
    }
    const haloGeo = new THREE.BufferGeometry()
    haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3))
    haloGeo.setAttribute('color',    new THREE.BufferAttribute(haloCol, 3))
    const halo = new THREE.Points(haloGeo, new THREE.PointsMaterial({ ...additive, size: 0.02, opacity: 0.4 }))

    const galaxy = new THREE.Group()
    galaxy.add(arms, corePoints, halo)
    scene.add(galaxy)

    /* ── Parallax souris ── */
    let mouseOffsetY = 0, mouseOffsetX = 0
    const onMouse = (e: MouseEvent) => {
      mouseOffsetY = (e.clientX / window.innerWidth  - 0.5) * 0.4
      mouseOffsetX = (e.clientY / window.innerHeight - 0.5) * 0.15
    }
    window.addEventListener('mousemove', onMouse)

    /* ── Animation ── */
    let raf: number
    let currentY = 0, currentX = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      currentY += 0.0005
      currentX += (mouseOffsetX - currentX) * 0.02
      galaxy.rotation.y = currentY + mouseOffsetY
      galaxy.rotation.x = currentX
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      ;[armGeo, coreGeo, haloGeo].forEach(g => g.dispose())
      sprite.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

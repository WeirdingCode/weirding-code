import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/* ── Screen canvas ── */
function drawScreen(canvas: HTMLCanvasElement, t: number) {
  const ctx = canvas.getContext('2d')!
  const W = canvas.width, H = canvas.height

  ctx.fillStyle = '#060204'
  ctx.fillRect(0, 0, W, H)

  const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 1.3)
  grd.addColorStop(0, 'rgba(232,83,107,0.08)')
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, W, H)

  for (let y = 0; y < H; y += 4) {
    ctx.fillStyle = 'rgba(0,0,0,0.25)'
    ctx.fillRect(0, y, W, 2)
  }

  ctx.font = '500 13px "JetBrains Mono", monospace'
  const lines = [
    { txt: 'WEIRDING CODE v1.0', color: '#e8536b' },
    { txt: '──────────────────', color: '#2a1018' },
    { txt: '> Booting system...   OK', color: '#a09090' },
    { txt: '> Loading modules...  OK', color: '#a09090' },
    { txt: '> Network...          OK', color: '#a09090' },
    { txt: '> All systems ready.', color: '#7dd3a3' },
    { txt: '', color: '' },
    { txt: Math.floor(t / 0.7) % 2 === 0 ? '> _' : '> ', color: '#e8536b' },
  ]
  lines.forEach((l, i) => {
    if (!l.txt) return
    ctx.fillStyle = l.color
    ctx.fillText(l.txt, 24, 40 + i * 22)
  })
}

/* ── Retro PC monitor ── */
function buildMonitor(): THREE.Group {
  const g = new THREE.Group()

  const body  = new THREE.MeshStandardMaterial({ color: 0x1a1015, roughness: 0.85, metalness: 0.05 })
  const bezel = new THREE.MeshStandardMaterial({ color: 0x120a0e, roughness: 0.9 })
  const base  = new THREE.MeshStandardMaterial({ color: 0x1f1218, roughness: 0.8 })
  const key   = new THREE.MeshStandardMaterial({ color: 0x180c10, roughness: 0.95 })

  // Housing
  const housing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.22, 1.1), body)
  housing.position.set(0, 0.12, -0.32)
  g.add(housing)

  // Bezel
  const bzl = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.22, 0.09), bezel)
  bzl.position.set(0, 0.12, 0.26)
  g.add(bzl)

  // Screen
  const sc = document.createElement('canvas')
  sc.width = 512; sc.height = 384
  drawScreen(sc, 0)
  const tex = new THREE.CanvasTexture(sc)
  const mat = new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: new THREE.Color(0xe8536b), emissiveIntensity: 0.2, roughness: 0.2 })
  const screen = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.9, 0.01), mat)
  screen.position.set(0, 0.12, 0.315)
  g.add(screen);
  (g as any)._sc = sc; (g as any)._tex = tex; (g as any)._mat = mat

  // LED
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x00dd55, emissive: new THREE.Color(0x00dd55), emissiveIntensity: 2 }))
  led.position.set(0.66, -0.38, 0.305)
  g.add(led)

  // Floppy slot
  const floppy = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.03, 0.012), key)
  floppy.position.set(0.56, -0.2, 0.305)
  g.add(floppy)

  // Neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.3, 0.4, 8), base)
  neck.position.set(0, -0.68, -0.1)
  g.add(neck)

  // Monitor base
  const mbase = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.07, 0.72), base)
  mbase.position.set(0, -0.92, 0)
  g.add(mbase)

  // Keyboard
  const kb = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.055, 0.48), base)
  kb.position.set(0, -1.06, 0.6); kb.rotation.x = -0.12
  g.add(kb)

  // Keys (instanced)
  const inst = new THREE.InstancedMesh(new THREE.BoxGeometry(0.075, 0.022, 0.058), key, 4 * 13)
  const d = new THREE.Object3D(); let idx = 0
  for (let r = 0; r < 4; r++) for (let c = 0; c < 13; c++) {
    d.position.set(-0.53 + c * 0.088 + r * 0.03, -1.04, 0.4 + r * 0.08)
    d.rotation.x = -0.12; d.updateMatrix()
    inst.setMatrixAt(idx++, d.matrix)
  }
  inst.instanceMatrix.needsUpdate = true
  g.add(inst)

  return g
}

/* ── Retrowave grid ── */
function buildGrid(): THREE.Group {
  const g = new THREE.Group()
  const mat = new THREE.LineBasicMaterial({ color: 0xe8536b, transparent: true, opacity: 0.22 })
  const W = 28, D = 36, cols = 24, rows = 28

  for (let i = 0; i <= cols; i++) {
    const x = -W / 2 + (i / cols) * W
    const pts = [new THREE.Vector3(x, 0, 2), new THREE.Vector3(x, 0, -D)]
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat))
  }
  for (let j = 0; j <= rows; j++) {
    const z = 2 - (j / rows) * D
    const fade = 1 - j / rows
    const lineMat = new THREE.LineBasicMaterial({ color: 0xe8536b, transparent: true, opacity: 0.22 * fade })
    const pts = [new THREE.Vector3(-W / 2, 0, z), new THREE.Vector3(W / 2, 0, z)]
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat))
  }
  return g
}

/* ── Stars ── */
function buildStars(): THREE.Points {
  const n = 900
  const pos = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 120
    pos[i * 3 + 1] = Math.random() * 40 + 3
    pos[i * 3 + 2] = (Math.random() - 0.5) * 120
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xf5ede5, size: 0.08, transparent: true, opacity: 0.55 }))
}

/* ── Horizon glow plane ── */
function buildHorizon(): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(60, 4)
  const mat = new THREE.MeshBasicMaterial({
    color: 0xe8536b,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
  })
  const m = new THREE.Mesh(geo, mat)
  m.position.set(0, 1.8, -18)
  return m
}

/* ── Component ── */
export default function RetroPC() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene    = new THREE.Scene()
    scene.background = new THREE.Color(0x07030a)
    scene.fog = new THREE.Fog(0x07030a, 18, 42)

    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 2.4, 7.5)
    camera.lookAt(0, 0.5, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Scene objects
    const monitor = buildMonitor()
    monitor.position.set(2.2, 1.0, -1.5)
    monitor.rotation.y = -0.35
    scene.add(monitor)

    const grid = buildGrid()
    grid.position.y = -0.05
    scene.add(grid)

    scene.add(buildStars())
    scene.add(buildHorizon())

    // Lights
    scene.add(new THREE.AmbientLight(0xf5ede5, 0.4))
    const key = new THREE.DirectionalLight(0xfff0ea, 1.2)
    key.position.set(5, 8, 5); scene.add(key)
    const fill = new THREE.DirectionalLight(0xe8536b, 0.3)
    fill.position.set(-5, 2, 3); scene.add(fill)
    const glow = new THREE.PointLight(0xe8536b, 1.4, 5)
    glow.position.set(2.2, 1.5, 0.5); scene.add(glow)

    // Horizon glow
    const hLight = new THREE.PointLight(0xe8536b, 0.6, 20)
    hLight.position.set(0, 2, -15); scene.add(hLight)

    // Mouse parallax
    let tY = -0.35, tX = 0
    const onMouse = (e: MouseEvent) => {
      tY = -0.35 + (e.clientX / window.innerWidth - 0.5) * 0.3
      tX = (e.clientY / window.innerHeight - 0.5) * -0.1
    }
    window.addEventListener('mousemove', onMouse)

    // Animate
    let raf: number, t = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      t += 0.016

      monitor.rotation.y += (tY - monitor.rotation.y) * 0.04
      monitor.rotation.x += (tX - monitor.rotation.x) * 0.04

      // Screen update
      drawScreen((monitor as any)._sc, t)
      ;(monitor as any)._tex.needsUpdate = true
      ;(monitor as any)._mat.emissiveIntensity = 0.2 + Math.sin(t * 1.8) * 0.015 + (Math.random() < 0.015 ? 0.07 : 0)

      glow.intensity = 1.3 + Math.sin(t * 1.2) * 0.2
      hLight.intensity = 0.5 + Math.sin(t * 0.7) * 0.15

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
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}

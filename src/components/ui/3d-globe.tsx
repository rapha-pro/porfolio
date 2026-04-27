"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export type GlobeMarker = {
  lat: number
  lng: number
  label: string
  /** Avatar image URL. Displayed as a circle sprite. */
  src?: string
  /** Fallback ring colour when no src (hex). Defaults to accent. */
  color?: string
  subtitle?: string
}

type Globe3DConfig = {
  atmosphereColor?: string
  atmosphereIntensity?: number
  bumpScale?: number
  autoRotateSpeed?: number
  tilt?: number
}

type Globe3DProps = {
  markers?: GlobeMarker[]
  config?: Globe3DConfig
  onMarkerClick?: (marker: GlobeMarker) => void
  onMarkerHover?: (marker: GlobeMarker | null) => void
  className?: string
}

function latLngToVec3(lat: number, lng: number, r = 1): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

/**
 * Draws a circular avatar marker onto a 128x128 canvas.
 * If img is provided the photo is clipped into the circle; otherwise the
 * fallback colour is used with the label initials.
 */
function drawAvatarCanvas(img: HTMLImageElement | null, color: string, label: string): HTMLCanvasElement {
  const S = 128, c = document.createElement("canvas")
  c.width = c.height = S
  const ctx = c.getContext("2d")!
  const cx = S / 2, r = S / 2 - 3

  // Coloured ring
  ctx.beginPath(); ctx.arc(cx, cx, r + 2, 0, Math.PI * 2)
  ctx.fillStyle = color; ctx.fill()

  // White inner ring
  ctx.beginPath(); ctx.arc(cx, cx, r, 0, Math.PI * 2)
  ctx.fillStyle = "#fff"; ctx.fill()

  // Photo or initials fill
  ctx.save()
  ctx.beginPath(); ctx.arc(cx, cx, r - 2, 0, Math.PI * 2); ctx.clip()
  if (img) {
    ctx.drawImage(img, 3, 3, S - 6, S - 6)
  } else {
    ctx.fillStyle = color; ctx.fillRect(0, 0, S, S)
    ctx.fillStyle = "#fff"
    ctx.font = `bold ${S * 0.32}px system-ui, sans-serif`
    ctx.textAlign = "center"; ctx.textBaseline = "middle"
    ctx.fillText(label.slice(0, 2).toUpperCase(), cx, cx)
  }
  ctx.restore()
  return c
}

/**
 * Purpose:
 *   Interactive 3-D Earth globe built on Three.js. Renders an Earth sphere
 *   with atmosphere glow, star field, and avatar-style circle pin markers.
 *   Markers can show a real image (src) or fall back to coloured initials.
 *   Supports auto-rotation, drag-to-spin, and momentum.
 *
 * Args:
 *   - markers:       lat/lng pins with optional avatar src URLs.
 *   - config:        visual tuning (atmosphere, speed, etc.).
 *   - onMarkerClick: fired when a marker sprite is clicked.
 *   - onMarkerHover: fired with the hovered marker, or null on leave.
 *   - className:     extra classes on the wrapper div.
 *
 * Returns:
 *   A responsive div containing the Three.js canvas.
 */
export function Globe3D({ markers = [], config = {}, onMarkerClick, className = "" }: Globe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current; if (!mount) return
    const { atmosphereColor = "#4da6ff", atmosphereIntensity = 20, bumpScale = 5, autoRotateSpeed = 0.15, tilt = 23.4 } = config

    const W = mount.clientWidth || 460, H = mount.clientHeight || 460

    /* Renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H); renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    /* Scene / camera */
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 2.7)

    /* Stars */
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(2000 * 3)
    for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 90
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.55 })))

    /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const sun = new THREE.DirectionalLight(0xfff8e7, 1.1); sun.position.set(4, 2, 4); scene.add(sun)

    /* Earth group — tilted like the real planet */
    const earthGroup = new THREE.Group()
    earthGroup.rotation.z = tilt * (Math.PI / 180)
    /* Initial rotation: face North America (lon ≈ -90 → theta ≈ π/2 → rotate Y to align) */
    earthGroup.rotation.y = 0.3
    scene.add(earthGroup)

    const loader = new THREE.TextureLoader()
    const earthMat = new THREE.MeshPhongMaterial({
      map:         loader.load("https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-blue-marble.jpg"),
      bumpMap:     loader.load("https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-topology.png"),
      bumpScale:   bumpScale * 0.001,
      specularMap: loader.load("https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-water.png"),
      specular:    new THREE.Color(0x333333),
      shininess:   15,
    })
    earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMat))

    /* Atmosphere layers */
    const atmoMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(atmosphereColor), transparent: true, opacity: atmosphereIntensity / 100, side: THREE.BackSide, depthWrite: false })
    earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.06, 64, 64), atmoMat))
    const glowMat = new THREE.MeshPhongMaterial({ color: new THREE.Color(atmosphereColor), transparent: true, opacity: 0.05, side: THREE.BackSide, depthWrite: false })
    earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(1.13, 64, 64), glowMat))

    /* Markers — start with fallback texture, replace async when avatar loads */
    const markerSprites: Array<{ sprite: THREE.Sprite; marker: GlobeMarker }> = []

    markers.forEach((m) => {
      const color  = m.color ?? "#8b5cf6"
      const pos    = latLngToVec3(m.lat, m.lng, 1.05)
      const canvas = drawAvatarCanvas(null, color, m.label)
      const mat    = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthTest: false, sizeAttenuation: true })
      const sprite = new THREE.Sprite(mat)
      sprite.position.copy(pos); sprite.scale.set(0.2, 0.2, 1)
      earthGroup.add(sprite)
      markerSprites.push({ sprite, marker: m })

      /* Load avatar asynchronously */
      if (m.src) {
        const img = new Image(); img.crossOrigin = "anonymous"
        img.onload = () => {
          const c2 = drawAvatarCanvas(img, color, m.label)
          mat.map = new THREE.CanvasTexture(c2); mat.needsUpdate = true
        }
        img.onerror = () => {} // keep fallback
        img.src = m.src
      }
    })

    /* Drag interaction */
    let isDragging = false, prevX = 0, prevY = 0, dX = 0, dY = 0, velX = 0, velY = 0
    const raycaster = new THREE.Raycaster(), ndcMouse = new THREE.Vector2()

    function onDown(e: MouseEvent) { isDragging = true; dX = dY = 0; prevX = e.clientX; prevY = e.clientY }
    function onMove(e: MouseEvent) {
      if (!isDragging) return
      dX = e.clientX - prevX; dY = e.clientY - prevY; prevX = e.clientX; prevY = e.clientY
      earthGroup.rotation.y += dX * 0.005; earthGroup.rotation.x += dY * 0.003
    }
    function onUp(e: MouseEvent) {
      if (!isDragging) return; isDragging = false
      velX = dX * 0.003; velY = dY * 0.002
      if (Math.abs(dX) < 3 && Math.abs(dY) < 3) {
        const rect = renderer.domElement.getBoundingClientRect()
        ndcMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        ndcMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycaster.setFromCamera(ndcMouse, camera)
        const hits = raycaster.intersectObjects(markerSprites.map((m) => m.sprite))
        if (hits.length) { const hit = markerSprites.find((m) => m.sprite === hits[0].object); if (hit) onMarkerClick?.(hit.marker) }
      }
    }

    const el = renderer.domElement
    el.addEventListener("mousedown", onDown)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)

    /* Resize */
    const ro = new ResizeObserver(() => {
      if (!mount) return; const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h)
    })
    ro.observe(mount)

    /* Animation */
    let raf: number
    const speed = autoRotateSpeed * (Math.PI / 180)
    function animate() {
      raf = requestAnimationFrame(animate)
      if (!isDragging) {
        earthGroup.rotation.y += speed
        if (Math.abs(velX) > 0.0001) { earthGroup.rotation.y += velX; velX *= 0.92 }
        if (Math.abs(velY) > 0.0001) { earthGroup.rotation.x += velY; velY *= 0.92 }
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      el.removeEventListener("mousedown", onDown)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      renderer.dispose(); if (mount.contains(el)) mount.removeChild(el)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={mountRef} className={`relative h-full w-full cursor-grab active:cursor-grabbing select-none overflow-hidden ${className}`} />
}

"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export type GlobeMarker = {
  lat: number
  lng: number
  label: string
  /** Hex colour for the marker pin. Defaults to accent. */
  color?: string
  /** Optional secondary label / subtitle shown on hover. */
  subtitle?: string
}

type Globe3DConfig = {
  /** Atmosphere glow colour (hex). Default #4da6ff. */
  atmosphereColor?: string
  /** Atmosphere opacity intensity 0-100. Default 20. */
  atmosphereIntensity?: number
  /** Elevation bump scale. Default 5. */
  bumpScale?: number
  /** Degrees per frame for auto-rotation. Default 0.15. */
  autoRotateSpeed?: number
  /** Tilt of the globe in degrees. Default 23.4 (Earth axial tilt). */
  tilt?: number
}

type Globe3DProps = {
  markers?: GlobeMarker[]
  config?: Globe3DConfig
  onMarkerClick?: (marker: GlobeMarker) => void
  onMarkerHover?: (marker: GlobeMarker | null) => void
  className?: string
}

/** Convert lat/lng to a unit 3-D vector on the sphere surface. */
function latLngToVec3(lat: number, lng: number, radius = 1): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta),
  )
}

/**
 * Draw a map-pin icon (circle + downward point) onto a canvas and return it
 * as a THREE.CanvasTexture.
 *
 * Args:
 *   - color:    pin fill colour (hex string).
 *   - label:    text shown inside / beside the pin (1–2 chars works best).
 *
 * Returns:
 *   - A CanvasTexture ready for use in a SpriteMaterial.
 */
function makePinTexture(color: string, label: string): THREE.CanvasTexture {
  const SIZE = 128
  const c = document.createElement("canvas")
  c.width = SIZE; c.height = SIZE
  const ctx = c.getContext("2d")!

  const cx = SIZE / 2, r = 36

  // Drop shadow
  ctx.shadowColor = "rgba(0,0,0,0.6)"
  ctx.shadowBlur  = 8

  // Circle body
  ctx.beginPath()
  ctx.arc(cx, r, r, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()

  // Downward point
  ctx.beginPath()
  ctx.moveTo(cx - 10, r + r * 0.7)
  ctx.lineTo(cx + 10, r + r * 0.7)
  ctx.lineTo(cx, SIZE - 8)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()

  // White inner ring
  ctx.shadowBlur = 0
  ctx.beginPath()
  ctx.arc(cx, r, r - 8, 0, Math.PI * 2)
  ctx.fillStyle = "rgba(255,255,255,0.18)"
  ctx.fill()

  // Label text
  ctx.fillStyle = "#ffffff"
  ctx.font = `bold ${r * 0.85}px system-ui, sans-serif`
  ctx.textAlign    = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(label.slice(0, 2), cx, r)

  return new THREE.CanvasTexture(c)
}

/**
 * Purpose:
 *   Interactive 3-D globe built on Three.js. Renders an Earth sphere with
 *   atmosphere glow, a star field, and custom pin markers at given
 *   coordinates. Supports auto-rotation and optional mouse-drag orbit.
 *
 * Args:
 *   - markers:       array of lat/lng pins to render on the surface.
 *   - config:        visual tuning (atmosphere, speed, etc.).
 *   - onMarkerClick: fired when a marker sprite is clicked.
 *   - onMarkerHover: fired with the hovered marker, or null on leave.
 *   - className:     extra classes on the wrapper div.
 *
 * Returns:
 *   A responsive div containing the Three.js canvas.
 */
export function Globe3D({
  markers = [],
  config  = {},
  onMarkerClick,
  onMarkerHover,
  className = "",
}: Globe3DProps) {
  const mountRef  = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const {
      atmosphereColor    = "#4da6ff",
      atmosphereIntensity = 20,
      bumpScale          = 5,
      autoRotateSpeed    = 0.15,
      tilt               = 23.4,
    } = config

    const W = mount.clientWidth  || 400
    const H = mount.clientHeight || 400

    /* ── Renderer ─────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    canvasRef.current = renderer.domElement

    /* ── Scene & camera ─────────────────────────────────────────── */
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 2.7)

    /* ── Stars ──────────────────────────────────────────────────── */
    const starGeo = new THREE.BufferGeometry()
    const starCount = 1800
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 80
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.6 })
    scene.add(new THREE.Points(starGeo, starMat))

    /* ── Lights ─────────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const sun = new THREE.DirectionalLight(0xfff8e7, 1.1)
    sun.position.set(4, 2, 4)
    scene.add(sun)

    /* ── Earth ──────────────────────────────────────────────────── */
    const loader     = new THREE.TextureLoader()
    const earthGroup = new THREE.Group()
    earthGroup.rotation.z = tilt * (Math.PI / 180)
    scene.add(earthGroup)

    const earthGeo = new THREE.SphereGeometry(1, 64, 64)
    const earthMat = new THREE.MeshPhongMaterial({
      map:           loader.load("https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-blue-marble.jpg"),
      bumpMap:       loader.load("https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-topology.png"),
      bumpScale:     bumpScale * 0.001,
      specularMap:   loader.load("https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-water.png"),
      specular:      new THREE.Color(0x333333),
      shininess:     15,
    })
    const earth = new THREE.Mesh(earthGeo, earthMat)
    earthGroup.add(earth)

    /* ── Atmosphere ─────────────────────────────────────────────── */
    const atmoGeo = new THREE.SphereGeometry(1.06, 64, 64)
    const atmoMat = new THREE.MeshPhongMaterial({
      color:       new THREE.Color(atmosphereColor),
      transparent: true,
      opacity:     atmosphereIntensity / 100,
      side:        THREE.BackSide,
      depthWrite:  false,
    })
    earthGroup.add(new THREE.Mesh(atmoGeo, atmoMat))

    /* ── Outer glow ring ─────────────────────────────────────────── */
    const glowGeo = new THREE.SphereGeometry(1.12, 64, 64)
    const glowMat = new THREE.MeshPhongMaterial({
      color:       new THREE.Color(atmosphereColor),
      transparent: true,
      opacity:     0.05,
      side:        THREE.BackSide,
      depthWrite:  false,
    })
    earthGroup.add(new THREE.Mesh(glowGeo, glowMat))

    /* ── Markers ─────────────────────────────────────────────────── */
    const markerSprites: Array<{ sprite: THREE.Sprite; marker: GlobeMarker }> = []

    markers.forEach((m) => {
      const pos     = latLngToVec3(m.lat, m.lng, 1.04)
      const color   = m.color ?? "#8b5cf6"
      const texture = makePinTexture(color, m.label.slice(0, 2).toUpperCase())

      const spriteMat = new THREE.SpriteMaterial({
        map:          texture,
        transparent:  true,
        depthTest:    false,
        sizeAttenuation: true,
      })
      const sprite = new THREE.Sprite(spriteMat)
      sprite.position.copy(pos)
      sprite.scale.set(0.18, 0.18, 1)

      earthGroup.add(sprite)
      markerSprites.push({ sprite, marker: m })
    })

    /* ── Mouse drag + click ─────────────────────────────────────── */
    let isDragging  = false
    let prevMouseX  = 0
    let prevMouseY  = 0
    let dragDeltaX  = 0
    let dragDeltaY  = 0
    let velocityX   = 0
    let velocityY   = 0

    const raycaster  = new THREE.Raycaster()
    const mouseNDC   = new THREE.Vector2()

    function toNDC(e: MouseEvent | Touch) {
      const rect = renderer.domElement.getBoundingClientRect()
      mouseNDC.x = ((e.clientX - rect.left)  / rect.width)  * 2 - 1
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    function onMouseDown(e: MouseEvent) {
      isDragging = true
      dragDeltaX = dragDeltaY = 0
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    function onMouseMove(e: MouseEvent) {
      if (!isDragging) return
      dragDeltaX = e.clientX - prevMouseX
      dragDeltaY = e.clientY - prevMouseY
      prevMouseX = e.clientX
      prevMouseY = e.clientY
      earthGroup.rotation.y += dragDeltaX * 0.005
      earthGroup.rotation.x += dragDeltaY * 0.003
    }

    function onMouseUp(e: MouseEvent) {
      if (!isDragging) return
      isDragging = false
      velocityX  = dragDeltaX * 0.003
      velocityY  = dragDeltaY * 0.002

      // Check for marker click (only if minimal movement)
      if (Math.abs(dragDeltaX) < 3 && Math.abs(dragDeltaY) < 3) {
        toNDC(e)
        raycaster.setFromCamera(mouseNDC, camera)
        const hits = raycaster.intersectObjects(markerSprites.map((m) => m.sprite))
        if (hits.length > 0) {
          const hit = markerSprites.find((m) => m.sprite === hits[0].object)
          if (hit) onMarkerClick?.(hit.marker)
        }
      }
    }

    const el = renderer.domElement
    el.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup",   onMouseUp)

    /* ── Resize ─────────────────────────────────────────────────── */
    const ro = new ResizeObserver(() => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    ro.observe(mount)

    /* ── Animation loop ──────────────────────────────────────────── */
    let raf: number
    const speed = autoRotateSpeed * (Math.PI / 180)

    function animate() {
      raf = requestAnimationFrame(animate)
      if (!isDragging) {
        earthGroup.rotation.y += speed
        // Momentum decay
        if (Math.abs(velocityX) > 0.0001) {
          earthGroup.rotation.y += velocityX
          velocityX *= 0.92
        }
        if (Math.abs(velocityY) > 0.0001) {
          earthGroup.rotation.x += velocityY
          velocityY *= 0.92
        }
      }
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      el.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup",   onMouseUp)
      renderer.dispose()
      if (mount.contains(el)) mount.removeChild(el)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={mountRef}
      className={`relative h-full w-full cursor-grab active:cursor-grabbing select-none overflow-hidden ${className}`}
    />
  )
}

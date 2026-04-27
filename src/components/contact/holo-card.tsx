"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

type HoloCardProps = {

  name: string        // Name engraved on the card front.
  title: string       // Title / role line.
  email: string       // Email line. 
  handle?: string     //Optional handle line.
  size?: number       // Square canvas size in px. Default 460.
  edgeColor?: string  // Edge-glow color override. Defaults to current --accent.
  className?: string
}

/**
 * Purpose:
 *   Read a CSS color (hex or rgb()) into a THREE-friendly numeric value.
 *
 * Args:
 *   value - "#8b5cf6" or "rgb(139,92,246)" or "rgba(...)" string.
 *
 * Returns:
 *   24-bit integer (0xRRGGBB) or undefined when parsing fails.
 */
function readCssColor(value: string): number | undefined {
  const v = value.trim()
  if (v.startsWith("#")) {
    const hex = v.slice(1)
    if (hex.length === 6 && !/[^0-9a-fA-F]/.test(hex)) {
      return parseInt(hex, 16)
    }
  }
  const m = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (m) {
    return (parseInt(m[1]) << 16) | (parseInt(m[2]) << 8) | parseInt(m[3])
  }
  return undefined
}

/**
 * Purpose:
 *   Read the live `--accent` CSS variable from the document root, returning
 *   a THREE-compatible numeric color. Falls back to violet if unreadable.
 *
 * Returns:
 *   The current accent as a 0xRRGGBB int.
 */
function getAccentInt(): number {
  if (typeof window === "undefined") return 0x8b5cf6
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim()
  return readCssColor(raw) ?? 0x8b5cf6
}

type CardTextureContent = {
  name: string
  title: string
  email: string
  handle?: string
}

/**
 * Purpose:
 *   Render the holographic card face onto an offscreen canvas. The texture
 *   is sized 1024×640 to give crisp text on retina displays. Light-on-dark
 *   palette so the glass card reads in any theme.
 *
 * Args:
 *   content - name + title + email + handle.
 *   accent  - accent color used for the gradient strip + glow text.
 *
 * Returns:
 *   A THREE.CanvasTexture ready for use as a material map.
 */
function makeCardTexture(content: CardTextureContent, accent: number): THREE.CanvasTexture {
  const W = 1024
  const H = 640
  const c = document.createElement("canvas")
  c.width = W
  c.height = H
  const ctx = c.getContext("2d")!

  const accentHex = `#${accent.toString(16).padStart(6, "0")}`

  // Card backdrop - deep navy with subtle violet wash
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, "#0c0f1d")
  bg.addColorStop(1, "#161a2e")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // Holographic stripes (very subtle)
  for (let i = 0; i < 80; i++) {
    ctx.fillStyle = `rgba(255,255,255,${i % 2 === 0 ? 0.012 : 0.025})`
    ctx.fillRect(0, i * 9, W, 4)
  }

  // Accent gradient stripe along the bottom edge
  const stripe = ctx.createLinearGradient(0, 0, W, 0)
  stripe.addColorStop(0, "transparent")
  stripe.addColorStop(0.4, accentHex)
  stripe.addColorStop(0.6, accentHex)
  stripe.addColorStop(1, "transparent")
  ctx.fillStyle = stripe
  ctx.fillRect(48, H - 28, W - 96, 5)

  // Accent corner mark - top-left
  ctx.fillStyle = accentHex
  ctx.fillRect(60, 60, 28, 4)
  ctx.fillRect(60, 60, 4, 28)

  // Top-right corner
  ctx.fillRect(W - 88, 60, 28, 4)
  ctx.fillRect(W - 64, 60, 4, 28)

  // Card label (small mono kicker)
  ctx.fillStyle = "rgba(255,255,255,0.55)"
  ctx.font = "600 22px ui-monospace, 'JetBrains Mono', 'Cascadia Mono', Menlo, monospace"
  ctx.fillText("CONTACT · v1.0", 100, 88)

  // Name - large
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "800 84px 'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif"
  ctx.fillText(content.name, 100, 240)

  // Title - accent
  ctx.fillStyle = accentHex
  ctx.font = "600 30px 'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif"
  ctx.fillText(content.title, 100, 290)

  // Divider rule
  ctx.fillStyle = "rgba(255,255,255,0.18)"
  ctx.fillRect(100, 340, W - 200, 1)

  // Email
  ctx.fillStyle = "rgba(255,255,255,0.85)"
  ctx.font = "500 30px 'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif"
  ctx.fillText(content.email, 100, 396)

  // Handle (optional)
  if (content.handle) {
    ctx.fillStyle = "rgba(255,255,255,0.55)"
    ctx.font = "500 26px 'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif"
    ctx.fillText(content.handle, 100, 444)
  }

  // Bottom-right corner mark
  ctx.fillStyle = accentHex
  ctx.fillRect(W - 88, H - 88, 28, 4)
  ctx.fillRect(W - 64, H - 88, 4, 28)

  // Bottom-left corner mark
  ctx.fillRect(60, H - 88, 28, 4)
  ctx.fillRect(60, H - 88, 4, 28)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  return tex
}

/**
 * Purpose:
 *   Render a small glow texture used for the orbiting satellite particles.
 *
 * Args:
 *   accent - accent color as a hex int.
 *
 * Returns:
 *   A radial-gradient CanvasTexture.
 */
function makeOrbTexture(accent: number): THREE.CanvasTexture {
  const S = 128
  const c = document.createElement("canvas")
  c.width = S
  c.height = S
  const ctx = c.getContext("2d")!
  const accentHex = `#${accent.toString(16).padStart(6, "0")}`
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  g.addColorStop(0, "rgba(255,255,255,0.95)")
  g.addColorStop(0.25, accentHex)
  g.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/**
 * Purpose:
 *   The headline 3D piece in the contact section: a slowly rotating
 *   holographic glass business card. The card front carries an offscreen-
 *   rendered canvas texture (name, title, email), edges glow in the active
 *   accent color, and four small accent orbs orbit on different planes.
 *
 *   The whole scene tilts a few degrees toward the cursor to give a sense
 *   of presence, and re-builds its accent textures whenever the user
 *   switches the global accent (mutation observer on <html> class list).
 *
 * Args:
 *   name      - name engraved on the card.
 *   title     - role / position line.
 *   email     - email line.
 *   handle    - optional handle line under the email.
 *   size      - square canvas side in px.
 *   edgeColor - override edge glow color.
 *   className - extra classes on the wrapper.
 *
 * Returns:
 *   A <div> hosting the WebGL canvas; cleans up on unmount.
 */
export function HoloCard({
  name,
  title,
  email,
  handle,
  size = 460,
  edgeColor,
  className = "",
}: HoloCardProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

 /* Scene + renderer */
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0, 6.2)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

 /* Lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.DirectionalLight(0xffffff, 0.9)
    key.position.set(2, 3, 4)
    scene.add(key)

    let accent = edgeColor ? readCssColor(edgeColor) ?? getAccentInt() : getAccentInt()
    const accentLight = new THREE.PointLight(accent, 1.4, 12)
    accentLight.position.set(0, 0, 2.4)
    scene.add(accentLight)

 /* The card */
    // Aspect 8:5 (standard business card-ish)
    const cardW = 3.2
    const cardH = 2.0
    const cardD = 0.08

    const cardGeom = new THREE.BoxGeometry(cardW, cardH, cardD, 1, 1, 1)

    let frontTex = makeCardTexture(
      { name, title, email, handle },
      accent,
    )
    let backTex = makeCardTexture(
      {
        name: "Let's build",
        title: "something good.",
        email: email,
        handle: handle,
      },
      accent,
    )

    /* Six materials - front (+Z) and back (−Z) get the textures, the
       four edge faces get a subtle dark glass colour. Order matches
       BoxGeometry: [+X, −X, +Y, −Y, +Z, −Z]. */
    const edgeMat = new THREE.MeshPhysicalMaterial({
      color: 0x101326,
      metalness: 0.4,
      roughness: 0.35,
      clearcoat: 0.5,
    })
    const frontMat = new THREE.MeshPhysicalMaterial({
      map: frontTex,
      metalness: 0.2,
      roughness: 0.32,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    })
    const backMat = new THREE.MeshPhysicalMaterial({
      map: backTex,
      metalness: 0.2,
      roughness: 0.32,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    })

    const card = new THREE.Mesh(cardGeom, [
      edgeMat, edgeMat, edgeMat, edgeMat, frontMat, backMat,
    ])
    scene.add(card)

    /* Accent edge glow lines */
    const edges = new THREE.EdgesGeometry(cardGeom)
    const edgesMat = new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.85 })
    const edgesLines = new THREE.LineSegments(edges, edgesMat)
    card.add(edgesLines)

    /* Soft outer glow plane behind the card */
    const glowGeom = new THREE.PlaneGeometry(cardW * 1.7, cardH * 1.7)
    let glowTex = makeOrbTexture(accent)
    const glowMat = new THREE.MeshBasicMaterial({
      map: glowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const glow = new THREE.Mesh(glowGeom, glowMat)
    glow.position.z = -0.2
    scene.add(glow)

 /* Orbiting accent orbs */
    const orbGroup = new THREE.Group()
    scene.add(orbGroup)

    let orbTex = makeOrbTexture(accent)
    const orbs: THREE.Mesh[] = []
    const ORB_COUNT = 5
    for (let i = 0; i < ORB_COUNT; i++) {
      const radius = 2.4 + i * 0.18
      const inclination = (i / ORB_COUNT) * Math.PI
      const phase = Math.random() * Math.PI * 2

      const mat = new THREE.MeshBasicMaterial({
        map: orbTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const orb = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.45), mat)
      // Always face camera (billboard) - we'll reset rotation each frame.
      orb.userData = { radius, inclination, phase, speed: 0.4 + Math.random() * 0.5 }
      orbGroup.add(orb)
      orbs.push(orb)
    }

 /* Cursor tilt */
    const target = new THREE.Vector2(0, 0)
    const handlePointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      target.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    const handleLeave = () => {
      target.set(0, 0)
    }
    mount.addEventListener("pointermove", handlePointer)
    mount.addEventListener("pointerleave", handleLeave)

 /* Accent change observer */
    /* Re-build the textures + edge color when the user switches accent. */
    const observer = new MutationObserver(() => {
      const next = getAccentInt()
      if (next === accent) return
      accent = next

      // Swap textures
      frontTex.dispose()
      backTex.dispose()
      glowTex.dispose()
      orbTex.dispose()

      frontTex = makeCardTexture({ name, title, email, handle }, accent)
      backTex = makeCardTexture(
        { name: "Let's build", title: "something good.", email, handle },
        accent,
      )
      glowTex = makeOrbTexture(accent)
      orbTex = makeOrbTexture(accent)

      frontMat.map = frontTex
      frontMat.needsUpdate = true
      backMat.map = backTex
      backMat.needsUpdate = true
      glowMat.map = glowTex
      glowMat.needsUpdate = true
      orbs.forEach((o) => {
        const m = o.material as THREE.MeshBasicMaterial
        m.map = orbTex
        m.needsUpdate = true
      })

      edgesMat.color.setHex(accent)
      accentLight.color.setHex(accent)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

 /* Animation loop */
    let raf = 0
    const start = performance.now()
    const tick = () => {
      const t = (performance.now() - start) / 1000

      // Cursor tilt - soft lerp toward the target.
      const tiltX = target.y * 0.35
      const tiltY = target.x * 0.45
      card.rotation.x += (tiltX - card.rotation.x) * 0.08
      // Auto-rotate Y combined with cursor influence
      const targetYRot = tiltY + Math.sin(t * 0.55) * 0.4
      card.rotation.y += (targetYRot - card.rotation.y) * 0.05

      glow.rotation.x = card.rotation.x * 0.4
      glow.rotation.y = card.rotation.y * 0.4

      // Orbiting orbs
      orbs.forEach((orb) => {
        const { radius, inclination, phase, speed } = orb.userData as {
          radius: number
          inclination: number
          phase: number
          speed: number
        }
        const angle = t * speed + phase
        orb.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 0.6) * 0.9 + Math.sin(inclination) * 0.6,
          Math.sin(angle) * radius * 0.6,
        )
        orb.lookAt(camera.position) // billboard
        const breathe = 0.85 + Math.sin(t * 2 + phase) * 0.15
        orb.scale.setScalar(breathe)
      })

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

 /* Cleanup */
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      mount.removeEventListener("pointermove", handlePointer)
      mount.removeEventListener("pointerleave", handleLeave)

      orbs.forEach((o) => {
        o.geometry.dispose()
        ;(o.material as THREE.Material).dispose()
      })
      orbTex.dispose()
      glowGeom.dispose()
      glowMat.dispose()
      glowTex.dispose()
      frontTex.dispose()
      backTex.dispose()
      cardGeom.dispose()
      edgeMat.dispose()
      frontMat.dispose()
      backMat.dispose()
      edges.dispose()
      edgesMat.dispose()

      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [name, title, email, handle, size, edgeColor])

  return (
    <div
      ref={mountRef}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    />
  )
}

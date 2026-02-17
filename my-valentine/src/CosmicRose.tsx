import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
  r: number
  g: number
  b: number
  angle: number
  power: number
}

export default function CosmicRose() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const scatter = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const centerX = w / 2
    const centerY = h / 2

    const img = new Image()
    img.src = "/rose-flower-silhouette-free-svg-file.png"

    img.onload = () => {
      const scale = Math.min(w, h) * 0.75

      const off = document.createElement("canvas")
      off.width = scale
      off.height = scale
      const octx = off.getContext("2d")!

      octx.clearRect(0, 0, scale, scale)
      octx.drawImage(img, 0, 0, scale, scale)

      const data = octx.getImageData(0, 0, scale, scale).data
      particles.current = []

      for (let y = 0; y < scale; y += 3) {
        for (let x = 0; x < scale; x += 3) {
          const i = (y * scale + x) * 4
          const alpha = data[i + 3]

          if (alpha > 20) {
            const px = centerX + x - scale / 2
            const py = centerY + y - scale / 2

            particles.current.push({
              x: px,
              y: py,
              ox: px,
              oy: py,
              vx: 0,
              vy: 0,
              r: data[i],
              g: data[i + 1],
              b: data[i + 2],
              angle: Math.random() * Math.PI * 2,
              power: Math.random() * 6 + 4,
            })
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles.current) {
        if (scatter.current) {
          // TRUE RANDOM RADIAL DISPERSION
          p.vx += Math.cos(p.angle) * p.power * 0.15
          p.vy += Math.sin(p.angle) * p.power * 0.15
        } else {
          // MAGNETIC RETURN TO ROSE
          p.vx += (p.ox - p.x) * 0.03
          p.vy += (p.oy - p.y) * 0.03
        }

        // DAMPING
        p.vx *= 0.92
        p.vy *= 0.92
        p.x += p.vx
        p.y += p.vy

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.9, 0, Math.PI * 2)

        ctx.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`
        ctx.shadowColor = `rgba(${p.r}, ${p.g}, ${p.b}, 0.9)`
        ctx.shadowBlur = 14
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onClick={() => {
        scatter.current = true
        setTimeout(() => (scatter.current = false), 3000)
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        background: "transparent",
        cursor: "pointer",
      }}
    />
  )
}

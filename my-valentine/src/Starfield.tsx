import { useEffect, useRef } from "react"

type Star = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  depth: number
  hue: number
  heat: number
}

type Well = {
  x: number
  y: number
  mass: number
  vx: number
  vy: number
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const blackHole = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const STAR_COUNT = 900
    const stars: Star[] = []

    for (let i = 0; i < STAR_COUNT; i++) {
      const depth = Math.random()
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        size: 0.5 + depth * 2,
        depth,
        hue: 190 + Math.random() * 60,
        heat: 0,
      })
    }

    // gravity wells
    const wells: Well[] = Array.from({ length: 2 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      mass: 120,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
    }))

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", e => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    })

    window.addEventListener("mousedown", () => {
      blackHole.current = true
    })
    window.addEventListener("mouseup", () => {
      blackHole.current = false
    })

    // ✴️ supernova on click
    window.addEventListener("click", e => {
      for (const s of stars) {
        const dx = s.x - e.clientX
        const dy = s.y - e.clientY
        const d = Math.hypot(dx, dy)
        if (d < 180) {
          const force = (1 - d / 180) * 6
          s.vx += (dx / d) * force
          s.vy += (dy / d) * force
          s.heat = 1
        }
      }
    })

    let time = 0

    function noise(x: number, y: number) {
      return (
        Math.sin(x * 0.002 + time * 0.0005) +
        Math.cos(y * 0.002 - time * 0.0004)
      )
    }

    function animate() {
      time++

      // trails
      ctx.fillStyle = "rgba(0,0,0,0.07)"
      ctx.fillRect(0, 0, w, h)

      // drift gravity wells
      for (const g of wells) {
        g.x += g.vx
        g.y += g.vy

        if (g.x < 0) g.x += w
        if (g.x > w) g.x -= w
        if (g.y < 0) g.y += h
        if (g.y > h) g.y -= h
      }

      for (const s of stars) {
        // noise drift
        const a = noise(s.x, s.y)
        s.vx += Math.cos(a) * 0.02 * s.depth
        s.vy += Math.sin(a) * 0.02 * s.depth

        // gravity wells influence
        for (const g of wells) {
          const dx = g.x - s.x
          const dy = g.y - s.y
          const d = Math.hypot(dx, dy) + 0.1
          const pull = (g.mass / (d * d)) * 0.6
          s.vx += (dx / d) * pull
          s.vy += (dy / d) * pull
        }

        // 🌀 black hole cursor
        const mx = mouse.current.x
        const my = mouse.current.y
        const dx = mx - s.x
        const dy = my - s.y
        const dist = Math.hypot(dx, dy)

        if (dist < 260) {
          const strength = (1 - dist / 260) * 1.2
          const spiral = blackHole.current ? 1 : -1
          s.vx += (-dy / dist) * strength * spiral
          s.vy += (dx / dist) * strength * spiral

          if (blackHole.current) {
            s.vx += (dx / dist) * strength * 0.8
            s.vy += (dy / dist) * strength * 0.8
          }
        }

        s.x += s.vx
        s.y += s.vy

        s.vx *= 0.985
        s.vy *= 0.985

        if (s.x < 0) s.x += w
        if (s.x > w) s.x -= w
        if (s.y < 0) s.y += h
        if (s.y > h) s.y -= h

        // heat decay
        s.heat *= 0.94

        const speed = Math.hypot(s.vx, s.vy)
        const hue = s.hue + speed * 140 + s.heat * 120

        ctx.beginPath()
        ctx.fillStyle = `hsla(${hue},90%,${70 + s.heat * 20}%,0.9)`
        ctx.shadowBlur = 14 * s.depth + s.heat * 20
        ctx.shadowColor = `hsla(${hue},90%,70%,1)`
        ctx.arc(s.x, s.y, s.size + s.heat * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.shadowBlur = 0
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "black",
        zIndex: -1,
      }}
    />
  )
}
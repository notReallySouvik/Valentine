import { useEffect, useRef, useState } from "react"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

export default function FourthPage({ onNext }: { onNext: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const audioRef = useRef<HTMLAudioElement>(null)

    const [line2Visible, setLine2Visible] = useState(false)
    const [line3Visible, setLine3Visible] = useState(false)
    const [typedText, setTypedText] = useState("")
    const [showSecret, setShowSecret] = useState(false)

    const finalLine = "You make my universe brighter."

    /* TEXT REVEAL TIMING */

    useEffect(() => {
        setTimeout(() => setLine2Visible(true), 2200)
        setTimeout(() => setLine3Visible(true), 4200)
    }, [])

    /* TYPEWRITER */

    useEffect(() => {
        let i = 0

        const interval = setInterval(() => {
            setTypedText(finalLine.slice(0, i))
            i++
            if (i > finalLine.length) clearInterval(interval)
        }, 110)

        return () => clearInterval(interval)
    }, [])

    /* AUDIO */

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = 0.15
    }, [])

    /* BACKGROUND ANIMATION */

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let w = (canvas.width = window.innerWidth)
        let h = (canvas.height = window.innerHeight)

        const petals: any[] = []
        const stars: any[] = []

        for (let i = 0; i < 40; i++) {
            petals.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 6 + 4,
                speed: Math.random() * 0.25 + 0.15,
                drift: Math.random() * 0.2 - 0.1,
                rotation: Math.random() * Math.PI,
            })
        }

        const spawnStar = () => {
            stars.push({
                x: Math.random() * w,
                y: Math.random() * h * 0.5,
                vx: 4,
                vy: 1.5,
                life: 0,
            })
        }

        setInterval(spawnStar, 12000)

        const animate = () => {
            ctx.clearRect(0, 0, w, h)

            ctx.fillStyle = "rgba(255,120,150,0.85)"

            petals.forEach((p) => {
                p.y += p.speed
                p.x += p.drift
                p.rotation += 0.01

                if (p.y > h) {
                    p.y = -10
                    p.x = Math.random() * w
                }

                ctx.save()
                ctx.translate(p.x, p.y)
                ctx.rotate(p.rotation)

                ctx.beginPath()
                ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2)
                ctx.fill()

                ctx.restore()
            })

            stars.forEach((s, i) => {
                s.x += s.vx
                s.y += s.vy
                s.life++

                ctx.strokeStyle = "white"
                ctx.lineWidth = 2

                ctx.beginPath()
                ctx.moveTo(s.x, s.y)
                ctx.lineTo(s.x - 80, s.y - 25)
                ctx.stroke()

                if (s.life > 35) stars.splice(i, 1)
            })

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
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontFamily: "'Playfair Display', serif",
            }}
        >
            {/* BACKGROUND */}

            <canvas
                ref={canvasRef}
                style={{ position: "absolute", inset: 0 }}
            />

            {/* MUSIC */}

            <audio ref={audioRef} autoPlay loop>
                <source src="/love-theme.mp3" type="audio/mpeg" />
            </audio>

            {/* CONTENT */}

            <div style={{ zIndex: 2, maxWidth: "800px", padding: "2rem" }}>
                <h1
                    style={{
                        fontSize: "clamp(2.5rem,6vw,4rem)",
                        textShadow: "0 0 20px rgba(255,120,150,0.8)",
                        marginBottom: "2rem",
                        animation: "fadeIn 3s",
                    }}
                >
                    Happy Valentine's Day My Dearest
                </h1>

                {/* LINE 1 */}

                <p
                    style={{
                        fontSize: "1.3rem",
                        minHeight: "2.5rem",
                        marginBottom: "1rem",
                        opacity: line2Visible ? 1 : 0,
                        transition: "opacity 2.5s ease",
                    }}
                >
                    Every moment with you feels like a page from the most beautiful story.
                </p>

                {/* LINE 2 */}

                <p
                    style={{
                        fontSize: "1.3rem",
                        minHeight: "3rem",
                        marginBottom: "2rem",
                        opacity: line3Visible ? 1 : 0,
                        transition: "opacity 2.5s ease",
                    }}
                >
                    And if the universe gave me a thousand lifetimes, I would still choose
                    you on every single one.
                </p>

                {/* TYPEWRITER */}

                <h2
                    style={{
                        fontSize: "clamp(1.8rem,4vw,2.6rem)",
                        color: "#ff8fb3",
                        minHeight: "3rem",
                    }}
                >
                    {typedText}
                </h2>

                {/* HEART */}

                <div
                    style={{
                        fontSize: "3rem",
                        marginTop: "2rem",
                        animation: "heartbeat 4s infinite",
                    }}
                >
                    ❤️
                </div>

                {/* BUTTON */}

                <button
                    onClick={() => setShowSecret(true)}
                    style={{
                        marginTop: "2rem",
                        padding: "0.7rem 1.4rem",
                        borderRadius: "999px",
                        border: "none",
                        background: "rgba(255,255,255,0.08)",
                        color: "white",
                        cursor: "pointer",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    One more thing...
                </button>

                {/* SECRET MESSAGE */}

                <p
                    style={{
                        marginTop: "1.5rem",
                        fontSize: "1.2rem",
                        color: "#ffd6e6",
                        minHeight: "2rem",
                        opacity: showSecret ? 1 : 0,
                        transition: "opacity 2.5s ease",
                    }}
                >
                    No matter how many pages life turns…
                    I hope I always get to read them with you.
                </p>
            </div>

            {/* NEXT BUTTON */}
            <div style={{ paddingTop: "4rem" }}>
                <button
                    onClick={onNext}
                    style={{
                        position: "absolute",
                        bottom: "8%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.9)",
                        background: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 0 1.6em rgba(255,180,200,0.45)",
                    }}
                >
                    <ArrowRightIcon style={{ width: "32px", height: "32px", color: "white" }} />
                </button>
            </div>

            <style>{`
        @keyframes fadeIn{
          from{opacity:0; transform:translateY(30px);}
          to{opacity:1; transform:translateY(0);}
        }

        @keyframes heartbeat{
          0%{transform:scale(1)}
          20%{transform:scale(1.15)}
          40%{transform:scale(1)}
          60%{transform:scale(1.15)}
          100%{transform:scale(1)}
        }
      `}</style>
        </div>
    )
}
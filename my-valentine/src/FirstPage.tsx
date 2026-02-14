import { useEffect, useState } from "react"
import Starfield from "./Starfield"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

// Heart SVG with heartbeat animation
const HeartSVG = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="red"
    width={size}
    height={size}
    style={{
      display: "inline-block",
      verticalAlign: "middle",
      animation: "heartbeat 1.2s infinite",
    }}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
)

export default function FirstPage({ onNext }: { onNext: () => void }) {
  const romanticLines = [
    "Every star in this sky whispers my love for you.",
    "Even the universe pauses to admire your smile.",
    "You’re the spark that lights up my darkest nights.",
    "In every corner of space, I see echoes of us together.",
    "My heart orbits you endlessly, like stars in your sky.",
    "You are the poetry that the cosmos always remembers.",
  ]

  const [lineIndex, setLineIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setLineIndex((prev) => (prev + 1) % romanticLines.length)
        setFade(true)
      }, 1000)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Open Sans', sans-serif",
        color: "white",
      }}
    >
      {/* Starfield */}
      <Starfield />

      {/* Header */}
      <header
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
          fontSize: "1.4rem",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          textShadow: "0 0 8px rgba(255,100,120,0.7)",
          zIndex: 2,
        }}
      >
        <HeartSVG size={24} /> For my Valentine
      </header>

      {/* Body */}
      <main
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.6rem",
          textAlign: "center",
          maxWidth: "600px",
          lineHeight: 1.5,
          opacity: fade ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          textShadow: "0 0 12px rgba(255,180,200,0.6)",
          zIndex: 2,
        }}
      >
        {romanticLines[lineIndex]}
      </main>

      {/* Circular Next Button with larger Heroicon arrow */}
      <button
        onClick={onNext}
        style={{
          position: "absolute",
          bottom: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          border: "2px solid white",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 2,
        }}
      >
        <ArrowRightIcon style={{ width: "32px", height: "32px", color: "white" }} />
      </button>

      {/* Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2rem",
          paddingRight: "2.5rem",
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "white",
          zIndex: 2,
          boxSizing: "border-box",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", textShadow: "0 0 8px rgba(255,180,200,0.6)" }}>
          <HeartSVG size={18} /> MADE WITH LOVE
        </span>
        <span style={{ color: "white", fontSize: "1rem", fontWeight: 600, textShadow: "0 0 12px rgba(255,100,120,0.8), 0 0 20px rgba(255,100,120,0.6)" }}>2026</span>
      </footer>

      {/* Heartbeat animation */}
      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

import { useEffect, useState } from "react"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import CosmicRose from "./CosmicRose.tsx"

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
      {/* Cosmic Rose */}
      <CosmicRose />
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
          border: "2px solid rgba(255,255,255,0.9)",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 2,
          boxShadow: "0 0 1.6em rgba(255,180,200,0.45)",
        }}
      >
        <ArrowRightIcon style={{ width: "32px", height: "32px", color: "white" }} />
      </button>
    </div>
  )
}
import React, { useState } from "react"
import Starfield from "./Starfield"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

// Heart SVG (reuse)
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

const photos = [
  "https://source.unsplash.com/random/400x300?sig=1",
  "https://source.unsplash.com/random/400x300?sig=2",
  "https://source.unsplash.com/random/400x300?sig=3",
  "https://source.unsplash.com/random/400x300?sig=4",
  "https://source.unsplash.com/random/400x300?sig=5",
  "https://source.unsplash.com/random/400x300?sig=6",
]

export default function SecondPage({ onNext }: { onNext: () => void }) {
  const [index, setIndex] = useState(0)

  const nextPhoto = () => {
    setIndex((prev) => (prev + 1) % photos.length)
  }

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
      {/* Starfield background */}
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
          textAlign: "center",
          zIndex: 2,
        }}
      >
        {/* Title */}
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem", textShadow: "0 0 12px rgba(255,180,200,0.6)" }}>
          OUR MOMENTS
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem", textShadow: "0 0 8px rgba(255,180,200,0.5)" }}>
          Memories we have created together
        </p>

        {/* Card photo carousel */}
        <div
          style={{
            width: "400px",
            height: "300px",
            position: "relative",
            perspective: "1000px",
            margin: "0 auto",
          }}
        >
          {photos.map((photo, i) => {
            const offset = i - index
            const isActive = i === index

            return (
              <img
                key={i}
                src={photo}
                alt={`Moment ${i + 1}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  objectFit: "cover",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
                  transform: `translateX(${offset * 50}px) scale(${isActive ? 1 : 0.9})`,
                  opacity: isActive ? 1 : 0.6,
                  zIndex: isActive ? 10 : 10 - Math.abs(offset),
                  transition: "all 0.6s ease-in-out",
                }}
              />
            )
          })}
        </div>
      </main>

      {/* Next Button */}
      <button
        onClick={nextPhoto}
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
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 2rem",
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "white",
          zIndex: 2,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", textShadow: "0 0 8px rgba(255,180,200,0.6)" }}>
          <HeartSVG size={18} /> MADE WITH LOVE
        </span>
        <span style={{ color: "white", textShadow: "0 0 4px rgba(255,180,200,0.3)" }}>2026</span>
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

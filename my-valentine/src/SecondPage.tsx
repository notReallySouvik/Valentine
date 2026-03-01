//import React from 'react'
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { CarouselCrossfadeExample } from "./Carousel"
import "bootstrap/dist/css/bootstrap.min.css"
import "@coreui/coreui/dist/css/coreui.min.css" // Ensure CoreUI styles are loaded!

const photos = [
  "https://images.unsplash.com/photo-1770838917379-32208420ea9a?w=800&q=80",
  "https://images.unsplash.com/photo-1729188430325-eb540fcdd941?w=800&q=80",
  "https://images.unsplash.com/photo-1769990035609-1438883361d9?w=800&q=80",
  "https://images.unsplash.com/photo-1770009079291-82b8a594ee23?w=800&q=80",
  "https://images.unsplash.com/photo-1770839012299-fb0130e5ec67?w=800&q=80",
  "https://images.unsplash.com/photo-1770753105322-fdca548966b0?w=800&q=80",
]

export default function SecondPage({ onNext }: { onNext: () => void }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        color: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <main
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(1.5rem, 3.5vw, 4rem)",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(1.5rem, 4vw, 4rem)",
            maxWidth: "92vw",
          }}
        >
          {/* TEXT BLOCK */}
          <div
            style={{
              flex: "1 1 280px",
              maxWidth: "min(90vw, 520px)",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 5.5vw, 3.4rem)",
                letterSpacing: "0.14em",
                marginBottom: "1rem",
                textShadow: "0 0 1em rgba(255,180,200,0.65)",
              }}
            >
              OUR MOMENTS
            </h1>
            <p style={{ fontSize: "1.1rem", opacity: 0.8 }}>
              Memories we have created together...
            </p>
          </div>

          {/* CAROUSEL - Pass the photos prop here */}
          <div style={{ flex: "1 1 320px", maxWidth: "min(90vw, 400px)" }}>
            <CarouselCrossfadeExample photos={photos} />
          </div>
        </div>
      </main>

      {/* NEXT BUTTON */}
      <div style={{ position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>

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
    </div>
  )
}
import { useEffect, useState } from "react"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { CarouselCrossfadeExample } from "./Carousel"
import "bootstrap/dist/css/bootstrap.min.css"
import "@coreui/coreui/dist/css/coreui.min.css"

const photos = [
  "https://images.unsplash.com/photo-1770838917379-32208420ea9a?w=800&q=80",
  "https://images.unsplash.com/photo-1729188430325-eb540fcdd941?w=800&q=80",
  "https://images.unsplash.com/photo-1769990035609-1438883361d9?w=800&q=80",
  "https://images.unsplash.com/photo-1770009079291-82b8a594ee23?w=800&q=80",
  "https://images.unsplash.com/photo-1770839012299-fb0130e5ec67?w=800&q=80",
  "https://images.unsplash.com/photo-1770753105322-fdca548966b0?w=800&q=80",
]

// 🔹 Small hook to track screen width
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return width
}

export default function SecondPage({ onNext }: { onNext: () => void }) {
  const width = useWindowWidth()

  // 🔹 Decide when layout switches
  const isVerticalLayout = width < 900

  const NextButton = (
    <button
      onClick={onNext}
      style={{
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
        margin: "2rem auto",
        transition: "transform 0.25s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      <ArrowRightIcon style={{ width: "32px", height: "32px", color: "white" }} />
    </button>
  )

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
          padding: "clamp(1.2rem, 3vw, 4rem)",
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

            <p
              style={{
                fontSize: "1.05rem",
                opacity: 0.8,
                paddingBottom: isVerticalLayout ? "1rem" : "2rem",
              }}
            >
              Memories we have created together...
            </p>

            {/* 👉 Button stays here ONLY on wide screens */}
            {!isVerticalLayout && NextButton}
          </div>

          {/* CAROUSEL */}
          <div
            className="carousel-container-fix"
            style={{
              width: "100%",
              maxWidth: "min(95vw, 600px)",
              maxHeight: "60vh",
              marginTop: isVerticalLayout ? "0" : "-20%",
            }}
          >
            <CarouselCrossfadeExample photos={photos} />
          </div>
        </div>
      </main>

      {/* 👉 Button moves BELOW carousel ONLY on vertical screens */}
      {isVerticalLayout && (
        <div
          style={{
            position: "absolute",
            bottom: "2vh",
            scale: "0.8",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
          }}
        >
          {NextButton}
        </div>
      )}
    </div>
  )
}
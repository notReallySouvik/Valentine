import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Carousel } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const photos = [
  "https://images.unsplash.com/photo-1770838917379-32208420ea9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1770009079291-82b8a594ee23?w=900&auto=format&fit=crop&q=80https://images.unsplash.com/photo-1729188430325-eb540fcdd941?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1769990035609-1438883361d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1770009079291-82b8a594ee23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1770839012299-fb0130e5ec67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1770753105322-fdca548966b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjl8fHxlbnwwfHx8fHw%3D",
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
      {/* MAIN CONTENT */}
      <main
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(1.5rem, 3.5vw, 4rem)", // reduced vertical padding
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
        >{/* TEXT BLOCK */}
          <div
            style={{
              flex: "1 1 280px",
              maxWidth: "min(90vw, 520px)",
              textAlign: "center",
              marginBottom: "clamp(0.6rem, 3vw, 2rem)", // 👈 reduces space ONLY when stacked
            }}
          >

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 5.5vw, 3.4rem)",
                letterSpacing: "clamp(0.08em, 0.3vw, 0.14em)",
                marginBottom: "clamp(0.6rem, 1.2vw, 1rem)",
                lineHeight: 1.15,
                textShadow: "0 0 1em rgba(255,180,200,0.65)",
                wordBreak: "break-word",
              }}
            >
              OUR MOMENTS
            </h1>

            <p
              style={{
                fontSize: "clamp(0.95rem, 2.8vw, 1.35rem)",
                lineHeight: "clamp(1.4, 3vw, 1.75)",
                opacity: 0.88,
                maxWidth: "42ch",
                margin: "0 auto",
                textShadow: "0 0 1em rgba(255,180,200,0.35)",
              }}
            >
              Memories we have created together — fragments of time drifting like
              constellations, always finding their way back to us.
            </p>
          </div>
          {/* CAROUSEL */}
          <div
            style={{
              flex: "1 1 360px",
              width: "min(48vw, 600px)",               // wider
              height: "clamp(260px, 42vh, 820px)",     // taller
              borderRadius: "clamp(14px, 2vw, 24px)",
              overflow: "hidden",
            }}
          >
            <Carousel interval={3200} fade style={{ height: "100%" }}>
              {photos.map((photo, i) => (
                <Carousel.Item key={i} style={{ height: "100%" }}>
                  <img
                    src={photo}
                    alt={`Moment ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "inherit",
                      boxShadow: "0 1.4em 3em rgba(0,0,0,0.65)",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </main>

      {/* NEXT BUTTON */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(1.5rem, 4vh, 3rem)", // slightly closer
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      >
        <button
          onClick={onNext}
          style={{
            width: "clamp(58px, 6.5vw, 76px)",
            height: "clamp(58px, 6.5vw, 76px)",
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
          <ArrowRightIcon
            style={{
              width: "clamp(28px, 3.2vw, 38px)",
              height: "clamp(28px, 3.2vw, 38px)",
              color: "white",
            }}
          />
        </button>
      </div>
    </div>
  )
}
import { useRef, useState } from "react"
import YouTube from "react-youtube"
import type { YouTubeEvent } from "react-youtube"
import {
  ArrowRightIcon,
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
} from "@heroicons/react/24/solid"

type VideoResult = {
  videoId: string
  title: string
  thumbnail: string
  channel: string
}

export default function ThirdPage({ onNext }: { onNext: () => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<VideoResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playerRef = useRef<any>(null)

  const API_KEY = "AIzaSyDeVQI_dZkJmO_gDgOJ4Zw-y4puDRSZPKo"

  const selected = selectedIndex !== null ? results[selectedIndex] : null

  const searchYouTube = async () => {
    if (!query.trim()) return

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      new URLSearchParams({
        part: "snippet",
        q: query,
        type: "video",
        maxResults: "3",
        videoEmbeddable: "true",
        videoSyndicated: "true",
        videoDuration: "medium",
        key: API_KEY,
      })
    )

    const data = await res.json()

    const videos: VideoResult[] = data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: `https://img.youtube.com/vi/${item.id.videoId}/maxresdefault.jpg`,
      channel: item.snippet.channelTitle,
    }))

    setResults(videos)
    setShowDropdown(true)
  }

  const onReady = (e: YouTubeEvent) => {
    playerRef.current = e.target
    e.target.pauseVideo()
  }

  const play = () => {
    playerRef.current?.playVideo()
    setIsPlaying(true)
  }

  const pause = () => {
    playerRef.current?.pauseVideo()
    setIsPlaying(false)
  }

  const nextTrack = () => {
    if (selectedIndex === null) return
    const next = (selectedIndex + 1) % results.length
    setSelectedIndex(next)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    if (selectedIndex === null) return
    const prev = (selectedIndex - 1 + results.length) % results.length
    setSelectedIndex(prev)
    setIsPlaying(false)
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SEARCH BAR */}

      <div style={{ width: "min(92vw,520px)", position: "relative" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchYouTube()}
          placeholder="Search a song..."
          style={{
            width: "100%",
            padding: "1rem 1.2rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.35)",
            background: "rgba(0,0,0,0.35)",
            color: "white",
            outline: "none",
            fontSize: "1rem",
            backdropFilter: "blur(12px)",
          }}
        />

        {/* RESULTS */}

        {showDropdown && results.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              width: "100%",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(14px)",
              borderRadius: "14px",
              overflow: "hidden",
              zIndex: 10,
            }}
          >
            {results.map((v, i) => (
              <div
                key={v.videoId}
                onClick={() => {
                  setSelectedIndex(i)
                  setShowDropdown(false)
                  setIsPlaying(false)
                }}
                style={{
                  display: "flex",
                  gap: "0.8rem",
                  padding: "0.7rem",
                  cursor: "pointer",
                }}
              >
                <img
                  src={v.thumbnail}
                  style={{
                    width: "72px",
                    height: "42px",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {v.title}
                  </div>

                  <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>
                    {v.channel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PLAYER */}

      {selected && (
        <div
          style={{
            marginTop: "2.5rem",
            width: "min(92vw,480px)",
            aspectRatio: "16 / 9",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 0 2.2em rgba(255,140,180,0.45)",
            position: "relative",
          }}
        >
          {/* THUMBNAIL */}

          <img
            src={selected.thumbnail}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />

          {/* DARK OVERLAY + CONTROLS */}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2))",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: "1.4rem",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1.8rem",
                alignItems: "center",
              }}
            >
              <BackwardIcon
                onClick={prevTrack}
                style={{ width: 34, cursor: "pointer" }}
              />

              {isPlaying ? (
                <PauseIcon
                  onClick={pause}
                  style={{ width: 42, cursor: "pointer" }}
                />
              ) : (
                <PlayIcon
                  onClick={play}
                  style={{ width: 42, cursor: "pointer" }}
                />
              )}

              <ForwardIcon
                onClick={nextTrack}
                style={{ width: 34, cursor: "pointer" }}
              />
            </div>
          </div>

          {/* HIDDEN YOUTUBE PLAYER */}

          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: -1,
            }}
          >
            <YouTube
              videoId={selected.videoId}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                },
              }}
              onReady={onReady}
            />
          </div>
        </div>
      )}

      {/* NEXT PAGE BUTTON */}

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
  )
}
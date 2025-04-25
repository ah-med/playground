import React, { useState } from "react"
import { Container } from "./components/layout/Container"
import { Grid } from "./components/layout/Grid"
import { Section } from "./components/layout/Section"
import { Toast } from "./components/feedback/Toast"
import { Alert } from "./components/feedback/Alert"
import { LoadingSpinner } from "./components/feedback/LoadingSpinner"
import { AlbumCard } from "./components/media/AlbumCard"
import { TrackList } from "./components/media/TrackList"
import { PlayerControls } from "./components/media/PlayerControls"

const tracks = [
  {
    id: "1",
    title: "The Number of the Beast",
    artist: "Iron Maiden",
    duration: "4:50",
    isPlaying: false,
  },
  {
    id: "2",
    title: "Run to the Hills",
    artist: "Iron Maiden",
    duration: "3:53",
    isPlaying: true,
  },
  {
    id: "3",
    title: "Hallowed Be Thy Name",
    artist: "Iron Maiden",
    duration: "7:11",
    isPlaying: false,
  },
]

export function App() {
  const [showToast, setShowToast] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8">Metal Player Component Library</h1>

      {/* Feedback Components */}
      <Section title="Feedback Components">
        <Grid cols={2} gap="md">
          {/* Toast Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Toast Notifications</h2>
            <div className="space-y-2">
              <button
                onClick={() => setShowToast(true)}
                className="metal-button"
              >
                Show Toast
              </button>
              {showToast && (
                <Toast
                  message="This is a demo toast notification!"
                  type="info"
                  onClose={() => setShowToast(false)}
                />
              )}
            </div>
          </div>

          {/* Alert Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Alerts</h2>
            <div className="space-y-2">
              <button
                onClick={() => setShowAlert(true)}
                className="metal-button"
              >
                Show Alert
              </button>
              {showAlert && (
                <Alert
                  title="Demo Alert"
                  message="This is a demo alert message!"
                  type="info"
                  onClose={() => setShowAlert(false)}
                />
              )}
            </div>
          </div>

          {/* Loading Spinner Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Loading Spinners</h2>
            <div className="flex gap-4">
              <LoadingSpinner size="sm" />
              <LoadingSpinner size="md" />
              <LoadingSpinner size="lg" />
            </div>
          </div>
        </Grid>
      </Section>

      {/* Media Components */}
      <Section title="Media Components">
        <Grid cols={2} gap="md">
          {/* Album Card Examples */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Album Cards</h2>
            <div className="space-y-4">
              <AlbumCard
                title="The Number of the Beast"
                artist="Iron Maiden"
                imageUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
                year="1982"
              />
              <AlbumCard
                title="Piece of Mind"
                artist="Iron Maiden"
                imageUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
                year="1983"
                duration="45:30"
              />
              <AlbumCard
                title="Powerslave"
                artist="Iron Maiden"
                imageUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
                year="1984"
                className="w-64"
              />
            </div>
          </div>

          {/* Track List Example */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Track List</h2>
            <TrackList
              tracks={tracks}
              onTrackClick={(trackId) => console.log("Track clicked:", trackId)}
            />
          </div>

          {/* Player Controls Example */}
          <div className="space-y-4 col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Player Controls</h2>
            <PlayerControls
              isPlaying={isPlaying}
              progress={progress}
              currentTime="2:30"
              duration="5:00"
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onPrevious={() => console.log("Previous clicked")}
              onNext={() => console.log("Next clicked")}
              onShuffle={() => console.log("Shuffle clicked")}
              onRepeat={() => console.log("Repeat clicked")}
              onProgressChange={setProgress}
            />
          </div>
        </Grid>
      </Section>
    </Container>
  )
}

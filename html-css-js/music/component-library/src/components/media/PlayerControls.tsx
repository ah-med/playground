import { cn } from "@/styles/theme-utils"
import { useState } from "react"

interface PlayerControlsProps {
    isPlaying: boolean
    onPlayPause: () => void
    onNext: () => void
    onPrevious: () => void
    onShuffle: () => void
    onRepeat: () => void
    progress: number
    onProgressChange: (value: number) => void
    currentTime: string
    duration: string
    className?: string
}

export function PlayerControls({
    isPlaying,
    onPlayPause,
    onNext,
    onPrevious,
    onShuffle,
    onRepeat,
    progress,
    onProgressChange,
    currentTime,
    duration,
    className,
}: PlayerControlsProps) {
    const [isDragging, setIsDragging] = useState(false)

    return (
        <div className={cn("metal-player-controls", className)}>
            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
                <button
                    className="metal-button p-2"
                    onClick={onShuffle}
                    aria-label="Shuffle"
                >
                    <i className="fas fa-random" />
                </button>
                <button
                    className="metal-button p-2"
                    onClick={onPrevious}
                    aria-label="Previous"
                >
                    <i className="fas fa-step-backward" />
                </button>
                <button
                    className="metal-button p-4 rounded-full"
                    onClick={onPlayPause}
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    <i className={`fas ${isPlaying ? "fa-pause" : "fa-play"} text-xl`} />
                </button>
                <button
                    className="metal-button p-2"
                    onClick={onNext}
                    aria-label="Next"
                >
                    <i className="fas fa-step-forward" />
                </button>
                <button
                    className="metal-button p-2"
                    onClick={onRepeat}
                    aria-label="Repeat"
                >
                    <i className="fas fa-redo" />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-metal-muted)]">{currentTime}</span>
                <div
                    className="metal-slider flex-1 h-1 bg-[var(--color-metal-border)] rounded-full cursor-pointer relative"
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                >
                    <div
                        className="metal-slider-progress absolute h-full bg-[var(--color-metal-accent)] rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-sm text-[var(--color-metal-muted)]">{duration}</span>
            </div>
        </div>
    )
} 
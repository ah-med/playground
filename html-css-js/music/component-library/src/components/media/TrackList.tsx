import { cn } from "@/styles/theme-utils"

interface Track {
    id: string
    title: string
    artist: string
    duration: string
    isPlaying?: boolean
    imageUrl?: string
}

interface TrackListProps {
    tracks: Track[]
    onTrackClick?: (track: Track) => void
    className?: string
}

export function TrackList({ tracks, onTrackClick, className }: TrackListProps) {
    return (
        <div className={cn("metal-track-list space-y-2", className)}>
            {tracks.map((track) => (
                <div
                    key={track.id}
                    className={cn(
                        "metal-track-item group grid grid-cols-[auto_1fr_auto] items-center gap-4 p-3 rounded-lg transition-all duration-300",
                        track.isPlaying && "bg-[var(--color-metal-highlight)]"
                    )}
                    onClick={() => onTrackClick?.(track)}
                >
                    {/* Track Number/Play Button */}
                    <div className="flex items-center justify-center w-8 h-8 text-[var(--color-metal-muted)]">
                        {track.isPlaying ? (
                            <i className="fas fa-play text-[var(--color-metal-accent)]" />
                        ) : (
                            <span className="group-hover:hidden">{track.id}</span>
                        )}
                        <button className="hidden group-hover:block metal-button p-2">
                            <i className="fas fa-play" />
                        </button>
                    </div>

                    {/* Track Info */}
                    <div className="flex items-center gap-4 min-w-0">
                        {track.imageUrl && (
                            <img
                                src={track.imageUrl}
                                alt={track.title}
                                className="w-10 h-10 rounded object-cover"
                            />
                        )}
                        <div className="min-w-0">
                            <h4 className="metal-title truncate">{track.title}</h4>
                            <p className="metal-subtitle truncate">{track.artist}</p>
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="text-[var(--color-metal-muted)]">{track.duration}</div>
                </div>
            ))}
        </div>
    )
} 
import { cn } from "@/styles/theme-utils"

interface AlbumCardProps {
    title: string
    artist: string
    imageUrl: string
    year?: string
    duration?: string
    onClick?: () => void
    className?: string
}

export function AlbumCard({
    title,
    artist,
    imageUrl,
    year,
    duration,
    onClick,
    className,
}: AlbumCardProps) {
    return (
        <div
            className={cn(
                "metal-card group cursor-pointer transition-all duration-300 hover:scale-105",
                className
            )}
            onClick={onClick}
        >
            {/* Album Art */}
            <div className="metal-album-art relative aspect-square overflow-hidden rounded-lg">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button className="metal-button rounded-full p-4">
                        <i className="fas fa-play text-2xl" />
                    </button>
                </div>
            </div>

            {/* Album Info */}
            <div className="p-4">
                <h3 className="metal-title mb-1 line-clamp-1">{title}</h3>
                <p className="metal-subtitle mb-2 line-clamp-1">{artist}</p>
                <div className="flex items-center justify-between text-sm text-[var(--color-metal-muted)]">
                    {year && <span>{year}</span>}
                    {duration && <span>{duration}</span>}
                </div>
            </div>
        </div>
    )
} 
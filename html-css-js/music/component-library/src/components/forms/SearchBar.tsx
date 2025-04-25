import { cn } from "@/styles/theme-utils"
import { useState } from "react"

interface SearchBarProps {
    onSearch: (query: string) => void
    placeholder?: string
    className?: string
}

export function SearchBar({
    onSearch,
    placeholder = "Search songs, artists, albums...",
    className,
}: SearchBarProps) {
    const [query, setQuery] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("metal-search-bar relative", className)}
        >
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="metal-input w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--color-metal-card-bg)] border-2 border-[var(--color-metal-border)] text-[var(--color-metal-text)] placeholder-[var(--color-metal-muted)] focus:outline-none focus:border-[var(--color-metal-accent)] transition-colors"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-[var(--color-metal-muted)]" />
                </div>
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center metal-button"
                    >
                        <i className="fas fa-times text-[var(--color-metal-muted)]" />
                    </button>
                )}
            </div>
        </form>
    )
} 
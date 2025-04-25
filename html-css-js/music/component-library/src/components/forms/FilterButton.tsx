import { cn } from "@/styles/theme-utils"
import { useState } from "react"

interface FilterOption {
    label: string
    value: string
}

interface FilterButtonProps {
    label: string
    options: FilterOption[]
    selectedValue?: string
    onChange: (value: string) => void
    className?: string
}

export function FilterButton({
    label,
    options,
    selectedValue,
    onChange,
    className,
}: FilterButtonProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={cn("relative", className)}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "metal-button flex items-center gap-2 px-4 py-2 rounded-lg",
                    selectedValue && "bg-[var(--color-metal-highlight)]"
                )}
            >
                <span>{label}</span>
                <i className={`fas fa-chevron-down transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-[var(--color-metal-card-bg)] border-2 border-[var(--color-metal-border)] shadow-lg z-50">
                        <div className="py-1">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value)
                                        setIsOpen(false)
                                    }}
                                    className={cn(
                                        "w-full px-4 py-2 text-left hover:bg-[var(--color-metal-highlight)] transition-colors",
                                        selectedValue === option.value && "bg-[var(--color-metal-highlight)]"
                                    )}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
} 
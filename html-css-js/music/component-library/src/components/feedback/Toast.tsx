import { cn } from "@/styles/theme-utils"
import { useEffect, useState } from "react"

interface ToastProps {
    message: string
    type?: "success" | "error" | "info" | "warning"
    duration?: number
    onClose: () => void
    className?: string
}

export function Toast({
    message,
    type = "info",
    duration = 3000,
    onClose,
    className,
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 300) // Wait for fade out animation
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const typeStyles = {
        success: "bg-[var(--color-metal-success)] border-[var(--color-metal-success)]",
        error: "bg-[var(--color-metal-error)] border-[var(--color-metal-error)]",
        warning: "bg-[var(--color-metal-warning)] border-[var(--color-metal-warning)]",
        info: "bg-[var(--color-metal-info)] border-[var(--color-metal-info)]",
    }

    return (
        <div
            className={cn(
                "metal-toast fixed bottom-4 right-4 px-4 py-3 rounded-lg border-2 shadow-lg transform transition-all duration-300",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                typeStyles[type],
                className
            )}
        >
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                    {type === "success" && <i className="fas fa-check-circle" />}
                    {type === "error" && <i className="fas fa-exclamation-circle" />}
                    {type === "warning" && <i className="fas fa-exclamation-triangle" />}
                    {type === "info" && <i className="fas fa-info-circle" />}
                </div>
                <p className="text-sm font-medium">{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(onClose, 300)
                    }}
                    className="ml-4 flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                    <i className="fas fa-times" />
                </button>
            </div>
        </div>
    )
} 
import { cn } from "@/styles/theme-utils"

interface AlertProps {
    title?: string
    message: string
    type?: "success" | "error" | "info" | "warning"
    onClose?: () => void
    className?: string
}

export function Alert({
    title,
    message,
    type = "info",
    onClose,
    className,
}: AlertProps) {
    const typeStyles = {
        success: "bg-[var(--color-metal-success)] border-[var(--color-metal-success)]",
        error: "bg-[var(--color-metal-error)] border-[var(--color-metal-error)]",
        warning: "bg-[var(--color-metal-warning)] border-[var(--color-metal-warning)]",
        info: "bg-[var(--color-metal-info)] border-[var(--color-metal-info)]",
    }

    return (
        <div
            className={cn(
                "metal-alert rounded-lg border-2 p-4",
                typeStyles[type],
                className
            )}
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-0.5">
                    {type === "success" && <i className="fas fa-check-circle text-xl" />}
                    {type === "error" && <i className="fas fa-exclamation-circle text-xl" />}
                    {type === "warning" && <i className="fas fa-exclamation-triangle text-xl" />}
                    {type === "info" && <i className="fas fa-info-circle text-xl" />}
                </div>
                <div className="flex-1">
                    {title && (
                        <h3 className="text-sm font-medium mb-1">{title}</h3>
                    )}
                    <p className="text-sm">{message}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                        <i className="fas fa-times" />
                    </button>
                )}
            </div>
        </div>
    )
} 
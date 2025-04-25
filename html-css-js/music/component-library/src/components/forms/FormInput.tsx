import { cn } from "@/styles/theme-utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    icon?: React.ReactNode
}

export function FormInput({
    label,
    error,
    icon,
    className,
    ...props
}: FormInputProps) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-[var(--color-metal-text)]">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    className={cn(
                        "metal-input w-full rounded-lg bg-[var(--color-metal-card-bg)] border-2 border-[var(--color-metal-border)] text-[var(--color-metal-text)] placeholder-[var(--color-metal-muted)] focus:outline-none focus:border-[var(--color-metal-accent)] transition-colors",
                        icon && "pl-10",
                        error && "border-[var(--color-metal-error)]",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-sm text-[var(--color-metal-error)]">{error}</p>
            )}
        </div>
    )
} 
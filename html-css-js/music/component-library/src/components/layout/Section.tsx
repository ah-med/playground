import { cn } from "@/styles/theme-utils"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    title?: string
    subtitle?: string
    variant?: 'default' | 'card' | 'highlight'
}

export function Section({
    children,
    className,
    title,
    subtitle,
    variant = 'default',
    ...props
}: SectionProps) {
    const variantClasses = {
        default: 'bg-[var(--color-background)]',
        card: 'metal-container',
        highlight: 'bg-[var(--color-metal-highlight)]'
    }

    return (
        <section
            className={cn(
                'py-8 sm:py-12 lg:py-16',
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {variant === 'card' && <div className="metal-texture" />}
            {(title || subtitle) && (
                <div className="mb-8">
                    {title && <h2 className="metal-title text-2xl sm:text-3xl mb-2">{title}</h2>}
                    {subtitle && <p className="metal-subtitle">{subtitle}</p>}
                </div>
            )}
            {children}
        </section>
    )
} 
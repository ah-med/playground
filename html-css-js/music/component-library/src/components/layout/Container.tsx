import { cn } from "@/styles/theme-utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    variant?: 'default' | 'card' | 'section'
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({
    children,
    className,
    variant = 'default',
    size = 'lg',
    ...props
}: ContainerProps) {
    const sizeClasses = {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1400px]',
        full: 'max-w-full'
    }

    const variantClasses = {
        default: 'bg-[var(--color-background)]',
        card: 'metal-container',
        section: 'bg-[var(--color-background-alt)]'
    }

    return (
        <div
            className={cn(
                'mx-auto px-4 sm:px-6 lg:px-8',
                sizeClasses[size],
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {variant === 'card' && <div className="metal-texture" />}
            {children}
        </div>
    )
} 
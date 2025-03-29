import { cn } from "@/styles/theme-utils"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav className={cn("metal-breadcrumb", className)} aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                {items.map((item, index) => (
                    <li key={item.label} className="flex items-center">
                        {index > 0 && (
                            <span className="mx-2 text-[var(--color-metal-muted)]">
                                <i className="fas fa-chevron-right" />
                            </span>
                        )}
                        {item.href ? (
                            <a
                                href={item.href}
                                className="metal-breadcrumb-link hover:text-[var(--color-metal-accent)] transition-colors"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <span className="metal-breadcrumb-current">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
} 
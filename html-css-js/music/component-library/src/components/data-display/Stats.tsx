import { cn } from "@/styles/theme-utils"

interface StatItem {
    label: string
    value: string | number
    icon?: React.ReactNode
    trend?: {
        value: number
        isPositive: boolean
    }
}

interface StatsProps {
    items: StatItem[]
    className?: string
}

export function Stats({ items, className }: StatsProps) {
    return (
        <div className={cn("metal-stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="metal-stat-card p-4 rounded-lg border-2 border-[var(--color-metal-border)] bg-[var(--color-metal-card-bg)]"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="metal-stat-icon w-10 h-10 rounded-full bg-[var(--color-metal-highlight)] flex items-center justify-center">
                            {item.icon || <i className="fas fa-chart-bar" />}
                        </div>
                        {item.trend && (
                            <div className={cn(
                                "flex items-center gap-1 text-sm",
                                item.trend.isPositive ? "text-[var(--color-metal-success)]" : "text-[var(--color-metal-error)]"
                            )}>
                                <i className={`fas fa-${item.trend.isPositive ? "arrow-up" : "arrow-down"}`} />
                                <span>{Math.abs(item.trend.value)}%</span>
                            </div>
                        )}
                    </div>
                    <div className="metal-stat-value text-2xl font-bold mb-1">
                        {item.value}
                    </div>
                    <div className="metal-stat-label text-sm text-[var(--color-metal-muted)]">
                        {item.label}
                    </div>
                </div>
            ))}
        </div>
    )
} 
import { cn } from "@/styles/theme-utils"


interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    cols?: 1 | 2 | 3 | 4 | 5 | 6
    gap?: 'sm' | 'md' | 'lg' | 'xl'
    responsive?: boolean
}

export function Grid({
    children,
    className,
    cols = 3,
    gap = 'md',
    responsive = true,
    ...props
}: GridProps) {
    const gapClasses = {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8'
    }

    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6'
    }

    const responsiveClasses = responsive
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : gridCols[cols]

    return (
        <div
            className={cn(
                'grid',
                gapClasses[gap],
                responsiveClasses,
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
} 
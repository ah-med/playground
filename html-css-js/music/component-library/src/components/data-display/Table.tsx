import { cn } from "@/styles/theme-utils"

interface Column<T> {
    key: keyof T | string
    header: string
    render?: (item: T) => React.ReactNode
}

interface TableProps<T> {
    columns: Column<T>[]
    data: T[]
    onRowClick?: (item: T) => void
    className?: string
}

export function Table<T>({ columns, data, onRowClick, className }: TableProps<T>) {
    return (
        <div className={cn("metal-table overflow-x-auto", className)}>
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-[var(--color-metal-border)]">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-4 py-3 text-left text-sm font-semibold text-[var(--color-metal-muted)]"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => onRowClick?.(item)}
                            className={cn(
                                "border-b border-[var(--color-metal-border)] transition-colors",
                                onRowClick && "cursor-pointer hover:bg-[var(--color-metal-hover)]"
                            )}
                        >
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="px-4 py-3 text-sm"
                                >
                                    {column.render
                                        ? column.render(item)
                                        : String(item[column.key as keyof T])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
} 
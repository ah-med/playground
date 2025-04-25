import { cn } from "@/styles/theme-utils"
import { useEffect, useRef } from "react"

interface ChartData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        color: string
        fill?: boolean
    }[]
}

interface ChartProps {
    data: ChartData
    type?: "line" | "bar" | "pie"
    title?: string
    className?: string
}

export function Chart({ data, type = "line", title, className }: ChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Clear previous chart
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Set up chart dimensions
        const width = canvas.width
        const height = canvas.height
        const padding = 40

        // Draw chart based on type
        switch (type) {
            case "line":
                drawLineChart(ctx, data, width, height, padding)
                break
            case "bar":
                drawBarChart(ctx, data, width, height, padding)
                break
            case "pie":
                drawPieChart(ctx, data, width, height)
                break
        }
    }, [data, type])

    const drawLineChart = (
        ctx: CanvasRenderingContext2D,
        data: ChartData,
        width: number,
        height: number,
        padding: number
    ) => {
        const { labels, datasets } = data
        const xStep = (width - padding * 2) / (labels.length - 1)
        const yMax = Math.max(...datasets.flatMap(d => d.data))
        const yStep = (height - padding * 2) / yMax

        datasets.forEach((dataset, datasetIndex) => {
            ctx.beginPath()
            ctx.strokeStyle = dataset.color
            ctx.lineWidth = 2

            dataset.data.forEach((value, index) => {
                const x = padding + index * xStep
                const y = height - padding - value * yStep

                if (index === 0) {
                    ctx.moveTo(x, y)
                } else {
                    ctx.lineTo(x, y)
                }
            })

            ctx.stroke()

            if (dataset.fill) {
                ctx.lineTo(width - padding, height - padding)
                ctx.lineTo(padding, height - padding)
                ctx.closePath()
                ctx.fillStyle = `${dataset.color}20`
                ctx.fill()
            }
        })
    }

    const drawBarChart = (
        ctx: CanvasRenderingContext2D,
        data: ChartData,
        width: number,
        height: number,
        padding: number
    ) => {
        const { labels, datasets } = data
        const barWidth = (width - padding * 2) / (labels.length * datasets.length)
        const yMax = Math.max(...datasets.flatMap(d => d.data))
        const yStep = (height - padding * 2) / yMax

        datasets.forEach((dataset, datasetIndex) => {
            dataset.data.forEach((value, index) => {
                const x = padding + index * (barWidth * datasets.length) + datasetIndex * barWidth
                const barHeight = value * yStep

                ctx.fillStyle = dataset.color
                ctx.fillRect(x, height - padding - barHeight, barWidth - 2, barHeight)
            })
        })
    }

    const drawPieChart = (
        ctx: CanvasRenderingContext2D,
        data: ChartData,
        width: number,
        height: number
    ) => {
        const { datasets } = data
        const centerX = width / 2
        const centerY = height / 2
        const radius = Math.min(width, height) / 2 - 40

        const total = datasets[0].data.reduce((a, b) => a + b, 0)
        let startAngle = 0

        datasets[0].data.forEach((value, index) => {
            const angle = (value / total) * Math.PI * 2
            const endAngle = startAngle + angle

            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.arc(centerX, centerY, radius, startAngle, endAngle)
            ctx.closePath()
            ctx.fillStyle = datasets[0].color
            ctx.fill()

            startAngle = endAngle
        })
    }

    return (
        <div className={cn("metal-chart p-4 rounded-lg border-2 border-[var(--color-metal-border)] bg-[var(--color-metal-card-bg)]", className)}>
            {title && (
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
            )}
            <canvas
                ref={canvasRef}
                width={400}
                height={300}
                className="w-full h-[300px]"
            />
        </div>
    )
} 
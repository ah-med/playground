import type { Meta, StoryObj } from "@storybook/react"
import { Chart } from "./Chart"

const meta: Meta<typeof Chart> = {
    title: "Data Display/Chart",
    component: Chart,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Chart>

const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Streams",
            data: [1200, 1900, 1500, 2100, 1800, 2400],
            color: "var(--color-metal-highlight)",
            fill: true,
        },
    ],
}

const genreData = {
    labels: ["Rock", "Metal", "Pop", "Jazz", "Classical"],
    datasets: [
        {
            label: "Distribution",
            data: [30, 25, 20, 15, 10],
            color: "var(--color-metal-highlight)",
        },
    ],
}

const comparisonData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "This Week",
            data: [65, 59, 80, 81, 56, 55, 40],
            color: "var(--color-metal-highlight)",
        },
        {
            label: "Last Week",
            data: [45, 49, 60, 71, 46, 45, 30],
            color: "var(--color-metal-muted)",
        },
    ],
}

export const LineChart: Story = {
    args: {
        data: monthlyData,
        type: "line",
        title: "Monthly Streams",
    },
}

export const BarChart: Story = {
    args: {
        data: monthlyData,
        type: "bar",
        title: "Monthly Streams",
    },
}

export const PieChart: Story = {
    args: {
        data: genreData,
        type: "pie",
        title: "Genre Distribution",
    },
}

export const ComparisonChart: Story = {
    args: {
        data: comparisonData,
        type: "line",
        title: "Weekly Comparison",
    },
}

export const NoTitle: Story = {
    args: {
        data: monthlyData,
        type: "line",
    },
} 
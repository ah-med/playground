import type { Meta, StoryObj } from "@storybook/react"
import { Stats } from "./Stats"

const meta: Meta<typeof Stats> = {
    title: "Data Display/Stats",
    component: Stats,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Stats>

export const Default: Story = {
    args: {
        items: [
            {
                label: "Total Songs",
                value: "1,234",
                icon: <i className="fas fa-music" />,
                trend: {
                    value: 12,
                    isPositive: true,
                },
            },
            {
                label: "Active Users",
                value: "45.2K",
                icon: <i className="fas fa-users" />,
                trend: {
                    value: 8,
                    isPositive: true,
                },
            },
            {
                label: "Playlists",
                value: "89",
                icon: <i className="fas fa-list" />,
                trend: {
                    value: 5,
                    isPositive: false,
                },
            },
            {
                label: "Total Streams",
                value: "2.1M",
                icon: <i className="fas fa-play-circle" />,
                trend: {
                    value: 15,
                    isPositive: true,
                },
            },
        ],
    },
}

export const WithoutTrends: Story = {
    args: {
        items: [
            {
                label: "Total Songs",
                value: "1,234",
                icon: <i className="fas fa-music" />,
            },
            {
                label: "Active Users",
                value: "45.2K",
                icon: <i className="fas fa-users" />,
            },
            {
                label: "Playlists",
                value: "89",
                icon: <i className="fas fa-list" />,
            },
            {
                label: "Total Streams",
                value: "2.1M",
                icon: <i className="fas fa-play-circle" />,
            },
        ],
    },
}

export const CustomIcons: Story = {
    args: {
        items: [
            {
                label: "Revenue",
                value: "$12.4K",
                icon: <i className="fas fa-dollar-sign" />,
                trend: {
                    value: 18,
                    isPositive: true,
                },
            },
            {
                label: "Downloads",
                value: "3.2K",
                icon: <i className="fas fa-download" />,
                trend: {
                    value: 3,
                    isPositive: true,
                },
            },
            {
                label: "Subscribers",
                value: "1.8K",
                icon: <i className="fas fa-user-plus" />,
                trend: {
                    value: 7,
                    isPositive: false,
                },
            },
        ],
    },
}

export const SingleColumn: Story = {
    args: {
        items: [
            {
                label: "Total Songs",
                value: "1,234",
                icon: <i className="fas fa-music" />,
                trend: {
                    value: 12,
                    isPositive: true,
                },
            },
        ],
    },
} 
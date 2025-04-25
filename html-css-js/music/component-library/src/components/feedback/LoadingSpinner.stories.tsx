import type { Meta, StoryObj } from "@storybook/react"
import { LoadingSpinner } from "./LoadingSpinner"

const meta = {
    title: "Feedback/LoadingSpinner",
    component: LoadingSpinner,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof LoadingSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
    args: {
        size: "sm",
    },
}

export const Medium: Story = {
    args: {
        size: "md",
    },
}

export const Large: Story = {
    args: {
        size: "lg",
    },
}

export const CustomSize: Story = {
    args: {
        size: "md",
        className: "w-16 h-16",
    },
} 
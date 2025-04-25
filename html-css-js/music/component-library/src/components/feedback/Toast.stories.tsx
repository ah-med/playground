import type { Meta, StoryObj } from "@storybook/react"
import { Toast } from "./Toast"

const meta = {
    title: "Feedback/Toast",
    component: Toast,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
    args: {
        message: "Successfully saved playlist!",
        type: "success",
        onClose: () => { },
    },
}

export const Error: Story = {
    args: {
        message: "Failed to load tracks. Please try again.",
        type: "error",
        onClose: () => { },
    },
}

export const Info: Story = {
    args: {
        message: "New album available in your library.",
        type: "info",
        onClose: () => { },
    },
}

export const Warning: Story = {
    args: {
        message: "Your subscription will expire in 3 days.",
        type: "warning",
        onClose: () => { },
    },
}

export const WithLongMessage: Story = {
    args: {
        message: "This is a very long message that should wrap properly and still look good in the toast notification. It might contain important information that needs to be displayed to the user.",
        type: "info",
        onClose: () => { },
    },
} 
import type { Meta, StoryObj } from "@storybook/react"
import { Alert } from "./Alert"

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    title: "Success",
    message: "Your playlist has been successfully created!",
    type: "success",
    onClose: () => {},
  },
}

export const Error: Story = {
  args: {
    title: "Error",
    message: "Unable to load your library. Please check your internet connection and try again.",
    type: "error",
    onClose: () => {},
  },
}

export const Warning: Story = {
  args: {
    title: "Warning",
    message: "Your subscription will expire in 3 days. Please renew to continue enjoying premium features.",
    type: "warning",
    onClose: () => {},
  },
}

export const Info: Story = {
  args: {
    title: "Information",
    message: "New features are available! Check out our latest updates in the settings menu.",
    type: "info",
    onClose: () => {},
  },
}

export const WithoutTitle: Story = {
  args: {
    message: "This is a simple alert message without a title.",
    type: "info",
    onClose: () => {},
  },
}

export const WithoutCloseButton: Story = {
  args: {
    title: "Important Notice",
    message: "This alert cannot be dismissed and requires user attention.",
    type: "warning",
    onClose: undefined,
  },
} 
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        children: 'Primary Button',
        variant: 'primary',
    },
}

export const Secondary: Story = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary',
    },
}

export const Accent: Story = {
    args: {
        children: 'Accent Button',
        variant: 'accent',
    },
}

export const Outline: Story = {
    args: {
        children: 'Outline Button',
        variant: 'outline',
    },
}

export const Small: Story = {
    args: {
        children: 'Small Button',
        size: 'sm',
    },
}

export const Medium: Story = {
    args: {
        children: 'Medium Button',
        size: 'md',
    },
}

export const Large: Story = {
    args: {
        children: 'Large Button',
        size: 'lg',
    },
}

export const Loading: Story = {
    args: {
        children: 'Loading Button',
        isLoading: true,
    },
}

export const Disabled: Story = {
    args: {
        children: 'Disabled Button',
        disabled: true,
    },
} 
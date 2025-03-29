import type { Meta, StoryObj } from "@storybook/react"
import { AlbumCard } from "./AlbumCard"

const meta = {
    title: "Media/AlbumCard",
    component: AlbumCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof AlbumCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: "The Number of the Beast",
        artist: "Iron Maiden",
        imageUrl: "https://via.placeholder.com/300",
        year: "1982",
    },
}

export const WithDuration: Story = {
    args: {
        title: "Piece of Mind",
        artist: "Iron Maiden",
        imageUrl: "https://via.placeholder.com/300",
        year: "1983",
        duration: "45:30",
    },
}

export const WithCustomSize: Story = {
    args: {
        title: "Powerslave",
        artist: "Iron Maiden",
        imageUrl: "https://via.placeholder.com/300",
        year: "1984",
        className: "w-64",
    },
}

export const WithLongTitle: Story = {
    args: {
        title: "Somewhere in Time - 30th Anniversary Special Edition",
        artist: "Iron Maiden",
        imageUrl: "https://via.placeholder.com/300",
        year: "1986",
    },
}

export const WithLongArtist: Story = {
    args: {
        title: "Seventh Son of a Seventh Son",
        artist: "Iron Maiden featuring Bruce Dickinson and Steve Harris",
        imageUrl: "https://via.placeholder.com/300",
        year: "1988",
    },
} 
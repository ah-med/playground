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
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
        year: "1982",
    },
}

export const WithDuration: Story = {
    args: {
        title: "Piece of Mind",
        artist: "Iron Maiden",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
        year: "1983",
        duration: "45:30",
    },
}

export const WithCustomSize: Story = {
    args: {
        title: "Powerslave",
        artist: "Iron Maiden",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
        year: "1984",
        size: "lg",
    },
}

export const WithLongTitle: Story = {
    args: {
        title: "Somewhere in Time - The Complete Collection",
        artist: "Iron Maiden",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
        year: "1986",
    },
}

export const WithLongArtist: Story = {
    args: {
        title: "Seventh Son of a Seventh Son",
        artist: "Iron Maiden - The Complete Collection",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
        year: "1988",
    },
} 
import type { Meta, StoryObj } from "@storybook/react"
import { TrackList } from "./TrackList"

const meta = {
    title: "Media/TrackList",
    component: TrackList,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof TrackList>

export default meta
type Story = StoryObj<typeof meta>

const tracks = [
    {
        id: "1",
        title: "The Number of the Beast",
        artist: "Iron Maiden",
        duration: "4:50",
        isPlaying: false,
    },
    {
        id: "2",
        title: "Run to the Hills",
        artist: "Iron Maiden",
        duration: "3:53",
        isPlaying: true,
    },
    {
        id: "3",
        title: "Hallowed Be Thy Name",
        artist: "Iron Maiden",
        duration: "7:11",
        isPlaying: false,
    },
]

export const Default: Story = {
    args: {
        tracks,
    },
}

export const Empty: Story = {
    args: {
        tracks: [],
    },
}

export const WithCustomClassName: Story = {
    args: {
        tracks,
        className: "w-96",
    },
}

export const WithOnTrackClick: Story = {
    args: {
        tracks,
        onTrackClick: (trackId) => console.log("Track clicked:", trackId),
    },
}

export const WithLongTitles: Story = {
    args: {
        tracks: [
            {
                id: "1",
                title: "The Number of the Beast - Live at Rock in Rio 2001",
                artist: "Iron Maiden",
                duration: "5:15",
                isPlaying: false,
            },
            {
                id: "2",
                title: "Run to the Hills (Special Edition with Extended Solo)",
                artist: "Iron Maiden featuring Bruce Dickinson and Steve Harris",
                duration: "4:30",
                isPlaying: true,
            },
            {
                id: "3",
                title: "Hallowed Be Thy Name - 30th Anniversary Version",
                artist: "Iron Maiden",
                duration: "7:45",
                isPlaying: false,
            },
        ],
    },
} 
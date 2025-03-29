import type { Meta, StoryObj } from "@storybook/react"
import { PlayerControls } from "./PlayerControls"

const meta = {
    title: "Media/PlayerControls",
    component: PlayerControls,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof PlayerControls>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        isPlaying: false,
        progress: 0,
        currentTime: "0:00",
        duration: "0:00",
        onPlayPause: () => console.log("Play/Pause clicked"),
        onPrevious: () => console.log("Previous clicked"),
        onNext: () => console.log("Next clicked"),
        onShuffle: () => console.log("Shuffle clicked"),
        onRepeat: () => console.log("Repeat clicked"),
        onProgressChange: (value: number) => console.log("Progress changed to:", value),
    },
}

export const Playing: Story = {
    args: {
        isPlaying: true,
        progress: 0.5,
        currentTime: "2:30",
        duration: "5:00",
        onPlayPause: () => console.log("Play/Pause clicked"),
        onPrevious: () => console.log("Previous clicked"),
        onNext: () => console.log("Next clicked"),
        onShuffle: () => console.log("Shuffle clicked"),
        onRepeat: () => console.log("Repeat clicked"),
        onProgressChange: (value: number) => console.log("Progress changed to:", value),
    },
}

export const WithProgress: Story = {
    args: {
        isPlaying: false,
        progress: 0.4,
        currentTime: "2:00",
        duration: "5:00",
        onPlayPause: () => console.log("Play/Pause clicked"),
        onPrevious: () => console.log("Previous clicked"),
        onNext: () => console.log("Next clicked"),
        onShuffle: () => console.log("Shuffle clicked"),
        onRepeat: () => console.log("Repeat clicked"),
        onProgressChange: (value: number) => console.log("Progress changed to:", value),
    },
}

export const WithCustomClassName: Story = {
    args: {
        isPlaying: false,
        progress: 0,
        currentTime: "0:00",
        duration: "0:00",
        className: "w-96",
        onPlayPause: () => console.log("Play/Pause clicked"),
        onPrevious: () => console.log("Previous clicked"),
        onNext: () => console.log("Next clicked"),
        onShuffle: () => console.log("Shuffle clicked"),
        onRepeat: () => console.log("Repeat clicked"),
        onProgressChange: (value: number) => console.log("Progress changed to:", value),
    },
}

export const WithVolume: Story = {
    args: {
        isPlaying: false,
        volume: 0.7,
        onPlayPause: () => console.log("Play/Pause clicked"),
        onPrevious: () => console.log("Previous clicked"),
        onNext: () => console.log("Next clicked"),
        onShuffle: () => console.log("Shuffle clicked"),
        onRepeat: () => console.log("Repeat clicked"),
        onVolumeChange: (volume) => console.log("Volume changed to:", volume),
    },
} 
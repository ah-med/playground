import type { Meta, StoryObj } from "@storybook/react"
import { Table } from "./Table"

const meta: Meta<typeof Table> = {
    title: "Data Display/Table",
    component: Table,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
}

export default meta
type Story<T> = StoryObj<typeof Table<T>>

interface Song {
    id: number
    title: string
    artist: string
    album: string
    duration: string
    plays: number
}

const songs: Song[] = [
    {
        id: 1,
        title: "The Trooper",
        artist: "Iron Maiden",
        album: "Piece of Mind",
        duration: "4:12",
        plays: 1234567,
    },
    {
        id: 2,
        title: "Run to the Hills",
        artist: "Iron Maiden",
        album: "The Number of the Beast",
        duration: "3:53",
        plays: 2345678,
    },
    {
        id: 3,
        title: "Fear of the Dark",
        artist: "Iron Maiden",
        album: "Fear of the Dark",
        duration: "7:18",
        plays: 3456789,
    },
]

type Column<T> = {
    key: keyof T | string
    header: string
    render?: (item: T) => React.ReactNode
}

const columns: Column<Song>[] = [
    {
        key: "title",
        header: "Title",
    },
    {
        key: "artist",
        header: "Artist",
    },
    {
        key: "album",
        header: "Album",
    },
    {
        key: "duration",
        header: "Duration",
    },
    {
        key: "plays",
        header: "Plays",
        render: (item: Song) => item.plays.toLocaleString(),
    },
]

export const Default: Story<Song> = {
    args: {
        columns,
        data: songs,
    },
}

export const WithRowClick: Story<Song> = {
    args: {
        columns,
        data: songs,
        onRowClick: (item: Song) => console.log("Clicked:", item),
    },
}

export const CustomRendering: Story<Song> = {
    args: {
        columns: [
            {
                key: "title",
                header: "Title",
                render: (item: Song) => (
                    <div className="flex items-center gap-2">
                        <img
                            src={`https://via.placeholder.com/40`}
                            alt={item.title}
                            className="w-10 h-10 rounded"
                        />
                        <span>{item.title}</span>
                    </div>
                ),
            },
            {
                key: "artist",
                header: "Artist",
            },
            {
                key: "album",
                header: "Album",
            },
            {
                key: "duration",
                header: "Duration",
            },
            {
                key: "plays",
                header: "Plays",
                render: (item: Song) => (
                    <div className="flex items-center gap-2">
                        <i className="fas fa-play text-[var(--color-metal-highlight)]" />
                        <span>{item.plays.toLocaleString()}</span>
                    </div>
                ),
            },
        ],
        data: songs,
    },
}

export const Empty: Story<Song> = {
    args: {
        columns,
        data: [],
    },
}

export const SingleColumn: Story<Song> = {
    args: {
        columns: [
            {
                key: "title",
                header: "Title",
            },
        ],
        data: songs,
    },
} 
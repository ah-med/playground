import { cn } from "@/styles/theme-utils"
import { useState } from "react"

interface SidebarProps {
    logo?: React.ReactNode
    items: {
        label: string
        href: string
        icon?: React.ReactNode
    }[]
    isOpen: boolean
    onClose: () => void
}

export function Sidebar({ logo, items, isOpen, onClose }: SidebarProps) {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="nav-overlay fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "side-nav fixed top-0 left-0 h-full w-64 bg-[var(--color-background)] border-r border-[var(--color-metal-border)] z-50 transform transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="side-nav-header flex items-center justify-between p-4 border-b border-[var(--color-metal-border)]">
                    <div className="side-nav-logo text-xl font-bold">
                        {logo || "Metal Player"}
                    </div>
                    <button
                        className="side-nav-close metal-button p-2"
                        onClick={onClose}
                    >
                        <i className="fas fa-times" />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="side-nav-menu p-4">
                    <ul className="space-y-2">
                        {items.map((item) => (
                            <li key={item.href} className="side-nav-item">
                                <a
                                    href={item.href}
                                    className="side-nav-link flex items-center space-x-3 p-2 rounded-md hover:bg-[var(--color-metal-highlight)] transition-colors"
                                    onClick={onClose}
                                >
                                    {item.icon && (
                                        <span className="text-lg">{item.icon}</span>
                                    )}
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    )
} 
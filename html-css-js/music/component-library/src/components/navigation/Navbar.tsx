import { cn } from "@/styles/theme-utils"
import { useState } from "react"

interface NavbarProps {
    logo?: React.ReactNode
    items: {
        label: string
        href: string
        icon?: React.ReactNode
    }[]
    rightContent?: React.ReactNode
}

export function Navbar({ logo, items, rightContent }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <nav className="metal-nav fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        {logo || <span className="text-xl font-bold">Metal Player</span>}
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {items.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="metal-nav-item flex items-center space-x-2"
                            >
                                {item.icon && <span className="text-lg">{item.icon}</span>}
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </div>

                    {/* Right Content */}
                    <div className="flex items-center space-x-4">
                        {rightContent}
                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden metal-button p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="metal-container px-2 pt-2 pb-3 space-y-1">
                            {items.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="metal-nav-item block px-3 py-2 rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-2">
                                        {item.icon && <span className="text-lg">{item.icon}</span>}
                                        <span>{item.label}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
} 
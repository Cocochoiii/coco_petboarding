'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#current-pets', label: 'Our Pets' },
        { href: '#booking', label: 'Book Now' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' },
    ]

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <Heart className="h-8 w-8 text-primary" />
                        <span className="font-bold text-xl">Coco's Pet Paradise</span>
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-gray-700 hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Client Portal
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden py-4"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block py-2 text-gray-700 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="block mt-4 bg-primary text-white text-center py-2 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Client Portal
                        </Link>
                    </motion.div>
                )}
            </div>
        </nav>
    )
}
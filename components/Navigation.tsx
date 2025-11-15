'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#current-pets', label: 'Our Pets' },
        { href: '#booking', label: 'Book Now' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' },
    ]

    return (
        <motion.nav
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-soft-lg'
                    : 'bg-white shadow-soft'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Heart className="h-8 w-8 text-primary-700 group-hover:text-primary-800 transition-colors" />
                        </motion.div>
                        <span className="font-bold text-xl text-neutral-900">Coco's Pet Paradise</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <motion.div
                                key={item.href}
                                onMouseEnter={() => setHoveredItem(item.label)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="relative"
                            >
                                <Link
                                    href={item.href}
                                    className="text-neutral-700 hover:text-primary-700 transition-colors font-medium"
                                >
                                    {item.label}
                                </Link>
                                {hoveredItem === item.label && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700"
                                        layoutId="navbar-indicator"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/login"
                                className="bg-primary-700 text-white px-5 py-2.5 rounded-lg hover:bg-primary-800 transition-all font-medium shadow-soft hover:shadow-soft-lg flex items-center gap-2 group"
                            >
                                Client Portal
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>

                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-6 w-6 text-neutral-700" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="h-6 w-6 text-neutral-700" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-neutral-200"
                        >
                            <div className="py-4">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="block py-3 px-4 text-neutral-700 hover:text-primary-700 hover:bg-neutral-50 rounded-lg transition-all font-medium"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navItems.length * 0.05 }}
                                    className="mt-4 px-4"
                                >
                                    <Link
                                        href="/login"
                                        className="block bg-primary-700 text-white text-center py-3 rounded-lg hover:bg-primary-800 transition-all font-medium shadow-soft"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Client Portal
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    )
}
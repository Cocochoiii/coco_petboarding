'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, ArrowRight, Home, Phone, Calendar, Info, Star } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const [documentHeight, setDocumentHeight] = useState(1)
    const { scrollY } = useScroll()
    const navBackground = useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)'])
    const navShadow = useTransform(scrollY, [0, 100], ['0px 0px 0px rgba(0,0,0,0)', '0px 10px 30px rgba(0,0,0,0.1)'])

    // Fix for document is not defined error
    const progressWidth = useTransform(
        scrollY,
        [0, documentHeight],
        ['0%', '100%']
    )

    useEffect(() => {
        // Only access document in the browser
        if (typeof window !== 'undefined') {
            const updateDocumentHeight = () => {
                setDocumentHeight(document.documentElement.scrollHeight - window.innerHeight || 1)
            }
            updateDocumentHeight()
            window.addEventListener('resize', updateDocumentHeight)

            const handleScroll = () => {
                setScrolled(window.scrollY > 20)
            }
            window.addEventListener('scroll', handleScroll)

            // Close mobile menu on resize
            const handleResize = () => {
                if (window.innerWidth > 768) {
                    setIsOpen(false)
                }
            }
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', updateDocumentHeight)
                window.removeEventListener('scroll', handleScroll)
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [])

    const navItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '#services', label: 'Services', icon: Star },
        { href: '#current-pets', label: 'Our Pets', icon: Heart },
        { href: '#booking', label: 'Book Now', icon: Calendar },
        { href: '#about', label: 'About', icon: Info },
        { href: '#contact', label: 'Contact', icon: Phone },
    ]

    return (
        <>
            <motion.nav
                className="sticky top-0 z-50 backdrop-blur-md"
                style={{
                    backgroundColor: navBackground,
                    boxShadow: navShadow,
                }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo with Enhanced Animation */}
                        <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    animate={{ rotate: scrolled ? 360 : 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Heart className="h-8 w-8 md:h-10 md:w-10 text-primary-700 group-hover:text-primary-800 transition-colors" />
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                >
                                    <Heart className="h-8 w-8 md:h-10 md:w-10 text-primary-700 opacity-30" />
                                </motion.div>
                            </motion.div>
                            <div className="hidden sm:block">
                                <motion.span
                                    className="font-bold text-lg md:text-xl text-neutral-900 block"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Coco's Pet Paradise
                                </motion.span>
                                <motion.span
                                    className="text-xs text-neutral-500 hidden md:block"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Premium Pet Boarding
                                </motion.span>
                            </div>
                        </Link>

                        {/* Desktop Menu with Advanced Interactions */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredItem(item.label)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className="relative"
                                >
                                    <Link
                                        href={item.href}
                                        className="relative text-neutral-700 hover:text-primary-700 transition-colors font-medium group flex items-center gap-2"
                                    >
                                        <motion.div
                                            animate={{ rotate: hoveredItem === item.label ? 360 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <item.icon className={`w-4 h-4 transition-all ${hoveredItem === item.label ? 'text-primary-700' : 'text-neutral-400'}`} />
                                        </motion.div>
                                        <span>{item.label}</span>
                                    </Link>
                                    {hoveredItem === item.label && (
                                        <motion.div
                                            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary-700"
                                            layoutId="navbar-indicator"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.div>
                            ))}

                            {/* CTA Button with Pulse Effect */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, type: "spring" }}
                                className="relative"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-primary-700 rounded-lg"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.3, 0.1, 0.3],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                />
                                <Link
                                    href="/login"
                                    className="relative bg-primary-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-primary-800 transition-all font-medium shadow-soft hover:shadow-soft-xl flex items-center gap-2 group"
                                >
                                    Client Portal
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 md:p-3 hover:bg-neutral-100 rounded-lg transition-colors"
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
                </div>

                {/* Enhanced Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-soft-xl"
                        >
                            <div className="container mx-auto px-4 py-4 md:py-6">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3 py-3 md:py-4 px-4 text-neutral-700 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all font-medium group"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <item.icon className="w-5 h-5 text-neutral-400 group-hover:text-primary-700 transition-colors" />
                                            </motion.div>
                                            <span className="text-base md:text-lg">{item.label}</span>
                                            <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: navItems.length * 0.05 }}
                                    className="mt-4 px-4"
                                >
                                    <Link
                                        href="/login"
                                        className="block bg-primary-700 text-white text-center py-3 md:py-4 rounded-lg hover:bg-primary-800 transition-all font-medium shadow-soft hover:shadow-soft-xl"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Client Portal
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-16 md:top-20 left-0 right-0 h-0.5 bg-neutral-200 z-40"
                style={{ opacity: scrolled ? 1 : 0 }}
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-primary-600 to-primary-700"
                    style={{ width: progressWidth }}
                />
            </motion.div>
        </>
    )
}
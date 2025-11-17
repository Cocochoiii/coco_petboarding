'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Menu,
    X,
    Heart,
    ArrowRight,
    Home,
    Phone,
    Calendar,
    Info,
    Star,
    User,
    PawPrint,
    Volume2,
    VolumeX,
    Music
} from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useMusic } from '@/contexts/MusicContext'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const [documentHeight, setDocumentHeight] = useState(1)
    const [isDarkNav, setIsDarkNav] = useState(false)
    const [showVolumeSlider, setShowVolumeSlider] = useState(false)

    const { isPlaying, volume, togglePlay, setVolume } = useMusic()
    const { scrollY } = useScroll()

    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
    )
    const navShadow = useTransform(
        scrollY,
        [0, 100],
        ['0px 0px 0px rgba(0,0,0,0)', '0px 10px 30px rgba(0,0,0,0.1)']
    )

    const progressWidth = useTransform(scrollY, [0, documentHeight], ['0%', '100%'])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateDocumentHeight = () => {
                setDocumentHeight(
                    document.documentElement.scrollHeight - window.innerHeight || 1
                )
            }
            updateDocumentHeight()

            const handleScroll = () => {
                const y = window.scrollY
                setScrolled(y > 20)
                setIsDarkNav(y > 300)
            }

            const handleResize = () => {
                updateDocumentHeight()
                if (window.innerWidth > 768) {
                    setIsOpen(false)
                }
            }

            window.addEventListener('scroll', handleScroll)
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('scroll', handleScroll)
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [])

    const navItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '#current-pets', label: 'Our Pets', icon: Heart },
        { href: '#services', label: 'Services', icon: Star },
        { href: '#booking', label: 'Book Now', icon: Calendar },
        { href: '#about', label: 'About', icon: Info },
        { href: '#contact', label: 'Contact', icon: Phone }
    ]

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
    }

    return (
        <>
            <motion.nav
                className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
                    isDarkNav ? 'bg-gradient-to-br from-neutral-900 to-neutral-800' : ''
                }`}
                style={{
                    backgroundColor: isDarkNav ? 'transparent' : (navBackground as any),
                    boxShadow: navShadow as any
                }}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center space-x-2 md:space-x-3 group"
                        >
                            <motion.div
                                className="relative"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    animate={{ rotate: scrolled ? 360 : 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <PawPrint
                                        className={`h-8 w-8 md:h-10 md:w-10 transition-colors ${
                                            isDarkNav
                                                ? 'text-primary-300 group-hover:text-primary-200'
                                                : 'text-primary-700 group-hover:text-primary-800'
                                        }`}
                                    />
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 0, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}
                                >
                                    <PawPrint
                                        className={`h-8 w-8 md:h-10 md:w-10 opacity-30 ${
                                            isDarkNav ? 'text-primary-300' : 'text-primary-700'
                                        }`}
                                    />
                                </motion.div>
                            </motion.div>
                            <div className="hidden sm:block">
                                <motion.span
                                    className={`font-bold text-lg md:text-xl block transition-colors ${
                                        isDarkNav ? 'text-white' : 'text-neutral-900'
                                    }`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Coco&apos;s Pet Paradise
                                </motion.span>
                                <motion.span
                                    className={`text-xs hidden md:block transition-colors ${
                                        isDarkNav ? 'text-neutral-300' : 'text-neutral-500'
                                    }`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Premium Pet Boarding
                                </motion.span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
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
                                        className={`relative transition-colors font-medium group flex items-center gap-2 ${
                                            isDarkNav
                                                ? 'text-neutral-100 hover:text-primary-200'
                                                : 'text-neutral-700 hover:text-primary-700'
                                        }`}
                                    >
                                        <motion.div
                                            animate={{
                                                rotate: hoveredItem === item.label ? 360 : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <item.icon
                                                className={`w-4 h-4 transition-all ${
                                                    hoveredItem === item.label
                                                        ? isDarkNav
                                                            ? 'text-primary-300'
                                                            : 'text-primary-700'
                                                        : isDarkNav
                                                            ? 'text-neutral-300'
                                                            : 'text-neutral-400'
                                                }`}
                                            />
                                        </motion.div>
                                        <span>{item.label}</span>
                                    </Link>
                                    {hoveredItem === item.label && (
                                        <motion.div
                                            className={`absolute -bottom-2 left-0 right-0 h-0.5 ${
                                                isDarkNav
                                                    ? 'bg-primary-300'
                                                    : 'bg-primary-700'
                                            }`}
                                            layoutId="navbar-indicator"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 30
                                            }}
                                        />
                                    )}
                                </motion.div>
                            ))}

                            {/* Client Portal Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, type: 'spring' }}
                                className="relative"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-primary-700 rounded-lg"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.3, 0.1, 0.3]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}
                                />
                                <Link
                                    href="/client-portal"
                                    className="relative bg-primary-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-primary-800 transition-all font-medium shadow-soft hover:shadow-soft-xl flex items-center gap-2 group"
                                >
                                    <User className="w-4 h-4" />
                                    Client Portal
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>

                            {/* Music Button */}
                            <div className="relative">
                                <motion.button
                                    onClick={togglePlay}
                                    onMouseEnter={() => setShowVolumeSlider(true)}
                                    onMouseLeave={() => setShowVolumeSlider(false)}
                                    className={`relative p-2.5 rounded-lg transition-all ${
                                        isPlaying
                                            ? 'bg-primary-700 text-white'
                                            : isDarkNav
                                                ? 'bg-neutral-700 text-neutral-300'
                                                : 'bg-neutral-200 text-neutral-600'
                                    } hover:scale-110`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    {isPlaying ? (
                                        <Volume2 className="w-4 h-4" />
                                    ) : (
                                        <VolumeX className="w-4 h-4" />
                                    )}

                                    {/* Animated music notes */}
                                    {isPlaying && (
                                        <motion.div
                                            className="absolute -top-1 -right-1"
                                            animate={{
                                                y: [-5, -10, -5],
                                                opacity: [0, 1, 0],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }}
                                        >
                                            <span className="text-[10px]">🎵</span>
                                        </motion.div>
                                    )}
                                </motion.button>

                                {/* Volume slider */}
                                <AnimatePresence>
                                    {showVolumeSlider && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-soft-xl p-3 border border-neutral-200"
                                            onMouseEnter={() => setShowVolumeSlider(true)}
                                            onMouseLeave={() => setShowVolumeSlider(false)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Music className="w-4 h-4 text-neutral-600" />
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.1"
                                                    value={volume}
                                                    onChange={handleVolumeChange}
                                                    className="w-20 accent-primary-700"
                                                />
                                                <span className="text-xs text-neutral-600 w-8">
                                                    {Math.round(volume * 100)}%
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`lg:hidden p-2 md:p-3 rounded-lg transition-colors ${
                                isDarkNav
                                    ? 'hover:bg-neutral-800'
                                    : 'hover:bg-neutral-100'
                            }`}
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
                                        <X
                                            className={`h-6 w-6 ${
                                                isDarkNav
                                                    ? 'text-neutral-100'
                                                    : 'text-neutral-700'
                                            }`}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu
                                            className={`h-6 w-6 ${
                                                isDarkNav
                                                    ? 'text-neutral-100'
                                                    : 'text-neutral-700'
                                            }`}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className={`lg:hidden absolute top-full left-0 right-0 border-t shadow-soft-xl backdrop-blur-md ${
                                isDarkNav
                                    ? 'bg-neutral-900/95 border-neutral-700'
                                    : 'bg-white/95 border-neutral-200'
                            }`}
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
                                            className={`flex items-center gap-3 py-3 md:py-4 px-4 rounded-lg transition-all font-medium group ${
                                                isDarkNav
                                                    ? 'text-neutral-100 hover:text-primary-200 hover:bg-neutral-800'
                                                    : 'text-neutral-700 hover:text-primary-700 hover:bg-primary-50'
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <item.icon
                                                    className={`w-5 h-5 transition-colors ${
                                                        isDarkNav
                                                            ? 'text-neutral-300 group-hover:text-primary-200'
                                                            : 'text-neutral-400 group-hover:text-primary-700'
                                                    }`}
                                                />
                                            </motion.div>
                                            <span className="text-base md:text-lg">
                                                {item.label}
                                            </span>
                                            <ArrowRight
                                                className={`w-4 h-4 ml-auto transition-all transform group-hover:translate-x-1 ${
                                                    isDarkNav
                                                        ? 'text-neutral-400 group-hover:text-primary-200'
                                                        : 'text-neutral-300 group-hover:text-primary-700'
                                                }`}
                                            />
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Music Control for Mobile */}
                                <div className="px-4 py-3">
                                    <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3">
                                        <span className="text-sm font-medium">Background Music</span>
                                        <button
                                            onClick={togglePlay}
                                            className={`p-2 rounded-lg ${
                                                isPlaying
                                                    ? 'bg-primary-700 text-white'
                                                    : 'bg-neutral-300 text-neutral-600'
                                            }`}
                                        >
                                            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: navItems.length * 0.05 }}
                                    className="mt-4 px-4"
                                >
                                    <Link
                                        href="/client-portal"
                                        className="block bg-primary-700 text-white text-center py-3 md:py-4 rounded-lg hover:bg-primary-800 transition-all font-medium shadow-soft hover:shadow-soft-xl flex items-center justify-center gap-2"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <User className="w-5 h-5" />
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
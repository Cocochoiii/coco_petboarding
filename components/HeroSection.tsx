'use client'

import { useState, useEffect } from 'react'
import {AnimatePresence, motion, useScroll, useTransform} from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown, Heart } from 'lucide-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function HeroSection() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [textIndex, setTextIndex] = useState(0)
    const { scrollY } = useScroll()

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 300], [0, 100])
    const y2 = useTransform(scrollY, [0, 300], [0, -100])
    const opacity = useTransform(scrollY, [0, 200], [1, 0])
    const scale = useTransform(scrollY, [0, 200], [1, 1.2])

    const titles = ["Premium Pet Care", "Luxury Boarding", "Home Away From Home"]

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)

        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % titles.length)
        }, 3000)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            clearInterval(interval)
        }
    }, [])

    return (
        <motion.section
            className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden"
            style={{ scale, opacity }}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-0 -left-1/4 w-[600px] h-[600px] bg-primary-200 rounded-full opacity-10 blur-3xl"
                    style={{ y: y1 }}
                    animate={{
                        x: mousePosition.x * 0.02,
                        y: mousePosition.y * 0.02,
                    }}
                    transition={{ type: "spring", stiffness: 50 }}
                />
                <motion.div
                    className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-neutral-200 rounded-full opacity-10 blur-3xl"
                    style={{ y: y2 }}
                    animate={{
                        x: mousePosition.x * -0.02,
                        y: mousePosition.y * -0.02,
                    }}
                    transition={{ type: "spring", stiffness: 50 }}
                />
            </div>

            {/* Interactive Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary-700/10 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight
                        }}
                        animate={{
                            x: [null, Math.random() * window.innerWidth],
                            y: [null, Math.random() * window.innerHeight],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Animated Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-8"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md border border-neutral-200 rounded-full shadow-soft-md hover:shadow-soft-lg transition-all cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <CheckCircle className="w-4 h-4 text-primary-700" />
                            </motion.div>
                            <span className="text-sm font-medium text-neutral-800">Licensed & Insured Since 2019</span>
                        </motion.div>
                    </motion.div>

                    {/* Animated Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-12"
                    >
                        <div className="h-[120px] mb-6">
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={textIndex}
                                    className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900"
                                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, y: -50, rotateX: 90 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <span className="inline-block">{titles[textIndex]}</span>
                                </motion.h1>
                            </AnimatePresence>
                            <motion.div
                                className="text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-600 mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                in Wellesley Hills
                            </motion.div>
                        </div>

                        <motion.p
                            className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Personalized home boarding for your beloved pets.
                            Currently caring for{' '}
                            <motion.span
                                className="font-semibold text-neutral-900 border-b-2 border-primary-700 inline-block"
                                whileHover={{ scale: 1.1 }}
                            >
                                13 cats
                            </motion.span>{' '}
                            and{' '}
                            <motion.span
                                className="font-semibold text-neutral-900 border-b-2 border-primary-700 inline-block"
                                whileHover={{ scale: 1.1 }}
                            >
                                8 dogs
                            </motion.span>{' '}
                            with love and dedication.
                        </motion.p>

                        {/* Interactive CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative group"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-primary-700 rounded-lg blur-lg opacity-20"
                                    animate={{
                                        opacity: [0.2, 0.3, 0.2],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                />
                                <Link
                                    href="#booking"
                                    className="magnetic-button relative inline-flex items-center gap-2 px-8 py-4 bg-primary-700 text-white rounded-lg font-medium transition-all hover:bg-primary-800 hover:shadow-soft-xl group overflow-hidden"
                                >
                                    <span className="relative z-10">Reserve Your Spot</span>
                                    <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href="#current-pets"
                                    className="magnetic-button inline-flex items-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-md text-neutral-700 border-2 border-neutral-200 rounded-lg font-medium transition-all hover:border-primary-700 hover:text-primary-700 hover:shadow-soft-lg group"
                                >
                                    <span>Meet Our Residents</span>
                                    <motion.span
                                        className="inline-block"
                                        animate={{ x: [0, 3, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* 3D Stats Cards */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto perspective-1000"
                    >
                        {[
                            { value: 500, label: 'Happy Pets', suffix: '+', icon: Heart },
                            { value: 4.9, label: 'Star Rating', decimals: 1, icon: Star },
                            { value: 100, label: 'Safety Record', suffix: '%', icon: CheckCircle },
                            { value: 50, label: 'Mile Radius', icon: Heart },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10, rotateY: -30 }}
                                animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                whileHover={{
                                    y: -10,
                                    rotateY: 10,
                                    scale: 1.05,
                                }}
                                className="text-center group cursor-pointer transform-gpu"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <motion.div
                                    className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-soft hover:shadow-soft-xl transition-all border border-neutral-100"
                                    whileHover={{
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="w-8 h-8 mx-auto mb-2 text-primary-700"
                                    >
                                        <stat.icon className="w-full h-full" />
                                    </motion.div>
                                    <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-1">
                                        {inView && (
                                            <CountUp
                                                end={stat.value}
                                                decimals={stat.decimals || 0}
                                                suffix={stat.suffix || ''}
                                                duration={2}
                                            />
                                        )}
                                    </div>
                                    <p className="text-sm text-neutral-500 font-medium uppercase tracking-wide group-hover:text-neutral-700 transition-colors">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Floating Features */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            { title: '24/7 Supervision', desc: 'Round-the-clock care in a home environment', delay: 0 },
                            { title: 'Daily Updates', desc: 'Photos and videos sent throughout the day', delay: 0.1 },
                            { title: 'Personalized Care', desc: 'Tailored to each pet\'s unique needs', delay: 0.2 },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + feature.delay }}
                                whileHover={{
                                    y: -5,
                                    scale: 1.02,
                                }}
                                className="glass-card p-6 rounded-xl cursor-pointer group"
                            >
                                <motion.div
                                    className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-700 transition-colors"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CheckCircle className="w-6 h-6 text-primary-700 group-hover:text-white transition-colors" />
                                </motion.div>
                                <h3 className="font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-neutral-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Interactive Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                onClick={() => document.getElementById('current-pets')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.1 }}
            >
                <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center hover:border-primary-700 transition-colors">
                    <motion.div
                        className="w-1.5 h-3 bg-neutral-600 rounded-full mt-2"
                        animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>

            <style jsx>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
                }
                .magnetic-button {
                    position: relative;
                    transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </motion.section>
    )
}
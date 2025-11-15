'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star, ChevronDown } from 'lucide-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function HeroSection() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.02]" />

            {/* Interactive Gradient Orbs */}
            <motion.div
                className="absolute top-0 -left-1/4 w-96 h-96 bg-primary-200 rounded-full opacity-10 blur-3xl"
                animate={{
                    x: mousePosition.x * 0.02,
                    y: mousePosition.y * 0.02,
                }}
                transition={{ type: "spring", stiffness: 50 }}
            />
            <motion.div
                className="absolute bottom-0 -right-1/4 w-96 h-96 bg-neutral-200 rounded-full opacity-10 blur-3xl"
                animate={{
                    x: mousePosition.x * -0.02,
                    y: mousePosition.y * -0.02,
                }}
                transition={{ type: "spring", stiffness: 50 }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-6xl mx-auto"
                >
                    {/* Premium Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-8"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-neutral-200 rounded-full shadow-soft-md hover:shadow-soft-lg transition-all cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <CheckCircle className="w-4 h-4 text-primary-700" />
                            <span className="text-sm font-medium text-neutral-800">Licensed & Insured Since 2019</span>
                        </motion.div>
                    </motion.div>

                    {/* Main Title with Enhanced Typography */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 mb-6">
                            <span className="inline-block">Premium</span>{' '}
                            <span className="inline-block relative">
                                Pet Care
                                <motion.div
                                    className="absolute -bottom-2 left-0 right-0 h-1 bg-primary-700 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                />
                            </span>
                            <span className="block text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-600 mt-2">
                                in Wellesley Hills
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto mb-8">
                            Personalized home boarding for your beloved pets.
                            Currently caring for <span className="font-semibold text-neutral-900 border-b-2 border-primary-700">13 cats</span> and{' '}
                            <span className="font-semibold text-neutral-900 border-b-2 border-primary-700">8 dogs</span> with love and dedication.
                        </p>

                        {/* Enhanced CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-primary-700 rounded-lg blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                                <Link
                                    href="#booking"
                                    className="relative inline-flex items-center gap-2 px-8 py-4 bg-primary-700 text-white rounded-lg font-medium transition-all hover:bg-primary-800 hover:shadow-soft-xl group overflow-hidden"
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
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-700 border-2 border-neutral-200 rounded-lg font-medium transition-all hover:border-primary-700 hover:text-primary-700 hover:shadow-soft-lg group"
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

                    {/* Enhanced Stats with Better Animation */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            { value: 500, label: 'Happy Pets', suffix: '+' },
                            { value: 4.9, label: 'Star Rating', decimals: 1 },
                            { value: 100, label: 'Safety Record', suffix: '%' },
                            { value: 50, label: 'Mile Radius' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.6 + index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="text-center group cursor-pointer"
                            >
                                <div className="bg-white rounded-xl p-4 shadow-soft hover:shadow-soft-lg transition-all">
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
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Enhanced Features Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            { title: '24/7 Supervision', desc: 'Round-the-clock care in a home environment' },
                            { title: 'Daily Updates', desc: 'Photos and videos sent throughout the day' },
                            { title: 'Personalized Care', desc: 'Tailored to each pet\'s unique needs' },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-soft-lg transition-all cursor-pointer group"
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

            {/* Enhanced Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                onClick={() => document.getElementById('current-pets')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center hover:border-primary-700 transition-colors">
                    <motion.div
                        className="w-1.5 h-3 bg-neutral-600 rounded-full mt-2"
                        animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
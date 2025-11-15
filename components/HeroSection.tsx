'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

export default function HeroSection() {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden">
            {/* 微妙的背景装饰 */}
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.02]" />

            {/* 优雅的渐变光效 */}
            <div className="absolute top-0 -left-1/4 w-96 h-96 bg-primary-200 rounded-full opacity-20 blur-3xl" />
            <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-primary-100 rounded-full opacity-20 blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-6xl mx-auto"
                >
                    {/* 顶部标签 */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                            <CheckCircle className="w-4 h-4 text-primary-700" />
                            <span className="text-sm font-medium text-primary-700">Licensed & Insured Since 2019</span>
                        </div>
                    </motion.div>

                    {/* 主标题 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 mb-6">
                            Premium Pet Care
                            <span className="block text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-600 mt-2">
                                in Wellesley Hills
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto mb-8">
                            Personalized home boarding for your beloved pets.
                            Currently caring for <span className="font-semibold text-neutral-900">13 cats</span> and{' '}
                            <span className="font-semibold text-neutral-900">8 dogs</span> with love and dedication.
                        </p>

                        {/* CTA 按钮组 */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href="#booking"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary-700 text-white rounded-lg font-medium transition-all hover:bg-primary-800 hover:shadow-soft-xl group"
                                >
                                    <span>Reserve Your Spot</span>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Link
                                    href="#current-pets"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-700 border border-neutral-200 rounded-lg font-medium transition-all hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-soft"
                                >
                                    <span>Meet Our Residents</span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* 信任指标 - 更优雅的展示 */}
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
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
                                    {inView && (
                                        <CountUp
                                            end={stat.value}
                                            decimals={stat.decimals || 0}
                                            suffix={stat.suffix || ''}
                                            duration={2}
                                        />
                                    )}
                                </div>
                                <p className="text-sm text-neutral-500 font-medium uppercase tracking-wide">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* 底部特色服务 */}
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
                                className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-white hover:shadow-soft-md transition-all"
                            >
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                                    <CheckCircle className="w-6 h-6 text-primary-700" />
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-neutral-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* 优雅的滚动指示器 */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <div className="w-5 h-8 border-2 border-neutral-300 rounded-full flex justify-center">
                    <motion.div
                        className="w-1 h-2 bg-neutral-400 rounded-full mt-1.5"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </section>
    )
}
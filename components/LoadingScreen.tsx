'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PawPrint } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
    const [dimensions, setDimensions] = useState({ width: 1000, height: 800 })
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
    }, [])

    // 模拟加载进度：0 -> 95 来回跑
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return 20
                return prev + 3 + Math.random() * 4
            })
        }, 200)
        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    background:
                        'radial-gradient(circle at 0% 0%, #fdf5f3 0, #f8e3da 25%, #f4d7d7 50%, #f5f3f0 100%)'
                }}
            >
                {/* 玻璃卡片 */}
                <motion.div
                    className="relative px-8 py-6 sm:px-10 sm:py-8 rounded-3xl shadow-2xl border border-white/40 bg-white/60 backdrop-blur-xl text-center max-w-xs sm:max-w-sm"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.18, 1],
                            rotate: [0, 360],
                            filter: ['drop-shadow(0 0 0 rgba(0,0,0,0))', 'drop-shadow(0 10px 25px rgba(0,0,0,0.12))', 'drop-shadow(0 0 0 rgba(0,0,0,0))']
                        }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        className="inline-block mb-4"
                    >
                        <PawPrint className="w-14 h-14 sm:w-16 sm:h-16 text-primary-700" />
                    </motion.div>

                    <motion.h1
                        className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        Coco&apos;s Pet Paradise
                    </motion.h1>

                    <motion.p
                        className="text-xs sm:text-sm text-neutral-500 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        Getting everything cozy for your pets...
                    </motion.p>

                    {/* 进度条 */}
                    <motion.div
                        className="w-full h-2 rounded-full bg-neutral-200/70 overflow-hidden mb-2"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700"
                            style={{ width: `${progress}%` }}
                            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                        />
                    </motion.div>

                    {/* 百分比 + 小点点动画 */}
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-500 mt-1">
                        <span>Preparing pet suites</span>
                        <span className="font-semibold text-neutral-700">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <motion.div
                        className="flex gap-1 justify-center mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-primary-700 rounded-full"
                                animate={{
                                    y: [0, -6, 0],
                                    opacity: [0.4, 1, 0.4]
                                }}
                                transition={{
                                    duration: 0.7,
                                    repeat: Infinity,
                                    delay: i * 0.12
                                }}
                            />
                        ))}
                    </motion.div>

                    {/* 卡片内发光圈 */}
                    <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-primary-400/30 blur-3xl opacity-70" />
                </motion.div>

                {/* Paw prints animation */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-4xl opacity-10"
                            initial={{
                                x: Math.random() * dimensions.width,
                                y: dimensions.height + 100
                            }}
                            animate={{
                                y: -120,
                                rotate: Math.random() * 360
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: 'linear'
                            }}
                        >
                            🐾
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

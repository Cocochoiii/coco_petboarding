'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { PawPrint } from 'lucide-react'
import { useEffect, useState } from 'react'

const TIPS = [
    'Fluffing the pillows in our pet suites...',
    'Preparing toys and enrichment activities...',
    'Checking water bowls and cozy blankets...',
    'Making sure cameras are ready for daily updates...',
]

interface PawPrintConfig {
    id: number
    baseX: number   // 0 ~ 1 比例
    drift: number   // -0.5 ~ 0.5
}

export default function LoadingScreen() {
    const [dimensions, setDimensions] = useState({ width: 1000, height: 800 })
    const [progress, setProgress] = useState(0)
    const [tipIndex, setTipIndex] = useState(0)
    const [pawPrints, setPawPrints] = useState<PawPrintConfig[]>([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateSize = () => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight
                })
            }
            updateSize()
            window.addEventListener('resize', updateSize)
            return () => window.removeEventListener('resize', updateSize)
        }
    }, [])

    // 生成 paw prints 的随机位置（只在客户端、只生成一次）
    useEffect(() => {
        const configs: PawPrintConfig[] = Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            baseX: Math.random(),               // 0~1，之后乘以屏幕宽
            drift: (Math.random() - 0.5) * 0.4  // 左右偏移比例
        }))
        setPawPrints(configs)
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

    // 循环切换小提示文案
    useEffect(() => {
        const tipTimer = setInterval(() => {
            setTipIndex(prev => (prev + 1) % TIPS.length)
        }, 2600)
        return () => clearInterval(tipTimer)
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
                {/* 背景柔光 Orbs */}
                <motion.div
                    className="pointer-events-none absolute -top-24 -left-10 w-80 h-80 rounded-full bg-primary-200/40 blur-3xl"
                    animate={{ x: [0, 40, 0], y: [0, 10, -5] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-primary-300/25 blur-3xl"
                    animate={{ x: [0, -40, 0], y: [0, -15, 10] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.7),transparent_55%)]" />

                {/* 玻璃卡片 */}
                <motion.div
                    className="relative px-8 py-6 sm:px-10 sm:py-8 rounded-3xl shadow-2xl border border-white/50 bg-white/65 backdrop-blur-2xl text-center max-w-xs sm:max-w-sm"
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* 卡片顶部柔光圈 */}
                    <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-primary-200/45 blur-3xl" />

                    {/* Logo + 光晕 */}
                    <motion.div
                        className="relative inline-block mb-4"
                        animate={{
                            scale: [1, 1.12, 1],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        <div className="absolute -inset-4 rounded-full bg-primary-200/40 blur-2xl" />
                        <PawPrint className="relative w-14 h-14 sm:w-16 sm:h-16 text-primary-700 drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]" />
                    </motion.div>

                    <motion.h1
                        className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        Coco&apos;s Pet Paradise
                    </motion.h1>

                    <motion.p
                        className="text-xs sm:text-sm text-neutral-500 mb-4"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        Getting everything cozy for your pets...
                    </motion.p>

                    {/* 进度条 */}
                    <motion.div
                        className="w-full h-2 rounded-full bg-neutral-200/80 overflow-hidden mb-2 relative"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary-400 via-primary-600 to-primary-700"
                            style={{ width: `${progress}%` }}
                            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                        />
                        {/* 高光扫光 */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                        />
                    </motion.div>

                    {/* 百分比 */}
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-500 mt-1 mb-1.5">
                        <span>Preparing pet suites</span>
                        <span className="font-semibold text-neutral-800">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    {/* 轮播提示文案 */}
                    <div className="h-8 sm:h-9 flex items-center justify-center mt-1">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={tipIndex}
                                className="text-[11px] sm:text-xs text-neutral-500 px-3"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.25 }}
                            >
                                {TIPS[tipIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* 小点点跳动 */}
                    <motion.div
                        className="flex gap-1 justify-center mt-1"
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

                    {/* 卡片底部发光圈 */}
                    <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-primary-400/30 blur-3xl opacity-80" />
                </motion.div>

                {/* 背景 Paw prints animation：用预生成的随机配置 */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {pawPrints.map(p => {
                        const startX = p.baseX * dimensions.width
                        const driftX = p.drift * dimensions.width * 0.3 // 漂移幅度按屏宽比例
                        return (
                            <motion.div
                                key={p.id}
                                className="absolute text-4xl opacity-15"
                                initial={{
                                    x: startX,
                                    y: dimensions.height + 120
                                }}
                                animate={{
                                    y: -140,
                                    x: startX + driftX,
                                    rotate: 360
                                }}
                                transition={{
                                    duration: 4 + p.id * 0.3,
                                    repeat: Infinity,
                                    delay: p.id * 0.6,
                                    ease: 'linear'
                                }}
                            >
                                🐾
                            </motion.div>
                        )
                    })}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

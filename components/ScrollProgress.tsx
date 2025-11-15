'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
    const opacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1])

    return (
        <>
            {/* Top Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 z-50"
                style={{ opacity }}
            >
                <motion.div
                    className="h-full bg-gradient-to-r from-primary-600 to-primary-700"
                    style={{ width }}
                />
            </motion.div>

            {/* Side Progress Indicator */}
            <motion.div
                className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2"
                style={{ opacity }}
            >
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 h-8 bg-neutral-200 rounded-full overflow-hidden"
                    >
                        <motion.div
                            className="w-full bg-primary-700"
                            style={{
                                height: useTransform(
                                    scrollYProgress,
                                    [i * 0.125, (i + 1) * 0.125],
                                    ['0%', '100%']
                                )
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </>
    )
}
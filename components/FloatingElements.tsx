'use client'

import { motion } from 'framer-motion'

export default function FloatingElements() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Floating Paw Prints */}
            <motion.div
                className="absolute top-1/4 left-1/4 text-4xl opacity-10"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                🐾
            </motion.div>

            <motion.div
                className="absolute top-3/4 right-1/4 text-5xl opacity-10"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -15, 15, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                🐾
            </motion.div>

            <motion.div
                className="absolute bottom-1/4 left-1/3 text-3xl opacity-10"
                animate={{
                    x: [0, 20, -20, 0],
                    y: [0, -10, 10, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                🦴
            </motion.div>

            <motion.div
                className="absolute top-1/2 right-1/3 text-4xl opacity-10"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                ❤️
            </motion.div>
        </div>
    )
}
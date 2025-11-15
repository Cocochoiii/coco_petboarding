'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InteractiveBackground() {
    const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (Math.random() > 0.95) { // Only create particles occasionally
                const newParticle = {
                    id: Date.now(),
                    x: e.clientX,
                    y: e.clientY,
                }
                setParticles((prev) => [...prev.slice(-10), newParticle]) // Keep only last 10 particles
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <AnimatePresence>
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-primary-500/20 rounded-full"
                        initial={{
                            x: particle.x,
                            y: particle.y,
                            scale: 0,
                            opacity: 0
                        }}
                        animate={{
                            x: particle.x + (Math.random() - 0.5) * 100,
                            y: particle.y + (Math.random() - 0.5) * 100,
                            scale: [0, 2, 0],
                            opacity: [0, 0.5, 0]
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        onAnimationComplete={() => {
                            setParticles((prev) => prev.filter((p) => p.id !== particle.id))
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Gradient Orbs with warm cream-pink tones */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-300 rounded-full blur-3xl opacity-10"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    )
}
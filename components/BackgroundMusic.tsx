'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music } from 'lucide-react'
import toast from 'react-hot-toast'

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.3) // 30% volume by default
    const [showVolumeSlider, setShowVolumeSlider] = useState(false)
    const [userInteracted, setUserInteracted] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        // Try to play music after user interaction
        const handleUserInteraction = () => {
            if (!userInteracted && audioRef.current) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true)
                        setUserInteracted(true)
                    })
                    .catch(() => {
                        // Autoplay was prevented, wait for user to click play button
                    })
            }
        }

        // Listen for any user interaction
        document.addEventListener('click', handleUserInteraction)
        document.addEventListener('touchstart', handleUserInteraction)

        // Try autoplay on load (might be blocked by browser)
        if (audioRef.current) {
            audioRef.current.volume = volume
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true)
                    setUserInteracted(true)
                })
                .catch(() => {
                    // Show a subtle notification that music is available
                    setTimeout(() => {
                        toast('🎵 Click the music button to play background music', {
                            duration: 5000,
                            style: {
                                background: 'linear-gradient(135deg, #3A3330 0%, #2A2522 100%)',
                                color: '#fff',
                                borderRadius: '12px',
                            },
                        })
                    }, 1000)
                })
        }

        return () => {
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('touchstart', handleUserInteraction)
        }
    }, [])

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true)
                        setUserInteracted(true)
                    })
                    .catch(() => {
                        toast.error('Unable to play audio')
                    })
            }
        }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
        }
    }

    return (
        <>
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                loop
                preload="auto"
                src="/audio/animal-crossing-bgm.mp3" // You need to add your audio file here
            >
                Your browser does not support the audio element.
            </audio>

            {/* Music Control Button - Fixed position */}
            <motion.div
                className="fixed bottom-24 right-6 z-40"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            >
                <div className="relative">
                    {/* Main button */}
                    <motion.button
                        onClick={togglePlay}
                        onMouseEnter={() => setShowVolumeSlider(true)}
                        onMouseLeave={() => setShowVolumeSlider(false)}
                        className={`relative bg-gradient-to-br ${
                            isPlaying
                                ? 'from-primary-600 to-primary-700'
                                : 'from-neutral-600 to-neutral-700'
                        } text-white p-3 rounded-2xl shadow-soft-xl hover:shadow-soft-2xl transition-all group`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <AnimatePresence mode="wait">
                            {isPlaying ? (
                                <motion.div
                                    key="playing"
                                    initial={{ rotate: -180, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 180, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Volume2 className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="muted"
                                    initial={{ rotate: 180, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -180, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <VolumeX className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Animated music notes when playing */}
                        {isPlaying && (
                            <>
                                <motion.div
                                    className="absolute -top-2 -right-2"
                                    animate={{
                                        y: [-10, -20, -10],
                                        opacity: [0, 1, 0],
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    <span className="text-xs">🎵</span>
                                </motion.div>
                                <motion.div
                                    className="absolute -top-2 left-0"
                                    animate={{
                                        y: [-10, -20, -10],
                                        opacity: [0, 1, 0],
                                        rotate: [0, -10, 10, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: 1.5,
                                    }}
                                >
                                    <span className="text-xs">🎶</span>
                                </motion.div>
                            </>
                        )}

                        {/* Ripple effect when playing */}
                        {isPlaying && (
                            <motion.div
                                className="absolute inset-0 rounded-2xl"
                                animate={{
                                    scale: [1, 1.5, 1.5],
                                    opacity: [0.3, 0, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                style={{
                                    background: 'radial-gradient(circle, rgba(212, 165, 165, 0.4), transparent)',
                                }}
                            />
                        )}
                    </motion.button>

                    {/* Volume slider */}
                    <AnimatePresence>
                        {showVolumeSlider && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="absolute bottom-0 right-full mr-3 bg-white rounded-xl shadow-soft-xl p-3 border-2 border-neutral-100"
                                onMouseEnter={() => setShowVolumeSlider(true)}
                                onMouseLeave={() => setShowVolumeSlider(false)}
                            >
                                <div className="flex items-center gap-3">
                                    <Music className="w-4 h-4 text-neutral-600" />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="w-24 accent-primary-700"
                                    />
                                    <span className="text-xs text-neutral-600 w-10">
                                        {Math.round(volume * 100)}%
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tooltip */}
                    <AnimatePresence>
                        {!userInteracted && (
                            <motion.div
                                className="absolute bottom-full mb-2 right-0 bg-neutral-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                            >
                                Click to play music 🎵
                                <div className="absolute bottom-0 right-4 transform translate-y-full">
                                    <div className="border-4 border-transparent border-t-neutral-900" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Mobile-friendly music indicator */}
            {isPlaying && (
                <motion.div
                    className="fixed top-20 left-4 z-30 md:hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            🎵
                        </motion.div>
                        <span>Playing: Animal Crossing</span>
                    </div>
                </motion.div>
            )}
        </>
    )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Cat,
    Dog,
    Heart,
    Star,
    Calendar,
    Home,
    Sparkles,
    X,
    ChevronLeft,
    ChevronRight,
    Camera
} from 'lucide-react'
import { currentPets } from '@/data/pets'
import Image from 'next/image'

export default function CurrentPets() {
    const [filter, setFilter] = useState<'all' | 'cat' | 'dog'>('all')
    const [selectedPet, setSelectedPet] = useState<typeof currentPets[0] | null>(null)
    const [hoveredPet, setHoveredPet] = useState<string | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const filteredPets = filter === 'all'
        ? currentPets
        : currentPets.filter(pet => pet.type === filter)

    const cats = currentPets.filter(p => p.type === 'cat')
    const dogs = currentPets.filter(p => p.type === 'dog')

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % 3)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + 3) % 3)
    }

    const openPetModal = (pet: typeof currentPets[0]) => {
        setSelectedPet(pet)
        setCurrentImageIndex(0)
    }

    return (
        <section id="current-pets" className="py-20 bg-gradient-to-b from-white to-neutral-50">
            <div className="container mx-auto px-4">
                {/* ========= Title + Left/Right SVG ========= */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 relative"
                >
                    {/* 🌟 Mobile SVG：标题上方的小图，桌面端隐藏 */}
                    <div className="flex items-center justify-center gap-4 mb-4 lg:hidden">
                        <Image
                            src="/svgs/current-pets-left.svg"
                            alt="Current pets decoration left"
                            width={72}
                            height={72}
                            className="w-16 h-16 opacity-90"
                            priority
                        />
                        <Image
                            src="/svgs/current-pets-right.svg"
                            alt="Current pets decoration right"
                            width={72}
                            height={72}
                            className="w-16 h-16 opacity-90"
                            priority
                        />
                    </div>

                    {/* LEFT SVG - 桌面端左右两侧保持原样 */}
                    <motion.div
                        className="hidden lg:block absolute top-4 left-0"
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        whileInView={{
                            opacity: 1,
                            x: -10,
                            scale: 1.8,
                            y: [0, -20, 0],
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            y: {
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            },
                        }}
                    >
                        <Image
                            src="/svgs/current-pets-left.svg"
                            alt="Current pets decoration left"
                            width={200}
                            height={200}
                            className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 opacity-90"
                            priority
                        />
                    </motion.div>

                    {/* RIGHT SVG - 桌面端 */}
                    <motion.div
                        className="hidden lg:block absolute top-4 right-0"
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        whileInView={{
                            opacity: 1,
                            x: 10,
                            scale: 1.8,
                            y: [0, -20, 0],
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            y: {
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            },
                        }}
                    >
                        <Image
                            src="/svgs/current-pets-right.svg"
                            alt="Current pets decoration right"
                            width={200}
                            height={200}
                            className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 opacity-90"
                            priority
                        />
                    </motion.div>

                    {/* 标题 + 文案 + stats */}
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-neutral-900">
                            Our Current <span className="text-gradient">Furry Residents</span>
                        </h2>
                        <p className="text-base md:text-xl text-neutral-600 max-w-3xl mx-auto">
                            Meet the adorable pets currently enjoying their stay at Coco&apos;s Paradise.
                            Each one receives personalized care and endless love!
                        </p>

                        {/* Stats */}
                        <div className="flex justify-center gap-4 md:gap-8 mt-6 md:mt-8">
                            <motion.div
                                className="flex items-center gap-2 bg-white border-2 border-primary-700 px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-soft-md text-sm md:text-base"
                                whileHover={{ scale: 1.05, shadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                            >
                                <Cat className="w-5 h-5 md:w-6 md:h-6 text-primary-700" />
                                <span className="font-bold text-neutral-900">{cats.length} Cats</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center gap-2 bg-white border-2 border-neutral-700 px-4 md:px-6 py-2.5 md:py-3 rounded-full shadow-soft-md text-sm md:text-base"
                                whileHover={{ scale: 1.05, shadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                            >
                                <Dog className="w-5 h-5 md:w-6 md:h-6 text-neutral-700" />
                                <span className="font-bold text-neutral-900">{dogs.length} Dogs</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Filter Pills */}
                <div className="flex justify-center gap-3 md:gap-4 mb-10 md:mb-12">
                    {[
                        { value: 'all', label: 'All Pets', icon: Heart },
                        { value: 'cat', label: 'Cats', icon: Cat },
                        { value: 'dog', label: 'Dogs', icon: Dog },
                    ].map((option) => (
                        <motion.button
                            key={option.value}
                            onClick={() => setFilter(option.value as any)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden text-sm md:text-base ${
                                filter === option.value
                                    ? 'bg-neutral-900 text-white shadow-soft-lg'
                                    : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-neutral-400 hover:shadow-soft-md'
                            }`}
                        >
                            <option.icon className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
                            <span className="relative z-10">{option.label}</span>
                            {filter === option.value && (
                                <motion.div
                                    className="absolute inset-0 bg-primary-700"
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Pet Grid：手机 2 列，小平板 3 列，桌面 4 列 */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPets.map((pet, index) => (
                            <motion.div
                                key={pet.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onMouseEnter={() => setHoveredPet(pet.id)}
                                onMouseLeave={() => setHoveredPet(null)}
                                onClick={() => openPetModal(pet)}
                                className="relative group cursor-pointer"
                            >
                                <motion.div
                                    className="bg-white rounded-2xl shadow-soft-md border-2 border-transparent overflow-hidden hover:border-primary-700 hover:shadow-soft-xl transition-all duration-300"
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Status Badge */}
                                    {pet.status === 'resident' && (
                                        <motion.div
                                            className="absolute top-2 left-2 z-10 bg-neutral-900 text-white px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring' }}
                                        >
                                            <Home className="w-3 h-3" />
                                            Resident
                                        </motion.div>
                                    )}

                                    {/* Image */}
                                    <div className="aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 relative overflow-hidden">
                                        <div className="absolute inset-0">
                                            {pet.image && pet.image !== '' ? (
                                                <Image
                                                    src={pet.image}
                                                    alt={pet.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-neutral-100">
                                                    {pet.type === 'cat' ? (
                                                        <Cat className="w-16 h-16 sm:w-20 sm:h-20 text-primary-200" />
                                                    ) : (
                                                        <Dog className="w-16 h-16 sm:w-20 sm:h-20 text-neutral-300" />
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Photo Count Badge */}
                                        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs flex items-center gap-1">
                                            <Camera className="w-3 h-3" />
                                            <span>3</span>
                                        </div>

                                        {/* Hover Overlay */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredPet === pet.id ? 1 : 0 }}
                                            className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/20 to-transparent flex items-end p-2 sm:p-4"
                                        >
                                            <div className="text-white">
                                                <p className="text-[11px] sm:text-sm font-medium flex items-center gap-2">
                                                    <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    Click to see more photos
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Pet Info */}
                                    <div className="p-3 sm:p-5">
                                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                                            <div>
                                                <h3 className="font-bold text-sm sm:text-lg text-neutral-900">
                                                    {pet.name}
                                                </h3>
                                                <p className="text-[11px] sm:text-sm text-neutral-500">
                                                    {pet.breed}
                                                </p>
                                                {pet.age && (
                                                    <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">
                                                        {pet.age}
                                                    </p>
                                                )}
                                            </div>
                                            <motion.div
                                                animate={{ scale: hoveredPet === pet.id ? 1.2 : 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {pet.type === 'cat' ? (
                                                    <Cat className="w-5 h-5 sm:w-6 sm:h-6 text-primary-700" />
                                                ) : (
                                                    <Dog className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Personality Tags */}
                                        <div className="flex flex-wrap gap-1">
                                            {pet.personality.slice(0, 2).map((trait) => (
                                                <span
                                                    key={trait}
                                                    className="text-[10px] sm:text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                                                >
                                                    {trait}
                                                </span>
                                            ))}
                                            {pet.personality.length > 2 && (
                                                <span className="text-[10px] sm:text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                                                    +{pet.personality.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Modal */}
                <AnimatePresence>
                    {selectedPet && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedPet(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Image Gallery Header */}
                                <div className="relative h-72 sm:h-96 bg-gradient-to-br from-primary-50 to-neutral-50">
                                    <motion.button
                                        onClick={() => setSelectedPet(null)}
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-soft-md hover:shadow-soft-lg transition-shadow z-20"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
                                    </motion.button>

                                    {/* Image Carousel */}
                                    <div className="relative w-full h-full">
                                        {selectedPet.images && selectedPet.images.length > 0 ? (
                                            <>
                                                <div className="absolute inset-0">
                                                    <Image
                                                        src={selectedPet.images[currentImageIndex]}
                                                        alt={`${selectedPet.name} - Photo ${currentImageIndex + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-soft-lg hover:bg-white transition-all"
                                                >
                                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-soft-lg hover:bg-white transition-all"
                                                >
                                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700" />
                                                </button>

                                                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                                                    {[0, 1, 2].map((index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentImageIndex(index)}
                                                            className={`rounded-full transition-all ${
                                                                currentImageIndex === index
                                                                    ? 'w-6 sm:w-8 h-2 bg-white'
                                                                    : 'w-2 h-2 bg-white/60 hover:bg-white/80'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-center">
                                                    {selectedPet.type === 'cat' ? (
                                                        <Cat className="w-24 h-24 sm:w-32 sm:h-32 text-primary-300 mx-auto mb-4" />
                                                    ) : (
                                                        <Dog className="w-24 h-24 sm:w-32 sm:h-32 text-neutral-400 mx-auto mb-4" />
                                                    )}
                                                    <p className="text-neutral-500">Photos coming soon!</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Thumbnail Strip */}
                                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2 bg-white rounded-lg p-2 shadow-soft-lg">
                                            {[0, 1, 2].map((index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                        currentImageIndex === index
                                                            ? 'border-primary-700'
                                                            : 'border-neutral-200 hover:border-neutral-400'
                                                    }`}
                                                >
                                                    {selectedPet.images && selectedPet.images[index] ? (
                                                        <Image
                                                            src={selectedPet.images[index]}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            width={80}
                                                            height={80}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary-50 to-neutral-100 flex items-center justify-center">
                                                            <Camera className="w-6 h-6 text-neutral-400" />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedPet.status === 'resident' && (
                                        <div className="absolute top-4 left-4 bg-neutral-900 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Original Resident
                                        </div>
                                    )}
                                </div>

                                {/* Modal Content */}
                                <div className="p-6 sm:p-8 pt-20">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-3">
                                        <div>
                                            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                                                {selectedPet.name}
                                            </h3>
                                            <p className="text-base sm:text-lg text-neutral-600">
                                                {selectedPet.breed}
                                            </p>
                                            {selectedPet.age && (
                                                <p className="text-sm text-neutral-500 mt-1">
                                                    Age: {selectedPet.age}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 bg-primary-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary-200">
                                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700 fill-primary-700" />
                                            <span className="font-semibold text-primary-900 text-xs sm:text-sm">
                                                Star Guest
                                            </span>
                                        </div>
                                    </div>

                                    {/* Personality */}
                                    <div className="mb-5 sm:mb-6">
                                        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-neutral-900">
                                            <Heart className="w-5 h-5 text-primary-700" />
                                            Personality Traits
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPet.personality.map((trait) => (
                                                <motion.span
                                                    key={trait}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="px-3 sm:px-4 py-1.5 bg-neutral-100 text-neutral-700 rounded-full font-medium text-xs sm:text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-default"
                                                >
                                                    {trait}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Favorite Activities */}
                                    <div className="mb-5 sm:mb-6">
                                        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2 text-neutral-900">
                                            <Sparkles className="w-5 h-5 text-primary-700" />
                                            Favorite Activities
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedPet.favoriteActivities.map((activity, idx) => (
                                                <motion.div
                                                    key={activity}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="flex items-center gap-2 bg-neutral-50 p-3 rounded-lg hover:bg-primary-50 transition-colors"
                                                >
                                                    <div className="w-2 h-2 bg-primary-700 rounded-full" />
                                                    <span className="text-neutral-700 text-sm">
                                                        {activity}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Member Since */}
                                    <div className="flex items-center gap-2 text-neutral-500">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-xs sm:text-sm">
                                            Member since{' '}
                                            {new Date(selectedPet.joinedDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

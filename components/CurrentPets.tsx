'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cat, Dog, Heart, Star, Calendar, Home, Sparkles } from 'lucide-react'
import { currentPets } from '@/data/pets'
import Image from 'next/image'

export default function CurrentPets() {
    const [filter, setFilter] = useState<'all' | 'cat' | 'dog'>('all')
    const [selectedPet, setSelectedPet] = useState<typeof currentPets[0] | null>(null)
    const [hoveredPet, setHoveredPet] = useState<string | null>(null)

    const filteredPets = filter === 'all'
        ? currentPets
        : currentPets.filter(pet => pet.type === filter)

    const cats = currentPets.filter(p => p.type === 'cat')
    const dogs = currentPets.filter(p => p.type === 'dog')

    return (
        <section id="current-pets" className="py-20 bg-gradient-to-b from-white to-neutral-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl font-display font-bold mb-4 text-neutral-900">
                        Our Current <span className="text-gradient">Furry Residents</span>
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                        Meet the adorable pets currently enjoying their stay at Coco's Paradise.
                        Each one receives personalized care and endless love!
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-8 mt-8">
                        <div className="flex items-center gap-2 bg-primary-50 border border-primary-100 px-6 py-3 rounded-full">
                            <Cat className="w-6 h-6 text-primary-700" />
                            <span className="font-bold text-primary-900">{cats.length} Cats</span>
                        </div>
                        <div className="flex items-center gap-2 bg-primary-50 border border-primary-100 px-6 py-3 rounded-full">
                            <Dog className="w-6 h-6 text-primary-700" />
                            <span className="font-bold text-primary-900">{dogs.length} Dogs</span>
                        </div>
                    </div>
                </motion.div>

                {/* Filter Pills */}
                <div className="flex justify-center gap-4 mb-12">
                    {[
                        { value: 'all', label: 'All Pets', icon: Heart },
                        { value: 'cat', label: 'Cats', icon: Cat },
                        { value: 'dog', label: 'Dogs', icon: Dog },
                    ].map((option) => (
                        <motion.button
                            key={option.value}
                            onClick={() => setFilter(option.value as any)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                                filter === option.value
                                    ? 'bg-primary-700 text-white shadow-soft-lg'
                                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300 hover:shadow-soft'
                            }`}
                        >
                            <option.icon className="w-5 h-5" />
                            {option.label}
                        </motion.button>
                    ))}
                </div>

                {/* Pet Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                                onClick={() => setSelectedPet(pet)}
                                className="relative group cursor-pointer"
                            >
                                <div className="bg-white rounded-2xl shadow-soft-md border border-neutral-100 overflow-hidden hover:shadow-soft-xl transition-all">
                                    {/* Status Badge */}
                                    {pet.status === 'resident' && (
                                        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary-700 to-primary-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <Home className="w-3 h-3" />
                                            Resident
                                        </div>
                                    )}

                                    {/* Image Container */}
                                    <div className="aspect-square bg-gradient-to-br from-neutral-50 to-neutral-100 relative overflow-hidden">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {pet.type === 'cat' ? (
                                                <Cat className="w-20 h-20 text-neutral-300" />
                                            ) : (
                                                <Dog className="w-20 h-20 text-neutral-300" />
                                            )}
                                        </div>

                                        {/* Hover Overlay */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredPet === pet.id ? 1 : 0 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4"
                                        >
                                            <div className="text-white">
                                                <p className="text-sm font-medium">Click to meet {pet.name}!</p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Pet Info */}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-bold text-lg text-neutral-900">{pet.name}</h3>
                                                <p className="text-sm text-neutral-500">{pet.breed}</p>
                                                {pet.age && (
                                                    <p className="text-xs text-neutral-400 mt-1">{pet.age}</p>
                                                )}
                                            </div>
                                            <motion.div
                                                animate={{ rotate: hoveredPet === pet.id ? 360 : 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {pet.type === 'cat' ? (
                                                    <Cat className="w-6 h-6 text-primary-600" />
                                                ) : (
                                                    <Dog className="w-6 h-6 text-primary-700" />
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Personality Tags */}
                                        <div className="flex flex-wrap gap-1">
                                            {pet.personality.slice(0, 2).map((trait) => (
                                                <span
                                                    key={trait}
                                                    className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full"
                                                >
                                                    {trait}
                                                </span>
                                            ))}
                                            {pet.personality.length > 2 && (
                                                <span className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full">
                                                    +{pet.personality.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pet Modal */}
                <AnimatePresence>
                    {selectedPet && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedPet(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="relative h-64 bg-gradient-to-br from-primary-50 to-primary-100">
                                    <button
                                        onClick={() => setSelectedPet(null)}
                                        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
                                    >
                                        ×
                                    </button>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {selectedPet.type === 'cat' ? (
                                            <Cat className="w-32 h-32 text-primary-300" />
                                        ) : (
                                            <Dog className="w-32 h-32 text-primary-300" />
                                        )}
                                    </div>
                                    {selectedPet.status === 'resident' && (
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-700 to-primary-800 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                            <Sparkles className="w-4 h-4" />
                                            Original Resident
                                        </div>
                                    )}
                                </div>

                                {/* Modal Content */}
                                <div className="p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h3 className="text-3xl font-bold text-neutral-900">{selectedPet.name}</h3>
                                            <p className="text-lg text-neutral-600">{selectedPet.breed}</p>
                                            {selectedPet.age && (
                                                <p className="text-sm text-neutral-500 mt-1">Age: {selectedPet.age}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full">
                                            <Star className="w-5 h-5 text-primary-600 fill-primary-600" />
                                            <span className="font-semibold text-primary-900">Star Guest</span>
                                        </div>
                                    </div>

                                    {/* Personality */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                            <Heart className="w-5 h-5 text-primary-600" />
                                            Personality Traits
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPet.personality.map((trait) => (
                                                <span
                                                    key={trait}
                                                    className="px-4 py-2 bg-primary-50 text-neutral-700 rounded-full font-medium"
                                                >
                                                    {trait}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Favorite Activities */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-primary-600" />
                                            Favorite Activities
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {selectedPet.favoriteActivities.map((activity) => (
                                                <div
                                                    key={activity}
                                                    className="flex items-center gap-2 bg-neutral-50 p-3 rounded-lg"
                                                >
                                                    <div className="w-2 h-2 bg-primary-600 rounded-full" />
                                                    <span className="text-neutral-700">{activity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Member Since */}
                                    <div className="flex items-center gap-2 text-neutral-500">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">
                                            Member since {new Date(selectedPet.joinedDate).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
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
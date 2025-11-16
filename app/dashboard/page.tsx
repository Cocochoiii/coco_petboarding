'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, LogOut, Calendar, Heart, Settings, Plus, Camera, Edit, Trash2, Home } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Pet {
    id: string
    name: string
    type: 'cat' | 'dog'
    breed: string
    age: string
    notes: string
}

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [pets, setPets] = useState<Pet[]>([])
    const [showAddPet, setShowAddPet] = useState(false)
    const [newPet, setNewPet] = useState<Partial<Pet>>({
        type: 'dog'
    })

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user')
        if (!userData) {
            router.push('/client-portal')
            return
        }
        setUser(JSON.parse(userData))

        // Load pets from localStorage
        const savedPets = localStorage.getItem('pets')
        if (savedPets) {
            setPets(JSON.parse(savedPets))
        }
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('pets')
        toast.success('Logged out successfully', {
            style: {
                background: '#111827',
                color: '#fff',
            }
        })
        router.push('/client-portal')
    }

    const handleAddPet = (e: React.FormEvent) => {
        e.preventDefault()
        const pet = {
            ...newPet,
            id: Date.now().toString()
        } as Pet

        const updatedPets = [...pets, pet]
        setPets(updatedPets)
        localStorage.setItem('pets', JSON.stringify(updatedPets))

        setShowAddPet(false)
        setNewPet({ type: 'dog' })

        toast.success('Pet added successfully!', {
            style: {
                background: '#111827',
                color: '#fff',
            }
        })
    }

    const handleDeletePet = (id: string) => {
        const updatedPets = pets.filter(pet => pet.id !== id)
        setPets(updatedPets)
        localStorage.setItem('pets', JSON.stringify(updatedPets))

        toast.success('Pet removed', {
            style: {
                background: '#111827',
                color: '#fff',
            }
        })
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-neutral-50">
            {/* Header */}
            <div className="bg-white border-b border-neutral-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <Heart className="w-6 h-6 text-primary-700" />
                            <span className="font-bold text-xl">Coco's Pet Paradise</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-neutral-600 hover:text-primary-700 transition-colors">
                                <Home className="w-5 h-5" />
                            </Link>
                            <button className="text-neutral-600 hover:text-primary-700 transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-neutral-600 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                        Welcome back, {user.name || user.email}! 👋
                    </h1>
                    <p className="text-neutral-600">Manage your pets and bookings all in one place</p>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                >
                    <Link href="/#booking" className="bg-primary-700 text-white rounded-2xl p-6 hover:bg-primary-800 transition-all">
                        <Calendar className="w-8 h-8 mb-3" />
                        <h3 className="font-bold mb-1">Book a Stay</h3>
                        <p className="text-primary-100 text-sm">Schedule your pet's next visit</p>
                    </Link>

                    <button
                        onClick={() => setShowAddPet(true)}
                        className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-primary-700 transition-all text-left"
                    >
                        <Plus className="w-8 h-8 mb-3 text-primary-700" />
                        <h3 className="font-bold mb-1 text-neutral-900">Add Pet</h3>
                        <p className="text-neutral-600 text-sm">Register a new pet profile</p>
                    </button>

                    <Link href="/#contact" className="bg-white rounded-2xl p-6 border-2 border-neutral-200 hover:border-primary-700 transition-all">
                        <Heart className="w-8 h-8 mb-3 text-primary-700" />
                        <h3 className="font-bold mb-1 text-neutral-900">Contact Us</h3>
                        <p className="text-neutral-600 text-sm">Get in touch with our team</p>
                    </Link>
                </motion.div>

                {/* My Pets Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold mb-4 text-neutral-900">My Pets</h2>

                    {pets.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-neutral-300">
                            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-10 h-10 text-primary-700" />
                            </div>
                            <p className="text-neutral-600 mb-4">You haven't added any pets yet</p>
                            <button
                                onClick={() => setShowAddPet(true)}
                                className="bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-800 transition-all"
                            >
                                Add Your First Pet
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pets.map((pet) => (
                                <motion.div
                                    key={pet.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white rounded-2xl p-6 border-2 border-neutral-100 hover:border-primary-700 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                            <span className="text-2xl">{pet.type === 'cat' ? '🐱' : '🐕'}</span>
                                        </div>
                                        <button
                                            onClick={() => handleDeletePet(pet.id)}
                                            className="text-neutral-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <h3 className="font-bold text-lg text-neutral-900 mb-1">{pet.name}</h3>
                                    <p className="text-sm text-neutral-600 mb-1">{pet.breed}</p>
                                    <p className="text-sm text-neutral-500 mb-3">Age: {pet.age}</p>

                                    {pet.notes && (
                                        <p className="text-xs text-neutral-500 italic">"{pet.notes}"</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Add Pet Modal */}
                {showAddPet && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-neutral-900">Add New Pet</h3>

                            <form onSubmit={handleAddPet} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Pet Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newPet.name || ''}
                                        onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Type
                                    </label>
                                    <select
                                        value={newPet.type}
                                        onChange={(e) => setNewPet({ ...newPet, type: e.target.value as 'cat' | 'dog' })}
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none"
                                    >
                                        <option value="dog">Dog</option>
                                        <option value="cat">Cat</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Breed
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newPet.breed || ''}
                                        onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Age
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newPet.age || ''}
                                        onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none"
                                        placeholder="e.g., 2 years"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Notes (optional)
                                    </label>
                                    <textarea
                                        value={newPet.notes || ''}
                                        onChange={(e) => setNewPet({ ...newPet, notes: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none"
                                        rows={3}
                                        placeholder="Any special needs or preferences..."
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddPet(false)}
                                        className="flex-1 py-3 border-2 border-neutral-200 rounded-lg hover:border-neutral-400 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-all"
                                    >
                                        Add Pet
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    )
}
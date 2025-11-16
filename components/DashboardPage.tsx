'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User, LogOut, Calendar, Heart, Settings, Plus, Trash2, Home,
    Edit3, Save, X, Shield, Bell, Clock, MapPin, Phone, Mail,
    ChevronRight, PawPrint, Star, TrendingUp, Users, DollarSign,
    FileText, Camera, Award, Activity, CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Pet {
    id: string
    name: string
    type: 'cat' | 'dog'
    breed: string
    age: string
    weight?: string
    vaccinated?: boolean
    specialNeeds?: string
    owner?: string
    image?: string
    boardingHistory?: Array<{ date: string; duration: string; notes?: string }>
}

interface Booking {
    id: string
    petName: string
    startDate: string
    endDate: string
    status: 'pending' | 'confirmed' | 'completed'
    notes?: string
}

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [pets, setPets] = useState<Pet[]>([])
    const [bookings, setBookings] = useState<Booking[]>([])
    const [showAddPet, setShowAddPet] = useState(false)
    const [editingPet, setEditingPet] = useState<string | null>(null)
    const [newPet, setNewPet] = useState<Partial<Pet>>({ type: 'dog', vaccinated: true })
    const [activeTab, setActiveTab] = useState<'overview' | 'pets' | 'bookings' | 'settings'>('overview')
    const [siteSettings, setSiteSettings] = useState({
        siteName: "Coco's Pet Paradise",
        tagline: "Premium Pet Boarding in Wellesley Hills",
        contactEmail: "hcaicoco@gmail.com",
        contactPhone: "(555) 123-4567",
        address: "Wellesley Hills, MA 02481"
    })

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (!userData && window.location.pathname === '/dashboard') {
            router.replace('/client-portal')
            return
        }

        if (userData) {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)

            // Load pets
            const savedPets = localStorage.getItem('pets')
            if (savedPets) {
                setPets(JSON.parse(savedPets))
            }

            // Load bookings
            const savedBookings = localStorage.getItem('bookings')
            if (savedBookings) {
                setBookings(JSON.parse(savedBookings))
            }

            // Load site settings
            const savedSettings = localStorage.getItem('siteSettings')
            if (savedSettings) {
                setSiteSettings(JSON.parse(savedSettings))
            }
        }
    }, [router])

    const handleLogout = () => {
        sessionStorage.setItem('fromLogout', 'true')
        localStorage.removeItem('user')
        toast.success('Logged out successfully', {
            icon: '👋',
            style: {
                background: 'linear-gradient(135deg, #3A3330 0%, #2A2522 100%)',
                color: '#fff',
                borderRadius: '12px',
                border: '1px solid rgba(238, 225, 219, 0.1)',
            }
        })
        router.replace('/client-portal')
    }

    const handleAddPet = () => {
        if (user?.role !== 'admin') {
            toast.error('Only admins can add pets')
            return
        }

        const pet = {
            ...(newPet as Pet),
            id: Date.now().toString(),
            owner: user.email
        }
        const updatedPets = [...pets, pet]
        setPets(updatedPets)
        localStorage.setItem('pets', JSON.stringify(updatedPets))
        setShowAddPet(false)
        setNewPet({ type: 'dog', vaccinated: true })
        toast.success('Pet added successfully! 🐾', {
            style: {
                background: 'linear-gradient(135deg, #3A3330 0%, #2A2522 100%)',
                color: '#fff',
                borderRadius: '12px',
                border: '1px solid rgba(238, 225, 219, 0.1)',
            }
        })
    }

    const handleUpdatePet = (id: string, updates: Partial<Pet>) => {
        if (user?.role !== 'admin') {
            toast.error('Only admins can edit pets')
            return
        }

        const updatedPets = pets.map(pet =>
            pet.id === id ? { ...pet, ...updates } : pet
        )
        setPets(updatedPets)
        localStorage.setItem('pets', JSON.stringify(updatedPets))
        setEditingPet(null)
        toast.success('Pet updated! 📝', {
            style: {
                background: 'linear-gradient(135deg, #3A3330 0%, #2A2522 100%)',
                color: '#fff',
                borderRadius: '12px',
                border: '1px solid rgba(238, 225, 219, 0.1)',
            }
        })
    }

    const handleDeletePet = (id: string) => {
        if (user?.role !== 'admin') {
            toast.error('Only admins can remove pets')
            return
        }

        const updatedPets = pets.filter(pet => pet.id !== id)
        setPets(updatedPets)
        localStorage.setItem('pets', JSON.stringify(updatedPets))
        toast.success('Pet removed', {
            style: {
                background: 'linear-gradient(135deg, #3A3330 0%, #2A2522 100%)',
                color: '#fff',
                borderRadius: '12px',
                border: '1px solid rgba(238, 225, 219, 0.1)',
            }
        })
    }

    const saveSiteSettings = () => {
        if (user?.role !== 'admin') {
            toast.error('Only admins can update settings')
            return
        }

        localStorage.setItem('siteSettings', JSON.stringify(siteSettings))
        toast.success('Settings saved! ⚙️', {
            style: {
                background: 'linear-gradient(135deg, #3A3330 0%, #2A2522 100%)',
                color: '#fff',
                borderRadius: '12px',
                border: '1px solid rgba(238, 225, 219, 0.1)',
            }
        })
    }

    const stats = {
        totalPets: pets.length,
        activeBoardings: bookings.filter(b => b.status === 'confirmed').length,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        completedStays: bookings.filter(b => b.status === 'completed').length
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-100 via-background to-primary-50">
            {/* Header */}
            <div className="bg-white/95 backdrop-blur border-b border-primary-200 sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="p-2 bg-primary-200 rounded-xl group-hover:bg-primary-300 transition-all">
                                    <Heart className="w-6 h-6 text-primary-700" />
                                </div>
                                <div>
                                    <h1 className="font-bold text-xl text-neutral-800">Coco's Pet Paradise</h1>
                                    <p className="text-xs text-neutral-500">Dashboard</p>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            {user?.role === 'admin' && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium border border-primary-300">
                                    <Shield className="w-4 h-4" />
                                    <span>Admin</span>
                                </div>
                            )}

                            <button className="relative p-2 text-neutral-600 hover:text-primary-700 transition-colors hover:bg-primary-100 rounded-lg">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
                            </button>

                            <Link
                                href="/"
                                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-700 transition-all flex items-center gap-2 hover:bg-primary-100 rounded-lg"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Home</span>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium bg-neutral-100 text-neutral-700 rounded-lg hover:bg-primary-100 hover:text-primary-700 transition-all flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-neutral-800 mb-2">
                        Welcome back, {user.name || user.email.split('@')[0]}! 👋
                    </h2>
                    <p className="text-neutral-600">
                        {user?.role === 'admin'
                            ? 'Manage your pet paradise from one central hub'
                            : 'View your pet information and bookings'}
                    </p>
                </motion.div>

                {/* Stats Cards (Admin Only) */}
                {user?.role === 'admin' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                    >
                        <div className="bg-white rounded-2xl p-6 border border-primary-200 shadow-soft hover:shadow-soft-lg transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-primary-200 rounded-xl">
                                    <PawPrint className="w-6 h-6 text-primary-700" />
                                </div>
                                <TrendingUp className="w-5 h-5 text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-800">{stats.totalPets}</h3>
                            <p className="text-sm text-neutral-600">Total Pets</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-primary-200 shadow-soft hover:shadow-soft-lg transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-success/20 rounded-xl">
                                    <Activity className="w-6 h-6 text-success" />
                                </div>
                                <span className="text-xs px-2 py-1 bg-success/20 text-success rounded-full font-medium">Active</span>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-800">{stats.activeBoardings}</h3>
                            <p className="text-sm text-neutral-600">Current Boardings</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-primary-200 shadow-soft hover:shadow-soft-lg transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-warning/20 rounded-xl">
                                    <Clock className="w-6 h-6 text-warning" />
                                </div>
                                <span className="text-xs px-2 py-1 bg-warning/20 text-warning rounded-full font-medium">Pending</span>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-800">{stats.pendingBookings}</h3>
                            <p className="text-sm text-neutral-600">Pending Bookings</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-primary-200 shadow-soft hover:shadow-soft-lg transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-info/20 rounded-xl">
                                    <Award className="w-6 h-6 text-info" />
                                </div>
                                <Star className="w-5 h-5 text-warning" />
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-800">{stats.completedStays}</h3>
                            <p className="text-sm text-neutral-600">Happy Stays</p>
                        </div>
                    </motion.div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-primary-200">
                    {['overview', 'pets', 'bookings', ...(user?.role === 'admin' ? ['settings'] : [])].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2.5 font-medium transition-all border-b-2 ${
                                activeTab === tab
                                    ? 'text-primary-700 border-primary-700 bg-primary-50 rounded-t-lg'
                                    : 'text-neutral-600 border-transparent hover:text-neutral-800 hover:bg-primary-50/50'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Link
                                    href="/#booking"
                                    className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl p-6 hover:from-primary-700 hover:to-primary-800 transition-all group shadow-soft-lg"
                                >
                                    <Calendar className="w-8 h-8 mb-3" />
                                    <h3 className="font-bold mb-1">Book a Stay</h3>
                                    <p className="text-primary-100 text-sm">Schedule your pet's next visit</p>
                                    <ChevronRight className="w-5 h-5 mt-4 group-hover:translate-x-1 transition-transform text-primary-200" />
                                </Link>

                                {user?.role === 'admin' ? (
                                    <button
                                        onClick={() => setShowAddPet(true)}
                                        className="bg-white rounded-2xl p-6 border-2 border-primary-200 hover:border-primary-400 transition-all text-left group shadow-soft hover:shadow-soft-lg"
                                    >
                                        <Plus className="w-8 h-8 mb-3 text-primary-600" />
                                        <h3 className="font-bold mb-1 text-neutral-800">Add Pet</h3>
                                        <p className="text-neutral-600 text-sm">Register a new pet profile</p>
                                        <ChevronRight className="w-5 h-5 mt-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ) : (
                                    <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-dashed border-neutral-300">
                                        <Shield className="w-8 h-8 mb-3 text-neutral-400" />
                                        <h3 className="font-bold mb-1 text-neutral-600">Admin Only</h3>
                                        <p className="text-neutral-500 text-sm">Contact admin to add pets</p>
                                    </div>
                                )}

                                <Link
                                    href="/#contact"
                                    className="bg-white rounded-2xl p-6 border-2 border-primary-200 hover:border-primary-400 transition-all group shadow-soft hover:shadow-soft-lg"
                                >
                                    <Phone className="w-8 h-8 mb-3 text-primary-600" />
                                    <h3 className="font-bold mb-1 text-neutral-800">Contact Us</h3>
                                    <p className="text-neutral-600 text-sm">Get in touch with our team</p>
                                    <ChevronRight className="w-5 h-5 mt-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-2xl p-6 border border-primary-200 shadow-soft">
                                <h3 className="font-bold text-lg mb-4 text-neutral-800">Recent Activity</h3>
                                <div className="space-y-3">
                                    {pets.slice(0, 3).map((pet) => (
                                        <div key={pet.id} className="flex items-center justify-between p-3 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center">
                                                    <span className="text-lg">{pet.type === 'cat' ? '🐱' : '🐕'}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-neutral-800">{pet.name}</p>
                                                    <p className="text-xs text-neutral-500">{pet.breed} • {pet.age}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs px-2 py-1 bg-success/20 text-success rounded-full font-medium">
                                                Active
                                            </span>
                                        </div>
                                    ))}
                                    {pets.length === 0 && (
                                        <p className="text-center text-neutral-500 py-4">No recent activity</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'pets' && (
                        <motion.div
                            key="pets"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            {user?.role === 'admin' && (
                                <button
                                    onClick={() => setShowAddPet(true)}
                                    className="mb-6 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all flex items-center gap-2 shadow-soft-lg"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add New Pet
                                </button>
                            )}

                            {pets.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-primary-300">
                                    <div className="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Heart className="w-10 h-10 text-primary-600" />
                                    </div>
                                    <p className="text-neutral-600 mb-4">No pets registered yet</p>
                                    {user?.role === 'admin' && (
                                        <button
                                            onClick={() => setShowAddPet(true)}
                                            className="bg-primary-600 text-white px-6 py-2 rounded-xl hover:bg-primary-700 transition-all"
                                        >
                                            Add Your First Pet
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pets.map((pet) => (
                                        <motion.div
                                            key={pet.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-white rounded-2xl p-6 border-2 border-primary-200 hover:border-primary-400 transition-all shadow-soft hover:shadow-soft-lg"
                                        >
                                            {editingPet === pet.id ? (
                                                <div className="space-y-3">
                                                    <input
                                                        value={pet.name}
                                                        onChange={(e) => handleUpdatePet(pet.id, { name: e.target.value })}
                                                        className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:border-primary-500 focus:outline-none"
                                                        placeholder="Name"
                                                    />
                                                    <input
                                                        value={pet.breed}
                                                        onChange={(e) => handleUpdatePet(pet.id, { breed: e.target.value })}
                                                        className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:border-primary-500 focus:outline-none"
                                                        placeholder="Breed"
                                                    />
                                                    <input
                                                        value={pet.age}
                                                        onChange={(e) => handleUpdatePet(pet.id, { age: e.target.value })}
                                                        className="w-full px-3 py-2 border border-primary-300 rounded-lg focus:border-primary-500 focus:outline-none"
                                                        placeholder="Age"
                                                    />
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingPet(null)}
                                                            className="flex-1 px-3 py-2 bg-success text-white rounded-lg hover:bg-success/90"
                                                        >
                                                            <Save className="w-4 h-4 mx-auto" />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingPet(null)}
                                                            className="flex-1 px-3 py-2 bg-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-400"
                                                        >
                                                            <X className="w-4 h-4 mx-auto" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center">
                                                            <span className="text-2xl">{pet.type === 'cat' ? '🐱' : '🐕'}</span>
                                                        </div>
                                                        {user?.role === 'admin' && (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => setEditingPet(pet.id)}
                                                                    className="text-neutral-400 hover:text-primary-600 transition-colors"
                                                                >
                                                                    <Edit3 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeletePet(pet.id)}
                                                                    className="text-neutral-400 hover:text-error transition-colors"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <h3 className="font-bold text-lg text-neutral-800 mb-1">{pet.name}</h3>
                                                    <p className="text-sm text-neutral-600 mb-1">{pet.breed}</p>
                                                    <p className="text-sm text-neutral-500 mb-3">Age: {pet.age}</p>

                                                    {pet.vaccinated && (
                                                        <div className="flex items-center gap-2 text-xs text-success bg-success/20 px-2 py-1 rounded-full w-fit">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Vaccinated
                                                        </div>
                                                    )}

                                                    {pet.specialNeeds && (
                                                        <p className="text-xs text-neutral-500 mt-3 italic">
                                                            "{pet.specialNeeds}"
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'bookings' && (
                        <motion.div
                            key="bookings"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white rounded-2xl p-6 border border-primary-200 shadow-soft"
                        >
                            <h3 className="font-bold text-lg mb-4 text-neutral-800">Booking History</h3>
                            <div className="text-center py-12 text-neutral-500">
                                <Calendar className="w-12 h-12 mx-auto mb-3 text-primary-300" />
                                <p>No bookings yet</p>
                                <Link
                                    href="/#booking"
                                    className="inline-block mt-4 px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all"
                                >
                                    Book Your First Stay
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'settings' && user?.role === 'admin' && (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            <div className="bg-white rounded-2xl p-6 border border-primary-200 shadow-soft">
                                <h3 className="font-bold text-lg mb-4 text-neutral-800">Site Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Site Name
                                        </label>
                                        <input
                                            value={siteSettings.siteName}
                                            onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                                            className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Tagline
                                        </label>
                                        <input
                                            value={siteSettings.tagline}
                                            onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                                            className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                                <Mail className="w-4 h-4 inline mr-1 text-primary-600" />
                                                Contact Email
                                            </label>
                                            <input
                                                type="email"
                                                value={siteSettings.contactEmail}
                                                onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                                                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                                <Phone className="w-4 h-4 inline mr-1 text-primary-600" />
                                                Contact Phone
                                            </label>
                                            <input
                                                type="tel"
                                                value={siteSettings.contactPhone}
                                                onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                                                className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            <MapPin className="w-4 h-4 inline mr-1 text-primary-600" />
                                            Address
                                        </label>
                                        <input
                                            value={siteSettings.address}
                                            onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                                            className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <button
                                        onClick={saveSiteSettings}
                                        className="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all flex items-center gap-2 shadow-soft-lg"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Settings
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Add Pet Modal */}
                {showAddPet && user?.role === 'admin' && (
                    <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-primary-200 shadow-soft-2xl"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-neutral-800">Add New Pet</h3>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={newPet.name || ''}
                                    onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                                    placeholder="Pet Name"
                                    className="w-full px-4 py-3 border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                />

                                <select
                                    value={newPet.type}
                                    onChange={(e) => setNewPet({ ...newPet, type: e.target.value as 'cat' | 'dog' })}
                                    className="w-full px-4 py-3 border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                >
                                    <option value="dog">Dog 🐕</option>
                                    <option value="cat">Cat 🐱</option>
                                </select>

                                <input
                                    type="text"
                                    value={newPet.breed || ''}
                                    onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                                    placeholder="Breed"
                                    className="w-full px-4 py-3 border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                />

                                <input
                                    type="text"
                                    value={newPet.age || ''}
                                    onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                                    placeholder="Age (e.g., 2 years)"
                                    className="w-full px-4 py-3 border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                />

                                <input
                                    type="text"
                                    value={newPet.weight || ''}
                                    onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                                    placeholder="Weight (optional)"
                                    className="w-full px-4 py-3 border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                />

                                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="vaccinated"
                                        checked={newPet.vaccinated || false}
                                        onChange={(e) => setNewPet({ ...newPet, vaccinated: e.target.checked })}
                                        className="w-4 h-4 accent-primary-600"
                                    />
                                    <label htmlFor="vaccinated" className="text-neutral-700">
                                        Fully vaccinated
                                    </label>
                                </div>

                                <textarea
                                    value={newPet.specialNeeds || ''}
                                    onChange={(e) => setNewPet({ ...newPet, specialNeeds: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-primary-300 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                                    rows={3}
                                    placeholder="Special needs or notes (optional)"
                                />

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddPet(false)}
                                        className="flex-1 py-3 border-2 border-primary-300 text-neutral-700 rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!newPet.name || !newPet.breed || !newPet.age) {
                                                toast.error('Please fill in all required fields')
                                                return
                                            }
                                            handleAddPet()
                                        }}
                                        className="flex-1 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-soft-lg"
                                    >
                                        Add Pet
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    )
}
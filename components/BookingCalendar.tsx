'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ChevronLeft, ChevronRight, Check, X, Info } from 'lucide-react'
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, addDays, isSameDay, isAfter, isBefore } from 'date-fns'
import toast from 'react-hot-toast'

interface BookingSlot {
    date: Date
    available: number
    total: number
}

export default function BookingCalendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedPetType, setSelectedPetType] = useState<'cat' | 'dog'>('cat')
    const [showBookingForm, setShowBookingForm] = useState(false)

    // Mock availability data
    const getAvailability = (date: Date): BookingSlot => {
        const random = date.getDate() % 3
        if (random === 0) return { date, available: 0, total: 5 }
        if (random === 1) return { date, available: 2, total: 5 }
        return { date, available: 4, total: 5 }
    }

    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDayOfWeek = getDay(startOfMonth(currentMonth))
    const today = new Date()

    const handleDateSelect = (date: Date) => {
        if (isBefore(date, today)) {
            toast.error('Cannot book past dates')
            return
        }
        setSelectedDate(date)
        setShowBookingForm(true)
    }

    const renderCalendarDays = () => {
        const days = []

        // Empty cells for days before month starts
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} />)
        }

        // Calendar days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
            const availability = getAvailability(date)
            const isPast = isBefore(date, today)
            const isToday = isSameDay(date, today)
            const isSelected = selectedDate && isSameDay(date, selectedDate)

            days.push(
                <motion.button
                    key={day}
                    whileHover={!isPast ? { scale: 1.05 } : {}}
                    whileTap={!isPast ? { scale: 0.95 } : {}}
                    onClick={() => !isPast && handleDateSelect(date)}
                    disabled={isPast || availability.available === 0}
                    className={`
            relative p-3 rounded-xl transition-all
            ${isPast ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : ''}
            ${availability.available === 0 && !isPast ? 'bg-red-50 text-gray-400 cursor-not-allowed' : ''}
            ${availability.available > 0 && !isPast ? 'bg-white hover:shadow-lg cursor-pointer' : ''}
            ${isToday ? 'ring-2 ring-primary' : ''}
            ${isSelected ? 'bg-primary text-white' : ''}
          `}
                >
                    <div className="text-center">
                        <div className="font-semibold text-lg">{day}</div>
                        {!isPast && (
                            <div className="mt-1">
                                {availability.available === 0 ? (
                                    <span className="text-xs text-red-600 font-medium">Full</span>
                                ) : availability.available <= 2 ? (
                                    <span className="text-xs text-orange-600 font-medium">
                    {availability.available} spots
                  </span>
                                ) : (
                                    <span className="text-xs text-green-600 font-medium">
                    Available
                  </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Availability Indicator */}
                    {!isPast && availability.available > 0 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                            {[...Array(availability.total)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        i < availability.available ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </motion.button>
            )
        }

        return days
    }

    return (
        <section className="py-20 bg-gradient-to-b from-white to-neutral-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl font-display font-bold mb-4">
                        Book Your Pet's <span className="text-gradient">Dream Stay</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Check availability and reserve your spot. Limited spaces ensure personalized care for every pet.
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Calendar */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-xl p-6">
                                {/* Calendar Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <button
                                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {format(currentMonth, 'MMMM yyyy')}
                                    </h3>
                                    <button
                                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Weekday Headers */}
                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-2">
                                    {renderCalendarDays()}
                                </div>

                                {/* Legend */}
                                <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-green-500 rounded-full" />
                                        <span className="text-sm text-gray-600">Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-orange-500 rounded-full" />
                                        <span className="text-sm text-gray-600">Limited</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-red-500 rounded-full" />
                                        <span className="text-sm text-gray-600">Full</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-300 rounded-full" />
                                        <span className="text-sm text-gray-600">Unavailable</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Panel */}
                        <div>
                            <div className="bg-white rounded-3xl shadow-xl p-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    Quick Booking
                                </h3>

                                {selectedDate ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="mb-4 p-4 bg-primary-50 rounded-xl border border-primary-100">
                                            <p className="text-sm text-gray-600 mb-1">Selected Date:</p>
                                            <p className="font-bold text-lg text-gray-900">
                                                {format(selectedDate, 'MMMM d, yyyy')}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Pet Type
                                                </label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() => setSelectedPetType('cat')}
                                                        className={`p-3 rounded-lg border-2 transition-all ${
                                                            selectedPetType === 'cat'
                                                                ? 'border-primary bg-primary/10'
                                                                : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        🐱 Cat
                                                    </button>
                                                    <button
                                                        onClick={() => setSelectedPetType('dog')}
                                                        className={`p-3 rounded-lg border-2 transition-all ${
                                                            selectedPetType === 'dog'
                                                                ? 'border-primary bg-primary/10'
                                                                : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        🐶 Dog
                                                    </button>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => toast.success('Booking form would open here!')}
                                                className="w-full bg-primary-700 text-white py-3 rounded-xl font-semibold hover:bg-primary-800 hover:shadow-soft-lg transition-all"
                                            >
                                                Continue Booking
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                        <p>Select a date to begin booking</p>
                                    </div>
                                )}

                                {/* Info Box */}
                                <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
                                    <div className="flex gap-3">
                                        <Info className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-primary-900 font-medium mb-1">Booking Policy</p>
                                            <p className="text-xs text-neutral-700">
                                                • Book at least 24 hours in advance
                                                <br />
                                                • Free cancellation up to 48 hours before
                                                <br />
                                                • Meet & greet required for first-time guests
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Special Offers */}
                            <div className="bg-gradient-to-br from-primary-700 to-primary-800 rounded-3xl shadow-soft-xl p-6 mt-4 relative overflow-hidden">
                                {/* 添加微妙的图案 */}
                                <div className="absolute inset-0 bg-dot-pattern opacity-10" />

                                <div className="relative">
                                    <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                                        <span className="text-2xl">✨</span>
                                        Special Offer
                                    </h4>
                                    <p className="text-primary-50 text-sm mb-3">
                                        Book 7+ days and get 10% off your stay!
                                    </p>
                                    <button className="bg-white text-primary-700 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-50 transition-all hover:shadow-soft">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
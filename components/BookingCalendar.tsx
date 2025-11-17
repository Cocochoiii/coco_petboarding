'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Calendar,
    Clock,
    ChevronLeft,
    ChevronRight,
    Info,
    Star,
    ArrowRight
} from 'lucide-react'
import {
    format,
    addMonths,
    subMonths,
    getDaysInMonth,
    startOfMonth,
    getDay,
    isSameDay,
    isBefore
} from 'date-fns'
import toast from 'react-hot-toast'
import Image from 'next/image'

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
    const [hoveredDate, setHoveredDate] = useState<number | null>(null)

    const getAvailability = (date: Date): BookingSlot => {
        const year = date.getFullYear()
        const month = date.getMonth() // 0-indexed (0 = January, 10 = November, 11 = December)
        const day = date.getDate()

        // November 21 - December 9: All FULL
        if ((month === 10 && day >= 21) || // November 21-30
            (month === 11 && day <= 9)) {    // December 1-9
            return { date, available: 0, total: 5 }
        }

        // December 10 - December 30: Full or random spots
        if (month === 11 && day >= 10 && day <= 30) {
            const random = day % 4
            if (random === 0 || random === 1) return { date, available: 0, total: 5 } // Full
            if (random === 2) return { date, available: 1, total: 5 } // 1 spot
            return { date, available: 2, total: 5 } // 2 spots
        }

        // All other days: Available
        return { date, available: 4, total: 5 }
    }

    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDayOfWeek = getDay(startOfMonth(currentMonth))
    const today = new Date()

    const handleDateSelect = (date: Date) => {
        if (isBefore(date, today)) {
            toast.error('Cannot book past dates', {
                style: {
                    background: '#1F2937',
                    color: '#fff'
                }
            })
            return
        }
        setSelectedDate(date)
        setShowBookingForm(true)
    }

    const handleContinueBooking = () => {
        // Scroll to contact section
        const contactSection = document.getElementById('contact')
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const renderCalendarDays = () => {
        const days = []

        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} />)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
            )
            const availability = getAvailability(date)
            const isPast = isBefore(date, today)
            const isToday = isSameDay(date, today)
            const isSelected = selectedDate && isSameDay(date, selectedDate)

            days.push(
                <motion.button
                    key={day}
                    whileHover={!isPast ? { scale: 1.05, y: -2 } : {}}
                    whileTap={!isPast ? { scale: 0.95 } : {}}
                    onClick={() => !isPast && handleDateSelect(date)}
                    disabled={isPast || availability.available === 0}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className={`
                        relative rounded-xl transition-all duration-300
                        p-2 sm:p-3
                        ${isPast ? 'bg-neutral-50 text-neutral-300 cursor-not-allowed' : ''}
                        ${
                        availability.available === 0 && !isPast
                            ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border-2 border-neutral-200'
                            : ''
                    }
                        ${
                        availability.available > 0 && !isPast
                            ? 'bg-white hover:shadow-soft-lg cursor-pointer border-2 border-transparent hover:border-primary-700'
                            : ''
                    }
                        ${isToday ? 'ring-2 ring-primary-700' : ''}
                        ${
                        isSelected
                            ? 'bg-primary-700 text-white border-2 border-primary-800'
                            : ''
                    }
                    `}
                >
                    <div className="text-center">
                        <div className="font-semibold text-base sm:text-lg">{day}</div>
                        {!isPast && (
                            <motion.div
                                className="mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                {availability.available === 0 ? (
                                    <span className="text-[10px] sm:text-xs text-neutral-600 font-medium">
                                        Full
                                    </span>
                                ) : availability.available <= 2 ? (
                                    <span
                                        className={`text-[10px] sm:text-xs font-medium ${
                                            isSelected ? 'text-white' : 'text-neutral-700'
                                        }`}
                                    >
                                        {availability.available} spots
                                    </span>
                                ) : (
                                    <span
                                        className={`text-[10px] sm:text-xs font-medium ${
                                            isSelected ? 'text-white' : 'text-primary-700'
                                        }`}
                                    >
                                        Available
                                    </span>
                                )}
                            </motion.div>
                        )}
                    </div>

                    {!isPast && availability.available > 0 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                            {[...Array(availability.total)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        i < availability.available
                                            ? isSelected
                                                ? 'bg-white'
                                                : 'bg-primary-700'
                                            : 'bg-neutral-300'
                                    }`}
                                    initial={{ scale: 0 }}
                                    animate={{
                                        scale: hoveredDate === day ? 1.2 : 1
                                    }}
                                    transition={{ delay: i * 0.02 }}
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
        <section id="booking" className="py-20 bg-gradient-to-b from-white to-neutral-50">
            <div className="container mx-auto px-4">
                {/* Title + SVG */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 relative"
                >
                    {/* 🌟 Mobile SVG：上方并排显示，lg 以上隐藏 */}
                    <div className="flex items-center justify-center gap-14 mb-4 lg:hidden">
                        <Image
                            src="/svgs/booking-decoration2.svg"
                            alt="Booking decoration left"
                            width={100}
                            height={100}
                            className="w-100 h-100 opacity-90 scale-150"
                        />
                        <Image
                            src="/svgs/booking-decoration.svg"
                            alt="Booking decoration right"
                            width={100}
                            height={100}
                            className="w-100 h-100 opacity-90 scale-150"
                        />
                    </div>

                    {/* LEFT SVG - desktop only */}
                    <motion.div
                        className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0"
                        initial={{ opacity: 0, x: -50, scale: 0.8 }}
                        whileInView={{
                            opacity: 1,
                            x: -20,
                            scale: 2.5,
                            y: [0, 10, 0]
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            y: {
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }
                        }}
                    >
                        <Image
                            src="/svgs/booking-decoration2.svg"
                            alt="Booking decoration left"
                            width={200}
                            height={200}
                            className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 opacity-90"
                        />
                    </motion.div>

                    {/* CENTER TITLE + SUBTITLE */}
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-neutral-900">
                            Book Your Pet&apos;s{' '}
                            <span className="text-gradient">Dream Stay</span>
                        </h2>
                        <p className="text-base md:text-xl text-neutral-600 max-w-3xl mx-auto">
                            Check availability and reserve your spot. Limited spaces
                            ensure personalized care for every pet.
                        </p>
                    </div>

                    {/* RIGHT SVG - desktop only */}
                    <motion.div
                        className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0"
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        whileInView={{
                            opacity: 1,
                            x: 20,
                            scale: 2.0,
                            y: [0, -10, 0]
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            y: {
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }
                        }}
                    >
                        <Image
                            src="/svgs/booking-decoration.svg"
                            alt="Booking decoration right"
                            width={200}
                            height={200}
                            className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 opacity-90"
                        />
                    </motion.div>
                </motion.div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Calendar */}
                        <div className="lg:col-span-2 max-w-md mx-auto lg:max-w-none w-full">
                            <motion.div
                                className="bg-white rounded-3xl shadow-soft-xl border-2 border-neutral-100 p-4 sm:p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4 sm:mb-6">
                                    <motion.button
                                        onClick={() =>
                                            setCurrentMonth(subMonths(currentMonth, 1))
                                        }
                                        className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
                                    </motion.button>
                                    <h3 className="text-lg sm:text-2xl font-bold text-neutral-900">
                                        {format(currentMonth, 'MMMM yyyy')}
                                    </h3>
                                    <motion.button
                                        onClick={() =>
                                            setCurrentMonth(addMonths(currentMonth, 1))
                                        }
                                        className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700" />
                                    </motion.button>
                                </div>

                                {/* Weekdays */}
                                <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                                        day => (
                                            <div
                                                key={day}
                                                className="text-center text-[11px] sm:text-sm font-semibold text-neutral-600 py-1.5 sm:py-2"
                                            >
                                                {day}
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Grid */}
                                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                                    {renderCalendarDays()}
                                </div>

                                {/* Legend */}
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-neutral-200">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary-700 rounded-full" />
                                        <span className="text-xs sm:text-sm text-neutral-600">
                                            Available
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-neutral-700 rounded-full" />
                                        <span className="text-xs sm:text-sm text-neutral-600">
                                            Limited
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-neutral-400 rounded-full" />
                                        <span className="text-xs sm:text-sm text-neutral-600">
                                            Full
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-neutral-200 rounded-full" />
                                        <span className="text-xs sm:text-sm text-neutral-600">
                                            Unavailable
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Booking Panel */}
                        <div className="max-w-md mx-auto lg:max-w-none w-full">
                            <motion.div
                                className="bg-white rounded-3xl shadow-soft-xl border-2 border-neutral-100 p-6"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900">
                                    <Calendar className="w-5 h-5 text-primary-700" />
                                    Quick Booking
                                </h3>

                                {selectedDate ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <div className="mb-4 p-4 bg-primary-50 rounded-xl border-2 border-primary-100">
                                            <p className="text-xs sm:text-sm text-neutral-600 mb-1">
                                                Selected Date:
                                            </p>
                                            <p className="font-bold text-base sm:text-lg text-neutral-900">
                                                {format(selectedDate, 'MMMM d, yyyy')}
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                                    Pet Type
                                                </label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <motion.button
                                                        onClick={() => setSelectedPetType('cat')}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`p-3 rounded-lg border-2 text-sm sm:text-base transition-all ${
                                                            selectedPetType === 'cat'
                                                                ? 'border-primary-700 bg-primary-50'
                                                                : 'border-neutral-200 hover:border-neutral-400'
                                                        }`}
                                                    >
                                                        Cat
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => setSelectedPetType('dog')}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className={`p-3 rounded-lg border-2 text-sm sm:text-base transition-all ${
                                                            selectedPetType === 'dog'
                                                                ? 'border-primary-700 bg-primary-50'
                                                                : 'border-neutral-200 hover:border-neutral-400'
                                                        }`}
                                                    >
                                                        Dog
                                                    </motion.button>
                                                </div>
                                            </div>

                                            <motion.button
                                                onClick={handleContinueBooking}
                                                className="w-full btn-primary py-3 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Continue Booking
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-8 text-neutral-500">
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-neutral-300" />
                                        </motion.div>
                                        <p className="text-sm sm:text-base">
                                            Select a date to begin booking
                                        </p>
                                    </div>
                                )}

                                {/* Info Box */}
                                <div className="mt-6 p-4 bg-primary-50 rounded-xl border-2 border-primary-100">
                                    <div className="flex gap-3">
                                        <Info className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-primary-900 font-medium mb-1">
                                                Booking Policy
                                            </p>
                                            <p className="text-xs text-neutral-700">
                                                • Book at least 24 hours in advance
                                                <br />
                                                • Free cancellation up to 48 hours before
                                                <br />
                                                • Meet &amp; greet required for first-time guests
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Special Offer */}
                            <motion.div
                                className="bg-gradient-to-br from-primary-700 to-primary-800 rounded-3xl shadow-soft-xl p-6 mt-4 relative overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="absolute inset-0 bg-dot-pattern opacity-10" />
                                <div className="relative z-10">
                                    <h4 className="text-white font-bold text-base sm:text-lg mb-2 flex items-center gap-2">
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <Star className="w-5 h-5 fill-white" />
                                        </motion.div>
                                        Special Offer
                                    </h4>
                                    <p className="text-primary-50 text-xs sm:text-sm mb-3">
                                        Book 7+ days and get 10% off your stay!
                                    </p>
                                    <motion.button
                                        className="bg-white text-primary-700 px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-primary-50 transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Learn More
                                    </motion.button>
                                </div>
                            </motion.div>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
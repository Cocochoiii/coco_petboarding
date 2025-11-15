'use client'

import { motion } from 'framer-motion'
import {
    Home,
    Heart,
    Camera,
    Car,
    Bath,
    Clock,
    Pill,
    Play,
    Moon,
    Shield,
    Sparkles,
    Award,
    Star,
    ArrowRight
} from 'lucide-react'
import { useState } from 'react'

interface Service {
    icon: any
    title: string
    description: string
    price: string
    features: string[]
    popular?: boolean
}

const services: Service[] = [
    {
        icon: Home,
        title: 'Home Boarding',
        description: 'Your pet stays in our cozy home environment with 24/7 supervision and care',
        price: 'From $45/day (cats) | $55/day (dogs)',
        features: [
            'Comfortable home environment',
            '24/7 supervision',
            'Separate spaces for cats and dogs',
            'Climate-controlled rooms',
            'Daily exercise and playtime'
        ],
        popular: true
    },
    {
        icon: Heart,
        title: 'Personalized Care',
        description: 'Customized care plans tailored to your pet\'s unique needs and preferences',
        price: 'Included with boarding',
        features: [
            'Custom feeding schedules',
            'Special diet accommodation',
            'Individual attention',
            'Behavioral support',
            'Senior pet care'
        ]
    },
    {
        icon: Camera,
        title: 'Daily Updates',
        description: 'Stay connected with photos and videos of your pet throughout the day',
        price: 'Included with boarding',
        features: [
            'Morning & evening photos',
            'Video updates',
            'Activity reports',
            'Real-time messaging',
            'Emergency notifications'
        ],
        popular: true
    },
    {
        icon: Car,
        title: 'Pick-up & Drop-off',
        description: 'Convenient transportation service for your pet\'s comfort',
        price: 'Free (within 10 miles) | From $20',
        features: [
            'Safe, comfortable vehicles',
            'Secured pet carriers',
            'Flexible scheduling',
            'Door-to-door service',
            'GPS tracking available'
        ]
    },
    {
        icon: Bath,
        title: 'Grooming Services',
        description: 'Keep your pet clean and comfortable during their stay',
        price: 'From $15/session',
        features: [
            'Brushing and combing',
            'Nail trimming',
            'Ear cleaning',
            'Teeth cleaning',
            'Bath (if needed)'
        ]
    },
    {
        icon: Clock,
        title: 'Extended Stay',
        description: 'Special rates for long-term boarding with extra perks',
        price: '10% off (7+ days) | 15% off (14+ days)',
        features: [
            'Discounted daily rates',
            'Free grooming session',
            'Extra playtime',
            'Priority booking',
            'Complimentary pick-up'
        ],
        popular: true
    },
    {
        icon: Pill,
        title: 'Medical Care',
        description: 'Professional medication administration and health monitoring',
        price: 'Included with boarding',
        features: [
            'Medication administration',
            'Health monitoring',
            'Vet coordination',
            'Special needs care',
            'Emergency protocols'
        ]
    },
    {
        icon: Play,
        title: 'Activities & Enrichment',
        description: 'Fun activities to keep your pet engaged and happy',
        price: 'Included with boarding',
        features: [
            'Interactive play sessions',
            'Puzzle toys',
            'Socialization time',
            'Indoor/outdoor play',
            'Training reinforcement'
        ]
    },
    {
        icon: Moon,
        title: 'Overnight Care',
        description: 'Round-the-clock supervision for pets needing extra attention',
        price: 'Included with boarding',
        features: [
            'Nighttime monitoring',
            'Comfort checks',
            'Anxiety support',
            'Emergency response',
            'Bedtime routines'
        ]
    }
]

export default function Services() {
    const [hoveredService, setHoveredService] = useState<number | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'essential' | 'addon'>('all')

    const filteredServices = selectedCategory === 'all'
        ? services
        : selectedCategory === 'essential'
            ? services.slice(0, 6)
            : services.slice(6)

    return (
        <section id="services" className="py-20 bg-gradient-to-b from-white to-neutral-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-primary-700 font-semibold text-sm uppercase tracking-wide">Our Services</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                        Comprehensive <span className="text-gradient">Pet Care Services</span>
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                        Everything your pet needs for a comfortable, happy, and safe stay.
                        All services delivered with love and professional care.
                    </p>
                </motion.div>

                {/* Interactive Service Categories */}
                <div className="flex justify-center gap-4 mb-12">
                    {[
                        { value: 'all', label: 'All Services' },
                        { value: 'essential', label: 'Essential' },
                        { value: 'addon', label: 'Add-ons' }
                    ].map((cat) => (
                        <motion.button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value as any)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-full font-semibold transition-all relative overflow-hidden ${
                                selectedCategory === cat.value
                                    ? 'bg-neutral-900 text-white shadow-soft-lg'
                                    : 'bg-white text-neutral-700 shadow-soft border border-neutral-200 hover:border-neutral-400'
                            }`}
                        >
                            <span className="relative z-10">{cat.label}</span>
                            {selectedCategory === cat.value && (
                                <motion.div
                                    className="absolute inset-0 bg-primary-700"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ zIndex: 1 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Enhanced Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredService(index)}
                            onMouseLeave={() => setHoveredService(null)}
                            className="relative group"
                        >
                            {/* Popular Badge - Premium Style */}
                            {service.popular && (
                                <motion.div
                                    className="absolute -top-3 -right-3 z-10"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                                >
                                    <div className="bg-neutral-900 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-soft-lg">
                                        <Star className="w-3 h-3 fill-white" />
                                        Popular
                                    </div>
                                </motion.div>
                            )}

                            <motion.div
                                className={`bg-white rounded-2xl shadow-soft p-6 h-full transition-all duration-500 border-2 ${
                                    hoveredService === index
                                        ? 'border-primary-700 shadow-soft-xl'
                                        : 'border-transparent'
                                }`}
                                whileHover={{ y: -5 }}
                            >
                                {/* Animated Icon */}
                                <motion.div
                                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${
                                        hoveredService === index
                                            ? 'bg-primary-700 text-white shadow-soft-lg'
                                            : 'bg-neutral-100 text-neutral-700'
                                    }`}
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <service.icon className="w-7 h-7" />
                                </motion.div>

                                {/* Title & Description */}
                                <h3 className="text-xl font-bold mb-2 text-neutral-900">{service.title}</h3>
                                <p className="text-neutral-600 mb-4 text-sm">{service.description}</p>

                                {/* Price Badge */}
                                <div className="mb-4 p-3 bg-gradient-to-r from-primary-50 to-neutral-50 rounded-lg border border-primary-100">
                                    <p className="text-primary-700 font-semibold text-sm">{service.price}</p>
                                </div>

                                {/* Features with Animation */}
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <motion.li
                                            key={idx}
                                            className="flex items-start gap-2"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={hoveredService === index ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                                                hoveredService === index
                                                    ? 'bg-primary-700'
                                                    : 'bg-neutral-200'
                                            }`}>
                                                <motion.div
                                                    className="w-2 h-2 bg-white rounded-full"
                                                    initial={{ scale: 0 }}
                                                    animate={hoveredService === index ? { scale: 1 } : { scale: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                />
                                            </div>
                                            <span className="text-sm text-neutral-700">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Interactive Hover Action */}
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={hoveredService === index ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 pt-4 border-t border-neutral-200">
                                        <button className="w-full bg-primary-700 text-white py-2.5 rounded-lg font-semibold hover:bg-primary-800 transition-all flex items-center justify-center gap-2 group">
                                            Learn More
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA - Premium Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-br from-neutral-50 to-primary-50/30 rounded-3xl p-8 max-w-4xl mx-auto border border-neutral-200">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                <Shield className="w-8 h-8 text-primary-700" />
                            </motion.div>
                            <motion.div whileHover={{ rotate: -360 }} transition={{ duration: 0.5 }}>
                                <Award className="w-8 h-8 text-neutral-700" />
                            </motion.div>
                            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                <Sparkles className="w-8 h-8 text-primary-700" />
                            </motion.div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-900">All Services Include Our Quality Guarantee</h3>
                        <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                            Every service comes with our commitment to excellence, safety protocols,
                            and the loving care your pet deserves. Licensed, insured, and pet first aid certified.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                className="btn-primary px-8 py-3 rounded-full font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Book Services Now
                            </motion.button>
                            <motion.button
                                className="btn-secondary px-8 py-3 rounded-full font-semibold"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Download Service Guide
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
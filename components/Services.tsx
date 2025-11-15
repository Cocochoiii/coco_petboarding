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
    Star
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
        <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-primary font-semibold text-sm uppercase tracking-wide">Our Services</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                        Comprehensive <span className="text-gradient">Pet Care Services</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything your pet needs for a comfortable, happy, and safe stay.
                        All services delivered with love and professional care.
                    </p>
                </motion.div>

                {/* Service Categories */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-3 rounded-full font-semibold transition-all ${
                            selectedCategory === 'all'
                                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                        }`}
                    >
                        All Services
                    </button>
                    <button
                        onClick={() => setSelectedCategory('essential')}
                        className={`px-6 py-3 rounded-full font-semibold transition-all ${
                            selectedCategory === 'essential'
                                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                        }`}
                    >
                        Essential
                    </button>
                    <button
                        onClick={() => setSelectedCategory('addon')}
                        className={`px-6 py-3 rounded-full font-semibold transition-all ${
                            selectedCategory === 'addon'
                                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                        }`}
                    >
                        Add-ons
                    </button>
                </div>

                {/* Services Grid */}
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
                            className="relative"
                        >
                            {/* Popular Badge */}
                            {service.popular && (
                                <div className="absolute -top-3 -right-3 z-10">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                        <Star className="w-3 h-3" />
                                        Popular
                                    </div>
                                </div>
                            )}

                            <div className={`bg-white rounded-2xl shadow-lg p-6 h-full transition-all duration-300 ${
                                hoveredService === index ? 'shadow-2xl transform -translate-y-2' : ''
                            }`}>
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all ${
                                    hoveredService === index
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                                        : 'bg-primary/10 text-primary'
                                }`}>
                                    <service.icon className="w-7 h-7" />
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>

                                {/* Price */}
                                <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                                    <p className="text-primary font-semibold text-sm">{service.price}</p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                            </div>
                                            <span className="text-sm text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Hover Action */}
                                {hoveredService === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 pt-4 border-t"
                                    >
                                        <button className="w-full bg-gradient-to-r from-primary to-green-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                                            Learn More
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-primary/10 via-purple-100 to-orange-100 rounded-3xl p-8 max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Shield className="w-8 h-8 text-primary" />
                            <Award className="w-8 h-8 text-secondary" />
                            <Sparkles className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">All Services Include Our Quality Guarantee</h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Every service comes with our commitment to excellence, safety protocols,
                            and the loving care your pet deserves. Licensed, insured, and pet first aid certified.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-primary to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all">
                                Book Services Now
                            </button>
                            <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transition-all">
                                Download Service Guide
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
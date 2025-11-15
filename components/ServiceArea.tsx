'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation, Car, Home } from 'lucide-react'
import { useState } from 'react'

export default function ServiceArea() {
    const [hoveredArea, setHoveredArea] = useState<string | null>(null)

    const serviceAreas = [
        { name: 'Boston', distance: '15 miles', popular: true },
        { name: 'Cambridge', distance: '12 miles', popular: true },
        { name: 'Brookline', distance: '8 miles', popular: true },
        { name: 'Newton', distance: '5 miles', popular: true },
        { name: 'Waltham', distance: '10 miles', popular: false },
        { name: 'Lexington', distance: '15 miles', popular: false },
        { name: 'Arlington', distance: '14 miles', popular: false },
        { name: 'Medford', distance: '16 miles', popular: false },
        { name: 'Somerville', distance: '13 miles', popular: true },
        { name: 'Quincy', distance: '18 miles', popular: false },
        { name: 'Dedham', distance: '10 miles', popular: false },
        { name: 'Needham', distance: '7 miles', popular: true },
        { name: 'Natick', distance: '9 miles', popular: false },
        { name: 'Framingham', distance: '12 miles', popular: false },
        { name: 'Weston', distance: '6 miles', popular: false },
        { name: 'Wellesley', distance: '3 miles', popular: true },
        { name: 'Dover', distance: '8 miles', popular: false },
        { name: 'Sherborn', distance: '11 miles', popular: false },
    ]

    return (
        <section id="service-area" className="py-20 bg-neutral-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-primary-700 font-semibold text-sm uppercase tracking-wide">Service Area</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-4 text-neutral-900">
                        Serving Greater Boston
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                        We proudly serve pet families within a 50-mile radius of Wellesley Hills.
                        Convenient pickup and drop-off services available!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Map Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-3xl p-8 h-[500px] flex items-center justify-center relative overflow-hidden">
                            {/* Subtle pattern overlay */}
                            <div className="absolute inset-0 bg-dot-pattern opacity-[0.03]" />

                            {/* Center Point */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute z-10"
                            >
                                <div className="w-6 h-6 bg-primary-700 rounded-full" />
                                <div className="absolute inset-0 bg-primary-600 rounded-full animate-ping" />
                            </motion.div>

                            {/* Radius Circles */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 h-64 border-2 border-primary-700/30 rounded-full absolute" />
                                <div className="w-96 h-96 border-2 border-primary-700/20 rounded-full absolute" />
                                <div className="w-[32rem] h-[32rem] border-2 border-primary-700/10 rounded-full absolute" />
                            </div>

                            {/* Location Label */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12 bg-white rounded-lg shadow-soft-lg border border-neutral-200 p-3 z-10">
                                <div className="flex items-center gap-2">
                                    <Home className="h-5 w-5 text-primary-700" />
                                    <div>
                                        <p className="font-bold text-sm text-neutral-900">Coco's Pet Paradise</p>
                                        <p className="text-xs text-neutral-600">Wellesley Hills, MA</p>
                                    </div>
                                </div>
                            </div>

                            {/* Service Info Cards */}
                            <div className="absolute top-8 left-8 bg-white rounded-lg shadow-soft-md border border-neutral-200 p-4">
                                <MapPin className="h-5 w-5 text-primary-700 mb-2" />
                                <p className="font-bold text-2xl text-neutral-900">50</p>
                                <p className="text-sm text-neutral-600">Mile Radius</p>
                            </div>

                            <div className="absolute bottom-8 right-8 bg-white rounded-lg shadow-soft-md border border-neutral-200 p-4">
                                <Car className="h-5 w-5 text-primary-700 mb-2" />
                                <p className="font-bold text-2xl text-neutral-900">Free</p>
                                <p className="text-sm text-neutral-600">Pickup (10mi)</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Service Areas List */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white rounded-3xl shadow-soft-xl border border-neutral-100 p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-neutral-900">
                                <Navigation className="text-primary-700" />
                                Areas We Serve
                            </h3>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {serviceAreas.map((area, index) => (
                                    <motion.div
                                        key={area.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.02 }}
                                        onMouseEnter={() => setHoveredArea(area.name)}
                                        onMouseLeave={() => setHoveredArea(null)}
                                        className={`flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer ${
                                            hoveredArea === area.name
                                                ? 'bg-primary-700 text-white shadow-soft-lg'
                                                : area.popular
                                                    ? 'bg-primary-50 hover:bg-primary-100 border border-primary-100'
                                                    : 'bg-neutral-50 hover:bg-neutral-100 border border-neutral-100'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${
                                                hoveredArea === area.name
                                                    ? 'bg-white'
                                                    : area.popular
                                                        ? 'bg-primary-700'
                                                        : 'bg-neutral-400'
                                            }`} />
                                            <span className={`font-medium text-sm ${
                                                hoveredArea === area.name
                                                    ? 'text-white'
                                                    : 'text-neutral-700'
                                            }`}>{area.name}</span>
                                            {area.popular && hoveredArea !== area.name && (
                                                <span className="text-xs bg-primary-700/10 text-primary-700 px-2 py-0.5 rounded-full font-medium">
                                                    Popular
                                                </span>
                                            )}
                                        </div>
                                        <span className={`text-xs ${
                                            hoveredArea === area.name ? 'text-white/80' : 'text-neutral-500'
                                        }`}>
                                            {area.distance}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Service Info */}
                            <div className="space-y-4 pt-6 border-t border-neutral-200">
                                <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                                    <h4 className="font-semibold mb-2 text-primary-900 flex items-center gap-2">
                                        <Car className="w-4 h-4" />
                                        Pickup & Drop-off Service
                                    </h4>
                                    <ul className="text-sm text-neutral-700 space-y-1">
                                        <li>• Free within 10 miles of Wellesley Hills</li>
                                        <li>• $20 for 10-25 miles</li>
                                        <li>• $35 for 25-50 miles</li>
                                    </ul>
                                </div>

                                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                                    <h4 className="font-semibold mb-2 text-neutral-900 flex items-center gap-2">
                                        ⏰ Service Hours
                                    </h4>
                                    <ul className="text-sm text-neutral-700 space-y-1">
                                        <li>• Drop-off: 7:00 AM - 9:00 AM</li>
                                        <li>• Pick-up: 4:00 PM - 7:00 PM</li>
                                        <li>• Flexible timing available on request</li>
                                    </ul>
                                </div>

                                <div className="bg-primary-700 p-4 rounded-xl text-white">
                                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Extended Service
                                    </h4>
                                    <p className="text-sm text-primary-50">
                                        Special arrangements available for locations beyond 50 miles.
                                        Contact us for custom quotes!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
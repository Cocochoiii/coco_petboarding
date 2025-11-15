'use client'

import { motion } from 'framer-motion'
import { Award, Users, Heart, Shield, Clock, Star } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
    const stats = [
        { icon: Users, value: '500+', label: 'Happy Pets' },
        { icon: Clock, value: '5 Years', label: 'Experience' },
        { icon: Award, value: '100%', label: 'Satisfaction' },
        { icon: Shield, value: 'Certified', label: 'Pet First Aid' }
    ]

    const features = [
        '24/7 supervision in a real home environment',
        'Daily photo and video updates for peace of mind',
        'Separate comfortable spaces for cats and dogs',
        'Experienced with special needs and senior pets',
        'Licensed, insured, and pet first aid certified',
        'Personalized care plans for each pet',
        'Indoor and outdoor play areas',
        'Regular grooming and health checks'
    ]

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-6">
                            <span className="text-primary font-semibold text-sm uppercase tracking-wide">About Us</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                                Welcome to <span className="text-gradient">Coco's Pet Paradise</span>
                            </h2>
                        </div>

                        <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                            Welcome to our family-run pet boarding service in beautiful Wellesley Hills!
                            With a genuine love for animals and over 5 years of professional experience,
                            we provide a safe, comfortable, and fun environment for your furry family members.
                        </p>

                        <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                            Our home-style approach means your pet isn't just another guest – they become
                            part of our family during their stay. We maintain a limited number of boarders
                            to ensure each pet receives individual attention and personalized care.
                        </p>

                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            Currently caring for <span className="font-bold text-primary">13 wonderful cats</span> and <span className="font-bold text-primary">8 amazing dogs</span>,
                            we understand the unique personality and needs of each pet. Your pet's comfort,
                            safety, and happiness are our absolute top priorities.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl"
                                >
                                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Feature Card */}
                        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl p-8 shadow-xl">
                        <div className="flex items-center gap-2 mb-6">
                                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                                <h3 className="text-2xl font-bold">Why Choose Us?</h3>
                            </div>

                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                        <span className="text-gray-700">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Owner Info Card */}
                            <div className="mt-8 p-6 bg-white rounded-2xl shadow-md">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        CC
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Coco Choi</h4>
                                        <p className="text-gray-600">Owner & Lead Caretaker</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                            <span className="text-sm text-gray-500 ml-1">5.0 rating</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating decoration */}
                        <motion.div
                            className="absolute -top-4 -right-4 text-8xl opacity-10"
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            🐾
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
'use client'

import { motion } from 'framer-motion'
import { Award, Users, Heart, Shield, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react'
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
                    {/* Left Content with Enhanced Interactions */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-6">
                            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wide">About Us</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-neutral-900">
                                Welcome to <span className="text-gradient">Coco's Pet Paradise</span>
                            </h2>
                        </div>

                        <p className="text-neutral-600 mb-4 text-lg leading-relaxed">
                            Welcome to our family-run pet boarding service in beautiful Wellesley Hills!
                            With a genuine love for animals and over 5 years of professional experience,
                            we provide a safe, comfortable, and fun environment for your furry family members.
                        </p>

                        <p className="text-neutral-600 mb-4 text-lg leading-relaxed">
                            Our home-style approach means your pet isn't just another guest – they become
                            part of our family during their stay. We maintain a limited number of boarders
                            to ensure each pet receives individual attention and personalized care.
                        </p>

                        <p className="text-neutral-600 mb-8 text-lg leading-relaxed">
                            Currently caring for <span className="font-bold text-primary-700 border-b-2 border-primary-200">13 wonderful cats</span> and <span className="font-bold text-primary-700 border-b-2 border-primary-200">8 amazing dogs</span>,
                            we understand the unique personality and needs of each pet. Your pet's comfort,
                            safety, and happiness are our absolute top priorities.
                        </p>

                        {/* Enhanced Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="text-center p-4 bg-gradient-to-br from-primary-50 to-neutral-50 rounded-xl border-2 border-transparent hover:border-primary-700 transition-all cursor-pointer"
                                >
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <stat.icon className="h-8 w-8 text-primary-700 mx-auto mb-2" />
                                    </motion.div>
                                    <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                                    <div className="text-sm text-neutral-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content with Enhanced Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        {/* Feature Card with Better Interactions */}
                        <motion.div
                            className="bg-gradient-to-br from-neutral-50 to-white rounded-3xl p-8 shadow-soft-xl border-2 border-neutral-100 hover:border-primary-700 transition-all"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Star className="h-6 w-6 text-primary-700 fill-primary-700" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-neutral-900">Why Choose Us?</h3>
                            </div>

                            <ul className="space-y-4">
                                {features.map((feature, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-start gap-3 group cursor-pointer"
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div
                                            className="w-6 h-6 bg-primary-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-neutral-900 transition-colors"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </motion.div>
                                        <span className="text-neutral-700 group-hover:text-neutral-900 transition-colors">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Enhanced Owner Info Card */}
                            <motion.div
                                className="mt-8 p-6 bg-white rounded-2xl shadow-soft-md border-2 border-neutral-100 hover:border-primary-700 transition-all"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        className="w-16 h-16 bg-gradient-to-br from-primary-700 to-primary-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-soft-lg"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        CC
                                    </motion.div>
                                    <div>
                                        <h4 className="font-bold text-lg text-neutral-900">Coco Choi</h4>
                                        <p className="text-neutral-600">Owner & Lead Caretaker</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <Star className="h-4 w-4 fill-primary-700 text-primary-700" />
                                                </motion.div>
                                            ))}
                                            <span className="text-sm text-neutral-500 ml-1">5.0 rating</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.button
                                className="mt-6 w-full btn-primary py-3 rounded-xl font-semibold group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Learn More About Us
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Floating decoration - replaced with subtle animation */}
                        <motion.div
                            className="absolute -top-4 -right-4 text-6xl opacity-5"
                            animate={{
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 6,
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
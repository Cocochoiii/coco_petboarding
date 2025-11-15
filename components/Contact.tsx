'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Calendar, Info } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        petType: 'dog',
        petName: '',
        startDate: '',
        endDate: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success('Thank you for your inquiry! We\'ll get back to you within 2 hours.', {
            duration: 5000,
            icon: '🎉'
        })

        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            petType: 'dog',
            petName: '',
            startDate: '',
            endDate: '',
            message: ''
        })
        setIsSubmitting(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-primary font-semibold text-sm uppercase tracking-wide">Contact Us</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                        Ready to Book Your <span className="text-gradient">Pet's Stay?</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get in touch today to reserve your spot or ask any questions. We typically respond within 2 hours!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Form - Takes 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-3xl shadow-xl p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <MessageSquare className="text-primary" />
                                Send Us a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="(617) 555-0123"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pet Type *
                                        </label>
                                        <select
                                            name="petType"
                                            value={formData.petType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        >
                                            <option value="dog">🐕 Dog</option>
                                            <option value="cat">🐱 Cat</option>
                                            <option value="both">🐾 Both</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pet's Name
                                    </label>
                                    <input
                                        type="text"
                                        name="petName"
                                        value={formData.petName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="Max, Luna, etc."
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Check-in Date
                                        </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Check-out Date
                                        </label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message / Special Requirements
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="Tell us about your pet's needs, medications, preferences, or any questions you have..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                                        isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-primary to-green-600 hover:shadow-xl'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info - Takes 1 column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Quick Contact Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-6">
                            <h3 className="text-xl font-bold mb-6">Quick Contact</h3>
                            <div className="space-y-4">
                                <a href="tel:6175550123" className="flex items-center gap-3 group">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Phone</p>
                                        <p className="text-gray-600">(617) 555-0123</p>
                                    </div>
                                </a>

                                <a href="mailto:hello@cocospetparadise.com" className="flex items-center gap-3 group">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Email</p>
                                        <p className="text-gray-600 text-sm">hello@cocospetparadise.com</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Location</p>
                                        <p className="text-gray-600">Wellesley Hills, MA</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Hours</p>
                                        <p className="text-gray-600 text-sm">Mon-Sun: 7AM - 8PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Response Time Card */}
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl p-6">
                            <Calendar className="w-10 h-10 mb-3" />
                            <h4 className="font-bold text-lg mb-2">Quick Response Guarantee</h4>
                            <p className="text-green-50">
                                We respond to all inquiries within 2 hours during business hours!
                            </p>
                        </div>

                        {/* Booking Process Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-6">
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary" />
                                Booking Process
                            </h4>
                            <ol className="space-y-3">
                                {[
                                    'Submit inquiry form',
                                    'Phone consultation',
                                    'Meet & greet visit',
                                    'Confirm booking',
                                    'Drop off your pet!'
                                ].map((step, index) => (
                                    <li key={index} className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                                        <span className="text-gray-700">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
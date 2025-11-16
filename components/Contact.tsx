'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Calendar,
    Info,
    ArrowRight,
    MessageCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import Image from 'next/image'

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
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success("Thank you for your inquiry! We'll get back to you within 2 hours.", {
            duration: 5000,
            style: {
                background: '#111827',
                color: '#fff'
            }
        })

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-neutral-50 to-white">
            <div className="container mx-auto px-4">
                {/* Title + SVG */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 relative"
                >
                    {/* 🌟 Mobile SVG：标题上方的小图，桌面端隐藏 */}
                    <div className="flex items-center justify-center gap-4 mb-4 lg:hidden">
                        <Image
                            src="/svgs/contact-decoration2.svg"
                            alt="Contact decoration left"
                            width={80}
                            height={80}
                            className="w-16 h-16 opacity-90"
                        />
                        <Image
                            src="/svgs/contact-decoration.svg"
                            alt="Contact decoration right"
                            width={80}
                            height={80}
                            className="w-16 h-16 opacity-90"
                        />
                    </div>

                    {/* LEFT SVG - 桌面端左右两侧保持原样 */}
                    <motion.div
                        className="hidden lg:block absolute top-[40%] -translate-y-1/2 left-0"
                        initial={{ opacity: 0, x: -50, y: 100, scale: 0.8 }}
                        whileInView={{
                            opacity: 1,
                            x: -20,
                            scale: 2.5,
                            y: [0, -40, 0]
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
                            src="/svgs/contact-decoration2.svg"
                            alt="Contact decoration left"
                            width={200}
                            height={200}
                            className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 opacity-90"
                        />
                    </motion.div>

                    {/* CENTER TITLE */}
                    <div className="text-center mb-8">
                        <span className="text-primary-700 font-semibold text-sm uppercase tracking-wide">
                            Contact Us
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-neutral-900">
                            Ready to Book Your <span className="text-gradient">Pet&apos;s Stay?</span>
                        </h2>
                    </div>

                    {/* RIGHT SVG - 桌面端 */}
                    <motion.div
                        className="hidden lg:block absolute top-[36%] -translate-y-1/2 right-0"
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        whileInView={{
                            opacity: 1,
                            x: 20,
                            scale: 2.3,
                            y: [0, -20, 0]
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
                            src="/svgs/contact-decoration.svg"
                            alt="Contact decoration right"
                            width={200}
                            height={200}
                            className="w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 opacity-90"
                        />
                    </motion.div>

                    {/* DESCRIPTION */}
                    <p className="text-base md:text-xl text-neutral-600 max-w-3xl mx-auto text-center">
                        Get in touch today to reserve your spot or ask any questions. We typically
                        respond within 2 hours!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Enhanced Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-3xl shadow-soft-xl border border-neutral-100 p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2 text-neutral-900">
                                <MessageSquare className="text-primary-700" />
                                Send Us a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Your Name *
                                        </label>
                                        <motion.input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            animate={{
                                                scale: focusedField === 'name' ? 1.01 : 1
                                            }}
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all text-sm md:text-base"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Email Address *
                                        </label>
                                        <motion.input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            animate={{
                                                scale: focusedField === 'email' ? 1.01 : 1
                                            }}
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all text-sm md:text-base"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all text-sm md:text-base"
                                            placeholder="(781) 492-3134"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Pet Type *
                                        </label>
                                        <select
                                            name="petType"
                                            value={formData.petType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all text-sm md:text-base"
                                        >
                                            <option value="dog">🐕 Dog</option>
                                            <option value="cat">🐱 Cat</option>
                                            <option value="both">🐾 Both</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Pet&apos;s Name
                                    </label>
                                    <input
                                        type="text"
                                        name="petName"
                                        value={formData.petName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all text-sm md:text-base"
                                        placeholder="Max, Luna, etc."
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Check-in Date
                                        </label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all text-sm md:text-base"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Check-out Date
                                        </label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all text-sm md:text-base"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Message / Special Requirements
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all resize-none text-sm md:text-base"
                                        placeholder="Tell us about your pet's needs, medications, preferences, or any questions you have..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-3 md:py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 relative overflow-hidden ${
                                        isSubmitting
                                            ? 'bg-neutral-400 cursor-not-allowed'
                                            : 'bg-primary-700 hover:bg-primary-800 hover:shadow-soft-xl'
                                    }`}
                                >
                                    <span className="relative z-10 text-sm md:text-base">
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 inline mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </span>
                                    {!isSubmitting && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Quick Contact Card */}
                        <div className="bg-white rounded-3xl shadow-soft-xl border border-neutral-100 p-6">
                            <h3 className="text-xl font-bold mb-6 text-neutral-900">Quick Contact</h3>
                            <div className="space-y-4">
                                <motion.a
                                    href="tel:781-492-3134"
                                    className="flex items-center gap-3 group cursor-pointer"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition-all">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-900">Phone</p>
                                        <p className="text-neutral-600 text-sm md:text-base">
                                            (781) 492-3134
                                        </p>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="mailto:choi.coco0328@gmail.com"
                                    className="flex items-center gap-3 group cursor-pointer"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-900">Email</p>
                                        <p className="text-neutral-600 text-xs md:text-sm">
                                            choi.coco0328@gmail.com
                                        </p>
                                    </div>
                                </motion.a>

                                {/* WeChat Contact */}
                                <motion.div
                                    className="flex items-center gap-3 group cursor-pointer"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition-all">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-900">WeChat</p>
                                        <p className="text-neutral-600 text-xs md:text-sm">
                                            Bibi0210-Dudu0830
                                        </p>
                                    </div>
                                </motion.div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-primary-700" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-900">Location</p>
                                        <p className="text-neutral-600 text-sm md:text-base">
                                            Wellesley Hills, MA
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-primary-700" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-900">Hours</p>
                                        <p className="text-neutral-600 text-xs md:text-sm">
                                            Mon-Sun: 7AM - 8PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Response Time Card */}
                        <motion.div
                            className="bg-gradient-to-br from-primary-700 to-primary-800 text-white rounded-3xl p-6 relative overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative z-10">
                                <Calendar className="w-10 h-10 mb-3" />
                                <h4 className="font-bold text-lg mb-2">Quick Response Guarantee</h4>
                                <p className="text-primary-50 text-sm">
                                    We respond to all inquiries within 2 hours during business hours!
                                </p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
                        </motion.div>

                        {/* Booking Process Card */}
                        <div className="bg-white rounded-3xl shadow-soft-xl border border-neutral-100 p-6">
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-neutral-900">
                                <Info className="w-5 h-5 text-primary-700" />
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
                                    <motion.li
                                        key={index}
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <motion.span
                                            className="w-8 h-8 bg-primary-700 text-white rounded-full flex items-center justify-center text-sm font-bold"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {index + 1}
                                        </motion.span>
                                        <span className="text-neutral-700 text-sm md:text-base">
                                            {step}
                                        </span>
                                    </motion.li>
                                ))}
                            </ol>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

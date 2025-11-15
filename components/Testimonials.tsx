'use client'

import { motion } from 'framer-motion'
import { Star, Quote, Heart, ThumbsUp } from 'lucide-react'
import { useState } from 'react'

interface Testimonial {
    id: number
    name: string
    pet: string
    petType: 'cat' | 'dog'
    rating: number
    text: string
    date: string
    image?: string
    helpful: number
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        pet: 'Luna (Persian Cat)',
        petType: 'cat',
        rating: 5,
        text: "Coco is absolutely amazing! Luna can be very shy with strangers, but she warmed up to Coco immediately. The daily photos and videos gave me such peace of mind during my two-week vacation. I could see Luna was happy and well-cared for. Will definitely book again!",
        date: '2 weeks ago',
        helpful: 23
    },
    {
        id: 2,
        name: 'Michael Chen',
        pet: 'Max & Bailey (Golden Retrievers)',
        petType: 'dog',
        rating: 5,
        text: "Best pet boarding experience ever! My dogs came back happy, clean, and well-exercised. They actually seemed sad to leave! The facilities are clean, spacious, and the personal attention each pet receives is outstanding. Highly recommend!",
        date: '1 month ago',
        helpful: 19
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        pet: 'Mochi (Scottish Fold)',
        petType: 'cat',
        rating: 5,
        text: "Coco went above and beyond caring for Mochi's special dietary needs. She sent detailed updates about his eating habits and even noticed he preferred a specific play time. Her attention to detail and genuine love for animals shows in everything she does.",
        date: '2 months ago',
        helpful: 31
    },
    {
        id: 4,
        name: 'David Thompson',
        pet: 'Charlie (Border Collie)',
        petType: 'dog',
        rating: 5,
        text: "As a first-time pet boarder, I was nervous leaving Charlie. Coco's meet-and-greet session put all my worries to rest. Charlie had the time of his life with daily activities and made so many furry friends. The video updates were the highlight of my day!",
        date: '3 weeks ago',
        helpful: 27
    },
    {
        id: 5,
        name: 'Lisa Wang',
        pet: 'Whiskers (Ragdoll)',
        petType: 'cat',
        rating: 5,
        text: "I've tried other pet boarding services, but none compare to Coco's. The home environment is so much better than a traditional kennel. Whiskers actually gained confidence and became more social after his stay. Amazing experience!",
        date: '1 month ago',
        helpful: 15
    },
    {
        id: 6,
        name: 'James Miller',
        pet: 'Duke (Labrador)',
        petType: 'dog',
        rating: 5,
        text: "Duke has separation anxiety, but Coco handled it like a pro. She kept him engaged with activities and gave him extra attention when needed. I received updates showing him playing happily with other dogs. Couldn't ask for better care!",
        date: '5 weeks ago',
        helpful: 22
    }
]

export default function Testimonials() {
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'cat' | 'dog'>('all')
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    const filteredTestimonials = selectedFilter === 'all'
        ? testimonials
        : testimonials.filter(t => t.petType === selectedFilter)

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-b from-neutral-50 to-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-primary-700 font-semibold text-sm uppercase tracking-wide">Testimonials</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-4 text-neutral-900">
                        What Pet Parents Say
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                        Don't just take our word for it – hear from the families who trust us with their beloved pets
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setSelectedFilter('all')}
                        className={`px-6 py-3 rounded-full font-medium transition-all ${
                            selectedFilter === 'all'
                                ? 'bg-primary-700 text-white shadow-soft-lg'
                                : 'bg-white text-neutral-700 border border-neutral-200 shadow-soft hover:shadow-soft-md hover:border-neutral-300'
                        }`}
                    >
                        All Reviews ({testimonials.length})
                    </button>
                    <button
                        onClick={() => setSelectedFilter('cat')}
                        className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                            selectedFilter === 'cat'
                                ? 'bg-primary-700 text-white shadow-soft-lg'
                                : 'bg-white text-neutral-700 border border-neutral-200 shadow-soft hover:shadow-soft-md hover:border-neutral-300'
                        }`}
                    >
                        🐱 Cat Parents
                    </button>
                    <button
                        onClick={() => setSelectedFilter('dog')}
                        className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                            selectedFilter === 'dog'
                                ? 'bg-primary-700 text-white shadow-soft-lg'
                                : 'bg-white text-neutral-700 border border-neutral-200 shadow-soft hover:shadow-soft-md hover:border-neutral-300'
                        }`}
                    >
                        🐶 Dog Parents
                    </button>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredCard(testimonial.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="relative"
                        >
                            <div className={`bg-white p-6 rounded-2xl border border-neutral-100 transition-all duration-300 ${
                                hoveredCard === testimonial.id ? 'shadow-soft-xl transform -translate-y-1' : 'shadow-soft'
                            }`}>
                                {/* Quote Icon */}
                                <Quote className="absolute top-4 right-4 h-8 w-8 text-neutral-200" />

                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-primary-600 text-primary-600" />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-neutral-700 mb-6 italic leading-relaxed">
                                    "{testimonial.text}"
                                </p>

                                {/* Reviewer Info */}
                                <div className="border-t border-neutral-100 pt-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                                            <p className="text-sm text-neutral-600 flex items-center gap-1">
                                                {testimonial.petType === 'cat' ? '🐱' : '🐕'} {testimonial.pet}
                                            </p>
                                            <p className="text-xs text-neutral-500 mt-1">{testimonial.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <button className="text-neutral-400 hover:text-primary-700 transition-colors flex items-center gap-1 text-sm">
                                                <ThumbsUp className="h-4 w-4" />
                                                <span>{testimonial.helpful}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Pet Type Badge - 更优雅的设计 */}
                                <div className={`absolute -top-2 -left-2 w-10 h-10 rounded-full flex items-center justify-center shadow-soft-md ${
                                    testimonial.petType === 'cat'
                                        ? 'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700'
                                        : 'bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-700'
                                }`}>
                                    {testimonial.petType === 'cat' ? '🐾' : '🦴'}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-br from-primary-50 to-neutral-50 rounded-2xl shadow-soft-xl border border-primary-100 p-8 max-w-2xl mx-auto">
                        <Heart className="h-12 w-12 text-primary-700 mx-auto mb-4" />
                        <h3 className="text-2xl font-display font-bold mb-2 text-neutral-900">
                            Join Our Happy Pet Family!
                        </h3>
                        <p className="text-neutral-600 mb-6">
                            Experience the difference of personalized, home-style pet care
                        </p>
                        <button className="btn-primary">
                            Book Your Pet's Stay Today
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
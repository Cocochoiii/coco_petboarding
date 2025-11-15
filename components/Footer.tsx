'use client'

import Link from 'next/link'
import { Heart, Facebook, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Heart className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold">Coco's Pet Paradise</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Your pet's home away from home in Wellesley Hills, MA
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="mailto:hello@cocospetparadise.com" className="text-gray-400 hover:text-primary transition-colors">
                                <Mail className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="#services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="#current-pets" className="hover:text-primary transition-colors">Our Pets</Link></li>
                            <li><Link href="#booking" className="hover:text-primary transition-colors">Book Now</Link></li>
                            <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-4 text-primary">Contact Info</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>(617) 555-0123</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>hello@cocospetparadise.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>Wellesley Hills, MA 02481</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>Mon-Sun: 7:00 AM - 8:00 PM</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold mb-4 text-primary">Stay Updated</h4>
                        <p className="text-gray-400 mb-4">
                            Get pet care tips and special offers!
                        </p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-3">
                            Licensed & Insured | Pet First Aid Certified
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        &copy; 2024 Coco's Pet Paradise. All rights reserved. Made with <Heart className="inline h-4 w-4 text-red-500" /> for pets
                    </p>
                </div>
            </div>
        </footer>
    )
}
'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HeroSection from '@/components/HeroSection'
import VirtualTour from '@/components/VirtualTour'
import CurrentPets from '@/components/CurrentPets'
import Services from '@/components/Services'
import BookingCalendar from '@/components/BookingCalendar'
import AboutSection from '@/components/AboutSection'
import Testimonials from '@/components/Testimonials'
import ServiceArea from '@/components/ServiceArea'
import Contact from '@/components/Contact'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import SectionTransition from '@/components/SectionTransition'
import InteractiveBackground from '@/components/InteractiveBackground'
import LoadingScreen from '@/components/LoadingScreen'

export default function HomePage() {
    const [loading, setLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        // Initialize AOS with mobile-friendly settings
        AOS.init({
            duration: isMobile ? 500 : 1000,
            once: false,
            easing: 'ease-out-cubic',
            mirror: true,
            disable: false, // Don't disable on mobile
            offset: isMobile ? 50 : 100
        })

        // Simulate loading
        setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [isMobile])

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <>
            {/* Only show custom cursor on desktop */}
            {!isMobile && <CustomCursor />}

            <ScrollProgress />

            {/* Only show interactive background on desktop */}
            {!isMobile && <InteractiveBackground />}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-hidden"
            >
                <HeroSection />

                <SectionTransition>
                    <CurrentPets />
                </SectionTransition>

                <SectionTransition>
                    <Services />
                </SectionTransition>

                <SectionTransition>
                    <ServiceArea />
                </SectionTransition>

                {/* NEW: Virtual Tour Section - positioned after Hero, before Current Pets */}
                <SectionTransition>
                    <VirtualTour />
                </SectionTransition>

                <SectionTransition>
                    <BookingCalendar />
                </SectionTransition>

                <SectionTransition>
                    <Testimonials />
                </SectionTransition>

                <SectionTransition>
                    <Contact />
                </SectionTransition>

                <SectionTransition>
                    <AboutSection />
                </SectionTransition>
            </motion.div>

            {/* Scroll to Top Button */}
            <motion.button
                className={`fixed ${isMobile ? 'bottom-16 right-4' : 'bottom-20 right-6'} z-40 bg-primary-700 text-white p-2.5 md:p-3 rounded-full shadow-soft-xl hover:bg-primary-800 transition-all`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: scrollYProgress.get() > 0.2 ? 1 : 0,
                    scale: scrollYProgress.get() > 0.2 ? 1 : 0
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </motion.button>
        </>
    )
}
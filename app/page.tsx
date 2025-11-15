'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HeroSection from '@/components/HeroSection'
import CurrentPets from '@/components/CurrentPets'
import Services from '@/components/Services'
import BookingCalendar from '@/components/BookingCalendar'
import AboutSection from '@/components/AboutSection'
import Testimonials from '@/components/Testimonials'
import ServiceArea from '@/components/ServiceArea'
import Contact from '@/components/Contact'

export default function HomePage() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-out-cubic',
        })
    }, [])

    return (
        <>
            <HeroSection />
            <CurrentPets />
            <Services />
            <BookingCalendar />
            <AboutSection />
            <ServiceArea />
            <Testimonials />
            <Contact />
        </>
    )
}
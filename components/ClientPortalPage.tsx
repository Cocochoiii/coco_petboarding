'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User,
    Lock,
    Mail,
    Phone,
    ArrowRight,
    Eye,
    EyeOff,
    LogIn,
    UserPlus,
    Home,
    Heart,
    Shield
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ClientPortalPage() {
    const router = useRouter()
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        setMounted(true)
        // Don't auto-redirect if coming from dashboard logout
        const isFromLogout = sessionStorage.getItem('fromLogout')
        if (isFromLogout) {
            sessionStorage.removeItem('fromLogout')
            return
        }

        // Check if already logged in
        const user = localStorage.getItem('user')
        if (user && window.location.pathname === '/client-portal') {
            router.replace('/dashboard')
        }
    }, [router])

    const isAdminCredentials = (email: string, password: string) => {
        return email.trim().toLowerCase() === 'hcaicoco@gmail.com' && password === '121212'
    }

    const handleLogin = async () => {
        if (!loginData.email || !loginData.password) {
            toast.error('Please fill in all fields')
            return
        }

        setIsLoading(true)

        // Simulate API call
        await new Promise(r => setTimeout(r, 700))

        // Check if admin
        if (isAdminCredentials(loginData.email, loginData.password)) {
            const adminUser = {
                name: 'Coco',
                email: loginData.email,
                role: 'admin',
                permissions: ['edit_pets', 'edit_content', 'view_all']
            }
            localStorage.setItem('user', JSON.stringify(adminUser))
            toast.success('Welcome back, Admin Coco! 👑', {
                icon: '🔐',
                style: { background: '#111827', color: '#fff' }
            })
        } else {
            // Regular user - can only view
            const regularUser = {
                name: loginData.email.split('@')[0],
                email: loginData.email,
                role: 'user',
                permissions: ['view_only']
            }
            localStorage.setItem('user', JSON.stringify(regularUser))
            toast.success('Welcome! You have view-only access.', {
                style: { background: '#111827', color: '#fff' }
            })
        }

        setIsLoading(false)
        router.replace('/dashboard')
    }

    const handleSignup = async () => {
        if (!signupData.name || !signupData.email || !signupData.phone || !signupData.password || !signupData.confirmPassword) {
            toast.error('Please fill in all fields')
            return
        }

        if (signupData.password !== signupData.confirmPassword) {
            toast.error('Passwords do not match!')
            return
        }

        if (signupData.password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setIsLoading(true)
        await new Promise(r => setTimeout(r, 700))

        // New signups are always regular users (view-only)
        const newUser = {
            name: signupData.name || signupData.email.split('@')[0],
            email: signupData.email,
            phone: signupData.phone,
            role: 'user',
            permissions: ['view_only'],
            createdAt: new Date().toISOString()
        }

        localStorage.setItem('user', JSON.stringify(newUser))
        toast.success('Account created! You have view-only access.', {
            icon: '✅',
            style: { background: '#111827', color: '#fff' }
        })

        setIsLoading(false)
        router.push('/dashboard')
    }

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-neutral-50 flex items-center justify-center">
                <div className="w-12 h-12 border-3 border-primary-700 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-neutral-50">
            {/* Header */}
            <div className="container mx-auto px-4 py-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-neutral-700 hover:text-primary-700 transition-colors group"
                >
                    <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Home</span>
                </Link>
            </div>

            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto"
                >
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Heart className="w-10 h-10 text-primary-700" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                            Coco's Pet Paradise
                        </h1>
                        <p className="text-neutral-600">
                            {isLogin ? 'Welcome back to your pet paradise' : 'Join our pet-loving community'}
                        </p>

                        {/* Admin Notice */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-800 rounded-full text-sm"
                        >
                            <Shield className="w-4 h-4" />
                            <span>Admin access available for Coco only</span>
                        </motion.div>
                    </div>

                    {/* Auth Card */}
                    <motion.div
                        className="bg-white rounded-3xl shadow-soft-xl border border-neutral-100 p-8"
                        layout
                    >
                        {/* Tab Switcher */}
                        <div className="flex rounded-full bg-neutral-100 p-1 mb-6">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`flex-1 py-2.5 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                                    isLogin
                                        ? 'bg-primary-700 text-white shadow-soft'
                                        : 'text-neutral-600 hover:text-neutral-900'
                                }`}
                            >
                                <LogIn className="w-4 h-4" />
                                Log In
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`flex-1 py-2.5 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                                    !isLogin
                                        ? 'bg-primary-700 text-white shadow-soft'
                                        : 'text-neutral-600 hover:text-neutral-900'
                                }`}
                            >
                                <UserPlus className="w-4 h-4" />
                                Sign Up
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                            <input
                                                type="email"
                                                required
                                                value={loginData.email}
                                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                value={loginData.password}
                                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                                className="w-full pl-10 pr-12 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all"
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2 rounded" />
                                            <span className="text-sm text-neutral-600">Remember me</span>
                                        </label>
                                        <button type="button" className="text-sm text-primary-700 hover:text-primary-800">
                                            Forgot password?
                                        </button>
                                    </div>

                                    <motion.button
                                        onClick={handleLogin}
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Log In
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                            <input
                                                type="text"
                                                required
                                                value={signupData.name}
                                                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                            <input
                                                type="email"
                                                required
                                                value={signupData.email}
                                                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                            <input
                                                type="tel"
                                                required
                                                value={signupData.phone}
                                                onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all"
                                                placeholder="(123) 456-7890"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                minLength={6}
                                                value={signupData.password}
                                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                                className="w-full pl-10 pr-12 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all"
                                                placeholder="Min. 6 characters"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                value={signupData.confirmPassword}
                                                onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all"
                                                placeholder="Confirm your password"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center">
                                            <input type="checkbox" required className="mr-2 rounded" />
                                            <span className="text-sm text-neutral-600">
                                                I agree to the Terms of Service and Privacy Policy
                                            </span>
                                        </label>
                                    </div>

                                    <motion.button
                                        onClick={handleSignup}
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Create Account
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-sm text-neutral-600 mb-6">As a member, you'll enjoy:</p>
                        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Calendar className="w-6 h-6 text-primary-700" />
                                </div>
                                <p className="text-xs text-neutral-600">Easy Booking</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Heart className="w-6 h-6 text-primary-700" />
                                </div>
                                <p className="text-xs text-neutral-600">Pet Profiles</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Bell className="w-6 h-6 text-primary-700" />
                                </div>
                                <p className="text-xs text-neutral-600">Real-time Updates</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

// Add missing imports
import { Calendar, Bell } from 'lucide-react'
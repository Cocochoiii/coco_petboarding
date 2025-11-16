'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Lock, Mail, Phone, ArrowRight, Eye, EyeOff, LogIn, UserPlus, Home, Heart } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ClientPortalPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Store user data in localStorage (in real app, use proper auth)
        localStorage.setItem('user', JSON.stringify({
            name: 'Demo User',
            email: loginData.email
        }))

        toast.success('Login successful! Redirecting...', {
            style: {
                background: '#111827',
                color: '#fff',
            }
        })

        setTimeout(() => {
            window.location.href = '/dashboard'
        }, 1000)

        setIsLoading(false)
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        if (signupData.password !== signupData.confirmPassword) {
            toast.error('Passwords do not match!', {
                style: {
                    background: '#111827',
                    color: '#fff',
                }
            })
            return
        }

        setIsLoading(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success('Account created successfully! Please log in.', {
            style: {
                background: '#111827',
                color: '#fff',
            }
        })

        setIsLogin(true)
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-neutral-50">
            {/* Header */}
            <div className="container mx-auto px-4 py-6">
                <Link href="/public" className="flex items-center gap-2 text-neutral-700 hover:text-primary-700 transition-colors">
                    <Home className="w-5 h-5" />
                    <span>Back to Home</span>
                </Link>
            </div>

            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto"
                >
                    {/* Logo and Title */}
                    <div className="text-center mb-8">
                        <motion.div
                            className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Heart className="w-10 h-10 text-primary-700" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Client Portal</h1>
                        <p className="text-neutral-600">
                            {isLogin ? 'Welcome back to' : 'Join'} Coco's Pet Paradise
                        </p>
                    </div>

                    {/* Auth Card */}
                    <motion.div
                        className="bg-white rounded-3xl shadow-soft-xl border border-neutral-100 p-8"
                        layout
                    >
                        {/* Toggle Buttons */}
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
                                /* Login Form */
                                <motion.form
                                    key="login"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleLogin}
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
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-all flex items-center justify-center gap-2"
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
                                </motion.form>
                            ) : (
                                /* Signup Form */
                                <motion.form
                                    key="signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleSignup}
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
                                                value={signupData.password}
                                                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                                className="w-full pl-10 pr-12 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-700 focus:outline-none transition-all"
                                                placeholder="Create a password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-all flex items-center justify-center gap-2"
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
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-sm text-neutral-600 mb-4">As a member, you'll enjoy:</p>
                        <div className="flex justify-center gap-6">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Heart className="w-6 h-6 text-primary-700" />
                                </div>
                                <p className="text-xs text-neutral-600">Easy Booking</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <User className="w-6 h-6 text-primary-700" />
                                </div>
                                <p className="text-xs text-neutral-600">Pet Profiles</p>
                            </div>
                            <div className="text-center">
                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Mail className="w-6 h-6 text-primary-700" />
                                </div>
                                <p className="text-xs text-neutral-600">Updates</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
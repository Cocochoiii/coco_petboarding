'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, X, Bot, User, Sparkles, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Coco's assistant 🐾 How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const quickReplies = [
        "What are your rates?",
        "Do you accept puppies?",
        "What's included in boarding?",
        "How do I book?"
    ]

    const getBotReply = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase()

        if (lowerMessage.includes('rate') || lowerMessage.includes('price')) {
            return "Our rates start at $45/day for cats and $55/day for dogs. Extended stays (7+ days) receive a 10% discount! 🏷️"
        } else if (lowerMessage.includes('puppy') || lowerMessage.includes('puppies')) {
            return "Yes, we love puppies! We accept puppies 12 weeks and older. They get extra playtime and attention! 🐶"
        } else if (lowerMessage.includes('included') || lowerMessage.includes('service')) {
            return "Our boarding includes: 24/7 care, daily photos/videos, personalized feeding, playtime, basic grooming, and lots of love! ❤️"
        } else if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
            return "You can book directly through our calendar above, or call us at (617) 555-0123. We recommend booking at least 24 hours in advance! 📅"
        } else {
            return "Thanks for your message! For detailed inquiries, please call us at (617) 555-0123 or use the contact form. We typically respond within 2 hours! 😊"
        }
    }

    const handleSend = () => {
        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsTyping(true)

        // Simulate bot response
        setTimeout(() => {
            const botReply: Message = {
                id: (Date.now() + 1).toString(),
                text: getBotReply(inputValue),
                sender: 'bot',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, botReply])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <>
            {/* Enhanced Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-40 bg-primary-700 text-white p-4 rounded-full shadow-soft-xl hover:bg-primary-800 hover:shadow-soft-2xl transition-all group"
                    >
                        <MessageCircle className="w-6 h-6" />
                        <motion.div
                            className="absolute -top-1 -right-1 bg-neutral-900 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <span className="text-[10px]">●</span>
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Enhanced Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-soft-2xl border-2 border-neutral-200 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-700 to-primary-800 p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <Bot className="w-6 h-6" />
                                    </motion.div>
                                    <div>
                                        <h3 className="font-semibold">Coco's Assistant</h3>
                                        <p className="text-xs text-primary-100">Always here to help!</p>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-neutral-50 to-white">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <motion.div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            message.sender === 'user'
                                                ? 'bg-primary-700'
                                                : 'bg-white border-2 border-neutral-200'
                                        }`}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {message.sender === 'user' ? (
                                            <User className="w-4 h-4 text-white" />
                                        ) : (
                                            <Bot className="w-4 h-4 text-neutral-600" />
                                        )}
                                    </motion.div>
                                    <div className={`max-w-[70%] ${
                                        message.sender === 'user' ? 'text-right' : ''
                                    }`}>
                                        <motion.div
                                            className={`rounded-2xl px-4 py-2 ${
                                                message.sender === 'user'
                                                    ? 'bg-primary-700 text-white'
                                                    : 'bg-white text-neutral-800 shadow-soft border border-neutral-100'
                                            }`}
                                            initial={{ scale: 0.8 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring" }}
                                        >
                                            {message.text}
                                        </motion.div>
                                        <p className="text-xs text-neutral-400 mt-1">
                                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-2"
                                >
                                    <div className="w-8 h-8 bg-white border-2 border-neutral-200 rounded-full flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-neutral-600" />
                                    </div>
                                    <div className="bg-white rounded-2xl px-4 py-3 shadow-soft border border-neutral-100">
                                        <div className="flex gap-1">
                                            <motion.div
                                                className="w-2 h-2 bg-neutral-400 rounded-full"
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-neutral-400 rounded-full"
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 bg-neutral-400 rounded-full"
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Replies */}
                        {messages.length === 1 && (
                            <div className="px-4 py-3 border-t border-neutral-100 bg-white">
                                <p className="text-xs text-neutral-500 mb-2 font-medium">Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickReplies.map((reply) => (
                                        <motion.button
                                            key={reply}
                                            onClick={() => setInputValue(reply)}
                                            className="text-xs px-3 py-1.5 bg-neutral-100 hover:bg-primary-100 hover:text-primary-700 text-neutral-700 rounded-full transition-all font-medium"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {reply}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Enhanced Input */}
                        <div className="p-4 border-t-2 border-neutral-100 bg-white">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2.5 border-2 border-neutral-200 rounded-full focus:outline-none focus:border-primary-700 focus:shadow-soft-lg transition-all placeholder-neutral-400"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSend}
                                    className="p-2.5 bg-primary-700 text-white rounded-full hover:bg-primary-800 hover:shadow-soft-lg transition-all relative overflow-hidden group"
                                >
                                    <Send className="w-5 h-5 relative z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
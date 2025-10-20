import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
    {
        id: 1,
        question: "How can I book a court?",
        answer: "You can book a court directly from our website by selecting your preferred date and time, then proceeding with the payment."
    },
    {
        id: 2,
        question: "Do you offer coaching sessions?",
        answer: "Yes! We provide coaching for Tennis, Badminton, and Squash for all levels, from beginners to advanced players."
    },
    {
        id: 3,
        question: "Can I cancel or reschedule my booking?",
        answer: "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time."
    },
    {
        id: 4,
        question: "Are there membership plans available?",
        answer: "We offer monthly and annual membership plans that include discounted court bookings and priority access to events."
    },
    {
        id: 5,
        question: "What safety measures are in place?",
        answer: "We maintain strict hygiene protocols, regular sanitization of courts, and require all players to follow club safety guidelines."
    },
    {
        id: 6,
        question: "How does the club ensure player safety?",
        answer: "At our Sports Club, player safety is our top priority. We enforce strict hygiene measures, sanitize courts and equipment regularly, maintain social distancing where needed, provide first-aid facilities, and ensure that all players and staff follow the club's safety guidelines at all times."
    }

]

const FAQSection = () => {
    const [openId, setOpenId] = useState(null)

    const toggle = (id) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-blue-100 mt-10 rounded-3xl shadow-md">
            {/* Heading */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2 relative inline-block">
                    Frequently Asked Questions
                    <span className="absolute left-0 -bottom-2 w-20 h-1 bg-blue-600 rounded-full"></span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto mt-2">
                    Got questions? We’ve got answers! Check our FAQs below.
                </p>
            </motion.div>

            {/* FAQ Items */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqs.map(({ id, question, answer }) => (
                    <motion.div
                        key={id}
                        layout
                        className="bg-white rounded-2xl shadow-lg p-5 cursor-pointer transition-all hover:shadow-2xl"
                        onClick={() => toggle(id)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-blue-700">{question}</h3>
                            <span className="text-2xl text-blue-500">{openId === id ? '−' : '+'}</span>
                        </div>
                        <AnimatePresence>
                            {openId === id && (
                                <motion.p
                                    key="content"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="mt-3 text-gray-700 leading-7"
                                >
                                    {answer}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>

    )
}

export default FAQSection

import React from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
}

const About = () => {
  return (
    <motion.section
      className="py-16 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-blue-100 mt-10 rounded-3xl shadow-md"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Title */}
      <motion.div className="text-center mb-10" custom={0} variants={fadeUp}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2 relative inline-block">
          About Our Sports Club
          <span className="absolute left-0 -bottom-2 w-full h-1 bg-blue-600 rounded-full"></span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Inspiring health, teamwork, and excellence since 2005 — your second home for sports, fitness, and friendship.
        </p>
      </motion.div>

      {/* Description */}
      <motion.div className="text-lg px-3 leading-8 text-gray-700 text-justify mx-auto" custom={1} variants={fadeUp}>
        <p>
          Our Sports Club was founded with a vision to bring people together through the power of sports.
          Over the years, we've built a strong community of passionate players, fitness enthusiasts, and
          dedicated coaches who believe in the spirit of teamwork, respect, and perseverance.
        </p>
        <p className="mt-4">
          Whether you're a beginner or a seasoned athlete, our club offers world-class facilities including
          indoor and outdoor courts, modern gym equipment, and specialized coaching programs. We organize
          tournaments, fitness challenges, and social events throughout the year to keep our members active and connected.
        </p>
      </motion.div>

      {/* Mission, Vision, Values Cards */}
      <motion.div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto" custom={2} variants={fadeUp}>
        {/* Mission Card */}
        <div className="p-6 bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-blue-600">
          <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
            🎯 <span>Our Mission</span>
          </h3>
          <p className="text-gray-700 leading-7">
            To inspire individuals to embrace a healthy and active lifestyle through sports.
            We aim to build a supportive community where every player can grow, compete, and
            achieve personal excellence both on and off the court.
          </p>
        </div>

        {/* Vision Card */}
        <div className="p-6 bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-blue-600">
          <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
            🌟 <span>Our Vision</span>
          </h3>
          <p className="text-gray-700 leading-7">
            To become one of the most inclusive and respected sports communities in the region —
            promoting integrity, teamwork, and lifelong friendships through the joy of physical activity.
          </p>
        </div>

        {/* Values Card */}
        <div className="p-6 bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border-t-4 border-blue-600">
          <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
            💡 <span>Our Values</span>
          </h3>
          <p className="text-gray-700 leading-7">
            Passion, Respect, Integrity, Teamwork, and Excellence are the core values that guide everything we do.
          </p>
        </div>
      </motion.div>

      {/* Highlights / Stats Section */}
      <motion.div className="mt-14 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center max-w-7xl mx-auto" custom={3} variants={fadeUp}>
        {/* Example Card */}
        {[
          { number: '18+', label: 'Years of Experience' },
          { number: '500+', label: 'Active Members' },
          { number: '50+', label: 'Tournaments Organized' },
          { number: '10+', label: 'Professional Trainers' },
          { number: '200+', label: 'Monthly Bookings' },
          { number: '15+', label: 'Annual Events' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 shadow hover:scale-105 transition">
            <h4 className="text-3xl font-extrabold text-blue-700">{item.number}</h4>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default About

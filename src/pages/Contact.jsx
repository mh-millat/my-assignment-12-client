import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you ${formData.name}, your message has been sent!`)
    setFormData({ name: '', email: '', message: '' })
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
          Contact Us
          <span className="absolute left-0 -bottom-2 w-20 h-1 bg-blue-600 rounded-full"></span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          Have questions or suggestions? Send us a message and we'll get back to you as soon as possible.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Company Info */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-blue-700 mb-6">Sports Club</h3>
          <p className="text-gray-700 mb-3"><span className="font-semibold">📍 Location:</span> Dhaka, Bangladesh</p>
          <p className="text-gray-700 mb-3"><span className="font-semibold">📞 Phone:</span> +880 123-456-7890</p>
          <p className="text-gray-700 mb-3"><span className="font-semibold">✉️ Email:</span> contact@sportsclub.com</p>
          <p className="text-gray-700 mb-3"><span className="font-semibold">🕒 Working Hours:</span> Mon-Sat, 8:00 AM - 8:00 PM</p>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

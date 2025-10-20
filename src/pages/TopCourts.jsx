import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const courts = [
  { id: 1, name: 'Tennis Court A', type: 'Tennis', price: 500, image: 'https://i.ibb.co/3mJHTQLq/04-tennis.jpg' },
  { id: 2, name: 'Badminton Court B', type: 'Badminton', price: 400, image: 'https://i.ibb.co/h1WL8QHf/31-dbed9f75-0945-43b6-828d-fed432c22ec2.webp' },
  { id: 3, name: 'Squash Court C', type: 'Squash', price: 450, image: 'https://i.ibb.co/pBY9Mhhn/a-tennis-match-600x.webp' },
  { id: 4, name: 'Tennis Court D', type: 'Tennis', price: 500, image: 'https://i.ibb.co/vCrF78YL/courts-scaled.jpg' },
  { id: 5, name: 'Badminton Court E', type: 'Badminton', price: 400, image: 'https://i.ibb.co/234WT8Nd/Document.jpg' },
  { id: 6, name: 'Squash Court F', type: 'Squash', price: 450, image: 'https://i.ibb.co/XQpmkpB/Hi-Pertennistiles7.webp' },
  { id: 7, name: 'Tennis Court G', type: 'Tennis', price: 500, image: 'https://i.ibb.co/BKn3jytJ/How-many-pickleball-courts-fit-tennis-1024x768.jpg' },
  { id: 8, name: 'Badminton Court H', type: 'Badminton', price: 400, image: 'https://i.ibb.co/2YmsW2XV/images.jpg' },
  { id: 9, name: 'Squash Court I', type: 'Squash', price: 450, image: 'https://i.ibb.co/XrTW4GTV/indoor-tennis-court-direct-lighting.jpg' },
  { id: 10, name: 'Tennis Court J', type: 'Tennis', price: 500, image: 'https://i.ibb.co/hx6sLNY9/Innenansicht-auf-das-Spielfeld-einer-Tennishalle.jpg' },
  { id: 11, name: 'Badminton Court K', type: 'Badminton', price: 400, image: 'https://i.ibb.co/ZRw4rvRp/tennis-court-dimensions-1024x576.webp' },
  { id: 12, name: 'Squash Court L', type: 'Squash', price: 450, image: 'https://i.ibb.co/XQpmkpB/Hi-Pertennistiles7.webp' },
]

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const TopCourts = () => {
  const [visibleCount, setVisibleCount] = useState(8)

  const handleSeeMore = () => {
    setVisibleCount(courts.length)
  }

  return (
    <section className="py-16 px-4 md:px-16 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl shadow-inner mt-10">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">🏆 Top Courts</h2>
        <p className="text-gray-600 text-base max-w-3xl mx-auto">
          Explore our premium courts and book your favorite one for the best sports experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <AnimatePresence>
          {courts.slice(0, visibleCount).map(({ id, name, type, price, image }) => (
            <motion.div
              key={id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1 hover:scale-105"
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
            >
              <img src={image} alt={name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-700">{name}</h3>
                <p className="text-sm text-gray-500">{type}</p>
                <p className="text-yellow-500 font-semibold mt-1">৳ {price}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < courts.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleSeeMore}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all"
          >
            See More
          </button>
        </div>
      )}
    </section>
  )
}

export default TopCourts

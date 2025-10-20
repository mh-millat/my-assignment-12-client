import React from 'react'
import { motion } from 'framer-motion'

const reviews = [
  {
    id: 1,
    name: 'Arif Rahman',
    rating: 5,
    comment: 'Amazing experience! The courts are clean and well-maintained.',
    image: 'https://i.ibb.co.com/fYdCcmqB/images.jpg',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    rating: 4,
    comment: 'Loved the facility! Booking process was smooth and easy.',
    image: 'https://i.ibb.co.com/Kxbrtfcy/indian-woman-pic.jpg',
  },
  {
    id: 3,
    name: 'Rafiq Ahmed',
    rating: 5,
    comment: 'Highly recommend! Great staff and well-organized courts.',
    image: 'https://i.ibb.co.com/q39dPYJC/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-g.jpg',
  },
  {
    id: 4,
    name: 'Sabina Akter',
    rating: 4,
    comment: 'A fun place to play sports. Will come back for sure!',
    image: 'https://i.ibb.co.com/Kxbrtfcy/indian-woman-pic.jpg',
  },
  {
    id: 5,
    name: 'Tanvir Hossain',
    rating: 5,
    comment: 'Courts are top-notch and very clean. Loved it!',
    image: 'https://i.ibb.co.com/8Dyr1BWL/pexels-photo-2379005.jpg',
  },
  {
    id: 6,
    name: 'Fatema Khatun',
    rating: 4,
    comment: 'Great experience! Friendly staff and smooth booking.',
    image: 'https://i.ibb.co.com/Kxbrtfcy/indian-woman-pic.jpg',
  },
]

// Motion variants
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const ReviewSection = () => {
  return (
    <section className="py-16 px-4 md:px-16 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl shadow-inner mt-10">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">⭐ What Our Users Say</h2>
        <p className="text-gray-600 text-base max-w-3xl mx-auto">
          Hear from our happy users who enjoyed our premium sports courts and excellent services.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {reviews.map(({ id, name, rating, comment, image }) => (
          <motion.div
            key={id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-xl transition-transform transform hover:-translate-y-1"
            variants={cardVariant}
          >
            <img
              src={image}
              alt={name}
              className="w-16 h-16 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold text-blue-700">{name}</h3>
            <div className="flex items-center justify-center mt-1 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`text-yellow-500 ${i < rating ? '' : 'text-gray-300'}`}>★</span>
              ))}
            </div>
            <p className="text-gray-600 text-sm">{comment}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default ReviewSection

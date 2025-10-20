import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import image1 from '../assets/Banner-1.jpg'
import image2 from '../assets/Banner-2.jpg'
import image3 from '../assets/Banner-3.jpg'

const images = [image1, image2, image3]

const Banner = () => {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()

  const primary = '#1E40AF' //

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleJoinClick = () => {
    navigate('/courts')
  }

  return (
    <div className="w-full h-64 sm:h-80 md:h-[450px] overflow-hidden relative rounded-2xl mt-10">
      {/* Image Slider */}
      <img
        src={images[index]}
        alt="Club banner"
        className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center px-4 md:px-8 py-6 rounded-3xl bg-white/15 shadow-xl border border-white/30 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md tracking-wide">
            Welcome to <span className="text-[#1E40AF]">Our Sports Club</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Stay active, compete with passion, and connect with like-minded athletes. Your fitness journey begins here. Join the movement today!
          </p>

          {/*Join Button */}
          <button
            onClick={handleJoinClick}
            className="mt-6 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            style={{
              backgroundColor: primary,
            }}
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner

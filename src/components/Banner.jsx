import { useEffect, useState } from 'react'

import image1 from '../assets/banner1.jpg.webp'
import image2 from '../assets/banner2.jpg.jpg'
import image3 from '../assets/banner3.jpg.jpg'

const images = [image1, image2, image3]

const Banner = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-64 sm:h-80 md:h-[450px] overflow-hidden relative">
      {/* Image Slider */}
      <img
        src={images[index]}
        alt="Club banner"
        className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center px-4 md:px-8 py-6 rounded-3xl backdrop-blur-md bg-white/20 shadow-xl border border-white/30 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-md tracking-wide">
            Welcome to <span className="text-yellow-300">Our Sports Club</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Stay active, compete with passion, and connect with like-minded athletes. Your fitness journey begins here. Join the movement today!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Banner

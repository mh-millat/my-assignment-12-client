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
        <div className="w-full h-64 sm:h-80 md:h-[400px] overflow-hidden relative">
            <img
                src={images[index]}
                alt="Club banner"
                className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-red-600 bg-gray-50 text-3xl md:text-5xl font-bold border-2 shadow-2xl rounded-2xl text-center py-4 px-2">
                    <h1>Welcome to Our Sports Club</h1>
                    <p className=" text-sm md:text-lg mt-2 max-w-xl drop-shadow-sm">
                        Join us to stay active, compete, and connect with fellow sports enthusiasts. Your fitness journey starts here!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Banner

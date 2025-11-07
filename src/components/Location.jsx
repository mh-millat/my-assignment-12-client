import React from 'react'

const Location = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-blue-100 mt-10 rounded-3xl shadow-lg">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 relative inline-block">
          📍 Find Our Club
        </h2>
      </div>

      {/* Location Info */}
      <div className="text-center mb-10">
        <h3 className="text-xl font-semibold text-blue-700 mb-2">
          Sports Avenue, Dhaka 1207, Bangladesh
        </h3>
        <p className="text-gray-600">
          📞 +880 1712-345678 | ✉️ info@sportsclub.com
        </p>
      </div>


      {/* Info Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <div className="bg-blue-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition-all border-t-4 border-blue-600 text-center">
          <h4 className="text-xl font-bold text-blue-700 mb-2">🕒 Working Hours</h4>
          <p className="text-gray-700">Mon - Fri: 7 AM - 10 PM</p>
          <p className="text-gray-700">Sat - Sun: 8 AM - 11 PM</p>
        </div>

        <div className="bg-blue-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition-all border-t-4 border-blue-500 text-center">
          <h4 className="text-xl font-bold text-blue-600 mb-2">🏆 Facilities Nearby</h4>
          <p className="text-gray-700">Parking | Café | Locker Room | Shop</p>
        </div>

        <div className="bg-blue-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition-all border-t-4 border-blue-500 text-center">
          <h4 className="text-xl font-bold text-blue-600 mb-2">⚡ Club Amenities</h4>
          <p className="text-gray-700">Wi-Fi | Locker Rooms | Changing Area | Refreshments</p>
        </div>

        <div className="bg-blue-100 p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition-all border-t-4 border-blue-400 text-center">
          <h4 className="text-xl font-bold text-blue-500 mb-2">🚗 Easy Access</h4>
          <p className="text-gray-700">Near Metro Station & Main Road</p>
        </div>
      </div>


      {/* Button */}
      <div className="text-center mt-12">
        <a
          href="https://www.google.com/maps/place/Dhaka"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 text-lg font-semibold rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 hover:scale-105 transition-all duration-300"
        >
          View on Google Maps
        </a>
      </div>
    </section>
  )
}

export default Location

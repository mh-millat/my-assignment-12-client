import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 px-6 py-12 mt-10">
      <div className="px-4 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Sports Club</h2>
          <p className="text-gray-400 mb-4">
            Your ultimate destination for premium sports courts, training, and fitness programs. Join us and enjoy top-notch facilities.
          </p>
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Sports Club. All rights reserved.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Courts</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Promotions</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Reviews</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Support</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-400 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Booking Help</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact & Newsletter</h2>
          <p className="mb-2">📞 +880 123-456-7890</p>
          <p className="mb-2">✉️ contact@sportsclub.com</p>
          <p className="mb-4">🏠 Dhaka, Bangladesh</p>

          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-lg text-gray-900 w-full sm:w-auto flex-1"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-blue-400 transition">Facebook</a>
            <a href="#" className="hover:text-pink-400 transition">Instagram</a>
            <a href="#" className="hover:text-blue-300 transition">Twitter</a>
            <a href="#" className="hover:text-red-500 transition">YouTube</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        Designed with ❤️ by Sports Club Team
      </div>
    </footer>
  )
}

export default Footer

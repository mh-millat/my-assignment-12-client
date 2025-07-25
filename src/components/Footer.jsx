const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white px-4 py-6 mt-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                {/* Site Info */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Sports Club</h2>
                    <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
                    <p>📞 +880 123-456-7890</p>
                    <p>✉️ contact@sportsclub.com</p>
                    <p>🏠 Dhaka, Bangladesh</p>
                </div>

                {/* Social Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
                    <div className="flex justify-center md:justify-start gap-4 mt-2">
                        <a href="#" className="hover:text-blue-400 transition">Facebook</a>
                        <a href="#" className="hover:text-pink-400 transition">Instagram</a>
                        <a href="#" className="hover:text-blue-300 transition">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

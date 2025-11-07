import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

const Navbar = () => {
  const { user, userRole, logout } = useAuth()
  const [dropdown, setDropdown] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDashboardRedirect = () => {
    if (userRole === 'admin') {
      navigate('/admin')
    } else if (userRole === 'member') {
      navigate('/member')
    } else {
      navigate('/dashboard')
    }
    setDropdown(false)
    setMobileMenu(false)
  }

  const isActive = (path) =>
    location.pathname === path
      ? 'underline underline-offset-4 decoration-2 decoration-white'
      : 'hover:text-gray-200 transition'

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white px-6 md:px-10 py-3 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo (Left) */}
        <div className="text-2xl font-bold cursor-pointer">
          <Link to="/">SportsClub</Link>
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex items-center space-x-8 mx-auto">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/courts" className={isActive('/courts')}>Courts</Link>
          <Link to="/about" className={isActive('/about')}>About</Link>
          <Link to="/promotions" className={isActive('/promotions')}>Promotions</Link>
        </div>

        {/* Right Section (Login / Profile) */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL || 'https://via.placeholder.com/32'}
                alt="profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
              />
              {dropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-md p-3 z-10">
                  <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-500 mb-2">{user.email}</p>
                  <hr className="my-1" />
                  <button
                    onClick={handleDashboardRedirect}
                    className="block w-full text-left py-1 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-1 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  mobileMenu
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden mt-3 space-y-2 bg-blue-600 px-4 py-3 rounded-lg shadow-lg text-center">
          <Link to="/" onClick={() => setMobileMenu(false)} className={isActive('/')}>Home</Link>
          <Link to="/courts" onClick={() => setMobileMenu(false)} className={isActive('/courts')}>Courts</Link>
          <Link to="/about" onClick={() => setMobileMenu(false)} className={isActive('/about')}>About</Link>
          <Link to="/promotions" onClick={() => setMobileMenu(false)} className={isActive('/promotions')}>Promotions</Link>

          {!user ? (
            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="block mt-2 bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <p className="text-sm font-medium mt-2">{user.displayName || 'User'}</p>
              <p className="text-xs text-gray-200 mb-2">{user.email}</p>
              <button
                onClick={handleDashboardRedirect}
                className="block w-full text-left py-1 hover:bg-blue-500 transition rounded"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-1 hover:bg-blue-500 transition rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
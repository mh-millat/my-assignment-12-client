import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

const Navbar = () => {
  const { user, userRole, logout } = useAuth()
  const [dropdown, setDropdown] = useState(false)
  const navigate = useNavigate()

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
  }

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">🏆 SportsClub</div>
      <div className="space-x-4 flex items-center relative">
        <Link to="/">Home</Link>
        <Link to="/courts">Courts</Link>

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <div className="relative">
            <img
              src={user.photoURL || 'https://via.placeholder.com/32'}
              alt="profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => setDropdown(!dropdown)}
            />
            {dropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md p-2 z-10">
                <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                <p className="text-xs text-gray-500 mb-2">{user.email}</p>
                <hr />
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
    </nav>
  )
}

export default Navbar

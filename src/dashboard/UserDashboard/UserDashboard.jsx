import { NavLink, Outlet } from 'react-router-dom'

const getNavClass = (isActive) =>
  isActive ? 'font-bold underline' : 'hover:underline hover:text-gray-300 transition'

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold mb-6">👤 User Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          <NavLink to="profile" className={({ isActive }) => getNavClass(isActive)}>
            My Profile
          </NavLink>
          <NavLink to="pending" className={({ isActive }) => getNavClass(isActive)}>
            Pending Bookings
          </NavLink>
          <NavLink to="announcements" className={({ isActive }) => getNavClass(isActive)}>
            Announcements
          </NavLink>
          <NavLink to="member" className={({ isActive }) => getNavClass(isActive)}>
            Member Panel
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  )
}

export default UserDashboard

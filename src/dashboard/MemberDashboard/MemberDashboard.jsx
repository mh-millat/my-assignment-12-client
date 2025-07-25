import { Outlet, NavLink } from 'react-router-dom'

const getNavLinkClass = (isActive, color = 'blue') =>
  isActive
    ? `bg-${color}-600 px-3 py-2 rounded`
    : `px-3 py-2 hover:bg-${color}-500 rounded`

const MemberDashboard = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-60 bg-gray-800 text-white p-4">
                <h2 className="text-2xl font-bold mb-6">🏅 Member Panel</h2>
                <nav className="flex flex-col space-y-3">
                    <NavLink to="profile" className={({ isActive }) => getNavLinkClass(isActive, 'blue')} aria-current={({ isActive }) => (isActive ? 'page' : undefined)}>
                        Profile
                    </NavLink>
                    <NavLink to="pending" className={({ isActive }) => getNavLinkClass(isActive, 'blue')} aria-current={({ isActive }) => (isActive ? 'page' : undefined)}>
                        Pending Bookings
                    </NavLink>
                    <NavLink to="approved" className={({ isActive }) => getNavLinkClass(isActive, 'blue')} aria-current={({ isActive }) => (isActive ? 'page' : undefined)}>
                        Approved Bookings
                    </NavLink>
                    <NavLink to="confirmed" className={({ isActive }) => getNavLinkClass(isActive, 'blue')} aria-current={({ isActive }) => (isActive ? 'page' : undefined)}>
                        Confirmed Bookings
                    </NavLink>
                    <NavLink to="payment" className={({ isActive }) => getNavLinkClass(isActive, 'green')} aria-current={({ isActive }) => (isActive ? 'page' : undefined)}>
                        Make Payment
                    </NavLink>
                    <NavLink to="payment-history" className={({ isActive }) => getNavLinkClass(isActive, 'indigo')} aria-current={({ isActive }) => (isActive ? 'page' : undefined)}>
                        Payment History
                    </NavLink>

                    {/* Future Use */}
                    {/* <NavLink to="announcements" className={({ isActive }) => getNavLinkClass(isActive, 'purple')} aria-current={({ isActive }) => (isActive ? 'page' : undefined)}>
                        Announcements
                    </NavLink> */}
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100 min-h-screen overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default MemberDashboard

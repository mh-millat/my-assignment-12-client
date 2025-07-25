import { Outlet, NavLink } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-8">Admin Menu</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-blue-600 border-l-4 border-blue-600 pl-3'
                : 'pl-3 hover:text-blue-600'
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="manage-bookings"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-blue-600 border-l-4 border-blue-600 pl-3'
                : 'pl-3 hover:text-blue-600'
            }
          >
            Manage Bookings
          </NavLink>
          <NavLink
            to="confirmed-bookings"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-blue-600 border-l-4 border-blue-600 pl-3'
                : 'pl-3 hover:text-blue-600'
            }
          >
            Confirmed Bookings
          </NavLink>
          <NavLink
            to="members"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-blue-600 border-l-4 border-blue-600 pl-3'
                : 'pl-3 hover:text-blue-600'
            }
          >
            Manage Members
          </NavLink>
          <NavLink
            to="courts"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-blue-600 border-l-4 border-blue-600 pl-3'
                : 'pl-3 hover:text-blue-600'
            }
          >
            Manage Courts
          </NavLink>
          <NavLink
            to="coupons"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-blue-600 border-l-4 border-blue-600 pl-3'
                : 'pl-3 hover:text-blue-600'
            }
          >
            Manage Coupons
          </NavLink>
          <NavLink
            to="users"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-blue-600 border-l-4 border-blue-600 pl-3'
                : 'pl-3 hover:text-blue-600'
            }
          >
            Manage Users
          </NavLink>
          <NavLink
            to="announcements"
            className={({ isActive }) =>
              isActive
                ? 'font-semibold text-blue-600 border-l-4 border-blue-600 pl-3'
                : 'pl-3 hover:text-blue-600'
            }
          >
            Announcements
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

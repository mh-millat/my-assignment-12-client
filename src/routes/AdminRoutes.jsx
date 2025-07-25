import { Route, Routes, Navigate } from 'react-router-dom'
import AdminDashboard from '../dashboard/AdminDashboard/AdminDashboard'
import Profile from '../dashboard/AdminDashboard/Profile'
import ManageBookings from '../dashboard/AdminDashboard/ManageBookings'
import ManageMembers from '../dashboard/AdminDashboard/ManageMembers'
import ManageCourts from '../dashboard/AdminDashboard/ManageCourts'
import ManageCoupons from '../dashboard/AdminDashboard/ManageCoupons'
import ManageUsers from '../dashboard/AdminDashboard/AllUsers'
import MakeAnnouncement from '../dashboard/AdminDashboard/MakeAnnouncement'
import ConfirmedBookings from '../dashboard/AdminDashboard/ConfirmedBookings'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />}>
                <Route index element={<Navigate to="profile" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="manage-bookings" element={<ManageBookings />} />
                <Route path="confirmed-bookings" element={<ConfirmedBookings />} />
                <Route path="members" element={<ManageMembers />} />
                <Route path="courts" element={<ManageCourts />} />
                <Route path="coupons" element={<ManageCoupons />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="announcements" element={<MakeAnnouncement />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes

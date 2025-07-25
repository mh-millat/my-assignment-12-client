// import { Navigate, Route, Routes } from 'react-router-dom'
// import UserDashboard from '../dashboard/UserDashboard/UserDashboard'
// import Profile from '../dashboard/UserDashboard/Profile'
// import PendingBookings from '../dashboard/UserDashboard/PendingBookings'
// import Announcements from '../dashboard/UserDashboard/Announcements'

// const DashboardRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/" element={<UserDashboard />}>
//                 <Route index element={<Navigate to="profile" />} />
//                 <Route path="profile" element={<Profile />} />
//                 <Route path="pending" element={<PendingBookings />} />
//                 <Route path="announcements" element={<Announcements />} />
//             </Route>
//         </Routes>
//     )
// }

// export default DashboardRoutes


import { Navigate, Route, Routes } from 'react-router-dom'
import UserDashboard from '../dashboard/UserDashboard/UserDashboard'
import Profile from '../dashboard/UserDashboard/Profile'
import PendingBookings from '../dashboard/UserDashboard/PendingBookings'
import Announcements from '../dashboard/UserDashboard/Announcements'

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserDashboard />}>
                <Route index element={<Navigate to="profile" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="pending" element={<PendingBookings />} />
                <Route path="announcements" element={<Announcements />} />
            </Route>
        </Routes>
    )
}

export default DashboardRoutes

import { Route, Routes, Navigate } from 'react-router-dom'
import MemberDashboard from '../dashboard/MemberDashboard/MemberDashboard'
import Profile from '../dashboard/MemberDashboard/Profile'
import Pending from '../dashboard/MemberDashboard/PendingBookings'
import Approved from '../dashboard/MemberDashboard/ApprovedBookings'
import Confirmed from '../dashboard/MemberDashboard/ConfirmedBookings'
import Payment from '../dashboard/MemberDashboard/Payment'
import PaymentHistory from '../dashboard/MemberDashboard/PaymentHistory'


const MemberRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MemberDashboard />}>
                <Route index element={<Navigate to="profile" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="pending" element={<Pending />} />
                <Route path="approved" element={<Approved />} />
                <Route path="confirmed" element={<Confirmed />} />
                <Route path="payment" element={<Payment />} />
                <Route path="payment-history" element={<PaymentHistory />} />
            </Route>
        </Routes>
    )
}

export default MemberRoutes

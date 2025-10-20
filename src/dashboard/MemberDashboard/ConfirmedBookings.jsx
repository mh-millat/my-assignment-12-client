import { useEffect, useState } from 'react';
import axios from 'axios';

function ConfirmedBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://my-assignment-12-server-kappa.vercel.app/bookings/confirmed?page=1&limit=10')
            .then(res => {
                const data = res.data;
                if (data && data.bookings) {
                    setBookings(data.bookings);
                } else {
                    setBookings([]);
                }
                setLoading(false);
            })
            .catch(err => {
                setError('Something went wrong while fetching bookings.');
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-3xl font-semibold mb-6 text-center">Confirmed Bookings</h2>
            <p className="text-center mb-6 text-gray-600">Total Bookings: {bookings.length}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {bookings.map(booking => (
                    <div
                        key={booking._id}
                        className="bg-white shadow-md rounded-lg p-5 border border-gray-100 hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-bold text-blue-600 mb-2">{booking.name}</h3>
                        <p className="text-gray-700"><span className="font-medium">Date:</span> {booking.date}</p>
                        <p className="text-gray-700"><span className="font-medium">Court:</span> {booking.courtName || 'N/A'}</p>
                        <p className="text-gray-700"><span className="font-medium">Status:</span> {booking.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConfirmedBookings;

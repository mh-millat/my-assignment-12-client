// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import toast from 'react-hot-toast';
// import axiosSecure from '../../api/axiosSecure';

// const fetchConfirmed = async () => {
//   const res = await axiosSecure.get('/bookings/confirmed');
//   return res.data; 
// };

// const ConfirmedBookings = () => {
//   const queryClient = useQueryClient();

//   // ✅ Data fetch with correct v5 syntax
//   const {
//     data = { confirmed: [] },
//     isLoading,
//     isError
//   } = useQuery({
//     queryKey: ['confirmedBookings'],
//     queryFn: fetchConfirmed,
//   });

//   // ✅ Cancel mutation
//   const cancelMutation = useMutation({
//     mutationFn: (id) => axiosSecure.delete(`/bookings/${id}`),
//     onSuccess: () => {
//       toast.success('Booking cancelled successfully');
//       queryClient.invalidateQueries({ queryKey: ['confirmedBookings'] });
//     },
//     onError: () => toast.error('Failed to cancel booking'),
//   });

//   const handleCancel = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'This booking will be cancelled permanently.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, cancel it',
//     }).then((res) => {
//       if (res.isConfirmed) {
//         cancelMutation.mutate(id);
//       }
//     });
//   };

//   const formatDate = (dateStr) =>
//     new Date(dateStr).toLocaleDateString(undefined, {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });

//   if (isLoading) return <p className="p-4">Loading confirmed bookings...</p>;
//   if (isError) return <p className="p-4 text-red-600">Failed to load bookings.</p>;

//   const { confirmed } = data;

//   return (
//     <section className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
//         📅 Confirmed Bookings
//       </h2>

//       {confirmed.length === 0 ? (
//         <p className="text-center text-gray-600">No confirmed bookings found.</p>
//       ) : (
//         confirmed.map(({ _id, courtName, date, slots, price }) => (
//           <div
//             key={_id}
//             className="bg-white rounded-lg shadow border-l-4 border-blue-600 p-5 mb-5"
//           >
//             <p>
//               <span className="font-semibold">Court:</span> {courtName}
//             </p>
//             <p>
//               <span className="font-semibold">Date:</span> {formatDate(date)}
//             </p>
//             <p>
//               <span className="font-semibold">Slot(s):</span> {slots}
//             </p>
//             <p>
//               <span className="font-semibold">Price:</span> ৳ {price}
//             </p>

//             <div className="mt-5">
//               <button
//                 onClick={() => handleCancel(_id)}
//                 disabled={cancelMutation.isLoading}
//                 className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded transition disabled:opacity-50"
//               >
//                 {cancelMutation.isLoading ? 'Cancelling...' : 'Cancel Booking'}
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </section>
//   );
// };

// export default ConfirmedBookings;

import { useEffect, useState } from 'react';
import axios from 'axios';

function ConfirmedBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/bookings/confirmed?page=1&limit=10')
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

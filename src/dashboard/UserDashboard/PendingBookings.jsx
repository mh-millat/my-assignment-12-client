
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { motion } from 'framer-motion';

const PendingBookings = () => {
  const [pending, setPending] = useState([]);
  const token = localStorage.getItem('access-token');

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get('https://my-assignment-12-server-kappa.vercel.app/bookings?status=pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPending(res.data);
      } catch (err) {
        console.error('Fetch Error:', err);
      }
    };
    fetchPending();
  }, [token]);

  const cancelBooking = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to cancel booking #${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`https://my-assignment-12-server-kappa.vercel.app/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.deletedCount > 0) {
          Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
          setPending(prev => prev.filter(b => b._id !== id));
        } else {
          Swal.fire('Error', 'Booking not found!', 'error');
        }
      } catch (error) {
        console.error("Cancel Error:", error);
        Swal.fire('Error', 'Something went wrong!', 'error');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        🕒 Pending Bookings
      </h2>

      {pending.length === 0 ? (
        <p className="text-gray-500 text-center">No pending bookings found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pending.map((b, index) => (
            <motion.div
              key={b._id}
              className="border p-3 rounded-lg bg-white shadow hover:shadow-md flex flex-col justify-between"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="text-sm">
                <h3 className="font-semibold mb-1 truncate">{b.court}</h3>
                <p className="text-xs text-gray-600">Date: {new Date(b.date).toLocaleDateString()}</p>
                <p className="text-xs text-gray-600">Slot: {b.slot}</p>
                <p className="text-xs text-gray-600">Price: ৳ {b.price}</p>
              </div>
              <button
                onClick={() => cancelBooking(b._id)}
                className="mt-2 px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
              >
                Cancel
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingBookings;

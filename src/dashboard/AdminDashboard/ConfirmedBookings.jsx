import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['confirmedBookings', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/confirmed?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const bookings = Array.isArray(data?.bookings) ? data.bookings : [];
  const totalPages = typeof data?.totalPages === 'number' ? data.totalPages : 1;

  if (isLoading) return <p className="p-4 text-center">Loading...</p>;
  if (isError || !data)
    return <p className="p-4 text-center text-red-600">Error: {error?.message || 'Failed to load data.'}</p>;

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">✔ Confirmed Bookings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <motion.div
              key={booking._id}
              className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">
                  {booking.userName || 'Unknown User'}
                </h3>
                <p><strong>Court:</strong> {booking.courtName}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {booking.timeSlot ? formatTime(booking.timeSlot) : booking.slots || '—'}</p>
                <p className="text-gray-600">
                  <strong>Approved At:</strong>{' '}
                  {booking.approvedAt
                    ? `${new Date(booking.approvedAt).toLocaleDateString()} ${formatTime(booking.approvedAt)}`
                    : '—'}
                </p>
              </div>

              <div className="text-center">
                <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full shadow-md">
                  ✔ Confirmed
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-6">No confirmed bookings found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded border transition ${
              page === idx + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConfirmedBookings;

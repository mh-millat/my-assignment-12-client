import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axiosSecure from '../../api/axiosSecure';

const fetchPendingBookings = async () => {
  const res = await axiosSecure.get('/bookings?status=pending');
  return res.data;
};

const getUserNameFromEmail = (email) => {
  if (!email) return 'Unknown User';
  return email.split('@')[0];
};

const ManageBookings = () => {
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['pendingBookings'],
    queryFn: fetchPendingBookings,
  });

  const approveMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/bookings/approve/${id}`),
    onSuccess: () => {
      toast.success('Booking approved ✅');
      queryClient.invalidateQueries({ queryKey: ['pendingBookings'] });
    },
    onError: () => toast.error('Failed to approve ❌'),
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/bookings/${id}`),
    onSuccess: () => {
      toast.success('Booking rejected ❌');
      queryClient.invalidateQueries({ queryKey: ['pendingBookings'] });
    },
    onError: () => toast.error('Failed to reject ❌'),
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Approve this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Reject and remove this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="p-4 text-center">Loading bookings...</p>;
  if (isError) return <p className="p-4 text-center text-red-600">Failed to load bookings.</p>;

  if (bookings.length === 0) {
    return <p className="p-4 text-center">No pending bookings.</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Pending Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map(({ _id, userName, user, courtName, slots, date, price }) => (
          <motion.div
            key={_id}
            className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">
                {userName || (user?.email ? getUserNameFromEmail(user.email) : 'Unknown User')}
              </h3>
              <p><strong>Court:</strong> {courtName}</p>
              <p><strong>Slots:</strong> {slots}</p>
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
              <p><strong>Price:</strong> ৳{price}</p>
            </div>

            <div className="flex justify-between mt-4">
              <motion.button
                onClick={() => handleApprove(_id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Approve
              </motion.button>
              <motion.button
                onClick={() => handleReject(_id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reject
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;

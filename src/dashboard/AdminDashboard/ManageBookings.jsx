import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
      toast.success('Booking approved ');
      queryClient.invalidateQueries({ queryKey: ['pendingBookings'] });
    },
    onError: () => toast.error('Failed to approve'),
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/bookings/${id}`),
    onSuccess: () => {
      toast.success('Booking rejected ❌');
      queryClient.invalidateQueries({ queryKey: ['pendingBookings'] });
    },
    onError: () => toast.error('Failed to reject'),
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

  if (isLoading) return <p className="p-4">Loading bookings...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load bookings.</p>;

  if (bookings.length === 0) {
    return <p className="p-4">No pending bookings.</p>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Bookings Approval</h2>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">User</th>
            <th className="border px-3 py-2">Court</th>
            <th className="border px-3 py-2">Slots</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Price</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(({ _id, userName, user, courtName, slots, date, price }) => (
            <tr key={_id} className="hover:bg-gray-50">
              <td className="border px-3 py-2">
                {userName || (user?.email ? getUserNameFromEmail(user.email) : 'Unknown User')}
              </td>
              <td className="border px-3 py-2">{courtName}</td>
              <td className="border px-3 py-2">{slots}</td>
              <td className="border px-3 py-2">{new Date(date).toLocaleDateString()}</td>
              <td className="border px-3 py-2">৳{price}</td>
              <td className="border px-3 py-2 space-x-2">
                <button
                  onClick={() => handleApprove(_id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(_id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;

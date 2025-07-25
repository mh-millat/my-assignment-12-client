import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../api/axiosSecure';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const fetchApprovedBookings = async () => {
  const res = await axiosSecure.get('/bookings?status=approved');
  return res.data;
};

const ApprovedBookings = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: approved = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['approvedBookings'],
    queryFn: fetchApprovedBookings,
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/bookings/${id}`),
    onSuccess: (data, id) => {
      toast.success('Booking cancelled successfully');
      queryClient.setQueryData(['approvedBookings'], (old) =>
        old ? old.filter((booking) => booking._id !== id) : []
      );
    },
    onError: () => {
      toast.error('Failed to cancel booking');
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  if (isLoading) return <p className="p-4 text-center">Loading approved bookings...</p>;
  if (isError) return <p className="p-4 text-center text-red-600">Failed to load approved bookings.</p>;

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">✅ Approved Bookings</h2>

      {approved.length === 0 ? (
        <p className="text-center text-gray-600">No approved bookings found.</p>
      ) : (
        approved.map(({ _id, court, date, slot, price }) => (
          <div key={_id} className="bg-white rounded-lg shadow border-l-4 border-green-600 p-5 mb-5">
            <p>
              <span className="font-semibold">Court:</span> {court}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {formatDate(date)}
            </p>
            <p>
              <span className="font-semibold">Slot:</span> {slot}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ৳ {price}
            </p>

            <div className="mt-5 flex gap-4">
              <button
                onClick={() => navigate('/member/payment')}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
              >
                Pay Now
              </button>
              <button
                onClick={() => handleCancel(_id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded transition"
                disabled={cancelMutation.isLoading}
              >
                {cancelMutation.isLoading ? 'Cancelling...' : 'Cancel'}
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default ApprovedBookings;

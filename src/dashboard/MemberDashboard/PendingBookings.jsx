


import Swal from 'sweetalert2'
import useBookings from '../../hooks/useBookings'
import useCancelBooking from '../../hooks/useCancelBooking'

const PendingBookings = () => {
  const { data: bookings = [], isLoading, isError } = useBookings()
  const cancelBooking = useCancelBooking()

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBooking.mutate(id)
      }
    })
  }

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

  if (isLoading) {
    return <div className="text-center py-10 text-gray-600">Loading pending bookings...</div>
  }

  if (isError) {
    return <div className="text-center py-10 text-red-600">Failed to load bookings. Please try again.</div>
  }

  const pendingBookings = bookings.filter((b) => b.status === 'pending')

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">🕒 Pending Bookings</h2>

      {pendingBookings.length === 0 ? (
        <p className="text-center text-gray-500">No pending bookings found.</p>
      ) : (
        pendingBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-lg border shadow p-4 mb-4"
          >
            <p><b>Court:</b> {booking.courtName}</p>
            <p><b>Date:</b> {formatDate(booking.date)}</p>
            <p><b>Slot:</b> {booking.slot}</p>
            <p>
              <b>Status:</b>{' '}
              <span className="capitalize text-yellow-600">{booking.status}</span>
            </p>

            <button
              onClick={() => handleCancel(booking._id)}
              disabled={cancelBooking.isLoading}
              className={`mt-3 px-4 py-2 rounded text-white ${
                cancelBooking.isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {cancelBooking.isLoading ? 'Cancelling...' : 'Cancel Booking'}
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default PendingBookings

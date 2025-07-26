import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const PendingBookings = () => {
  const [pending, setPending] = useState([]);

  // Load pending bookings
  useEffect(() => {
    fetch('http://localhost:5000/bookings?status=pending')
      .then(res => res.json())
      .then(data => setPending(data))
      .catch(err => console.error(err));
  }, []);

  const cancelBooking = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to cancel booking #${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/bookings/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');

              setPending(prev => prev.filter(b => b._id !== id));
            }
          })
          .catch(error => {
            console.error("Cancel Error:", error);
            Swal.fire('Error', 'Something went wrong!', 'error');
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
      <div className="space-y-4">
        {pending.map((b) => (
          <div
            key={b._id}
            className="border p-4 rounded bg-white shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{b.court}</h3>
              <p>Date: {new Date(b.date).toLocaleDateString()}</p>
              <p>Slot: {b.slot}</p>
              <p>Price: ৳ {b.price}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => cancelBooking(b._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}

        {pending.length === 0 && (
          <p className="text-gray-500 text-center">No pending bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default PendingBookings;

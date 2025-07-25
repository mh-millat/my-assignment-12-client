// const PendingBookings = () => {
//     // Later we will load from backend
//     const pending = [
//         {
//             id: '1',
//             court: 'Tennis Court A',
//             slot: '7:00 AM',
//             date: '2025-07-15',
//             price: 500
//         },
//         {
//             id: '2',
//             court: 'Badminton Court B',
//             slot: '8:00 AM',
//             date: '2025-07-16',
//             price: 600
//         }
//     ]

//     const cancelBooking = (id) => {
//         alert(`Booking ${id} cancelled (UI only)`)
//     }

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
//             <div className="space-y-4">
//                 {pending.map((b) => (
//                     <div
//                         key={b.id}
//                         className="border p-4 rounded bg-white shadow flex justify-between items-center"
//                     >
//                         <div>
//                             <h3 className="font-semibold">{b.court}</h3>
//                             <p>Date: {b.date}</p>
//                             <p>Slot: {b.slot}</p>
//                             <p>Price: ৳ {b.price}</p>
//                         </div>
//                         <button
//                             onClick={() => cancelBooking(b.id)}
//                             className="px-3 py-1 bg-red-500 text-white rounded"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default PendingBookings


// const PendingBookings = () => {
//     // Dummy pending bookings – replace later with backend data
//     const pending = [
//         {
//             id: '1',
//             court: 'Tennis Court A',
//             slot: '7:00 AM',
//             date: '2025-07-15',
//             price: 500
//         },
//         {
//             id: '2',
//             court: 'Badminton Court B',
//             slot: '8:00 AM',
//             date: '2025-07-16',
//             price: 600
//         }
//     ]

//     const cancelBooking = (id) => {
//         alert(`Booking ${id} cancelled (UI only)`)
//     }

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
//             <div className="space-y-4">
//                 {pending.map((b) => (
//                     <div
//                         key={b.id}
//                         className="border p-4 rounded bg-white shadow flex justify-between items-center"
//                     >
//                         <div>
//                             <h3 className="font-semibold">{b.court}</h3>
//                             <p>Date: {new Date(b.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
//                             <p>Slot: {b.slot}</p>
//                             <p>Price: ৳ {b.price}</p>
//                         </div>
//                         <button
//                             onClick={() => cancelBooking(b.id)}
//                             className="px-3 py-1 bg-red-500 hover:bg-red-600 transition-colors text-white rounded"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default PendingBookings








import Swal from 'sweetalert2'

const PendingBookings = () => {
    const pending = [
        {
            id: '1',
            court: 'Tennis Court A',
            slot: '7:00 AM',
            date: '2025-07-15',
            price: 500
        },
        {
            id: '2',
            court: 'Badminton Court B',
            slot: '8:00 AM',
            date: '2025-07-16',
            price: 600
        }
    ]

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
                Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success')
            }
        })
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
            <div className="space-y-4">
                {pending.map((b) => (
                    <div
                        key={b.id}
                        className="border p-4 rounded bg-white shadow flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-semibold">{b.court}</h3>
                            <p>Date: {new Date(b.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                            <p>Slot: {b.slot}</p>
                            <p>Price: ৳ {b.price}</p>
                        </div>
                        <button
                            onClick={() => cancelBooking(b.id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 transition-colors text-white rounded"
                        >
                            Cancel
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PendingBookings


import { useState } from 'react'
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosSecure from '../api/axiosSecure'

const BookingModal = ({ court, onClose, refetch }) => {
    const [date, setDate] = useState('')
    const [slots, setSlots] = useState(1)

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (bookingData) => axiosSecure.post('/bookings', bookingData),
        onSuccess: () => {
            Swal.fire('Request Sent!', 'Your booking request has been submitted.', 'success')
            onClose()
            refetch && refetch()
            queryClient.invalidateQueries(['bookings'])
        },
        onError: (error) => {
            Swal.fire('Error!', error.message || 'Something went wrong.', 'error')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const bookingData = {
            courtId: court._id,
            courtName: court.name,
            type: court.type,
            price: court.price * slots,
            date,
            slots,
            status: 'pending'
        }

        mutation.mutate(bookingData)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96 relative">
                <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✖</button>
                <h2 className="text-lg font-semibold mb-4">Book {court.name}</h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium">Court Type:</label>
                        <input className="border px-2 py-1 w-full" value={court.type} readOnly />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Select Date:</label>
                        <input
                            type="date"
                            className="border px-2 py-1 w-full"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Slots:</label>
                        <input
                            type="number"
                            min={1}
                            className="border px-2 py-1 w-full"
                            value={slots}
                            onChange={(e) => setSlots(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Total Price:</label>
                        <input className="border px-2 py-1 w-full" value={`৳ ${court.price * slots}`} readOnly />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? 'Sending...' : 'Send Booking Request'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BookingModal

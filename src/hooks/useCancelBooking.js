import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosSecure from '../api/axiosSecure'
import Swal from 'sweetalert2'

const useCancelBooking = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (bookingId) => {
      return await axiosSecure.delete(`/bookings/${bookingId}`)
    },
    onSuccess: () => {
      Swal.fire('Cancelled!', 'Booking has been cancelled.', 'success')
      queryClient.invalidateQueries(['bookings'])
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to cancel booking.', 'error')
    },
  })

  return mutation
}

export default useCancelBooking

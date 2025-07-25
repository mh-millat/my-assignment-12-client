import { useQuery } from '@tanstack/react-query'
import axiosSecure from '../api/axiosSecure'

const getBookings = async () => {
  const res = await axiosSecure.get('/bookings')
  return res.data
}

const useBookings = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  })

  return { data, isLoading, isError, refetch }
}

export default useBookings

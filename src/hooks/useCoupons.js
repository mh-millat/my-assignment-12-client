
import { useQuery } from '@tanstack/react-query'
import axiosSecure from '../api/axiosSecure'

const getCoupons = async () => {
  const res = await axiosSecure.get('/coupons')
  return res.data
}

const useCoupons = () => {
  return useQuery({
    queryKey: ['coupons'],
    queryFn: getCoupons,
  })
}

export default useCoupons

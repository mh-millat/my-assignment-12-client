import { useState } from 'react'
import courts from '../data/courtsData'
import BookingModal from '../components/BookingModal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Courts = () => {
    const [selectedCourt, setSelectedCourt] = useState(null)
    const navigate = useNavigate() // 🆕


    const { data: backendCourts = [], isLoading, isError } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => {
            const res = await axios.get('https://cheerful-duckanoo-b871d8.netlify.app//courts')
            return res.data
        }
    })

    const allCourts = [...courts, ...backendCourts]

    const handleBook = (court) => {
        const token = localStorage.getItem('access-token')
        if (!token) {
            navigate('/login', { replace: true })
            return
        }
        setSelectedCourt(court)
    }

    if (isLoading) return <p className="text-center">Loading courts...</p>
    if (isError) return <p className="text-center text-red-500">Failed to load courts.</p>

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Available Courts</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allCourts.map((court, index) => (
                    <div key={court._id || court.id || index} className="border p-4 rounded bg-white shadow">
                        {court.image && (
                            <img
                                src={court.image}
                                alt={court.name}
                                className="w-full h-40 object-cover rounded mb-2"
                            />
                        )}
                        <h3 className="font-semibold">{court.name}</h3>
                        <p>Type: {court.type}</p>
                        <p>Price: ৳ {court.price}</p>
                        <button
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => handleBook(court)}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>

            {selectedCourt && (
                <BookingModal court={selectedCourt} onClose={() => setSelectedCourt(null)} />
            )}
        </div>
    )
}

export default Courts

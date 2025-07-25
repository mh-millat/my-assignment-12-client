import { useState } from 'react'
import courts from '../data/courtsData'
import BookingModal from '../components/BookingModal'

const Courts = () => {
    const [selectedCourt, setSelectedCourt] = useState(null)

    const handleBook = (court) => {
        const token = localStorage.getItem('access-token')
        if (!token) {
            // redirect or toast later
            alert('Please login first!')
            return
        }
        setSelectedCourt(court)
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Available Courts</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {courts.map((court) => (
                    <div key={court.id} className="border p-4 rounded bg-white shadow">
                        <img src={court.image} alt={court.name} className="w-full h-40 object-cover rounded mb-2" />
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

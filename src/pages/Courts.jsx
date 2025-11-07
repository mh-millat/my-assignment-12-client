import { useState } from 'react';
import courts from '../data/courtsData';
import BookingModal from '../components/BookingModal';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Courts = () => {
    const [selectedCourt, setSelectedCourt] = useState(null);
    const navigate = useNavigate();

    const { data: backendCourts = [], isLoading, isError } = useQuery({
        queryKey: ['courts'],
        queryFn: async () => {
            const res = await axios.get('https://my-assignment-12-server-kappa.vercel.app/courts');
            return res.data;
        },
        refetchInterval: 2000,
    });

    const allCourts = [...courts, ...backendCourts];

    const handleBook = (court) => {
        const token = localStorage.getItem('access-token');
        if (!token) {
            navigate('/login', { replace: true });
            return;
        }
        setSelectedCourt(court);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-dots loading-xl text-blue-500"></span>
            </div>
        );
    }

    if (isError)
        return (
            <p className="text-center mt-4 p-4 text-red-500">
                Failed to load courts.
            </p>
        );

    const placeholderImage = 'https://via.placeholder.com/300x200?text=No+Image';

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 p-5 text-center text-blue-700">
                🏸 Available Courts
            </h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {allCourts.slice(0, 100).map((court, index) => (
                    <motion.div
                        key={court._id || court.id || index}
                        className="border border-gray-100 p-3 rounded-lg bg-white shadow hover:shadow-md"
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                        <img
                            src={court.image || placeholderImage}
                            alt={court.name || 'Court'}
                            className="w-full h-28 object-cover rounded mb-2"
                        />
                        <h3 className="font-semibold text-sm">{court.name}</h3>
                        <p className="text-xs text-gray-600">Type: {court.type}</p>
                        <p className="text-xs text-gray-600">Price: ৳ {court.price}</p>
                        <button
                            className="mt-2 bg-blue-600 text-white text-xs px-3 py-1.5 rounded w-full hover:bg-blue-700"
                            onClick={() => handleBook(court)}
                        >
                            Book Now
                        </button>
                    </motion.div>
                ))}
            </div>


            {selectedCourt && (
                <BookingModal
                    court={selectedCourt}
                    onClose={() => setSelectedCourt(null)}
                />
            )}
        </div>
    );
};

export default Courts;
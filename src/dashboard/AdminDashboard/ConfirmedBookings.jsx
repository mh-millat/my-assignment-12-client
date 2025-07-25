// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// const ConfirmedBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['confirmedBookings', page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings/confirmed?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//   });

//   // Safely get bookings array and totalPages number
//   const bookings = Array.isArray(data?.bookings) ? data.bookings : [];
//   const totalPages = typeof data?.totalPages === 'number' ? data.totalPages : 1;

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {error?.message}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Confirmed Bookings</h2>
//       <table className="min-w-full table-auto border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="px-4 py-2">User</th>
//             <th className="px-4 py-2">Court</th>
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Time</th>
//             <th className="px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.length > 0 ? (
//             bookings.map((booking) => (
//               <tr key={booking._id} className="border-t">
//                 <td className="px-4 py-2">{booking.userEmail}</td>
//                 <td className="px-4 py-2">{booking.courtName}</td>
//                 <td className="px-4 py-2">{booking.date}</td>
//                 <td className="px-4 py-2">{booking.timeSlot}</td>
//                 <td className="px-4 py-2 text-green-600 font-bold">✔ Confirmed</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center py-4 text-gray-500">
//                 No confirmed bookings found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="flex justify-center mt-4 gap-2">
//         {Array.from({ length: totalPages }).map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setPage(idx + 1)}
//             className={`px-3 py-1 rounded ${
//               page === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {idx + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConfirmedBookings;




// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// const ConfirmedBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['confirmedBookings', page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings/confirmed?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//   });

//   // ✅ Safely handle before rendering
//   if (isLoading) return <p>Loading...</p>;
//   if (isError || !data) return <p>Error: {error?.message || 'Failed to load data.'}</p>;

//   const bookings = Array.isArray(data.bookings) ? data.bookings : [];
//   const totalPages = typeof data.totalPages === 'number' ? data.totalPages : 1;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Confirmed Bookings</h2>
//       <table className="min-w-full table-auto border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="px-4 py-2">User</th>
//             <th className="px-4 py-2">Court</th>
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Time</th>
//             <th className="px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.length > 0 ? (
//             bookings.map((booking) => (
//               <tr key={booking._id} className="border-t">
//                 <td className="px-4 py-2">{booking.userEmail}</td>
//                 <td className="px-4 py-2">{booking.courtName}</td>
//                 <td className="px-4 py-2">{booking.date}</td>
//                 <td className="px-4 py-2">{booking.timeSlot}</td>
//                 <td className="px-4 py-2 text-green-600 font-bold">✔ Confirmed</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center py-4 text-gray-500">
//                 No confirmed bookings found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-center mt-4 gap-2">
//         {Array.from({ length: totalPages }).map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setPage(idx + 1)}
//             className={`px-3 py-1 rounded ${
//               page === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {idx + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConfirmedBookings;


// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

// const ConfirmedBookings = () => {
//   const axiosSecure = useAxiosSecure();
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['confirmedBookings', page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/bookings/confirmed?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//   });

//   const bookings = Array.isArray(data?.bookings) ? data.bookings : [];
//   const totalPages = typeof data?.totalPages === 'number' ? data.totalPages : 1;

//   if (isLoading) return <p className="p-4">Loading...</p>;
//   if (isError || !data) return <p className="p-4 text-red-600">Error: {error?.message || 'Failed to load data.'}</p>;

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">✔ Confirmed Bookings</h2>

//       <div className="overflow-x-auto shadow rounded-lg border">
//         <table className="min-w-full text-sm text-left border-collapse">
//           <thead className="bg-blue-100 text-gray-800 uppercase font-semibold">
//             <tr>
//               <th className="px-4 py-3 border">User</th>
//               <th className="px-4 py-3 border">Court</th>
//               <th className="px-4 py-3 border">Date</th>
//               <th className="px-4 py-3 border">Time</th>
//               <th className="px-4 py-3 border">Approved At</th>
//               <th className="px-4 py-3 border">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.length > 0 ? (
//               bookings.map((booking) => (
//                 <tr key={booking._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{booking.userEmail}</td>
//                   <td className="px-4 py-2 border">{booking.courtName}</td>
//                   <td className="px-4 py-2 border">{new Date(booking.date).toLocaleDateString()}</td>
//                   <td className="px-4 py-2 border">{booking.timeSlot || booking.slots}</td>
//                   <td className="px-4 py-2 border text-gray-600">
//                     {booking.approvedAt
//                       ? new Date(booking.approvedAt).toLocaleString()
//                       : '—'}
//                   </td>
//                   <td className="px-4 py-2 border text-green-600 font-bold text-center">✔ Confirmed</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center text-gray-500 py-6">
//                   No confirmed bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 gap-2 flex-wrap">
//         {Array.from({ length: totalPages }).map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setPage(idx + 1)}
//             className={`px-3 py-1 rounded border transition ${
//               page === idx + 1
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 hover:bg-gray-200'
//             }`}
//           >
//             {idx + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConfirmedBookings;



import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['confirmedBookings', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/confirmed?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const bookings = Array.isArray(data?.bookings) ? data.bookings : [];
  const totalPages = typeof data?.totalPages === 'number' ? data.totalPages : 1;

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError || !data) return <p className="p-4 text-red-600">Error: {error?.message || 'Failed to load data.'}</p>;

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">✔ Confirmed Bookings</h2>

      <div className="overflow-x-auto shadow rounded-lg border">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-blue-100 text-gray-800 uppercase font-semibold">
            <tr>
              <th className="px-4 py-3 border">User</th>
              <th className="px-4 py-3 border">Court</th>
              <th className="px-4 py-3 border">Date</th>
              <th className="px-4 py-3 border">Time</th>
              <th className="px-4 py-3 border">Approved At</th>
              <th className="px-4 py-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{booking.userName || 'Unknown'}</td>
                  <td className="px-4 py-2 border">{booking.courtName}</td>
                  <td className="px-4 py-2 border">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">
                    {booking.timeSlot
                      ? formatTime(booking.timeSlot)
                      : booking.slots || '—'}
                  </td>
                  <td className="px-4 py-2 border text-gray-600">
                    {booking.approvedAt
                      ? `${new Date(booking.approvedAt).toLocaleDateString()} ${formatTime(booking.approvedAt)}`
                      : '—'}
                  </td>
                  <td className="px-4 py-2 border text-green-600 font-bold text-center">✔ Confirmed</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No confirmed bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded border transition ${
              page === idx + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConfirmedBookings;

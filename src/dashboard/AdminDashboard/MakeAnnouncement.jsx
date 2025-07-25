// import { useState } from 'react';
// import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

// import Swal from 'sweetalert2';
// import toast from 'react-hot-toast';
// import axiosSecure from '../../api/axiosSecure';

// const fetchAnnouncements = async () => {
//   const res = await axiosSecure.get('/announcements');
//   return res.data;
// };

// const MakeAnnouncement = () => {
//   const queryClient = useQueryClient();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const { data: announcements = [], isLoading, isError } = useQuery(
//     ['announcements'],
//     fetchAnnouncements
//   );

//   const mutation = useMutation(
//     (newAnnouncement) => axiosSecure.post('/announcements', newAnnouncement),
//     {
//       onSuccess: () => {
//         toast.success('Announcement added successfully');
//         queryClient.invalidateQueries(['announcements']);
//         setTitle('');
//         setContent('');
//       },
//       onError: () => {
//         toast.error('Failed to add announcement');
//       },
//     }
//   );

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!title.trim() || !content.trim()) {
//       toast.error('Please fill all fields');
//       return;
//     }

//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You want to add this announcement!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, add it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         mutation.mutate({ title, content, date: new Date().toISOString() });
//       }
//     });
//   };

//   if (isLoading) return <p className="p-4">Loading announcements...</p>;
//   if (isError) return <p className="p-4 text-red-600">Failed to load announcements.</p>;

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Make Announcements</h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <div>
//           <label className="block font-semibold mb-1">Title:</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Announcement title"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Content:</label>
//           <textarea
//             className="w-full border rounded px-3 py-2"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Announcement content"
//             rows={4}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={mutation.isLoading}
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {mutation.isLoading ? 'Adding...' : 'Add Announcement'}
//         </button>
//       </form>

//       {/* Existing Announcements List */}
//       <div>
//         <h3 className="text-xl font-semibold mb-4">All Announcements</h3>
//         {announcements.length === 0 ? (
//           <p>No announcements found.</p>
//         ) : (
//           <ul className="space-y-3">
//             {announcements.map((ann) => (
//               <li key={ann._id} className="border p-3 rounded shadow-sm bg-white">
//                 <h4 className="font-semibold">{ann.title}</h4>
//                 <p className="text-gray-700">{ann.content}</p>
//                 <small className="text-gray-500">
//                   {new Date(ann.date).toLocaleString()}
//                 </small>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MakeAnnouncement;


import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import axiosSecure from '../../api/axiosSecure';

const fetchAnnouncements = async () => {
  const res = await axiosSecure.get('/announcements');
  return res.data;
};

const MakeAnnouncement = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data: announcements = [], isLoading, isError } = useQuery({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
  });

  const mutation = useMutation({
    mutationFn: (newAnnouncement) => axiosSecure.post('/announcements', newAnnouncement),
    onSuccess: () => {
      toast.success('Announcement added successfully');
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      setTitle('');
      setContent('');
    },
    onError: () => {
      toast.error('Failed to add announcement');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill all fields');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to add this announcement!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ title, content, date: new Date().toISOString() });
      }
    });
  };

  if (isLoading) return <p className="p-4">Loading announcements...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load announcements.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Make Announcements</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-semibold mb-1">Title:</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Content:</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Announcement content"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isLoading ? 'Adding...' : 'Add Announcement'}
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-4">All Announcements</h3>
        {announcements.length === 0 ? (
          <p>No announcements found.</p>
        ) : (
          <ul className="space-y-3">
            {announcements.map((ann) => (
              <li key={ann._id} className="border p-3 rounded shadow-sm bg-white">
                <h4 className="font-semibold">{ann.title}</h4>
                <p className="text-gray-700">{ann.content}</p>
                <small className="text-gray-500">
                  {new Date(ann.date).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MakeAnnouncement;

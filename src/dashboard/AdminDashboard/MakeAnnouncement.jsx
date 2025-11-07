import { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import axiosSecure from '../../api/axiosSecure';
import { motion } from 'framer-motion';

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
      Swal.fire({
        title: '🎉 Success!',
        text: 'Announcement added successfully!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      setTitle('');
      setContent('');
    },
    onError: () => {
      Swal.fire({
        title: '❌ Failed!',
        text: 'Failed to add announcement.',
        icon: 'error',
      });
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
      text: 'You want to add this announcement!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ title, content, date: new Date().toISOString() });
      }
    });
  };

  if (isLoading) return <p className="p-4 text-blue-600">Loading announcements...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load announcements.</p>;

  return (
    <motion.div
      className="p-6 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-extrabold mb-6 text-blue-700 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📢 Make Announcements
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 bg-white shadow-lg p-5 rounded-xl border"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div>
          <label className="block font-semibold mb-1">Title:</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Content:</label>
          <textarea
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Announcement content"
            rows={4}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={mutation.isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isLoading ? 'Adding...' : 'Add Announcement'}
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">All Announcements</h3>

        {announcements.length === 0 ? (
          <p>No announcements found.</p>
        ) : (
          <div className="space-y-3">
            {announcements.map((ann, index) => (
              <motion.div
                key={ann._id}
                className="border p-3 rounded-lg shadow-sm bg-blue-50 hover:bg-blue-100"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-bold text-blue-800">{ann.title}</h4>
                <p className="text-gray-700">{ann.content}</p>
                <small className="text-gray-500">
                  {new Date(ann.date).toLocaleString()}
                </small>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MakeAnnouncement;
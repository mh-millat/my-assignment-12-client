import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import axiosSecure from '../../api/axiosSecure';

const fetchCourts = async () => {
  const res = await axiosSecure.get('/courts');
  return res.data;
};

const ManageCourts = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    image: '',
  });
  const [editId, setEditId] = useState(null);

  const { data: courts = [], isLoading, isError } = useQuery({
    queryKey: ['courts'],
    queryFn: fetchCourts,
  });

  const addCourt = useMutation({
    mutationFn: (newCourt) => axiosSecure.post('/courts', newCourt),
    onSuccess: () => {
      toast.success('Court added successfully ✅');
      queryClient.invalidateQueries({ queryKey: ['courts'] });
      resetForm();
    },
    onError: () => toast.error('Failed to add court'),
  });

  const updateCourt = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/courts/${id}`, data),
    onSuccess: () => {
      toast.success('Court updated successfully ✅');
      queryClient.invalidateQueries({ queryKey: ['courts'] });
      resetForm();
    },
    onError: () => toast.error('Failed to update court'),
  });

  const deleteCourt = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/courts/${id}`),
    onSuccess: () => {
      toast.success('Court deleted ❌');
      queryClient.invalidateQueries({ queryKey: ['courts'] });
      resetForm();
    },
    onError: () => toast.error('Failed to delete court'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, type, price } = formData;

    if (!name || !type || !price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const payload = { ...formData, price: Number(formData.price) };

    if (editId) {
      updateCourt.mutate({ id: editId, data: payload });
    } else {
      addCourt.mutate(payload);
    }
  };

  const handleEdit = (court) => {
    setFormData({
      name: court.name,
      type: court.type,
      price: court.price.toString(),
      image: court.image || '',
    });
    setEditId(court._id);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this court?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourt.mutate(id);
      }
    });
  };

  const resetForm = () => {
    setFormData({ name: '', type: '', price: '', image: '' });
    setEditId(null);
  };

  if (isLoading) return <p className="p-4 text-center">Loading courts...</p>;
  if (isError) return <p className="p-4 text-center text-red-600">Failed to load courts.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {editId ? 'Edit Court' : 'Add New Court'}
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-md mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Court Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Court Type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price per Session"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow-md transition"
        >
          {editId ? 'Update Court' : 'Add Court'}
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4 text-center">All Courts</h3>

      {courts.length === 0 ? (
        <p className="text-center text-gray-500">No courts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map(({ _id, name, type, price, image }) => (
            <motion.div
              key={_id}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-100 flex flex-col justify-between"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="mb-4">
                {image && (
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-36 object-cover rounded mb-2"
                  />
                )}
                <h4 className="text-xl font-semibold">{name}</h4>
                <p className="text-gray-600">{type}</p>
                <p className="text-gray-500 font-bold">৳{price}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleEdit({ _id, name, type, price, image })}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-md transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow-md transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCourts;

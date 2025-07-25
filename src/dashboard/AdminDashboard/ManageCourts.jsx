


// import { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import axiosSecure from '../../api/axiosSecure';

// const fetchCourts = async () => {
//   const res = await axiosSecure.get('/courts');
//   return res.data;
// };

// const ManageCourts = () => {
//   const queryClient = useQueryClient();
//   const [formData, setFormData] = useState({
//     name: '',
//     type: '',
//     price: '',
//     image: '',
//   });
//   const [editId, setEditId] = useState(null);

//   const { data: courts = [], isLoading, isError } = useQuery(['courts'], fetchCourts);

//   const addCourt = useMutation(
//     (newCourt) => axiosSecure.post('/courts', newCourt),
//     {
//       onSuccess: () => {
//         toast.success('Court added successfully ✅');
//         queryClient.invalidateQueries(['courts']);
//         resetForm();
//       },
//       onError: () => toast.error('Failed to add court'),
//     }
//   );

//   const updateCourt = useMutation(
//     ({ id, data }) => axiosSecure.patch(`/courts/${id}`, data),
//     {
//       onSuccess: () => {
//         toast.success('Court updated successfully ✅');
//         queryClient.invalidateQueries(['courts']);
//         resetForm();
//       },
//       onError: () => toast.error('Failed to update court'),
//     }
//   );

//   const deleteCourt = useMutation(
//     (id) => axiosSecure.delete(`/courts/${id}`),
//     {
//       onSuccess: () => {
//         toast.success('Court deleted ❌');
//         queryClient.invalidateQueries(['courts']);
//         resetForm();
//       },
//       onError: () => toast.error('Failed to delete court'),
//     }
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, type, price } = formData;

//     if (!name || !type || !price) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     const payload = {
//       ...formData,
//       price: Number(formData.price),
//     };

//     if (editId) {
//       updateCourt.mutate({ id: editId, data: payload });
//     } else {
//       addCourt.mutate(payload);
//     }
//   };

//   const handleEdit = (court) => {
//     setFormData({
//       name: court.name,
//       type: court.type,
//       price: court.price.toString(),
//       image: court.image || '',
//     });
//     setEditId(court._id);
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You want to delete this court?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteCourt.mutate(id);
//       }
//     });
//   };

//   const resetForm = () => {
//     setFormData({ name: '', type: '', price: '', image: '' });
//     setEditId(null);
//   };

//   if (isLoading) return <p className="p-4">Loading courts...</p>;
//   if (isError) return <p className="p-4 text-red-600">Failed to load courts.</p>;

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Court' : 'Add New Court'}</h2>

//       <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-md">
//         <input
//           type="text"
//           name="name"
//           placeholder="Court Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="type"
//           placeholder="Court Type"
//           value={formData.type}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price per Session"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           min="0"
//           required
//         />
//         <input
//           type="text"
//           name="image"
//           placeholder="Image URL (optional)"
//           value={formData.image}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {editId ? 'Update Court' : 'Add Court'}
//         </button>
//       </form>

//       <h3 className="text-xl font-semibold mb-2">All Courts</h3>
//       {courts.length === 0 ? (
//         <p>No courts available.</p>
//       ) : (
//         <table className="w-full border text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-3 py-2">Image</th>
//               <th className="border px-3 py-2">Name</th>
//               <th className="border px-3 py-2">Type</th>
//               <th className="border px-3 py-2">Price</th>
//               <th className="border px-3 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courts.map(({ _id, name, type, price, image }) => (
//               <tr key={_id} className="hover:bg-gray-50">
//                 <td className="border px-3 py-1">
//                   {image ? (
//                     <img src={image} alt={name} className="w-16 h-12 object-cover rounded" />
//                   ) : (
//                     'No Image'
//                   )}
//                 </td>
//                 <td className="border px-3 py-1">{name}</td>
//                 <td className="border px-3 py-1">{type}</td>
//                 <td className="border px-3 py-1">৳{price}</td>
//                 <td className="border px-3 py-1 space-x-2">
//                   <button
//                     onClick={() => handleEdit({ _id, name, type, price, image })}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(_id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ManageCourts;


import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
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

    const payload = {
      ...formData,
      price: Number(formData.price),
    };

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

  if (isLoading) return <p className="p-4">Loading courts...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load courts.</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Court' : 'Add New Court'}</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Court Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Court Type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price per Session"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          min="0"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? 'Update Court' : 'Add Court'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">All Courts</h3>
      {courts.length === 0 ? (
        <p>No courts available.</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Image</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Type</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courts.map(({ _id, name, type, price, image }) => (
              <tr key={_id} className="hover:bg-gray-50">
                <td className="border px-3 py-1">
                  {image ? (
                    <img src={image} alt={name} className="w-16 h-12 object-cover rounded" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border px-3 py-1">{name}</td>
                <td className="border px-3 py-1">{type}</td>
                <td className="border px-3 py-1">৳{price}</td>
                <td className="border px-3 py-1 space-x-2">
                  <button
                    onClick={() => handleEdit({ _id, name, type, price, image })}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCourts;

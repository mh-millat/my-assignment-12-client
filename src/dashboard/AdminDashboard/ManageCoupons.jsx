




// import { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';
// import axiosSecure from '../../api/axiosSecure';

// // Fetch all coupons
// const fetchCoupons = async () => {
//   const res = await axiosSecure.get('/coupons');
//   return res.data;
// };

// const ManageCoupons = () => {
//   const queryClient = useQueryClient();
//   const [formData, setFormData] = useState({ code: '', discount: '' });
//   const [editId, setEditId] = useState(null);

//   // Fetch coupons
//   const { data: coupons = [], isLoading, isError } = useQuery(['coupons'], fetchCoupons);

//   // Add coupon mutation
//   const addMutation = useMutation(
//     (newCoupon) => axiosSecure.post('/coupons', newCoupon),
//     {
//       onSuccess: () => {
//         toast.success('Coupon added ✅');
//         queryClient.invalidateQueries(['coupons']);
//         setFormData({ code: '', discount: '' });
//       },
//       onError: () => toast.error('Failed to add coupon'),
//     }
//   );

//   // Update coupon mutation
//   const updateMutation = useMutation(
//     ({ id, data }) => axiosSecure.patch(`/coupons/${id}`, data),
//     {
//       onSuccess: () => {
//         toast.success('Coupon updated ✅');
//         queryClient.invalidateQueries(['coupons']);
//         setFormData({ code: '', discount: '' });
//         setEditId(null);
//       },
//       onError: () => toast.error('Failed to update coupon'),
//     }
//   );

//   // Delete coupon mutation
//   const deleteMutation = useMutation(
//     (id) => axiosSecure.delete(`/coupons/${id}`),
//     {
//       onSuccess: () => {
//         toast.success('Coupon deleted ❌');
//         queryClient.invalidateQueries(['coupons']);
//       },
//       onError: () => toast.error('Failed to delete coupon'),
//     }
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { code, discount } = formData;

//     if (!code.trim() || !discount.trim()) {
//       toast.error('Please fill all fields');
//       return;
//     }
//     if (isNaN(discount) || Number(discount) <= 0) {
//       toast.error('Discount must be a positive number');
//       return;
//     }

//     if (editId) {
//       updateMutation.mutate({ id: editId, data: { code, discount: Number(discount) } });
//     } else {
//       addMutation.mutate({ code, discount: Number(discount) });
//     }
//   };

//   const handleEdit = (coupon) => {
//     setFormData({ code: coupon.code, discount: coupon.discount.toString() });
//     setEditId(coupon._id);
//   };

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Delete this coupon?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate(id);
//       }
//     });
//   };

//   if (isLoading) return <p className="p-4">Loading coupons...</p>;
//   if (isError) return <p className="p-4 text-red-600">Failed to load coupons.</p>;

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Coupon' : 'Add New Coupon'}</h2>
//       <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-sm">
//         <input
//           type="text"
//           name="code"
//           placeholder="Coupon Code"
//           value={formData.code}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           required
//         />
//         <input
//           type="number"
//           name="discount"
//           placeholder="Discount Percentage"
//           value={formData.discount}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded"
//           min="1"
//           max="100"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           disabled={addMutation.isLoading || updateMutation.isLoading}
//         >
//           {editId ? (updateMutation.isLoading ? 'Updating...' : 'Update Coupon') : (addMutation.isLoading ? 'Adding...' : 'Add Coupon')}
//         </button>
//       </form>

//       <h3 className="text-xl font-semibold mb-2">All Coupons</h3>
//       {coupons.length === 0 ? (
//         <p>No coupons available.</p>
//       ) : (
//         <table className="w-full border text-left">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-3 py-2">Code</th>
//               <th className="border px-3 py-2">Discount %</th>
//               <th className="border px-3 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {coupons.map((coupon) => (
//               <tr key={coupon._id} className="hover:bg-gray-50">
//                 <td className="border px-3 py-1">{coupon.code}</td>
//                 <td className="border px-3 py-1">{coupon.discount}</td>
//                 <td className="border px-3 py-1 space-x-2">
//                   <button
//                     onClick={() => handleEdit(coupon)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(coupon._id)}
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

// export default ManageCoupons;


import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import axiosSecure from '../../api/axiosSecure';

// Fetch all coupons
const fetchCoupons = async () => {
  const res = await axiosSecure.get('/coupons');
  return res.data;
};

const ManageCoupons = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ code: '', discount: '' });
  const [editId, setEditId] = useState(null);

  // Fetch coupons with React Query v5 object syntax
  const { data: coupons = [], isLoading, isError } = useQuery({
    queryKey: ['coupons'],
    queryFn: fetchCoupons,
  });

  // Add coupon mutation
  const addMutation = useMutation({
    mutationFn: (newCoupon) => axiosSecure.post('/coupons', newCoupon),
    onSuccess: () => {
      toast.success('Coupon added ✅');
      queryClient.invalidateQueries(['coupons']);
      setFormData({ code: '', discount: '' });
    },
    onError: () => toast.error('Failed to add coupon'),
  });

  // Update coupon mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/coupons/${id}`, data),
    onSuccess: () => {
      toast.success('Coupon updated ✅');
      queryClient.invalidateQueries(['coupons']);
      setFormData({ code: '', discount: '' });
      setEditId(null);
    },
    onError: () => toast.error('Failed to update coupon'),
  });

  // Delete coupon mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/coupons/${id}`),
    onSuccess: () => {
      toast.success('Coupon deleted ❌');
      queryClient.invalidateQueries(['coupons']);
    },
    onError: () => toast.error('Failed to delete coupon'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { code, discount } = formData;

    if (!code.trim() || !discount.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    if (isNaN(discount) || Number(discount) <= 0) {
      toast.error('Discount must be a positive number');
      return;
    }

    if (editId) {
      updateMutation.mutate({ id: editId, data: { code, discount: Number(discount) } });
    } else {
      addMutation.mutate({ code, discount: Number(discount) });
    }
  };

  const handleEdit = (coupon) => {
    setFormData({ code: coupon.code, discount: coupon.discount.toString() });
    setEditId(coupon._id);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this coupon?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="p-4">Loading coupons...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load coupons.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Coupon' : 'Add New Coupon'}</h2>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-sm">
        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount Percentage"
          value={formData.discount}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          min="1"
          max="100"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={addMutation.isLoading || updateMutation.isLoading}
        >
          {editId ? (updateMutation.isLoading ? 'Updating...' : 'Update Coupon') : (addMutation.isLoading ? 'Adding...' : 'Add Coupon')}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">All Coupons</h3>
      {coupons.length === 0 ? (
        <p>No coupons available.</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Code</th>
              <th className="border px-3 py-2">Discount %</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="hover:bg-gray-50">
                <td className="border px-3 py-1">{coupon.code}</td>
                <td className="border px-3 py-1">{coupon.discount}</td>
                <td className="border px-3 py-1 space-x-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon._id)}
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

export default ManageCoupons;

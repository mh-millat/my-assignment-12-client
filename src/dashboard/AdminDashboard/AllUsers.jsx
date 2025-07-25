// import { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import axiosSecure from '../../api/axiosSecure';

// const fetchUsers = async () => {
//   const res = await axiosSecure.get('/users');
//   return res.data;
// };

// const AllUsers = () => {
//   const queryClient = useQueryClient();
//   const [searchTerm, setSearchTerm] = useState('');

//   // ইউজার লিস্ট নিয়ে আসা
//   const { data: users = [], isLoading, isError } = useQuery(['users'], fetchUsers);

//   // ইউজার ডিলিট মিউটেশন
//   const deleteUserMutation = useMutation(
//     (userId) => axiosSecure.delete(`/users/${userId}`),
//     {
//       onSuccess: () => {
//         toast.success('User deleted successfully');
//         queryClient.invalidateQueries(['users']);
//       },
//       onError: () => {
//         toast.error('Failed to delete user');
//       },
//     }
//   );

//   // সার্চ ফিল্টার
//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (isLoading) return <p className="p-4">Loading users...</p>;
//   if (isError) return <p className="p-4 text-red-600">Failed to load users.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">All Users</h2>

//       <input
//         type="text"
//         placeholder="Search users by name..."
//         className="mb-4 px-3 py-2 border rounded w-full max-w-md"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {filteredUsers.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300 rounded overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left border-r">Name</th>
//               <th className="px-4 py-2 text-left border-r">Email</th>
//               <th className="px-4 py-2 text-left border-r">Role</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map(user => (
//               <tr key={user._id} className="hover:bg-gray-100">
//                 <td className="border-t border-r px-4 py-2">{user.name}</td>
//                 <td className="border-t border-r px-4 py-2">{user.email}</td>
//                 <td className="border-t border-r px-4 py-2">{user.role || 'User'}</td>
//                 <td className="border-t px-4 py-2">
//                   <button
//                     onClick={() => {
//                       if (window.confirm(`Are you sure to delete ${user.name}?`)) {
//                         deleteUserMutation.mutate(user._id);
//                       }
//                     }}
//                     disabled={deleteUserMutation.isLoading}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
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

// export default AllUsers;


// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import axiosSecure from '../../api/axiosSecure';

// const fetchUsers = async () => {
//   const res = await axiosSecure.get('/users');
//   return res.data;
// };

// const AllUsers = () => {
//   const queryClient = useQueryClient();
//   const [searchTerm, setSearchTerm] = useState('');

//   // v5 style useQuery with an object argument
//   const { data: users = [], isLoading, isError } = useQuery({
//     queryKey: ['users'],
//     queryFn: fetchUsers,
//   });

//   // v5 style useMutation with an object argument
//   const deleteUserMutation = useMutation({
//     mutationFn: (userId) => axiosSecure.delete(`/users/${userId}`),
//     onSuccess: () => {
//       toast.success('User deleted successfully');
//       // invalidateQueries with object argument
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//     },
//     onError: () => {
//       toast.error('Failed to delete user');
//     },
//   });

//   // Filter users by search term
//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (isLoading) return <p className="p-4">Loading users...</p>;
//   if (isError) return <p className="p-4 text-red-600">Failed to load users.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">All Users</h2>

//       <input
//         type="text"
//         placeholder="Search users by name..."
//         className="mb-4 px-3 py-2 border rounded w-full max-w-md"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {filteredUsers.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300 rounded overflow-hidden">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 text-left border-r">Name</th>
//               <th className="px-4 py-2 text-left border-r">Email</th>
//               <th className="px-4 py-2 text-left border-r">Role</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map(user => (
//               <tr key={user._id} className="hover:bg-gray-100">
//                 <td className="border-t border-r px-4 py-2">{user.name}</td>
//                 <td className="border-t border-r px-4 py-2">{user.email}</td>
//                 <td className="border-t border-r px-4 py-2">{user.role || 'User'}</td>
//                 <td className="border-t px-4 py-2">
//                   <button
//                     onClick={() => {
//                       if (window.confirm(`Are you sure to delete ${user.name}?`)) {
//                         deleteUserMutation.mutate(user._id);
//                       }
//                     }}
//                     disabled={deleteUserMutation.isLoading}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
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

// export default AllUsers;



// import React, { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import axiosSecure from '../../api/axiosSecure';

// const fetchUsers = async () => {
//   const res = await axiosSecure.get('/users');
//   return res.data;
// };

// const AllUsers = () => {
//   const queryClient = useQueryClient();
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch all users
//   const { data: users = [], isLoading, isError } = useQuery({
//     queryKey: ['users'],
//     queryFn: fetchUsers,
//   });

//   // Delete user
//   const deleteUserMutation = useMutation({
//     mutationFn: (userId) => axiosSecure.delete(`/users/${userId}`),
//     onSuccess: () => {
//       toast.success('User deleted successfully');
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//     },
//     onError: () => toast.error('Failed to delete user'),
//   });

//   // Update role
//   const updateRoleMutation = useMutation({
//     mutationFn: ({ id, role }) =>
//       axiosSecure.patch(`/users/${id}`, { role }),
//     onSuccess: () => {
//       toast.success('User role updated ✅');
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//     },
//     onError: () => toast.error('Failed to update role'),
//   });

//   // Filtered users
//   const filteredUsers = users.filter(user =>
//     user.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (isLoading) return <p className="p-4">Loading users...</p>;
//   if (isError) return <p className="p-4 text-red-600">Failed to load users.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">All Users</h2>

//       <input
//         type="text"
//         placeholder="Search users by name..."
//         className="mb-4 px-3 py-2 border rounded w-full max-w-md"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {filteredUsers.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table className="min-w-full border border-gray-300 rounded overflow-hidden text-sm">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               <th className="px-4 py-2 border">Role</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map(user => (
//               <tr key={user._id} className="hover:bg-gray-100">
//                 <td className="border px-4 py-2">{user.name || 'Unknown'}</td>
//                 <td className="border px-4 py-2">{user.email}</td>
//                 <td className="border px-4 py-2 capitalize">{user.role || 'user'}</td>
//                 <td className="border px-4 py-2 space-y-1">
//                   {/* Role Change Buttons */}
//                   <div className="flex flex-wrap gap-1">
//                     {user.role !== 'admin' && (
//                       <button
//                         onClick={() =>
//                           updateRoleMutation.mutate({ id: user._id, role: 'admin' })
//                         }
//                         className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700"
//                       >
//                         Make Admin
//                       </button>
//                     )}
//                     {user.role !== 'member' && (
//                       <button
//                         onClick={() =>
//                           updateRoleMutation.mutate({ id: user._id, role: 'member' })
//                         }
//                         className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700"
//                       >
//                         Make Member
//                       </button>
//                     )}
//                     {user.role !== 'user' && (
//                       <button
//                         onClick={() =>
//                           updateRoleMutation.mutate({ id: user._id, role: 'user' })
//                         }
//                         className="bg-gray-600 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
//                       >
//                         Make User
//                       </button>
//                     )}
//                   </div>

//                   {/* Delete Button */}
//                   <button
//                     onClick={() => {
//                       if (window.confirm(`Are you sure to delete ${user.name}?`)) {
//                         deleteUserMutation.mutate(user._id);
//                       }
//                     }}
//                     disabled={deleteUserMutation.isLoading}
//                     className="mt-1 bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
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

// export default AllUsers;


import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosSecure from '../../api/axiosSecure';

const fetchUsers = async () => {
  const res = await axiosSecure.get('/users');
  return res.data;
};

const AllUsers = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId) => axiosSecure.delete(`/users/${userId}`),
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => axiosSecure.patch(`/users/${id}`, { role }),
    onSuccess: () => {
      toast.success('Role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Failed to update role');
    },
  });

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p className="p-4">Loading users...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load users.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <input
        type="text"
        placeholder="Search users by name..."
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded overflow-hidden text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left border-r">Name</th>
              <th className="px-4 py-2 text-left border-r">Email</th>
              <th className="px-4 py-2 text-left border-r">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border-t border-r px-4 py-2">{user.name || 'Unnamed'}</td>
                <td className="border-t border-r px-4 py-2">{user.email}</td>
                <td className="border-t border-r px-4 py-2 capitalize">{user.role || 'User'}</td>
                <td className="border-t px-4 py-2 space-x-1 space-y-1 flex flex-wrap">
                  {/* Role Change Buttons */}
                  {user.role !== 'admin' && (
                    <button
                      onClick={() =>
                        updateRoleMutation.mutate({ id: user._id, role: 'admin' })
                      }
                      className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role !== 'member' && (
                    <button
                      onClick={() =>
                        updateRoleMutation.mutate({ id: user._id, role: 'member' })
                      }
                      className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Make Member
                    </button>
                  )}
                  {user.role !== 'user' && (
                    <button
                      onClick={() =>
                        updateRoleMutation.mutate({ id: user._id, role: 'user' })
                      }
                      className="bg-gray-600 text-white text-xs px-2 py-1 rounded hover:bg-gray-700"
                    >
                      Make User
                    </button>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure to delete ${user.name}?`)) {
                        deleteUserMutation.mutate(user._id);
                      }
                    }}
                    disabled={deleteUserMutation.isLoading}
                    className="bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
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

export default AllUsers;

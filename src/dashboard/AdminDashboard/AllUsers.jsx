import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosSecure from '../../api/axiosSecure';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

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
    onError: () => toast.error('Failed to delete user'),
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => axiosSecure.patch(`/users/${id}`, { role }),
    onSuccess: () => {
      toast.success('Role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => toast.error('Failed to update role'),
  });

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p className="p-4">Loading users...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load users.</p>;

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  // SweetAlert confirmation
  const handleRoleChange = (id, role, name) => {
    Swal.fire({
      title: 'Change Role?',
      text: `Do you want to make ${name || 'this user'} a ${role}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, make ${role}`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ id, role });
      }
    });
  };

  const handleDeleteUser = (id, name) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete ${name || 'this user'} permanently?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-800 flex items-center gap-2">
        👥 Manage All Users
      </h2>

      <input
        type="text"
        placeholder="Search users by name..."
        className="mb-6 px-4 py-2 border rounded w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <motion.div
          className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredUsers.map((user) => (
            <motion.div
              key={user._id}
              variants={cardVariants}
              transition={{ duration: 0.3 }}
              className="border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 bg-white"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <h3 className="font-semibold text-lg">{user.name || 'Unnamed'}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin'
                      ? 'bg-green-100 text-green-700'
                      : user.role === 'member'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {user.role || 'user'}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                {user.role !== 'admin' && (
                  <button
                    onClick={() => handleRoleChange(user._id, 'admin', user.name)}
                    className="bg-green-600 text-white text-sm py-1 rounded hover:bg-green-700 transition"
                  >
                    Make Admin
                  </button>
                )}
                {user.role !== 'member' && (
                  <button
                    onClick={() => handleRoleChange(user._id, 'member', user.name)}
                    className="bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700 transition"
                  >
                    Make Member
                  </button>
                )}
                {user.role !== 'user' && (
                  <button
                    onClick={() => handleRoleChange(user._id, 'user', user.name)}
                    className="bg-gray-600 text-white text-sm py-1 rounded hover:bg-gray-700 transition"
                  >
                    Make User
                  </button>
                )}

                <button
                  onClick={() => handleDeleteUser(user._id, user.name)}
                  disabled={deleteUserMutation.isLoading}
                  className="bg-red-600 text-white text-sm py-1 rounded hover:bg-red-700 disabled:opacity-50 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllUsers;



// import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import axiosSecure from '../../api/axiosSecure'


// const fetchUsers = async () => {
//   const res = await axiosSecure.get('/users')
//   return res.data
// }

// const ManageUsers = () => {
//   const [search, setSearch] = useState('')

//   const { data: users = [], isLoading, isError } = useQuery(['users'], fetchUsers)

//   const handleSearch = e => {
//     setSearch(e.target.value)
//   }

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(search.toLowerCase()) ||
//     user.email.toLowerCase().includes(search.toLowerCase()) ||
//     user.role.toLowerCase().includes(search.toLowerCase())
//   )

//   if (isLoading) return <p className="p-4">Loading users...</p>
//   if (isError) return <p className="p-4 text-red-600">Failed to load users.</p>

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

//       <input
//         type="text"
//         placeholder="Search by name, email or role..."
//         value={search}
//         onChange={handleSearch}
//         className="w-full border px-3 py-2 rounded mb-4"
//       />

//       {filteredUsers.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table className="w-full border text-left text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-3 py-2">Name</th>
//               <th className="border px-3 py-2">Email</th>
//               <th className="border px-3 py-2">Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map(({ _id, name, email, role }) => (
//               <tr key={_id} className="hover:bg-gray-50">
//                 <td className="border px-3 py-1">{name}</td>
//                 <td className="border px-3 py-1">{email}</td>
//                 <td className="border px-3 py-1 capitalize">{role}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }

// export default ManageUsers


// import { useState } from 'react'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import Swal from 'sweetalert2'
// import toast from 'react-hot-toast'
// import axiosSecure from '../../api/axiosSecure'

// const fetchUsers = async () => {
//   const res = await axiosSecure.get('/users')
//   return res.data
// }

// const ManageUsers = () => {
//   const queryClient = useQueryClient()

//   const [search, setSearch] = useState('')
//   const [editId, setEditId] = useState(null)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     role: '',
//   })

//   // Fetch users
//   const { data: users = [], isLoading, isError } = useQuery(['users'], fetchUsers)

//   // Delete mutation
//   const deleteMutation = useMutation(
//     (id) => axiosSecure.delete(`/users/${id}`),
//     {
//       onSuccess: () => {
//         toast.success('User deleted successfully ❌')
//         queryClient.invalidateQueries(['users'])
//       },
//       onError: () => toast.error('Failed to delete user'),
//     }
//   )

//   // Update mutation (for edit)
//   const updateMutation = useMutation(
//     ({ id, data }) => axiosSecure.patch(`/users/${id}`, data),
//     {
//       onSuccess: () => {
//         toast.success('User updated successfully ✅')
//         queryClient.invalidateQueries(['users'])
//         resetForm()
//       },
//       onError: () => toast.error('Failed to update user'),
//     }
//   )

//   const handleSearch = (e) => {
//     setSearch(e.target.value)
//   }

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(search.toLowerCase()) ||
//     user.email.toLowerCase().includes(search.toLowerCase()) ||
//     (user.role || '').toLowerCase().includes(search.toLowerCase())
//   )

//   // Handle input changes for edit form
//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   // Reset form state and edit mode
//   const resetForm = () => {
//     setFormData({ name: '', email: '', role: '' })
//     setEditId(null)
//   }

//   // Handle edit button click, populate form
//   const handleEdit = (user) => {
//     setFormData({
//       name: user.name,
//       email: user.email,
//       role: user.role || '',
//     })
//     setEditId(user._id)
//   }

//   // Handle update form submission
//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!formData.name || !formData.email || !formData.role) {
//       toast.error('Please fill all fields')
//       return
//     }

//     updateMutation.mutate({
//       id: editId,
//       data: {
//         name: formData.name,
//         email: formData.email,
//         role: formData.role.toLowerCase(),
//       },
//     })
//   }

//   // Handle delete confirmation
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'This user will be deleted permanently!',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         deleteMutation.mutate(id)
//       }
//     })
//   }

//   if (isLoading) return <p className="p-4">Loading users...</p>
//   if (isError) return <p className="p-4 text-red-600">Failed to load users.</p>

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

//       {/* Search input */}
//       <input
//         type="text"
//         placeholder="Search by name, email or role..."
//         value={search}
//         onChange={handleSearch}
//         className="w-full border px-3 py-2 rounded mb-4"
//       />

//       {/* Edit form */}
//       {editId && (
//         <form onSubmit={handleSubmit} className="mb-6 max-w-md space-y-4 border p-4 rounded shadow">
//           <h3 className="text-xl font-semibold mb-2">Edit User</h3>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           >
//             <option value="">Select Role</option>
//             <option value="admin">Admin</option>
//             <option value="member">Member</option>
//             <option value="user">User</option>
//           </select>

//           <div className="flex space-x-2">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               disabled={updateMutation.isLoading}
//             >
//               {updateMutation.isLoading ? 'Updating...' : 'Update User'}
//             </button>
//             <button
//               type="button"
//               onClick={resetForm}
//               className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//               disabled={updateMutation.isLoading}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Users table */}
//       {filteredUsers.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <table className="w-full border text-left text-sm">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-3 py-2">Name</th>
//               <th className="border px-3 py-2">Email</th>
//               <th className="border px-3 py-2">Role</th>
//               <th className="border px-3 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map(({ _id, name, email, role }) => (
//               <tr key={_id} className="hover:bg-gray-50">
//                 <td className="border px-3 py-1">{name}</td>
//                 <td className="border px-3 py-1">{email}</td>
//                 <td className="border px-3 py-1 capitalize">{role}</td>
//                 <td className="border px-3 py-1 space-x-2">
//                   <button
//                     onClick={() => handleEdit({ _id, name, email, role })}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(_id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                     disabled={deleteMutation.isLoading}
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
//   )
// }

// export default ManageUsers


import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import axiosSecure from '../../api/axiosSecure'

const fetchUsers = async () => {
  const res = await axiosSecure.get('/users')
  return res.data
}

const ManageUsers = () => {
  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  })

  // Fetch users
  const { data: users = [], isLoading, isError } = useQuery(['users'], fetchUsers)

  // Delete mutation
  const deleteMutation = useMutation(
    (id) => axiosSecure.delete(`/users/${id}`),
    {
      onSuccess: () => {
        toast.success('User deleted successfully ❌')
        queryClient.invalidateQueries(['users'])
      },
      onError: () => toast.error('Failed to delete user'),
    }
  )

  // Update mutation (for edit or role change)
  const updateMutation = useMutation(
    ({ id, data }) => axiosSecure.patch(`/users/${id}`, data),
    {
      onSuccess: () => {
        toast.success('User updated successfully ✅')
        queryClient.invalidateQueries(['users'])
        resetForm()
      },
      onError: () => toast.error('Failed to update user'),
    }
  )

  const handleSearch = (e) => setSearch(e.target.value)

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    (user.role || '').toLowerCase().includes(search.toLowerCase())
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', role: '' })
    setEditId(null)
  }

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role || '',
    })
    setEditId(user._id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.role) {
      toast.error('Please fill all fields')
      return
    }

    updateMutation.mutate({
      id: editId,
      data: {
        name: formData.name,
        email: formData.email,
        role: formData.role.toLowerCase(),
      },
    })
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id)
      }
    })
  }

  if (isLoading) return <p className="p-4">Loading users...</p>
  if (isError) return <p className="p-4 text-red-600">Failed to load users.</p>

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name, email or role..."
        value={search}
        onChange={handleSearch}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      {/* Edit form */}
      {editId && (
        <form onSubmit={handleSubmit} className="mb-6 max-w-md space-y-4 border p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Edit User</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="user">User</option>
          </select>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? 'Updating...' : 'Update User'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              disabled={updateMutation.isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Users table */}
      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Role</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(({ _id, name, email, role }) => (
              <tr key={_id} className="hover:bg-gray-50">
                <td className="border px-3 py-1">{name}</td>
                <td className="border px-3 py-1">{email}</td>

                {/* ROLE WITH BUTTONS */}
                <td className="border px-3 py-1 capitalize">
                  {role}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {role !== 'admin' && (
                      <button
                        onClick={() =>
                          updateMutation.mutate({ id: _id, data: { role: 'admin' } })
                        }
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                      >
                        Make Admin
                      </button>
                    )}
                    {role !== 'member' && (
                      <button
                        onClick={() =>
                          updateMutation.mutate({ id: _id, data: { role: 'member' } })
                        }
                        className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        Make Member
                      </button>
                    )}
                    {role !== 'user' && (
                      <button
                        onClick={() =>
                          updateMutation.mutate({ id: _id, data: { role: 'user' } })
                        }
                        className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
                      >
                        Make User
                      </button>
                    )}
                  </div>
                </td>

                <td className="border px-3 py-1 space-x-2">
                  <button
                    onClick={() => handleEdit({ _id, name, email, role })}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    disabled={deleteMutation.isLoading}
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
  )
}

export default ManageUsers

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import axiosSecure from '../../api/axiosSecure'

const ManageMembers = () => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/members')
      return res.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/members/${id}`),
    onSuccess: () => {
      toast.success('Member deleted ❌')
      queryClient.invalidateQueries({ queryKey: ['members'] })
    },
    onError: () => toast.error('Failed to delete member'),
  })

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This member will be removed permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id)
      }
    })
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <p className="p-4 text-center">Loading members...</p>
  if (isError) return <p className="p-4 text-center text-red-600">Failed to load members.</p>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Members</h2>

      <input
        type="text"
        placeholder="Search member by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-6 w-full border px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredMembers.length === 0 ? (
        <p className="text-center text-gray-500">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(({ _id, name, email, joinDate }) => (
            <motion.div
              key={_id}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 flex flex-col justify-between"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-1">{name}</h3>
                <p className="text-gray-600 mb-1">{email}</p>
                <p className="text-gray-500 text-sm">
                  Joined: {new Date(joinDate).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => handleDelete(_id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ManageMembers

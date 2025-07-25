import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import axiosSecure from '../../api/axiosSecure'

const ManageMembers = () => {
  const queryClient = useQueryClient()
  const [searchTerm, setSearchTerm] = useState('')

  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('/members')
      return res.data
    }
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

  if (isLoading) return <p className="p-4">Loading members...</p>
  if (isError) return <p className="p-4 text-red-600">Failed to load members.</p>

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

      <input
        type="text"
        placeholder="Search member by name..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 w-full border px-3 py-2 rounded"
      />

      {filteredMembers.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table className="w-full border text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">Join Date</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(({ _id, name, email, joinDate }) => (
              <tr key={_id} className="hover:bg-gray-50">
                <td className="border px-3 py-1">{name}</td>
                <td className="border px-3 py-1">{email}</td>
                <td className="border px-3 py-1">
                  {new Date(joinDate).toLocaleDateString()}
                </td>
                <td className="border px-3 py-1">
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
  )
}

export default ManageMembers

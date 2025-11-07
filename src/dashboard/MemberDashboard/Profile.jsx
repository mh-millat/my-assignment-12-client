import { useAuth } from '../../contexts/AuthContext'
import Swal from 'sweetalert2'
import { motion } from 'framer-motion'

const Profile = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center text-red-600">
        <p>User not logged in.</p>
      </div>
    )
  }

  const membershipSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : 'N/A'

  const handleEditProfile = () => {
    Swal.fire({
      title: '😂 Haha!',
      text: 'You thought you could edit your profile? Maybe later, champ!',
      icon: 'info',
      confirmButtonText: 'Okay 😎',
      background: '#f0f9ff',
      confirmButtonColor: '#2563eb',
    })
  }

  return (
    <motion.div
      className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg mt-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl font-extrabold mb-6 text-blue-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        👤 My Profile
      </motion.h2>

      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img
          src={user.photoURL || 'https://via.placeholder.com/80'}
          alt={user.displayName ? `${user.displayName}'s profile photo` : 'User profile photo'}
          className="w-28 h-28 rounded-full border-4 border-blue-200 shadow-sm"
        />
        <div className="text-left mt-4 w-full space-y-1">
          <p><span className="font-semibold text-gray-700">Name:</span> {user.displayName || 'N/A'}</p>
          <p><span className="font-semibold text-gray-700">Email:</span> {user.email || 'N/A'}</p>
          <p><span className="font-semibold text-gray-700">Membership Since:</span> {membershipSince}</p>
        </div>

        <motion.button
          onClick={handleEditProfile}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
        >
          ✏️ Edit Profile Info
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default Profile
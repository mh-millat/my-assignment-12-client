




import { useAuth } from '../../contexts/AuthContext'

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

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">👤 My Profile</h2>
      <div className="flex flex-col items-center gap-2">
        <img
          src={user.photoURL || 'https://via.placeholder.com/80'}
          alt={user.displayName ? `${user.displayName}'s profile photo` : 'User profile photo'}
          className="w-24 h-24 rounded-full border"
        />
        <div className="text-left mt-4 w-full">
          <p><span className="font-semibold">Name:</span> {user.displayName || 'N/A'}</p>
          <p><span className="font-semibold">Email:</span> {user.email || 'N/A'}</p>
          <p><span className="font-semibold">Membership Since:</span> {membershipSince}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile

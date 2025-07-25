


// import { useAuth } from '../../contexts/AuthContext'

// const Profile = () => {
//     const { user } = useAuth()

//     if (!user) {
//         return <p className="text-red-500">User not found or not logged in.</p>
//     }

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">My Profile</h2>
//             <img
//                 src={user.photoURL || '/default-avatar.jpg'}
//                 alt="User"
//                 className="w-20 h-20 rounded-full"
//             />
//             <p className="mt-2">Name: {user.name || 'N/A'}</p>
//             <p>Email: {user.email || 'N/A'}</p>
//             <p>Registration Date: Jan 01, 2025 (static now)</p>
//         </div>
//     )
// }

// export default Profile


// import { useAuth } from '../../contexts/AuthContext'

// const Profile = () => {
//   const { user } = useAuth()

//   if (!user) {
//     return (
//       <p className="text-center text-red-500 mt-10">
//         User not found or not logged in.
//       </p>
//     )
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10 text-center">
//       <h2 className="text-2xl font-bold mb-6">👤 My Profile</h2>
//       <img
//         src={user.photoURL || '/default-avatar.jpg'}
//         alt="User Profile"
//         className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300"
//       />
//       <p className="mt-4 text-lg font-semibold">{user.displayName || 'N/A'}</p>
//       <p className="text-gray-600">{user.email || 'N/A'}</p>
//       <p className="mt-3 text-sm text-gray-500">Registration Date: Jan 01, 2025</p>
//     </div>
//   )
// }

// export default Profile




import { useAuth } from '../../contexts/AuthContext'

const Profile = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-10">
        User not found or not logged in.
      </p>
    )
  }

  const registrationDate = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A'

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10 text-center">
      <h2 className="text-2xl font-bold mb-6">👤 My Profile</h2>
      <img
        src={user.photoURL || '/default-avatar.jpg'}
        alt="User Profile"
        className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300"
      />
      <p className="mt-4 text-lg font-semibold">{user.displayName || 'N/A'}</p>
      <p className="text-gray-600">{user.email || 'N/A'}</p>
      <p className="mt-3 text-sm text-gray-500">Registration Date: {registrationDate}</p>
    </div>
  )
}

export default Profile

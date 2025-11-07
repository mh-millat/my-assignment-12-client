import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const handleEditClick = () => {
    Swal.fire({
      title: "😂 Oops!",
      text: "Edit option ekhono under construction! 🔧",
      icon: "info",
      confirmButtonText: "Ok, thik ase!",
      background: "#fefefe",
      confirmButtonColor: "#2563eb",
    });
  };

  if (!user) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen text-red-500 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg font-semibold">User not found or not logged in.</p>
      </motion.div>
    );
  }

  const registrationDate = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-50"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center justify-center gap-2">
          👤 My Profile
        </h2>

        <motion.img
          src={user.photoURL || "/default-avatar.jpg"}
          alt="User Profile"
          className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300 shadow-sm object-cover"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="mt-4 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg font-semibold">{user.displayName || "N/A"}</p>
          <p className="text-gray-600">{user.email || "N/A"}</p>
          <p className="text-sm text-gray-500">
            Registration Date: {registrationDate}
          </p>
        </motion.div>

        <motion.button
          onClick={handleEditClick}
          className="mt-5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✏️ Edit Profile
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Profile;

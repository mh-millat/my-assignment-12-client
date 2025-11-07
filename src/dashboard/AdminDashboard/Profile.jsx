import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const handleEditClick = () => {
    Swal.fire({
      title: "😂 Oops!",
      text: "Bujhte parli na! Edit option ekhono under construction! 🔧",
      icon: "info",
      confirmButtonText: "Ok, thik ase!",
      background: "#fefefe",
      confirmButtonColor: "#2563eb",
    });
  };

  if (!user) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen text-red-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>User not logged in.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="p-6 w-full max-w-xl bg-white shadow-lg rounded-2xl border border-gray-200"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
          👤 Admin Profile
        </h2>

        <div className="flex flex-col items-center space-y-5">
          <motion.img
            src={user.photoURL || "/default-profile.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-200 shadow-md object-cover"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />

          <motion.div
            className="text-lg text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>
              <strong>Name:</strong>{" "}
              <span className="text-gray-700">
                {user.displayName || "Not set"}
              </span>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <span className="text-gray-700">{user.email}</span>
            </p>
          </motion.div>

          <motion.button
            onClick={handleEditClick}
            className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✏️ Edit Profile Info
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;

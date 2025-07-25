


import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center text-red-600">
        <p>User not logged in.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin Profile</h2>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={user.photoURL || "/default-profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border border-gray-300 object-cover"
        />

        <div className="text-lg">
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
        </div>
      </div>
    </div>
  );
};

export default Profile;

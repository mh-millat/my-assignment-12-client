import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useRegisterUser from "../hooks/useRegisterUser";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { mutate: saveUser } = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  // 🧾 Register via Email & Password
  const onSubmit = async ({ name, photoURL, email, password }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name, photoURL });

      saveUser({
        name,
        email,
        photoURL,
        role: "user",
        registeredAt: new Date(),
      });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register user!");
    }
  };

  // 🔵 Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      saveUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user",
        registeredAt: new Date(),
      });

      toast.success("Google Sign-In successful!");
      navigate("/login");
    } catch (error) {
      console.error("Google Sign-In error:", error);
      toast.error("Google Sign-In failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="p-8 w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-wide mb-4">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Full Name"
            required
            className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            {...register("photoURL", { required: true })}
            type="text"
            placeholder="Photo URL"
            required
            className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Email"
            required
            className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <div className="relative">
            <input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-12"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
            >
              {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-md shadow-md hover:from-indigo-600 hover:to-blue-500 transition duration-300 ease-in-out active:scale-95"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-500 mb-2">Or register with</p>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 justify-center w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition text-gray-700"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Register;

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
import { useNavigate } from "react-router-dom";
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
      navigate("/");
    } catch (error) {
      toast.error("Failed to register user!");
      console.error(error);
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
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In error:", error);
      toast.error("Google Sign-In failed!");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-200 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 tracking-wide">
        Register
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <input
          {...register("name", { required: true })}
          placeholder="Full Name"
          className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          {...register("photoURL", { required: true })}
          placeholder="Photo URL"
          className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="relative">
          <input
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12"
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

      {/* 🔵 Google Sign In Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center gap-2 justify-center w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          <span>Continue with Google</span>
        </button>
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

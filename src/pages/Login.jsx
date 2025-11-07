import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { app } from "../firebase.config";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const auth = getAuth(app);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  // 🔑 Firebase ID Token দিয়ে backend role fetch
  const saveTokenAndRedirect = async (user) => {
    try {
      // 1️⃣ Firebase ID Token
      const token = await user.getIdToken();
      localStorage.setItem("access-token", token);

      // 2️⃣ Role fetch (Authorization header সহ)
      const roleRes = await axios.get(
        `https://my-assignment-12-server-kappa.vercel.app/users/role/${user.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const role = roleRes.data?.role;
      if (role === "admin") navigate("/admin", { replace: true });
      else if (role === "member") navigate("/member", { replace: true });
      else navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Token/Role fetch error:", err);
      toast.error("Login failed! Try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await saveTokenAndRedirect(user);
      toast.success("Logged in with Google!");
    } catch (error) {
      console.error(error);
      toast.error("Google Login failed!");
    }
  };

  const onSubmit = async ({ email, password }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await saveTokenAndRedirect(user);
      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error("Login failed! Check credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="p-8 w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 tracking-wide mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            required
            className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <div className="relative">
            <input
              {...register("password")}
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
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-500 mb-2">Or login with</p>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 justify-center w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition text-gray-700"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

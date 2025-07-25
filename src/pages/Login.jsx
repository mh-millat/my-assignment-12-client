import { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { app } from "../firebase.config";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const auth = getAuth(app);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async ({ email, password }) => {
    try {
      // ✅ Firebase Login
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");

      // ✅ Get JWT Token from Backend
      const jwtRes = await axios.post("http://localhost:5000/jwt", { email });
      const token = jwtRes.data.token;
      localStorage.setItem("access-token", token);

      // ✅ Get Role from Backend
      const roleRes = await axios.get(`http://localhost:5000/users/role/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const role = roleRes.data?.role;

      // ✅ Redirect based on Role
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "member") {
        navigate("/member", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed! Check credentials.");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg border border-gray-200
      animate-fadeIn
      ">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 tracking-wide">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          required
          className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="input input-bordered w-full px-4 py-3 rounded-md border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-400 transition pr-12"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary bg-gradient-to-r from-blue-500 to-indigo-600
          text-white font-semibold py-3 rounded-md shadow-md hover:from-indigo-600 hover:to-blue-500
          transition duration-300 ease-in-out
          active:scale-95
          "
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-gray-600 text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
          Register here
        </Link>
      </p>

      {/* Animation keyframes */}
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

export default Login;

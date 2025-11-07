import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import image1 from "../assets/Banner-1.jpg";
import image2 from "../assets/Banner-2.jpg";

const images = [image1, image2];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const primary = "#1E40AF";

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinClick = () => {
    navigate("/courts");
  };

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] md:h-[580px] overflow-hidden rounded-2xl mt-10 group">
      {/*Background Image Slider */}
      <img
        src={images[index]}
        alt="Sports Club Banner"
        className="w-full h-full object-cover transition-all duration-[1500ms] ease-in-out scale-105 group-hover:scale-110"
      />

      {/* Black Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/45"></div>

      {/*Centered Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl max-w-2xl animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-snug mb-4">
            Push Your <span className="text-[#1E40AF]">Limits</span>.<br />
            Play With <span className="text-[#1E40AF]">Passion</span>.
          </h1>

          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
            Join a thriving sports community — stay active, sharpen your skills,
            and experience the thrill of competition with like-minded players.
          </p>

          {/* Call-to-Action Button */}
          <button
            onClick={handleJoinClick}
            className="relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white rounded-full overflow-hidden shadow-lg group transition-all duration-300"
            style={{ backgroundColor: primary }}
          >
            <span className="relative z-10">Join Now</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>

      {/* Fade + Slide Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Banner;

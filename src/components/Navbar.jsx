// import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets";

// const Navbar = () => {

//   const navigate = useNavigate()

//   return (
//     <>
//       <div className="w-full flex items-center justify-between font-semibold">
//         <div className="flex items-center gap-2">
//           <img onClick={() => navigate(-1)}
//             className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
//             src={assets.arrow_left}
//             alt=""
//           />
//           <img onClick={() => navigate(1)}
//             className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
//             src={assets.arrow_right}
//             alt=""
//           />
//         </div>
//         <div className="flex items-center gap-4">
//           <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
//             Explore Premium
//           </p>
//           <p className="bg-black px-3 py-1 rounded-2xl text-[15px] cursor-pointer">
//             Install App
//           </p>
//           <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
//             A
//           </p>
//         </div>
//       </div>
//       <div className="flex items-center gap-2 mt-4">
//         <p className="bg-white text-black py-1 px-4 rounded-2xl cursor-pointer">
//           All
//         </p>
//         <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
//         <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">
//           Podcasts
//         </p>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Music", "Podcasts", "Albums", "Live"];

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="w-full flex items-center justify-between">
        
        {/* Left Side: Navigation Arrows & Mobile Toggle */}
        <div className="flex items-center gap-2">
          
          {/* FIXED PLACE: Mobile Menu Toggle Button shifted to the left side 
              Ab mobile size par arrows ke saath standard modern toggle bar dikhega */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden w-10 h-10 bg-white/10 hover:bg-white/20 active:scale-95 rounded-full flex items-center justify-center transition-all"
          >
            <span className="text-white font-bold text-xl leading-none">☰</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="group w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200"
          >
            <img
              className="w-5 group-hover:-translate-x-0.5 transition-transform"
              src={assets.arrow_left}
              alt="Back"
            />
          </button>
          
          <button
            onClick={() => navigate(1)}
            className="group w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200"
          >
            <img
              className="w-5 group-hover:translate-x-0.5 transition-transform"
              src={assets.arrow_right}
              alt="Forward"
            />
          </button>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Explore Premium - Desktop Only */}
          <button className="hidden md:block bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform cursor-pointer">
            Explore Premium
          </button>

          {/* Install App */}
          <button className="hidden sm:flex items-center gap-2 bg-black/40 hover:bg-black/60 px-3 py-2 rounded-full transition cursor-pointer group">
            <img className="w-4 invert" src={assets.download_icon || assets.arrow_icon} alt="Download" />
            <span className="text-[13px] font-medium hidden md:inline">
              Install App
            </span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-full p-0.5 transition">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 mt-4 overflow-x-auto scrollbar-hide">
        {filters.map((filter, index) => (
          <button
            key={filter || index}
            onClick={() => setActiveFilter(filter)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200
              ${
                activeFilter === filter
                  ? "bg-white text-black scale-105"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>
    </>
  );
};

export default Navbar;
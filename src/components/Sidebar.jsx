import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const SideBar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  const menuItems = [
    { id: "home", icon: assets.home_icon, label: "Home", path: "/" },
    {
      id: "search",
      icon: assets.search_icon,
      label: "Search",
      path: "/search",
    },
  ];

  const handleMenuClick = (item) => {
    setActiveTab(item.id);
    if (item.path) navigate(item.path);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:relative top-0 bottom-0 z-50 transition-all duration-300 ease-in-out
          ${isOpen ? "left-0" : "-left-full lg:left-0"}
          lg:translate-x-0 h-full p-3 flex flex-col gap-3
          bg-[#000000] lg:bg-linear-to-b lg:from-[#1a1a2e] lg:via-[#16213e] lg:to-[#0f0f23]
          w-70 shrink-0
        `}
      >
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="w-10 h-10 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-black">S</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Spotify
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden ml-auto text-white hover:text-green-400 transition"
          >
            <img className="w-6" src={assets.arrow_icon} alt="Close" />
          </button>
        </div>

        <div className="bg-[#121212]/80 backdrop-blur-lg rounded-2xl flex flex-col justify-center px-2 py-2 shrink-0">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer
                transition-all duration-200 group
                ${
                  activeTab === item.id
                    ? "bg-white/10 text-green-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <img
                className={`w-6 transition-transform duration-200 group-hover:scale-110 ${
                  activeTab === item.id ? "scale-110" : ""
                }`}
                src={item.icon}
                alt={item.label}
              />
              <p className="font-semibold text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#121212]/80 backdrop-blur-lg flex-1 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 group cursor-pointer">
              <img
                className="w-6 transform transition-transform duration-200 group-hover:scale-110"
                src={assets.stack_icon}
                alt=""
              />
              <p className="font-semibold text-white/90">Your Library</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-white/10 transition">
                <img className="w-4" src={assets.plus_icon} alt="" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition hidden sm:block">
                <img className="w-4" src={assets.arrow_icon} alt="" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-3 custom-scrollbar">
            <div className="p-4 bg-linear-to-br from-purple-600/30 to-blue-600/30 rounded-xl border border-white/5">
              <h2 className="text-white font-semibold text-base mb-1">
                Create your first playlist
              </h2>
              <p className="text-white/60 text-sm mb-3">
                It's easy, we'll help you
              </p>
              <button className="px-4 py-1.5 bg-white text-[14px] text-black font-semibold rounded-full hover:scale-105 transition-transform">
                Create Playlist
              </button>
            </div>

            <div className="p-4 bg-linear-to-br from-orange-500/20 to-pink-500/20 rounded-xl border border-white/5">
              <h2 className="text-white font-semibold text-base mb-1">
                Let's find some podcasts
              </h2>
              <p className="text-white/60 text-sm mb-3">
                We'll keep you updated on new episodes
              </p>
              <button className="px-4 py-1.5 bg-white text-[14px] text-black font-semibold rounded-full hover:scale-105 transition-transform">
                Browse Podcasts
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider px-2 py-2">
                Recent Playlists
              </p>
              {[
                "Top Hits 2024",
                "Chill Vibes",
                "Bollywood Hits",
                "Workout Mix",
                "Late Night Jazz",
              ].map((playlist, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/5 transition group"
                >
                  <div className="w-10 h-10 bg-linear-to-br from-gray-700 to-gray-600 rounded flex items-center justify-center shrink-0">
                    <span className="text-lg">🎵</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate group-hover:text-green-400 transition">
                      {playlist}
                    </p>
                    <p className="text-white/50 text-xs">Playlist • 24 songs</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 flex flex-wrap gap-3 text-xs text-white/50 shrink-0">
          <a href="#" className="hover:text-white transition">
            Legal
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Center
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Cookies
          </a>
        </div>
      </div>
    </>
  );
};

export default SideBar;

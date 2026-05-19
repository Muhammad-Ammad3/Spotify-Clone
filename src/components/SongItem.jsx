// import { useContext } from "react";
// import { PlayerContext } from "../context/PlayerContext";

// const SongItem = ({ image, name, desc, id }) => {

//   const {playWithId} = useContext(PlayerContext)

//   return (
//     <div onClick={() => playWithId(id)} className="min-w-45 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
//       <img className="rounded" src={image} alt="" />
//       <p className="font-bold mt-2 mb-1">{name}</p>
//       <p className="text-slate-200 text-sm">{desc}</p>
//     </div>
//   )
// }

// export default SongItem

import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const SongItem = ({ image, name, desc, id }) => {
  // FIXED: Changed currentTrack to track to match the variable used in PlayerContext across your app
  const { playWithId, playStatus, track } = useContext(PlayerContext);

  // FIXED: Adjusted safety checks to scan track ID instead of non-existent currentTrack reference
  const isCurrentPlaying = track?.id === id;

  return (
    <div
      onClick={() => playWithId(id)}
      className="group relative p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5"
    >
      {/* Image Container with Play Button Overlay */}
      <div className="relative mb-3 overflow-hidden rounded-lg">
        {/* Album Art */}
        <img
          className={`w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110 ${
            isCurrentPlaying ? "scale-105" : ""
          }`}
          src={image}
          alt={name}
        />
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button - Shows on Hover */}
        <button
          onClick={(e) => {
            // FIXED: Prevents click from bubbling up to the parent div and restarting the track from 0%
            e.stopPropagation();
            playWithId(id);
          }}
          className={`
            absolute bottom-2 right-2 w-12 h-12 
            bg-green-500 rounded-full 
            flex items-center justify-center
            shadow-lg shadow-black/50
            opacity-0 translate-y-4
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300
            hover:scale-110 hover:bg-green-400
            z-20
            ${isCurrentPlaying ? "opacity-100 translate-y-0" : ""}
          `}
        >
          <img
            className="w-5 ml-0.5"
            src={isCurrentPlaying && playStatus ? assets.pause_icon : assets.play_icon}
            alt={isCurrentPlaying && playStatus ? "Pause" : "Play"}
          />
        </button>

        {/* Now Playing Indicator */}
        {isCurrentPlaying && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-green-500 rounded-full z-10">
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-black">PLAYING</span>
          </div>
        )}
      </div>

      {/* Song Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-white font-semibold text-sm truncate group-hover:text-green-400 transition-colors">
          {name}
        </h3>
        <p className="text-white/50 text-xs line-clamp-2">
          {desc}
        </p>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/10 pointer-events-none transition-colors" />
    </div>
  );
};

export default SongItem;
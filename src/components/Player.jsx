// import { useContext } from "react";
// import { assets } from "../assets/assets";
// import { PlayerContext } from "../context/PlayerContext";

// const Player = () => {
//   const { track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong } =
//     useContext(PlayerContext);

//   return (
//     <div className="h-[10%] bg-black flex justify-between items-center px-4 text-white">
//       <div className="hidden lg:flex items-center gap-4">
//         <img className="w-12" src={track.image} alt="" />
//         <div className="">
//           <p>{track.name}</p>
//           <p>{track.desc.slice(0, 12)}</p>
//         </div>
//       </div>
//       <div className="flex flex-col items-center gap-1 m-auto">
//         <div className="flex gap-4">
//           <img
//             className="w-4 cursor-pointer"
//             src={assets.shuffle_icon}
//             alt=""
//           />
//           <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
//           {playStatus ? (
//             <img
//               onClick={pause}
//               className="w-4 cursor-pointer"
//               src={assets.pause_icon}
//               alt=""
//             />
//           ) : (
//             <img
//               onClick={play}
//               className="w-4 cursor-pointer"
//               src={assets.play_icon}
//               alt=""
//             />
//           )}
//           <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
//           <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
//         </div>
//         <div className="flex items-center gap-5">
//           <p>
//             {time.currentTime.minute}:{time.currentTime.second}
//           </p>
//           <div
//             ref={seekBg} onClick={seekSong}
//             className="w-[60vw] max-w-125 bg-gray-300 rounded-full cursor-pointer"
//           >
//             <hr
//               ref={seekBar}
//               className="h-1 border-none w-0 bg-green-800 rounded-full"
//             />
//           </div>
//           <p>
//             {time.totalTime.minute}:{time.totalTime.second}
//           </p>
//         </div>
//       </div>
//       <div className="hidden lg:flex items-center gap-2 opacity-75">
//         <img className="w-4" src={assets.plays_icon} alt="" />
//         <img className="w-4" src={assets.mic_icon} alt="" />
//         <img className="w-4" src={assets.queue_icon} alt="" />
//         <img className="w-4" src={assets.speaker_icon} alt="" />
//         <img className="w-4" src={assets.volume_icon} alt="" />
//         <div className="w-20 bg-slate-50 h-1 rounded"></div>
//         <img className="w-4" src={assets.mini_player_icon} alt="" />
//         <img className="w-4" src={assets.zoom_icon} alt="" />
//       </div>
//     </div>
//   );
// };

// export default Player;

import { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#1a1a2e] via-[#121212] to-black border-t border-white/10">
      {/* Main Player Container */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2">
        
        {/* LEFT: Track Info */}
        <div className="flex items-center gap-3 w-[30%] min-w-[180px]">
          {track.image ? (
            <img
              className="w-12 h-12 rounded-md object-cover animate-spin-slow"
              src={track.image}
              alt={track.name}
            />
          ) : (
            <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
          )}
          <div className="hidden sm:block overflow-hidden">
            <p className="text-white text-sm font-medium truncate">
              {track.name || "No track playing"}
            </p>
            <p className="text-white/50 text-xs truncate">
              {track.desc?.slice(0, 20) || "Select a song"}
            </p>
          </div>
          {/* Like button */}
          <button className="hidden md:block opacity-0 md:opacity-100 hover:text-green-400 transition">
            <img className="w-4" src={assets.heart_icon} alt="" />
          </button>
        </div>

        {/* CENTER: Player Controls */}
        <div className="flex flex-col items-center gap-1 w-[40%] max-w-[600px]">
          {/* Control Buttons */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Shuffle */}
            <button className="hidden md:block opacity-50 hover:opacity-100 hover:text-white transition">
              <img className="w-4" src={assets.shuffle_icon} alt="" />
            </button>
            
            {/* Previous */}
            <button
              onClick={previous}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <img className="w-4" src={assets.prev_icon} alt="Previous" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={playStatus ? pause : play}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              <img
                className="w-5"
                src={playStatus ? assets.pause_icon : assets.play_icon}
                alt={playStatus ? "Pause" : "Play"}
              />
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <img className="w-4" src={assets.next_icon} alt="Next" />
            </button>

            {/* Loop */}
            <button className="hidden md:block opacity-50 hover:opacity-100 hover:text-white transition">
              <img className="w-4" src={assets.loop_icon} alt="" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-2">
            {/* FIXED: Formatted text tracking to treat 0 as number instead of fallback string */}
            <span className="text-xs text-white/50 w-8 text-right">
              {time.currentTime.minute ?? 0}:{String(time.currentTime.second ?? 0).padStart(2, '0')}
            </span>
            
            <div
              ref={seekBg}
              onClick={seekSong}
              className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer group relative"
            >
              <div
                ref={seekBar}
                className="h-full bg-green-500 rounded-full relative group-hover:bg-green-400"
                style={{ width: "0%" }}
              >
                {/* Hover indicator */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition scale-0 group-hover:scale-100" />
              </div>
            </div>
            
            {/* FIXED: Used Nullish Coalescing Operator (??) for strict number parsing */}
            <span className="text-xs text-white/50 w-8">
              {time.totalTime.minute ?? 0}:{String(time.totalTime.second ?? 0).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* RIGHT: Volume Controls */}
        <div className="flex items-center justify-end gap-2 w-[30%] min-w-[120px]">
          <button className="hidden md:block opacity-50 hover:opacity-100 transition">
            <img className="w-4" src={assets.lyrics_icon} alt="" />
          </button>
          <button className="hidden md:block opacity-50 hover:opacity-100 transition">
            <img className="w-4" src={assets.queue_icon} alt="" />
          </button>
          
          {/* Volume Slider */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="opacity-50 hover:opacity-100 transition">
              <img className="w-4" src={assets.volume_icon} alt="" />
            </button>
            <div className="w-20 h-1 bg-white/20 rounded-full cursor-pointer">
              <div
                className="h-full bg-white/70 rounded-full"
                style={{ width: "70%" }}
              />
            </div>
          </div>

          {/* Now Playing (Mobile) */}
          <button className="lg:hidden w-8 h-8 flex items-center justify-center">
            <img className="w-4" src={assets.queue_icon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
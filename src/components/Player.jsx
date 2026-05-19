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
    volume,
    changeVolume,
  } = useContext(PlayerContext);

  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 bg-linear-to-t from-[#1a1a2e] via-[#121212] to-black border-t border-white/10">
      <div className="flex items-center justify-between px-3 md:px-4 py-2">
        <div className="flex items-center gap-3 w-[30%] min-w-45">
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
          <button className="hidden md:block opacity-0 md:opacity-100 hover:text-green-400 transition">
            <img className="w-4" src={assets.heart_icon} alt="" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-1 w-[40%] max-w-150">
          <div className="flex items-center gap-3 md:gap-4">
            <button className="hidden md:block opacity-50 hover:opacity-100 hover:text-white transition">
              <img className="w-4" src={assets.shuffle_icon} alt="" />
            </button>

            <button
              onClick={previous}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <img className="w-4" src={assets.prev_icon} alt="Previous" />
            </button>

            <button
              onClick={playStatus ? pause : play}
              className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              <img
                className="w-5"
                src={playStatus ? assets.pause_icon : assets.play_icon}
                alt={playStatus ? "Pause" : "Play"}
              />
            </button>

            <button
              onClick={next}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <img className="w-4" src={assets.next_icon} alt="Next" />
            </button>

            <button className="hidden md:block opacity-50 hover:opacity-100 hover:text-white transition">
              <img className="w-4" src={assets.loop_icon} alt="" />
            </button>
          </div>

          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-white/50 w-8 text-right">
              {time.currentTime.minute ?? 0}:
              {String(time.currentTime.second ?? 0).padStart(2, "0")}
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
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition scale-0 group-hover:scale-100" />
              </div>
            </div>

            <span className="text-xs text-white/50 w-8">
              {time.totalTime.minute ?? 0}:
              {String(time.totalTime.second ?? 0).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 w-[30%] min-w-30">
          <button className="hidden md:block opacity-50 hover:opacity-100 transition">
            <img className="w-4" src={assets.lyrics_icon} alt="" />
          </button>
          <button className="hidden md:block opacity-50 hover:opacity-100 transition">
            <img className="w-4" src={assets.queue_icon} alt="" />
          </button>

          <div className="hidden lg:flex items-center gap-2 group">
            <button className="opacity-50 hover:opacity-100 transition">
              <img className="w-4" src={assets.volume_icon} alt="Volume" />
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={changeVolume}
              className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white hover:accent-green-500 transition-all"
              style={{
                background: `linear-linear(to right, #fff ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`,
              }}
            />
          </div>

          <button className="lg:hidden w-8 h-8 flex items-center justify-center">
            <img className="w-4" src={assets.queue_icon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;

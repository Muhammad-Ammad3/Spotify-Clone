import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const SongItem = ({ image, name, desc, id }) => {
  const { playWithId, playStatus, track } = useContext(PlayerContext);

  const isCurrentPlaying = track?.id === id;

  return (
    <div
      onClick={() => playWithId(id)}
      className="group relative p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/5"
    >
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          className={`w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110 ${
            isCurrentPlaying ? "scale-105" : ""
          }`}
          src={image}
          alt={name}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={(e) => {
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
            src={
              isCurrentPlaying && playStatus
                ? assets.pause_icon
                : assets.play_icon
            }
            alt={isCurrentPlaying && playStatus ? "Pause" : "Play"}
          />
        </button>

        {isCurrentPlaying && (
          <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-green-500 rounded-full z-10">
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-black">PLAYING</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-white font-semibold text-sm truncate group-hover:text-green-400 transition-colors">
          {name}
        </h3>
        <p className="text-white/50 text-xs line-clamp-2">{desc}</p>
      </div>

      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/10 pointer-events-none transition-colors" />
    </div>
  );
};

export default SongItem;

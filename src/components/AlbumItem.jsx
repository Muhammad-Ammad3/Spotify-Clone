import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();
  const { playWithId } = useContext(PlayerContext);

  const handleClick = (e) => {
    const isPlayButton = e.target.closest(".play-btn");
    if (isPlayButton) {
      e.stopPropagation();
      playWithId(id);
    } else {
      navigate(`/album/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative p-3 md:p-4 rounded-2xl cursor-pointer hover:bg-white/10 transition-all duration-300"
    >
      <div className="relative mb-3 overflow-hidden rounded-xl">
        <img
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
          src={image}
          alt={name}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          className="play-btn absolute bottom-3 right-3 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-black/50 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-green-400"
          onClick={(e) => {
            e.stopPropagation();
            playWithId(id);
          }}
        >
          <svg className="w-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] font-medium text-white">ALBUM</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-white font-semibold text-sm md:text-base truncate group-hover:text-green-400 transition-colors">
          {name}
        </h3>
        <p className="text-white/50 text-xs md:text-sm line-clamp-2">{desc}</p>
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/10 pointer-events-none transition-colors" />
    </div>
  );
};

export default AlbumItem;

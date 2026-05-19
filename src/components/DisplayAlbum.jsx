import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useState } from "react";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { playWithId, playStatus, currentTrack } = useContext(PlayerContext);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const albumSongs = songsData.slice(0, 10);

  const handlePlayAll = () => {
    if (albumSongs.length > 0) {
      playWithId(albumSongs[0].id);
      setIsPlaying(true);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const totalMinutes = albumSongs.length * 3;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return (
    <>
      <div className="relative mt-6 flex flex-col md:flex-row gap-6 md:items-end pb-6">
        <div className="absolute inset-0 bg-linear-to-b from-purple-500/30 via-transparent to-black pointer-events-none" />

        <div className="relative group/cover">
          <img
            className="w-40 h-40 md:w-52 md:h-52 rounded-lg shadow-2xl shadow-black/50 object-cover"
            src={albumData.image}
            alt={albumData.name}
          />
          <button
            onClick={handlePlayAll}
            className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/cover:opacity-100 hover:scale-110 transition-all duration-300"
          >
            <img className="w-5 ml-0.5" src={assets.play_icon} alt="Play" />
          </button>
        </div>

        <div className="relative flex flex-col gap-2 z-10">
          <p className="text-white text-sm font-medium uppercase tracking-wider">
            {albumsData[id]?.type || "Album"}
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white truncate max-w-150">
            {albumData.name}
          </h1>

          <h4 className="text-white/60 text-sm md:text-base">
            {albumData.desc}
          </h4>

          <div className="flex items-center gap-2 text-white/60 text-sm mt-2 flex-wrap">
            <img
              className="w-5 h-5 rounded-full"
              src={assets.spotify_logo}
              alt="Spotify"
            />
            <span className="font-bold text-white">Spotify</span>
            <span>•</span>
            <span>1,323,154 likes</span>
            <span>•</span>
            <span>
              <b>{albumSongs.length} songs</b>
              {hours > 0 ? `, about ${hours} hr ${mins} min` : `, ${mins} min`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4 mb-8">
        <button
          onClick={handlePlayAll}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-green-500/20"
        >
          <img className="w-6 ml-1" src={assets.play_icon} alt="Play" />
        </button>

        <button onClick={handleLike} className="transition">
          <img
            className={`w-8 transition-all ${
              isLiked ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
            src={isLiked ? assets.heart_icon_filled : assets.heart_icon}
            alt="Like"
            style={{
              filter: isLiked ? "brightness(1) saturate(1)" : "brightness(0.7)",
            }}
          />
        </button>

        <button className="opacity-60 hover:opacity-100 transition">
          <img className="w-8" src={assets.more_icon} alt="More" />
        </button>
      </div>

      <div className="grid grid-cols-[auto_1fr_40px] md:grid-cols-[50px_1fr_1fr_100px] gap-4 px-4 pb-2 text-white/40 text-sm border-b border-white/10">
        <p className="text-center hidden md:block">#</p>
        <p>Title</p>
        <p className="hidden lg:block">Album</p>
        <img className="w-4 m-auto" src={assets.clock_icon} alt="Duration" />
      </div>

      <div className="flex flex-col mt-4">
        {albumSongs.map((item, index) => {
          const isCurrentTrack = currentTrack?.id === item.id;

          return (
            <div
              onClick={() => playWithId(item.id)}
              className={`
                group grid grid-cols-[auto_1fr_40px] md:grid-cols-[50px_1fr_1fr_100px] gap-2 md:gap-4 p-2 md:px-4 items-center 
                rounded-lg cursor-pointer transition-all duration-200
                hover:bg-white/10
                ${isCurrentTrack ? "bg-white/5" : ""}
              `}
              key={index}
            >
              <div className="flex items-center justify-center w-8 text-white/60 md:w-auto">
                {isCurrentTrack && playStatus ? (
                  <div className="flex items-center gap-1 group-hover:hidden">
                    <div
                      className="w-1 h-3 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-1 h-3 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-1 h-3 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                ) : (
                  <span
                    className={`${isCurrentTrack ? "text-green-500" : "text-white/60"} group-hover:hidden text-sm`}
                  >
                    {index + 1}
                  </span>
                )}
                <img
                  className="hidden group-hover:block w-4"
                  src={assets.play_icon}
                  alt="Play"
                />
              </div>

              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  className="w-10 h-10 rounded object-cover shrink-0"
                  src={item.image}
                  alt={item.name}
                />
                <div className="flex flex-col min-w-0">
                  <p
                    className={`truncate text-sm md:text-base ${isCurrentTrack ? "text-green-500 font-medium" : "text-white"}`}
                  >
                    {item.name}
                  </p>
                  <p className="text-white/50 text-xs md:text-sm truncate">
                    {item.artist || "Unknown Artist"}
                  </p>
                </div>
              </div>

              <p className="hidden lg:block text-white/60 text-sm truncate">
                {albumData.name}
              </p>

              <p className="text-white/60 text-xs md:text-sm text-center">
                {item.duration}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/70 transition">
          Show {albumSongs.length} more songs
        </button>
      </div>
    </>
  );
};

export default DisplayAlbum;

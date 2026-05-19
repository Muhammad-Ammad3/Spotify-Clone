// import { useParams } from "react-router-dom";
// import Navbar from "./Navbar";
// import { albumsData, assets, songsData } from "../assets/assets";
// import { useContext } from "react";
// import { PlayerContext } from "../context/PlayerContext";

// const DisplayAlbum = () => {

//     const {id} = useParams()
//     const albumData = albumsData[id]
//     const {playWithId} = useContext(PlayerContext)

//   return (
//     <>
//       <Navbar />
//       <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
//         <img className="w-48 rounded" src={albumData.image} alt="" />
//         <div className="flex flex-col">
//             <p>Playlist</p>
//             <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
//             <h4>{albumData.desc}</h4>
//             <p className="mt-1">
//                 <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
//                 <b>Spotify</b>
//                 . 1,323,154 likes
//                 . <b>50 songs,</b>
//                 about 2 hr 30 min
//             </p>
//         </div>
//       </div>
//       <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
//         <p><b className="mr-4">#</b>Title</p>
//         <p>Album</p>
//         <p className="hidden sm:block">Date Added</p>
//         <img className="m-auto w-4" src={assets.clock_icon} alt="" />
//       </div>
//       <hr />
//       {
//         songsData.map((item, index) => (
//             <div onClick={() => playWithId(item.id)} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer" key={index}>
//                 <p className="text-white">
//                     <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
//                     <img className="inline w-10 mr-5" src={item.image} alt="" />
//                     {item.name}
//                 </p>
//                 <p className="text-[15px]">{albumData.name}</p>
//                 <p className="text-[15px] hidden sm:block">5 days ago</p>
//                 <p className="text-[15px] text-center">{item.duration}</p>
//             </div>
//         ))
//       }
//     </>
//   )
// }

// export default DisplayAlbum

import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
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

  // Filter songs for this album (you can adjust this logic)
  const albumSongs = songsData.slice(0, 10); // Mock data - adjust as needed

  const handlePlayAll = () => {
    if (albumSongs.length > 0) {
      playWithId(albumSongs[0].id);
      setIsPlaying(true);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Calculate total duration
  const totalMinutes = albumSongs.length * 3; // Mock calculation
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  return (
    <>
      <Navbar />
      
      {/* Album Header with Gradient Background */}
      <div className="relative mt-6 flex flex-col md:flex-row gap-6 md:items-end pb-6">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 via-transparent to-black pointer-events-none" />

        {/* Album Cover */}
        <div className="relative group/cover">
          <img
            className="w-40 h-40 md:w-52 md:h-52 rounded-lg shadow-2xl shadow-black/50 object-cover"
            src={albumData.image}
            alt={albumData.name}
          />
          {/* Play button overlay */}
          <button
            onClick={handlePlayAll}
            className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/cover:opacity-100 hover:scale-110 transition-all duration-300"
          >
            <img className="w-5 ml-0.5" src={assets.play_icon} alt="Play" />
          </button>
        </div>

        {/* Album Info */}
        <div className="relative flex flex-col gap-2 z-10">
          <p className="text-white text-sm font-medium uppercase tracking-wider">
            {albumsData[id]?.type || "Album"}
          </p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white truncate max-w-[600px]">
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

      {/* Action Buttons */}
      <div className="flex items-center gap-6 mt-4 mb-8">
        {/* Play Button */}
        <button
          onClick={handlePlayAll}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-green-500/20"
        >
          <img className="w-6 ml-1" src={assets.play_icon} alt="Play" />
        </button>

        {/* Like Button */}
        <button onClick={handleLike} className="transition">
          <img
            className={`w-8 transition-all ${
              isLiked ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
            src={isLiked ? assets.heart_icon_filled : assets.heart_icon}
            alt="Like"
            style={{ filter: isLiked ? "brightness(1) saturate(1)" : "brightness(0.7)" }}
          />
        </button>

        {/* More Options */}
        <button className="opacity-60 hover:opacity-100 transition">
          <img className="w-8" src={assets.more_icon} alt="More" />
        </button>
      </div>

      {/* Song List Header - FIXED grid defaults */}
      <div className="grid grid-cols-[auto_1fr_40px] md:grid-cols-[50px_1fr_1fr_100px] gap-4 px-4 pb-2 text-white/40 text-sm border-b border-white/10">
        <p className="text-center hidden md:block">#</p>
        <p>Title</p>
        <p className="hidden lg:block">Album</p>
        <img className="w-4 m-auto" src={assets.clock_icon} alt="Duration" />
      </div>

      {/* Song List */}
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
              {/* Song Number / Playing Indicator - FIXED Hover State logic */}
              <div className="flex items-center justify-center w-8 text-white/60 md:w-auto">
                {isCurrentTrack && playStatus ? (
                  <div className="flex items-center gap-1 group-hover:hidden">
                    <div className="w-1 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <span className={`${isCurrentTrack ? "text-green-500" : "text-white/60"} group-hover:hidden text-sm`}>
                    {index + 1}
                  </span>
                )}
                {/* Play icon shows on hover */}
                <img
                  className="hidden group-hover:block w-4"
                  src={assets.play_icon}
                  alt="Play"
                />
              </div>

              {/* Song Info */}
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                  src={item.image}
                  alt={item.name}
                />
                <div className="flex flex-col min-w-0">
                  <p className={`truncate text-sm md:text-base ${isCurrentTrack ? "text-green-500 font-medium" : "text-white"}`}>
                    {item.name}
                  </p>
                  <p className="text-white/50 text-xs md:text-sm truncate">
                    {item.artist || "Unknown Artist"}
                  </p>
                </div>
              </div>

              {/* Album Name - Hidden on mobile */}
              <p className="hidden lg:block text-white/60 text-sm truncate">
                {albumData.name}
              </p>

              {/* Duration */}
              <p className="text-white/60 text-xs md:text-sm text-center">
                {item.duration}
              </p>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="mt-8 flex justify-center">
        <button className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/70 transition">
          Show {albumSongs.length} more songs
        </button>
      </div>
    </>
  );
};

export default DisplayAlbum;
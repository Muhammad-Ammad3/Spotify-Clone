// import { albumsData } from "../assets/assets";
// import { songsData } from "../assets/assets";
// import AlbumItem from "./AlbumItem";
// import Navbar from "./Navbar";
// import SongItem from "./SongItem";

// const DisplayHome = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="mb-4">
//         <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
//         <div className="flex overflow-auto">
//           {albumsData.map((item, index) => (
//             <AlbumItem
//               key={index}
//               image={item.image}
//               name={item.name}
//               desc={item.desc}
//               id={item.id}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="mb-4">
//         <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
//         <div className="flex overflow-auto">
//           {songsData.map((item, index) => (
//             <SongItem
//               key={index}
//               image={item.image}
//               name={item.name}
//               desc={item.desc}
//               id={item.id}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DisplayHome;

import { albumsData, assets, songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import Navbar from "./Navbar";
import SongItem from "./SongItem";

// FIXED: Moved helper function to top to fix runtime ReferenceError hoisting crash
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

const DisplayHome = () => {
  return (
    <>
      
      {/* Main Content Container */}
      <div className="mb-6">
        {/* Section 1: Featured Charts */}
        <div className="relative mb-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Good {getGreeting()}
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Welcome back! Here's what's trending for you.
              </p>
            </div>
            {/* View All Button */}
            <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition">
              View All
              {/* FIXED: Replaced string source with assets file context */}
              <img className="w-4" src={assets.arrow_right} alt="" />
            </button>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative -mx-4 px-4">
            {/* Fade edges for scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            {/* Scrollable Row */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
              {albumsData.map((item, index) => (
                <div
                  key={item.id}
                  className="snap-start"
                >
                  <AlbumItem
                    key={index}
                    image={item.image}
                    name={item.name}
                    desc={item.desc}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-6" />

        {/* Section 2: Today's Biggest Hits */}
        <div className="relative mb-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Today's Biggest Hits
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Keep up with the top tracks right now.
              </p>
            </div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="relative -mx-4 px-4">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            {/* Scrollable Row */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
              {songsData.map((item, index) => (
                <div
                  key={item.id}
                  className="snap-start"
                >
                  <SongItem
                    key={index}
                    image={item.image}
                    name={item.name}
                    desc={item.desc}
                    id={item.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-6" />

        {/* Section 3: Made For You (Bonus Section) */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Made For You
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Music personalized to your taste.
              </p>
            </div>
          </div>

          {/* Grid Display - Different from horizontal scroll */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {songsData.slice(0, 5).map((item, index) => (
              <SongItem
                key={item.id}
                image={item.image}
                name={item.name}
                desc={item.desc}
                id={item.id}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-6" />

        {/* Section 4: Trending Artists */}
        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Popular Artists
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Follow your favorite artists to see their latest releases.
            </p>
          </div>

          {/* Artist Circle Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {[
              { name: "Arijit Singh", img: "🎤" },
              { name: "Badshah", img: "🎧" },
              { name: "Diljit Dosanjh", img: "🎵" },
              { name: "Neha Kakkar", img: "🎶" },
              { name: "Justin Bieber", img: "🎹" },
              { name: "Ed Sheeran", img: "🎸" },
            ].map((artist, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-white/5 transition"
              >
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-lg group-hover:shadow-purple-500/30 transition">
                    {artist.img}
                  </div>
                  {/* Play button overlay */}
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      {/* FIXED: Linked to assets imported file dictionary */}
                      <img className="w-4" src={assets.play_icon} alt="" />
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm font-medium text-center">
                  {artist.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
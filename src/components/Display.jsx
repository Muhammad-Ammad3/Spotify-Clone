// import { Route, Routes, useLocation } from "react-router-dom";
// import DisplayHome from "./DisplayHome";
// import DisplayAlbum from "./DisplayAlbum";
// import { useEffect, useRef } from "react";
// import { albumsData } from "../assets/assets";

// const Display = () => {

//   const displayRef = useRef()
//   const location = useLocation()
//   const isAlbum = location.pathname.includes("album")
//   const albumId = isAlbum ? location.pathname.slice(-1): "";
//   const bgColor = albumsData[Number(albumId)].bgColor

//   useEffect(() => {
//     if(isAlbum){
//       displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
//     }else{
//       displayRef.current.style.background = `#121212`;
//     }
//   })

//   return (
//     <div ref={displayRef} className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
//       <Routes>
//         <Route path="/" element={<DisplayHome />} />
//         <Route path="/album/:id" element={<DisplayAlbum />} />
//       </Routes>
//     </div>
//   )
// }

// export default Display
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Navbar from "./Navbar"; 
import { useEffect, useRef } from "react";
import { albumsData } from "../assets/assets";

const Display = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");

  const albumId = isAlbum 
    ? location.pathname.split("/").pop().replace(/[^0-9]/g, "") || ""
    : "";
  
  const albumBgColor = albumsData[Number(albumId)]?.bgColor || "#121212";

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum && albumBgColor) {
        displayRef.current.style.background = `linear-gradient(${albumBgColor}, #121212)`;
      } else {
        displayRef.current.style.background = "#121212";
      }
    }
  }, [location.pathname, albumBgColor, isAlbum]);

  return (
    <div
      ref={displayRef}
      className="w-full h-full px-4 md:px-6 pt-4 pb-24 rounded-xl text-white overflow-y-auto overflow-x-hidden scrollbar-hide transition-all duration-700 ease-in-out relative"
    >
      {/* 1. Navbar sabse upar single time render hoga */}
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      {/* 2. Content thoda niche se start ho taaki navbar ke upar overlap na kare */}
      <div className="mt-4">
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route path="/album/:id" element={<DisplayAlbum />} />
        </Routes>
      </div>
      
      <div className="h-24" />
    </div>
  );
};

export default Display;
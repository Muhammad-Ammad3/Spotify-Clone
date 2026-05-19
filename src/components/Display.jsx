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
    ? location.pathname
        .split("/")
        .pop()
        .replace(/[^0-9]/g, "") || ""
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
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

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

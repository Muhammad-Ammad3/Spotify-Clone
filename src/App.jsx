// import { useContext } from 'react';
// import Display from './components/Display';
// import Player from './components/Player';
// import SideBar from './components/SideBar';
// import { PlayerContext } from './context/PlayerContext';

// const App = () => {

//   const {audioRef, track} = useContext(PlayerContext)

//   return (
//     <div className="h-screen bg-black">
//       <div className="h-[90%] flex" >
//         <SideBar />
//         <Display />
//       </div>
//         <Player />
//         <audio ref={audioRef} src={track.file} preload="auto"></audio>
//     </div>
//   )
// }

// export default App
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Display from "./components/Display";
import Player from "./components/Player";
import SideBar from "./components/SideBar";

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Screen size check karne ke liye
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Route change hone par mobile sidebar auto-close ho jaye
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      
      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* FIXED: Pehle yahan 'hidden lg:block' laga tha jisse mobile par sidebar gayab ho jata tha.
          Ab hum direct isOpen aur setIsOpen ki state ko control kar rahe hain bina layout hierarchy tode.
        */}
        <SideBar 
          isOpen={isMobile ? isSidebarOpen : true} 
          setIsOpen={setIsSidebarOpen} 
        />

        {/* Display Area (Main Content) */}
        {/* FIXED: Navbar se sidebar open karne ke liye humne state toggle function pass kar diya hai */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Display setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </div>

      {/* Player - Bottom Fixed Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Player />
      </div>
    </div>
  );
};

// Main Export Component
const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
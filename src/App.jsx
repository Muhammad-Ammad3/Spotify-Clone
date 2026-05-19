import { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Display from "./components/Display";
import Player from "./components/Player";
import SideBar from "./components/SideBar";

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        <SideBar
          isOpen={isMobile ? isSidebarOpen : true}
          setIsOpen={setIsSidebarOpen}
        />

        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          <Display setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Player />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;

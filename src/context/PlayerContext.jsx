// import { createContext, useEffect, useRef, useState } from "react";
// import { songsData } from "../assets/assets";

// export const PlayerContext = createContext();

// const PlayerContextProvider = (props) => {
//   const audioRef = useRef();
//   const seekBg = useRef();
//   const seekBar = useRef();

//   const [track, setTrack] = useState(songsData[0]);
//   const [playStatus, setPlayStatus] = useState(false);
//   const [time, setTime] = useState({
//     currentTime: {
//       second: 0,
//       minute: 0,
//     },
//     totalTime: {
//       second: 0,
//       minute: 0,
//     },
//   });

//   const play = () => {
//     audioRef.current.play();
//     setPlayStatus(true);
//   };
//   const pause = () => {
//     audioRef.current.pause();
//     setPlayStatus(false);
//   };

//   const playWithId = async (id) => {
//     await setTrack(songsData[id]);
//     await audioRef.current.play();
//     setPlayStatus(true);
//   };

//   const previous = async () => {
//     if (track.id > 0) {
//       await setTrack(songsData[track.id - 1]);
//       await audioRef.current.play();
//       setPlayStatus(true);
//     }
//   };
//   const next = async () => {
//     if (track.id < songsData.length - 1) {
//       await setTrack(songsData[track.id + 1]);
//       await audioRef.current.play();
//       setPlayStatus(true);
//     }
//   };

//   const seekSong = async (e) => {
//     audioRef.current.currentTime =((e.nativeEvent.offsetX /seekBg.current.offsetWidth) * audioRef.current.duration);
//   }

//   useEffect(() => {
//     setTimeout(() => {
//       audioRef.current.ontimeupdate = () => {
//         seekBar.current.style.width =
//           Math.floor(
//             (audioRef.current.currentTime / audioRef.current.duration) * 100,
//           ) + "%";
//         setTime({
//           currentTime: {
//             second: Math.floor(audioRef.current.currentTime % 60),
//             minute: Math.floor(audioRef.current.currentTime / 60),
//           },
//           totalTime: {
//             second: Math.floor(audioRef.current.duration % 60),
//             minute: Math.floor(audioRef.current.duration / 60),
//           },
//         });
//       };
//     }, 1000);
//   }, [audioRef]);

//   const contextValue = {
//     audioRef,
//     seekBar,
//     seekBg,
//     track,
//     setTrack,
//     playStatus,
//     setPlayStatus,
//     time,
//     setTime,
//     play,
//     pause,
//     playWithId,
//     previous,
//     next,
//     seekSong,
//   };
//   return (
//     <PlayerContext.Provider value={contextValue}>
//       {props.children}
//     </PlayerContext.Provider>
//   );
// };

// export default PlayerContextProvider;


import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  // Play function
  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setPlayStatus(true))
        .catch((err) => {
          if (err.name !== "AbortError") console.log("Playback error:", err);
        });
    }
  };

  // Pause function
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // FIXED: Ab playWithId sirf state badlega, play karne ka kaam useEffect karega (Single Click Fix!)
  const playWithId = async (id) => {
    if (songsData[id]) {
      setTrack(songsData[id]);
      setPlayStatus(true); // User ne click kiya hai, toh status pehle hi true kar do
    }
  };

  // FIXED: Next function smoothly working
  const next = async () => {
    const currentIndex = songsData.findIndex((song) => song.id === track.id);
    if (currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
      setPlayStatus(true);
    }
  };

  // FIXED: Previous function smoothly working
  const previous = async () => {
    const currentIndex = songsData.findIndex((song) => song.id === track.id);
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
      setPlayStatus(true);
    }
  };

  // Seek song controller
  const seekSong = (e) => {
    if (audioRef.current && audioRef.current.duration && seekBg.current) {
      const rect = seekBg.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  // FIXED: Yeh magical useEffect ab hamesha track badalne par naye audio file ko load aur play karega
  useEffect(() => {
    if (audioRef.current && track?.file) {
      // 1. Purane audio ko pause karo aur naya src assign karo
      audioRef.current.src = track.file;
      audioRef.current.load();

      // 2. Agar playStatus true hai (yaani user ne next/click kiya hai) toh turant bajao
      if (playStatus) {
        audioRef.current.play()
          .catch((err) => {
            if (err.name !== "AbortError") console.log("Playback error:", err);
          });
      }
    }
  }, [track]); // Hamesha track badalne par chalega!

  // Time tracking listener
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration && seekBar.current) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        seekBar.current.style.width = `${progressPercent}%`;

        setTime({
          currentTime: {
            second: Math.floor(audio.currentTime % 60),
            minute: Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audio.duration % 60),
            minute: Math.floor(audio.duration / 60),
          },
        });
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
      <audio ref={audioRef} preload="auto" />
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
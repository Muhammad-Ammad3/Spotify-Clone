import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);

  const [volume, setVolume] = useState(1.0);

  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlayStatus(true))
        .catch((err) => {
          if (err.name !== "AbortError") console.log("Playback error:", err);
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    if (songsData[id]) {
      setTrack(songsData[id]);
      setPlayStatus(true);
    }
  };

  const next = async () => {
    const currentIndex = songsData.findIndex((song) => song.id === track.id);
    if (currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
      setPlayStatus(true);
    }
  };

  const previous = async () => {
    const currentIndex = songsData.findIndex((song) => song.id === track.id);
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
      setPlayStatus(true);
    }
  };

  const seekSong = (e) => {
    if (audioRef.current && audioRef.current.duration && seekBg.current) {
      const rect = seekBg.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  const changeVolume = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  useEffect(() => {
    if (audioRef.current && track?.file) {
      audioRef.current.src = track.file;
      audioRef.current.load();

      audioRef.current.volume = volume;

      if (playStatus) {
        audioRef.current.play().catch((err) => {
          if (err.name !== "AbortError") console.log("Playback error:", err);
        });
      }
    }
  }, [track]);

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
    volume,
    changeVolume,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
      <audio ref={audioRef} preload="auto" />
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

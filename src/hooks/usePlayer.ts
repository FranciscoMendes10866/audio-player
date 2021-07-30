import { useState, RefObject, useEffect, ChangeEvent } from "react";

type ElementRef = RefObject<HTMLAudioElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

type PlayerState = {
  isPlaying: boolean;
  progress: number;
  duration: string;
  currentTime: string;
};

type Props = {
  playerState: PlayerState;
  handleIsPlaying: () => void;
  handleOnTimeUpdate: () => void;
  handleVideoProgress: (e: InputEvent) => void;
  handleBackFiveSec: () => void;
  handleForwardFiveSec: () => void;
  onLoadedMetadata: () => void;
};

const usePlayer = (audioElement: ElementRef): Props => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    duration: "0:0",
    currentTime: "0:0",
  });

  useEffect(() => {
    playerState.isPlaying
      ? audioElement.current!.play()
      : audioElement.current!.pause();
  }, [playerState.isPlaying, audioElement]);

  const handleIsPlaying = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  const handleOnTimeUpdate = () => {
    const progress =
      (audioElement.current!.currentTime / audioElement.current!.duration) *
      100;
    const currentMinutes = Math.floor(audioElement.current!.currentTime / 60);
    const currentSeconds = Math.floor(audioElement.current!.currentTime - currentMinutes * 60);
    setPlayerState({
      ...playerState,
      progress,
      currentTime: `${currentMinutes}:${currentSeconds}`
    });
  };

  const handleVideoProgress = (e: InputEvent) => {
    const manualChange = Number(e.target.value);
    audioElement.current!.currentTime =
      (audioElement.current!.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleBackFiveSec = () => {
    const manualChange = playerState.progress - 5;
    audioElement.current!.currentTime =
      (audioElement.current!.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const handleForwardFiveSec = () => {
    const manualChange = playerState.progress + 5;
    audioElement.current!.currentTime =
      (audioElement.current!.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const onLoadedMetadata = () => {
    const minutes = Math.floor(audioElement.current!.duration / 60);
    const seconds = Math.floor(audioElement.current!.duration - minutes * 60);
    setPlayerState({
      ...playerState,
      duration: `${minutes}:${seconds}`,
    });
  };

  return {
    playerState,
    handleIsPlaying,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleBackFiveSec,
    handleForwardFiveSec,
    onLoadedMetadata,
  };
};

export default usePlayer;

import React, { useRef } from "react";
import "./styles.css";

import music from "../../assets/music.mp3";
import usePlayer from "../../hooks/usePlayer";

const Player: React.FC = () => {
  const audioElement = useRef(null);
  const {
    playerState,
    handleIsPlaying,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleBackFiveSec,
    handleForwardFiveSec,
    onLoadedMetadata,
  } = usePlayer(audioElement);
  return (
    <div className="card">
      <h3>Now Playing</h3>
      <div className="img-wrapper">
        <img src="https://bit.ly/3fxdeSH" alt="Album cover" />
      </div>
      <h2>Criminal</h2>
      <p>Katana Angels, Bottle Flip, Dayana</p>
      <div className="progress-status">
        <div className="time">{playerState.currentTime}</div>
        <input
          className="progress-bar"
          type="range"
          value={playerState.progress}
          onChange={(e) => handleVideoProgress(e)}
        />
        <div className="time">{playerState.duration}</div>
      </div>
      <div className="actions">
        <button className="backward-btn" onClick={handleBackFiveSec}>
          <i className="bx bxs-chevrons-left"></i>
        </button>
        <button className="play-pause-btn" onClick={handleIsPlaying}>
          {!playerState.isPlaying ? (
            <i className="bx bx-play"></i>
          ) : (
            <i className="bx bx-pause"></i>
          )}
        </button>
        <button className="forward-btn" onClick={handleForwardFiveSec}>
          <i className="bx bxs-chevrons-right"></i>
        </button>
      </div>
      <audio
        ref={audioElement}
        preload="metadata"
        src={music}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={handleOnTimeUpdate}
      ></audio>
    </div>
  );
};

export default Player;

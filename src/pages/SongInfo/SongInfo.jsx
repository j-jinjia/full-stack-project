import Layout from "../../components/Layout/Layout";
import { useState, useRef } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player/youtube";
import "./SongInfo.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Duration from "../../components/Duration/Duration";

import screenfull from "screenfull";

const SongInfo = (props) => {
  const { songsArr } = props;
  const { songId } = useParams();
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1);
  const [seeking, setSeeking] = useState(0);
  const [played, setPlayed] = useState(0);

  const songs = songsArr.find((song) => song.id.toString() === songId);
  const { fullName, song, genre, artist, ytURL, album, addDate } = songs;

  const shortenedDate = addDate.split("T")[0];

  //button Fullscreen logic
  //full screen on click, exit on ending the video
  const player = useRef(null);

  const handleClickFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(player.current.wrapper);
    } else {
      screenfull.exit(player.current.wrapper);
    }
  };
  const handleChangeRange = (e) => {
    if (e.target.value === "0") {
      setMute(true);
      setVolume(0);
    } else {
      setVolume(e.target.value);
      setMute(false);
    }
  };

  const handleMute = (e) => {
    setMute(!mute);
  };

  const handlePlaying = () => {
    setPlaying(!playing);
  };

  const handleSeekMouseDown = (e) => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    setSeeking(parseFloat(e.target.value));
  };

  const handleProgress = () => {
    if (!seeking) {
      setPlayed(played);
    }
  };
  //when click on mute button, slider should go to 0.
  return (
    <Layout>
      <div className="song-info">
        <div className="song-info__react-wrapper">
          <ReactPlayer
            id={song}
            className="song-info__react-player"
            url={ytURL}
            ref={player}
            muted={mute}
            volume={volume}
            playing={playing}
            getDuration
            width="100%"
            height="100%"
            onEnded={handleClickFullscreen}
            onSeek={(e) => console.log("onSeek", e)}
            onProgress={handleProgress}
          />

          <div className="song-info__controls">
            <button
              className="song-info__controls-button"
              onClick={handleClickFullscreen}
            >
              Fullscreen
            </button>
            {playing ? (
              <button
                className="song-info__controls-button"
                onClick={handlePlaying}
              >
                Pause
              </button>
            ) : (
              <button
                className="song-info__controls-button"
                onClick={handlePlaying}
              >
                Play
              </button>
            )}
            {mute ? (
              <button
                className="song-info__controls-button"
                onClick={handleMute}
              >
                Unmute
              </button>
            ) : (
              <button
                className="song-info__controls-button"
                onClick={handleMute}
              >
                Mute
              </button>
            )}
            <input
              onChange={handleChangeRange}
              type="range"
              min="0"
              max="1"
              step="0.1"
            />

            <progress max={1} value={played} />
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            />
          </div>
        </div>
        <div className="song-info__content">
          <h2>{song}</h2>
          <p>Genre: {genre}</p>
          <p>Artist(s): {artist}</p>
          <p>Album: {album}</p>
          <p>
            Added by {fullName} on {shortenedDate}
          </p>
        </div>
      </div>

      <Button className={"buttons-exit"} link={<Link to={"/"}>Exit</Link>} />
    </Layout>
  );
};

export default SongInfo;

import Layout from "../../components/Layout/Layout";
import { useState, useRef } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player/youtube";
import "./SongInfo.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

import screenfull from "screenfull";

const SongInfo = (props) => {
  const { songsArr } = props;
  const { songId } = useParams();
  const [playing, setPlaying] = useState(false);

  const songs = songsArr.find((song) => song.id.toString() === songId);
  const { fullName, song, genre, artist, ytURL, album, addDate } = songs;

  const shortenedDate = addDate.split("T")[0];

  //button Fullscreen logic
  const player = useRef(null);
  const handleClickFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(player.current.wrapper);
    }
  };
  //exit full screen when the video ends
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };
  return (
    <Layout>
      <div className="song-info">
        <div className="song-info__react-wrapper">
          <ReactPlayer
            className="song-info__react-player"
            url={ytURL}
            ref={player}
            playing={playing}
            width="100%"
            height="100%"
            controls
            onClick={handleClickFullscreen}
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
                onClick={() => setPlaying(false)}
              >
                Pause
              </button>
            ) : (
              <button
                className="song-info__controls-button"
                onClick={() => setPlaying(true)}
              >
                Play
              </button>
            )}
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

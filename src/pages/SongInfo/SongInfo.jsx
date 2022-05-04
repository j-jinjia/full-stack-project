import { useState, useRef } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player/youtube";
import "./SongInfo.scss";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import screenfull from "screenfull";
import { FiHome } from "react-icons/fi";
import { GiMusicalNotes } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import {
  BiFullscreen,
  BiPlay,
  BiPause,
  BiVolumeFull,
  BiVolumeMute,
} from "react-icons/bi";

const SongInfo = (props) => {
  const { songsArr } = props;
  const { songId } = useParams();
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1);
  // const [seeking, setSeeking] = useState(0);
  // const [played, setPlayed] = useState(0);
  const navigate = useNavigate();

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

  const handleMute = () => {
    setMute(!mute);
  };

  const handlePlaying = () => {
    setPlaying(!playing);
  };

  // const handleSeekMouseDown = () => {
  //   setSeeking(true);
  // };

  // const handleSeekChange = (e) => {
  //   setPlayed(parseFloat(e.target.value));
  // };

  // const handleSeekMouseUp = (e) => {
  //   setSeeking(false);
  //   setSeeking(parseFloat(e.target.value));
  // };

  // const handleProgress = () => {
  //   if (!seeking) {
  //     setPlayed(played);
  //   }
  // };
  const handleDelete = () => {
    swal({
      title: "Nologyfy says: ",
      text: "You are about to delete this song. Are you sure?",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((response) => {
      if (response) {
        fetch(
          "https://full-stack-project-songs.nw.r.appspot.com/song/delete/" +
            songId,
          {
            method: "DELETE",
          }
        ).then(() => {
          swal({
            title: "Nologyfy says:",
            text: "This song has been deleted!",
            icon: "success",
            button: "OK",
          });
          navigate("/");
        });
      }
    });
  };
  //when click on mute button, slider should go to 0.
  return (
    <section className="song-info-page">
      <div className="header">
        <button className="header__button" onClick={handleDelete}>
          <MdDeleteForever />
        </button>
        <Button
          className={"buttons-exit"}
          link={
            <Link to={"/"}>
              <FiHome />
              <GiMusicalNotes />
            </Link>
          }
        />
      </div>
      <section className="song-info">
        <div className="player">
          <div className="player__react-wrapper">
            <ReactPlayer
              id={song}
              className="player__react-player"
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
              // onProgress={handleProgress}
            />
          </div>
          <div className="song-info__controls">
            <div className="song-info__controls-buttons">
              <button
                className="song-info__controls-button"
                onClick={handleClickFullscreen}
              >
                <BiFullscreen />
              </button>
              {playing ? (
                <button
                  className="song-info__controls-button"
                  onClick={handlePlaying}
                >
                  <BiPause />
                </button>
              ) : (
                <button
                  className="song-info__controls-button"
                  onClick={handlePlaying}
                >
                  <BiPlay />
                </button>
              )}
              {mute ? (
                <button
                  className="song-info__controls-button"
                  onClick={handleMute}
                >
                  <BiVolumeMute />
                </button>
              ) : (
                <button
                  className="song-info__controls-button"
                  onClick={handleMute}
                >
                  <BiVolumeFull />
                </button>
              )}
            </div>
            <label>
              <BiVolumeFull />
            </label>
            <input
              onChange={handleChangeRange}
              type="range"
              min="0"
              max="1"
              step="0.1"
            />
            {
              //progress bar and seekbar
              /* <progress max={1} value={played} />
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            /> */
            }
          </div>
        </div>
        <div className="song-info__content">
          <h2 className="song-info__content-title">{song}</h2>
          <p className="song-info__content-text">Genre: {genre}</p>
          <p className="song-info__content-text">Artist(s): {artist}</p>
          <p className="song-info__content-text">Album: {album}</p>
          <p className="song-info__content-text">
            Added by {fullName} on {shortenedDate}
          </p>
        </div>
      </section>
    </section>
  );
};

export default SongInfo;

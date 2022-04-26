import Layout from "../../components/Layout/Layout";
import React from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player/youtube";
import "./SongInfo.scss";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const SongInfo = (props) => {
  const { songsArr } = props;
  const { songId } = useParams();
  const songs = songsArr.find((song) => song.id.toString() === songId);
  const { fullName, song, genre, artist, ytURL, album, addDate } = songs;

  const shortenedDate = addDate.split("T")[0];
  return (
    <Layout>
      <div className="song-info">
        <h2>{song}</h2>
        <p>Genre: {genre}</p>
        <p>Artist(s): {artist}</p>
        <p>Album: {album}</p>
        <div className="song-info__react-wrapper">
          <ReactPlayer className="song-info__react-player" url={ytURL} />
        </div>
        <p>
          Added by {fullName} on {shortenedDate}
        </p>
      </div>

      <Button className={"buttons-exit"} link={<Link to={"/"}>Exit</Link>} />
    </Layout>
  );
};

export default SongInfo;

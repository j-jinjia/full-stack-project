import Layout from "../../components/Layout/Layout";
import React from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player/youtube";
import "./SongInfo.scss";

const SongInfo = (props) => {
  const { songsArr } = props;
  const { songId } = useParams();
  const currentSong = songsArr.find((song) => song.id.toString() === songId);
  const { name, song, genre, artist, ytURL, album } = currentSong;

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
        <p>Added by {name}</p>
      </div>
    </Layout>
  );
};

export default SongInfo;

import { Route, Routes } from "react-router-dom";
import AddSong from "./pages/AddSong/AddSong";
import Home from "./pages/Home/Home";
import SongInfo from "./pages/SongInfo/SongInfo";
import { useEffect, useState } from "react";
import "./styles/main.scss";

const App = () => {
  const [songInfo, setSongsInfo] = useState([]);
  const targetUrl = "http://localhost:8080/api/songs";

  //https://full-stack-project-songs.nw.r.appspot.com/api/songs
  //https://localhost:8080/api/songs

  const getSongInfo = async () => {
    const res = await fetch(targetUrl);
    const data = await res.json();
    setSongsInfo(data);
  };
  useEffect(() => {
    getSongInfo();
  }, []);
  return (
    <Routes>
      <Route path="*" element={<Home songArr={songInfo} />} />
      <Route path="/song/:songId" element={<SongInfo songsArr={songInfo} />} />
      <Route path="/song/add" element={<AddSong />} />
    </Routes>
  );
};

export default App;

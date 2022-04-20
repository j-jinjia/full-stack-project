import { Route, Routes } from "react-router-dom";
import AddSong from "./pages/AddSong/AddSong";
import Home from "./pages/Home/Home";
import SongInfo from "./pages/SongInfo/SongInfo";
import data from "./data/data";
import "./styles/main.scss";

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/song/:songId" element={<SongInfo songsArr={data} />} />
      <Route path="/song/add" element={<AddSong />} />
    </Routes>
  );
};

export default App;

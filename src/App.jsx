import { Route, Routes } from "react-router-dom";
import AddSong from "./pages/AddSong/AddSong";
import Home from "./pages/Home/Home";
import Songs from "./pages/Songs/Songs";
import "./styles/main.scss";

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/songs" element={<Songs />} />
      <Route path="/songs/add" element={<AddSong />} />
    </Routes>
  );
};

export default App;

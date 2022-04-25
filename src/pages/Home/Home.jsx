import Button from "../../components/Button/Button";
import CardList from "../../components/CardList/CardList";
import Layout from "../../components/Layout/Layout";
// import data from "../../data/data";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const targetUrl =
    "https://full-stack-project-songs.nw.r.appspot.com/api/songs";

  const getSongs = async () => {
    const res = await fetch(targetUrl);
    const data = await res.json();
    setSongs(data);
  };

  //searchBar
  const handleInput = (event) => {
    const cleanInput = event.target.value.toLowerCase();
    setSearchTerm(cleanInput);
  };

  const filteredSongs = songs.filter((song) => {
    const songNameLower = song.artist.toLowerCase();
    return songNameLower.includes(searchTerm);
  });

  useEffect(() => {
    getSongs();
  }, []);
  return (
    <Layout>
      <h1>Music Store</h1>
      <p>Find out what is the world listening to</p>
      <Button
        className={"button"}
        link={<Link to={"/song/add"}>Add Song</Link>}
      />
      <SearchBox
        label="Search"
        searchTerm={searchTerm}
        handleInput={handleInput}
      />
      <CardList cardData={filteredSongs} />
    </Layout>
  );
};

export default Home;

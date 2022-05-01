import Button from "../../components/Button/Button";
import CardList from "../../components/CardList/CardList";
import Layout from "../../components/Layout/Layout";
// import data from "../../data/data";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import "./Home.scss";

const Home = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { songArr } = props;

  //searchBar
  const handleInput = (event) => {
    const cleanInput = event.target.value.toLowerCase();
    setSearchTerm(cleanInput);
  };

  const filteredSongs = songArr.filter((song) => {
    const songNameLower = song.artist.toLowerCase();
    return songNameLower.includes(searchTerm);
  });

  return (
    <Layout>
      <div className="home">
        <h1 className="home__title">Music Store</h1>
        <Button
          className={"home__button"}
          link={<Link to={"/song/add"}>Add Song</Link>}
        />
      </div>
      <p className="sub-title">Find out what is the world listening to</p>
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

import Button from "../../components/Button/Button";
import CardList from "../../components/CardList/CardList";
// import data from "../../data/data";
import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import "./Home.scss";
import { BsMusicNote } from "react-icons/bs";
import useFetch from "../../utils/hooks/useFetch";
import { BsMusicPlayer } from "react-icons/bs";
import LoadingSpin from "react-loading-spin";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: songs,
    isPending,
    error,
  } = useFetch("https://full-stack-project-songs.nw.r.appspot.com/api/songs");
  //http://localhost:8080/api/songs

  //searchBar
  const handleInput = (event) => {
    const cleanInput = event.target.value.toLowerCase();
    setSearchTerm(cleanInput);
  };

  console.log(songs);
  const filteredSongs = songs.filter((song) => {
    const songNameLower = song.artist.toLowerCase();
    return songNameLower.includes(searchTerm);
  });

  return (
    <>
      <section className="home">
        <div className="home__header">
          <h1 className="home__header-title">
            <BsMusicPlayer /> Nologyfy
          </h1>
          <Button
            className={"home__button"}
            link={
              <Link to={"/song/add"}>
                Add
                <BsMusicNote />
              </Link>
            }
          />
        </div>
        <p className="home__sub-title">
          Find out what is the world listening to
        </p>
        <SearchBox
          label="Search"
          searchTerm={searchTerm}
          handleInput={handleInput}
        />
        {songs && <CardList cardData={filteredSongs} />}
        {isPending && (
          <div className="loader">
            <LoadingSpin
              size="200px"
              width="15px"
              primaryColor="#1ca74e"
              animationDuration="4s"
              timingFunction="ease-in-out"
              direction="alternate"
              numberOfRotationsInAnimation={4}
            />
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </section>
    </>
  );
};

export default Home;

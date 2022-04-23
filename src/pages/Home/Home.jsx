import Button from "../../components/Button/Button";
import CardList from "../../components/CardList/CardList";
import Layout from "../../components/Layout/Layout";
import data from "../../data/data";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const url = "https://full-stack-project-songs.nw.r.appspot.com/api/songs";

  const getSongs = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setSongs(data);
  };

  useEffect(() => {
    getSongs();
  }, []);
  return (
    <Layout>
      <h1>Music Store</h1>
      <p>Find out what is the world listening to</p>
      <CardList cardData={songs} />
      <Button
        className={"button"}
        link={<Link to={"/song/add"}>Add Song</Link>}
      />
    </Layout>
  );
};

export default Home;

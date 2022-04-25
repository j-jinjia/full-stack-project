import { useState } from "react";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import "./AddSong.scss";

//inputs
//title,genre,artist(s), ytURL, imageURL,album, name

const AddSong = () => {
  const [isPending, setIsPending] = useState(false);
  const [fullName, setFullName] = useState("");
  const [song, setSong] = useState("");
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [ytURL, setYtUrl] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSong = { fullName, song, genre, album, artist, ytURL, imageURL };
    setIsPending(true);
    fetch("http://full-stack-project-songs.nw.r.appspot.com/song/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    }).then(() => {
      console.log("song,added");
      setIsPending(false);
    });
  };
  return (
    <Layout>
      <h1>Add song here</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          value={fullName}
          required
          onChange={(e) => setFullName(e.target.value)}
        />
        <label htmlFor="">Song</label>
        <input
          type="text"
          value={song}
          required
          onChange={(e) => setSong(e.target.value)}
        />
        <label htmlFor="">Genre</label>
        <input
          type="text"
          value={genre}
          required
          onChange={(e) => setGenre(e.target.value)}
        />
        <label htmlFor="">Album</label>
        <input
          type="text"
          value={album}
          required
          onChange={(e) => setAlbum(e.target.value)}
        />
        <label htmlFor="">Artist</label>
        <input
          type="text"
          value={artist}
          required
          onChange={(e) => setArtist(e.target.value)}
        />
        <label htmlFor="">Youtube Link</label>
        <input
          type="text"
          value={ytURL}
          required
          onChange={(e) => setYtUrl(e.target.value)}
        />
        <label htmlFor="">Album Image Link</label>
        <input
          type="text"
          value={imageURL}
          required
          onChange={(e) => setImageURL(e.target.value)}
        />
        {!isPending && <button>Add Song</button>}
        {isPending && <button disabled>Adding Song...</button>}
      </form>
      <Button className={"button"} link={<Link to={"/"}>Back to home</Link>} />
    </Layout>
  );
};

export default AddSong;

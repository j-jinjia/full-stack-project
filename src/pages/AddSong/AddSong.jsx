import { useState } from "react";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import "./AddSong.scss";
import swal from "sweetalert";
import { GiMusicalNotes } from "react-icons/gi";
import { FiHome } from "react-icons/fi";
import LoadingSpin from "react-loading-spin";
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSong = { fullName, song, genre, album, artist, ytURL, imageURL };
    setIsPending(true);
    fetch("https://full-stack-project-songs.nw.r.appspot.com/song/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSong),
    }).then(() => {
      swal({
        title: "Nologyfy says:",
        text: "Your song has been added!",
        icon: "success",
        button: "OK",
      });
      setIsPending(false);
      navigate("/");
    });
  };

  return (
    <>
      <section className="add-song">
        <div className="add-song__header">
          <Button
            className={"add-song__button-home"}
            link={
              <Link to={"/"}>
                <FiHome />
                <GiMusicalNotes />
              </Link>
            }
          />
        </div>

        <div className="add-song__content">
          <h1 className="add-song__title">Add your song here</h1>
          <p className="add-song__sub-title">
            Share your favourite song with us!
          </p>
          <form className="add-song__form" onSubmit={handleSubmit}>
            <label htmlFor="">Your Name</label>
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
            {!isPending && (
              <button className="add-song__form-btn">Add Song</button>
            )}
            {isPending && <LoadingSpin />}
          </form>
        </div>
      </section>
    </>
  );
};

export default AddSong;

import Layout from "../../components/Layout/Layout";
import "./AddSong.scss";

//inputs
//title,genre,artist(s), ytURL, imageURL,album, name

const AddSong = () => {
  return (
    <Layout>
      <h1>Add song here</h1>
      <form>
        <label htmlFor="">Name</label>
        <input type="text" />
        <label htmlFor="">Song</label>
        <input type="text" />
        <label htmlFor="">Album</label>
        <input type="text" />
        <label htmlFor="">Artist</label>
        <input type="text" />
        <label htmlFor="">Youtube Link</label>
        <input type="text" />
        <label htmlFor="">Album Image Link</label>
        <input type="text" />
      </form>
    </Layout>
  );
};

export default AddSong;

import CardList from "../../components/CardList/CardList";
import Layout from "../../components/Layout/Layout";
import data from "../../data/data";

const Home = () => {
  return (
    <Layout>
      <h1>Music Store</h1>
      <p>Find out what is the world listening to</p>
      <CardList cardData={data} />
    </Layout>
  );
};

export default Home;

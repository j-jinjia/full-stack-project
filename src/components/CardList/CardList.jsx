import React from "react";
import { Link } from "react-router-dom";
import "./CardList.scss";
const CardList = ({ cardData }) => {
  const cardListJSX = cardData.map((card, index) => {
    return (
      <Link to={`/song/${card.id}`} key={index}>
        <img className="song-image" src={card.imageURL} alt="" />
      </Link>
    );
  });
  return <div className="card-list">{cardListJSX}</div>;
};

export default CardList;

import React from "react";
import { Link } from "react-router-dom";
import "./CardList.scss";
const CardList = ({ cardData }) => {
  const cardListJSX = cardData.map((card, index) => {
    return (
      <div className="song">
        <Link to={`/song/${card.id}`} key={index}>
          <img className="song__image" src={card.imageURL} alt="" />
        </Link>
        <p className="song__title">
          {card.song} - {card.artist}
        </p>
      </div>
    );
  });
  return <div className="card-list">{cardListJSX}</div>;
};

export default CardList;

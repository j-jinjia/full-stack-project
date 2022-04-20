import React from "react";
import "./Card.scss";

const Card = (props) => {
  const { songName, artist, image } = props;

  return (
    <div className="card">
      <img className="card__cover" src={image} alt="" />
      <h2 className="card__title">{songName}</h2>
      <p className="card__text">{artist}</p>
    </div>
  );
};

export default Card;

import React from "react";
import "./Button.scss";
const Button = (props) => {
  const { handleClick, className, text } = props;
  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;

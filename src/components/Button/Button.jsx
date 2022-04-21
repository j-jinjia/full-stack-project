import React from "react";
import "./Button.scss";
const Button = (props) => {
  const { className, link } = props;
  return <div className={className}>{link}</div>;
};

export default Button;

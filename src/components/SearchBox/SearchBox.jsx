import React from "react";
import "./SearchBox.scss";

const SearchBox = (props) => {
  const { label, searchTerm, handleInput } = props;
  return (
    <form className="search-box">
      <label htmlFor={label}></label>
      <input
        type="text"
        className="search-box__input"
        placeholder="Search by artist name"
        value={searchTerm}
        name={label}
        onInput={handleInput}
        autoFocus
        tabIndex="1"
      />
    </form>
  );
};

export default SearchBox;

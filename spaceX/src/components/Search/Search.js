import {useState} from "react";

import "./Search.css";

const Search = ({sendSearch}) => {
  const [searchBy, setSearchBy] = useState("");

  const searchHandler = (e) => {
    setSearchBy(e.target.value);
    sendSearch(e.target.value);
  };

  return (
    <div className="input-container">
      <input id="search" value={searchBy} onChange={searchHandler} required />
      <label htmlFor="search">
        <span className="search-name">Search by launch year</span>
      </label>
    </div>
  );
};

export default Search;

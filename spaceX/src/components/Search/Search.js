import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectLaunchR} from "../../reducers/selecLaunchRed";

import "./Search.css";

const Search = ({sendInputSearch, missionSelector}) => {
  const [searchBy, setSearchBy] = useState("");

  const dispatch = useDispatch();
  const launches = useSelector((state) => state.launches);

  const searchHandler = (e) => {
    const filteredData = launches.filter((launch) => {
      sendInputSearch(e.target.value);
      missionSelector(launch.mission_name);
      return launch.launch_year.includes(e.target.value);
    });

    setSearchBy(e.target.value);
    dispatch(selectLaunchR(filteredData[0]));
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

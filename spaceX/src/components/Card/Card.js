import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import "./Card.css";

const Card = ({searchBy, missionSelector}) => {
  const allLaunchData = useSelector((state) => state.launches);

  const filteredData = allLaunchData.filter((launch) =>
    launch.launch_year.includes(searchBy)
  );

  const clickHandler = (payloadId) => {
    missionSelector(payloadId);
  };

  setTimeout(() => {
    if (filteredData.length === 1) {
      missionSelector(filteredData[0].mission_name);
    }
  }, 0);

  return (
    <div className="all_cards_container">
      {filteredData.length > 0 ? (
        filteredData.map((launchData) => (
          <div
            key={launchData.mission_name}
            className="card_container"
            onClick={() => clickHandler(launchData.mission_name)}
          >
            <h1 className="card_name">{launchData.rocket.rocket_name}</h1>
            {launchData.links.mission_patch_small ? (
              <img
                src={launchData.links.mission_patch_small}
                alt="mission patch"
                width="120px"
              />
            ) : (
              <h3>No mission patch</h3>
            )}
            <p className="card_site-name">{launchData.launch_site.site_name}</p>
            <p className="card_year">{launchData.launch_year}</p>
            <Link
              to={"/details"}
              onClick={() => clickHandler(launchData.mission_name)}
              className="detail_button"
            >
              Details
            </Link>
          </div>
        ))
      ) : (
        <h1 className="no-matches">No information</h1>
      )}
    </div>
  );
};

export default Card;

import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import arrowLeft from "../../assets/arrow-left.svg";
import arrowRight from "../../assets/arrow-right.svg";

import "./Details.css";

const Details = ({sendSearch}) => {
  let launchData = useSelector((state) => state.launch);
  launchData = JSON.parse(localStorage.getItem("rocket"));

  const onClickHandler = () => {
    sendSearch("");
  };

  return (
    <div className="details_container">
      <Link to="/" className="back_btn" onClick={onClickHandler}>
        <img src={arrowLeft} alt="arrow left" />
        Back
      </Link>
      {launchData && (
        <div className="details_inner_container">
          {launchData.links.mission_patch_small && (
            <img
              src={launchData.links.mission_patch_small}
              alt="mission patch"
            />
          )}
          <div>
            <h1 className="details_name">{launchData.rocket.rocket_name}</h1>
            <div className="detail_content">
              <div className="details_number">
                <h3>
                  Flight number <span> {launchData.flight_number} </span>
                </h3>
                <p>
                  Rocket type:<span> {launchData.rocket.rocket_type}</span>{" "}
                </p>
                <p>
                  Launch site: <span> {launchData.launch_site.site_name} </span>
                </p>
                <p>
                  Launch year: <span> {launchData.launch_year} </span>
                </p>
                <p>
                  Mission was a:{" "}
                  <span>
                    {" "}
                    {launchData.launch_success ? "success" : "failure"}{" "}
                  </span>
                </p>
                {launchData.details ? (
                  <div className="detail">
                    Details: <div> {launchData.details} </div>
                  </div>
                ) : (
                  <div className="detail">
                    Details: <div> No details provided </div>
                  </div>
                )}
              </div>

              <div className="details_payload">
                <h3>Payload</h3>
                <p>
                  Customer:{" "}
                  <span>
                    {" "}
                    {
                      launchData.rocket.second_stage.payloads[0].customers[0]
                    }{" "}
                  </span>{" "}
                </p>
                <p>
                  Manufacturer:{" "}
                  <span>
                    {" "}
                    {
                      launchData.rocket.second_stage.payloads[0].manufacturer
                    }{" "}
                  </span>{" "}
                </p>
                <p>
                  Nationality:{" "}
                  <span>
                    {" "}
                    {
                      launchData.rocket.second_stage.payloads[0].nationality
                    }{" "}
                  </span>{" "}
                </p>
                <p>
                  Payload id:{" "}
                  <span>
                    {" "}
                    {launchData.rocket.second_stage.payloads[0].payload_id}{" "}
                  </span>{" "}
                </p>
                <p>
                  Payload mass:{" "}
                  <span>
                    {" "}
                    {
                      launchData.rocket.second_stage.payloads[0].payload_mass_kg
                    }{" "}
                    Kg{" "}
                  </span>{" "}
                </p>
                <p>
                  Payload type:{" "}
                  <span>
                    {" "}
                    {
                      launchData.rocket.second_stage.payloads[0].payload_type
                    }{" "}
                  </span>{" "}
                </p>
              </div>
            </div>

            <div className="details_links">
              <a
                className="more_btn"
                href={launchData.links.article_link}
                target="_blank"
                rel="noreferrer"
              >
                Read More
                <img src={arrowRight} alt="" />
              </a>
              <a
                className="wiki_btn"
                href={launchData.links.wikipedia}
                target="_blank"
                rel="noreferrer"
              >
                Wikipedia
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;

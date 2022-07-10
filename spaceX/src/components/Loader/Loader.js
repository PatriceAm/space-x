import rocket from "../../assets/rocket.svg";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="rocket-container">
      <img className="rocket" src={rocket} alt="rocket" />
    </div>
  );
};

export default Loader;

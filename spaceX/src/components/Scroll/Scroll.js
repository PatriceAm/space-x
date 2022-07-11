import "./Scroll.css";

const Scroll = ({children, filteredData}) => {
  return (
    <div className={filteredData.length < 4 ? "" : "scroll-container"}>
      {children}
    </div>
  );
};

export default Scroll;

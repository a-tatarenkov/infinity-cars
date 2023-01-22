import "./activeArrowUp.scss";
import arrow from "../../../assets/arrow-up.png";

const ActiveArrowUp = () => {
  return (
    <div className="arrow_up" onClick={() => window.scrollTo(0, 0)}>
      <img src={arrow} alt="arrow" />
    </div>
  );
};

export default ActiveArrowUp;

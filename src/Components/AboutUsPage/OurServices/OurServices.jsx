import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { conditionFilter } from "../../../actions";
import "./ourServices.scss";
import used_car from "../../../assets/used_car.png";
import new_car from "../../../assets/new_car.png";
import label from "../../../assets/label.png";

const OurServices = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="services">
        <h4>Out Service</h4>
        <div className="services-wrapper">
          <div className="services-wrapper-item">
            <img src={new_car} alt="services" />
            <h6>Buy a new car</h6>
            <Link
              to={"/car_search_results"}
              onClick={() => dispatch(conditionFilter(true))}
            ></Link>
          </div>

          <div className="services-wrapper-item">
            <img src={used_car} alt="services" />
            <h6>Buy an used car</h6>
            <Link
              to={"/car_search_results"}
              onClick={() => dispatch(conditionFilter(false))}
            ></Link>
          </div>
          <div className="services-wrapper-item">
            <img src={label} alt="services" />
            <h6>Sell my car</h6>
            <Link to={""}></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;

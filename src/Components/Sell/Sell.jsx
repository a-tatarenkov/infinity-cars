import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { carCreated } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import "./sell.scss";
import CarDetails from "./CarDetails/CarDetails";
import EngineDetails from "./EngineDetails/EngineDetails";
import Dimension from "./Dimension/Dimension";
import Features from "./Features/Features";
import Pictures from "./Pictures/Pictures";

const Sell = () => {
  const brandsData = createSelector(
    (state) => state.brands,
    (state) => state.users,
    (brands, users) => {
      return { brands, users };
    }
  );
  const car = useSelector(brandsData);
  const dispatch = useDispatch();

  const { request } = useHttp();
  console.log(car.users.login);

  const onPostCar = (e) => {
    e.preventDefault();

    request("/cars", "POST", JSON.stringify(car.brands))
      .then((res) => console.log(res, "Car Created"))
      .then(dispatch(carCreated(car.brands)))
      .catch((err) => console.log(err));
  };

  return (
    <form className="car_sell" onSubmit={(e) => onPostCar(e)}>
      {car.users.login ? <h2>Sell Your Car</h2> : null}
      {car.users.login ? (
        <View />
      ) : (
        <div className="login_notice">
          You should have an account to sell a car
          <Link to="/login"> Login Here </Link>
        </div>
      )}

      <button
        className="post_car"
        type="submit"
        style={car.users.login ? { display: "block" } : { display: "none" }}
      >
        Sell My Car
      </button>
    </form>
  );
};

const View = () => {
  return (
    <>
      <CarDetails />
      <EngineDetails />
      <Dimension />
      <Features />
      <Pictures />
    </>
  );
};

export default Sell;

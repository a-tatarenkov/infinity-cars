import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { carCreated, sellCarPosted } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import "./sell.scss";
import CarDetails from "./CarDetails/CarDetails";
import { DialogPopup } from "../MainPage/DialogWindow/DialogWindow";
import EngineDetails from "./EngineDetails/EngineDetails";
import Dimension from "./Dimension/Dimension";
import Features from "./Features/Features";
import Pictures from "./Pictures/Pictures";

const Sell = () => {
  const brandsData = createSelector(
    (state) => state.brands,
    (state) => state.users,
    (state) => state.cars.cars,
    (brands, users, cars) => {
      return { brands, users, cars };
    }
  );
  const car = useSelector(brandsData);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { request } = useHttp();
  const onPostCar = (e) => {
    e.preventDefault();
    const editable = car.cars.filter((item) => item.id === car.brands.id);

    if (editable.length === 0) {
      request("/cars", "POST", JSON.stringify(car.brands))
        .then((res) => console.log(res, "Car Created"))
        .then(dispatch(carCreated(car.brands)))
        .catch((err) => console.log(err));
      setOpen(true);
      dispatch(sellCarPosted());  
    } else {
      const id = editable[0].id;
      request(
        `/cars/${id}`,
        "PUT",
        JSON.stringify(car.brands)
      )
        .then((res) => console.log(res, "Car Updated"))
        .then(dispatch(carCreated(car.brands)))
        .catch((err) => console.log(err));
      setOpen(true);
      dispatch(sellCarPosted());
    }
  };

  return (
    <form className="car_sell" onSubmit={(e) => onPostCar(e)}>
      {car.users.login ? <h2>Sell Your Car</h2> : null}
      {car.users.login ? (
        <View open={open} />
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

const View = (props) => {
  return (
    <>
      <CarDetails />
      <EngineDetails />
      <Dimension />
      <Features />
      <Pictures />
      <DialogPopup
        title={"Car Created"}
        message={"Your Car to sell has been created"}
        link1={"Main Page"}
        link1To={"/"}
        open={props.open}
      />
    </>
  );
};

export default Sell;

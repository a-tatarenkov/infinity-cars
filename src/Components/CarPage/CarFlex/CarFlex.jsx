import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import RibbonFlag from "../RibbonFlag/RibbonFlag";
import Spinner from "../../MainPage/Spinner/Spinner";
import CarRating from "../CarRating/CarRating";
import add from "../../../assets/add.png";
import { setCarsToCompare, deleteCarToCompare } from "../../../actions";
import { DialogPopup } from "../../MainPage/DialogWindow/DialogWindow";
import "./carFlex.scss";


const FlexCar = (props) => {
  const {
    brand,
    model,
    condition,
    top,
    price,
    location,
    year,
    engine,
    seats,
    src,
    label,
    driveUnit,
    rating,
    id,
  } = props;
  const [open, setOpen] = useState(false);

  const compareCars = createSelector(
    (state) => state.data.compare,
    (state) => state.data.data,
    (compare, data) => {
      return {
        compare,
        data,
      };
    }
  );

  const deleteItem = (id) => {
    const filtered = compare.filter((item) => item.id !== id);
    dispatch(deleteCarToCompare(filtered));
  };

  const addItem = (id) => {
    const filtered = data.filter((item) => item.id === id);
    if (compare.length === 3) {
      setOpen(true);
    } else {
      dispatch(setCarsToCompare(filtered));
    }
  };

  const dispatch = useDispatch();
  const { compare, data } = useSelector(compareCars);

  const [loading, setLoading] = useState(true);
  const spinner = loading ? <Spinner /> : null;

  const clazz = engine === "Electric" ? "electric" : "";
  return (
    <li className="car_result">
      <DialogPopup
        title={"Compare Cars"}
        message={"Not more than 3 cars"}
        onClose={() => setOpen(false)}
        open={open}
      />
      {top ? <RibbonFlag label={label} /> : null}
      <div className="car_result-image">
        {spinner}
        {window.location.pathname === "/car_search_results" ? (
          <button
            className={
              compare.some((item) => item.id === id) ? "delete_car" : "add_car"
            }
            onClick={
              compare.some((item) => item.id === id)
                ? () => deleteItem(id)
                : () => addItem(id)
            }
          >
            <img src={add} alt="add" />
            <span>
              {compare.some((item) => item.id === id) ? "Remove" : "Compare"}
            </span>
          </button>
        ) : null}
        <img src={src[0]} alt="img" onLoad={() => setLoading(false)} />
      </div>
      <div className="car_result-info">
        <span className="car_result-info-condition">
          {condition ? "New" : "Used"}
        </span>
        <h3 className="car-name">
          {brand} {model}
        </h3>
        <span className="car_result-info-price">{price} $</span>
        <span className="car_result-info-location">{location}</span>
        <ul className="car_result-info-list">
          <li className="wheel-config">{driveUnit}</li>
          <li className="year">{year}</li>
          <li className={`fuel-type ${clazz}`}>{engine}</li>
          <li className="seats">{seats}</li>
        </ul>
        <div className="car_result-info-rating">
          <CarRating rating={rating} />
          <span>({rating.length}Reviews)</span>
        </div>
        <Link to={`/productdetail/${id}`}></Link>
      </div>
    </li>
  );
};

export default FlexCar;

import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../MainPage/Spinner/Spinner";
import CarRating from "../CarRating/CarRating";
import remove from "../../../assets/delete.png";
import add from "../../../assets/add.png";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { setCarsToCompare, deleteCarToCompare } from "../../../actions";
import { DialogPopup } from "../../MainPage/DialogWindow/DialogWindow";
import RibbonFlag from "../RibbonFlag/RibbonFlag";
import "./carGrid.scss";

const CardGrid = (props) => {
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
    console.log(filtered);
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

  const [load, setLoad] = useState(true);

  const spinner = load ? <Spinner /> : null;
  const clazz = engine === "Electric" ? "electric" : "";
  return (
    <li
      className="grid_card"
      style={window.location.pathname === "/" ? { width: "max-content" } : null}
    >
      <DialogPopup
        title={"Compare Cars"}
        message={"Not more than 3 cars"}
        onClose={() => setOpen(false)}
        open={open}
      />
      {top ? <RibbonFlag label={label} /> : null}
      <div className="grid_card-image">
        {spinner}
        {window.location.pathname === "/compare" ? (
          <button onClick={() => deleteItem(id)}>
            <img src={remove} alt="delete" />
            <span>Remove</span>
          </button>
        ) : null}
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
        <img src={src[0]} alt="grid layout" onLoad={() => setLoad(false)} />
      </div>
      <div className="grid_card-info">
        <span className="grid_card-info-condition">
          {condition ? "New" : "Used"}
        </span>
        <h3 className="car-name-grid">
          {brand} {model}
        </h3>
        <span className="grid_card-info-price">{price} $</span>
        <span className="grid_card-info-location">{location}</span>
        <div className="grid_card-info-block">
          <ul className="grid_card-info-block-list">
            <li className="year-grid">{year}</li>
            <li className="wheel-config-grid">{driveUnit}</li>
            <li className={`fuel-type-grid ${clazz}`}>{engine}</li>
            <li className="seats-grid">{seats}</li>
          </ul>
        </div>
        <div className="grid_card-info-rating">
          <CarRating rating={rating} />
          <span>({rating.length} Reviews)</span>
        </div>
        <Link to={`/productdetail/${id}`}></Link>
      </div>
    </li>
  );
};

export default CardGrid;

import "./carGridMain.scss";
import Spinner from "../../MainPage/Spinner/Spinner";
import { useState } from "react";
import RibbonFlag from "../RibbonFlag/RibbonFlag";
import CarRating from "../CarRating/CarRating";
import { Link } from "react-router-dom";

const CarGridMain = (props) => {
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

  const [load, setLoad] = useState(true);

  const spinner = load ? <Spinner /> : null;
  const clazz = engine === "Electric" ? "electric" : "";

  return (
    <li className="grid_card_main">
      {top ? <RibbonFlag label={label} /> : null}
      <div className="grid_card_main-image">
        {spinner}
        <img src={src[0]} alt="grid layout" onLoad={() => setLoad(false)} />
      </div>
      <div className="grid_card_main-info">
        <span className="grid_card_main-info-condition">
          {condition ? "New" : "Used"}
        </span>
        <h3 className="car-name-grid">
          {brand} {model}
        </h3>
        <span className="grid_card_main-info-price">{price} $</span>
        <span className="grid_card_main-info-location">{location}</span>
        <div className="grid_card_main-info-block">
          <ul className="grid_card_main-info-block-list">
            <li className="year-grid">{year}</li>
            <li className="wheel-config-grid">{driveUnit}</li>
            <li className={`fuel-type-grid ${clazz}`}>{engine}</li>
            <li className="seats-grid">{seats}</li>
          </ul>
        </div>
        <div className="grid_card_main-info-rating">
          <CarRating rating={rating} size="small" />
          <span>({rating.length} Reviews)</span>
        </div>
        <Link to={`/productdetail/${id}`}></Link>
      </div>
    </li>
  );
};

export default CarGridMain;

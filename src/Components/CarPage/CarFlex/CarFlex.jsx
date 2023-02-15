import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import RibbonFlag from "../RibbonFlag/RibbonFlag";
import Spinner from "../../MainPage/Spinner/Spinner";
import CarRating from "../CarRating/CarRating";
import add from "../../../assets/add.png";
import compareArrow from "../../../assets/compare_arrow.png";
import like from "../../../assets/like.png";
import like_fade from "../../../assets/like-fade.png";

import {
  setCarsToCompare,
  deleteCarToCompare,
  sellCarId,
  onFilterReset,
} from "../../../actions";
import { DialogPopup } from "../../MainPage/DialogWindow/DialogWindow";
import "./carFlex.scss";
import useAddLikedCars from "../../../hooks/likedCar";
import useAddViews from "../../../hooks/addViews";
import empty from "../../../assets/empty-car.png";

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
    user,
  } = props;
  const [open, setOpen] = useState(false);

  const compareCars = createSelector(
    (state) => state.data.compare,
    (state) => state.data.data,
    (state) => state.cars.cars,
    (compare, data, cars) => {
      return {
        compare,
        data,
        cars: cars.filter((item) => item.id === id)[0],
      };
    }
  );
  const dispatch = useDispatch();
  const { compare, data, cars } = useSelector(compareCars);
  const { addLikedCar, deleteLikedCar } = useAddLikedCars();
  const { requestViews } = useAddViews();
  const [image, setImage] = useState(null);

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
  useEffect(() => {
    const picture = new Image();
    picture.src = src[0];
    picture.onload = () => {
      setImage(src[0]);
    };
  }, []);

  const stars = rating.length !== 0 ? rating.map((item) => item.stared) : [];

  const clazz = engine === "Electric" ? "electric" : "";
  return (
    <li className="car_result">
      {user && user !== null ? (
        <button
          className={
            user.likedCars.some((item) => item === id) ? "like_btn" : "fade_btn"
          }
          onClick={() => {
            return user.likedCars.some((item) => item === id)
              ? deleteLikedCar(id, user)
              : addLikedCar(id, user);
          }}
        >
          <img
            src={user.likedCars.includes(id) ? like : like_fade}
            alt="like"
            height={20}
            width={20}
          />
        </button>
      ) : null}
      <DialogPopup
        title={"Compare Cars"}
        message={"Not more than 3 cars"}
        onClose={() => setOpen(false)}
        open={open}
        link1={"Close"}
      />
      {top ? <RibbonFlag label={label} /> : null}
      <div className="car_result-image">
        {window.location.pathname === "/car_search_results" ? (
          <>
            <button
              className={
                compare.some((item) => item.id === id)
                  ? "delete_car"
                  : "add_car"
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
            <button
              onClick={() => dispatch(onFilterReset())}
              className={
                compare.some((item) => item.id === id)
                  ? `link_to_compare down`
                  : "link_to_compare"
              }
            >
              <img src={compareArrow} alt="arrow" />
              <span>Compare Page</span>
              <Link to={"/compare"}></Link>
            </button>
          </>
        ) : null}
        {image ? <img src={image || empty} alt="grid layout" /> : <Spinner />}
      </div>
      <div className="car_result-info">
        <span className="car_result-info-condition">
          {condition ? "New" : "Used"}
        </span>
        <h3 className="car-name">
          {brand} {model}
        </h3>
        <span className="car_result-info-price">
          {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
        </span>
        <span className="car_result-info-location">{location}</span>
        <ul className="car_result-info-list">
          <li className="wheel-config">{driveUnit}</li>
          <li className="year">{year}</li>
          <li className={`fuel-type ${clazz}`}>{engine}</li>
          <li className="seats">{seats}</li>
        </ul>
        <div className="car_result-info-rating">
          <CarRating rating={stars} />
          <span>({stars.length}Reviews)</span>
        </div>
        <Link
          to={`/productdetail/${id}`}
          className="active_link_car"
          onClick={() => requestViews(id, cars)}
        ></Link>

        <Link
          to={`/car_review_details/${id}`}
          className="active_link_review"
          onClick={() => {
            dispatch(sellCarId(""));
          }}
        ></Link>
      </div>
    </li>
  );
};

export default FlexCar;

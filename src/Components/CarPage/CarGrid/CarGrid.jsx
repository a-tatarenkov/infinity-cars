import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../MainPage/Spinner/Spinner";
import CarRating from "../CarRating/CarRating";
import remove from "../../../assets/delete.png";
import add from "../../../assets/add.png";
import compareArrow from "../../../assets/compare_arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  setCarsToCompare,
  sellCarId,
  deleteCarToCompare,
  onFilterReset,
} from "../../../actions";
import useAddViews from "../../../hooks/addViews";
import useAddLikedCars from "../../../hooks/likedCar";
import { DialogPopup } from "../../MainPage/DialogWindow/DialogWindow";
import RibbonFlag from "../RibbonFlag/RibbonFlag";
import "./carGrid.scss";
import empty from "../../../assets/empty-car.png";
import like from "../../../assets/like.png";
import like_fade from "../../../assets/like-fade.png";

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
    to,
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
        cars: cars.filter((car) => car.id === id)[0],
      };
    }
  );

  const dispatch = useDispatch();
  const { compare, data, cars } = useSelector(compareCars);
  const { requestViews } = useAddViews();
  const { addLikedCar, deleteLikedCar } = useAddLikedCars();
  const [image, setImage] = useState(null);
  const stars = rating.length !== 0 ? rating.map((item) => item.stared) : [];

  const deleteItem = (id) => {
    const filtered = compare.filter((item) => item.id !== id);
    dispatch(deleteCarToCompare(filtered));
  };

  useEffect(() => {
    const picture = new Image();
    picture.src = src[0];
    picture.onload = () => {
      setImage(src[0]);
    };
  }, []);

  const addItem = (id) => {
    const filtered = data.filter((item) => item.id === id);
    if (compare.length === 3) {
      setOpen(true);
    } else {
      dispatch(setCarsToCompare(filtered));
    }
  };

  const clazz = engine === "Electric" ? "electric" : "";
  return (
    <li
      className="grid_card"
      style={
        window.location.pathname === "/"
          ? { width: 375 }
          : window.location.pathname === "/car_review"
          ? { width: 500, background: "#12232E" }
          : null
      }
    >
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
      <div className="grid_card-image">
        {window.location.pathname === "/compare" ? (
          <button onClick={() => deleteItem(id)}>
            <img src={remove} alt="delete" />
            <span>Remove</span>
          </button>
        ) : null}
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
              className={
                compare.some((item) => item.id === id)
                  ? `link_to_compare down`
                  : "link_to_compare"
              }
            >
              <img src={compareArrow} alt="arrow" />
              <span>Compare Page</span>
              <Link
                to="/compare"
                onClick={() => dispatch(onFilterReset())}
              ></Link>
            </button>
          </>
        ) : null}
        {image ? <img src={image || empty} alt="grid layout" /> : <Spinner />}
      </div>
      <div className="grid_card-info">
        <span className="grid_card-info-condition">
          {condition ? "New" : "Used"}
        </span>
        <h3 className="car-name-grid">
          {brand} {model}
        </h3>
        <span className="grid_card-info-price">
          {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
        </span>
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
          <CarRating rating={stars} />
          <span>({stars.length} Reviews)</span>
        </div>
        {window.location.pathname !== "/car_review" ? (
          <Link
            to={`/productdetail/${id}`}
            className="active_link_car"
            onClick={() => requestViews(id, cars)}
          ></Link>
        ) : (
          <Link
            to={to ? to : `/productdetail/${id}`}
            className="active_link_car"
          ></Link>
        )}
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

export default CardGrid;

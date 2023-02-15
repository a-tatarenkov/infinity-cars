import CarRating from "../../CarPage/CarRating/CarRating";
import compareArrow from "../../../assets/compare_arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { setCarsToCompare, deleteCarToCompare } from "../../../actions";
import { useState } from "react";
import "./sideInfo.scss";
import { Link } from "react-router-dom";

const FullCarSide = (props) => {
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
  const [_, setOpen] = useState(false);

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

  const {
    "Car Details": details,
    Engine,
    "Battery and Charging": battery,
    Dimension,
  } = props.details;

  const rating = props.rating;

  const stars = rating.length !== 0 ? rating.map((item) => item.stared) : [];

  return (
    <div className="side_info_wrapper">
      <h2 className="side_info_wrapper-price">{props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $</h2>
      <div className="side_info_wrapper-info">
        <table className="side_info_wrapper-info-details">
          <thead>
            <tr>
              <th colSpan="2">Car Details</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(details).map(([key, value], i) => (
              <tr key={i}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="car-engine side_info_wrapper-info-engine">
          <thead>
            <tr>
              <th colSpan="2">Engine</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(Engine).map(([key, value], i) => (
              <tr key={i}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {Engine["Fuel Type"] === "Electric" ? (
          <Table battery={battery} />
        ) : null}

        <table className="car-dimension side_info_wrapper-info-dimension">
          <thead>
            <tr>
              <th colSpan="2">Dimension</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(Dimension).map(([key, value], i) => (
              <tr key={i}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="full_car_rating">
          <CarRating rating={stars} />
          <span>({rating.length}Reviews)</span>
          <Link to={`/car_review_details/${props.id}`}></Link>
        </div>
        <div className="compare_cars_button">
          <button
            className={
              compare.some((item) => item.id === props.id) ? "red" : "green"
            }
            onClick={
              compare.some((item) => item.id === props.id)
                ? () => deleteItem(props.id)
                : () => addItem(props.id)
            }
          >
            <img src={compareArrow} alt="compare" />
            {compare.some((item) => item.id === props.id)
              ? "Remove Car"
              : "Compare Car"}
          </button>
          <button
            className={
              compare.some((item) => item.id === props.id)
                ? "to_compare_page active"
                : "to_compare_page"
            }
          >
            <img src={compareArrow} alt="compare" />
            <Link to={"/compare"} className="compare_link"></Link>
            <span>Compare Page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Table = (props) => {
  const { battery } = props;

  return (
    <table className="car-battery side_info_wrapper-info-battery">
      <thead>
        <tr>
          <th colSpan="2">Battery and Charging</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(battery).map(([key, value], i) => (
          <tr key={i}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FullCarSide;

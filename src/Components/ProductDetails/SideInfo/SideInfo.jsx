import CarRating from "../../CarPage/CarRating/CarRating";
import compareArrow from "../../../assets/compare_arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { setCarsToCompare, deleteCarToCompare } from "../../../actions";
import { useState } from "react";
import "./sideInfo.scss";

const FullCarSide = ({ info }) => {
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
  const [open, setOpen] = useState(false);

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

  const {
    "Car Details": details,
    Engine,
    "Battery and Charging": battery,
    Dimension,
  } = info[0].details;
  const { rating } = info[0];
  console.log(info);

  return (
    <div className="side_info_wrapper">
      <h2 className="side_info_wrapper-price">{info[0].price} $</h2>
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

        {battery ? <Table battery={battery} /> : null}

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
          <CarRating rating={rating} />
          <span>({rating.length}Reviews)</span>
        </div>
        <div className="compare_cars_button">
          <button
            className={
              compare.some((item) => item.id === info[0].id) ? "red" : "green"
            }
            onClick={
              compare.some((item) => item.id === info[0].id)
                ? () => deleteItem(info[0].id)
                : () => addItem(info[0].id)
            }
          >
            <img src={compareArrow} alt="compare" />
            {compare.some((item) => item.id === info[0].id)
              ? "Remove Car"
              : "Compare Car"}
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

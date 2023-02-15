import Dealer from "../Dealer/Dealer";
import { useState } from "react";
import FullCarForm from "../ProductForm/ProductForm";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import CarMap from "../CarMap/CarMap";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import "./productDetailsCenter.scss";

const FullCarCenter = (props) => {
  const [showMore, setShowMore] = useState(false);
  const [itemsToShow, setShowMoreList] = useState(7);
  const data = createSelector(
    (state) => state.data,
    (data) => {
      return {
        data: data.brands.locations,
      };
    }
  );


  const locationData = useSelector(data);
  const cityIndex = locationData.data[props.location]
    .map((item) => Object.entries(item))
    .flat(2)
    .indexOf(props.city);
  const gps = locationData.data[props.location]
    .map((item) => Object.entries(item))
    .flat(2)[cityIndex + 1];

  const [lat, lng] = gps.split(",");

  return (
    <div className="full_car_center">
      <h3>Description</h3>
      <div className="full_car_center-description">
        {props.description}
        {showMore ? props.description : `${props.description.slice(0, 10)}...`}
      </div>
      <div>
        <button
          className="show-more-btn"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
      <div className="full_car_center-futures">
        <h3>Features</h3>
        <ul className="full_car_center-futures-list">
          {Object.keys(props.details.Futures)
            .slice(0, itemsToShow)
            .map((item, i) => {
              return (
                <li key={i} className="full_car_center-futures-list-item">
                  <CheckBoxIcon /> {item}
                </li>
              );
            })}
        </ul>
        <div>
          {itemsToShow === 7 ? (
            <button
              className="show-more-btn"
              onClick={() =>
                setShowMoreList(Object.keys(props.details.Futures).length)
              }
            >
              Show More
            </button>
          ) : (
            <button
              className="show-more-btn"
              onClick={() => setShowMoreList(7)}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
      <Dealer data={props.dealer} user={props.user} sellerId={props.sellerId}/>
      <FullCarForm
        sellerId={props.sellerId}
        brand={props.brand}
        id={props.id}
        model={props.model}
      />
      <CarMap lat={lat} lng={lng} location={props.location} city={props.city} />
    </div>
  );
};

export default FullCarCenter;

import Dealer from "../Dealer/Dealer";
import { useState } from "react";
import FullCarForm from "../ProductForm/ProductForm";

import "./productDetailsCenter.scss";

const FullCarCenter = ({ data }) => {
  const { description, dealer, details } = data[0];
  const [showMore, setShowMore] = useState(false);
  const [itemsToShow, setShowMoreList] = useState(7);

  const showMoreListItems = () => {
    setShowMoreList(Object.keys(details.Futures).length);
  };

  const showLess = () => {
    setShowMoreList(7);
  };

  return (
    <div className="full_car_center">
      <h3>Description</h3>
      <div className="full_car_center-description">
        {description}
        {showMore ? description : `${description.slice(0, 10)}...`}
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
          {Object.keys(details.Futures)
            .slice(0, itemsToShow)
            .map((item, i) => {
              return (
                <li key={i} className="full_car_center-futures-list-item">
                  {item}
                </li>
              );
            })}
        </ul>
        <div>
          {itemsToShow === 7 ? (
            <button className="show-more-btn" onClick={showMoreListItems}>
              Show More
            </button>
          ) : (
            <button className="show-more-btn" onClick={showLess}>
              Show Less
            </button>
          )}
        </div>
      </div>
      <Dealer data={dealer} />
      <FullCarForm />
    </div>
  );
};

export default FullCarCenter;

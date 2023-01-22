import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import car from "../../../assets/compare.png";
import CardGrid from "../../CarPage/CarGrid/CarGrid";

import "./compareCars.scss";

const CompareCarPage = () => {
  const compareCars = createSelector(
    (state) => state.data.compare,
    (compare) => {
      return {
        compare,
      };
    }
  );

  const { compare } = useSelector(compareCars);

  return (
    <div className="compare_car_page">
      <ul className="compare_car_page-list">
        {compare.length >= 1
          ? compare.map((item) => {
              return <CardGrid {...item} key={item.id} />;
            })
          : null}
        {compare.length === 3 ? null : <BlindCard />}
      </ul>
    </div>
  );
};

const BlindCard = () => {
  return (
    <li className="blind_card">
      <img src={car} alt="car" />
      <span>Add car to compare</span>
      <Link to={"/car_search_results"}></Link>
    </li>
  );
};

export default CompareCarPage;

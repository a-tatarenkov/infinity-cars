import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { createSelector } from "reselect";
import { recommendedFilter } from "../../../actions";
import Spinner from "../Spinner/Spinner";
import CarGridMain from "../../CarPage/CarGridMain/CarGridMain";
import "./recommendedCars.scss";

const RecommendedCars = () => {
  const filteredCarsSelector = createSelector(
    (state) => state.filters,
    (state) => state.cars.cars,
    (filter, cars) => {
      if (filter.recommendedCondition === true) {
        return cars.filter(
          (item) => item.condition === filter.recommendedCondition
        );
      }
      if (filter.recommendedCondition === false) {
        return cars.filter(
          (item) => item.condition === filter.recommendedCondition
        );
      }
    }
  );

  const activeFilter = useSelector(
    (state) => state.filters.recommendedCondition
  );
  const carsLoadingStatus = useSelector(
    (state) => state.cars.carsLoadingStatus
  );
  const filteredCars = useSelector(filteredCarsSelector);

  const dispatch = useDispatch();

  if (carsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (carsLoadingStatus === "error") {
    return <h5>Error</h5>;
  }

  const renderCarList = (arr) => {
    return (
      <>
        {arr.slice(0, 3).map((item) => {
          return <CarGridMain {...item} id={item.id} key={item.id} />;
        })}
      </>
    );
  };

  return (
    <section className="recommended">
      <h2>Recommended Cars</h2>
      <div className="recommended-selection">
        <div className="recommended-selection-buttons">
          <button
            className={activeFilter === true ? "active-select-button" : null}
            onClick={() => dispatch(recommendedFilter(true))}
          >
            New
          </button>
          <button
            className={activeFilter === false ? "active-select-button" : null}
            onClick={() => dispatch(recommendedFilter(false))}
          >
            Used
          </button>
        </div>
        <Link to="/newcars">See more</Link>
      </div>
      <TransitionGroup component={"ul"} className="recommended-list">
        {renderCarList(filteredCars)}
      </TransitionGroup>
    </section>
  );
};

export default RecommendedCars;

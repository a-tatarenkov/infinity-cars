import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { recommendedFilter, conditionFilter } from "../../../actions";
import { useObserver } from "../../../hooks/useObserver";
import CarGridMain from "../../CarPage/CarGridMain/CarGridMain";
import "./recommendedCars.scss";
import arrow from "../../../assets/arrow-main.png";

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
  const { visible, refContainer } = useObserver();
  const filteredCars = useSelector(filteredCarsSelector);
  const dispatch = useDispatch();


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
    <section
      className={visible ? "recommended" : "recommended fade"}
      ref={refContainer}
    >
      <h2>Recommended Cars</h2>
      <div className="recommended-selection">
        <div className="recommended-selection-buttons">
          <button
            className={activeFilter === true ? "active-select-button" : null}
            onClick={() => {
              dispatch(recommendedFilter(true));
              dispatch(conditionFilter(true));
            }}
          >
            New
          </button>
          <button
            className={activeFilter === false ? "active-select-button" : null}
            onClick={() => {
              dispatch(recommendedFilter(false));
              dispatch(conditionFilter(false));
            }}
          >
            Used
          </button>
        </div>
        <Link to="/car_search_results">
          <span>See more</span> <img src={arrow} alt="" />
        </Link>
      </div>
      <ul className="recommended-list">{renderCarList(filteredCars)}</ul>
    </section>
  );
};

export default RecommendedCars;

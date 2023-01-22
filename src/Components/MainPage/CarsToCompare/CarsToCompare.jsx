import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { fetchCarsData,setCarsToCompare } from "../../../actions";
import { useHttp } from "../../../hooks/http.hook";
import CardGrid from "../../CarPage/CarGrid/CarGrid";
import "./carsToCompare.scss";

const CarsToCompare = () => {
  const compareCars = createSelector(
    (state) => state.data.data,
    (state) => state.data.compare,
    (data, compare) => {
      return {
        data,
        compare,
      };
    }
  );

  const dispatch = useDispatch();
  const { data, compare } = useSelector(compareCars);
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchCarsData(request));
    // eslint-disable-next-line
  }, []);

  const renderCarList = (arr) => {
    return (
      <>
        {arr.slice(0, 2).map((item) => {
          return <CardGrid {...item} id={item.id} key={item.id} />;
        })}
      </>
    );
  };

  return (
    <div className="cars_to_compare">
      <h2>Compare Cars</h2>
      <ul className="cars_to_compare-list">
        {compare.length > 1 ? renderCarList(compare) : renderCarList(data)}
      </ul>
      <button className="cars_to_compare-button">
        <Link
          to={"/compare"}
          onClick={compare.length === 0 ? () => dispatch(setCarsToCompare(([data[0], data[1]]).flat())) : null}
        >
          Compare Cars
        </Link>
      </button>
    </div>
  );
};

export default CarsToCompare;

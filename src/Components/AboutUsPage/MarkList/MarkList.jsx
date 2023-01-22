import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { brandFilter } from "../../../actions";
import { Link } from "react-router-dom";
import "./markList.scss";

const MarkList = () => {
  const carLogos = createSelector(
    (state) => state.cars.cars,
    (cars) => cars
  );

  const logos = useSelector(carLogos);

  const dispatch = useDispatch();

  const brands = Array.from(new Set(logos.map((item) => item.brand)));
  const brandLogo = Array.from(new Set(logos.map((item) => item.logo)));

  return (
    <div className="brands_list">
      <ul className="brands_list-list">
        {brandLogo.map((item, i) => {
          return (
            <li key={item} className='brands_list-list-item' onClick={() => dispatch(brandFilter(brands[i]))}>
              <img src={item} alt="logos" />
              <Link to={'/car_search_results'}></Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MarkList;

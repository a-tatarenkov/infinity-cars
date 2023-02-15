import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { brandFilter } from "../../../actions";
import { Link } from "react-router-dom";
import "./markList.scss";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const MarkList = () => {
  const carLogos = createSelector(
    (state) => state.cars.cars,
    (cars) => cars
  );

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 1)",
      boxShadow: theme.shadows[1],
      fontSize: 15,
    },
  }));

  const logos = useSelector(carLogos);

  const dispatch = useDispatch();

  const brands = Array.from(new Set(logos.map((item) => item.brand)));
  const brandLogo = Array.from(new Set(logos.map((item) => item.logo)));

  return (
    <div className="brands_list">
      <div className="brands_list-list">
        {brandLogo.map((item, i) => {
          return (
            <LightTooltip title={brands[i]} key={item}>
              <div
                className="brands_list-list-item"
                onClick={() => dispatch(brandFilter(brands[i]))}
              >
                <img src={item} alt="logos" />
                <Link to={"/car_search_results"}></Link>
              </div>
            </LightTooltip>
          );
        })}
      </div>
    </div>
  );
};

export default MarkList;

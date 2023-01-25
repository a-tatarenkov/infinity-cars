import { createSelector } from "reselect";
import { useSelector } from "react-redux";

import "./banner.scss";

const Banner = () => {
  const filter = createSelector(
    (state) => state.filters,
    (filters) => filters
  );

  const { condition } = useSelector(filter);

  const locationBanner = (data) => {
    switch (data) {
      case "":
        return "Search Results";
      case true:
        return "New Cars";
      case false:
        return "Used Cars";
      default:
        return "";
    }
  };

  const style = {
    background: "transparent",
  };

  return (
    <div
      className="cars_banner"
      style={window.location.pathname === "/compare" ? style : null}
    >
      <h2>{window.location.pathname !== '/compare' ? locationBanner(condition) : 'Compare'}</h2>
    </div>
  );
};

export default Banner;

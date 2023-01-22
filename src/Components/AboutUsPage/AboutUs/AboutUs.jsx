import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import staticData from "../../../data/staticData";
import "./aboutUs.scss";

const AboutUs = () => {
  const cars = createSelector(
    (state) => state.cars.cars,
    (cars) => cars
  );

  const totalCars = useSelector(cars);
  const { info, image } = staticData.aboutUs;

  return (
    <div className="about_us">
      <h2>About Us</h2>
      <div className="about_us-info">
        <div className="about_us-info-left">
          <p>{info}</p>
          <ul className="about_us-info-left-list">
            <li>
              <span className="number">{totalCars.length}</span>
              <span className="text">Vehicle In Stock</span>
            </li>
            <li>
              <span className="number">{3}</span>
              <span className="text">Sold Car</span>
            </li>
            <li>
              <span className="number">{3}</span>
              <span className="text">Happy Customer</span>
            </li>
            <li>
              <span className="number">{3}</span>
              <span className="text">Awards</span>
            </li>
          </ul>
        </div>

        <div className="about_us-info-image">
          <img src={image} alt="about_us" />
        </div>
      </div>
    </div>
  );
};

export const AboutUsTop = () => {
  const { infoPage, pageImage } = staticData.aboutUs;

  return (
    <div className="about_us_page-top">
      <h1>About Us</h1>
      <p>{infoPage}</p>
      <span>June, 01 2020 </span>
      <img src={pageImage} alt="" />
    </div>
  );
};

export default AboutUs;

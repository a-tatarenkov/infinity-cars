import "./slider.scss";
import { useState, Fragment } from "react";
import Spinner from "../../MainPage/Spinner/Spinner";
import VisibilityIcon from '@mui/icons-material/Visibility';


const Slider = ({ data, view }) => {
  const images = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [load, setLoad] = useState(true);

  const goPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  const activeMini = {
    border: "1px solid rgb(32, 92, 255)",
    boxShadow: "0 0 10px 5px rgba(0,0,0,0.4)",
    transform: "scale(1)",
  };

  const spinner = load ? <Spinner /> : null;

  return (
    <div className="full_car_slider">
      <div className="full_car_slider-right" onClick={goNext}></div>
      <div className="full_car_slider-left" onClick={goPrev}></div>
      <div className="full_car_slider-views">
         <VisibilityIcon /> &nbsp;&nbsp;   {view} views
      </div>
      <div
        className="full_car_slider-slider"
        style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
      >
        {images.map((image, index) => (
          <div
            className="full_car_slider-slider-slide"
            key={index}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <div className="full_car_slider-dots">
        {images.map((slide, index) => (
          <Fragment key={index}>
            {spinner}
            <img
              key={slide}
              src={slide}
              alt="mini slide"
              onLoad={() => setLoad(false)}
              onClick={() => goToSlide(index)}
              style={index === currentIndex ? activeMini : null}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Slider;

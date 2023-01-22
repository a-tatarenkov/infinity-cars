import { useState, useEffect, useRef } from "react";
import "./mainSlide.scss";
import staticData from '../../../data/staticData'

const Slideshow = () => {
  const { mainSlide } = staticData;

  const delay = 4500;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === mainSlide.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {mainSlide.map((item, index) => (
          <div
            className="slide"
            key={index}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <h2 className="main-slide-description">{item.description}</h2>
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {mainSlide.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;

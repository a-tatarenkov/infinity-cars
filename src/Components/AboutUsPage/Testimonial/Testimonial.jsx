import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useEffect, useRef, useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { fetchComments } from "../../../actions";
import { useObserver } from "../../../hooks/useObserver";
import "./testimonial.scss";

const Testimonial = () => {
  const commentsData = createSelector(
    (state) => state.comments.comments,
    (comments) => {
      return {
        comments,
      };
    }
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { visible, refContainer } = useObserver();
  const { comments } = useSelector(commentsData);
  const timeoutRef = useRef(null);
  const delay = 4500;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(
    () => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setCurrentIndex((prevIndex) =>
            prevIndex === comments.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
      return () => {
        resetTimeout();
      };
    },
    // eslint-disable-next-line
    [currentIndex]
  );

  useEffect(() => {
    dispatch(fetchComments(request));
    // eslint-disable-next-line
  }, []);

  return (
    <div className={visible ? "comments" : "comments fade"} ref={refContainer}>
      <h2>Testimonial</h2>
      <ul
        className="comments-slider"
        style={{
          transform: `translate3d(${
            -currentIndex * 1000 - currentIndex * 55
          }px, 0, 0)`,
          width: comments.length * 100 + "%",
        }}
      >
        {comments.map((item, i) => {
          return (
            <li
              onClick={() => setCurrentIndex(i)}
              className={
                currentIndex === i
                  ? "comments-slider-slide_slide active_slide"
                  : "comments-slider-slide_slide"
              }
              key={item.id}
            >
              <img src={item.photo} alt="" />
              <div className="slide-description">
                <span className="slider-costumer-name">{item.name}</span>
                <span className="slider-costumer-title">Costumer</span>
                <p>{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Testimonial;

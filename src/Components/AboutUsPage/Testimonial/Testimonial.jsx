import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { fetchComments } from "../../../actions";
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

  const [currentIndex, setCurrentIndex] = useState(1);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { comments } = useSelector(commentsData);

  useEffect(() => {
    dispatch(fetchComments(request));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="comments">
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

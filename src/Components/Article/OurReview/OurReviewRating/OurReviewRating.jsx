import "./ourReviewRating.scss";
import star from "../../../../assets/star.png";
import { CarReviewRating } from "../../CarReview/CarReviewRating/CarReviewRating";

const OurReviewRating = (props) => {
  const { rating,price } = props;
  const keys = [];
  keys.push(rating.map((item) => Object.keys(item.stared))[0]);
  const avr = (chapter) => {
    return (
      rating
        .map((item) => item.stared[chapter])
        .reduce((acc, item) => acc + item, 0) /
      rating.map((item) => item.stared[chapter]).length
    );
  };
  return (
    <div className="our_review_rating">
        <span className="avr_price">
{price}
        </span>
      {rating.length === 0 ? (
        <h3>No reviews yet</h3>
      ) : (
        <div className="car_rating_info-rating">
          <div className="car_rating_info-rating-star">
            <img src={star} alt="star" />
            <span className="car_rating_info-rating-star-span">
              {rating.length} Reviews
            </span>
          </div>
          <div className="car_rating_info-rating-values">
            {keys.flat().map((item) => (
              <div key={item} className="single_rating">
                <span className="single_rating-span">{item}</span>
                <CarReviewRating value={avr(item)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OurReviewRating;

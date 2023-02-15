import "./ourReviews.scss";
import CarGridMain from "../../CarPage/CarGridMain/CarGridMain";

const OurReviews = (props) => {
  const reviews = props.cars.filter((item) => item.review).slice(0, 3);

  return (
    <ul className="our_reviews">
      {reviews.map((item) => (
        <CarGridMain
          {...item}
          to={`/our_review_details/${item.id}`}
          key={item.id}
        />
      ))}
    </ul>
  );
};

export default OurReviews;

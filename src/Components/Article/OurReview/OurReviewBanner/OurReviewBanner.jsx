import "../../CarReview/Banner/carReviewBanner.scss";

export const OurReviewBanner = (props) => {
  return (
    <>
      <h2 className="car_review_banner">
        {props.brand} {props.model}
      </h2>
    </>
  );
};

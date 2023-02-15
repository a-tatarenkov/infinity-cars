import "../../Banner/carReviewBanner.scss";

export const CarReviewBanner = (props) => {
  const carName = `${props.brand}  ${props.model}`;
  return (
    <h2
      className="car_review_banner"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        paddingRight: 100,
      }}
    >
      {carName} <span className="car_rev_price">$ {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
    </h2>
  );
};

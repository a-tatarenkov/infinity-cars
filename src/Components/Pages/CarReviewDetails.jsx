import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { CarReviewBanner } from "../Article/CarReview/CarReviewDetails/CarRatingBanner/CarRatingBanner";
import { CarReviewImage } from "../Article/CarReview/CarReviewDetails/CarReviewImage/CarReviewImage";
import { CarReviewList } from "../Article/CarReview/CarReviewList/CarReviewList";
import { AddReviewForm } from "../Article/CarReview/CarReviewDetails/AddReviewForm/AddReviewForm";

const CarReviewDetails = () => {
  const selectedCar = createSelector(
    (state) => state.cars.cars,
    (cars) => {
      return {
        cars,
      };
    }
  );
  const filteredData = useSelector(selectedCar);

  const { carID } = useParams();
  const data = filteredData.cars.filter((item) => item.id === +carID)[0];

  return (
    <main>
      <CarReviewBanner brand={data.brand} model={data.model}  price={data.price}/>
      <CarReviewImage src={data.src} rating={data.rating}  />
      <CarReviewList rating={data.rating} carId={carID} />
      <AddReviewForm id={data.id}/>
    </main>
  );
};

export default CarReviewDetails;

import { OurReviewBanner } from "../Article/OurReview/OurReviewBanner/OurReviewBanner";
import OurReviewVideo from "../Article/OurReview/OurReviewVideo/OurReviewVideo";
import OurReviewRating from "../Article/OurReview/OurReviewRating/OurReviewRating";
import OurReviewDetails from "../Article/OurReview/OurReviewDetails/OurReviewDetails";
import OurReviewExpert from "../Article/OurReview/OurReviewExpert/OurReviewExpert";
import OurReviewComments from "../Article/OurReview/OurReviewComments/OurReviewComments";
import CreateComment from "../Article/OurReview/CreateComment/CreateComment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
const OurReviewsPage = () => {
  const selectedCar = createSelector(
    (state) => state.cars.cars,
    (state) => state.users,
    (cars,users) => {
      return {
        cars,
        users,
      }; 
    }
  );
  const filteredData = useSelector(selectedCar);

  const { carId } = useParams();

  const data = filteredData.cars.filter((item) => item.id === +carId)[0];

  return (
    <main>
      <OurReviewBanner brand={data.brand} model={data.model} />
      <OurReviewVideo video={data.review.video} poster={data.review.img}/>
      <OurReviewRating rating={data.rating} price={data.review.price} />
      <OurReviewDetails data={data.review} />
      <OurReviewExpert data={data.review.expert} />
      <OurReviewComments data={data.review.comments} currentCar={data}  user={filteredData.users.login ? filteredData.users.currentUser[0] : null}/>
      <CreateComment car={data}
        user={filteredData.users.login ? filteredData.users.currentUser[0] : null}
      />
    </main>
  );
};

export default OurReviewsPage;

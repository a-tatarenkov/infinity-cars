import "./ourReviewComments.scss";
import deleteIcon from "../../../../assets/delete.png";
import { useHttp } from "../../../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { fetchCars } from "../../../../actions";

const OurReviewComments = (props) => {
  const { request } = useHttp();
  const dispatch = useDispatch();

  const onDeletePost = (id) => {
    const currentCar = props.currentCar;
    const commentsToReturn = props.currentCar.review.comments.filter(
      (item) => item.id !== id
    );

    currentCar.review.comments = commentsToReturn;

    request(
      `/cars/${currentCar.id}`,
      "PUT",
      JSON.stringify(currentCar)
    ).catch((err) => console.log(err));
    dispatch(fetchCars(request));
  };

  return (
    <div className="our_review_comments">
      <span className="news_comments-quantity">
        {props.data.length} Comments
      </span>

      <div className="news_comments-list">
        {props.data.length !== 0
          ? props.data.map((item) => (
              <div className="news_comments-list-item" key={item.id}>
                <img
                  src={item.photo}
                  alt="comment user"
                  className="news_comments-list-item-image"
                />
                <div className="news_comments-list-item-text">
                  <span>{item.name}</span>
                  <p>{item.text}</p>
                </div>
                {props.user && item.userId === props.user.id ? (
                  <button
                    className="deletePost"
                    onClick={() => onDeletePost(item.id)}
                  >
                    <img src={deleteIcon} alt="delete" />
                  </button>
                ) : null}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default OurReviewComments;

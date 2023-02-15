import "./createComment.scss";
import { v4 } from "uuid";
import { useHttp } from "../../../../hooks/http.hook";
import { fetchCars } from "../../../../actions";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CreateComment = (props) => {
  const [text, setText] = useState("");
  const { request } = useHttp();
  const dispatch = useDispatch();

  const onSendNewComment = (e) => {
    e.preventDefault();
    const newComment = {
      name: props.user.name,
      photo: props.user.photo,
      text,
      id: v4(),
      userId: props.user.id,
    };

    const currentCar = props.car;

    currentCar.review.comments = [...currentCar.review.comments, newComment];

    request(
      `/cars/${currentCar.id}`,
      "PUT",
      JSON.stringify(currentCar)
    ).catch((err) => console.log(err));

    dispatch(fetchCars(request));
    setText("");
  };

  return (
    <div className="comments_post_reviews">
      <span className="comments_post_reviews-sign">Comment</span>
      <form className="comments_post_reviews-form" onSubmit={onSendNewComment}>
        <textarea
          cols="30"
          rows="8"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a comment here"
        ></textarea>
        <button
          type="submit"
          className={props.user === null ? "disabled" : ""}
          disabled={props.user === null ? true : false}
        >
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default CreateComment;

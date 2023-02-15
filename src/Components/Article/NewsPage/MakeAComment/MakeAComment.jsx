import { useState } from "react";
import { useDispatch } from "react-redux";
import "./makeAComment.scss";
import { v4 } from "uuid";
import { useHttp } from "../../../../hooks/http.hook";
import { fetchNews } from "../../../../actions";

const MakeAComment = (props) => {
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

    const currentNews = props.news;

    currentNews.comments = [...currentNews.comments, newComment];

    request(
      `/news/${currentNews.id}`,
      "PUT",
      JSON.stringify(currentNews)
    ).catch((err) => console.log(err));

    dispatch(fetchNews(request));
    setText("");
  };

  return (
    <div className="comments_post">
      <span className="comments_post-sign">Comment</span>
      <form className="comments_post-form" onSubmit={onSendNewComment}>
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

export default MakeAComment;

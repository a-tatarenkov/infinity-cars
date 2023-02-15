import "./newsComments.scss";
import deleteIcon from "../../../../assets/delete.png";
import { useHttp } from "../../../../hooks/http.hook";
import { useDispatch } from "react-redux";
import { fetchNews } from "../../../../actions";

const NewsComments = (props) => {
  const { request } = useHttp();
  const dispatch = useDispatch();

  const onDeletePost = (id) => {
    const currentNews = props.currentNews;
    const commentsToReturn = props.currentNews.comments.filter(
      (item) => item.id !== id
    );

    currentNews.comments = commentsToReturn;

    request(
      `/news/${currentNews.id}`,
      "PUT",
      JSON.stringify(currentNews)
    ).catch((err) => console.log(err));
    dispatch(fetchNews(request));
  };

  return (
    <div className="news_comments">
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

export default NewsComments;

import "./latestNews.scss";
import { Link } from "react-router-dom";
import Spinner from "../../../MainPage/Spinner/Spinner";
import { useState } from "react";

const LatestNews = (props) => {
  const [loading, setLoading] = useState(true);

  const numToDate = (num) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Nov",
      "Dec",
    ];

    const date = new Date(num);
    return `${
      months[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()} `;
  };

  const load = loading ? <Spinner /> : null;

  return (
    <>
      {props.news ? (
        <div className="latest_news">
          <h3>Latest News</h3>

          <div className="latest_news-item">
            {load}
            <img
              src={props.news.image}
              alt="news"
              onLoad={() => setLoading(false)}
            />
            <div className="date">{numToDate(props.news.time)}</div>
            <div className="wrapper">
              <span className="title">{props.news.title}</span>
              <p className="preview-text">{props.news.text}</p>
              <div className="latest_news-item-tags">
                <span className="tags">{props.news.tags}</span>
              </div>
              <div className="latest_news-expert">
                <img src={props.news.expert.photo} alt="expert" />
                <span>{props.news.expert.name}</span>
                <span className="comments">
                  {props.news.comments.length} &nbsp; Comments
                </span>
              </div>
            </div>

            <Link to={`/news/${props.news.id}`}></Link>
          </div>
        </div>
      ) : (
        load
      )}
    </>
  );
};

export default LatestNews;

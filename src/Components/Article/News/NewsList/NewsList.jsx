import "./newsList.scss";
import NewsSearch from "../NewsSearch/NewsSearch";
import { Link } from "react-router-dom";
import Spinner from "../../../MainPage/Spinner/Spinner";
import { useState } from "react";




const NewsList = (props) => {
  const [newsTags, setNewsTags] = useState([]);


  const onSetNewTags = (e) => {
    if (newsTags.includes(e.target.value)) {
      setNewsTags(newsTags.filter((item) => item !== e.target.value));
    } else {
      setNewsTags((prevState) => [...prevState, e.target.value]);
    }
  };

  const filtered = () => {
    return newsTags.length !== 0
      ? props.news.filter(item => newsTags.includes(item.tags[0]))
      : props.news;
  };
  const newsToShow = filtered();


  return (
    <div className="news_list">
      {props.news ? (
        <div className="news_list-items">
          {newsToShow.map((item) => (
            <div className="news_item" key={item.id}>
              <Link to={`/news/${item.id}`}></Link>
              <div className="news_item-image">
                <img src={item.image} alt="news_image" />
              </div>
              <div className="news_item-info">
                <span className="news_title">{item.title}</span>
                <p>{item.text.slice(0, 150)}...</p>

                <div className="news_item-tags">
                  <button>{item.tags}</button>
                </div>
                <div className="news_item-expert">
                  <img src={item.expert.photo} alt="expert" />
                  <span>By {item.expert.name}</span>
                  <span className="news_comments">
                    {item.comments.length} Comments
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
      <NewsSearch
        news={props.popular}
        onClick={onSetNewTags}
        newsTags={newsTags}
      />
    </div>
  );
};

export default NewsList;

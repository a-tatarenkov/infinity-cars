import "./news.scss";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { fetchNews } from "../../../actions";

const MainPageNews = () => {
  const newsData = createSelector(
    (state) => state.news.news,
    (news) => {
      return {
        news,
      };
    }
  );

  const dispatch = useDispatch();
  const { request } = useHttp();
  const { news } = useSelector(newsData);

  useEffect(() => {
    dispatch(fetchNews(request));
    // eslint-disable-next-line
  }, []);
  const [active, setActive] = useState("news");

  return (
    <section className="news_section">
      <div className="news_select">
        <button
          value={"news"}
          className={active === "news" ? "button_active" : null}
          onClick={() => setActive("news")}
        >
          News
        </button>
        <button
          value="reviews"
          className={active === "reviews" ? "button_active" : null}
          onClick={() => setActive("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className="news">
        {news.slice(0, 3).map((item, i) => {
          return (
            <div className={`news_box-${i + 1} news_box`} key={item.id}>
              <img src={item.image} alt="title" />
              <div className="news_text_box">
                <span className="news_box-title">{item.title}</span>
                <p className="news_box-text">{item.text.slice(0, 100)}...</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MainPageNews;

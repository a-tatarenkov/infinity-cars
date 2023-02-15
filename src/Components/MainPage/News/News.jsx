import "./news.scss";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { useState } from "react";
import { useHttp } from "../../../hooks/http.hook";
import { fetchNews } from "../../../actions";
import OurReviews from "../OurReviews/OurReviews";
import { Link } from "react-router-dom";
import { useObserver } from "../../../hooks/useObserver";

const MainPageNews = () => {
  const newsData = createSelector(
    (state) => state.news.news,
    (state) => state.cars.cars,
    (news, cars) => {
      return {
        news,
        cars,
      };
    }
  );

  const dispatch = useDispatch();
  const { request } = useHttp();
  const { visible, refContainer } = useObserver();
  const { news, cars } = useSelector(newsData);


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

  useEffect(() => {
    dispatch(fetchNews(request));
    // eslint-disable-next-line
  }, []);

  const [active, setActive] = useState("news");

  return (
    <section className={visible? "news_section" : 'news_section fade'} ref={refContainer}>
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
      {active === 'news' ?       <div className="news">
        {news.slice(0, 3).map((item, i) => {
          return (
            <div className={`news_box-${i + 1} news_box`} key={item.id}>
              <Link to={`/news/${item.id}`}></Link>
              <img src={item.image} alt="title" />
              <div className="news_text_box">
                <span className="news_box-title">{item.title}</span>
                <p className="news_box-text">{item.text.slice(0, 100)}...</p>
                <div className="expert_info">
                  <img src={item.expert.photo} alt="expert" />
                  <span>By {item.expert.name}</span>
                  <span>- {numToDate(item.time)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div> :  <OurReviews cars={cars} />}
     
    </section>
  );
};

export default MainPageNews;

import "./newsSearch.scss";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import { onSetNewsTerm } from "../../../../actions";
import { useEffect } from "react";
import { useHttp } from "../../../../hooks/http.hook";
import { fetchNewsFiltered } from "../../../../actions";

const NewsSearch = (props) => {
  const newsData = createSelector(
    (state) => state.filters,
    (filters) => {
      return {
        filters,
      };
    }
  );

  const { filters } = useSelector(newsData);
  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewsFiltered(request, filters));
  }, [filters]);

  const popular = props.news.filter((item) => item.popular);

  return (
    <div className="news_search">
      <TextField
        id="news_search"
        label="Search"
        value={filters.newsTerm}
        onChange={(e) => {
          console.log(filters);
          dispatch(onSetNewsTerm(e.target.value));
        }}
        variant="outlined"
        sx={{ background: "#152836" }}
      />
      <h3>Popular News</h3>
      {popular.map((item, i) => (
        <div className="popular_news" key={i}>
          <Link to={`/news/${item.id}`}></Link>
          <img src={item.image2} alt="popular news" />
          <div className="popular_news-info">
            <span>{item.title}</span>
            <div className="expert_popular">
              <img src={item.expert.photo} alt="expert" />
              <span>By {item.expert.name}</span>
            </div>
          </div>
        </div>
      ))}
      <h3>Tags</h3>
      <div className="tags_list">
        {props.news.map((item) => (
          <button
            className={props.newsTags.includes(item.tags[0]) ? `tag active` : "tag"}
            onClick={(e) => props.onClick(e)}
            value={item.tags}
            key={v4()}
          >
            {item.tags}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsSearch;

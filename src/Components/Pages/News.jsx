import NewsBanner from "../Article/News/NewsBanner/NewsBanner";
import LatestNews from "../Article/News/LatestNews/LatestNews";
import NewsList from "../Article/News/NewsList/NewsList";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { useHttp } from "../../hooks/http.hook";
import { fetchNews } from "../../actions";
import { useEffect } from "react";
const News = () => {
  const newsData = createSelector(
    (state) => state.news.news,
    (state) => state.news.filters,
    (state) => state.news.filteredNews,
    (news, filters, filteredNews) => {
      return {
        news,
        filters: filters,
        filteredNews:filteredNews
      };
    }
  );

  const { request } = useHttp();
  const dispatch = useDispatch();
  const { news, filteredNews } = useSelector(newsData);
  const latestNews = news.sort((a, b) => b.time - a.time)[0];

  
  
  useEffect(() => {
    dispatch(fetchNews(request));
    
  }, []); 

  return (
    <main>
      <NewsBanner />
      <LatestNews news={latestNews} />
      <NewsList news={filteredNews}  popular={news}/>
    </main>
  );
};

export default News;

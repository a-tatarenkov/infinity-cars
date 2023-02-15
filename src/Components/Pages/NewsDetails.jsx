import NewsTitle from "../Article/NewsPage/NewsTitle/NewsTitle";
import NewsInfo from "../Article/NewsPage/NewsInfo/NewsInfo";
import NewsExpert from "../Article/NewsPage/NewsExpert/NewsExpert";
import NewsComments from "../Article/NewsPage/NewsComments/NewsComments";
import MakeAComment from "../Article/NewsPage/MakeAComment/MakeAComment";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const NewsDetails = () => {
  const selectedNews = createSelector(
    (state) => state.news.news,
    (state) => state.users,
    (news, users) => {
      return {
        news,
        users,
      };
    }
  );

  const news = useSelector(selectedNews);
  const { newsId } = useParams();
  const currentNews = news.news.filter((item) => item.id === newsId)[0];

  return (
    <main>
      <NewsTitle data={currentNews.title} image={currentNews.image} />
      <NewsInfo
        text={currentNews.text}
        text2={currentNews.text2}
        img={currentNews.image2}
        tags={currentNews.tags}
      />
      <NewsExpert expert={currentNews.expert} />
      <NewsComments
        data={currentNews.comments}
        currentNews={currentNews}
        user={news.users.login ? news.users.currentUser[0] : null}
      />
      <MakeAComment
        news={currentNews}
        user={news.users.login ? news.users.currentUser[0] : null}
      />
    </main>
  );
};

export default NewsDetails;

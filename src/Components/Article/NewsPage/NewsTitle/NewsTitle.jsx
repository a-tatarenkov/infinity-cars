import "./newsTitle.scss";

const NewsTitle = (props) => {
  return (
    <>
      <h2 className="news_title_page">{props.data} </h2>
      <img src={props.image} alt="car" className="news_details_image"/>
    </>
  );
};

export default NewsTitle;

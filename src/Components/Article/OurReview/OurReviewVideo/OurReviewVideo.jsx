import "./ourReviewVideo.scss";

const OurReviewVideo = (props) => {
  return (
    <div className="our_video">
      <video src={props.video} controls poster={props.poster}></video>
    </div>
  );
};

export default OurReviewVideo;

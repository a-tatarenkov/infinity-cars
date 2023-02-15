import "./ourReviewExpert.scss";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
const OurReviewExpert = (props) => {
  const { name, photo, email, phone } = props.data;
  return (
    <div className="our_review_expert">
      <div className="our_review_expert-wrapper">
        <div className="our_review_expert-wrapper-photo">
          <img src={photo} alt="dealer" />
          <div>
            <i>{name}</i>
            <i className="dealer-position">Car Expert</i>
          </div>
        </div>
        <div className="our_review_expert-wrapper-phone">
          <a href="/#"><LocalPhoneIcon  /> {phone}</a>
        </div>
        <div className="our_review_expert-wrapper-email">
          <a href="/#"><EmailIcon /> {email}</a>
        </div>
      </div>
    </div>
  );
};

export default OurReviewExpert;

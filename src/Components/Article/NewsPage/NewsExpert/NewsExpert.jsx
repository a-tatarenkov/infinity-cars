import "./newsExpert.scss";

const NewsExpert = (props) => {
  const { name, email, photo, phone } = props.expert;

  return (
    <div className="expert_info_block">
      <div className="expert_info_block-wrapper">
        <div className="expert_info_block-wrapper-photo">
          <img src={photo} alt="dealer" />
          <div>
            <b>{name}</b>
            <i className="dealer-position">News Expert</i>
          </div>
        </div>
        <div className="expert_info_block-wrapper-phone">
          <a href="/#">{phone}</a>
        </div>
        <div className="expert_info_block-wrapper-email">
          <a href="/#">{email}</a>
        </div>
      </div>
    </div>
  );
};

export default NewsExpert;

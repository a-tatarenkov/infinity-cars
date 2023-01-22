import "./dealer.scss";

const Dealer = ({ data }) => {
  const { name, dealerPhoto, position, phone, email } = data;

  return (
    <div className="dealer_info_block">
      <h3>Dealer Info</h3>
      <div className="dealer_info_block-wrapper">
        <div className="dealer_info_block-wrapper-photo">
          <img src={dealerPhoto} alt="dealer" />
          <div>
            <i>{name}</i>
            <i className="dealer-position">{position}</i>
          </div>
        </div>
        <div className="dealer_info_block-wrapper-phone">
          <a href="/#">{phone}</a>
        </div>
        <div className="dealer_info_block-wrapper-email">
          <a href="/#">{email}</a>
        </div>
      </div>
    </div>
  );
};

export default Dealer;

import "./dealer.scss";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const Dealer = (props) => {
  const { name, dealerPhoto, position, phone, email } = props.data;
  const seller = props.sellerId ? props.user.users.filter(user => user.id === props.sellerId)[0] : null;


  return (
    <>
      {seller ? (
        <div className="dealer_info_block">
          <h3>Seller Info</h3>
          <div className="dealer_info_block-wrapper">
            <div className="dealer_info_block-wrapper-photo">
              <img src={seller.photo} alt="dealer" />
              <div>
                <b>{seller.name}</b>
                <i className="dealer-position">Seller</i>
              </div>
            </div>
            <div className="dealer_info_block-wrapper-phone">
              <PhoneIcon /> <a href="/#">{seller.phone}</a>
            </div>
            <div className="dealer_info_block-wrapper-email">
              <EmailIcon /> <a href="/#">{seller.email}</a>
            </div>
          </div>
        </div>
      ) : (
        <div className="dealer_info_block">
          <h3>Dealer Info</h3>
          <div className="dealer_info_block-wrapper">
            <div className="dealer_info_block-wrapper-photo">
              <img src={dealerPhoto} alt="dealer" />
              <div>
                <b>{name}</b>
                <i className="dealer-position">{position}</i>
              </div>
            </div>
            <div className="dealer_info_block-wrapper-phone">
              <PhoneIcon /> <a href="/#">{phone}</a>
            </div>
            <div className="dealer_info_block-wrapper-email">
              <EmailIcon /> <a href="/#">{email}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dealer;

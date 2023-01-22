import { Link } from "react-router-dom";

import "./footer.scss";
import facebook from "../../assets/facebook.png";
import youtube from "../../assets/youtube.png";
import instagram from "../../assets/instagram.png";
import staticData from "../../data/staticData";

const Footer = () => {
  const { address, phone, email } = staticData.ourContacts;
  return (
    <footer>
      <div className="footer-logo"></div>
      <div className="footer-info">
        <ul className="footer-left">
          <li>
            <Link to="/about_us">ABOUT US</Link>
          </li>
          <li>
            <Link to="/">FAQ</Link>
          </li>
          <li>
            <Link to="/contacts">CONTACT</Link>
          </li>
        </ul>
        <ul className="footer-middle">
          <li>
            <Link to="/">CUSTOMER SERVICE</Link>
          </li>
          <li>
            <Link to="info@car.com">{email}</Link>
          </li>
          <li>
            <Link href="tel:240-865-3730">{phone}</Link>
          </li>
        </ul>
        <ul className="footer-right">
          <li>{address}</li>
          <li className="footer-media">
            <ul className="footer-media-list">
              <li>
                <Link href="/">
                  <img src={youtube} alt="youtube" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <img src={facebook} alt="facebook" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <img src={instagram} alt="instagram" />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">2023 Autohunt. All Rights reserved</div>
    </footer>
  );
};

export default Footer;

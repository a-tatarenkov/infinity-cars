import "./ourContacts.scss";
import staticData from "../../../data/staticData";


const OurContacts = () => {
  const {phone, email, address} = staticData.ourContacts
  return (
    <div className="our-contacts">
      <div className="contacts-top">
        <ul>
          <li className="phone-logo">Phone</li>
          <li>
            <a href={`tel:${phone}`} >{phone}</a>
          </li>
        </ul>
      </div>

      <div className="contacts-middle">
        <ul>
          <li className="email-logo">Email</li>
          <li>
            <a href={email}>{email}</a>
          </li>
        </ul>
      </div>

      <div className="contacts-bottom">
        <ul>
          <li className="address-logo">Address</li>
          <li>{address}</li>
        </ul>
      </div>
    </div>
  );
};

export default OurContacts;

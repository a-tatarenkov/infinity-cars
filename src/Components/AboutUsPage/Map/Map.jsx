import { useState } from "react";
import { DialogPopup } from "../../MainPage/DialogWindow/DialogWindow";
import staticData from '../../../data/staticData'
import "./map.scss";

const AboutUsMap = () => {
  const [open, setOpen] = useState(false);

  const { lat, lng, key, zoom } = staticData.aboutUs.location;
  return (
    <div className="about_us_map">
      <div className="about_us_map-map">
        <iframe
          width="600"
          height="600"
          style={{ border: "none", borderRadius: 3 }}
          title="out location"
          src={`https://api.maptiler.com/maps/streets-v2/?key=${key}#${zoom}/${lat}/-${lng}`}
        ></iframe>
      </div>
      <div className="about_us_map-contact">
        <h2>Contact</h2>
        <form
          name="contact_us"
          onSubmit={(e) => {
            e.preventDefault();
            e.target.reset();
            setOpen(true);
          }}
        >
          <label htmlFor="fullName">Name</label>
          <input type="text" id="fullName" placeholder="Full Name" required />

          <label htmlFor="fullEmail">Email</label>
          <input
            type="email"
            id="fullEmail"
            placeholder="email@email.com"
            required
          />

          <label htmlFor="fullPhone">Phone</label>
          <input
            type="number"
            id="fullPhone"
            placeholder="000-000-000"
            required
          />

          <label htmlFor="fullComment">Comment</label>
          <textarea
            name="fullComment"
            id="fullComment"
            cols="30"
            rows="10"
            placeholder="Leave a message here"
          ></textarea>

          <input type="submit" value="Send" />
        </form>
      </div>
      {open ? (
        <DialogPopup
          title={"Contact Us"}
          message={"Your request well received"}
          open={open}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
};

export default AboutUsMap;

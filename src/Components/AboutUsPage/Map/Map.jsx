import { useState, useEffect, useRef } from "react";
import { DialogPopup } from "../../MainPage/DialogWindow/DialogWindow";
import staticData from "../../../data/staticData";
import { useObserver } from "../../../hooks/useObserver";
import maplibregl from "maplibre-gl";
import "./map.scss";

const AboutUsMap = () => {
  const { lat, lng, zoom } = staticData.aboutUs.location;
  const [open, setOpen] = useState(false);
  const { visible, refContainer } = useObserver();
  const mapContainerRef = useRef();
  const map = useRef(null);
  const [API_KEY] = useState("ikAqi1XMHQHDEkoG9cUC");

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
      
    });
  });

  return (
    <div
      id="about_us_map"
      className={visible ? "about_us_map" : "about_us_map fade"}
      ref={refContainer}
    >
      <div ref={mapContainerRef} className="mainMap" />
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
          link1={"Close"}
          link2={"Continue"}
          link1To={"/"}
          link2To={"/"}
          open={open}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
};

export default AboutUsMap;

import bg1 from "../assets/background_main.png";
import bg2 from "../assets/bg-image-touch.png";
import bg3 from "../assets/tesla3.jpeg";
import bg4 from '../assets/slider4.jpg'
import about_us from "../assets/about_us.png";
import meeting from "../assets/meeting.jpeg";

const staticData = {
  mainSlide: [
    { image: bg1, description: "Find Your Dream Car" },
    { image: bg2, description: "Best Deals, Best Price" },
    { image: bg3, description: "Find Your Perfect Electric Car" },
    { image: bg4, description: "Best Service from Out Team" }
  ],
  ourContacts: {
    phone: "240-865-3730",
    email: "info@autohunt.com",
    address: "3926 Calvin Street, Baltimore, Maryland, 21201, United State",
  },
  aboutUs: {
    info: "Autohunt specializes in buying and selling young and quality used vehicles. We will also be happy to help you find the car of your dreams.",
    infoPage:
      "Tired of being tied to a single brand? Do you think just possibly your needs should come before allegiances to manufacturers or suppliers? So do we. Our crew of incredibly over-qualified retail, wholesale, service and after market experts work together to give you the most colourful, fun, transparent and informed perspective possible — all with the crazy goal of changing your mind about used car dealers forever (yes … we’ve heard).",
    pageImage: meeting,
    image: about_us,
    location: {
      lat: "25.77887",
      lng: "80.18973",
      key: "ikAqi1XMHQHDEkoG9cUC",
      zoom: 14,
    },
  },

};

export default staticData;

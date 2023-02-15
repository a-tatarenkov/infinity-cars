import bg1 from "../assets/background_main.png";
import bg2 from "../assets/bg-image-touch.png";
import bg3 from "../assets/tesla3.jpeg";
import bg4 from "../assets/slider4.jpg";
import meeting from "../assets/meeting.jpeg";
import main from '../assets/mainPNG.png';

const staticData = {
  mainSlide: [
    { image: bg1, description: "Find Your Dream Car" },
    { image: bg2, description: "Best Deals, Best Price" },
    { image: bg3, description: "Find Your Perfect Electric Car" },
    { image: bg4, description: "Best Service from Out Team" },
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
    image: main,
    location: {
      lat: "25.77887",
      lng: "-80.18973",
      key: "ikAqi1XMHQHDEkoG9cUC",
      zoom: 14,
    },
  },
  faq: {
    Car: {
      "How to Compare a Car?":
        "You just simply you navigation to go to Compare Page, if car list is empty, select cars in car list, or from Main Page, scroll a bit down and find preselected cars to compare, also you can delete and select another cars to compare",
      "Where to find car review?":
        "Simply navigating, press on Article and select Car Reviews, you will get all car list, then select a car you are interested in. Or, just press on car card on link Reviews, and you also will be transferred to Car Review Page",
    },
    Buy: {
      "How to Buy a Car?":
        "Find a car you are interested for, click on car card, you will get full car info and there you can find Dealer contact, or fill up form and we will contact you",
    },
    Sell: {
      "How to Sell a Car? ": "To sell a Car you should have an account",
      "How to Create an Account? ":
        "Press on Log In on navigation panel, fill up your information, then login. Now you can sell a car",
    },
  },
};

export default staticData;

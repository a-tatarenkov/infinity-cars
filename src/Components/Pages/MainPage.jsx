import Slideshow from "../MainPage/MainSlide/MainSlide";
import MainPageSearch from "../MainPage/MainPageSearch/MainPageSearch";
import RecommendedCars from "../MainPage/RecommendedCars/RecommendedCars";
import CarsToCompare from "../MainPage/CarsToCompare/CarsToCompare";
import MainPageNews from "../MainPage/News/News";
import AboutUs from "../AboutUsPage/AboutUs/AboutUs";
import OurServices from "../AboutUsPage/OurServices/OurServices";
import Testimonial from "../AboutUsPage/Testimonial/Testimonial";
import AboutUsMap from "../AboutUsPage/Map/Map";
import MarkList from "../AboutUsPage/MarkList/MarkList";

const MainPage = () => {
  return (
    <>
      <Slideshow />
      <MainPageSearch />
      <RecommendedCars />
      <CarsToCompare />
      <MainPageNews />
      <AboutUs />
      <OurServices />
      <Testimonial />
      <AboutUsMap />
      <MarkList />
    </>
  );
};

export default MainPage;

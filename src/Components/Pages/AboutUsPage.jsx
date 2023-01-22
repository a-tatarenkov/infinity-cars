import AboutUs from "../AboutUsPage/AboutUs/AboutUs";
import OurServices from "../AboutUsPage/OurServices/OurServices";
import Testimonial from "../AboutUsPage/Testimonial/Testimonial";
import MarkList from "../AboutUsPage/MarkList/MarkList";
import { AboutUsTop } from "../AboutUsPage/AboutUs/AboutUs";

const AboutUsPage = () => {
  return (
    <>
      <main className="about_us_page">
        <AboutUsTop />
        <AboutUs />
        <OurServices />
        <Testimonial />
        <MarkList />
      </main>
    </>
  );
};

export default AboutUsPage;

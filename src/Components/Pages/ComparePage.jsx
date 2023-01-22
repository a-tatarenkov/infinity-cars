import Banner from "../CarPage/Banner/Banner";
import CompareCarPage from "../CompareCars/Compare/CompareCars";
import CarAccordion from "../CompareCars/CarAccordion/CarAccordion";

const ComparePage = () => {
  return (
    <>
      <main className="compare">
        <Banner />
        <CompareCarPage />
        <CarAccordion />
      </main>
    </>
  );
};

export default ComparePage;

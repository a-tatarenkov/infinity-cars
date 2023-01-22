import CarList from "../CarPage/CarList/CarList";
import Banner from "../CarPage/Banner/Banner";
import ViewPanel from "../CarPage/ViewPanel/ViewPanel";
import FullCarFilter from "../CarPage/CarFilters/CarFilter";
import PaginationBox from "../CarPage/Pagination/Pagination";

const CarPage = () => {
  return (
    <>
      <main className="new_cars_main">
        <Banner />
        <div className="grid-box">
          <FullCarFilter />
          <div className="right-group">
            <ViewPanel />
            <CarList />
          </div>
        </div>
        <PaginationBox />
      </main>
    </>
  );
};

export default CarPage;

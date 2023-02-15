import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import ProductName from "../ProductDetails/ProductName/ProductName";
import Slider from "../ProductDetails/Slider/Slider";
import FullCarCenter from "../ProductDetails/ProductDetailsCenter/ProductDetailsCenter";
import FullCarSide from "../ProductDetails/SideInfo/SideInfo";
import { Credit } from "../ProductDetails/Credit/Credit";

const ProductDetailsPage = () => {
  const selectedCar = createSelector(
    (state) => state.cars.cars,
    state => state.users,
    (cars,users) => {
      return {
        cars,
        users
      };
    }
  );
  const filteredData = useSelector(selectedCar);

  const { carId } = useParams();
  const data = filteredData.cars.filter((item) => item.id === +carId)[0];
  return (
    <>
      <ProductName brand={data.brand} model={data.model} />
      <Slider data={data.src} view={data.views} />
      <div className="full-car-info-block">
        <FullCarCenter
          dealer={data.dealer}
          description={data.description}
          details={data.details}
          brand={data.brand}
          model={data.model}
          sellerId={data.saleId}
          city={data.city}
          id={data.id}
          location={data.location}
          user={filteredData.users}
        />
        <FullCarSide
          info={data}
          details={data.details}
          rating={data.rating}
          price={data.price}
          id={data.id}
        />
      </div>
      <Credit data={data.price} />
    </>
  );
};

export default ProductDetailsPage;

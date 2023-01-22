import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import ProductName from "../ProductDetails/ProductName/ProductName";
import Slider from "../ProductDetails/Slider/Slider";
import FullCarCenter from "../ProductDetails/ProductDetailsCenter/ProductDetailsCenter";
import FullCarSide from "../ProductDetails/SideInfo/SideInfo";
import { useHttp } from "../../hooks/http.hook";
import { fetchCars } from "../../actions";

const ProductDetailsPage = () => {
  const filteredBransLocationSelector = createSelector(
    (state) => state.cars.cars,
    (cars) => {
      return {
        cars,
      };
    }
  );
  const filteredData = useSelector(filteredBransLocationSelector);

  const { carId } = useParams();
  const { request } = useHttp();
  const dispatch = useDispatch();
  console.log(carId);

  useEffect(() => {
    dispatch(fetchCars(request));
    // eslint-disable-next-line
  }, []);

  const data = filteredData.cars.filter((item) => item.id === +carId);

  return (
    <>
      <ProductName data={data} />
      <Slider data={data} />
      <div className="full-car-info-block">
        <FullCarCenter data={data} />
        <FullCarSide info={data} />
      </div>
    </>
  );
};

export default ProductDetailsPage;

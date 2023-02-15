import { useEffect } from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredCars } from "../../../actions";
import { useHttp } from "../../../hooks/http.hook";
import CardGrid from "../CarGrid/CarGrid";
import "./carList.scss";
import FlexCar from "../CarFlex/CarFlex";

const CarList = () => {
  const filterData = createSelector(
    (state) => state.cars.cars,
    (state) => state.filters,
    (state) => state.users,
    (cars, filters, users) => {
      return {
        cars,
        filters: filters,
        users,
      };
    }
  );

  const dispatch = useDispatch();
  const { request } = useHttp();
  const { cars, filters, users } = useSelector(filterData);
  useEffect(() => {
    dispatch(fetchFilteredCars(request, filters));
    // eslint-disable-next-line
  }, [filters]);

  let currentUser = null;

  if (users.currentUser) {
    currentUser = users.currentUser[0];
  }

  const elements = cars
    .slice(filters.pagination - 10, filters.pagination)
    .map((item) => {
      const { id, ...rest } = item;

      if (filters.onViewChange === "flex")
        return <FlexCar {...rest} id={id} key={id} user={currentUser} />;

      return <CardGrid {...rest} id={id} key={id} user={currentUser} />;
    });

  return <ul className="car_list">{elements}</ul>;
};

export default CarList;

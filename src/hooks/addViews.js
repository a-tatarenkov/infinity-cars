import { useCallback } from "react";
import { useHttp } from "./http.hook";
import { fetchCars } from "../actions";
import { useDispatch } from "react-redux";

const useAddViews = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const requestViews = useCallback(
    (id, car) => {
      const currentCar = car;
      car.views += 1;
      request(
        `/cars/${id}`,
        "PUT",
        JSON.stringify(currentCar)
      )
        .then((res) => console.log(res, "Car Modified"))
        .then(dispatch(fetchCars(request)))
        .catch((err) => console.log(err));
    },
    [request,dispatch]
  );
  return { requestViews };
};

export default useAddViews;

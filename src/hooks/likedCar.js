import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { useHttp } from "./http.hook";
import { fetchUsers } from "../actions";

const useAddLikedCars = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();

  const addLikedCar = useCallback(
    (id, user) => {
      const currentUser = user;
      currentUser.likedCars = [...currentUser.likedCars, id];
      localStorage.setItem("user", JSON.stringify([currentUser]));

      request(`/users/${currentUser.id}`, "PUT", JSON.stringify(currentUser))
        .then((res) => console.log(res, "User Modified"))
        .then(dispatch(fetchUsers(request)))
        .catch((err) => console.log(err));
    },
    [request, dispatch]
  );

  const deleteLikedCar = useCallback(
    (id, user) => {
      const currentUser = user;
      const filteredCars = currentUser.likedCars.filter((car) => car !== id);
      currentUser.likedCars = filteredCars;
      localStorage.setItem("user", JSON.stringify([currentUser]));

      request(`/users/${currentUser.id}`, "PUT", JSON.stringify(currentUser))
        .then((res) => console.log(res, "User Modified"))
        .then(dispatch(fetchUsers(request)))
        .catch((err) => console.log(err));

    },
    [request, dispatch]
  );

  return { addLikedCar, deleteLikedCar };
};

export default useAddLikedCars;

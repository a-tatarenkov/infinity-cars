import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sellCarId, carDeleted, fetchCurrentUserCar } from "../../../actions";
import { useState, useCallback, useEffect } from "react";
import SetUsersProfile from "../SetUsersProfile/SetUsersProfile";
import CarGridMain from "../../CarPage/CarGridMain/CarGridMain";
import "../AdminPanel/adminPanel.scss";
import Messages from "../Messages/Messages";
import { useHttp } from "../../../hooks/http.hook";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const UserPanel = () => {
  const users = createSelector(
    (state) => state.users,
    (state) => state.cars.cars,
    (users, cars) => {
      return {
        users,
        cars,
      };
    }
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersData = useSelector(users);
  const [view, setView] = useState("cars");

  if (!usersData.users.login) navigate("/");

  const user = JSON.parse(localStorage.getItem("user"));
  const cars = usersData.cars;

  const getUsersCars = () => {
    const usersCar = cars.filter((item) => item.saleId === user[0].id);
    return usersCar;
  };
  const usersCar = getUsersCars();
  const { request } = useHttp();

  useEffect(
    () => {
      if (usersData.users.currentUser[0]) {
        dispatch(
          fetchCurrentUserCar(request, usersData.users.currentUser[0].likedCars)
        );
      } else {
        return;
      }
    },
    // eslint-disable-next-line
    [usersData.users.currentUser[0].likedCars]
  );

  const onDelete = useCallback(
    (id) => {
      request(`/cars/${id}`, "DELETE")
        .then((data) => console.log(data, "Deleted"))
        .then(dispatch(carDeleted(id)))
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line
    [request]
  );

  const buttons = [
    { title: "Cars", filter: "cars" },
    { title: "Messages", filter: "messages" },
    { title: "Liked Cars", filter: "likedCars" },
  ];


  return (
    <main className="admin_panel">
      <div className="admin_panel-log_out">
        <h2>{`Hello  ${user[0].name}`}</h2>
      </div>
      <ButtonGroup className="admin_panel-links" variant="contained">
        <Button>
          <Link to="/car_search_results">Search a car</Link>
        </Button>
        <Button>
          <Link
            to="/sell"
            onClick={() =>
              dispatch(sellCarId(usersData.users.currentUser[0].id))
            }
          >
            Sell a car
          </Link>
        </Button>
      </ButtonGroup>
      <div className="admin_panel-sort">
        <ButtonGroup className="set_view">
          {buttons.map((item) => (
            <Button
              key={item.title}
              style={view === item.filter ? { opacity: 1 } : {}}
              onClick={() => setView(item.filter)}
            >
              {item.title}
            </Button>
          ))}
      
        </ButtonGroup>
      </div>

      <div className="admin_panel-info_items">
        <div className="users_info">
          <SetUsersProfile user={usersData.users.currentUser} />
          <div className="admin_panel-info_items-list">
            {view === "cars" ? (
              usersCar.length === 0 ? (
                <div>
                  <span className="admin_panel-info_items-list-no_car">
                    You have no cars for sale
                  </span>
                </div>
              ) : (
                usersCar.map((item) => (
                  <CarGridMain
                    {...item}
                    key={item.id}
                    canEdit={true}
                    carDelete={onDelete}
                  />
                ))
              )
            ) : view === "messages" ? (
              <Messages messages={usersData.users.currentUser[0].messages} />
            ) : usersData.users.currentUserCars.length === 0 ? (
              <span>You have no liked cars</span>
            ) : (
              usersData.users.currentUserCars.map((item, i) => (
                <CarGridMain
                  {...item}
                  key={i}
                  user={usersData.users.currentUser[0]}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserPanel;

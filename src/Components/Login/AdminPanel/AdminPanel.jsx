import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import CarGridMain from "../../CarPage/CarGridMain/CarGridMain";
import { Link } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  currentUserLogged,
  setLogged,
  termFilter,
  onFilterReset,
  userDeleted,
  sellCarId
} from "../../../actions";
import { fetchFilteredCars } from "../../../actions";
import { useHttp } from "../../../hooks/http.hook";
import "./adminPanel.scss";

const AdminPanel = (props) => {
  const navigate = useNavigate();
  const [view, setView] = useState("cars");

  const users = createSelector(
    (state) => state.users,
    (state) => state.cars.cars,
    (state) => state.filters,
    (users, cars, filters) => {
      return {
        users,
        cars,
        filters: filters,
      };
    }
  );

  const { request } = useHttp();
  const usersData = useSelector(users);
  const dispatch = useDispatch();

  const user = usersData.users.currentUser[0];
  const cars = usersData.cars;
  console.log(usersData.users);

  useEffect(() => {
    dispatch(fetchFilteredCars(request, usersData.filters));
    dispatch(sellCarId(user.id))
    // eslint-disable-next-line
  }, [usersData.filters]);

  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/users/${id}`, "DELETE")
        .then((data) => console.log(data, "Deleted"))
        .then(dispatch(userDeleted(id)))
        .catch((err) => console.log(err));
    },
    [request]
  );

  const getUsersCars = () => {
    if (user) {
      const usersCar = cars.filter((item) => item.saleId === user.id);
      return usersCar;
    }
  };
  const usersCar = getUsersCars();

  const onLogOut = () => {
    dispatch(onFilterReset());
    dispatch(setLogged(false));
    dispatch(currentUserLogged(null));
    navigate("/");
  };

  return (
    <main className="admin_panel">
      <div className="admin_panel-log_out">
        <h2>{user.isAdmin ? "Hello Admin" : `Hello  ${user.name}`}</h2>

        <button onClick={() => onLogOut()}> Log Out</button>
      </div>
      {user.isAdmin ? (
        <>
          <div className="admin_panel-log_out-view">
            <button
              onClick={() => setView("cars")}
              style={view === "cars" ? { opacity: 1 } : { opacity: 0.5 }}
            >
              Cars
            </button>
            <button
              onClick={() => setView("users")}
              style={view === "users" ? { opacity: 1 } : { opacity: 0.5 }}
            >
              Users
            </button>
            {view === "cars" ? (
              <input
                className="admin_panel-info_items-search"
                type="text"
                placeholder="Search by Brand"
                value={usersData.filters.term}
                onChange={(e) => dispatch(termFilter(e))}
              />
            ) : null}
          </div>
        </>
      ) : null}
      <div className="admin_panel-links">
        {!user.isAdmin ? (
          <>
            <button>
              <Link to="/car_search_results">Search a car</Link>
            </button>
            <button>
              <Link to="/">Sell a car</Link>
            </button>
          </>
        ) : null}
      </div>

      <div className="admin_panel-info_items">
        <h3>
          {user.isAdmin && view === "cars"
            ? "Cars for sale now:"
            : !user.isAdmin
            ? "Cars for Sale"
            : null}
        </h3>

        <ul className="admin_panel-info_items-list">
          {user.isAdmin && view === "cars" ? (
            cars.map((item) => <CarGridMain {...item} key={item.id} />)
          ) : user.isAdmin && view === "users" ? (
            usersData.users.users.map((item) => (
              <li key={item.id} className={"user-list_item"}>
                <img src={item.photo} alt="user" />
                <span>Name: {item.name}</span>
                <span>Email: {item.email}</span>
                <span>Phone: {item.phone || "no phone number"}</span>
                <button
                  className="onDeleteUser"
                  style={{ display: item.name === "Admin" ? "none" : "block" }}
                  onClick={() => {
                    onDelete(item.id);
                  }}
                >
                  Delete User
                </button>
              </li>
            ))
          ) : usersCar.length === 0 ? (
            <li>
              <span className="admin_panel-info_items-list-no_car">
                You have no cars for sale
              </span>
            </li>
          ) : (
            usersCar.map((item) => <CarGridMain {...item} key={item.id} />)
          )}
        </ul>
      </div>
    </main>
  );
};

export default AdminPanel;

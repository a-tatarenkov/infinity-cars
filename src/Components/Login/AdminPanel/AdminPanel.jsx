import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  termFilter,
  userDeleted,
} from "../../../actions";
import { fetchFilteredCars } from "../../../actions";
import PaginationBox from "../../CarPage/Pagination/Pagination";
import { useHttp } from "../../../hooks/http.hook";
import SetUsersProfile from "../SetUsersProfile/SetUsersProfile";
import CarGridMain from "../../CarPage/CarGridMain/CarGridMain";
import Messages from "../Messages/Messages";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import "./adminPanel.scss";

const AdminPanel = () => {
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

  const dispatch = useDispatch();
  const usersData = useSelector(users);
  const { request } = useHttp();

  if (!usersData.users.login) navigate("/");

  const cars = usersData.cars;

  useEffect(() => {
    dispatch(fetchFilteredCars(request, usersData.filters));
    // eslint-disable-next-line
  }, [usersData.filters]);

  const onDelete = useCallback(
    (id) => {
      request(`/users/${id}`, "DELETE")
        .then((data) => console.log(data, "Deleted"))
        .then(dispatch(userDeleted(id)))
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line
    [request]
  );


  const buttonsData = [
    { label: "Cars", filter: "cars" },
    { label: "Users", filter: "users" },
    { label: "Messages", filter: "messages" },
  ];

  return (
    <main className="admin_panel">
      <div className="admin_panel-log_out">
        <h2>Hello Admin</h2>
      </div>

      <ButtonGroup className="admin_panel-log_out-view">
        {buttonsData.map((item) => (
          <Button
          key={item.label}
            onClick={() => setView(item.filter)}
            style={view === item.filter ? { opacity: 1 } : { opacity: 0.5 }}
          >
            {item.label}
          </Button>
        ))}

        {view === "cars" ? (
          <input
            className="admin_panel-info_items-search"
            type="text"
            placeholder="Search by Brand"
            value={usersData.filters.term}
            onChange={(e) => dispatch(termFilter(e))}
          />
        ) : null}
      </ButtonGroup>

      <div className="admin_panel-info_items">
        <div className="users_info">
          <h3>
            {view === "cars"
              ? "Cars for sale now:"
              : view === "users"
              ? "Users"
              : "Messages"}
          </h3>
          <SetUsersProfile />
          <div className="admin_panel-info_items-list">
            {view === "cars" ? (
              cars
                .slice(
                  usersData.filters.pagination - 10,
                  usersData.filters.pagination
                )
                .map((item) => <CarGridMain {...item} key={item.id} />)
            ) : view === "users" ? (
              usersData.users.users.map((item) => (
                <div key={item.id} className={"user-list_item"}>
                  <img src={item.photo} alt="user" />
                  <span>Name: {item.name}</span>
                  <span>Email: {item.email}</span>
                  <span>Phone: {item.phone || "no phone number"}</span>
                  <button
                    className="onDeleteUser"
                    style={{
                      display: item.name === "Admin" ? "none" : "block",
                    }}
                    onClick={() => {
                      onDelete(item.id);
                    }}
                  >
                    Delete User
                  </button>
                </div>
              ))
            ) : (
              <Messages messages={usersData.users.currentUser[0].messages} />
            )}
          </div>
        </div>
        {view === "users" || view === "messages" ? null : (
          <PaginationBox style={{ marginRight: -300 }} />
        )}
      </div>
    </main>
  );
};



export default AdminPanel;

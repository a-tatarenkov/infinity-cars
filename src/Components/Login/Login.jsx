import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  fetchCars,
  fetchUsers,
  userCreated,
  currentUserLogged,
  setLogged,
} from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      name: userName,
      login: userLogin,
      password: userPassword,
      isAdmin: false,
      id: uuidv4(),
    };

    request("/users", "POST", JSON.stringify(newUser))
      .then((res) => console.log(res, "Отправка успешна"))
      .then(dispatch(userCreated(newUser)))
      .catch((err) => console.log(err));

    setUserName("");
    setUserLogin("");
    setUserPassword("");
  };

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

  const usersData = useSelector(users);
  console.log(usersData.users);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchUsers(request));
    dispatch(fetchCars(request));
    // eslint-disable-next-line
  }, []);

  const style = {
    padding: 200,
    height: "max-content",
    width: "100%",
    background: "orange",
    display: "flex",
    gap: 40,
  };

  const onLogin = (e) => {
    e.preventDefault();

    const loginUser = usersData.users.users.filter(
      (item) => item.login === userLogin && item.password === userPassword
    );

    dispatch(currentUserLogged(loginUser));
    loginUser.length !== 0
      ? dispatch(setLogged(true))
      : dispatch(setLogged(false));
    setUserLogin("");
    setUserPassword("");
  };

  const onLogOut = () => {
    dispatch(currentUserLogged(null));
    dispatch(setLogged(false));
  };

  const getUsersCars = () => {
    if (usersData.users.login) {
      const usersCar = usersData.cars.filter(
        (item) => item.id === usersData.users.currentUser[0].id
      );
      return usersCar;
    }
  };

  const usersCar = getUsersCars();

  return (
    <div style={style}>
      <form
        style={{ display: "flex", flexDirection: "column", width: 200 }}
        onSubmit={(e) => onSubmitHandler(e)}
      >
        create user
        <input
          type="text"
          placeholder="name"
          style={{ color: "black" }}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="login"
          style={{ color: "black" }}
          value={userLogin}
          onChange={(e) => setUserLogin(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          style={{ color: "black" }}
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <input type="submit" value="submit" style={{ color: "black" }} />
      </form>

      {(usersData.users.login && (
        <div>
          {`Hello  ${usersData.users.currentUser[0]?.name}`}
          {usersData.users.currentUser[0].isAdmin ? (
            <div>
              car list here
              <ul style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {usersData.cars.map((item) => (
                  <li key={item.src[0]} style={{ height: 100, width: 100 }}>
                    <div>
                      <img
                        src={item.src[0]}
                        alt=""
                        style={{
                          height: "50px",
                          width: 100,
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <p>
                      {item.brand}: {item.model}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <p>hello {usersData.users.currentUser[0]?.name}</p>
              {usersCar ? (
                <div>
                  {usersCar.length !== 0 ? (
                    <img
                      src={usersCar[0]?.src[0]}
                      alt=""
                      style={{ height: 100, width: 100, objectFit: "cover" }}
                    />
                  ) : null}

                  <div>
                    {usersCar[0]?.brand}
                    {usersCar[0]?.model}
                  </div>
                </div>
              ) : null}
            </div>
          )}
          <button
            style={{ color: "black", padding: 30 }}
            onClick={() => {
              onLogOut();
            }}
          >
            log out
          </button>
        </div>
      )) || (
        <form
          style={{ display: "flex", flexDirection: "column", width: 200 }}
          onSubmit={(e) => onLogin(e)}
        >
          <input
            type="text"
            placeholder="login"
            style={{ color: "black" }}
            value={userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
          />
          <input
            type="text"
            placeholder="password"
            style={{ color: "black" }}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <input type="submit" value="submit" style={{ color: "black" }} />
        </form>
      )}
    </div>
  );
};

export default Login;

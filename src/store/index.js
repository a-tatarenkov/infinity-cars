import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import cars from "../reducers/cars";
import filters from "../reducers/filters";
import data from "../reducers/data";
import comments from "../reducers/comments";
import news from "../reducers/news";
import users from "../reducers/users";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = createStore(
  combineReducers({ comments, filters, data, cars, news, users }),
  compose(
    applyMiddleware(ReduxThunk, stringMiddleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()) ||
      compose
  )
);

export default store;

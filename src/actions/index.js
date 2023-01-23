export const fetchCars = (request) => (dispatch) => {
  dispatch(carsFetching());
  request("/cars")
    .then((cars) => dispatch(carsFetched(cars)))
    .catch(() => dispatch(carsFetchingError()));
};

export const fetchComments = (request) => (dispatch) => {
  dispatch(commentsFetching());
  request("/reviews").then((comments) => dispatch(commentsFetched(comments)));
};

export const fetchUsers = (request) => (dispatch) => {
  dispatch(usersFetching());
  request("/users").then((users) => dispatch(usersFetched(users)));
};

export const fetchNews = (request) => (dispatch) => {
  dispatch(newsFetching());
  request("/news").then((news) => dispatch(newsFetched(news)));
};

export const fetchCarsData = (request) => (dispatch) => {
  dispatch(carsFetchingData());
  request("/cars").then((data) => dispatch(carsFetchedData(data)));
};

export const fetchFilteredCars = (request, filters) => (dispatch) => {
  const {
    term,
    condition,
    brand,
    model,
    location,
    price,
    year,
    bodyType,
    transmission,
    fuelType,
    passengers,
    color,
    driveTrain,
    onSortChange,
  } = filters;

  const sortString = (filter) => {
    switch (filter) {
      case "yearHight":
        return "_sort=year&_order=desc";
      case "yearLow":
        return "_sort=year";
      case "priceHight":
        return "_sort=price&_order=desc";
      case "priceLow":
        return "_sort=price";
      default:
        return "";
    }
  };

  const sortStr = sortString(onSortChange);
  dispatch(carsFetching());
  request(
    `/cars?${sortStr}${brand ? `&brand=${brand}` : ""}${
      model.length === 0
        ? ""
        : `${model
            .map((item) => `&model=${item.title}&`)
            .join("")
            .slice(0, -1)}`
    }${
      passengers.length === 0
        ? ""
        : `${passengers
            .map((item) => `&seats=${item.title}&`)
            .join("")
            .slice(0, -1)}`
    }${
      color.length === 0
        ? ""
        : `${color
            .map((item) => `&color=${item.title}&`)
            .join("")
            .slice(0, -1)}`
    }${
      driveTrain.length === 0
        ? ""
        : `${driveTrain
            .map((item) => `&driveUnit=${item.title}&`)
            .join("")
            .slice(0, -1)}`
    }${
      bodyType.length === 0
        ? ""
        : `${bodyType
            .map((item) => `&body=${item.title}&`)
            .join("")
            .slice(0, -1)}`
    }${
      transmission.length === 0
        ? ""
        : `${transmission
            .map((item) => `&transmission=${item.title}&`)
            .join("")
            .slice(0, -1)}`
    }${
      fuelType.length === 0
        ? ""
        : `${fuelType
            .map((item) => `&engine=${item.title}&`)
            .join("")
            .slice(0, -1)}`
    }${
      year.length === 0
        ? ""
        : `${year
            .map((item) => `&year=${item.title}&`)
            .join("")
            .slice(0, -1)}`
    }${price ? `&price_gte=${price[0]}&price_lte=${price[1]}` : ""}&${
      condition === true
        ? `condition=${true}`
        : condition === false
        ? `condition=${false}`
        : ""
    }${
      location.length === 0
        ? ""
        : `${location
            .map((item) => `&location=${item.title}&`)
            .join("")
            .slice(0, -1)}`
    }${term ? `q=${term}` : ""}`
  )
    .then((data) => dispatch(carsFetched(data)))
    .catch(() => dispatch(carsFetchingError()));
};

export const usersFetching = () => {
  return {
    type: "USERS_FETCHING",
  };
};

export const usersFetched = (users) => {
  return {
    type: "USERS_FETCHED",
    payload: users,
  };
};

export const userCreated = (user) => {
  return {
    type: "USER_CREATED",
    payload: user,
  };
};

export const currentUserLogged = (user) => {
  return {
    type: "CURRENT_USER",
    payload: user,
  };
};
export const setLogged = (log) => {
  return {
    type: "SET_LOGGED",
    payload: log,
  };
};

export const carsFetching = () => {
  return {
    type: "CARS_FETCHING",
  };
};

export const commentsFetching = () => {
  return {
    type: "COMMENTS_FETCHING",
  };
};

export const commentsFetched = (comments) => {
  return {
    type: "COMMENTS_FETCHED",
    payload: comments,
  };
};

export const newsFetching = () => {
  return {
    type: "NEWS_FETCHING",
  };
};

export const newsFetched = (news) => {
  return {
    type: "NEWS_FETCHED",
    payload: news,
  };
};

export const carsFetchingData = () => {
  return {
    type: "CARS_FETCHING_DATA",
  };
};

export const deleteCarToCompare = (car) => {
  return {
    type: "DELETE_CARS_TO_COMPARE",
    payload: car,
  };
};

export const setCarsToCompare = (car) => {
  return {
    type: "SET_CARS_TO_COMPARE",
    payload: car,
  };
};

export const carsFetched = (cars) => {
  return {
    type: "CARS_FETCHED",
    payload: cars,
  };
};
export const carsFetchedData = (data) => {
  return {
    type: "CARS_FETCHED_DATA",
    payload: data,
  };
};
export const carsFetchingError = () => {
  return {
    type: "CARS_FETCHING_ERROR",
  };
};

export const commentsFetchingError = () => {
  return {
    type: "COMMENTS_FETCHED_ERROR",
  };
};

export const conditionFilter = (filters) => {
  return {
    type: "CONDITION_FILTER_CHANGED",
    payload: filters,
  };
};

export const recommendedFilter = (filters) => {
  return {
    type: "RECOMMENDED_FILTER_CHANGED",
    payload: filters,
  };
};

export const brandFilter = (e) => ({
  type: "BRAND_FILTER_CHANGED",
  payload: e,
});

export const onViewFilterState = (filter) => ({
  type: "VIEW_FILTER_CHANGED",
  payload: filter,
});

export const modelFilter = (e) => ({
  type: "MODEL_FILTER_CHANGED",
  payload: e,
});

export const priceFilter = (e) => ({
  type: "PRICE_FILTER_CHANGED",
  payload: e,
});

export const locationFilter = (e) => ({
  type: "LOCATION_FILTER_CHANGED",
  payload: e,
});

export const yearFilter = (e) => ({
  type: "YEAR_FILTER_CHANGED",
  payload: e,
});
export const bodyFilter = (e) => ({
  type: "BODY_FILTER_CHANGED",
  payload: e,
});

export const transmissionFilter = (e) => ({
  type: "TRANSMISSION_FILTER_CHANGED",
  payload: e,
});

export const fuelFilter = (e) => ({
  type: "FUEL_FILTER_CHANGED",
  payload: e,
});
export const driveTrainFilter = (e) => ({
  type: "DRIVE_TRAIN_FILTER_CHANGED",
  payload: e,
});
export const passengersFilter = (e) => ({
  type: "PASSENGERS_FILTER_CHANGED",
  payload: e,
});
export const colorFilter = (e) => ({
  type: "COLOR_FILTER_CHANGED",
  payload: e,
});
export const termFilter = (e) => ({
  type: "TERM_FILTER_CHANGED",
  payload: e.target.value,
});

export const onFilterReset = (e) => ({
  type: "FILTER_RESET",
  payload: e,
});

export const onSortFilter = (e) => ({
  type: "ON_SORT_FILTER",
  payload: e.target.value,
});
export const onPaginationChange = (e) => ({
  type: "ON_PAGINATION_CHANGE",
  payload: e,
});

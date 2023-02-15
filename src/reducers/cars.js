const initialState = {
  cars: [],
  carsLoadingStatus: "idle",
};

const cars = (state = initialState, action) => {
  switch (action.type) {
    case "CARS_FETCHING":
      return {
        ...state,
        carsLoadingStatus: "loading",
      };
    case "CARS_FETCHED":
      return {
        ...state,
        cars: action.payload,
        carsLoadingStatus: "idle",
      };

    case "CAR_CREATED":
      return {
        ...state,
        cars: [...state.cars, action.payload],
      };

    case "CAR_DELETED":
      return {
        ...state,
        cars: state.cars.filter((item) => item.id !== action.payload),
      };

    case "CARS_FETCHING_ERROR":
      return {
        ...state,
        carsLoadingStatus: "error",
      };
    default:
      return state;
  }
};

export default cars;

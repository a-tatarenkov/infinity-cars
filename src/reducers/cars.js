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

const initialState = {
  data: [],
  compare: [],
  dataLoadingStatus: "idle",
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case "CARS_FETCHING_DATA":
      return {
        ...state,
        dataLoadingStatus: "loading",
      };

    case "SET_CARS_TO_COMPARE":
      return {
        ...state,
        compare: state.compare.concat(action.payload),
      };

    case "DELETE_CARS_TO_COMPARE":
      return {
        ...state,
        compare: action.payload,
      };
    case "CARS_FETCHED_DATA":
      return {
        ...state,
        data: action.payload,
        dataLoadingStatus: "idle",
      };
    default:
      return state;
  }
};

export default data;

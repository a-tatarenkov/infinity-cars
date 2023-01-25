const initialState = {
  data: [],
  compare: [],
  brandDataInfo: {},
  dataLoadingStatus: "idle",
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case "CARS_FETCHING_DATA":
      return {
        ...state,
        dataLoadingStatus: "loading",
      };

    case "BRANDS_FETCHING":
      return {
        ...state,
        brandsLoadingStatus: "loading",
      };
    case "BRANDS_FETCHED":
      return {
        ...state,
        brands: action.payload,
        brandsLoadingStatus: "idle",
      };

    case "CAR_CREATED":
      return {
        ...state,
        data: [...state.data, action.payload],
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

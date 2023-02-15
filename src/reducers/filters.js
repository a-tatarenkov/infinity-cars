const initialState = {
  term: "",
  newsTerm: "",
  condition: "",
  brand: null,
  model: "",
  location: "",
  price: [0, 300000],
  year: "",
  bodyType: "",
  transmission: "",
  fuelType: "",
  passengers: "",
  color: "",
  driveTrain: "",
  recommendedCondition: true,
  onViewChange: "grid",
  onSortChange: "",
  pagination: 10,
};


const filters = (state = initialState, action) => {
  switch (action.type) {
    case "CONDITION_FILTER_CHANGED":
      return {
        ...state,
        condition: action.payload,
      };
    case "RECOMMENDED_FILTER_CHANGED":
      return {
        ...state,
        recommendedCondition: action.payload,
      };
    case "BRAND_FILTER_CHANGED":
      return {
        ...state,
        brand: action.payload,
      };
    case "VIEW_FILTER_CHANGED":
      return {
        ...state,
        onViewChange: action.payload,
      };
    case "MODEL_FILTER_CHANGED":
      return {
        ...state,
        model: action.payload,
      };
    case "PRICE_FILTER_CHANGED":
      return {
        ...state,
        price: action.payload,
      };
    case "LOCATION_FILTER_CHANGED":
      return {
        ...state,
        location: action.payload,
      };
    case "YEAR_FILTER_CHANGED":
      return {
        ...state,
        year: action.payload,
      };
    case "BODY_FILTER_CHANGED":
      return {
        ...state,
        bodyType: action.payload,
      };
    case "TRANSMISSION_FILTER_CHANGED":
      return {
        ...state,
        transmission: action.payload,
      };
    case "FUEL_FILTER_CHANGED":
      return {
        ...state,
        fuelType: action.payload,
      };
    case "DRIVE_TRAIN_FILTER_CHANGED":
      return {
        ...state,
        driveTrain: action.payload,
      };
    case "PASSENGERS_FILTER_CHANGED":
      return {
        ...state,
        passengers: action.payload,
      };
    case "COLOR_FILTER_CHANGED":
      return {
        ...state,
        color: action.payload,
      };

    case "TERM_FILTER_CHANGED":
      return {
        ...state,
        term: action.payload,
      };
    case "ON_SET_NEWS_TERM":
      return {
        ...state,
        newsTerm: action.payload,
      };
    case "FILTER_RESET":
      return {
        ...initialState,
      };

    case "ON_SORT_FILTER":
      return {
        ...state,
        onSortChange: action.payload,
      };

    case "ON_PAGINATION_CHANGE":
      return {
        ...state,
        pagination: action.payload,
      };
    default:
      return state;
  }
};

export default filters;

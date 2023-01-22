const initialState = {
  term: "",
  condition: "",
  brand: null,
  model: "",
  location: "",
  price: [0, 100000],
  year: "",
  bodyType: "",
  transmission: "",
  fuelType: "",
  passengers: "",
  color: "",
  driveTrain: "",
  recommendedCondition: true,
  onViewChange: "flex",
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
        brand: (state.brand = action.payload),
      };
    case "VIEW_FILTER_CHANGED":
      return {
        ...state,
        onViewChange: action.payload,
      };
    case "MODEL_FILTER_CHANGED":
      return {
        ...state,
        model: (state.model = action.payload),
      };
    case "PRICE_FILTER_CHANGED":
      return {
        ...state,
        price: (state.price = action.payload),
      };
    case "LOCATION_FILTER_CHANGED":
      return {
        ...state,
        location: (state.location = action.payload),
      };
    case "YEAR_FILTER_CHANGED":
      return {
        ...state,
        year: (state.year = action.payload),
      };
    case "BODY_FILTER_CHANGED":
      return {
        ...state,
        bodyType: (state.bodyType = action.payload),
      };
    case "TRANSMISSION_FILTER_CHANGED":
      return {
        ...state,
        transmission: (state.transmission = action.payload),
      };
    case "FUEL_FILTER_CHANGED":
      return {
        ...state,
        fuelType: (state.fuelType = action.payload),
      };
    case "DRIVE_TRAIN_FILTER_CHANGED":
      return {
        ...state,
        driveTrain: (state.driveTrain = action.payload),
      };
    case "PASSENGERS_FILTER_CHANGED":
      return {
        ...state,
        passengers: (state.passengers = action.payload),
      };
    case "COLOR_FILTER_CHANGED":
      return {
        ...state,
        color: (state.color = action.payload),
      };

    case "TERM_FILTER_CHANGED":
      return {
        ...state,
        term: (state.term = action.payload),
      };
    case "FILTER_RESET":
      return {
        ...state,
        term: (state.term = ""),
        color: (state.location = ""),
        passengers: (state.passengers = ""),
        driveTrain: (state.driveTrain = ""),
        fuelType: (state.fuelType = ""),
        year: (state.year = ""),
        location: (state.location = ""),
        price: (state.price = [0, 100000]),
        bodyType: (state.bodyType = ""),
        model: (state.model = ""),
        brand: (state.brand = null),
        condition: (state.condition = ""),
        pagination: (state.pagination = 10),
        transmission: (state.transmission = ""),
      };

    case "ON_SORT_FILTER":
      return {
        ...state,
        onSortChange: (state.onSortChange = action.payload),
      };

    case "ON_PAGINATION_CHANGE":
      return {
        ...state,
        pagination: (state.pagination = action.payload),
      };
    default:
      return state;
  }
};

export default filters;

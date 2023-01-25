const initialState = {
  brand: null,
  model: null,
  condition: true,
  top: true,
  label: "",
  price: "",
  location: null,
  year: null,
  engine: null,
  seats: "",
  color: null,
  body: null,
  logo: "",
  transmission: null,
  rating: [0, 0, 0],
  driveUnit: null,
  dealer: {
    dealerPhoto:
      "https://drive.google.com/uc?id=14Hcef7efE8WkgCX5u_z6Kg3DhZS7QJCr",
    name: "Alfredo Gouse",
    position: "Dealer",
    phone: "240-865-3730",
    email: "alfred.g@mail.com",
  },
  src: [],
  details: {
    "Car Details": {
      Brand: "",
      Model: "",
      Condition: true,
      Year: null,
      "Body Type": "",
      Seats: "",
      "Exterior Color": "",
    },
    Engine: {
      "Fuel Type": "",
      Mileage: "",
      Transmission: null,
      Drivetrain: "",
      Power: "",
      "Engine Capacity": "",
    },
    "Battery and Charging": {
      "Battery Capacity": "75 kWh",
      "Charge Port": "Type 2",
      "Charge Time (0->Full)": "330 min",
    },
    Dimension: {
      Length: "",
      Width: "",
      Height: "",
      "Cargo Volume": "",
    },
    Futures: {},
  },
  id: "",
  saleId: "",
  description: "",
  brandsLoadingStatus: "idle",
};

const brands = (state = initialState, action) => {
  switch (action.type) {
    case "SELL_BRAND_SELECTED":
      return {
        ...state,
        brand: (state.brand = action.payload),
        state: (state.details["Car Details"].Brand = action.payload),
      };

    case "SELL_MODEL_SELECTED":
      return {
        ...state,
        model: (state.model = action.payload),
        state: (state.details["Car Details"].Model = action.payload),
      };

    case "SELL_BODY_SELECTED":
      return {
        ...state,
        body: (state.body = action.payload),
        state: (state.details["Car Details"]["Body Type"] = action.payload),
      };
    case "SELL_TITLE_SELECTED":
      return {
        ...state,
        label: (state.label = action.payload),
      };

    case "SELL_YEAR_SELECTED":
      return {
        ...state,
        year: (state.year = +action.payload),
        state: (state.details["Car Details"].Year = action.payload),
      };

    case "SELL_PAX_SELECTED":
      return {
        ...state,
        seats: (state.seats = action.payload),
        state: (state.details["Car Details"].Seats = action.payload),
      };
    case "SELL_COLOR_SELECTED":
      return {
        ...state,
        color: (state.color = action.payload),
        state: (state.details["Car Details"]["Exterior Color"] =
          action.payload),
      };
    case "SELL_CONDITION_SELECTED":
      return {
        ...state,
        condition: (state.condition = action.payload),
        state: (state.details["Car Details"].Condition =
          action.payload === true ? "New" : "Used"),
      };
    case "SELL_DESCRIPTION_SELECTED":
      return {
        ...state,
        description: (state.description = action.payload),
      };
    case "SELL_FUEL_SELECTED":
      return {
        ...state,
        engine: (state.engine = action.payload),
        state: (state.details.Engine["Fuel Type"] = action.payload),
      };
    case "SELL_DRIVETRAIN_SELECTED":
      return {
        ...state,
        driveUnit: (state.driveUnit = action.payload),
        state: (state.details.Engine.Drivetrain = action.payload),
      };

    case "SELL_MILAGE_SELECTED":
      return {
        ...state,
        state: (state.details.Engine.Mileage = action.payload),
      };
    case "SELL_ENGINE_CAPACITY_SELECTED":
      return {
        ...state,
        state: (state.details.Engine["Engine Capacity"] = action.payload),
      };

    case "SELL_TRANSMISSION_SELECTED":
      return {
        ...state,
        transmission: (state.transmission = action.payload),
        state: (state.details.Engine.Transmission = action.payload),
      };
    case "SELL_ENGINE_POWER_SELECTED":
      return {
        ...state,
        state: (state.details.Engine.Power = action.payload),
      };
    case "SELL_LENGTH_SELECTED":
      return {
        ...state,
        state: (state.details.Dimension.Length = action.payload),
      };
    case "SELL_WIDTH_SELECTED":
      return {
        ...state,
        state: (state.details.Dimension.Width = action.payload),
      };
    case "SELL_HEIGHT_SELECTED":
      return {
        ...state,
        state: (state.details.Dimension.Height = action.payload),
      };
    case "SELL_CARGO_SELECTED":
      return {
        ...state,
        state: (state.details.Dimension["Cargo Volume"] = action.payload),
      };
    case "SELL_FUTURES_SELECTED":
      return {
        ...state,
        state: (state.details.Futures = action.payload),
      };
    case "SELL_LOCATION_SELECTED":
      return {
        ...state,
        location: (state.location = action.payload),
      };
    case "SELL_SET_PRICE_SELECTED":
      return {
        ...state,
        price: (state.price = +action.payload),
      };
    case "SELL_IMAGES_SELECTED":
      return {
        ...state,
        src: (state.src = action.payload),
      };
    case "SELL_ID_SELECTED":
      return {
        ...state,
        saleId: (state.saleId = action.payload),
      };
    default:
      return state;
  }
};

export default brands;

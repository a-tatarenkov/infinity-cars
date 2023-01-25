const initialState = {
  users: [],
  login: false,
  currentUser: null,
  usersLoadingStatus: "idle",
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case "USERS_FETCHING":
      return {
        ...state,
        usersLoadingStatus: "loading",
      };
    case "CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_LOGGED":
      return {
        ...state,
        login: action.payload,
      };
    case "USER_CREATED":
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case "USER_DELETED":
      return {
        ...state,
        users: state.users.filter((item) => item.id !== action.payload),
      };
    case "USERS_FETCHED":
      return {
        ...state,
        users: action.payload,
        usersLoadingStatus: "idle",
      };
    default:
      return state;
  }
};

export default users;

const initialState = {
  comments: [],
  carsLoadingStatus: "idle",
};

const cars = (state = initialState, action) => {
  switch (action.type) {
    case "COMMENTS_FETCHING":
      return {
        ...state,
        commentsLoadingStatus: "loading",
      };
    case "COMMENTS_FETCHED":
      return {
        ...state,
        comments: action.payload,
        commentsLoadingStatus: "idle",
      };

    case "COMMENTS_FETCHED_ERROR":
      return {
        ...state,
        commentsLoadingStatus: "error",
      };
    default:
      return state;
  }
};

export default cars;

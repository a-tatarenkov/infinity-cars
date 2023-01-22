const initialState = {
  news: [],
  newsLoadingStatus: "idle",
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case "NEWS_FETCHING":
      return {
        ...state,
        newsLoadingStatus: "loading",
      };
    case "NEWS_FETCHED":
      return {
        ...state,
        news: action.payload,
        newsLoadingStatus: "idle",
      };
    default:
      return state;
  }
};

export default news;

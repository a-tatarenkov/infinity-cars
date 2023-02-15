const initialState = {
  news: [],
  filteredNews: [],
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
        filteredNews: action.payload,
        newsLoadingStatus: "idle",
      };
    case "NEWS_FETCHED_FILTERED":
      return {
        ...state,
        filteredNews: action.payload,
        newsLoadingStatus: "idle",
      };
    default:
      return state;
  }
};

export default news;

export const initialState = {
  showLoading: false
};

export const loadingReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        showLoading: action.payload
      };
    default:
      return state;
  }
};
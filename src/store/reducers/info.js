import { SET_POSTCODE_INFO } from "../actions/info";

const initialState = {
  postCode: false,
  borough: false,
  coords: false
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTCODE_INFO:
      return {
        ...state,
        postCode: action.postCode,
        borough: action.borough,
        coords: action.coords
      };
  }
  return state;
};

export default infoReducer;

import {
  SET_POSTCODE_INFO,
  SET_RESULTS,
  SET_ORGANIC_LOCATION,
  SET_COORDS
} from "../actions/info";

const initialState = {
  postCode: false,
  borough: false,
  coords: false,
  boundingBox: false,
  results: []
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTCODE_INFO:
      return {
        ...state,
        postCode: action.postCode,
        borough: action.borough,
        coords: action.coords,
        boundingBox: action.boundingBox
      };
    case SET_ORGANIC_LOCATION:
      return {
        ...state,
        postCode: false,
        borough: false,
        coords: action.coords,
        boundingBox: action.boundingBox
      };
    case SET_COORDS:
      return {
        ...state,
        coords: action.coords
      };
    case SET_RESULTS:
      return {
        ...state,
        results: action.results
      };
    default:
      return state;
  }
};

export default infoReducer;

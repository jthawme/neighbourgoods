import {
  SET_POSTCODE_INFO,
  SET_RESULTS,
  SET_ORGANIC_LOCATION,
  SET_COORDS,
  SET_LOADING,
  SET_MAP_VIEW
} from "../actions/info";

const initialState = {
  postCode: false,
  borough: false,
  coords: false,
  centerCoords: false,
  boundingBox: false,
  loading: false,
  results: [],
  mapView: false
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTCODE_INFO:
      return {
        ...state,
        postCode: action.postCode,
        borough: action.borough,
        coords: action.coords,
        centerCoords: action.coords,
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
        centerCoords: action.coords
      };
    case SET_RESULTS:
      return {
        ...state,
        results: action.results
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case SET_MAP_VIEW:
      return {
        ...state,
        mapView: action.mapView
      };
    default:
      return state;
  }
};

export default infoReducer;

export const SET_POSTCODE_INFO = "SET_POSTCODE_INFO";
export const SET_RESULTS = "SET_RESULTS";
export const SET_ORGANIC_LOCATION = "SET_ORGANIC_LOCATION";
export const SET_COORDS = "SET_COORDS";
export const SET_LOADING = "SET_LOADING";
export const SET_MAP_VIEW = "SET_MAP_VIEW";

export const THREE_MILES = 4828.03;
export const ONE_MILE = 1609.34;
export const RADIUS = ONE_MILE;

export const setPostCodeInfo = (postCode, borough, coords, boundingBox) => {
  return {
    type: SET_POSTCODE_INFO,
    postCode,
    borough,
    coords,
    boundingBox
  };
};

export const setResults = results => {
  return {
    type: SET_RESULTS,
    results
  };
};

export const setOrganicLocation = (coords, boundingBox) => {
  return {
    type: SET_ORGANIC_LOCATION,
    coords,
    boundingBox
  };
};

export const setCoords = coords => {
  return {
    type: SET_COORDS,
    coords
  };
};

export const setLoading = loading => {
  return {
    type: SET_LOADING,
    loading
  };
};

export const setMapView = mapView => {
  return {
    type: SET_MAP_VIEW,
    mapView
  };
};

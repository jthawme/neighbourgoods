export const TOGGLE_FILTER = "TOGGLE_FILTER";
export const TOGGLE_DIETARY = "TOGGLE_DIETARY";
export const SET_FILTERED_RESULTS = "SET_FILTERED_RESULTS";

export const toggleFilter = filter => {
  return {
    type: TOGGLE_FILTER,
    filter
  };
};

export const toggleDietary = dietary => {
  return {
    type: TOGGLE_DIETARY,
    dietary
  };
};

export const setFilteredResults = results => {
  return {
    type: SET_FILTERED_RESULTS,
    results
  };
};

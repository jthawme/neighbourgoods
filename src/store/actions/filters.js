export const TOGGLE_FILTER = "TOGGLE_FILTER";
export const TOGGLE_DIETARY = "TOGGLE_DIETARY";

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

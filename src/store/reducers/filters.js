import { TOGGLE_FILTER, TOGGLE_DIETARY } from "../actions/filters";

const initialState = {
  activeFilters: [],
  activeDietary: []
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER: {
      const list = state.activeFilters.slice();
      const idx = list.indexOf(action.filter);

      if (idx >= 0) {
        list.splice(idx, 1);
      } else {
        list.push(action.filter);
      }

      return {
        ...state,
        activeFilters: list
      };
    }
    case TOGGLE_DIETARY: {
      const list = state.activeDietary.slice();
      const idx = list.indexOf(action.dietary);

      if (idx >= 0) {
        list.splice(idx, 1);
      } else {
        list.push(action.dietary);
      }

      return {
        ...state,
        activeDietary: list
      };
    }
    default:
      return state;
  }
};

export default filtersReducer;

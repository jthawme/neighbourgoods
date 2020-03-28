import {
  SET_CURRENT_LINKS,
  REMOVE_CURRENT_LINKS,
  HIGHLIGHT_LOCATION
} from "../actions/location";

/**
 * Current shape:
 *
 * name: string
 * category: string
 * links:
 *   - label: string
 *     value: string
 *     type: string
 *     category: string
 */

const initialState = {
  currentLinks: false,
  highlight: false
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_LINKS:
      return {
        ...state,
        currentLinks: {
          name: action.name,
          category: action.category,
          links: action.links
        }
      };
    case REMOVE_CURRENT_LINKS:
      return {
        ...state,
        currentLinks: false
      };
    case HIGHLIGHT_LOCATION:
      return {
        ...state,
        highlight: action.id
      };
    default:
      return state;
  }
};

export default locationReducer;

import { SET_CURRENT_LINKS, REMOVE_CURRENT_LINKS } from "../actions/location";

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
  currentLinks: false
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
    default:
      return state;
  }
};

export default locationReducer;

import { createStore, combineReducers } from "redux";

import infoReducer from "./reducers/info";
import locationReducer from "./reducers/location";
import filtersReducer from "./reducers/filters";

const store = () =>
  createStore(
    combineReducers({
      info: infoReducer,
      location: locationReducer,
      filters: filtersReducer
    })
  );

export default store;

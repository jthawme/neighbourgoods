import { createStore, combineReducers } from "redux";

import infoReducer from "./reducers/info";

const store = () =>
  createStore(
    combineReducers({
      info: infoReducer
    })
  );

export default store;

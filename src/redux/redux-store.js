import {combineReducers, createStore} from "redux";
import shipsReducer from "./shipsReducer";

let reducers = combineReducers({
  shipsPage: shipsReducer
});

let store = createStore(reducers);

export default store;

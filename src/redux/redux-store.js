import {applyMiddleware, combineReducers, createStore} from "redux";
import shipsReducer from "./shipsReducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  shipsPage: shipsReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

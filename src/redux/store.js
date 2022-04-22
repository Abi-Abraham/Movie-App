import { applyMiddleware, createStore, compose } from "redux";
import Reducer from "./reducers/rootReducer";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const logger = createLogger({
  collapsed: true,
});

const middleware = [thunk];
let composeEnhancers = compose;

middleware.push(logger);
composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  Reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

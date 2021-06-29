import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer, { RootStateType } from "./reducers";

const composeEnhancers =
  typeof window === "object" &&
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middlewares = [thunkMiddleware];

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares)
  // other store enhancers if any
);

export type StoreType = {
    root: RootStateType
  };

export * from "./reducers";

export * from "./actions";

export * from "./constants";

export default function configStore() {
  const store = createStore(rootReducer, enhancer);
  return store;
}

import React from "react";
import ReactDOM from "react-dom";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {createAPI} from "./services/api";
import {requireAuthorization} from "./store/actions";
import {checkAuth} from "./store/api-actions";
import App from "./components/app/app";
import rootReducer from './store/root-reducer';
import {redirect} from "./store/middlewares/redirect";

const api = createAPI(
    () => store.dispatch(requireAuthorization(false))
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      },
    }).concat(redirect)
});

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

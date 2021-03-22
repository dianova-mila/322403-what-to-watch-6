import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {ActionCreator} from "./store/actions";
import {checkAuth} from "./store/api-actions";
import {composeWithDevTools} from "redux-devtools-extension";
import App from "./components/app/app";
import {reducer} from "./store/reducer";
import {redirect} from "./store/middlewares/redirect";

const mainMovie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014
};

const api = createAPI(
    () => store.dispatch(ActionCreator.requireAuthorization(false))
);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

store.dispatch(checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App
        mainMovie={mainMovie}
      />
    </Provider>,
    document.querySelector(`#root`)
);

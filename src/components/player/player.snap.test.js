import React from "react";
import {Router} from "react-router-dom";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {createMemoryHistory} from "history";
import movie from "../../mocks/movie";
import App from "../app/app";

const mockStore = configureStore({});


it(`Player should render correctly`, () => {
  const store = mockStore({
    MOVIE: {movie, isOneMovieLoaded: true}
  });

  const history = createMemoryHistory();
  history.push(`/player/1`);

  const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});

import {Provider} from "react-redux";
import {createMemoryHistory} from "history";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import App from "../app/app";
import React from "react";
import films from "../../mocks/films";
import movie from "../../mocks/movie";
import comments from "../../mocks/comments";
import configureStore from "redux-mock-store";

const mockStore = configureStore({});

it(`MoviePage should render correctly`, () => {
  const store = mockStore({
    USER: {authorizationStatus: true, userInfo: {avatarUrl: `img/1.png`}},
    FILMS: {movies: films},
    MOVIE: {movie, comments, isOneMovieLoaded: true}
  });

  const history = createMemoryHistory();
  history.push(`/films/1`);

  const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});

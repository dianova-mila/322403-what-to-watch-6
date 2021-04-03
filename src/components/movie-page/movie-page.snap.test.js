import React from "react";
import {Router} from "react-router-dom";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {createMemoryHistory} from "history";
import movie from "../../mocks/movie";
import films from "../../mocks/films";
import comments from "../../mocks/comments";
import MoviePage from "./movie-page";
import * as redux from "react-redux";

const mockStore = configureStore({});

const onUserAvatarClick = jest.fn();
const onPlayButtonClick = jest.fn();
const onSmallMovieCardClick = jest.fn();

it(`MoviePage should render correctly`, () => {
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  const store = mockStore({
    USER: {authorizationStatus: true, userInfo: {avatarUrl: `img/1.png`}},
    FILMS: {movies: films},
    MOVIE: {movie, comments, isOneMovieLoaded: true}
  });

  const history = createMemoryHistory();
  history.push(`/films/1/review`);

  const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <MoviePage
            onSmallMovieCardClick={onSmallMovieCardClick}
            onPlayButtonClick={onPlayButtonClick}
            onUserAvatarClick={onUserAvatarClick}/>
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});

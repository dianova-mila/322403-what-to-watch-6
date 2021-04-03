import React from "react";
import {Router} from "react-router-dom";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {createMemoryHistory} from "history";
import MainPage from "./main-page";
import movie from "../../mocks/movie";
import films from "../../mocks/films";

const onUserAvatarClick = jest.fn();
const onPlayButtonClick = jest.fn();
const onSmallMovieCardClick = jest.fn();
const mockStore = configureStore({});


it(`MainPage should render correctly`, () => {
  const history = createMemoryHistory();
  history.push({pathname: `/`});

  const {container} = render(
      <Provider store={mockStore({
        FILMS: {movies: films, movieList: films, currentGenre: `All genres`, isDataLoaded: true},
        MOVIE: {promoMovie: movie, isPromoMovieLoaded: true},
        USER: {authorizationStatus: true, userInfo: {avatarUrl: `img/1.png`}}
      })}>
        <Router history={history}>
          <MainPage
            onUserAvatarClick={onUserAvatarClick}
            onPlayButtonClick={onPlayButtonClick}
            onSmallMovieCardClick={onSmallMovieCardClick}
          />
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});

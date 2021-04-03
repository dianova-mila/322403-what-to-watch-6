import React from "react";
import {Router} from "react-router-dom";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {createMemoryHistory} from "history";
import movie from "../../mocks/movie";
import MovieCard from "./movie-card";

const authorizationStatus = true;
const userInfo = {avatarUrl: `img/1.png`};

const onUserAvatarClick = jest.fn();
const onPlayButtonClick = jest.fn();
const mockStore = configureStore({});


it(`MovieCard should render correctly`, () => {
  const history = createMemoryHistory();

  const {container} = render(
      <Provider store={mockStore({
        USER: {authorizationStatus, userInfo},
        MOVIE: {promoMovie: movie, isPromoMovieLoaded: true}
      })}>
        <Router history={history}>
          <MovieCard onUserAvatarClick={onUserAvatarClick} onPlayButtonClick={onPlayButtonClick}/>
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});

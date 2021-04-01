import React from "react";
import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import * as redux from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app";
import films from "../../mocks/films";
import movie from "../../mocks/movie";
import comments from "../../mocks/comments";

const mockStore = configureStore({});

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    const store = mockStore({
      FILMS: {movies: films, movieList: films, currentGenre: `All genres`, isDataLoaded: true},
      MOVIE: {promoMovie: movie, isPromoMovieLoaded: true},
      USER: {authorizationStatus: true, userInfo: {avatarUrl: `img/1.png`}}
    });

    const history = createMemoryHistory();
    const {container} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Render 'SingIn' when user navigate to '/login' url`, () => {
    const store = mockStore({
      USER: {authorizationStatus: false}
    });

    const history = createMemoryHistory();
    history.push(`/login`);

    render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByLabelText(`Email address`)).toBeInTheDocument();
    expect(screen.getByLabelText(`Password`)).toBeInTheDocument();
  });

  it(`Render 'MyList' when user navigate to '/mylist' url`, () => {
    const store = mockStore({
      USER: {userInfo: {avatarUrl: `img/1.png`}},
      FILMS: {favoritesMovies: films, isFavoritesLoaded: true}
    });

    const history = createMemoryHistory();
    history.push(`/mylist`);

    const {container} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Render 'AddReview' when user navigate to '/films/:id/review' url`, () => {
    const store = mockStore({
      USER: {authorizationStatus: true, userInfo: {avatarUrl: `img/1.png`}},
      FILMS: {movies: films},
      MOVIE: {movie, comments, isOneMovieLoaded: true}
    });

    const history = createMemoryHistory();
    history.push(`/films/1/review`);

    const {container} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Render 'MoviePage' when user navigate to '/films/:id' url`, () => {
    const store = mockStore({
      USER: {authorizationStatus: true, userInfo: {avatarUrl: `img/1.png`}},
      FILMS: {movies: films},
      MOVIE: {movie, comments, isOneMovieLoaded: true}
    });

    const history = createMemoryHistory();
    history.push(`/films/1`);

    const {container} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Render 'Player' when user navigate to '/player/:id' url`, () => {
    const store = mockStore({
      MOVIE: {movie, isOneMovieLoaded: true}
    });

    const history = createMemoryHistory();
    history.push(`/player/1`);

    const {container} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Render 'NotFoundScreen' when user navigate to non-existent route`, () => {
    const history = createMemoryHistory();
    history.push(`/non-existent-route`);

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(`404. Page not found`)).toBeInTheDocument();
    expect(screen.getByText(`Вернуться на главную`)).toBeInTheDocument();
  });
});


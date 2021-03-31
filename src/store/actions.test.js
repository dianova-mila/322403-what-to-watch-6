import {
  loadFavorites,
  loadUserInfo,
  loadComments,
  loadOneMovie,
  loadMovies,
  loadPromoMovie,
  getMovieList,
  redirectToRoute,
  requireAuthorization,
  changeGenre,
  ActionType,
} from "./actions";
import films from "../mocks/films";
import comments from "../mocks/comments";
import movie from "../mocks/movie";

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: `Drama`,
    };

    expect(changeGenre(`Drama`)).toEqual(expectedAction);
  });

  it(`Action creator for requiring authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: true,
    };

    expect(requireAuthorization(true)).toEqual(expectedAction);
  });

  it(`Action creator for redirecting to route returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: `/login`,
    };

    expect(redirectToRoute(`/login`)).toEqual(expectedAction);
  });

  it(`Action creator for loading user info to route returns correct action`, () => {
    const userInfo = {
      "email": `Oliver.conner@gmail.com`,
      "password": `12345678`
    };

    const expectedAction = {
      type: ActionType.LOAD_USER_INFO,
      payload: userInfo,
    };

    expect(loadUserInfo(userInfo)).toEqual(expectedAction);
  });

  it(`Action creator for getting movie list returns correct action`, () => {
    const expectedAction = {
      type: ActionType.GET_MOVIE_LIST,
      payload: films.filter((item) => item.genre === `Drama`),
    };

    expect(getMovieList(`Drama`, films)).toEqual(expectedAction);
  });

  it(`Action creator for getting movie list returns correct action with selected 'All genres'`, () => {
    const expectedAction = {
      type: ActionType.GET_MOVIE_LIST,
      payload: films,
    };

    expect(getMovieList(`All genres`, films)).toEqual(expectedAction);
  });

  it(`Action creator for getting loading comments returns correct`, () => {
    const expectedAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    };

    expect(loadComments(comments)).toEqual(expectedAction);
  });

  it(`Action creator for getting loading favorites returns correct`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: films,
    };

    expect(loadFavorites(films)).toEqual(expectedAction);
  });

  it(`Action creator for getting loading movies returns correct`, () => {
    const expectedAction = {
      type: ActionType.LOAD_MOVIES,
      payload: films,
    };

    expect(loadMovies(films)).toEqual(expectedAction);
  });

  it(`Action creator for getting loading one movie returns correct`, () => {
    const expectedAction = {
      type: ActionType.LOAD_ONE_MOVIE,
      payload: movie,
    };

    expect(loadOneMovie(movie)).toEqual(expectedAction);
  });

  it(`Action creator for getting loading promo movie returns correct`, () => {
    const expectedAction = {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie,
    };

    expect(loadPromoMovie(movie)).toEqual(expectedAction);
  });
});

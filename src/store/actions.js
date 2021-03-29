import {createAction} from "@reduxjs/toolkit";

const ActionType = {
  CHANGE_GENRE: `films/changeGenre`,
  GET_MOVIE_LIST: `films/getMovieList`,
  LOAD_MOVIES: `films/loadMovies`,
  LOAD_ONE_MOVIE: `movie/loadOneMovie`,
  LOAD_COMMENTS: `movie/comments`,
  REDIRECT_TO_ROUTE: `action/redirectToRoute`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
  LOAD_USER_INFO: `user/loadUserInfo`,
};

const changeGenre = createAction(ActionType.CHANGE_GENRE, (currentGenre) => {
  return {
    payload: currentGenre
  };
});

const getMovieList = createAction(ActionType.GET_MOVIE_LIST, (currentGenre, movies) => {
  if (currentGenre === `All genres`) {
    return {
      payload: movies
    };
  }

  return {
    payload: movies.filter((movie) => movie.genre === currentGenre)
  };
});

const loadMovies = createAction(ActionType.LOAD_MOVIES, (movies) => {
  return {
    payload: movies
  };
});

  loadOneMovie: (movie) => ({
    type: ActionType.LOAD_ONE_MOVIE,
    payload: movie
  }),

  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  }),

const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status
  };
});

const loadUserInfo = createAction(ActionType.LOAD_USER_INFO, (userInfo) => {
  return {
    payload: userInfo
  };
});

const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url
  };
});

export {
  ActionType,
  changeGenre,
  getMovieList,
  loadMovies,
  loadFavorites,
  loadOneMovie,
  loadPromoMovie,
  loadComments,
  requireAuthorization,
  loadUserInfo,
  redirectToRoute
};

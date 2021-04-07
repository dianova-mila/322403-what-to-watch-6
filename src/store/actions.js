import {createAction} from "@reduxjs/toolkit";
import {ALL_GENRES} from "../const";

const ActionType = {
  CHANGE_GENRE: `films/changeGenre`,
  GET_MOVIE_LIST: `films/getMovieList`,
  LOAD_MOVIES: `films/loadMovies`,
  LOAD_FAVORITES: `films/loadFavorites`,
  LOAD_ONE_MOVIE: `movie/loadOneMovie`,
  LOAD_PROMO_MOVIE: `movie/loadPromoMovie`,
  LOAD_COMMENTS: `movie/loadComments`,
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
  if (currentGenre === ALL_GENRES) {
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

const loadFavorites = createAction(ActionType.LOAD_FAVORITES, (favoritesMovies) => {
  return {
    payload: favoritesMovies
  };
});

const loadOneMovie = createAction(ActionType.LOAD_ONE_MOVIE, (movie) => {
  return {
    payload: movie
  };
});

const loadPromoMovie = createAction(ActionType.LOAD_PROMO_MOVIE, (promoMovie) => {
  return {
    payload: promoMovie
  };
});

const loadComments = createAction(ActionType.LOAD_COMMENTS, (comments) => {
  return {
    payload: comments
  };
});

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

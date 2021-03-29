import {
  loadMovies,
  loadComments,
  loadOneMovie,
  loadFavorites,
  loadPromoMovie,
  redirectToRoute,
  loadUserInfo,
  requireAuthorization
} from "./actions";
import {adaptMovieToClient, adaptMoviesToClient, adaptUserInfoToClient} from "./adapter";

const fetchMovies = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(loadMovies(adaptMoviesToClient(data))))
);

const fetchOneMovie = (id) => (dispatch, _getState, api) => (
  Promise.all([
    api.get(`/films/${id}`),
    api.get(`/comments/${id}`)
  ]).then(([movie, comments]) => {
    dispatch(ActionCreator.loadComments(comments.data));
    dispatch(ActionCreator.loadOneMovie(adaptMovieToClient(movie.data)));
  }).catch(() => dispatch(ActionCreator.redirectToRoute(`/404`)))
);


const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(ActionCreator.requireAuthorization(true)))
    .catch(() => {})
);

const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(() => dispatch(ActionCreator.requireAuthorization(true)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`/`)))
);

const addReview = ({rating, comment}, id, onError) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {rating, comment})
    .then(() => dispatch(redirectToRoute(`/films/${id}`)))
    .catch(() => onError())
);

export {fetchMovies, fetchOneMovie, fetchPromoMovie, fetchFavorites, addToFavorites, checkAuth, login, logout, addReview};

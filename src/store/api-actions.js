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

const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(`/favorite`)
    .then(({data}) => dispatch(loadFavorites(adaptMoviesToClient(data))))
);

const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => dispatch(loadUserInfo(adaptUserInfoToClient(data))))
    .then(() => dispatch(requireAuthorization(true)))
    .catch(() => {})
);

const login = ({login: email, password}, onError) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(() => dispatch(requireAuthorization(true)))
    .then(() => dispatch(redirectToRoute(`/`)))
    .catch(() => onError())
);

const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => dispatch(redirectToRoute(`/`)))
);

const addToFavorites = (id, status, onSuccess) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${status}`)
    .then(() => onSuccess())
    .catch(() => dispatch(redirectToRoute(`/login`)))
);

const addReview = ({rating, comment}, id, onError) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {rating, comment})
    .then(() => dispatch(redirectToRoute(`/films/${id}`)))
    .catch(() => onError())
);

export {fetchMovies, fetchOneMovie, fetchPromoMovie, fetchFavorites, addToFavorites, checkAuth, login, logout, addReview};

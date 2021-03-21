import {ActionCreator} from "./actions";
import {adaptMoviesToClient} from "./adapter";

const fetchMovies = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(ActionCreator.loadMovies(adaptMoviesToClient(data))))
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

export {fetchMovies, checkAuth, login};

import {ActionCreator} from "./actions";
import {adaptMoviesToClient} from "./adapter";

const fetchMovies = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(ActionCreator.loadMovies(adaptMoviesToClient(data))))
);

export {fetchMovies};

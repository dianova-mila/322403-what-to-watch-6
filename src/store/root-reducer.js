import {combineReducers} from "redux";
import {films} from "./films/films";
import {movie} from "./movie/movie";
import {user} from './user/user';

const NameSpace = {
  FILMS: `FILMS`,
  MOVIE: `MOVIE`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.FILMS]: films,
  [NameSpace.MOVIE]: movie,
  [NameSpace.USER]: user,
});

export {NameSpace};


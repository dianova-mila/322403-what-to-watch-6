import {ActionType} from "./actions";

const initialState = {
  currentGenre: `All genres`,
  movieList: [],
  movies: [],
  isDataLoaded: false,
  authorizationStatus: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        currentGenre: action.currentGenre
      };

    case ActionType.GET_MOVIE_LIST:
      return {
        ...state,
        movieList: action.movieList
      };

    case ActionType.LOAD_MOVIES:
      return {
        ...state,
        movieList: action.payload,
        movies: action.payload,
        isDataLoaded: true
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
  }

  return state;
};


export {reducer};

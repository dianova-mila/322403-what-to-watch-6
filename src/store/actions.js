const ActionType = {
  CHANGE_GENRE: `films/changeGenre`,
  GET_MOVIE_LIST: `films/getMovieList`,
  LOAD_MOVIES: `films/loadMovies`,
  REDIRECT_TO_ROUTE: `action/redirectToRoute`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
};

const ActionCreator = {
  changeGenre: (currentGenre) => ({
    type: ActionType.CHANGE_GENRE,
    currentGenre
  }),

  getMovieList: (currentGenre, movies) => {
    if (currentGenre === `All genres`) {
      return {
        type: ActionType.GET_MOVIE_LIST,
        movieList: movies
      };
    }

    return {
      type: ActionType.GET_MOVIE_LIST,
      movieList: movies.filter((movie) => movie.genre === currentGenre)
    };
  },

  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),

  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  })
};

export {ActionType, ActionCreator};

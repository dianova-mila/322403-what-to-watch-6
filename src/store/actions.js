const ActionType = {
  CHANGE_GENRE: `films/changeGenre`,
  GET_MOVIE_LIST: `films/getMovieList`,
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
  }
};

export {ActionType, ActionCreator};

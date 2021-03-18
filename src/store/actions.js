const ActionType = {
  CHANGE_GENRE: `films/changeGenre`,
  GET_MOVIE_LIST: `films/getMovieList`,
  LOAD_MOVIES: `data/loadQuestions`,
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
  })
};

export {ActionType, ActionCreator};

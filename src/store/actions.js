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

    const moviesByGenre = movies.filter((movie) => movie.genre === currentGenre);

    return {
      type: ActionType.GET_MOVIE_LIST,
      movieList: moviesByGenre
    };
  }
};

export {ActionType, ActionCreator};

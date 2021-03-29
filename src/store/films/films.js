import {createReducer} from "@reduxjs/toolkit";
import {changeGenre, loadMovies, getMovieList, loadFavorites} from "../actions";

const initialState = {
  currentGenre: `All genres`,
  movieList: [],
  movies: [],
  isDataLoaded: false,
  favoritesMovies: [],
  isFavoritesLoaded: false
};

const films = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.currentGenre = action.payload;
  });

  builder.addCase(loadMovies, (state, action) => {
    state.movies = action.payload;
    state.movieList = action.payload;
    state.isDataLoaded = true;
  });

  builder.addCase(getMovieList, (state, action) => {
    state.movieList = action.payload;
  });

  builder.addCase(loadFavorites, (state, action) => {
    state.favoritesMovies = action.payload;
    state.isFavoritesLoaded = true;
  });
});

export {films};

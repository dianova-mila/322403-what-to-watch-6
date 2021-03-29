import {createReducer} from "@reduxjs/toolkit";
import {loadOneMovie, loadPromoMovie, loadComments} from "../actions";

const initialState = {
  movie: {},
  promoMovie: {},
  isPromoMovieLoaded: false,
  comments: [],
  isOneMovieLoaded: false,
};

const movie = createReducer(initialState, (builder) => {
  builder.addCase(loadOneMovie, (state, action) => {
    state.movie = action.payload;
    state.isOneMovieLoaded = true;
  });

  builder.addCase(loadPromoMovie, (state, action) => {
    state.promoMovie = action.payload;
    state.isPromoMovieLoaded = true;
  });

  builder.addCase(loadComments, (state, action) => {
    state.comments = action.payload;
  });
});

export {movie};

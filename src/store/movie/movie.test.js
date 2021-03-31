import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../services/api";
import {movie as movieReducer} from "./movie";
import movie from "../../mocks/movie";
import comments from "../../mocks/comments";
import {ActionType} from "../actions";
import {fetchOneMovie, fetchPromoMovie} from "../api-actions";
import {adaptMovieToClient} from "../adapter";

const api = createAPI(() => {});

const movieMock = {
  "name": `Macbeth`,
  "poster_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Macbeth.jpg`,
  "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/macbeth.jpg`,
  "background_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Macbeth.jpg`,
  "background_color": `#F1E9CE`,
  "description": `Macbeth, the Thane of Glamis, receives a prophecy from a trio of witches that one day he will become King of Scotland. Consumed by ambition and spurred to action by his wife, Macbeth murders his king and takes the throne for himself.`,
  "rating": 3.3,
  "scores_count": 48798,
  "director": `Justin Kurzel`,
  "starring": [
    `Michael Fassbender`,
    `Marion Cotillard`,
    `Jack Madigan`
  ],
  "run_time": 113,
  "genre": `Drama`,
  "released": 2015,
  "id": 1,
  "is_favorite": false,
  "video_link": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
};

describe(`Reducer 'movie' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(movieReducer(undefined, {}))
      .toEqual({
        movie: {},
        promoMovie: {},
        isPromoMovieLoaded: false,
        comments: [],
        isOneMovieLoaded: false,
      });
  });

  it(`Reducer should update movie by load movie`, () => {
    const state = {movie: [], isOneMovieLoaded: false};
    const loadMovie = {
      type: ActionType.LOAD_ONE_MOVIE,
      payload: movie
    };

    expect(movieReducer(state, loadMovie))
      .toEqual({movie, isOneMovieLoaded: true});
  });

  it(`Reducer should update comments by load comments`, () => {
    const state = {comments: []};
    const loadFavorites = {
      type: ActionType.LOAD_COMMENTS,
      payload: comments
    };

    expect(movieReducer(state, loadFavorites))
      .toEqual({comments});
  });

  it(`Reducer should update promo-movie by load promo-movie`, () => {
    const state = {promoMovie: {}, isPromoMovieLoaded: false};
    const loadMovies = {
      type: ActionType.LOAD_PROMO_MOVIE,
      payload: movie
    };

    expect(movieReducer(state, loadMovies))
      .toEqual({promoMovie: movie, isPromoMovieLoaded: true});
  });
});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to fetch one movie`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = fetchOneMovie(1);

    apiMock
      .onGet(`/films/1`)
      .reply(200, movieMock);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, comments);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: comments,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_ONE_MOVIE,
          payload: adaptMovieToClient(movieMock),
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = fetchPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, movieMock);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: adaptMovieToClient(movieMock),
        });
      });
  });
});


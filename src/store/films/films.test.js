import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../services/api";
import {films as filmsReducer} from "./films";
import films from "../../mocks/films";
import {ActionType} from "../actions";
import {fetchMovies, fetchFavorites} from "../api-actions";
import {adaptMoviesToClient} from "../adapter";

const api = createAPI(() => {});

const filmsMock = [
  {
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
  },
  {
    "name": `Beach`,
    "poster_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/beach.jpg`,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/beach.jpg`,
    "background_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/beach.jpg`,
    "background_color": `#EBC996`,
    "description": `Vicenarian Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss. Excited and intrigued, he sets out to find it.`,
    "rating": 3.3,
    "scores_count": 207824,
    "director": `Danny Boyle`,
    "starring": [
      `Leonardo DiCaprio`,
      `Daniel York`,
      `Patcharawan Patarakijjanon`
    ],
    "run_time": 119,
    "genre": `Adventure`,
    "released": 2000,
    "id": 2,
    "is_favorite": false,
    "video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
];

describe(`Reducer 'films' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(filmsReducer(undefined, {}))
      .toEqual({
        currentGenre: `All genres`,
        favoritesMovies: [],
        isDataLoaded: false,
        isFavoritesLoaded: false,
        movieList: [],
        movies: [],
      });
  });

  it(`Reducer should update movies by load movies`, () => {
    const state = {movies: [], movieList: [], isDataLoaded: false};
    const loadMovies = {
      type: ActionType.LOAD_MOVIES,
      payload: films
    };

    expect(filmsReducer(state, loadMovies))
      .toEqual({movies: films, movieList: films, isDataLoaded: true});
  });

  it(`Reducer should update favorites movies by load favorites`, () => {
    const state = {favoritesMovies: [], isFavoritesLoaded: false};
    const loadFavorites = {
      type: ActionType.LOAD_FAVORITES,
      payload: films
    };

    expect(filmsReducer(state, loadFavorites))
      .toEqual({favoritesMovies: films, isFavoritesLoaded: true});
  });

  it(`Reducer should update current genre movies by a given value`, () => {
    const state = {currentGenre: `All genres`};
    const changeGenre = {
      type: ActionType.CHANGE_GENRE,
      payload: `Crime`
    };

    expect(filmsReducer(state, changeGenre))
      .toEqual({currentGenre: `Crime`});
  });

  it(`Reducer should update movie list movies by a given value`, () => {
    const state = {movieList: []};
    const getMovieList = {
      type: ActionType.GET_MOVIE_LIST,
      payload: films
    };

    expect(filmsReducer(state, getMovieList))
      .toEqual({movieList: films});
  });

});

describe(`Async operation work correctly`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = fetchMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, filmsMock);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: adaptMoviesToClient(filmsMock),
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = fetchFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, filmsMock);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: adaptMoviesToClient(filmsMock),
        });
      });
  });
});


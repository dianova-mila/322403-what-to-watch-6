import MockAdapter from "axios-mock-adapter";
import {
  checkAuth,
  fetchFavorites,
  fetchMovies,
  fetchOneMovie,
  fetchPromoMovie,
  login,
  addToFavorites,
  addReview
} from "./api-actions";
import {ActionType} from "./actions";
import {adaptMoviesToClient, adaptMovieToClient, adaptUserInfoToClient} from "./adapter";
import {createAPI} from "../services/api";
import comments from "../mocks/comments";

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


describe(`Api actions work correctly`, () => {
  it(`Should make a correct call to fetchMovie`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const apiAction = fetchMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, filmsMock);

    return apiAction(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: adaptMoviesToClient(filmsMock),
        });
      });
  });

  it(`Should make a correct call to fetchFavorites`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const apiAction = fetchFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, filmsMock);

    return apiAction(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: adaptMoviesToClient(filmsMock),
        });
      });
  });

  it(`Should make a correct call to fetchOneMovie`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const apiAction = fetchOneMovie(1);

    apiMock
      .onGet(`/films/1`)
      .reply(200, movieMock);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, comments);

    return apiAction(dispatch, () => {}, api)
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

  it(`Should make a correct call to fetchPromoMovie`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const apiAction = fetchPromoMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, movieMock);

    return apiAction(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_MOVIE,
          payload: adaptMovieToClient(movieMock),
        });
      });
  });

  it(`Should make a correct call to checkAuth`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const apiAction = checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, {
        "id": 1,
        "email": `Oliver.conner@gmail.com`,
        "name": `Oliver.conner`,
        "avatar-url": `img/1.png`,
      });

    return apiAction(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_USER_INFO,
          payload: adaptUserInfoToClient({
            "id": 1,
            "email": `Oliver.conner@gmail.com`,
            "name": `Oliver.conner`,
            "avatar-url": `img/1.png`,
          })
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: true,
        });
      });
  });

  it(`Should make a correct call to login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@test.ru`, password: `123456`};
    const apiAction = login(fakeUser);

    apiMock
      .onPost(`/login`)
      .reply(200, {
        "id": 1,
        "email": `test@test.ru`,
        "name": `test`,
        "avatar-url": `img/1.png`,
      });

    return apiAction(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_USER_INFO,
          payload: adaptUserInfoToClient({
            "id": 1,
            "email": `test@test.ru`,
            "name": `test`,
            "avatar-url": `img/1.png`,
          })
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: true,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/`,
        });
      });
  });

  it(`Should make a correct call to addToFavorites`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onSuccess = jest.fn();
    const apiAction = addToFavorites(1, 1, onSuccess);

    apiMock
      .onPost(`/favorite/1/1`)
      .reply(200, movieMock);

    return apiAction(dispatch, () => {}, api)
      .then(() => {
        expect(onSuccess).toHaveBeenCalledTimes(1);
      });
  });

  it(`Should make a correct call to addReview`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onError = jest.fn();
    const apiAction = addReview({rating: 8, comment: `fake comment`}, 1, onError);

    apiMock
      .onPost(`/comments/1`, {rating: 8, comment: `fake comment`})
      .reply(200, {rating: 8, comment: `fake comment`});

    return apiAction(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REDIRECT_TO_ROUTE,
          payload: `/films/1`,
        });
      });
  });
});


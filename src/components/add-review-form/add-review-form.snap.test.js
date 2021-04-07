import React from "react";
import {Router} from "react-router-dom";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {createMemoryHistory} from "history";
import movie from "../../mocks/movie";
import films from "../../mocks/films";
import comments from "../../mocks/comments";
import AddReviewForm from "./add-review-form";
import * as redux from "react-redux";

const mockStore = configureStore({});

it(`AddReviewForm should render correctly`, () => {
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  const store = mockStore({
    USER: {authorizationStatus: true, userInfo: {avatarUrl: `img/1.png`}},
    FILMS: {movies: films},
    MOVIE: {movie, comments, isOneMovieLoaded: true}
  });

  const history = createMemoryHistory();
  history.push(`/films/1/review`);

  const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <AddReviewForm id={`1`}/>
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});

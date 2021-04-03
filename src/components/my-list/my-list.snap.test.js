import React from "react";
import {Router} from "react-router-dom";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import * as redux from "react-redux";
import {createMemoryHistory} from "history";
import MyList from "./my-list";
import films from "../../mocks/films";

const authorizationStatus = true;
const userInfo = {avatarUrl: `img/1.png`};

const onUserAvatarClick = jest.fn();
const onPlayButtonClick = jest.fn();
const onSmallMovieCardClick = jest.fn();
const mockStore = configureStore({});


it(`MyList should render correctly`, () => {
  const fakeDispatch = jest.fn();
  jest.spyOn(redux, `useDispatch`).mockImplementation(() => fakeDispatch);

  const history = createMemoryHistory();

  const {container} = render(
      <Provider store={mockStore({
        USER: {authorizationStatus, userInfo},
        FILMS: {favoritesMovies: films, isFavoritesLoaded: true}
      })}>
        <Router history={history}>
          <MyList
            onUserAvatarClick={onUserAvatarClick}
            onPlayButtonClick={onPlayButtonClick}
            onSmallMovieCardClick={onSmallMovieCardClick}
          />
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});

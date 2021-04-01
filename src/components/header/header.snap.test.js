import React from "react";
import {Router} from "react-router-dom";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Header from "./header";
import {createMemoryHistory} from "history";

const authorizationStatus = true;
const userInfo = {avatarUrl: `img/1.png`};

const onUserAvatarClick = jest.fn();
const mockStore = configureStore({});
const history = createMemoryHistory();

describe(`Test header`, () => {
  it(`Header should render correctly when user authorized`, () => {

    const {container} = render(
        <Provider store={mockStore({
          USER: {authorizationStatus, userInfo}
        })}>
          <Router history={history}>
            <Header onUserAvatarClick={onUserAvatarClick}/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Header should render correctly when user not authorized`, () => {

    const {container} = render(
        <Provider store={mockStore({
          USER: {authorizationStatus: false, userInfo: {}}
        })}>
          <Router history={history}>
            <Header onUserAvatarClick={onUserAvatarClick}/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

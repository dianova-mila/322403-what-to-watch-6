import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import SignIn from "./sign-in";

const mockStore = configureStore({});

it(`Render 'SignIn' when user navigate to '/login' url`, () => {
  const history = createMemoryHistory();
  history.push(`/login`);

  render(
      <Provider store={mockStore({
        USER: {authorizationStatus: false}
      })}>
        <Router history={history}>
          <SignIn />
        </Router>
      </Provider>
  );

  expect(screen.getByLabelText(`Email address`)).toBeInTheDocument();
  expect(screen.getByLabelText(`Password`)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(`login`), `keks`);
  userEvent.type(screen.getByTestId(`password`), `123456`);

  expect(screen.getByDisplayValue(`keks`)).toBeInTheDocument();
  expect(screen.getByDisplayValue(`123456`)).toBeInTheDocument();
});


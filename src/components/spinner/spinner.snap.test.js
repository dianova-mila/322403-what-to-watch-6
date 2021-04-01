import React from "react";
import {render} from "@testing-library/react";
import {Router} from 'react-router-dom';
import {createMemoryHistory} from "history";
import Spinner from "./spinner";

test(`Spinner should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <Spinner />
      </Router>
  );
  expect(container).toMatchSnapshot();
});

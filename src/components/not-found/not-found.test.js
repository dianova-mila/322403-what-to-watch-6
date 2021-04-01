import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import NotFound from "./not-found";

it(`NotFound should render correctly`, () => {
  const history = createMemoryHistory();
  const {getByText} = render(
      <Router history={history}>
        <NotFound />
      </Router>
  );
  const headerElement = getByText(`404. Page not found`);
  const linkElement = getByText(`Вернуться на главную`);

  expect(headerElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});

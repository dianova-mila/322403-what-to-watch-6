import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import movie from "../../mocks/movie";
import SmallMovieCard from "./small-movie-card";

it(`SmallMovieCard should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <SmallMovieCard movie={movie}/>
      </Router>
  );

  expect(container).toMatchSnapshot();
});

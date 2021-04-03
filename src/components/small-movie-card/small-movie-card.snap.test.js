import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import movie from "../../mocks/movie";
import SmallMovieCard from "./small-movie-card";

const onSmallMovieCardClick = jest.fn();

it(`SmallMovieCard should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <SmallMovieCard movie={movie} onSmallMovieCardClick={onSmallMovieCardClick}/>
      </Router>
  );

  expect(container).toMatchSnapshot();
});

import React from "react";
import {render} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import films from "../../mocks/films";
import MovieList from "./movie-list";

const onSmallMovieCardClick = jest.fn();

it(`MovieList should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <MovieList films={films} onSmallMovieCardClick={onSmallMovieCardClick}/>
      </Router>
  );

  expect(container).toMatchSnapshot();
});

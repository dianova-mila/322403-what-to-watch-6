import React from "react";
import {render} from "@testing-library/react";
import movie from "../../mocks/movie";
import comments from "../../mocks/comments";
import MoviePageTabs from "./movie-page-tabs";

it(`MoviePageTabs should render correctly`, () => {
  const {container} = render(<MoviePageTabs movie={movie} comments={comments}/>);

  expect(container).toMatchSnapshot();
});

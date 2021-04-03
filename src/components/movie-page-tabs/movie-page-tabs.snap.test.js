import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import movie from "../../mocks/movie";
import comments from "../../mocks/comments";
import MoviePageTabs from "./movie-page-tabs";

describe(`MoviePageTabs should render correctly`, () => {
  it(`MoviePageTabs should render correctly, when selected Overview`, () => {
    const {container} = render(<MoviePageTabs movie={movie} comments={comments}/>);

    expect(container).toMatchSnapshot();
  });

  it(`MoviePageTabs should render correctly, when selected Details`, () => {
    const {container} = render(<MoviePageTabs movie={movie} comments={comments}/>);

    userEvent.click(screen.getByText(/Details/i));

    expect(container).toMatchSnapshot();
  });

  it(`MoviePageTabs should render correctly, when selected Reviews`, () => {
    const {container} = render(<MoviePageTabs movie={movie} comments={comments}/>);

    userEvent.click(screen.getByText(/Reviews/i));

    expect(container).toMatchSnapshot();
  });
});

import React from "react";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import movie from "../../mocks/movie";
import comments from "../../mocks/comments";
import MoviePageTabs from "./movie-page-tabs";
import {Tabs} from "../../const";

describe(`MoviePageTabs should render correctly`, () => {
  it(`MoviePageTabs should render correctly, when selected Overview`, () => {
    const {container} = render(<MoviePageTabs defaultTab={Tabs.OVERVIEW} movie={movie} comments={comments}/>);

    expect(container).toMatchSnapshot();
  });

  it(`MoviePageTabs should render correctly, when selected Details`, () => {
    const {container} = render(<MoviePageTabs defaultTab={Tabs.OVERVIEW} movie={movie} comments={comments}/>);

    userEvent.click(screen.getByText(/Details/i));

    expect(container).toMatchSnapshot();
  });

  it(`MoviePageTabs should render correctly, when selected Reviews`, () => {
    const {container} = render(<MoviePageTabs defaultTab={Tabs.OVERVIEW} movie={movie} comments={comments}/>);

    userEvent.click(screen.getByText(/Reviews/i));

    expect(container).toMatchSnapshot();
  });

  it(`MoviePageTabs should render correctly in AddReview page`, () => {
    const mockStore = configureStore({});
    const history = createMemoryHistory();

    const {container} = render(
        <Provider store={mockStore({})}>
          <Router history={history}>
            <MoviePageTabs defaultTab={Tabs.REVIEWS} movie={movie} comments={comments}/>
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

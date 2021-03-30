import React from 'react';
import PropTypes from "prop-types";
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import filmsPropTypes from "../../prop-types/films-prop-types";
import browserHistory from "../../browser-history";
import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";
import MyList from "../my-list/my-list";
import Player from "../player/player";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import NotFound from "../not-found/not-found";
import PrivateRoute from '../private-route/private-route';


const App = (props) => {
  const {films} = props;

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact
          path="/"
          render={({history}) => {
            return (
              <MainPage onUserAvatarClick={() => history.push(`/mylist`)} />
            );
          }}
        >
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <PrivateRoute exact
          path="/mylist"
          render={() => <MyList films={films} />}
        >
        </PrivateRoute>
        <PrivateRoute exact
          path="/films/:id/review"
          render={({history}) => {
            return (
              <AddReview onUserAvatarClick={() => history.push(`/mylist`)}/>
            );
          }}
        >
        </PrivateRoute>
        <Route
          exact
          path="/films/:id"
          render={({history}) => {
            return (
              <MoviePage onUserAvatarClick={() => history.push(`/mylist`)} />
            );
          }}
        >
        </Route>
        <Route
          exact
          path="/player/:id"
          render={() =>
            <Player films={films} />
          }>
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  mainMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  }),
  films: filmsPropTypes
};

export default App;

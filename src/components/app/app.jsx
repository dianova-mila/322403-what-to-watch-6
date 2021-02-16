import React from 'react';
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import filmsPropTypes from "../films-prop-types";
import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";
import MyList from "../my-list/my-list";
import Player from "../player/player";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import NotFound from "../not-found/not-found";


const App = (props) => {
  const {MainMovie, films} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage MainMovie={MainMovie} films={films}/>
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/mylist">
          <MyList films={films}/>
        </Route>
        <Route
          exact
          path="/films/:id"
          render={() =>
            <MoviePage films={films} />
          }>
        </Route>
        <Route
          exact
          path="/films/:id/review"
          render={() =>
            <AddReview films={films} />
          }>
        </Route>
        <Route
          exact
          path="/player/:id"
          render={() =>
            <Player films={films} />
          }>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  MainMovie: PropTypes.shape({
    TITLE: PropTypes.string.isRequired,
    GENRE: PropTypes.string.isRequired,
    YEAR: PropTypes.number.isRequired
  }),
  films: filmsPropTypes
};

export default App;

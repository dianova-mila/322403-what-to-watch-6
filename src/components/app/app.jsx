import React from 'react';
import MainPage from "../main-page/main-page";
import PropTypes from "prop-types";

const App = (props) => {
  const {MainMovie} = props;

  return (
    <MainPage MainMovie = {MainMovie}/>
  );
};

App.propTypes = {
  MainMovie: {
    TITLE: PropTypes.string.isRequired,
    GENRE: PropTypes.string.isRequired,
    YEAR: PropTypes.number.isRequired
  }
};

export default App;

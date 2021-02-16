import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import films from "./mocks/films";

const MainMovie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

ReactDOM.render(
    <App
      MainMovie={MainMovie}
      films={films}
    />,
    document.querySelector(`#root`)
);

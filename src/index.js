import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const MainMovie = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014
};

ReactDOM.render(
    <App
      MainMovie = {MainMovie}
    />,
    document.querySelector(`#root`)
);

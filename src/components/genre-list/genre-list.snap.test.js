import React from 'react';
import {render} from '@testing-library/react';
import GenreList from "./genre-list";

const genres = [`All genre`, `Drama`, `Crime`, `Thriller`];
const currentGenre = `All genre`;
const onSelectGenre = jest.fn();

it(`GenreList should render correctly`, () => {
  const {container} = render(<GenreList genres={genres} currentGenre={currentGenre} onSelectGenre={onSelectGenre}/>);

  expect(container).toMatchSnapshot();
});

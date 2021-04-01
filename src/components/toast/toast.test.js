import React from 'react';
import {render} from '@testing-library/react';
import Toast from "./toast";

const isErrorShow = true;
const errorText = `An error has occurred`;

it(`Toast should render correctly`, () => {
  const {getByText} = render(<Toast isErrorShow={isErrorShow} errorText={errorText}/>);
  const textElement = getByText(`An error has occurred`);

  expect(textElement).toBeInTheDocument();
});

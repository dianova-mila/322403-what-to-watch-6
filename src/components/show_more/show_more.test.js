import React from 'react';
import {render} from '@testing-library/react';
import ShowMore from "./show_more";

const isActive = true;
const onClick = jest.fn();

it(`ShowMore should render correctly`, () => {
  const {getByText} = render(<ShowMore isActive={isActive} onClick={onClick}/>);
  const textElement = getByText(`Show more`);

  expect(textElement).toBeInTheDocument();
});

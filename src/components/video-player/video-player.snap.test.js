import React from 'react';
import {render} from '@testing-library/react';
import VideoPlayer from "./video-player";

const src = `path`;

test(`VideoPlayer should render correctly`, () => {
  const {container} = render(<VideoPlayer src={src}/>);
  expect(container).toMatchSnapshot();
});

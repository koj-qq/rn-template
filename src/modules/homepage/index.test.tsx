import React from 'react';
import { render, fireEvent } from 'test-utils';

import Homepage from './index';

test('it should render homepage properly', () => {
  const { queryByText, queryByPlaceholderText } = render(<Homepage />);

  const result = queryByText(/hello/i);
  expect(result).not.toBeNull();

  const text2 = queryByText(/td-design/i);
  expect(text2).toBeDefined();

  const input = queryByPlaceholderText('hello');
  expect(input).toBeDefined();

  const button = queryByText('click');
  fireEvent.press(button!);
});

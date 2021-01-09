import React from 'react';
import { render } from 'test-utils';

import Homepage from './index';

test('it should render homepage properly', () => {
  const { queryByText } = render(<Homepage />);

  const result = queryByText(/hello/i);
  expect(result).not.toBeNull();
  // const text2 = queryByText('react-native');
  // expect(text2).toBeDefined();

  // const input = queryByPlaceholderText('hello');
  // expect(input).toBeDefined();

  // const button = queryByText('click');
  // fireEvent.press(button);
});

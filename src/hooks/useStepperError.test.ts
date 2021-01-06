import { renderHook, act } from '@testing-library/react-hooks';
import useStepperError from './useStepperError';

test('should throw error when over 9000', () => {
  const { result } = renderHook(() => useStepperError(9000));

  act(() => {
    result.current.increment();
  });

  expect(result.error).toEqual(Error("It's over 9000!"));
});

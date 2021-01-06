import { renderHook, act } from '@testing-library/react-hooks';
import useAsync from './useAsync';

test('should increment counter after delay', async () => {
  const { result } = renderHook(() => useAsync());

  result.current.incrementAsync(); // async不需要放在act里
  act(() => {
    jest.runAllTimers();
  });

  expect(result.current.count).toBe(1);
});

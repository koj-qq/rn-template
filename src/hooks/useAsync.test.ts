import { renderHook } from '@testing-library/react-hooks';
import useAsync from './useAsync';

test('should increment counter after delay', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAsync());

  result.current.incrementAsync(); // async不需要放在act里

  await waitForNextUpdate();

  expect(result.current.count).toBe(1);
});

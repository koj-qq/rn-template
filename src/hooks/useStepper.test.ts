import { renderHook, act } from '@testing-library/react-hooks';
import useStepper from './useStepper';

test('should increment counter from custom initial value', () => {
  const { result } = renderHook(() => useStepper(9000));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(9001);
});

test('should reset counter to initial value - demo1', () => {
  let initialValue = 0;
  const { result, rerender } = renderHook(() => useStepper(initialValue));

  /** 这两行代码是为了模拟initialValue修改然后hooks重新执行 */
  initialValue = 10;
  rerender();

  /** 这个时候initialValue作为reset函数的依赖发生了改变，所以counter变成了10 */
  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});

test('should reset counter to initial value - demo2', () => {
  /**
   * 如果hooks接收的参数很多，可以借助initialProps来实现。
   * 同时，如果参数是useEffect的依赖项，也只有用initialProps的方式才能保证正确性。
   */
  const { result, rerender } = renderHook(({ initialValue }) => useStepper(initialValue), {
    initialProps: {
      initialValue: 0,
    },
  });

  rerender({ initialValue: 10 });

  act(() => {
    result.current.reset();
  });

  expect(result.current.count).toBe(10);
});

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import useContextStepper, { StepProvider } from './useContextStepper';

test('should use custom step when increasing', () => {
  const wrapper = ({ children }: { children?: React.ReactNode }) => <StepProvider step={2}>{children}</StepProvider>;

  const { result } = renderHook(() => useContextStepper(), { wrapper });

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(2);
});

test('should use custom step when increasing with initialProps', () => {
  const wrapper = ({ children, step }: { children?: React.ReactNode; step: number }) => (
    <StepProvider step={step}>{children}</StepProvider>
  );

  const { result, rerender } = renderHook(() => useContextStepper(), { wrapper, initialProps: { step: 2 } });

  act(() => {
    result.current.increment(); // context的step是2，useContextStepper的count初始值为0，所以最后加起来是2
  });

  expect(result.current.count).toBe(2);

  rerender({ step: 8 }); // 将context的step改成了8

  act(() => {
    result.current.increment(); // 这个时候count是2，加上8，最后结果是10
  });

  expect(result.current.count).toBe(10);
});

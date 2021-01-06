import React, { useState, useContext, useCallback } from 'react';

const StepContext = React.createContext(1);

export const StepProvider = ({ step, children }: { step: number; children?: React.ReactNode }) => (
  <StepContext.Provider value={step}>{children}</StepContext.Provider>
);

export default function useContextStepper(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const step = useContext(StepContext);

  const increment = useCallback(() => setCount(x => x + step), [step]);

  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return {
    count,
    increment,
    reset,
  };
}

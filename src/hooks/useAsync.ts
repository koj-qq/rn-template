import { useState, useCallback } from 'react';

export default function useAsync() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount(x => x + 1), []);

  const incrementAsync = useCallback(() => setTimeout(increment, 200), [increment]);

  return {
    count,
    incrementAsync,
  };
}

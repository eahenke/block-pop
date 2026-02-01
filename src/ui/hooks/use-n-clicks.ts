import { useRef } from 'react';

export const useNClicks = (n: number, ms = 500) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = useRef(0);

  const makeClickHandler = (callback: () => void) => {
    return () => {
      count.current += 1;

      if (count.current === 1) {
        timeout.current = setTimeout(() => {
          count.current = 0;
        }, ms);
      } else if (count.current === n) {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        count.current = 0;
        callback();
      }
    };
  };

  return makeClickHandler;
};

import { useRef, useEffect } from 'react';

export const useInterval = (callback, delay) => {
  const interval = useRef();

  // Remember the latest callback.
  useEffect(() => {
    interval.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      interval.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

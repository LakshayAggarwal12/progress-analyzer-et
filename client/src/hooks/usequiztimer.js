import { useState, useEffect, useRef } from 'react';

export const useQuizTimer = (duration, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const stop = () => {
    clearInterval(intervalRef.current);
    return elapsed;
  };

  return { timeLeft, elapsed, stop };
};

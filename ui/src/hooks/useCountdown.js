import { useEffect, useState } from "react";

const useCountdown = (initial = 60) => {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const reset = () => setTime(initial);

  return { time, reset };
};

export default useCountdown;
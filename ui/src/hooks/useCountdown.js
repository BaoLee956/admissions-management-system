import { useEffect, useState } from "react";

export default function useCountdown() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(null);
  }, []);

  return { value, setValue };
}

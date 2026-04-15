import { useEffect, useState } from "react";

export default function useFetch() {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(null);
  }, []);

  return { value, setValue };
}

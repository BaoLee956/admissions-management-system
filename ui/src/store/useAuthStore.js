import { useState } from "react";

export function useAuthStore() {
  const [user, setUser] = useState(null);
  return { user, setUser };
}

import { createContext } from "react";

// Create context with a default structure (optional but recommended)
export const LoginContext = createContext({
  login: false,
  setLogin: () => {},
  user: null,
  setUser: () => {}
});

import { useState } from "react";
import { singletonHook } from "react-singleton-hook";

const initAuthenticated = true;
let globalSetAutenticated = () => {
  throw new Error("you must use isAuthenticated before setting its state");
};

export const isAuthenticated = singletonHook(initAuthenticated, () => {
  const [authenticated, setValue] = useState(initAuthenticated);
  globalSetAutenticated = setValue;
  console.log(initAuthenticated);
  return authenticated;
});

export const setAuthenticated = (authenticated) =>
  globalSetAutenticated(authenticated);

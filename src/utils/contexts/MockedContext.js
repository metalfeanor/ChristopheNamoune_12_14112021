import { createContext, useState } from "react";

export const MockedContext = createContext({});

export const MockedProvider = ({ children }) => {
  const [isDataMocked, setIsDataMocked] = useState(false);
  return <MockedContext.Provider value={{ isDataMocked, setIsDataMocked }}>{children}</MockedContext.Provider>;
};

import React, { FC, createContext, useContext } from "react";

const Context = () => {
  return {
    state: {},
    actions: {},
  };
};

const LayoutContext = createContext<any>({ state: {}, actions: {} });

export const LayoutContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = Context();
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export default function useLayoutContext() {
  return useContext<ReturnType<typeof Context>>(LayoutContext);
}

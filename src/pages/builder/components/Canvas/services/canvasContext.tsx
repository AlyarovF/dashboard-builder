import React, { FC, createContext, useContext } from "react";

const Context = () => {
  return {
    state: {},
    actions: {},
  };
};

const CanvasContext = createContext<any>({ state: {}, actions: {} });

export const CanvasContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const value = Context();
  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};

export default function useCanvasContext() {
  return useContext<ReturnType<typeof Context>>(CanvasContext);
}

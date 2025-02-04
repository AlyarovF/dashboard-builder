import { FC } from "react";
import Layout from "./Layout";
import { LayoutContextProvider } from "../services/layoutContext";

const index: FC = () => {
  return (
    <LayoutContextProvider>
      <Layout />
    </LayoutContextProvider>
  );
};

export default index;

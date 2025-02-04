import { FC } from "react";
import Builder from "./Builder";
import { BuilderContextProvider } from "../services/builderContext";

const index: FC = () => {
  return (
    <BuilderContextProvider>
      <Builder />
    </BuilderContextProvider>
  );
};

export default index;

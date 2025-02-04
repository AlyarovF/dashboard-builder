import { FC } from "react";
import ComponentRenderer from "./ComponentRenderer";
import { BuilderComponent } from "../../../../../../../common/types/common";
import { ComponentRendererContextProvider } from "../services/componentRendererContext";

const index: FC<BuilderComponent> = (props) => {
  return (
    <ComponentRendererContextProvider block={props}>
      <ComponentRenderer {...props} />
    </ComponentRendererContextProvider>
  );
};

export default index;

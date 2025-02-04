import { FC } from "react";
import { CanvasContextProvider } from "../services/canvasContext";
import Canvas from "./Canvas";

const index: FC = () => {
  return (
    <CanvasContextProvider>
      <Canvas />
    </CanvasContextProvider>
  );
};

export default index;

import { FC } from "react";
import useBuilderContext from "../../../services/builderContext";
import ComponentRenderer from "../components/ComponentRenderer/ui";
import { Empty } from "antd";

/**
 * Canvas component that renders a list of blocks or an empty state if no blocks are present.
 *
 * @component
 * @returns {JSX.Element} The rendered Canvas component.
 *
 * @remarks
 * This component uses the `useBuilderContext` hook to access the state of blocks.
 * If there are blocks present, it maps over them and renders each one using the `ComponentRenderer` component.
 * If no blocks are present, it displays an empty state using the `Empty` component from Ant Design.
 */

const Canvas: FC = () => {
  const {
    state: { blocks },
  } = useBuilderContext();

  return (
    <>
      {blocks.length > 0 ? (
        blocks.map((block) => <ComponentRenderer key={block.id} {...block} />)
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Empty description="No any blocks">Drop here</Empty>
        </div>
      )}
    </>
  );
};

export default Canvas;

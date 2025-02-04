import { FC } from "react";
import useBuilderContext from "../../../services/builderContext";
import ComponentRenderer from "../components/ComponentRenderer/ui";
import { Empty } from "antd";

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

import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Space, theme } from "antd";
import { FC } from "react";
import {
  BuilderComponent,
  COMPONENT_TYPES,
} from "../../../../../../../common/types/common";
import BarChart from "../../../../../../../components/Blocks/BarChart/BarChart";
import LineChart from "../../../../../../../components/Blocks/LineChart/LineChart";
import Photo from "../../../../../../../components/Blocks/Photo/Photo";
import PieChart from "../../../../../../../components/Blocks/PieChart/PieChart";
import Statistics from "../../../../../../../components/Blocks/Statistics/Statistics";
import Table from "../../../../../../../components/Blocks/Table/Table";
import useBuilderContext from "../../../../../services/builderContext";
import { StyledCard } from "../../../ui/Canvas.styles";
import useComponentRendererContext from "../services/componentRendererContext";

const ComponentManager: FC<{
  onDelete: () => void;
  onDuplicate: () => void;
}> = ({ onDelete, onDuplicate }) => {
  return (
    <Space
      size={0}
      direction="horizontal"
      style={{
        position: "absolute",
        bottom: 0,
        right: 10,
        transform: "translate(0px, 100%)",
        backgroundColor: theme.getDesignToken().colorPrimary,
        borderRadius: theme.getDesignToken().borderRadius,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        zIndex: 1300,
      }}
    >
      <Button
        type="primary"
        size="small"
        icon={<FontAwesomeIcon icon={faCopy} />}
        onClick={onDuplicate}
      />
      <Button
        type="primary"
        size="small"
        icon={<FontAwesomeIcon icon={faTrash} />}
        onClick={onDelete}
      />
    </Space>
  );
};

const ComponentRenderer = (props: BuilderComponent) => {
  const { active, id } = props;
  const {
    state: { cardRef, closestEdge, handleRef, size },
  } = useComponentRendererContext();
  const {
    actions: { handleActiveBlock, handleDeleteBlock, handleDuplicateBlock },
  } = useBuilderContext();
  return (
    <StyledCard
      ref={cardRef}
      bordered={true}
      style={{
        borderColor: active ? "dodgerblue" : "transparent",
        width: size?.width || props.props.style?.width,
        height: size?.height || props.props.style?.height,
      }}
      onClick={() => handleActiveBlock(id)}
      styles={{
        body: {
          width: "100%",
          height: "100%",
        },
      }}
    >
      {renderComponent(props)}
      {closestEdge && <DropIndicator edge={closestEdge} gap="12px" />}
      {active && (
        <ComponentManager
          onDelete={() => handleDeleteBlock(id)}
          onDuplicate={() => handleDuplicateBlock(id)}
        />
      )}
      {/* Resize Handle */}
      <div className="resizer" ref={handleRef} />
    </StyledCard>
  );
};

const renderComponent = (component: BuilderComponent) => {
  switch (component.type) {
    case COMPONENT_TYPES.STATISTICS:
      return <Statistics {...component.props} />;
    case COMPONENT_TYPES.PIE_CHART:
      return <PieChart {...component.props} />;
    case COMPONENT_TYPES.LINE_CHART:
      return <LineChart {...component.props} />;
    case COMPONENT_TYPES.BAR_CHART:
      return <BarChart {...component.props} />;
    case COMPONENT_TYPES.TABLE:
      return <Table {...component.props} />;
    case COMPONENT_TYPES.PHOTO:
      return <Photo {...component.props} />;
    default:
      return null;
  }
};

export default ComponentRenderer;

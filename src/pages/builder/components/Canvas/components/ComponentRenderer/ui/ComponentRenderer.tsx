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

// ComponentManager handles the action buttons (Duplicate, Delete) for each component
const ComponentManager: FC<{
  onDelete: () => void; // Delete action handler
  onDuplicate: () => void; // Duplicate action handler
}> = ({ onDelete, onDuplicate }) => {
  return (
    <Space
      size={0}
      direction="horizontal"
      style={{
        position: "absolute",
        bottom: 0,
        right: 10,
        transform: "translate(0px, 100%)", // Positions buttons at the bottom-right corner
        backgroundColor: theme.getDesignToken().colorPrimary, // Primary background color for buttons
        borderRadius: theme.getDesignToken().borderRadius, // Rounded corners
        borderTopLeftRadius: 0, // No top-left corner radius
        borderTopRightRadius: 0, // No top-right corner radius
        zIndex: 1300, // Ensure buttons are on top of other elements
      }}
    >
      <Button
        type="primary"
        size="small"
        icon={<FontAwesomeIcon icon={faCopy} />} // Copy icon for duplicate button
        onClick={onDuplicate} // Trigger onDuplicate action when clicked
      />
      <Button
        type="primary"
        size="small"
        icon={<FontAwesomeIcon icon={faTrash} />} // Trash icon for delete button
        onClick={onDelete} // Trigger onDelete action when clicked
      />
    </Space>
  );
};

// ComponentRenderer renders different components based on the type (e.g., Table, PieChart, etc.)
const ComponentRenderer = (props: BuilderComponent) => {
  const { active, id } = props; // Destructure props to get the active state and id
  const {
    state: { cardRef, closestEdge, handleRef, size }, // Use context for component state (e.g., card ref, size)
  } = useComponentRendererContext();
  const {
    actions: { handleActiveBlock, handleDeleteBlock, handleDuplicateBlock }, // Actions to manage block state
  } = useBuilderContext();

  return (
    <StyledCard
      ref={cardRef} // Reference for the card element
      bordered={true}
      style={{
        borderColor: active ? "dodgerblue" : "transparent", // Border color based on active state
        width: size?.width || props.props.style?.width, // Dynamic width
        height: size?.height || props.props.style?.height, // Dynamic height
      }}
      onClick={() => handleActiveBlock(id)} // Set the block as active when clicked
      styles={{
        body: {
          width: "100%", // Full width for the card body
          height: "100%", // Full height for the card body
        },
      }}
    >
      {renderComponent(props)}
      {closestEdge && <DropIndicator edge={closestEdge} gap="12px" />}
      {active && (
        <ComponentManager
          onDelete={() => handleDeleteBlock(id)} // Pass delete action
          onDuplicate={() => handleDuplicateBlock(id)} // Pass duplicate action
        />
      )}
      {/* Resize Handle */}
      <div className="resizer" ref={handleRef} />{" "}
      {/* Resizer for resizing the component */}
    </StyledCard>
  );
};

// renderComponent dynamically renders the correct component based on the type
const renderComponent = (component: BuilderComponent) => {
  switch (component.type) {
    case COMPONENT_TYPES.STATISTICS:
      return <Statistics {...component.props} />; // Render Statistics component
    case COMPONENT_TYPES.PIE_CHART:
      return <PieChart {...component.props} />; // Render PieChart component
    case COMPONENT_TYPES.LINE_CHART:
      return <LineChart {...component.props} />; // Render LineChart component
    case COMPONENT_TYPES.BAR_CHART:
      return <BarChart {...component.props} />; // Render BarChart component
    case COMPONENT_TYPES.TABLE:
      return <Table {...component.props} />; // Render Table component
    case COMPONENT_TYPES.PHOTO:
      return <Photo {...component.props} />; // Render Photo component
    default:
      return null; // Return null for unsupported component types
  }
};

export default ComponentRenderer;

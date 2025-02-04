import {
  faEdit,
  faEye,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FloatButton, Layout, Tooltip } from "antd";
import React from "react";
import Canvas from "../components/Canvas/ui/Canvas";
import Sidebar from "../components/Sidebar/Sidebar";
import useBuilderContext from "../services/builderContext";
import { Container } from "./Builder.styles";

/**
 * Builder component that provides the main layout and functionality for the dashboard builder.
 * It uses the context from `useBuilderContext` to manage state and actions.
 *
 * @returns {JSX.Element} The Builder component.
 *
 * @component
 * @example
 * return (
 *   <Builder />
 * )
 *
 * @remarks
 * The component includes a sidebar, a container for the canvas, and a group of floating buttons
 * for actions like preview, delete all, and save. The layout and styles are dynamically adjusted
 * based on the state values such as `isDraggedOver` and `isPreview`.
 *
 * @hook
 * The component uses the `useBuilderContext` hook to access the state and actions:
 * - `containerRef`: Reference to the main layout container.
 * - `isDraggedOver`: Boolean indicating if an item is being dragged over the container.
 * - `isPreview`: Boolean indicating if the preview mode is active.
 * - `handleSubmit`: Function to handle the save action.
 * - `handlePreview`: Function to handle the preview action.
 * - `handleClosePreview`: Function to handle closing the preview.
 * - `handleDeleteAll`: Function to handle deleting all items.
 */
const Builder: React.FC = () => {
  const {
    state: { containerRef, isDraggedOver, isPreview },
    actions: {
      handleSubmit,
      handlePreview,
      handleClosePreview,
      handleDeleteAll,
    },
  } = useBuilderContext();
  return (
    <Layout ref={containerRef} style={{ position: "relative" }}>
      {!isPreview && <Sidebar />}
      <Container
        style={{
          height: "calc(100vh - 70px)",
          backgroundColor: isDraggedOver ? "#e9e9e9" : "transparent",
        }}
      >
        <Canvas />
      </Container>
      <FloatButton.Group
        shape="square"
        style={{ insetInlineEnd: 20, bottom: 20 }}
      >
        <Tooltip title={isPreview ? "Edit" : "Preview"} placement="left">
          <FloatButton
            icon={<FontAwesomeIcon icon={isPreview ? faEdit : faEye} />}
            onClick={isPreview ? handleClosePreview : handlePreview}
          />
        </Tooltip>
        {!isPreview && (
          <>
            <Tooltip title="Delete all" placement="left">
              <FloatButton
                icon={<FontAwesomeIcon icon={faTrash} />}
                onClick={handleDeleteAll}
              />
            </Tooltip>
            <Tooltip title="Save" placement="left">
              <FloatButton
                type="primary"
                icon={<FontAwesomeIcon icon={faFloppyDisk} />}
                onClick={handleSubmit}
              />
            </Tooltip>
          </>
        )}
      </FloatButton.Group>
    </Layout>
  );
};

export default Builder;
